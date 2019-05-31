<template lang="pug">
  .demos
    div.flex.row.head
      .xs.span-8.offset-2
        h1 Demos
    section.content
      router-view  
    Footer
</template>

<script>
import Menu from './menu'
import Footer from '@/components/common/footer'

export default {
  components: {
    Menu,
    Footer
  }
}

</script>

<style lang="scss">
.demos {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
}
.content {
  flex: 1 0 auto;
}
.head {
  min-height: 52px;
  background-color: $HERO-BK-COLOR;
  align-items: center; // vertically
  h1 {
    color: white;
    margin: auto;
    @include break('xs') {
      margin-left: 1rem;
    }
  }
}

</style>
