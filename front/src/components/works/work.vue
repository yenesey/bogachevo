<template lang="pug">
div
  .flex-row.work-header
    .md.offset-3.span-7
      tab(:caption="title" color="#faf")

  .flex-row
    .xs.span-12
      .work(:style="bgStyle")
        // img(:src="`/works/images/${name}.jpg`")
        video(:src="`/works/videos/${name}.mp4`" loop="loop" autoplay="autoplay")

  .flex-row
      .md.span-2.offset-2.photo
        .flex-column
          span.subheading(style="color: #4e4e4e") Роль: {{role}}
      .md.span-6(style="padding: 1rem")
          span.subheading {{description}}

</template>

<script>
import tab from './tab'

export default {
  props: ['title','name', 'description', 'role'],
  components: {
    tab
  },
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
  height: 4.5rem;
  display: flex;
  align-items: flex-end;
/*
  z-index:-2;
  position:relative;
  background-color: beige;
*/  
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

  video {
    display: flex;
    // flex-direction: row;
    max-width: 960px;
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
