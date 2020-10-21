<script>
    import {admin} from '../../contexto/manager';
    import moment from 'moment';
    import {pop} from 'svelte-spa-router';
    import { onMount,beforeUpdate } from "svelte";
    import Selector from "../../componentes/selector.svelte";
    import { cuenta, documentos } from "../../contexto/manager";
    export let params;
    let anterior;
    let elems1,elems2,elems3,elems4;
    let select1;
    let tabs;
    let obs = '';
    let cargo = false;
    let dientes = [
        {nombre:'11',estado:'',caso:''},
        {nombre:'12',estado:'',caso:''},
        {nombre:'13',estado:'',caso:''},
        {nombre:'14',estado:'',caso:''},
        {nombre:'15',estado:'',caso:''},
        {nombre:'16',estado:'',caso:''},
        {nombre:'17',estado:'',caso:''},
        {nombre:'18',estado:'',caso:''},
        {nombre:'21',estado:'',caso:''},
        {nombre:'22',estado:'',caso:''},
        {nombre:'23',estado:'',caso:''},
        {nombre:'24',estado:'',caso:''},
        {nombre:'25',estado:'',caso:''},
        {nombre:'26',estado:'',caso:''},
        {nombre:'27',estado:'',caso:''},
        {nombre:'28',estado:'',caso:''},
        {nombre:'41',estado:'',caso:''},
        {nombre:'42',estado:'',caso:''},
        {nombre:'43',estado:'',caso:''},
        {nombre:'44',estado:'',caso:''},
        {nombre:'45',estado:'',caso:''},
        {nombre:'46',estado:'',caso:''},
        {nombre:'47',estado:'',caso:''},
        {nombre:'48',estado:'',caso:''},
        {nombre:'31',estado:'',caso:''},
        {nombre:'32',estado:'',caso:''},
        {nombre:'33',estado:'',caso:''},
        {nombre:'34',estado:'',caso:''},
        {nombre:'35',estado:'',caso:''},
        {nombre:'36',estado:'',caso:''},
        {nombre:'37',estado:'',caso:''},
        {nombre:'38',estado:'',caso:''}
    ];
    onMount(()=>{
        if (!cargo){
            let data = _.where($documentos.filter(el=>el.key.includes('historial:')), function (o) { return o.doc.paciente == params.id; }).reverse();
            anterior = data[0];
            if (anterior != -Infinity){
                dientes = anterior.doc.dientes;
            }else {
                dientes = [
                    {nombre:'11',estado:'',caso:''},
                    {nombre:'12',estado:'',caso:''},
                    {nombre:'13',estado:'',caso:''},
                    {nombre:'14',estado:'',caso:''},
                    {nombre:'15',estado:'',caso:''},
                    {nombre:'16',estado:'',caso:''},
                    {nombre:'17',estado:'',caso:''},
                    {nombre:'18',estado:'',caso:''},
                    {nombre:'21',estado:'',caso:''},
                    {nombre:'22',estado:'',caso:''},
                    {nombre:'23',estado:'',caso:''},
                    {nombre:'24',estado:'',caso:''},
                    {nombre:'25',estado:'',caso:''},
                    {nombre:'26',estado:'',caso:''},
                    {nombre:'27',estado:'',caso:''},
                    {nombre:'28',estado:'',caso:''},
                    {nombre:'41',estado:'',caso:''},
                    {nombre:'42',estado:'',caso:''},
                    {nombre:'43',estado:'',caso:''},
                    {nombre:'44',estado:'',caso:''},
                    {nombre:'45',estado:'',caso:''},
                    {nombre:'46',estado:'',caso:''},
                    {nombre:'47',estado:'',caso:''},
                    {nombre:'48',estado:'',caso:''},
                    {nombre:'31',estado:'',caso:''},
                    {nombre:'32',estado:'',caso:''},
                    {nombre:'33',estado:'',caso:''},
                    {nombre:'34',estado:'',caso:''},
                    {nombre:'35',estado:'',caso:''},
                    {nombre:'36',estado:'',caso:''},
                    {nombre:'37',estado:'',caso:''},
                    {nombre:'38',estado:'',caso:''}
                ];
            }
            cargo = true;
        }
        var instances = M.Collapsible.init(elems1, {});
        var instance2 = M.Tabs.init(tabs, {});
        var instances3 = M.Collapsible.init(elems2, {});
        var instances4 = M.Collapsible.init(elems3, {});
        var instances5 = M.Collapsible.init(elems4, {});
        M.FormSelect.init(select1, {});
    })
    beforeUpdate(()=>{
    })
    function guardar(){
        let dia = moment().format('D');
        let mes = moment().format('M');
        let ano = moment().format('YYYY');
        let hora = moment().format('H');
        let min = moment().format('m');
        let datos = {
            observaciones: obs,
            doctor: $cuenta.usuario,
            paciente: params.id,
            dia:dia,
            mes:mes,
            ano:ano,
            hora:hora,
            min:min,
            dientes: dientes,
            tipo:(params.id!=undefined?"historia":"anulacion")
        }
        admin.crearHistorial(datos);
        pop();
    }
    function volver(){
        pop();
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
    function setValor(val){
        let lista = dientes;
        lista.forEach((d,i)=>{
            if (d.nombre == val.detail.nombre){
                lista[i] = {nombre:val.detail.nombre, estado: val.detail.estado, caso: d.caso};  
            }
        })
        dientes = lista;
    }
</script>
<div class="row">
        <ul class="tabs" bind:this={tabs}>
        <li class="tab col s3"><a class="active" href="#test1">Izq. Sup</a></li>
        <li class="tab col s3"><a href="#test2">Izq. Inf.</a></li>
        <li class="tab col s3"><a href="#test3">Der. Sup.</a></li>
        <li class="tab col s3"><a href="#test4">Der. Inf.</a></li>
        </ul>
</div>
<div class="container">
    <div class="row">
        
        <div id="test1" class="col s12">
            <ul class="collapsible" bind:this={elems1}>
                    {#each dientes.filter(izqsup) as diente}
                        <li>
                            <div class="collapsible-header"><i class="material-icons">check_box_outline_blank</i>Pieza {diente.nombre}</div>
                            <div class="collapsible-body">
                                {#if cargo}<Selector bind:diente={diente} on:cambio={setValor} />{/if}
                            </div>
                        </li>
                    {/each}
                </ul> 
        </div>
        <div id="test2" class="col s12">
            <ul class="collapsible" bind:this={elems2}>
                {#each dientes.filter(izqinf) as diente}
                        <li>
                            <div class="collapsible-header"><i class="material-icons">check_box_outline_blank</i>Pieza {diente.nombre}</div>
                            <div class="collapsible-body">
                                {#if cargo}<Selector bind:diente={diente} on:cambio={setValor} />{/if}
                            </div>
                        </li>
                {/each}
              </ul>

        </div>
        <div id="test3" class="col s12">
            <ul class="collapsible" bind:this={elems3}>
                {#each dientes.filter(dersup) as diente}
                        <li>
                            <div class="collapsible-header"><i class="material-icons">check_box_outline_blank</i>Pieza {diente.nombre}</div>
                            <div class="collapsible-body">
                                {#if cargo}<Selector bind:diente={diente} on:cambio={setValor} />{/if}
                            </div>
                        </li>
                    {/each}
              </ul>

        </div>
        <div id="test4" class="col s12">
            <ul class="collapsible" bind:this={elems4}>
                {#each dientes.filter(derinf) as diente}
                        <li>
                            <div class="collapsible-header"><i class="material-icons">check_box_outline_blank</i>Pieza {diente.nombre}</div>
                            <div class="collapsible-body">
                                {#if cargo}<Selector bind:diente={diente} on:cambio={setValor} />{/if}
                            </div>
                        </li>
                    {/each}
              </ul>
            
        </div>
    </div>
    <div class="row">
        <div class="col s12 m6">
            <textarea id="textarea1" class="materialize-textarea" bind:value={obs}></textarea>
            <label for="textarea1">Observaciones</label>
        </div>
    </div>
    <div class="row">
        <div class="col m6 s12 bot center-align">
            <button on:click={guardar} class="waves-effect waves-light btn-small"><i class="material-icons left">save</i>Guardar</button>
        </div>
        <div class="col m6 s12 bot center-align">
            <button on:click={volver} class="waves-effect waves-light btn-small"><i class="material-icons left">cancel</i>Salir</button>
        </div>
    </div>
</div>
