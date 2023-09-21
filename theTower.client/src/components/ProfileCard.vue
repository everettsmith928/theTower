<template>
  
    
    <img class="profile-picture rounded-circle" :src="ticket.profile.picture" :alt="ticket.profile.name" srcset="" :title="ticket.profile.name">


</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Ticket } from "../models/Ticket";
export default {
  props: {ticket: {type: Ticket, required: true}},
  setup(){
    
  return { 
    tickets: computed(() => AppState.tickets)
   }
  }
};
</script>


<style lang="scss" scoped>
.profile-picture {
  height:50px;
}
</style>