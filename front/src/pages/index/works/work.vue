<template lang="pug">
  div
    CommonIcons
    .flex.row
      .xs.span-12
        .work(@click="perspective=!perspective")
          .video-container(:class="perspective?'perspective':''")
            span {{title}}
            video(:src="`/main/works/videos/${name}.mp4`" autoplay="autoplay" loop="loop"  preload="auto" muted="muted" type="video/mp4")

    .flex.row
      .xs.span-8.offset-2
        .flex.row.requisites
          .md.span-6.link
            span.subheading Роль: {{role}}
          .md.span-6
            .flex.row.link(v-if="git" style="justify-content: left;")
              svg(height="24" width="32"  style="margin-left:auto;")
                use(xlink:href="#github")
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
  props: ['name', 'title', 'description', 'role', 'link', 'git'],
  data () {
    return {
      perspective: true
    }
  }
}
</script>

<style lang="scss">

.work {
  @include perspective(1200px);
  background: url('/main/images/bg/clowdy.jpg');
  background-size: cover;

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center; // vertically
}

.video-container {
  //transform: matrix3d(0.866122, 0, -0.499833, 0, 0.203238, 0.913601, 0.352176, 0, 0.456648, -0.406612, 0.79129, 0, 0, 0, 0, 1);
  //background-color: antiquewhite;
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
    @include animated-link(rgb(2, 8, 93), rgb(87, 121, 233));
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
