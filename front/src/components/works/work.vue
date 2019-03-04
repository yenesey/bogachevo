<template lang="pug">
div
  .flex-row.work-header
    .xs.span-8.offset-2
      h1.title {{title}}

  .flex-row
    .xs.span-12      
      .work(:style="bgStyle")
        img(:src="`/works/images/${title}.jpg`")
  .flex-row
    .xs.span-8.offset-2.works-header
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

.work-header {
  height: 5.5rem;
  display: flex;
  align-items: center; // vertically
  /*
  border-left: 0px solid transparent;
  border-right: 30vw solid transparent;
  border-bottom: 3.5rem solid #dfe3ec;
  */
  background-color: #dfe3ec;
  @include break('xs') {
    text-align: center;
  }
}

.work {
  position: relative;
  display: flex;
  background-size: cover;
  align-items: center; // vertically
  img {
    // flex-direction: row;
    margin: auto; 
    @include break('md') {
      width: 100%;
      min-height: 0px;
    } 
  }
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
