<script>
    import { onMount } from "svelte";
    import { documentos } from "../contexto/manager";


    export let dientes = [];
    onMount(()=>{
    })
    let stats = [{nombre:'Normal',icono:'adjust',cont:'',clase:'',raiz:'panorama_vertical'},
    {nombre:'Corona',icono:'settings',cont:'',clase:'rojo',raiz:'panorama_vertical'},
    {nombre:'Corona Permanente',icono:'settings',cont:'',clase:'azul',raiz:'panorama_vertical'},
    {nombre:'Extruido',icono:'fullscreen',cont:'',clase:'',raiz:'panorama_vertical'},
    {nombre:'Intruido',icono:'fullscreen_exit',cont:'',clase:'',raiz:'panorama_vertical'},
    {nombre:'Giroversion',icono:'loop',cont:'',clase:'',raiz:'panorama_vertical'},
    {nombre:'Carie',icono:'timelapse',cont:'',clase:'rojo',raiz:'panorama_vertical'},
    {nombre:'Fractura',icono:'adjust',cont:'',clase:'rojo',raiz:'line_style'},
    {nombre:'Perno',icono:'panorama_fish_eye',cont:'azul',clase:'rojo',raiz:'pause'},
    {nombre:'Ausencia',icono:'stop',cont:'',clase:'rojo',raiz:'stop'},
    {nombre:'Extraccion',icono:'view_carousel',cont:'azul',clase:'rojo',raiz:'stop'}];
    function elegirDibujoTapa(diente){
        let icono = 'adjust';
        let clase = 'normal';
        let raiz = 'panorama_vertical';
        let contenedor = '';
        stats.forEach((el)=>{
            if (diente.estado == el.nombre){
                icono = el.icono;
                clase = el.clase;
                raiz = el.raiz;
            }
        });
        return {
            icono: icono,
            clase: clase,
            raiz: raiz,
            contendor: contenedor
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

<div class="contenedor">
    <div class="fila">
        <div class="col izq"><!-- Titulos -->
            {#each dientes.filter(izqsup).reverse() as diente}
                <div class="lugar">
                    <span>{diente.nombre}</span>
                </div>
            {/each}
        </div>
        <div class="col der">
            {#each dientes.filter(dersup) as diente}
                <div class="lugar">
                    <span>{diente.nombre}</span>
                </div>
            {/each}
        </div>
    </div>
    <div class="fila">
        <div class="col izq"><!-- Raices -->
            {#each dientes.filter(izqsup).reverse() as diente}
                <div class="lugar">
                    <i class={`material-icons ${elegirDibujoTapa(diente).clase}`}>{elegirDibujoTapa(diente).raiz}</i>
                </div>
            {/each}
        </div>
        <div class="col der">
            {#each dientes.filter(dersup) as diente}
                <div class="lugar">
                    <i class={`material-icons ${elegirDibujoTapa(diente).clase}`}>{elegirDibujoTapa(diente).raiz}</i>
                </div>
            {/each}
        </div>
    </div>
    <div class="fila"><!-- TAPAs -->
        <div class="col izq">
            {#each dientes.filter(izqsup).reverse() as diente}
                <div class="lugar">
                    <i class={`material-icons ${elegirDibujoTapa(diente).clase}`}>{elegirDibujoTapa(diente).icono}</i>
                </div>
            {/each}
        </div>
        <div class="col der">
            {#each dientes.filter(dersup) as diente}
                <div class="lugar">
                    <i class={`material-icons ${elegirDibujoTapa(diente).clase}`}>{elegirDibujoTapa(diente).icono}</i>
                </div>
            {/each}
        </div>
    </div>
    <div class="fila">
        <div class="col izq"><!-- Tapas -->
            {#each dientes.filter(izqinf).reverse() as diente}
                <div class="lugar">
                    <i class={`material-icons ${elegirDibujoTapa(diente).clase}`}>{elegirDibujoTapa(diente).icono}</i>
                </div>
            {/each}
        </div>
        <div class="col der">
            {#each dientes.filter(derinf) as diente}
                <div class="lugar">
                    <i class={`material-icons ${elegirDibujoTapa(diente).clase}`}>{elegirDibujoTapa(diente).icono}</i>
                </div>
            {/each}
        </div>
    </div>
    <div class="fila"><!-- Raices -->
        <div class="col izq">
            {#each dientes.filter(izqinf).reverse() as diente}
                <div class="lugar">
                    <i class={`material-icons ${elegirDibujoTapa(diente).clase}`}>{elegirDibujoTapa(diente).raiz}</i>
                </div>
            {/each}
        </div>
        <div class="col der">
            {#each dientes.filter(derinf) as diente}
                <div class="lugar">
                    <i class={`material-icons ${elegirDibujoTapa(diente).clase}`}>{elegirDibujoTapa(diente).raiz}</i>
                </div>
            {/each}
        </div>
    </div>
    <div class="fila"><!-- Titulos -->
        <div class="col izq">
            {#each dientes.filter(izqinf) as diente}
                <div class="lugar">
                    <span>{diente.nombre}</span>
                </div>
            {/each}
        </div>
        <div class="col der">
            {#each dientes.filter(derinf) as diente}
                <div class="lugar">
                    <span>{diente.nombre}</span>
                </div>
            {/each}
        </div>
    </div>
</div>


<style>
    .contenedor{
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        align-items: center;
    }
    .fila{
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .col{
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .col:nth-child(1){
        border-right: solid 1px black;
        padding-right: 5px;
    }
    .col:nth-child(2){
        padding-left: 5px;
    }
    .der{
        justify-content: flex-start;
    }
    .izq{
        justify-content: flex-end;
    }
    .lugar{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .rojo{
        color: red;
    }
    .azul{
        color:blue;
    }
    .corona{
        text-shadow: 0px 0px 6px #1C00CE;
    }
    .lugar{
        margin: auto;
    }
</style>