<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * Controlador de pasarela de pago SIMULADA (Mock)
 * 
 * Esta es una simulación de una pasarela de pago real como Stripe o PayPal.
 * En producción, esto se reemplazaría con la integración real de una pasarela.
 */
class PaymentController extends Controller
{
    /**
     * Simular procesamiento de pago
     * 
     * Este endpoint simula el procesamiento de un pago.
     * En un escenario real, aquí se enviaría la información a Stripe/PayPal/etc.
     */
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
        $success = ($lastDigit % 2 === 0);

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

    /**
     * Obtener métodos de pago disponibles (simulado)
     */
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
