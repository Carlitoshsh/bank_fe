<template>
  <div id="mi-app" class="app">
    <header>
      <span id="brand">Banco UN</span>
      <nav class="nav-option">
        <button v-if="is_auth" v-on:click="loadHome">Inicio</button>
        <button v-if="!is_auth" v-on:click="loadLogIn">Iniciar Sesión</button>
        <button v-if="!is_auth" v-on:click="loadSignUp">Registrarse</button>
        <button v-if="is_auth" v-on:click="loadAccount">Cuenta</button>
        <button v-if="is_auth" v-on:click="logOut">Cerrar Sesión</button>
      </nav>
    </header>

    <main>
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>

      <div class="alert alert-primary" role="alert">
        This is a primary alert—check it out!
      </div>
      <div class="alert alert-secondary" role="alert">
        This is a secondary alert—check it out!
      </div>
      <div class="alert alert-success" role="alert">
        This is a success alert—check it out!
      </div>
      <div class="alert alert-danger" role="alert">
        This is a danger alert—check it out!
      </div>
      <div class="alert alert-warning" role="alert">
        This is a warning alert—check it out!
      </div>
      <div class="alert alert-info" role="alert">
        This is a info alert—check it out!
      </div>
      <div class="alert alert-light" role="alert">
        This is a light alert—check it out!
      </div>
      <div class="alert alert-dark" role="alert">
        This is a dark alert—check it out!
      </div>
    </main>

    <footer>
      <span>Misión TIC 2022</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      is_auth: false,
    };
  },
  components: {},
  methods: {
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("isAuth") || false;

      if (this.is_auth == false) this.$router.push({ name: "logIn" });
      else this.$router.push({ name: "home" });
    },
    loadHome: function () {
      this.$router.push({ name: "home" });
    },
    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },
    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },
    loadAccount: function () {
      this.$router.push({ name: "account" });
    },
    logOut: function () {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.verifyAuth();
    },
    completedLogIn: function (data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Autenticación Exitosa");
      this.verifyAuth();
    },
    completedSignUp: function (data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },
  },
  created: function () {
    this.verifyAuth();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");

:root {
  --color-primario: #572488;
  --color-texto-claro: rgb(231, 231, 231);
}

#mi-app,
* {
  font-family: "Varela Round", sans-serif;
}

#mi-app {
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  height: 100vh;
  background: var(--color-texto-claro);
}

button {
  background-color: var(--color-primario);
  color: var(--color-texto-claro);
  border: 1px solid var(--color-texto-claro);
  border-radius: 30px;
  padding: 0.3rem 0.5rem;
}
</style>