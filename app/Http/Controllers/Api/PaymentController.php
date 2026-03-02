<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

// Controlador para simular procesamiento de pagos (sin integración real)

class PaymentController extends Controller
{
    // Simular el procesamiento de un pago con tarjeta (no se integra con ningún gateway real)
    public function processPayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'card_number' => 'required|string|size:16',
            'card_holder' => 'required|string|max:255',
            'expiry_date' => 'required|string|regex:/^\d{2}\/\d{2}$/',
            'cvv' => 'required|string|size:3',
        ]);

        usleep(500000); // 0.5 segundos

        
        $lastDigit = (int) substr($request->card_number, -1);
        $success = ($lastDigit % 2 === 0); // Simula éxito si termina en número par, rechazo si termina en impar

        // Validar fecha de expiración (formato MM/YY)
        $expiryParts = explode('/', $request->expiry_date);
        $expiryMonth = (int) $expiryParts[0];
        $expiryYear = (int) ('20' . $expiryParts[1]); // Asume que el año es 20XX
        $currentYear = (int) date('Y');
        $currentMonth = (int) date('m');
        if ($expiryYear < $currentYear || ($expiryYear === $currentYear && $expiryMonth < $currentMonth)) {
            return response()->json([
                'success' => false,
                'message' => 'Error. La tarjeta ha expirado. Verifica la fecha de expiración.',
            ], 422);
        }

        if ($success) {
            $paymentId = 'MOCK-' . strtoupper(Str::random(16));

            return response()->json([
                'success' => true,
                'message' => 'Pago procesado exitosamente',
                'payment_id' => $paymentId,
                'amount' => $request->amount,
                'status' => 'approved',
                'timestamp' => now()->toIso8601String(),
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'El pago fue rechazado. Verifica los datos de tu tarjeta.',
                'error_code' => 'CARD_DECLINED',
            ], 422);
        }
    }

    // Verificar estado de un pago procesado (simulado)
    public function verifyPayment(Request $request, $paymentId)
    {
        
        if (!str_starts_with($paymentId, 'MOCK-')) {
            return response()->json([
                'success' => false,
                'message' => 'ID de pago inválido',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'payment_id' => $paymentId,
            'status' => 'approved',
            'verified_at' => now()->toIso8601String(),
        ]);
    }

    // Obtener métodos de pago disponibles (información pública)
    public function getPaymentMethods()
    {
        return response()->json([
            'methods' => [
                [
                    'id' => 'credit_card',
                    'name' => 'Tarjeta de Crédito',
                    'description' => 'Visa, Mastercard, American Express',
                    'fee' => 0,
                ],
                [
                    'id' => 'debit_card',
                    'name' => 'Tarjeta de Débito',
                    'description' => 'Tarjetas de débito bancarias',
                    'fee' => 0,
                ],
            ],
            'test_cards' => [
                [
                    'number' => '4532015112830366',
                    'result' => 'Pago exitoso (termina en par)',
                ],
                [
                    'number' => '4532015112830367',
                    'result' => 'Pago rechazado (termina en impar)',
                ],
            ],
        ]);
    }
}
