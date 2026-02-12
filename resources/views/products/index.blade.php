<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-red-600 leading-tight">
                {{ __('Inventario de Hardware CX Systems') }}
            </h2>
            <a href="{{ route('products.create') }}" class="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg transition font-bold text-xs uppercase">
                + Agregar Componente
            </a>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-black border border-red-900 shadow-2xl sm:rounded-lg overflow-hidden">
                <table class="w-full text-left text-gray-300">
                    <thead class="bg-red-900/20 text-red-500 uppercase text-xs">
                        <tr>
                            <th class="px-6 py-4">Imagen</th>
                            <th class="px-6 py-4">Producto</th>
                            <th class="px-6 py-4">Categoría</th>
                            <th class="px-6 py-4">Precio</th>
                            <th class="px-6 py-4">Stock</th>
                            <th class="px-6 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-red-900/30">
                        @foreach($products as $product)
                        <tr class="hover:bg-red-900/10 transition">
                            <td class="px-6 py-4">
                                @if($product->image)
                                    <img src="{{ asset('storage/' . $product->image) }}" class="w-16 h-16 object-cover rounded border border-red-600" alt="{{ $product->name }}">
                                @else
                                    <div class="w-16 h-16 bg-gray-900 border border-red-900 flex items-center justify-center text-[10px] text-red-700 uppercase font-bold">Sin Foto</div>
                                @endif
                            </td>
                            <td class="px-6 py-4 font-bold text-white">{{ $product->name }}</td>
                            <td class="px-6 py-4 text-sm">{{ $product->category }}</td>
                            <td class="px-6 py-4 text-red-500 font-mono">${{ number_format($product->price, 2) }}</td>
                            <td class="px-6 py-4">
                                <span class="{{ $product->stock < 5 ? 'text-red-600 animate-pulse font-black' : 'text-green-500' }}">
                                    {{ $product->stock }} unidades
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex space-x-3">
                                    <a href="{{ route('products.edit', $product) }}" class="text-blue-500 hover:text-blue-400 font-bold uppercase text-xs">Editar</a>
                                    
                                    <form action="{{ route('products.destroy', $product) }}" method="POST" onsubmit="return confirm('¿Seguro que quieres eliminar este hardware del sistema?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-red-700 hover:text-red-500 font-bold uppercase text-xs">Eliminar</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>