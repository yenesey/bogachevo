<template lang="pug">
  .hero
    Animation
    header.flex.row(:style="{height: headerHeight + 'px'}")
      .sm.span-12
        .flex.row
          .xs.span-1.offset-2.hidden-xs-down
            img.maskot(src="/images/logo.png")
          nav.xs.span-7.menu
            a(href="#works" v-smooth-scroll) Работы
            a(href="#about" v-smooth-scroll) Обо мне
            a(href="#contact" v-smooth-scroll) Контакты
            a(href="#hobby") Прочее...

    .flex.row
      .xs.span-6.offset-2
        .greeting.flex.column
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

//$MENU-BK-COLOR: #07102c;
 $HERO-BK-COLOR: #07102c;
//$HERO-BK-COLOR: rgb(13, 29, 49);

.hero {
  background-color: $HERO-BK-COLOR;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  height: 90vh;
}

header {
  height: 88px;
  @include transition(height .3s cubic-bezier(.645,.045,.355,1));
  position: fixed;
  z-index: 12;
  align-items: center; // vertically
  background-color: $HERO-BK-COLOR;
  border-bottom: 1px solid #333d61;
  div { // all nested divs
    height: 100%
  }
}

.menu {
  background-color: $HERO-BK-COLOR;
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

.greeting {
  justify-content: center;
  top:0;
  bottom:0;
  position: absolute;
  z-index: 2;
  color: #edf4ff;
  font-size: 3rem;
  line-height: 2.0em;
  
  animation: RGBshift 15s infinite alternate;

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
//-------------------------------------------------------------------------------


@keyframes RGBshift{
	0%{
		@include rotate(0deg);
    text-shadow:5px 10px 0px rgb(245, 245, 241);
    opacity:1;
	}
	6%{
   @include rotate(0.5deg);
   @include scale(1.01);
    text-shadow:
     1px 1px 0px rgba(255,0,0,0.5),
     -5px -2px 0px rgba(0,255,0,0.5),
     -2px 4px 0px rgba(0,0,255,0.5);
    opacity:1;
	}
  10%{
    @include rotate(0deg);
    text-shadow:
     8px -2px 0px rgba(255,0,0,0.5),
     -5px -2px 0px rgba(0,255,0,0.5),
     2px -2px 0px rgba(0,0,255,0.5);
    opacity:0.6;
  }
  12%{
    text-shadow:none;
    opacity:1;
  }
  58%{
    @include rotate(0deg);
    text-shadow:none;
    opacity:1;
  }
  59%{
     text-shadow:-5px -8px 0px rgb(245, 245, 241);
    opacity:0.6;
  }
  62%{
    @include rotate(-0.5deg);
    @include scale(1.01);
    text-shadow:
     8px -2px 0px rgba(255,0,0,0.5),
     -5px -2px 0px rgba(0,255,0,0.5),
     2px -2px 0px rgba(0,0,255,0.5);
    opacity:1;
  }
  64%{
    @include rotate(-0.75deg);
    @include scale(1.01);
  }
  67%{
    text-shadow:none;
    @include rotate(0deg);
  }
	100%{
    @include rotate(0deg);
	}
}

</style>
