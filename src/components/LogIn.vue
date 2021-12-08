<template>
  <div class="logIn_user">
    <div class="contenedor">
      <h3>Iniciar sesión</h3>
      <form class="formulario-login" v-on:submit.prevent="processLogInUser">
        <input type="text" v-model="user.username" placeholder="Username" />
        <input type="password" v-model="user.password" placeholder="Password" />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";

export default {
  name: "LogIn",
  data: function () {
    return {
      isLogin: false,
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    processLogInUser: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($credentials: CredentialsInput!) {
              logIn(credentials: $credentials) {
                refresh
                access
              }
            }
          `,
          variables: {
            credentials: this.user,
          },
        })
        .then((result) => {
          let dataLogIn = {
            username: this.user.username,
            token_access: result.data.logIn.access,
            token_refresh: result.data.logIn.refresh,
          };
          this.$emit("completedLogIn", dataLogIn);
        })
        .catch((error) => {
          if (error.response.status == "401")
            alert("ERROR 401: Credenciales Incorrectas.");
        });
    },
  },
  created() {
    console.log(this.$router.currentRoute.value.query);
  },
};
</script>

<style scoped>
.contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  border-radius: 50px;
  background: #e0e0e0;
  box-shadow: inset -5px -5px 15px #c7c7c7, inset 5px 5px 15px #f9f9f9;
}

.formulario-login {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
</style>