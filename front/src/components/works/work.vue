<template lang="pug">
div
  .flex-row.work-header
    .md.offset-3
      .tab 
        h1 {{title}}

  .flex-row
    .xs.span-12      
      .work(:style="bgStyle")
        img(:src="`/works/images/${name}.jpg`")

  .flex-row
      .md.span-2.offset-2.photo
        .flex-column
          span.subheading(style="color: #4e4e4e") Роль: {{role}}
      .md.span-6(style="padding: 1rem")
          span.subheading {{description}}
</template>

<script>
export default {
  props: ['title','name', 'description', 'role'],
  data () {
    return {
      bgStyle: {
        backgroundImage: `url('/works/backgrounds/synapse.jpg')`
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/common.scss";

.tab {
  width: 300px;
  //border-radius: 1.5rem;
  border-bottom: 2.6rem solid rgb(216, 230, 252);
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  height: 0;
  text-align: center;
  h1 {
    font-size: 1.8rem;
    margin:0;
  }
}

.work-header {
  height: 5.5rem;
  display: flex;
  // align-items: center; 
  align-items: flex-end;
  // background-color: #c9f8fb;
  @include break('xs') {
    text-align: center;
  }
}

.work {
  position: relative;
  display: flex;
  background-size: cover;
  align-items: center; // vertically
  img {
    // flex-direction: row;
    margin: auto; 
    @include break('md') {
      width: 100%;
      min-height: 0px;
    } 
  }
}

/*
.bg:after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(bottom, #fff, rgba(255,255,255,0) 40%);
}
*/
</style>
