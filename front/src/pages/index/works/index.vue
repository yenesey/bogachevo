<template lang="pug">
  section#works
    .flex.row
      .xs.span-8.offset-2.works-header
        h1.title.shadow Мои работы
        h2.subtitle Фриланс и собственные проекты
    Work(
      name="burntoken", 
      title="Burn Token", 
      description="DApp (приложение на базе блокчейна), предназначенное для уничтожения бесполезных (sсam) токенов стандарта ERC20 в сети Ethereum за вознаграждение"
      role="фронтэнд, бэкенд, перенос статичного дизайна на Vue", 
      link="https://burntoken.xyz"
    )
    Work(
      name="synapse", 
      title="Synapse",
      description="Web-приложение для быстрой интеграции разнообразных банковских ИТ-систем, включая как собственные (legacy), так и получаемые в обязательном порядке от Регулятора (ЦБ). Приложение имеет собственную систему контроля доступа, объединенную с корпоративной Active-Directory. Интеграция производится посредством модулей, чаще всего, реализующих отдельные микро-сервисы"
      role="идея, архитектура, фронтэнд, бэкенд", 
      git="https://github.com/yenesey/Synapse"
    )

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

.works-header {
  margin: 1.5rem 0rem 1.5rem  0rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // font-family: 'Proxima Nova';
  word-break: unset;

  @include break('md') {
    flex-direction: column;
    text-align: center;
  }
}

</style>
