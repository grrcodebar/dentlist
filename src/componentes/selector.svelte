<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { beforeUpdate } from 'svelte';

    const dispatch = createEventDispatcher();
    export let diente = {};
    let group = '';
    let memoria = '';
    onMount(()=>{
        group = diente.estado;
    })
    beforeUpdate(()=>{
        if (group != memoria){
            dispatch('cambio',{nombre:diente.nombre,estado:group});
            memoria = group;
        }
    })
</script>
<div class="row">
    <div class="col s6">
        <p>
            <label>
              <input type="radio" bind:group={group} value={''} />
              <span>Normal</span>
            </label>
          </p>
          <p>
            <label>
              <input type="radio" bind:group={group} value={'Carie'} />
              <span>Carie</span>
            </label>
          </p>
          <p>
            <label>
              <input type="radio"  bind:group={group} value={'Corona'} />
              <span>Corona</span>
            </label>
          </p>
          <p>
            <label>
              <input type="radio"  bind:group={group} value={'Corona Permanente'} />
              <span>Corona Permanente</span>
            </label>
          </p>
    </div>
    <div class="col s6">
        <p>
            <label>
              <input type="radio" bind:group={group} value={'Fractura'} />
              <span>Fractura</span>
            </label>
          </p>
          <p>
            <label>
              <input type="radio"  bind:group={group} value={'Perno'} />
              <span>Perno</span>
            </label>
          </p>
          <p>
            <label>
              <input type="radio"   bind:group={group} value={'Ausencia'} />
              <span>Ausencia</span>
            </label>
          </p>
          <p>
            <label>
              <input type="radio" bind:group={group} value={'Extraccion'} />
              <span>Extraccion</span>
            </label>
          </p>
    </div>
</div>