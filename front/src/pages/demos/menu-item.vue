<template lang="pug">
  .sm.span-4
    router-link.demo-item.flex.column.mv-14.mh-8(:to="link")
      img(:src="`/demos/images/${name}.jpg`")
      span.flex.fs-14.pt-4 {{title}}
      span.flex.fs-10.pt-2 {{description}}
</template>

<script>
export default {
  props: ['name', 'title','description'],
  computed: {
    link () {
      var path = this.$router.currentRoute.path
      if (path.charAt(path.length-1) != '/') path = path + '/'
      return path + this.name
    }
  }
}
</script>

<style lang="scss">

.demo-item {
  // cursor: pointer;
  text-decoration: none;
  justify-content: left;
  align-items: left; // vertically
  
  color: black;
  &:visited {
    color: green;
  }

  &:hover {
    color: darkblue;
    img {
      box-shadow: -2px 2px 8px grey;
      @include translateY(-1px);
    }
  }

  img {
    @include transition(all .2s ease);
    box-shadow: 0px 0px 2px grey;
    border: 1px outset transparent;
    outline: 1px solid transparent;
    border-radius: 2px;
    max-width: 400px;
    max-height: 223px;
    width: 100%;
    // height: 100%;
    //object-fit: contain;
  }
  span {

  }
}

</style>
