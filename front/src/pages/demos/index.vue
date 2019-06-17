<template lang="pug">
  .demos
    .flex.row.head
      .xs.span-8.offset-2.menu
        .flex.row.head
          h1 Demos
          router-link(to="/") На главную 
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
  justify-content: space-between;
  h1,a{
    color: white;
    margin: 0;
    @include break('xs') {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
}

</style>
