<template>
  <div>
    <div class="col-12 comment-card elevation-2 p-0">
      <p class="comment-text text-start m-3">
        {{ comment.body }}
      
      </p>
      <p>
          {{ comment.createdAt }}
      </p>
    </div>
    <div class="col-12 d-flex m-1 justify-content-between align-items-center">
      <div class="m-2">
        <img class="creator-image" :src="comment.creator.picture" :alt="comment.creator.name" :title="comment.creator.name">
        <p class="m-1">{{ comment.creator.name }}</p>
      </div>
      <button class="bg-warning" @click="deleteComment(comment.id)" v-if="comment.creatorId == account.id">Delete <i class="mdi mdi-delete"></i></button>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { userComment } from "../models/Comment"
import { logger } from "../utils/Logger";
import { applyStyles } from "@popperjs/core";
import Pop from "../utils/Pop";
import { commentsService } from "../services/CommentsService";
export default {
  props: {comment: {type: userComment, required: false}},
  setup(){
    
  return { 
    account: computed(() => AppState.account),
    async deleteComment(commentId) {
      try {
        logger.log(commentId)
        if(await Pop.confirm('Are you sure you want to delete this comment?')) {
          await commentsService.deleteComment(commentId)
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
.comment-card{
  height: 15vh;
  background-color: #CCF3FD;
}

.comment-text {
  font-size: 24px;
  color:#484c63;
}

.creator-image {
  width: 50px;
  border-radius: 50%;
}
</style>