<script>
	import { documentos } from '../contexto/manager';
    import { push, replace } from 'svelte-spa-router';
	import ItemPaciente from './../componentes/items/ItemPaciente.svelte';
    import { beforeUpdate } from 'svelte';
    function add(){
        push('/agregar/paciente');
    }
    let lista = [];
    let filtro = '';
    beforeUpdate(()=>{
        lista = $documentos.filter((el)=>el.id.includes('paciente:')).filter((el)=>el.doc.documento.includes(filtro) || el.doc.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()))
        if ($documentos == [] || $documentos == undefined){
            replace('/');
        }
    })
</script>
<div class="container">
    <div class="row">
        <div class="col s12 center-align bot">
            <button on:click={add} class="waves-effect waves-light btn"><i class="material-icons left">add</i>Paciente</button>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s12">
            <input class="validate" placeholder="Buscar por documento,nombre o apellido" bind:value={filtro}>
        </div>
    </div>
    <div class="section">
        {#each lista as paciente}
            <ItemPaciente paciente={paciente} />
        {/each}
    </div>
</div>