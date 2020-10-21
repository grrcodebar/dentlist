<script>
    import { onMount } from "svelte";
    import {pop} from 'svelte-spa-router';
    import Odontograma from "../componentes/odontograma.svelte";
    import { cuenta, documentos } from "../contexto/manager";
    import moment from 'moment';
    export let params;
    let puedeAnular = false;
    let ayuda = false;
    let observaciones = '';
    let datos;
    let dientes = [];
    let estados = [
        {nombre:'Normal',icono:'adjust',cont:'',clase:'',raiz:'panorama_vertical'},
        {nombre:'Corona',icono:'settings',cont:'',clase:'rojo',raiz:'panorama_vertical'},
        {nombre:'Corona Permanente',icono:'settings',cont:'',clase:'azul',raiz:'panorama_vertical'},
        {nombre:'Extruido',icono:'fullscreen',cont:'',clase:'',raiz:'panorama_vertical'},
        {nombre:'Intruido',icono:'fullscreen_exit',cont:'',clase:'',raiz:'panorama_vertical'},
        {nombre:'Giroversion',icono:'loop',cont:'',clase:'',raiz:'panorama_vertical'},
        {nombre:'Carie',icono:'timelapse',cont:'',clase:'rojo',raiz:'panorama_vertical'},
        {nombre:'Fractura',icono:'adjust',cont:'',clase:'rojo',raiz:'line_style'},
        {nombre:'Perno',icono:'panorama_fish_eye',cont:'azul',clase:'rojo',raiz:'pause'},
        {nombre:'Ausencia',icono:'stop',cont:'',clase:'rojo',raiz:'stop'},
        {nombre:'Extraccion',icono:'view_carousel',cont:'azul',clase:'rojo',raiz:'stop'},
        
    ];
    onMount(()=>{
        datos = _.findWhere($documentos, {id: `${params.id}`});
        observaciones = datos.doc.observaciones;
        dientes = datos.doc.dientes;
        let creacion = moment(datos.doc.creacion);
        let ahora = moment();
        let tiempo = ahora.diff(creacion);
        console.log(tiempo);
        if (datos.doc.doctor == $cuenta.usuario && tiempo > 0){
            puedeAnular = true;
        }
    })
    function anular(){
        if (puedeAnular){

        }
    }
    
    function izqsup(d){
        return (d.nombre >= 11 && d.nombre <= 18);
    }
    function izqinf(d){
        return (d.nombre >= 41 && d.nombre <= 48);
    }
    function dersup(d){
        return (d.nombre >= 21 && d.nombre <= 28);
    }
    function derinf(d){
        return (d.nombre >= 31 && d.nombre <= 38);
    }
    function togle(){
        ayuda = !ayuda;
    }
</script>
<div class="container">
    <div class="section">
        <button class="waves-effect waves-teal btn-flat" on:click={pop}><i class="material-icons left">arrow_back</i>Volver</button>
        <h5>Odontograma <button on:click={togle} class="btn-floating btn-small waves-effect waves-light"><i class="material-icons">help_outline</i></button></h5>
        {#if ayuda}
            <div class="row">
                <div class="contenedor">
                    {#each estados as estado}
                        <div class={`celda ${estado.cont} ${estado.clase}`}>
                            <span>{estado.nombre}</span><div class="diente"><i class="material-icons">{estado.raiz}</i><i class="material-icons">{estado.icono}</i></div>
                        </div>
                    {/each}
                </div>
            </div>
        {:else}
            <Odontograma dientes={dientes} />
        {/if}
    </div>
    <div class="divider"></div>
    <div class="section">
        <div class="col s12 center-align">
            <h5>Observaciones</h5>
            <p class="left-align">{observaciones}</p>
        </div>
    </div>
    <div class="divider"></div>
    <div class="section">
        <div class="row">
            <div class="col s12 m6">
                <h5>Izquierda Superior</h5>
                <ul class="collection">
                    {#each dientes.filter(izqsup) as diente}
                    <li class="collection-item">{diente.nombre} - {(diente.estado != ''? diente.estado : 'Normal')} </li>
                    {/each}
                  </ul>
            </div>
            <div class="col s12 m6">
                <h5>Derecha Superior</h5>
                <ul class="collection">
                    {#each dientes.filter(dersup) as diente}
                    <li class="collection-item">{diente.nombre} - {(diente.estado != ''? diente.estado : 'Normal')} </li>
                    {/each}
                  </ul>
            </div>
        </div>
        <div class="row">
            <div class="col s12 m6">
                <h5>Izquierda Inferior</h5>
                <ul class="collection">
                    {#each dientes.filter(izqinf) as diente}
                    <li class="collection-item">{diente.nombre} - {(diente.estado != ''? diente.estado : 'Normal')} </li>
                    {/each}
                  </ul>
            </div>
            <div class="col s12 m6">
                <h5>Derecha Inferior</h5>
                <ul class="collection">
                    {#each dientes.filter(derinf) as diente}
                    <li class="collection-item">{diente.nombre} - {(diente.estado != ''? diente.estado : 'Normal')} </li>
                    {/each}
                  </ul>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12 center-align">
            <button on:click={anular} class={(!puedeAnular? "waves-effect waves-teal btn-large disabled":"waves-effect waves-teal btn-large")} >Anular Historial</button>
        </div>
    </div>
</div>
<style>
    .contenedor{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .diente{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .rojo{
        color: red;
    }
    .azul{
        color: blue;
    }
</style>