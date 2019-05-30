<template lang="pug">
  .demos
    div.flex.row.head
      .xs.span-8.offset-2
        h1 Demos
    section.content
      .flex.row(style="height:2em")
      .flex.row
        .xs.span-8.offset-2
          .flex.row(style="justify-content: center;")
            Demo
            Demo
            Demo
 
    Footer
</template>

<script>
import Footer from '@/components/common/footer'
import Demo from './demo'

export default {
  components: {
    Demo,
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
  height: 52px;
  background-color: $HERO-BK-COLOR;
  align-items: center; // vertically
  h1 {
    color: white;
    margin: auto !important;
    @include break('xs') {
      margin-left: 1rem;
    }
  }
}

</style>
