<template lang="pug">
  .flex-row.contact#contact
    .flex-row
      .xs.span-8.offset-2.contact
        h1.title.shadow(style="color:#7ed8f3;") Контакты
        
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "@/assets/style/common.scss";

.contact {
  display: flex;
  align-items: center;
  justify-content: space-between;
 
  height: 400px;
  background-color: rgb(13, 29, 49)
}

</style>
