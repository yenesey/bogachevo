<template lang="pug">
div
  // .flex-row.work-header
    .md.offset-3.span-7
      tab(:caption="title" color="#faf")
  .flex-row
    .xs.span-12
      .work(:style="bgStyle")
        // img(:src="`/works/images/${name}.jpg`")
        .video-wrapper
          // span {{title}}
          video(:src="`/works/videos/${name}.mp4`" autoplay="autoplay" loop="loop"  preload="auto" muted="muted" type="video/mp4")

  .flex-row
      .md.span-2.offset-2.photo
        .flex-column
          span.subheading(style="color: #4e4e4e") {{role}}
      .md.span-6(style="padding: 1rem")
          span.subheading {{description}}
  .flex-row(style="height: 2rem")       

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

.video-wrapper {
  // background-color: #fff;
  //transform-style: preserve-3d;

  //@include transform-origin(center center);
  //transform: matrix3d(0.866122, 0, -0.499833, 0, 0.203238, 0.913601, 0.352176, 0, 0.456648, -0.406612, 0.79129, 0, 0, 0, 0, 1);

  //box-shadow: 2px 2px 3px black;
  box-shadow: -4px 5px 13px black;
  border: 1px outset transparent;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  // outline: 1px solid transparent;
  @include transform(rotateX(15deg)  rotateY(25deg)  rotateZ(-4.62deg));

  span {
    font-family: 'Proxima Nova';
    font-size: 1.6rem;
    font-weight:bold;
    position:absolute;
    letter-spacing: .25em;
     //@include rotate(-90deg);
    @include transform-origin(left);
    @include transform(rotate(-90deg) translate(-19rem, 1.3rem) );
    @include break('sm') {
      @include transform(rotate(-90deg) translate(-15rem, 1.3rem) );
    }
    @include break('xs') {
      font-size: 1.0rem;
      @include transform(rotate(-90deg) translate(-8rem, 1.0rem) );
    }
  }
}


.work {
  @include perspective(1500px);

  display: flex;
  flex-flow: row wrap;
  background-size: cover;
  justify-content: center;
  align-items: center; // vertically
  //align-items: stretch;
  img {
    // flex-direction: row;
    margin: auto; 
    @include break('md') {
      width: 100%;
      min-height: 0px;
    } 
  }

  video {
    margin: auto;
    //padding-left: 3rem;
    display: flex;
    // flex-basis: auto;
    // flex-direction: row;
    max-width: 720px;
    //max-height: 480px;
    // margin: auto; 
    @include break('md') {
      width: 100%;
      min-height: 0px;
    } 
    @include break('sm') {
      padding-left: 2rem;
    }
  }

}

</style>
