<template lang="pug">
  #about.about
    .flex-row
      .xs.span-10.offset-1.works-header
        h1.title Вкратце
    .flex-row
      .xs.span-2.offset-1.photo
        img.me(src="@/assets/me.jpg")
        | Инженер, программист, менеджер и просто IT-энтузиаст
      .xs.span-8
        span Здравствуйте! Меня зовут Денис. Большую часть жизни, я работаю в банковской сфере в отделе информационных технологий. Начинал в Сберегательном Банке с системного администрирования и сопровождения, а затем занимался управлением ИТ услугами (ITSM). После 5 лет работы в Сбербанке, перешел в небольшой коммерческий банк, где было больше возможностей реализовать свой творческий потенциал. В настоящее время являюсь заместителем руководителя отдела программного обеспечения. Несмотря на управленческую должность, принимаю участие в разработках, потому что отдел небольшой и мне нравится кодить самому. В разные годы жизни, работал с разными языками, от связки VBA и TransactSQL, до Delphi, С/С++. В последнее время активно интересуюсь Web-технологиями.
          | Для саморазвития и облегчения повседневной работы, разработал и внедрил свой проект на Node.js, Express, Vue.js, Webpack. Более 2 лет успешно развиваю и использую в работе.


</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "@/assets/style/common.scss";

.about {

  background-color: rgb(185, 211, 241)
  ::span {
    font-size: 2rem;

  }
}

.photo{
  //margin: 2rem;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}

img.me {
  display: flex;
  height: 128px;
  width: 128px;
  border-radius: 50%;
  @include break('xs') {
    margin: auto;
    @include translate(0, 0);  
  }
}

</style>
