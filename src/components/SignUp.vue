<template>
  <div class="signUp_user">
    <div class="container_signUp_user">
      <h2>Registrarse</h2>
      <form v-on:submit.prevent="processSignUp">
        <input type="text" v-model="user.username" placeholder="Username" />
        <br />

        <input type="password" v-model="user.password" placeholder="Password" />
        <br />

        <input type="text" v-model="user.name" placeholder="Name" />
        <br />
        <input type="email" v-model="user.email" placeholder="Email" />
        <br />
        <input
          type="number"
          v-model="user.balance"
          placeholder="Initial Balance"
        />
        <br />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>


<script>
import gql from "graphql-tag";

export default {
  name: "SignUp",
  data: function () {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        email: "",
        balance: 0,
      },
    };
  },
  methods: {
    processSignUp: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($userInput: SignUpInput!) {
              signUpUser(userInput: $userInput) {
                refresh
                access
              }
            }
          `,
          variables: {
            userInput: this.user,
          },
        })
        .then((result) => {
          let resultado = {
            username: this.user.username,
            token_access: result.data.signUpUser.access,
            token_refresh: result.data.signUpUser.refresh,
          };
          this.$emit("completedSignUp", resultado);
        })
        .catch((error) => {
          console.log(error);
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
};
</script>

