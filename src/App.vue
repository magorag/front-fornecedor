<template>

  <div id="app">
    <NavBar v-if="!$store.state.auth.credencial.admin"/>
    <NavBarAdmin v-if="$store.state.auth.credencial.admin === 1"/>
    <Banner />
    <div class="app_content">
      <router-view/>
    </div>
  </div>

</template>

<style lang="scss">

@import url('https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css');
@import url('https://fonts.googleapis.com/css?family=Exo+2:300,300i,400,400i,700,700i,900,900i&display=swap');
@import 'scss/variables.scss';

*:focus {
    outline: 0;
}

html {
    background: #FFF;
    @media(min-width: $min-lg) {
        font-size: 10px;
    }
    @media(max-width: $max-md) and (min-width: $min-md) {
        font-size: 8px;
    }
    @media(max-width: $max-sm) and (min-width: $min-sm) {
        font-size: 6.5px;
    }
    @media(max-width: $max-xs) {
        font-size: 6px;
    }
}

body {
    font-family: 'Exo 2', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#app {
  overflow-y: scroll;
}

.app_content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import NavBar from '@/components/NavBar.vue'
import Banner from '@/components/Banner.vue'
import NavBarAdmin from '@/components/NavBarAdmin.vue'
import fornecedores from "@/services/fornecedores.js";
import users from "@/services/users.js";


export default {
  name: 'app',
  components: {
    NavBar,
    Banner,
    NavBarAdmin
  },
  watch: {
    '$route' (to, from) {
      const content = document.querySelector('#content')
      if(to.meta.needAuth && content != null) {
        setTimeout(()=> content.scrollIntoView({block: "start", behavior: "smooth"}), 100)
      }
    }
  },
  created: async function () {
    if (!this.$session.has("session-id")) {
      await this.$router.push("/");
    } else {
      fornecedores.listar().then(resposta => {
        this.fornecedores = resposta.data;
        users.userLogged(localStorage.getItem('token')).then(resposta2 => {
          this.admin = resposta2.data.admin;
          this.user = resposta2.data.name;
          this.loading = false;
        });
      });
    }
  },
  computed: {
    loginPage() {
      return this.$route.name === "login";
    }
  }
}
</script>
