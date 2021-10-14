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
@import url("https://fonts.googleapis.com/css?family=Encode+Sans:400");

html {
  font-size: 100%;
} /*16px*/

body,
* {
  font-family: "Encode Sans", serif;
  font-weight: 400;
  line-height: 1.75;
}

p {
  margin-bottom: 1rem;
}

h1,
h2,
h3,
h4,
h5 {
  margin: 3rem 0 1.38rem;
  font-weight: 400;
  line-height: 1.3;
}

h1 {
  margin-top: 0;
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

#mi-app {
  color: #2c3e50;
  display: grid;
  grid-template: auto 1fr auto / auto 1fr auto;
  height: 100vh;
}

header {
  grid-column: 1 / 4;
  background: #2c3e50;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 150px;
}

main {
  grid-column: 2 / 3;
}

footer {
  grid-column: 1 / 4;
  display: flex;
  background: #2c3e50;
  color: whitesmoke;
  justify-content: center;
  height: 50px;
}

.nav-option {
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.2rem 0.3rem;
  background: #2c3e50;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  height: 35px;
}
</style>
