<template lang="pug">
div
  .flex.row(style="height:2em")
  .flex.row
    .xs.span-8.offset-2
      .flex.row(style="justify-content: center;")
        Item(name="telegram-contest" title="Telegram contest" description="March 2019 coding competition by Telegram")
        Item(name="demo3d" title="Введение в 3D гарфику" description="Вводный интерактивный материал по трехмерной графике для начинающих")
</template>

<script>
import Item from './menu-item'
export default {
  components: { Item }
}
</script>
