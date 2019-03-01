<template lang="pug">
  .grid-row#works
    .xs.span-10.offset-1.works-header
      h1.title Мои работы
      h1.subtitle Избранные проекты в которых я принимал активное участие
    
    Work(title="Synapse")
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
  font-size: 3rem;
  word-break: unset;

  @include break('md') {
    padding: 1rem;
    flex-direction: column;
    text-align: center;
  }
}

.title {
  font-size: 1em;
  font-weight: bold;
  @include break('md') {
    margin: 0;
  }
}

.subtitle {
  font-style: italic;
  font-size: .5em;
  font-weight: 300;
}

</style>
