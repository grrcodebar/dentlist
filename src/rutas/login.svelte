<script>
    let usuario = '';
    let pass = '';
    function login(){
        window.dispatchEvent(new CustomEvent('login',{'detail':{usuario:usuario,pass:pass}}));
        usuario = '';
        pass = '';
    }
</script>
<div class="centered teal lighten-4">
    <div class="row">
        <div class="col s12 m12">
          <div class="card">
            <div class="card-content">
              <span class="card-title"><h4>Dentlist</h4></span>
                  <div class = "row">

                    <div class="input-field col s12">
                      <input id="asd" type="text" class="validate" bind:value={usuario}>
                      <label for="asd">Usuario</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="qwe" type="password" class="validate" bind:value={pass}>
                        <label for="qwe">Contraseña</label>
                      </div>
                    <div class="input-field col m12">
                      <button on:click={login} class="btn waves-effect waves-light">
                        Ingresar
                      </button>
                    </div>
                  </div>
            </div>

          </div>
        </div>
      </div>
</div>
<style>
    .centered{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
        max-height: 100%;
    }
</style>