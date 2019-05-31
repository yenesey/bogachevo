<template lang="pug">
  .flex.row
    CommonIcons
    .xs.span-8.offset-2
      .flex.row.mv-20
        .md.span-8
          .flex.row
            span.fs-15 Модуль отображения графиков для конкурска разработчиков Telegram
          .flex.row.mv-10
            span.fs-10 Чистый JS и Canvas. Cторонние библиотеки не допускается
        .md.span-4
          .flex.row.link
            svg(height="24" width="32"  style="margin-left:auto;")
              use(xlink:href="#github")
            a(href="https://github.com/yenesey/vanilla-chart" style="margin-left:0 !important") https://github.com/yenesey/vanilla-chart

      .flex.row
        .xs.span-6(v-for="(chart, i) in chartData" style="justify-content: center")
          span.fs-15 Chart {{i}}
          .chart-container.flex.mh-8(:id="'chart'+i")
</template>

<script>
require('./vanilla-chart.js')
const _data = require('./chart_data.json')

export default {
  data () {
    return {
      chartData : _data,
    }
  },
  mounted () {
    for (var i = 0; i < this.chartData.length; i++) {
      let chart = new VanillaChart('chart' + i, this.chartData[i])
      this.$nextTick().then(() => chart.resize())
    }
  }
}
</script>

<style lang="scss">
.chart-container {
  // background-color: brown;
  height: 400px;
  @include break('xs') {
    height: 80vh;
  }
}

/*
canvas {
  display: flex;
  width: auto;
  height: auto;
}
*/
</style>
