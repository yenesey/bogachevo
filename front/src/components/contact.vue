<template lang="pug">
  .flex.row.contact#contact
    Icons
    .xs.span-8.offset-2.works-header
      h1.title.shadow Контакты
      .flex.row(style="width:auto")
        .flex
          .wrap-contact(@click="clipboard('+7(923)30-66664')")
            svg.icon
              use(xlink:href="#phone")
            span +7(923)30-66664
        .flex
          .wrap-contact(@click="follow('https://t.me/bacchuss')")
            svg.icon
              use(xlink:href="#telegram")
            span https://t.me/bacchuss
        .flex
          .wrap-contact(@click="follow('mailto:d.enisei@yandex.ru')")
            svg.icon
              use(xlink:href="#mail")
            span d.enisei@yandex.ru

</template>

<script>
import Icons from './common/icons'

export default {
  components: {
    Icons
  },
  methods: {
    follow (link) {
      window.open(link, '_newtab')
      this.flash('Открыто в соседней вкладке', 'info', {timeout: 6000})
    },
    clipboard (text) {
      if (typeof text === 'undefined') return
      var copytext = document.createElement('input')
      copytext.value = text
      document.body.appendChild(copytext)
      copytext.select()
      document.execCommand('copy')
      document.body.removeChild(copytext)
      this.flash('Скопировано в буфер обмена', 'info', {timeout: 6000})
    }
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
    cursor: pointer;
    border-radius: .2rem;
    display: flex;
    align-items: center;
    padding : 1rem;
    @include transition(all .5s cubic-bezier(0.39, 0.575, 0.565, 1));
    &:hover{
      background: $HIGHLIGHT-ITEM-COLOR;
    }
  }

}

</style>
