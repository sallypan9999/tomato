<template lang="pug">
#home
  b-container
    b-row
      b-col.hamburger
        b-btn.hamburgerBtn(to="/list")
          b-icon(icon="list" font-scale="5")
    b-row.mt-5
      b-col.d-flex.align-items-center(cols="3")
        .items
          ul
            li {{ currentText }}
      b-col.d-flex.justify-content-center(cols="6")
        .square
          .timetext
            p {{ timeText }}
          b-btn.play(v-if="status !== 1" @click="start") Start
          b-btn.play(v-else @click="pause") Pause
    b-row.mt-5
      b-col(cols="4")
        p.aaa .....Only show the first four tasks.....
      b-col.d-flex.justify-content-between(cols="4")
        .work Work
        .work Break
</template>

<script>
export default {
  data () {
    return {
      // newinput: ''
      // 0 = 停止
      // 1 = 倒數中
      // 2 = 暫停
      status: 0,
      timer: 0,
      muted: false
    }
  },
  computed: {
    // newinputstate () {
    //   return this.newinput.length > 2 ? true : this.newinput.length === 0 ? null : false
    // },
    current () {
      return this.$store.state.current
    },
    items () {
      return this.$store.state.items
    },
    currentText () {
      return this.current.length > 0 ? this.current : this.items.length > 0 ? '點擊開始' : '沒有事項'
    },
    timeleft () {
      return this.$store.state.timeleft
    },
    timeText () {
      const m = Math.floor(this.timeleft / 60).toString().padStart(2, '0')
      const s = Math.floor(this.timeleft % 60).toString().padStart(2, '0')
      return `${m} : ${s}`
    }
  },
  methods: {
    start () {
      if (this.status === 0 && this.items.length > 0) {
        this.$store.commit('start')
      }
      // 目前倒數 有東西
      if (this.current.length) {
        this.status = 1
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= -1) {
            this.finished(false)
          }
        }, 1000)
      }
    },
    pause () {
      this.status = 2
      clearInterval(this.timer)
    },
    finished (skip) {
      clearInterval(this.timer)
      this.status = 0
      this.$store.commit('finish')
      if (!skip) {
        const audio = new Audio()
        audio.src = require('@/assets/' + this.$store.state.sound)
        audio.play()
      }

      if (this.items.length > 0) {
        this.start()
      }
    }
  }
}
</script>
