<template>
  <section class="row m-3" v-if="event">
    <div class="col-12 event-banner" :style="`background-image: url(${event.coverImg})`">
      <section class="row d-flex justify-content-center banner-content">
        <div class="col-12">
            <h1 class="text-center">{{ event.name }}</h1>
        </div>
        <div class="col-6">
          <p>{{ event.description }}</p>
        </div>
        <div class="col-6">
            <p>{{ event.startDate.toLocaleDateString() }} at {{ event.startDate.toLocaleTimeString() }}</p>
            
        </div>
        <div class="col-12 text-center">
          <h2>{{ event.capacity - event.ticketCount }} Spots Remaining!</h2><button @click="createTicket(event.id)">Attend Event</button>
        </div>
        
      </section>
        
    </div>
  </section>
  <section v-if="tickets" class="row m-3 d-flex">
    <div v-for="ticket in tickets" :key="ticket.id" class="profile-picture-container">
      <ProfileCard :ticket="ticket" />
    </div>
  </section>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, reactive, onMounted, useAttrs } from 'vue';
import { eventsService } from "../services/EventsService";
import Pop from "../utils/Pop";
import { ticketsService } from "../services/TicketsService";
export default {
  setup(){
    onMounted(() => {
      setActiveEvent(),
      getTicketsByEvent()
    })
    const route = useRoute()
    async function setActiveEvent(){
      AppState.activeEvent = null
      await eventsService.setActiveEvent(route.params.eventId)
    }
    async function getTicketsByEvent() {
      try {
        await ticketsService.getTicketsByEvent(route.params.eventId)
      } catch (error) {
        Pop.error(error)
      }
      
    }
  return { 
    event: computed(() => AppState.activeEvent),
    tickets: computed(() => AppState.tickets),
    async createTicket(eventId) {
      try {
        console.log(eventId)
        await ticketsService.createTicket(eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

   }
  }
};
</script>


<style lang="scss" scoped>
.event-banner {
  height: 50vh;
  background-size: cover;
  background-position:center;
  border: solid 2px #79E7AB;
}

.banner-content {
  backdrop-filter: brightness(50%);
}

.profile-picture-container {
  width:50px;
}
</style>