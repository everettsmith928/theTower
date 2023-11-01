<template>
  <router-link :to="{ path:`events/${event.id}`}">
    <div v-if="event.isCanceled" class="event-card selectable event-banner p-0 text-center" :style="`background-image: url(${event.coverImg})`">
        <div class="card-text event-cancel align-items-center justify-content-center">
          <div>
            <h2 class="event-title event-title-cancel bg-dark">{{ event.name }}</h2>
          </div>
          <div>
            <h2 class="event-title event-title-cancel bg-dark">Event was canceled</h2>
          </div>
        </div>
      </div>
  <div v-else class="event-card d-flex text-center rounded justify-content-center bg-light selectable" :style="`background-image: url(${event.coverImg})`">
    <div class="card-text align-items-center">
    <h3 class="event-title p-3">{{ event.name }}</h3>
     <h3 class="event-title p-3">{{ event.startDate.toLocaleDateString() }}</h3>
    <!-- <p class="event-title align-self-end">{{event.id}}</p>    
    <p class="event-title align-self-end">{{ event.location }}</p>    
    <p class="event-title align-self-end">{{ event.ticketCount }}</p>   -->
    </div>  
  </div>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { TowerEvent } from "../models/Event";
import { RouterLink } from "vue-router";
export default {
    props: { event: { type: TowerEvent, required: true } },
    setup() {
        return {
            events: computed(() => AppState.events)
        };
    },
    components: { RouterLink }
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

.event-cancel {
  width: 100%;
  height: 100%;
  backdrop-filter: sepia(100%);
}

.event-title-cancel {
  color: rgb(255, 188, 188);
}

</style>