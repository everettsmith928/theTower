<template>
  <header>
    <!-- <Navbar /> -->
  </header>
  <main>
    <div class="container-fluid">
      <section class="row">
        <div class="col-12 col-lg-11 order-last order-md-first text-center">
          <RouterLink :to="{ name: 'Home' }"><h1 class="m-3"><i class="mdi mdi-castle"></i> TOWER</h1></RouterLink>
  <router-view />
        </div>
        <div class="col-12 order-first order-md-last col-md-1 account-wrapper">
          <Login />
        </div>
      </section>
  
    </div>
    
  </main>
   <footer class="text-light">
   
  </footer>

  <!-- Modal -->
  <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title fs-5" id="exampleModalLabel">Create New Event</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <CreateEventForm />
         
        </div>
        <div class="modal-footer">
          
        </div>
      </div>
    </div>
  </div>
 
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      // components: { Login }
    }
  },
  // components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

body {
  background-color: #2A2D3A !important;
}

.account-wrapper {
  background-image: linear-gradient(#484c63,#2A2D3A);
  max-height: 100vh;
  padding: 1rem;
}

@media screen and (max-width: 600px)  {
  .account-wrapper {
    margin-bottom: 0px;
  }
}

button {
  background-color: #79E7AB;
  border-radius: 8px;
  padding: .5rem;
  margin: .5rem;
  transition: .5s;
  border: 0px;
}

button:hover {
  background-color:#cae779;
}

h1 {
  color: #CCF3FD;
}
p {
  color: #CCF3FD;
}

h2 {
  color:#79E7AB;
}

  h3 {
    color: #CCF3FD;
    font-size: 24px;
  }
</style>
