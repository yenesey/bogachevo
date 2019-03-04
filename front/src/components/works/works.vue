<template lang="pug">
  #works
    .flex-row
      .xs.span-8.offset-2.works-header
        h1.title.shadow Мои работы
        h1.subtitle Фриланс и собственные проекты
    
    Work(
      title="Burn Token", 
      name="burntoken", 
      role="Фронтэнд, бэкенд, перенос статичного дизайна на Vue", 
      description="DApp (приложение на базе блокчейна), предназначенное для уничтожения беспослезных (sсam) токенов стандарта ERC20 в сети Ethereum за вознаграждение"
    )
    Work(
      title="Synapse",
      name="synapse", 
      role="Идея, архитектура, фронтэнд, бэкенд", 
      description="Web-приложение для быстрой интеграции разнообразных банковских ИТ-систем, включая как собственные (legacy), так и получаемые в обязательном порядке от Регулятора (ЦБ). Приложение имеет собственную систему контроля доступа, объединенную с корпоративной Active-Directory. Интеграция производится посредством модулей, чаще всего, реализующих отдельные микро-сервисы"
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
@import "@/assets/style/common.scss";

.works-header {
  margin: 3rem 0rem 3rem  0rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Proxima Nova';
  word-break: unset;

  @include break('md') {
    flex-direction: column;
    text-align: center;
  }
}

.title {
  font-size: 2rem;
  font-weight: bold;
  @include break('md') {
    margin: 0;
  }
}

.subtitle {
  font-style: italic;
  font-size: 1.5rem;
  font-weight: 300;
}

</style>
