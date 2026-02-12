<div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
    <x-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
        {{ __('Dashboard') }}
    </x-nav-link>

    @if(Auth::user()->role === 'vendedor')
        <x-nav-link :href="route('products.create')" :active="request()->routeIs('products.create')">
            {{ __('Agregar Hardware') }}
        </x-nav-link>
        
        <x-nav-link :href="route('products.index')" :active="request()->routeIs('products.index')">
            {{ __('Ver Inventario') }}
        </x-nav-link>
    @endif

    @if(Auth::user()->role === 'cliente')
        <x-nav-link :href="url('/')" :active="request()->is('/')">
            {{ __('Catálogo de Tienda') }}
        </x-nav-link>
    @endif
</div>