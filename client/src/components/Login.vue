<template>
  <div class="account-panel-wrapper">
  <span class="navbar-text text-center">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <p class="text-center account-heading">Your Account</p>
      <div class="dropdown my-lg-0">
        <div type="button" class=" d-flex border-0 selectable no-select justify-content-center" data-bs-toggle="dropdown" aria-expanded="false">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40" class="profile-image text-center" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
      <button class="mt-3" data-bs-toggle="modal" data-bs-target="#createModal"><b>Create Event <i class="mdi mdi-plus"></i></b></button>
    </div>
  </span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-image {
  aspect-ratio: 1/1;
  height: 10vh;
  border-radius: 8px;;
}

.account-heading {
  color: #CCF3FD;
}

</style>
