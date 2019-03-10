<template lang="pug">
  div
    .flex.row
      .xs.span-12
        .work(:style="bgStyle" @click="perspective=!perspective")
          .video-container(:class="perspective?'perspective':''")
            span {{title}}
            video(:src="`/works/videos/${name}.mp4`" autoplay="autoplay" loop="loop"  preload="auto" muted="muted" type="video/mp4")

    .flex.row(style="padding: 1rem;")
      .md.span-8.offset-2.link
        a(v-if="link" :href="link") {{link}}
        a(v-if="git" :href="git") {{git}}
      
      .md.span-2.offset-2
        .flex.row
          .flex.subheading(style="padding: 0.5rem;text-align:center") 
            span Роль: {{role}}
      .md.span-6
        .flex.column
          span.subheading(style="text-align: justify; margin:auto;padding: .5rem") {{description}}


    .flex.row(style="height: 2rem")       

</template>

<script>
export default {
  props: ['title','name', 'description', 'role', 'link', 'git'],
  data () {
    return {
      bgStyle: {
        backgroundImage: `url('/works/backgrounds/synapse.jpg')`
      },
      perspective: true
    }
  }
}
</script>

<style lang="scss">

.work {
  @include perspective(1200px);
  display: flex;
  flex-flow: row wrap;
  background-size: cover;
  justify-content: center;
  align-items: center; // vertically
}

.video-container {
  //transform: matrix3d(0.866122, 0, -0.499833, 0, 0.203238, 0.913601, 0.352176, 0, 0.456648, -0.406612, 0.79129, 0, 0, 0, 0, 1);
  border: 1px outset transparent;
  transform-style: preserve-3d;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
  outline: 1px solid transparent;
  @include transition(all .5s ease);
  @include transform-origin(left);
  box-shadow: -1px 1px 2px black;

  @include transform(rotateX(0deg) rotateY(0deg) rotateZ(0deg)  translateX(0rem) );
  &.perspective { 
    @include transform(rotateX(14deg) rotateY(24deg) rotateZ(-4.0deg)  translateX( 2rem) );
    box-shadow: -4px 4px 13px black;
  }
  &.perspective:hover {
    @include transform(rotateX(15deg) rotateY(25deg) rotateZ(-4.62deg)  translateX( 2rem) );
  }
  &:hover {
    @include transform(rotateX(1deg) rotateY(3deg) rotateZ(0deg)  translateX( 0rem) );
    box-shadow: -2px 2px 13px black;
  }
  text-align: center;
  span {
    // font-family: 'Proxima Nova';
    font-size: 1.6rem;
    font-weight:bold;
    //position:absolute;
    letter-spacing: .25em;
    /*
    @include rotate(-90deg);

    @include transform-origin(left);
    @include transform(rotate(-90deg) translate(-19rem, 1.3rem) );
    @include break('sm') {
      @include transform(rotate(-90deg) translate(-15rem, 1.3rem) );
    }
    */
    @include break('xs') {
      font-size: 1.0rem;
      // @include transform(rotate(-90deg) translate(-8rem, 1.0rem) );
    }
  }

  video {
    margin: auto;
    display: flex;
    max-width: 920px;
    @include break('md') {
      width: 100%;
    } 
  }

}

.link {
  padding-bottom: .2rem;
  display: flex;
  font-family: inherit;
  font-size: 1.2rem;
  a {
    margin: auto;
    @include animated-link(rgb(2, 8, 93), rgb(87, 121, 233))
  }
}


</style>
