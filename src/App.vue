<template>
  <div id="mi-app" class="app">
    <header>
      <span @click="toggleMenu()">Menu</span>
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

    <div v-show="showMenu" class="left-side">Menu lateral</div>
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
  data: {
    showMenu: false,
  },
  computed: {
    is_auth: {
      get: function () {
        return this.$route.meta.requiresAuth;
      },
      set: function () {},
    },
  },
  methods: {
    toggleMenu: function () {
      this.showMenu = !this.showMenu;
    },
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
@import url("https://fonts.googleapis.com/css2?family=Karla&display=swap");

:root {
  --color-primario: #572488;
  --color-secundario: #882424;
  --color-texto-claro: rgb(231, 231, 231);
}

#mi-app,
* {
  font-family: "Karla", sans-serif;
  font-size: 100%;
}

#mi-app {
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto;
  width: 100%;
  height: 100vh;
  background: var(--color-texto-claro);
}

body {
  background: white;
  font-weight: 400;
  line-height: 1.75;
  color: #000000;
}

p {
  margin-bottom: 1rem;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: 400;
  line-height: 1.3;
}

h1 {
  font-size: 3.052rem;
}

h2 {
  font-size: 2.441rem;
}

h3 {
  font-size: 1.953rem;
}

h4 {
  font-size: 1.563rem;
}

h5 {
  font-size: 1.25rem;
}

small,
.text_small {
  font-size: 0.8rem;
}

.left-side {
  grid-column: 1 / 2;
  background-color: green;
}

input {
  color: var(--color-primario);
  /* border: 1px solid var(--color-primario);
   */
  border: none;
  border-radius: 10px;
  padding: 0.4rem 0.6rem;
  border-radius: 50px;
  background: linear-gradient(315deg, #f0f0f0, var(--color-texto-claro));
  box-shadow: -5px -5px 15px #c7c7c7, 5px 5px 15px #f9f9f9;
}

button {
  background-color: var(--color-primario);
  color: var(--color-texto-claro);
  border: 1px solid var(--color-texto-claro);
  border-radius: 50px;
  padding: 0.4rem 0.6rem;
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
  grid-column: 1/4;
}

main {
  grid-column: 2 / 3;
}

footer {
  background-color: var(--color-secundario);
  color: var(--color-texto-claro);
  grid-column: 1 / 4;
}

nav {
  display: flex;
  gap: 1rem;
}
</style>