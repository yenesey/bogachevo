<template lang="pug">
  #about.about
    .flex.row
      .xs.span-8.offset-2.works-header
        h1.title.shadow Обо мне
    .flex.row
      .xs.span-2.offset-2
        .flex.column.photo
          img.me(src="@/assets/me.png")
          span.heading Денис Богачев
          span.subheading(style="color: #4e4e4e") Web-разработчик
          span.subheading(style="color: #4e4e4e") специалист IT
      .xs.span-6(style="padding: 1rem")
          span.subheading Работаю IT сфере, связанной с финансами. Начинал в Сберегательном Банке с системного администрирования и сопровождения, а затем занимался управлением IT услугами (ITSM). После 5 лет работы в Сбербанке, перешел в небольшой коммерческий банк, где было больше возможностей реализовать свой творческий потенциал. В настоящее время являюсь заместителем руководителя отдела программного обеспечения. Принимаю участие в разработке банковского ПО и интеграционных сервисов. В разные годы жизни, работал с разными языками, от связки VBA и TransactSQL, до Delphi, С/С++. В последнее время активно интересуюсь Web-технологиями.

    .flex.row
      h2.heading(style="display:flex; margin: auto;") Знаю / умею

    .flex.row
      .xs.span-8.offset-2
        .skills.flex.row
          span html 
          span css
          span sass
          span js(es6)

    .flex.row
      .xs.span-8.offset-2
        .flex.row.skills
          span nodejs
          span mongo db
          span webpack
          span vue
          span vuetify
          span nuxt
          span web3
    .flex.row
      .xs.span-8.offset-2
        .flex.row.skills
          span git
          span jira
          span trello
          span vscode
          span hubstaff
    .flex.row(style="height: 2rem")

</template>

<script>
export default {

}
</script>

<style lang="scss">

.about {
  background-color: rgb(210, 227, 246);
  background-image: url('/works/backgrounds/synapse.jpg');
  background-size: cover;
}

.skills {
  justify-content: center;
  margin: .5rem 0;

  span {
    margin: 0.5rem;
    display: flex;
    line-height: 1.5;
    padding-left: .75em;
    padding-right: .75em;
    white-space: nowrap; 
    background-color: #fff;
    border-radius: 4px;
    text-transform: uppercase;
  }
}

.photo {
  margin: auto;
  padding: 1rem;
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
  }
}

</style>
