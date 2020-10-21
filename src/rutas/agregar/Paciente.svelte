<script>
import { onMount } from "svelte";
import { admin, documentos } from "../../contexto/manager";
import {location,push,pop} from 'svelte-spa-router';


    export let params = {};
    let paciente;
    let nombre = "",documento = "",telefono = "",nacionalidad = "",dia = 1,mes = 1,ano = 1900,sexo = "",diabetes = false,cardiaco = false,email = "",obs = "";

    onMount(()=>{
        if (params.id != undefined){
            paciente = _.findWhere($documentos, {id: `paciente:${params.id}`});
            nombre = paciente.doc.nombre;
            documento = paciente.doc.documento;
            telefono = paciente.doc.telefono;
            nacionalidad = paciente.doc.nacionalidad;
            dia = paciente.doc.dia;
            mes = paciente.doc.mes;
            ano = paciente.doc.ano;
            sexo = paciente.doc.sexo;
            diabetes = paciente.doc.diabetes;
            cardiaco = paciente.cardiaco;
            email = paciente.doc.email;
            obs = paciente.doc.observacion;
        }
    })
    async function guardar(){
        let datos = {
            nombre:nombre,
            documento:documento,
            cardiaco:cardiaco,
            diabetes:diabetes,
            nacionalidad:nacionalidad,
            telefono:telefono,
            email:email,
            dia:dia,
            mes:mes,
            ano:ano,
            sexo:sexo,
            observacion:obs
        }
        if (params.id){
            admin.modificarPaciente(paciente,datos);
        } else {
            admin.crearPaciente(datos);
        }
        push('/home');
    }
    function volver(){
        pop();
    }
</script>

<div class="container">
    <div class="row">
        <div class="input-field col s12 m6">
            <input type="text" class="validate" bind:value={nombre}>
            <label for="first_name">Nombre</label>
        </div>
        <div class="input-field col s12 m6">
            <input type="text" class="validate" bind:value={documento}>
            <label for="first_name">Documento</label>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s12 m6">
            <input type="text" class="validate" bind:value={telefono}>
            <label for="first_name">Telefono</label>
        </div>
        <div class="input-field col s12 m6">
            <textarea id="textarea1" class="materialize-textarea" bind:value={email}></textarea>
            <label for="textarea1">Email</label>
        </div>
    </div>
    <div class="row">
        <div class="col s4 m2">
            <input type="number" min="1" max="31" class="validate" bind:value={dia}>
            <label for="first_name">Dia</label>
        </div>
        <div class="col s4 m2">
            <input type="number" min="1" max="12" class="validate" bind:value={mes}>
            <label for="first_name">Mes</label>
        </div>
        <div class="col s4 m2">
            <input type="number" min="1900" max="2020" class="validate"  bind:value={ano}>
            <label for="first_name">Año</label>
        </div>
    </div>
    <div class="row">
        <div class="col s12 m6">
            <p>
                <label>
                  <input value={"Masculino"} bind:group={sexo} name="group1" type="radio" checked />
                  <span >Masculino</span>
                </label>
              </p>
              <p>
                <label>
                  <input value={"Femenino"} bind:group={sexo} name="group1" type="radio" />
                  <span>Femenino</span>
                </label>
              </p>
        </div>
        <div class="col s12 m6">
            <div class="switch">
                <label>
                  No
                  <input type="checkbox" bind:checked={diabetes}>
                  <span class="lever"></span>
                  Diabetes
                </label>
              </div>
              <div class="pad"></div>
              <div class="switch">
                <label>
                  No
                  <input type="checkbox" bind:checked={cardiaco}>
                  <span class="lever"></span>
                  Problemas Cardiacos
                </label>
              </div>
        </div>
    </div>
    <div class="row">
        <div class="col s12 m6">
            <input type="text" class="validate" bind:value={nacionalidad}>
            <label for="first_name">Nacionalidad</label>
        </div>
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
