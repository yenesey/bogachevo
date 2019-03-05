<template lang="pug">
  .tab
    .caption {{caption}}
</template>

<script>
export default {
  props: ['caption']
}
</script>

<style lang="scss">
@import "@/assets/style/common.scss";

$BK-COLOR: rgb(186, 224, 250);

.tab {
  display: flex;
  text-align: center;
  width: 15rem;
  height: 2.6rem;
  border-radius: 1.2rem 1.2rem 0 0;
  background-color: $BK-COLOR;

  @include break('sm') {
    width: 12rem;
    height: 2.0rem;
  }

  @include break('sm') {
    width: 10rem;
    height: 1.8rem;
  }

  .caption {
    display: flex;
    font-weight: bold;
    margin: auto;
    font-family: 'Proxima nova';
    font-size: 1.8rem;
    @include break('md') {
      font-size: 1.4rem;
    }

    @include break('sm') {
      font-size: 1.2rem;
    }
  }

}
</style>
