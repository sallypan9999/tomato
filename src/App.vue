<template lang="pug">
#app
  b-container
    b-row
      b-col.mt-5.d-flex.justify-content-center
        b-form-input#newinput(v-model="newinput" :state="newinputstate" @keydown.enter="additem")
        b-btn(size="sm" class="plus_btn" @click="additem")
          b-icon(icon="plus" font-scale="4")
    b-row.footer.fixed-bottom
          //keep-alive 快取資料
  keep-alive
    router-view(v-if="$route.meta.keepAlive")
  router-view(v-if="!$route.meta.keepAlive")
</template>

<script>
export default {
  data () {
    return {
      newinput: ''
    }
  },
  computed: {
    newinputstate () {
      return this.newinput.length > 2 ? true : this.newinput.length === 0 ? null : false
    },
    items () {
      return this.$store.state.items
    }
  },
  methods: {
    additem () {
      if (this.newinput.length > 2) {
        this.$store.commit('additem', this.newinput)
        this.newinput = ''
      }
    }
  }
}
</script>
