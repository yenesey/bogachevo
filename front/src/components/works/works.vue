<template lang="pug">
  #works
    .grid-row
      .xs.span-10.offset-1.works-header
        h1.title Мои работы
        h1.subtitle Проекты, полностью мои, и с моим участием
    .separator
    Work(title="Synapse")
    .separator
    Work(title="Burn Token")
</template>

<script>
import Work from './work'
export default {
  components: {
    Work
  }
}

</script>

<style lang="scss">
@import "@/assets/style/common.scss";


.separator {
  height: .5rem;
  position: relative;
  border-left: 50vw solid transparent;
  border-right: 0px solid transparent;
  border-bottom: .5rem solid #07102c;
}

.works-header {
  margin: 3rem 0rem 3rem  0rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Proxima Nova';
  // font-size: 3rem;
  word-break: unset;

  @include break('md') {
    padding: 1rem;
    flex-direction: column;
    text-align: center;
  }
}

.title {
  font-size: 3em;
  font-weight: bold;
  @include break('md') {
    margin: 0;
  }
}

.subtitle {
  font-style: italic;
  font-size: 1.5em;
  font-weight: 300;
}

</style>
