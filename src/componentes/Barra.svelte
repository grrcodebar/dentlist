<script>
    import {location} from 'svelte-spa-router';
    let routes = [
        {url:'#/home',nombre:'Inicio',icon:'home'},
        {url:'#/Cuenta',nombre:'Cuenta',icon:'account_circle'}
    ];
</script>
<div class={($location == '/'? "hiden" : "navbar-fixed")}>
    <nav>
        <div class="nav-wrapper teal lighten-4">
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <div class="brand-logo center"><img src="/favicon.png" alt="CL"></div>
            <ul id="nav-mobile" class="left hide-on-med-and-down">
                {#each routes as ruta}
                    <li><a href={ruta.url}><i class="material-icons left">{ruta.icon}</i>{ruta.nombre}</a></li>
                {/each}
            </ul>
        </div>
    </nav>
</div>
<ul class="sidenav" id="mobile-demo">
    {#each routes as ruta}
        <li><a href={ruta.url}><i class="material-icons left">{ruta.icon}</i>{ruta.nombre}</a></li>
    {/each}
</ul>
<style>
    .hiden{
        display: none;
    }
    .brand-logo{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .brand-logo > img{
        height: 90%;
        object-fit: cover;
    }
</style>