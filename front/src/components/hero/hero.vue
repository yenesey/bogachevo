<template lang="pug">
  .hero
    Animation  
    header.grid-row.header(:style="{height: headerHeight + 'px'}")
      .xs.span-12
        .grid-row
          .xs.span-1.offset-1
            img.maskot(src="@/assets/maskot.png")
          .xs.span-9.nav.menu
            a(href="#works" v-smooth-scroll) Мои работы
            a(href="#") Контакты
            a(href="#") Прочее...
    .grid-row
      .sm.span-6.offset-1
        .wrap
          span Привет!
          br
          span Меня зовут Денис
          br
          span Я создаю web приложения
</template>

<script>
import Animation from './animation'
import Vue from 'vue'
import vueSmoothScroll from 'vue-smooth-scroll'
Vue.use(vueSmoothScroll)

export default {
  data () {
    return {
      headerHeight: 88
    }
  },
  components: {
    Animation
  },
  
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      if (window.pageYOffset > 10) {
        this.headerHeight=44
      } else {
        this.headerHeight=88
      }  
    }
  }
}
</script>

<style lang="scss">

@import "@/assets/style/common.scss";

.hero {
  background-color: #07102c;
  //background-color: #161b25;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  height: 90vh;
/*
  &:after {
    content: '';
    position: absolute;
    top: 88px;
    left: 0;
    right: 0;
    height: 80vh;
    background-image: radial-gradient(circle at 15%,rgba(33,42,57, .42 ) 10%,rgba(25,32,43,0));
    z-index: 3;
  }
*/
}

.header {
  height: 88px;
  @include transition(height .3s ease);
  position: fixed;
  z-index: 12;
  align-items: center; // vertically
  background-color: #07102c;
  border-bottom: 1px solid #333d61;
//  justify-content: space-around;
  div { // all nested divs
    height: 100%
  }
}

.menu {
  background-color: #07102c;
  font-family: 'Proxima Nova';
  font-size: 1.1rem;
  align-items: center; // vertically
  display: flex;
  justify-content: flex-end;
  
  a {
    margin-left: 2em;
    text-decoration: none;
    color: #edf4ff;

    @include break('xs') {
      margin: auto;
    }

    &:hover {
      color: #7ed8f3;
    }
    &:after {
      content: '';
      display: block;
      margin: auto;
      height: 2px;
      width: 0;
      background: transparent;
      @include translate(50%, 0);
      @include transition(width .3s ease, transform .3s ease,  background-color .5s ease);
    }

    &:hover:after {
      @include translate(0, 0);
      width: 90%;
      background-color: #7ed8f3;
    }
  }
}

.wrap {
  position: absolute;
  z-index: 2;
  margin: 18rem 0rem 0rem 0rem;

  color: #edf4ff;
  font-family: 'Proxima Nova';
  font-size: 3rem;
  word-break: unset;
  line-height: 1.6em;
  @include break('md') {
    font-size: 2rem;
    margin: 12rem 0 0 3rem;
  }
  @include break('sm') {
    font-size: 1.8rem;
    margin: 12rem 0 0 3rem;
  }
}

img.maskot {
  display: flex;
  height: 95%;
  border-radius: 50%;
  margin-left:30%;
  @include translate(-50%, 0);  

  @include break('xs') {
    margin: auto;
    @include translate(0, 0);  
  }
}

</style>
