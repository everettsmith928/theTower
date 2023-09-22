<template>
  <form v-if="activeEvent" @submit.prevent="editEvent()" class="row">
    <div class="col-12 col-md-6 mb-3">
      <label for="event-name" class="form-label">Event Name</label>
      <input v-model="formData.name" type="text" class="form-control" maxLength="50" id="nameInput" required>
      <div id="name-help" class="form-text">Maximum name length is x characters</div>
    </div>
    <div class="mb-3 col-12 col-md-6">
      <label for="event-date" class="form-label">Event Date</label>
      <input v-model="formData.startDate" type="date" class="form-control" id="dateInput" required>
      <div id="startDate-help" class="form-text">This is the date your event starts</div>
    </div>
    <div class="col-12 col-md-6 mb-3">
      <label for="event-coverImg" class="form-label">Cover Image</label>
      <input v-model="formData.coverImg" type="url" class="form-control" max-length="5000" id="coverImgInput" required>
      <div id="coverImg-help" class="form-text">This is a URL link to your picture</div>
    </div>
    <div class="col-12 col-md-6 mb-3">
      <label for="event-location" class="form-label">Event Location</label>
      <input v-model="formData.location" type="text" class="form-control" max-length="50" id="eventLocation" required>
      <div id="location-help" class="form-text">Input a valid address</div>
    </div>
    <div class="col-12 col-md-6 mb-3">
      <label for="event-capacity" class="form-label">Event Capacity</label>
      <input v-model="formData.capacity" type="number" class="form-control" max="100000" id="eventCapacity" required>
      <div id="capacity-help" class="form-text">Maximum amount of Attendees</div>
    </div>
    <div class="col-12 mb-3 w-100">
      <label for="event-description" class="form-label">Event Description</label>
      <textarea v-model="formData.description" class="form-control" maxLength="500" rows="3" type="text"
        id="event-description" required></textarea>
      <div id="description-help" class="form-text">Make sure you include important details here</div>
    </div>
    <div class="col-12 mb-3">
      <div class="form-group">
        <label for="eventType">Select your event type</label>
        <select v-model="formData.type" class="form-control" id="eventType" required>
          <option value="sport">Sports</option>
          <option value="expositions">Expositions</option>
          <option value="digital">Digital</option>
          <option value="concert">Concerts</option>
          <option value="convention">Conventions</option>
          <option value="exhibits">Exhibits</option>
        </select>
      </div>
    </div>
    <div class="col-12">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary">Edit Event</button>
    </div>
  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop";
import { eventsService } from "../services/EventsService";
import { Modal } from "bootstrap";
import { router } from "../router";
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger";
export default {

  setup() {
    const formData = ref({
    })
    const route = useRoute()
    function resetForm() {
      formData.value = {}
    }
    function setForm(){

      if(AppState.activeEvent){
        formData.value = {
          name: AppState.activeEvent.name,
          // startDate: AppState.activeEvent.startDate,
          coverImg: AppState.activeEvent.coverImg,
          location: AppState.activeEvent.location,
          description: AppState.activeEvent.description,
          type: AppState.activeEvent.type,
          capacity: AppState.activeEvent.capacity
        }
      }
      else {
        console.log('fast render')
      }
    }
    onMounted(() => {resetForm()
    setForm()
    })
    return {
      route,
      activeEvent: computed(() => AppState.activeEvent),
      formData,
      async editEvent() {
        try {
          await eventsService.editEvent(route.params.eventId, formData.value)
          Pop.success('Your event was edited!')
          Modal.getOrCreateInstance('#createModal').hide()
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped></style>