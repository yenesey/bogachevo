<template lang="pug">
  .sm.span-4
    .demo
      span Telegram contest
      // video(:src="`/works/videos/telegram-contest.mp4`" autoplay="autoplay" loop="loop"  preload="auto" muted="muted" type="video/mp4")
</template>

<script>
export default {
  props: ['title','name', 'description', 'role', 'link', 'git'],
  data () {
    return {}
  }
}
</script>

<style lang="scss">

.demo {
  @include transition(all .5s ease);
  display: flex;
  flex-flow: row wrap;

  justify-content: center;
  align-items: center; // vertically
  margin: 0.5rem;

   // @include transform(rotate(-4deg));
  border: 1px outset transparent;
  outline: 1px solid transparent;

  box-shadow: 0px 0px 2px grey;
  &:hover {
    box-shadow: -2px 2px 8px grey;
    // @include scale(1.001, 1.001);
    // @include transform(rotate(-2deg) scale(1.001, 1.001));
  }
 
  video {
    // flex-grow: 1;
    width: 100%;
  }
}
    /* 
    word-break: unset;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
*/
</style>
