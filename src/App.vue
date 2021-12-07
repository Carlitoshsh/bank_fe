<template>
  <div id="mi-app" class="app">
    <header>
      <span id="brand">Banco UN</span>
      <nav class="nav-option">
        <button v-if="!is_auth" v-on:click="loadLogIn">Iniciar Sesión</button>
        <button v-if="!is_auth" v-on:click="loadSignUp">Registrarse</button>
        <button v-if="is_auth" v-on:click="loadHome">Inicio</button>
        <button v-if="is_auth" v-on:click="loadTransaction">
          Transacciones
        </button>
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
    </main>

    <footer>
      <span>Misión TIC 2022</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    is_auth: {
      get: function () {
        return this.$route.meta.requiresAuth;
      },
      set: function () {},
    },
  },
  methods: {
    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },
    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },
    completedLogIn: function (data) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Autenticación Exitosa");
      this.loadHome();
    },
    completedSignUp: function (data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },
    loadHome: function () {
      this.$router.push({ name: "home" });
    },
    loadAccount: function () {
      this.$router.push({ name: "account" });
    },
    loadTransaction: function () {
      this.$router.push({ name: "transaction" });
    },
    logOut: function () {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.loadLogIn();
    },
  },
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");

:root {
  --color-primario: #572488;
  --color-secundario: #882424;
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

header,
main,
footer {
  padding: 1rem;
}

header {
  background-color: var(--color-primario);
  color: var(--color-texto-claro);
  display: flex;
  align-items: center;
  height: 5rem;

  justify-content: space-between;
}

footer {
  background-color: var(--color-secundario);
  color: var(--color-texto-claro);
}

nav {
  display: flex;
  gap: 1rem;
}
</style>