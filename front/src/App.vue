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

@font-face {
	font-family: 'Play';
	src: url('./assets/fonts/Play.woff') format('woff');
	font-weight: normal;
	font-style: normal;
}

@include scrollbars(.6rem, #627891, white);

</style>
