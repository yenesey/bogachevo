<template lang="pug">
  .grid-row  
    .xs.span-12.work(:style="bgStyle")
      .xs.span-10.offset-1
        h1.title {{title}}
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

.work {
  position: relative;
  height: 100px;
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
