<template>
  <router-link :to="{ path: `events/${ticket.event.id}` }">
  <div v-if="ticket.event.isCanceled" class="event-card text-center rounded justify-content-center bg-light selectable" :style="`background-image: url(${ticket.event.coverImg})`">
    <h1 class="cancel-text bg-dark">Event was Canceled</h1>
    <h3 class="cancel-text bg-dark">{{ ticket.event.name }}</h3>
  </div>
  <div v-else class="event-card d-flex text-center rounded justify-content-center bg-light selectable" :style="`background-image: url(${ticket.event.coverImg})`">
      <div class="card-text align-items-center">
      <h3 class="event-title p-3">{{ ticket.event.name }}</h3>
      <h3 class="event-title p-3">{{ new Date(ticket.event.startDate).toDateString() }}</h3>
      <!-- <p class="event-title align-self-end">{{event.id}}</p>    
    <p class="event-title align-self-end">{{ event.location }}</p>    
    <p class="event-title align-self-end">{{ event.ticketCount }}</p>   --> 
    </div>  
    </div>
    </router-link>
    <button v-if="ticket.event.isCanceled" @click="deleteTicket(ticket.id)" class="refund-button"><b>Refund</b></button>  
     <button v-else @click="deleteTicket(ticket.id)" class=""><b>Unattend</b></button>   
  
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Ticket } from "../models/Ticket";
import Pop from "../utils/Pop";
import {ticketsService} from "../services/TicketsService"
export default {
    props: { ticket: { type: Ticket, required: true } },
  setup(){
  return { 
    async deleteTicket(ticketId){
      try {
        if(await Pop.confirm()){
          await ticketsService.deleteTicket(ticketId)
        }
      } catch (error) {
        Pop.error(error)
      }
    }
   }
  }
};
</script>


<style lang="scss" scoped>
.event-card {
  padding: 1rem;
  aspect-ratio: 1/1;
  background-image: url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  
}

.card-text {
  overflow-y: hidden;
}

.event-title {
  background-color: #484c63;
}

.cancel-text {
  color: rgb(255, 188, 188);
}

.refund-button {
  background-color: rgb(161, 220, 161);
}

.refund-button:hover {
  background-color: greenyellow;
}
</style>