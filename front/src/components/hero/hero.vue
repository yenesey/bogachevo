<template lang="pug">
  .hero
    Animation
    header.flex-row(:style="{height: headerHeight + 'px'}")
      .sm.span-12
        .flex-row
          .xs.span-1.offset-2.hidden-xs-down
            img.maskot(src="@/assets/maskot.png")
          .xs.span-7.nav.menu
            a(href="#works" v-smooth-scroll) Работы
            a(href="#about" v-smooth-scroll) Обо мне
            a(href="#contact" v-smooth-scroll) Контакты
            a(href="#hobby") Прочее...

    // .xs.span-8.offset-2
          div(style="display:flex; justify-content: space-between")
            img.maskot(src="@/assets/maskot.png")
            nav.menu
              a(href="#works" v-smooth-scroll) Работы
              a(href="#about" v-smooth-scroll) Обо мне
              a(href="#contact" v-smooth-scroll) Контакты
              a(href="#hobby") Прочее...

    .flex-row
      .xs.span-6.offset-2
        .flex-column.wrap
          span Привет!
          span Меня зовут Денис
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

$MENU-BK-COLOR: #07102c;
$HERO-BK-COLOR: #07102c;

.hero {
  background-color: $HERO-BK-COLOR;
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

header {
  height: 88px;
  @include transition(height .3s cubic-bezier(.645,.045,.355,1));
  position: fixed;
  z-index: 12;
  align-items: center; // vertically
  background-color: $MENU-BK-COLOR;
  border-bottom: 1px solid #333d61;
//  justify-content: space-around;
  div { // all nested divs
    height: 100%
  }
}

.menu {
  background-color: $MENU-BK-COLOR;
  font-family: 'Proxima Nova';
  font-size: 1.1rem;
  align-items: center; // vertically
  display: flex;
  justify-content: flex-end;
  
  a {
    margin-left: 2em;
    text-decoration: none;
    color: #edf4ff;

    @include break('sm') {
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
      @include transition(width .3s cubic-bezier(.645,.045,.355,1), transform .3s cubic-bezier(.645,.045,.355,1),  background-color .5s ease);
    }

    &:hover:after {
      @include translate(0, 0);
      width: 90%;
      background-color: #7ed8f3;
    }
  }
}

.wrap {
  justify-content: center;
  top:0;
  bottom:0;
  position: absolute;
  z-index: 2;

  color: #edf4ff;
  font-family: 'Proxima Nova';
  font-size: 3rem;
 // word-break: unset;
  line-height: 2.0em;
  @include break('md') {
    font-size: 2rem;
  }
  @include break('sm') {
    font-size: 1.8rem;
  }
  @include break('sm') {
    font-size: 1.6rem;
    margin: 2rem
  }
}

img.maskot {
  display: flex;
  height: 95%;
  border-radius: 50%;
 // margin-left:30%;
  //@include translate(-50%, 0);  
  @include break('xs') {
    margin: auto;
    @include translate(0, 0);  
  }
}

</style>
