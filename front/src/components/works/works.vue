<template lang="pug">
  #works
    .flex-row
      .xs.span-10.offset-1.works-header
        h1.title Мои работы
        h1.subtitle Мой собственный проект, и работа на заказ.
    
    Work(title="Synapse")
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

.works-header {
  margin: 3rem 0rem 3rem  0rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Proxima Nova';
  word-break: unset;

  @include break('md') {
    flex-direction: column;
    text-align: center;
  }
}

.title {
  font-size: 2rem;
  font-weight: bold;
  @include break('md') {
    margin: 0;
  }
}

.subtitle {
  font-style: italic;
  font-size: 1.5rem;
  font-weight: 300;
}

</style>
