<template>
  <section class="row m-3" v-if="event">
    <div v-if="event.isCanceled" class="col-12 event-banner text-center p-0" :style="`background-image: url(${event.coverImg})`">
      <div class="event-cancel d-flex align-items-center justify-content-center">
        <div class="col-6">
          <h2 class="event-cancel-text">{{ event.name }}</h2>
        </div>
        <div class="col-6">
          <h2 class="event-cancel-text">Event was canceled</h2>
        </div>
      </div>
    </div>
    <div v-else class="col-12 event-banner" :style="`background-image: url(${event.coverImg})`">
      <section class="row d-flex align-items-end banner-content">
        <div class="col-12 d-flex justify-content-end">
          <button class="p-2"><i class="mdi mdi-pen"></i><b>Edit Event</b></button>
        </div>
        <div class="col-12">
            <h1 class="text-center">{{ event.name }}</h1>
        </div>
        <div class="col-12">
          <p class="text-center">{{ event.description }}</p>
        </div>
        <div class="col-12">
            <p class="text-center">{{ event.startDate.toLocaleDateString() }} at {{ event.startDate.toLocaleTimeString() }}</p>
        </div>
        <div class="col-12 text-center justify-content-center mb-3">
          <h2 class="text-center">{{ event.capacity - event.ticketCount }} Spots Remaining!</h2>
          <button @click="createTicket(event.id)"><b>Attend Event</b></button>
        </div>
        
      </section>
        
    </div>
  </section>
  <section v-if="event" class="row m-3">
    <div v-if="event.creatorId == account.id" class="col-12 d-flex justify-content-end">
      <button class="btn btn-danger" @click="cancelEvent()">Cancel Event</button>
    </div>
  </section>
  <section v-if="tickets" class="row m-3 d-flex">
    <div v-for="ticket in tickets" :key="ticket.id" class="profile-picture-container">
      <ProfileCard :ticket="ticket" />
    </div>
  </section>
  <section class="row m-3 m-md-5">
    <h2 class="text-center">Comments</h2>
    <Comments/>
  </section>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, reactive, onMounted, useAttrs, onUnmounted } from 'vue';
import { eventsService } from "../services/EventsService";
import Pop from "../utils/Pop";
import { ticketsService } from "../services/TicketsService";
export default {
  setup(){
    onMounted(() => {
      setActiveEvent(),
      getTicketsByEvent()
    })
    onUnmounted(() => {
      clearTickets(),
      clearActiveEvent()
    })
    async function clearTickets() {
      AppState.tickets = []
    }
    const route = useRoute()
    async function setActiveEvent(){
      AppState.activeEvent = null
      await eventsService.setActiveEvent(route.params.eventId)
    }
    async function clearActiveEvent() {
      AppState.activeEvent = null
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
    account: computed(() => AppState.account),
    async createTicket(eventId) {
      try {
        console.log(eventId)
        await ticketsService.createTicket(eventId)
      } catch (error) {
        Pop.error(error)
      }
    },

    async cancelEvent() {
      try {
        if( await Pop.confirm('Are you sure you want to cancel this Event?')) {
          await eventsService.cancelEvent()
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
.event-banner {
  min-height: 50vh;
  background-size: cover;
  background-position: center;
  border: solid 2px #79E7AB;
}

.event-cancel {
  backdrop-filter: sepia(100%);
  height: 100%;
  width: 100%;
  background-size: cover;
}

.event-cancel-text {
  color: rgb(255, 188, 188);
  background-color: rgb(44, 28, 28);
  margin: 1rem;
}
.banner-content {
  backdrop-filter: brightness(50%);
  height: 100%;
  background-size: cover;
}

.profile-picture-container {
  width:50px;
}

.comments {
  min-height:50vh;
  background-color: #484c63 !important;
  // background-color: #CCF3FD;
}

.comment {
  min-height:20vh;
}

.comment-button {
 
}
</style>