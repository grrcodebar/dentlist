<script>
	import DatosPaciente from './rutas/datosPaciente.svelte';
  import axios from 'axios';
	import { cuenta,documentos } from './contexto/manager.js';
  import {replace} from 'svelte-spa-router';
  import Barra from "./componentes/Barra.svelte";
  import Router from 'svelte-spa-router';
  import Login from './rutas/login.svelte';
  import Home from "./rutas/home.svelte";
  import AgregarPaciente from './rutas/agregar/Paciente.svelte';
  import AgregarHistoria from './rutas/agregar/Historia.svelte';
import Detalle from './rutas/detalle.svelte';
  
  let database = new PouchDB('store');

  let routes = {
    '/': Login,
    '/home':Home,
    '/agregar/paciente':AgregarPaciente,
    '/pacientes/:id':DatosPaciente,
    '/editar/paciente/:id':AgregarPaciente,
    '/agregar/historia/:id':AgregarHistoria,
    '/detalle/:id':Detalle
  }

  async function actualizarDocumentos(){
    const allDocs = await database.allDocs({
      include_docs: true
    })
    $documentos = allDocs.rows;
  }
  async function replicacion(){
    const replication = PouchDB.sync('store', 'http://200.58.99.151:5984/dientes', {
      live: true,
      retry: true,
      auth:{
        username: $cuenta.usuario,
        password: $cuenta.pass
      }
    }).on('change', async function (info) {
      console.log(info);
      await actualizarDocumentos()
    }).on('error', function (err) {
      console.log('Replication error:', err)
      console.log(err.status);
    })
  }

  async function login(e){
    $cuenta = {usuario:e.detail.usuario,pass:e.detail.pass};
    axios.get('http://200.58.99.151:5984',{auth:{username:$cuenta.usuario,password:$cuenta.pass}}).then((res)=>{
      actualizarDocumentos();
      replicacion();
      replace('/home');
    }).catch((err)=>{
      console.log(err);
    });
  }
  async function put(e){
    const addition = await database.put(e.detail);
    if (addition.ok) {
      await actualizarDocumentos();
    }
  }

</script>
<svelte:window on:login={login} on:upd={actualizarDocumentos} on:put={put} />
<main>
  <Barra />
  <Router {routes} />
</main>

<style>
  :global(.bot){
    margin: 10px 0px;
  }
  :global(.dato){
    display: flex;
    flex-direction: column;
  }
  :global(.dato > span){
    font-size: 10px;
    font-weight: bold;
  }
</style>
