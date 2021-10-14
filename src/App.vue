<template>
  <div id="mi-app" class="app">
    <header>
      <h1>Banco UN</h1>
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
      <h2>Misión TIC 2022</h2>
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
@import url("https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap");

body {
  margin: 0;
}

#mi-app {
  font-family: "ZCOOL KuaiLe", Helvetica, Arial, sans-serif;
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
