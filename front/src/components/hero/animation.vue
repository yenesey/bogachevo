<template lang="pug">
  canvas
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    $canvas () {
      return this.$el
    },
    ctx () {
      return this.$canvas.getContext('2d')
    }
  },
  methods: {
    render () {
      const { ctx } = this
    },
 
    draw () {
      // draw there
      requestAnimationFrame(this.draw)
    }
  },
  mounted () {
    this.draw()
  }
}
</script>
