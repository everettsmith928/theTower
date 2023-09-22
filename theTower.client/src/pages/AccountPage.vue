<template>
  <div class="about text-center">
    <h1 class="my-1">Welcome back to Tower, {{ account.name }}</h1>
    <!-- <img class="rounded" :src="account.picture" alt="" /> -->
    <!-- <p>{{ account.email }}</p> -->
    <!-- <h1>My Events</h1> -->
    
  </div>
  <h2 class="my-1">Your Upcoming Events</h2>
    <section v-if="tickets" class="row m-3">
      <!-- <h1>{{ events[0] }}</h1> -->
      <div v-for="ticket in tickets" :key="ticket.id" class="col-12 col-md-3 event-list g-3">
          <TicketCard :ticket="ticket" />
      </div>
    </section>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop";
import { eventsService } from "../services/EventsService";
import { logger } from "../utils/Logger";
import { TowerEvent } from "../models/Event";
import { Ticket} from "../models/Ticket.js"
export default {
  setup() {
    onMounted(() => {
      getEventsByProfile()
    })
   
    async function getEventsByProfile() {
      try {
        await eventsService.getEventsByProfile()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      Ticket,
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.profileTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.about {
  min-height:30vh;
}
</style>
