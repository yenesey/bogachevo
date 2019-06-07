<template lang="pug">
div
  .flex.row(style="height:2em")
  .flex.row
    .xs.span-8.offset-2
      .flex.row(style="justify-content: center;")
        Item(name="3d-graphics/part-1" title="Трехмерная графика - первые шаги. Часть 1" description="Интерактивное пособие для уроков математики и информатики старших классов средней школы")
        Item(name="3d-graphics/part-2" title="Трехмерная графика - первые шаги. Часть 2" description="Интерактивное пособие для уроков математики и информатики старших классов средней школы")
        Item(name="3d-graphics/part-3" title="Трехмерная графика - первые шаги. Часть 3" description="Интерактивное пособие для уроков математики и информатики старших классов средней школы")
        Item(name="telegram-contest" title="Конкурс от Telegram" description="Конкурc программистов от команды Telegram (март 2019)")
</template>

<script>
import Item from './menu-item'
export default {
  components: { Item }
}
</script>
