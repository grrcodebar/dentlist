<script>
	import { replace,push } from 'svelte-spa-router';
    import { onMount,beforeUpdate } from "svelte";
    import { documentos } from "../contexto/manager";
    import moment from 'moment';
    import ItemHistorial from '../componentes/items/ItemHistorial.svelte';


    export let params;
    let lista = [];
    let paciente = {};
    let edad = 0;
    onMount(()=>{
        paciente = _.findWhere($documentos, {id: `paciente:${params.id}`}).doc;
        if (paciente == undefined){
            replace('/');
        }
        let fechavieja = moment(`${paciente.ano}${(paciente.mes < 10? `0${paciente.mes}`:paciente.mes)}${(paciente.dia < 10? `0${paciente.dia}`:paciente.dia)}`,'YYYYMMDD');
        edad = moment().diff(fechavieja, 'years');
        
    })
    beforeUpdate(()=>{
        lista = _.where($documentos.filter(el=>el.key.includes('historial:')), function (o) { return o.doc.paciente == params.id; }).reverse();
    })
    function add(){
        push('/agregar/historia/'+paciente.documento);
    }
    function editar(){
        push('/editar/paciente/'+paciente.documento);
    }
</script>
<div class="container">
    <div class="row">
        <div class="col m6 s12 bot center-align">
            <button on:click={add} class="waves-effect waves-light btn-small"><i class="material-icons left">add</i>Registro</button>
        </div>
        <div class="col m6 s12 bot center-align">
            <button on:click={editar} class="waves-effect waves-light btn-small"><i class="material-icons left">edit</i>Datos</button>
        </div>
    </div>
    <div class="section">
        <div class="row">
            <div class="col s12">
                <h5>{paciente.nombre}</h5>
            </div>
        </div>
        <div class="row">
            <div class="col s6 dato">
                <span>Telefono</span>
                <p>{paciente.telefono}</p>
            </div>
            <div class="col s6 dato">
                <span>Documento</span>
                <p>{paciente.documento}</p>
            </div>
        </div>
        <div class="row">
            <div class="col s6 dato">
                <span>Edad</span>
                <p>{edad}</p>
            </div>
            <div class="col s6 dato">
                <span>Sexo</span>
                <p>{paciente.sexo}</p>
            </div>
        </div>
        <div class="row">
            <div class="col s6 dato">
                <span>Fecha de Nacimiento</span>
                <p>{paciente.dia}/{paciente.mes}/{paciente.ano}</p>
            </div>
            <div class="col s6 dato">
                <span>Nacionalidad</span>
                <p>{paciente.nacionalidad}</p>
            </div>
        </div>
        <div class="row">
            <div class="col s6 dato">
                <span>Diabetes</span>
                <p>{(paciente.diabetes? "Si" : "No")}</p>
            </div>
            <div class="col s6 dato">
                <span>Problemas Cardiacos</span>
                <p>{(paciente.cardiaco? "Si" : "No")}</p>
            </div>
        </div>
        <div class="row">
            <div class="col s12 dato">
                <span>Email</span>
                <p>{paciente.email}</p>
            </div>
        </div>
        <div class="row">
            <div class="col s12 dato">
                <span>Observaciones</span>
                <p>{paciente.observacion}</p>
            </div>
        </div>
        <div class="divider"></div>
    </div>
    <div class="section">
        <h5>Historial Clinico Dental</h5>
        {#each lista as data}
            <ItemHistorial data={data} />
        {/each}
    </div>
</div>