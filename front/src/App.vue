<template lang="pug">
  div#app
    router-view
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@font-face {
	font-family: 'Proxima Nova';
	src: url('./assets/fonts/ProximaNova-Regular.woff') format('woff'); 
}

::-webkit-scrollbar-thumb {
  background-color: #627891;
}
::-webkit-scrollbar {
    width: .6rem;
    border-left: 1px solid #e6ecf8;
}
</style>
