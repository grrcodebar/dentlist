<script>
    import {push} from 'svelte-spa-router';
import App from '../../App.svelte';
import { cuenta } from '../../contexto/manager';
    export let data = {};
    function go(){
        push(`/detalle/`+data.id);//poner cliente tmb
    }
</script>
<div class="row" on:click={go}>
    <div class="col s12">
        <div class={(data.doc.doctor == $cuenta.usuario? "card teal lighten-5 hoverable":"card hoverable")}>
            <div class="card-content">
                <span class="card-title">{data.doc.titulo}{(data.doc.doctor == $cuenta.usuario? "(Usted)":"")}</span>
                <div class="row">
                    <div class="col s6 dato">
                        <span>Fecha</span>
                        {data.doc.dia}/{data.doc.mes}/{data.doc.ano}
                    </div>
                    <div class="col s6 dato">
                        <span>Hora</span>
                        {data.doc.hora}:{(data.doc.min < 10?`0${data.doc.min}`:data.doc.min)}Hs
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<style>
    .card{
        cursor: pointer;
    }
</style>