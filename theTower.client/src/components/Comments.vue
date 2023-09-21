<template>
 <div class="col-12 text-center comments rounded">
        <section class="row">
          <div class="col-12">
          <form class="row">
            <div class="col-12 col-md-11">
              <textarea type="text" rows="3" class="form-control mt-3"></textarea>
            </div>
            <div class="col-12 col-md-1 d-flex align-items-center">
              <button class="comment-button"><i class="mdi mdi-pen"></i></button>
            </div>
          </form>
          </div>
        </section>
        <section class="row comment">
          <div class="col-12">
          <Comment />
          </div>
        </section>
        <section class="row comment">
            <div class="col-12">
              Comment
            </div>
        </section>
      </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>

</style>