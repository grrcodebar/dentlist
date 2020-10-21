<script>
    import {push} from 'svelte-spa-router';
    export let paciente = {};
    function go(){
        push('/pacientes/'+paciente.doc.documento);
    }
</script>
<div class="row" on:click={go}>
    <div class="col s12">
        <div class="card hoverable">
            <div class="card-content">
                <span class="card-title">{paciente.doc.nombre}</span>
                <div class="row">
                    <div class="col s6 dato">
                        <span>Documento</span>
                        {paciente.doc.documento}
                    </div>
                    <div class="col s6 dato">
                        <span>Telefono</span>
                        {paciente.doc.telefono}
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