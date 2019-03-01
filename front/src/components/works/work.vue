<template lang="pug">
  .grid-row  
    .sm.span-10.offset-1
      .bg(:style="bgStyle")
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

.delimiter{
  height: 88px;
  font-family: 'Proxima Nova';
  font-size: 3rem;
  word-break: unset;
  line-height: 1.6em;
}
/*
.bg {
	background: #eee;
	background-size: cover;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}

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
