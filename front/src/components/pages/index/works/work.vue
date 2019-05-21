<template lang="pug">
  div
    .flex.row
      .xs.span-12
        .work(:style="bgStyle" @click="perspective=!perspective")
          .video-container(:class="perspective?'perspective':''")
            span {{title}}
            video(:src="`/works/videos/${name}.mp4`" autoplay="autoplay" loop="loop"  preload="auto" muted="muted" type="video/mp4")

    .flex.row
      .xs.span-8.offset-2
        .flex.row.requisites
          .md.span-6.link
            span.subheading Роль: {{role}}
          .md.span-6
            .flex.row.link(v-if="git" style="justify-content: left;")
              svg(height="24" viewBox="0 0 16 16" version="1.1" width="32" style="margin-left:auto;")
                path(fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z")
              a(:href="git" style="margin-left:0 !important") {{git}}
            .flex.row.link(v-if="link")
              a(:href="link") {{link}}

    .flex.row(style="margin-bottom: 2rem;")
      .xs.span-8.offset-2
        .flex.column
          span.subheading(style="text-align: justify; margin:auto;padding: .5rem;") {{description}}  

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

.requisites {
  flex-flow: row wrap-reverse !important;
  padding: .5rem; 
  justify-content: space-between; 
  //align-items: center;
}

.link {
  padding-bottom: .2rem;
  display: flex;
  font-size: 1.0rem;
  a {
    margin-top: 0.2rem;
    margin-left: auto;
    line-height:1.1rem;
    @include animated-link(rgb(2, 8, 93), rgb(87, 121, 233))
    @include break('md'){
      margin: auto;
    }
  }  
  span {
    @include break('md'){
      margin: auto;
      text-align: center;
    }
  }
}


</style>
