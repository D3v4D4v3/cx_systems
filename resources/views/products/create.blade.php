<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-red-600 leading-tight">
            {{ __('Panel de Inventario: Nuevo Componente') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-black border border-red-900 overflow-hidden shadow-2xl sm:rounded-lg p-8">
                
                @if(session('success'))
                    <div class="mb-6 p-4 bg-red-600 text-white font-bold rounded-lg shadow-inner">
                        {{ session('success') }}
                    </div>
                @endif

                <form action="{{ route('products.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="md:col-span-2">
                            <label class="block text-sm font-bold text-red-500 uppercase">Nombre del Hardware</label>
                            <input type="text" name="name" required placeholder="Ej: Procesador Intel Core i9-14900K"
                                class="mt-2 block w-full rounded-md bg-gray-900 border-red-700 text-white focus:ring-red-600 focus:border-red-600">
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-red-500 uppercase">Precio Unitario ($)</label>
                            <input type="number" step="0.01" name="price" required placeholder="0.00"
                                class="mt-2 block w-full rounded-md bg-gray-900 border-red-700 text-white focus:ring-red-600">
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-red-500 uppercase">Cantidad en Stock</label>
                            <input type="number" name="stock" required placeholder="Disponibilidad inicial"
                                class="mt-2 block w-full rounded-md bg-gray-900 border-red-700 text-white focus:ring-red-600">
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-red-500 uppercase">Categoría</label>
                            <select name="category" class="mt-2 block w-full rounded-md bg-gray-900 border-red-700 text-black">
                                <option value="Procesadores">Procesadores</option>
                                <option value="GPUs">Tarjetas de Video</option>
                                <option value="RAM">Memorias RAM</option>
                                <option value="Almacenamiento">SSD / HDD</option>
                                <option value="Periféricos">Teclados / Ratones</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-red-500 uppercase">Imagen del Componente</label>
                            <input type="file" name="image" 
                                class="mt-2 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-red-700 file:text-white hover:file:bg-red-600 cursor-pointer">
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-sm font-bold text-red-500 uppercase">Especificaciones Técnicas</label>
                            <textarea name="description" rows="4" required placeholder="Describe los specs principales..."
                                class="mt-2 block w-full rounded-md bg-gray-900 border-red-700 text-white focus:ring-red-600"></textarea>
                        </div>
                    </div>

                    <div class="mt-8">
                        <button type="submit" class="w-full bg-red-700 hover:bg-red-600 text-black font-black py-4 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105 uppercase tracking-tighter">
                            Registrar en Sistema CX
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>