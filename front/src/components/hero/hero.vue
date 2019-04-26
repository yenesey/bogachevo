<template lang="pug">
  .hero
    Animation
    transition(name="popover")
      popover(name="maskot") Я - маскот сайта.
    transition(name="popover")  
      popover(name="other") Раздел "Прочее" сейчас в процессе. Планирую добавить образовательный материал для школьников, связанный тригонометрией и 3D графикой
    header.flex.row(:style="{height: headerHeight + 'px'}")
      .sm.span-12
        .flex.row
          .xs.span-1.offset-2.hidden-xs-down(ref="maskot")
            img.maskot(src="/images/logo.png" v-popover:maskot)
          nav.xs.span-7.menu
            a(href="#works" v-smooth-scroll) Работы
            a(href="#about" v-smooth-scroll) Обо мне
            a(href="#contact" v-smooth-scroll) Контакты
            a.disabled(href="#hobby" v-popover:other) Прочее...

    .xs.span-6.offset-2
      .flex.column.greeting
        span Привет!
        span Меня зовут Денис
        span Я создаю web приложения
   
    .scroll
      svg(width="40px" height="100%" viewBox="0 0 247 590" version="1.1"  xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink")
        path#wheel(d="M123.359,79.775l0,72.843", style="fill:none;stroke:#fff;stroke-width:20px;")
        path#mouse(d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z", style="fill:none;stroke:#fff;stroke-width:20px;")
    
</template>

<script>
import Animation from './animation'

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
    
    var back = this.$refs.maskot
    var maskot = back.querySelector(".maskot");

    back.addEventListener('mouseout', e => {
    	maskot.style.transform = `perspective(300px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    })

    back.addEventListener('mousemove', e => {
      let w = back.clientWidth;
    	let h = back.clientHeight;
    	let y = (e.offsetX - w * 0.5) / w * 55;
    	let x = (1 - (e.offsetY - h * 0.5)) / h * 55;
    	maskot.style.transform = `perspective(300px) rotateX(${x}deg) rotateY(${y}deg)`;
    })
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

.hero {
  background-color: $HERO-BK-COLOR;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  height: 90vh;
}

header {
  height: 6.125rem;
  @include transition(height .5s ease);
  position: fixed;
  z-index: 10;
  align-items: center; // vertically
  background-color: $HERO-BK-COLOR;
  border-bottom: 1px solid #333d61;
  div { // all nested divs
    height: 100%
  }
}

.disabled {
  //pointer-events: none;
  cursor: default;
  color: gray !important;
}

.menu {
  background-color: $HERO-BK-COLOR;
  font-size: 1.2rem;
  align-items: center; // vertically
  display: flex;
  justify-content: flex-end;
  
  a {
    margin-left: 2em;
    @include break('sm') {
      margin: auto;
    }
    @include animated-link($NAV-ITEM-COLOR, #7ed8f3, 2px);
  }
}

.greeting {
  justify-content: center;
  top: 89px;
  height: 75vh;
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
  @include break('xs') {
    font-size: 1.6rem;
    margin: 1rem !important;
  }
}

img.maskot {
  display: flex;
  height: 95%;
  border-radius: 50%;
  @include transition(all 0.4s cubic-bezier(0.39, 0.575, 0.565, 1));
  @include break('xs') {
    margin: auto;
    @include translate(0, 0);
  }
}

//--------------------animate scroll down image--------------------------------
@keyframes scroll {
	0% {
		@include translateY(0);
	}
	30% {
		@include translateY(60px);
	}
}

svg #wheel {
	animation: scroll ease 2s infinite;
}

.scroll{
  @include scale(0.7);
  z-index: 9;
  position: absolute;
  top: 78vh;
  margin-left: 80%;
}
//----------------------animate hello text---------------------------------

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
