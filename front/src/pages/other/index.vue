<template lang="pug">
  .other
    header.flex.row(:style="{height: headerHeight + 'px'}" v-scroll="scroll")
      .xs.span-8.offset-2
        h1(style="color:white") Demos
    section.content
      .flex.row
        .xs.span-8.offset-2
          h1.title.shadow Workspace

    Footer
</template>

<script>
import Footer from '@/components/common/footer'

export default {
  data () {
    return {
      headerHeight: 88
    }
  },
  components: {
    Footer
  },
  methods: {
     scroll(e) {
      if (window.pageYOffset > 10) {
        this.headerHeight=44
      } else {
        this.headerHeight=88
      }  
    }
  }  
}

</script>

<style lang="scss">
.other {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
}

.content {
   /* 1 flex-grow, 0 flex-shrink, auto flex-basis */
   flex: 1 0 auto;
   display: flex;
}


</style>
