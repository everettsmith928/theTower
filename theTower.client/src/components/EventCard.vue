<template>
  <div class="event-card d-flex text-center rounded justify-content-center bg-light selectable" :style="`background-image: url(${event.coverImg})`">
    <div class="card-text align-items-center">
    <h3 class="event-title p-3">{{ event.name }}</h3>
    <p class="event-title align-self-end">{{event.id}}</p>    
    <p class="event-title align-self-end">Date</p>    
    <p class="event-title align-self-end">Remaining Tickets</p>  
    </div>  
  </div>
  
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { TowerEvent } from "../models/Event";
export default {
  props: {event: {type: TowerEvent, required: true}},
  setup(){
  return { 
    events: computed(() => AppState.events)
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
  backdrop-filter: blur(5px);
  overflow-y: hidden;
}

.event-title {
  background-color: #484c63;
}

</style>