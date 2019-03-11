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
}

.links {
  align-content: center; //v
  justify-content: center; // h
  margin: 0 !important;
  padding-bottom: .5rem;
  font-size:0.95rem;

  a {
    color: $NAV-ITEM-COLOR;
    @include animated-link($NAV-ITEM-COLOR, rgb(144, 180, 226))
  }

  span {
    color: $NAV-ITEM-COLOR;
  }

}
</style>
