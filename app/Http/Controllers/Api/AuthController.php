<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon; // Importar Carbon para manejar fechas de expiración de tokens
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    private const TOKEN_LIFETIME_MINUTES = 30;

    // Registro de nuevos usuarios (clientes)
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone'    => 'nullable|string|max:20',
            'address'  => 'nullable|string|max:500',
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id'  => 2, // Cliente
            'phone'    => $validated['phone'] ?? null,
            'address'  => $validated['address'] ?? null,
        ]);

        // NUEVO: Crear token de acceso con expiración corta para pruebas de seguridad
        $tokenResult = $user->createToken(
            'auth_token',
            ['*'], // Permisos completos
            now()->addMinutes(self::TOKEN_LIFETIME_MINUTES) // Expira en 30 minutos para pruebas de seguridad
        );

        return response()->json([
            'message' => 'Usuario registrado exitosamente',
            'user'    => $user->load('role'),
            'token'   => $tokenResult->plainTextToken,
            'token_expires_at' => Carbon::parse($tokenResult->accessToken->expires_at)->toIso8601String(),
            'token_expires_in_seconds' => self::TOKEN_LIFETIME_MINUTES * 60,
        ], 201);
    }

    // Inicio de sesión de usuarios
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales son incorrectas.'],
            ]);
        }

        // Revocar tokens anteriores para evitar tokens huérfanos
        $user->tokens()->delete();

        $tokenResult = $user->createToken(
            'auth_token',
            ['*'],
            now()->addMinutes(self::TOKEN_LIFETIME_MINUTES)
        );

        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'user'    => $user->load('role'),
            'token'   => $tokenResult->plainTextToken,
            'token_expires_at' => Carbon::parse($tokenResult->accessToken->expires_at)->toIso8601String(),
            'token_expires_in_seconds' => self::TOKEN_LIFETIME_MINUTES * 60,
        ]);
    }

    // Cierre de sesión (revoca el token actual)
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Cierre de sesión exitoso',
        ]);
    }

    // Obtener información del usuario autenticado
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user()->load('role'),
        ]);
    }
}