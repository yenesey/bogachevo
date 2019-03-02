<template lang="pug">
  .flex-row
    .xs.span-12.work
      .separator
        .xs.span-10.offset-1
          h1.title {{title}}
      .work(:style="bgStyle")
        span CONTENT
        
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      bgStyle: {
        backgroundImage: `url('/works/backgrounds/synapse.jpg')`
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/common.scss";

.separator {
  height: 3.5rem;
  position: relative;
  /*
  border-left: 0px solid transparent;
  border-right: 30vw solid transparent;
  border-bottom: 3.5rem solid #dfe3ec;
  */
  background-color: #dfe3ec;
  @include break('xs') {
    flex-direction: column;
    text-align: center;
  }
}

.work {
  position: relative;
  height: 600px;
  background-size: cover;
}

/*
.bg:after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(bottom, #fff, rgba(255,255,255,0) 40%);
}
*/
</style>
