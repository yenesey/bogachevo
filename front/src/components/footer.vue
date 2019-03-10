<template lang="pug">
  footer.flex.column
    .flex.row.links
      span Создано с использованием &nbsp;
      a(href="https://nodejs.org") Nodejs
      span &nbsp;+&nbsp;
      a(href="https://webpack.js.org") Webpack
      span &nbsp;+&nbsp;
      a(href="https://vuejs.org") Vue.js
    .flex.row.links
      a(href="https://github.com/yenesey/bogachevo") код на GitHub
</template>

<script>
export default {

}
</script>

<style lang="scss">
footer {
  background-color: $HERO-BK-COLOR;
  font-family: "Proxima Nova";
  height: 6.125rem;
  justify-content: center;

  > span {
    margin: 0 auto;
  }
  a {
    color: $NAV-ITEM-COLOR;
    line-height: 1.5rem;
    @include animated-link($NAV-ITEM-COLOR, rgb(144, 180, 226))
  }
  span {
    line-height: 1.5rem;
    color: $NAV-ITEM-COLOR;
    font-size:1.1rem;
  }
  .links {
    justify-content: center;
    margin: 0;
  }
}
</style>
