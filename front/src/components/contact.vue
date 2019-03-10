<template lang="pug">
  .flex.row.contact#contact
    Icons
    .xs.span-8.offset-2.works-header
      h1.title.shadow Контакты
      .flex.row
        .flex
          .wrap-contact
            svg.icon
              use(xlink:href="#phone")
            span +7(923)30-66664
        .flex
          .wrap-contact
            svg.icon
              use(xlink:href="#telegram")
            span https://t.me/bacchuss
        .flex
          .wrap-contact
            svg.icon
              use(xlink:href="#mail")
            span d.enisei@yandex.ru

</template>

<script>
import Icons from './icons'

export default {
  components: {
    Icons
  }
}
</script>

<style lang="scss">



.contact { 
  display: flex;

  .flex{ 
    justify-content: space-between;
    align-items: center;
  }

  svg {
    margin-right: .5rem;
    width:32px;
    height:32px; 
  }

  .wrap-contact {
    // border-radius: 1rem;
    display: flex;
    align-items: center;
    padding : 1rem;
    @include transition(all .5s cubic-bezier(0.39, 0.575, 0.565, 1));
    &:hover{
      background: rgb(210, 212, 223);
    }
  }

}

</style>
