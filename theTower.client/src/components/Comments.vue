<template>
 <div class="col-12 text-center comments rounded">
        <section class="row">
          <div v-if="account.name" class="col-12">
          <form @submit.prevent="createComment" class="row">
            <div class="col-12">
              <input v-model="commentData.body" type="text" maxLength="10000" rows="3" class="form-control mt-3">
            </div>
            <div class="col-12 d-flex align-items-center justify-content-end">
              <button type="submit" class="comment-button"><i class="mdi mdi-pen"></i></button>
            </div>
          </form>
          </div>
        </section>
        <section class="row comment">
          <div class="col-12">
          </div>
        </section>
        <section class="row comment">
            <div v-for="comment in userComments" :key="comment.id" class="col-12">
              <Comment :comment="comment"/>
            </div>
        </section>
      </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watch } from 'vue';
import Pop from "../utils/Pop";
import { commentsService} from "../services/CommentsService"
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
import Comment from "./Comment.vue";
export default {
    setup() {
        const commentData = ref({});
        const route = useRoute();
        onMounted(() => getComments());
        async function getComments() {
            try {
                await commentsService.getComments(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        function resetForm() {
          commentData.value = {}
        } 
        return {
            account: computed(() => AppState.account),
            userComments: computed(() => AppState.userComments),
            commentData,
            async createComment() {
                try {
                    commentData.value.eventId = route.params.eventId;
                    await commentsService.createComment(commentData.value);
                    logger.log('Comment Posted!');
                    resetForm()
                }
                catch (error) {
                    Pop.error(error);
                }
            }
        };
    },
    components: { Comment }
};
</script>


<style lang="scss" scoped>

</style>