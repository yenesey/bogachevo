<template lang="pug">
  #about.about
    .flex-row
      .xs.span-8.offset-2.works-header
        h1.title.shadow Обо мне
    .flex-row
      .xs.span-2.offset-2.photo
        .flex-column
          img.me(src="@/assets/me.png")
          span.heading Денис Богачев
          span.subheading(style="color: #4e4e4e") Инженер, программист, менеджер и просто IT-энтузиаст
      .xs.span-7(style="padding: 1rem")
          span.subheading Работаю IT сфере, связанной с финансами. Начинал в Сберегательном Банке с системного администрирования и сопровождения, а затем занимался управлением IT услугами (ITSM). После 5 лет работы в Сбербанке, перешел в небольшой коммерческий банк, где было больше возможностей реализовать свой творческий потенциал. В настоящее время являюсь заместителем руководителя отдела программного обеспечения. Принимаю участие в разработке банковского ПО и интеграционных сервисов. В разные годы жизни, работал с разными языками, от связки VBA и TransactSQL, до Delphi, С/С++. В последнее время активно интересуюсь Web-технологиями.
  
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "@/assets/style/common.scss";

.about {
  background-color: rgb(210, 227, 246);
  background-image: url('/works/backgrounds/synapse.jpg')
}
.shadow {
  box-shadow: inset 0 -6px 0 rgba(170, 78, 255, 0.2);
}

.photo {
  padding: 1rem;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}

img.me {
  display: flex;
  margin: auto;
  height: 128px;
  width: 128px;
  border-radius: 50%;
  @include break('xs') {
    margin: auto;
    @include translate(0, 0);  
  }
}

.heading {
  font-family: Roboto,sans-serif;
  font-size: 1.3rem;
  line-height: 2.5rem;
}

.subheading {
  font-family: Roboto,sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.5;
  // text-align: justify;
}

</style>
