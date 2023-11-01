<template>
  <section class="row m-3">
    <div class="col-12 splash-image">
      <h2 class="m-3 splash-text text-center">Get ahead of the Scalpers</h2>
      <p class="m-3 splash-text text-center">Reserve your seat now with real events for real people.</p>
    </div>
  </section>
  <section class="row m-3 elevation-3 text-center nav-links justify-content-between align-items-center">
      <div @click="filterBy = ''" class="nav-text-wrapper col-12 col-md-1 selectable p-3">
          <div class="text-center nav-button">
          <h3 class="nav-text">All</h3>
          </div>
      </div>
      <div @click="filterBy = 'expositions'" class="nav-text-wrapper col-12 col-md-1 selectable p-3">
          <div class="text-center nav-button">
          <h3 class="nav-text">Expos</h3>
          </div>
      </div>
      <div @click="filterBy = 'convention'" class="nav-text-wrapper col-12 col-md-1 selectable p-3">
          <div class="text-center nav-button">
          <h3 class="nav-text">Conventions</h3>
          </div>
        </div>
        <div @click="filterBy = 'exhibits'" class="nav-text-wrapper col-12 col-md-1 selectable p-3">
          <div class="text-center nav-button">
          <h3 class="nav-text">Exhibits</h3>
          </div>
        </div>
        <div @click="filterBy = 'sport'" class="nav-text-wrapper col-12 col-md-1 selectable p-3">
          <div class="text-center nav-button">
          <h3 class="nav-text">Sports</h3>
          </div>
        </div>
        <div @click="filterBy = 'digital'" class="nav-text-wrapper col-12 col-md-1 selectable p-3">
          <div class="text-center nav-button">
          <h3 class="nav-text">Digital</h3>
          </div>
        </div>
        <div @click="filterBy = 'concert'" class="nav-text-wrapper col-12 col-md-1 selectable p-3">
          <div class="text-center nav-button">
          <h3 class="nav-text">Concerts</h3>
          </div>
        </div>
  </section>
   <section class="row m-3">
    <div v-for="event in events" :key="event.id" class="col-12 col-md-3 event-list g-3">
        <EventCard :event="event" />
    </div>
    </section>
  
    
  
</template>

<script>
import Pop from "../utils/Pop";
import {eventsService} from "../services/EventsService.js"
import { computed, onMounted, ref } from "vue";
import { AppState} from "../AppState.js"

export default {
  setup() {
    const filterBy = ref('')
    onMounted(() => getEvents()) 
    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      filterBy,
      events: computed(()=> {
        // NOTE computeds can be multi-line but then need explicit returns
        if (!filterBy.value) {
          return AppState.events
        } else {
          return AppState.events.filter(event => event.type == filterBy.value)
        }
      }),
    }
  }
}
</script>

<style scoped lang="scss">
 
 .nav-links {
  background-color: #484c63;
  padding: 5px;
  transition: .5s;
 
 }
 .nav-button {
  background-color: #484c63 !important;
  height:auto;
  transition: 1s;
  width:auto;
 
 }

//  .nav-text-wrapper:hover {
//    background-color: #CCF3FD !important;
//  }
 .nav-text {
  transition: .5s;
  height:auto;
    box-sizing: border-box;
 }

 @media screen and (max-width: 600px) {
  .nav-button {
    min-width:100%;
  }
 }
 .nav-text-wrapper {
  border: solid 2px #484c63;
 }
 .nav-text-wrapper:hover {
  border-bottom: solid 2px #79E7AB;
 }

 .nav-text:hover {
  color:#79E7AB;
 }
 .splash-image {
    height:50vh;
    background-image: url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
    border: solid 2px #79E7AB;
    background-size: cover;
    background-position: center;
  }

  .splash-text{
    color: #CCF3FD;
    background-color: #2A2D3A;
    padding: 1rem;
  }

  h3 {
    color: #CCF3FD;
    font-size: 18px;
  }
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
  body {
    background-color: #2A2D3A;
  }

 
}
</style>
