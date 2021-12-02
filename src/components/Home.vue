<template>
  <div class="information">
    <h1>
      ¡Bienvenido
      <span>{{ userDetailById.name }}</span
      >!
    </h1>
    <div class="details">
      <h3>Su información es la siguiente</h3>
      <h2>
        Nombre de usuario:
        <span>{{ userDetailById.username }}</span>
      </h2>
      <h2>
        Correo electrónico:
        <span>{{ userDetailById.email }}</span>
      </h2>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";
export default {
  name: "Home",
  data: function () {
    return {
      userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
      userDetailById: {
        username: "",
        name: "",
        email: "",
      },
    };
  },
  apollo: {
    userDetailById: {
      query: gql`
        query ($userId: Int!) {
          userDetailById(userId: $userId) {
            username
            name
            email
          }
        }
      `,
      variables() {
        return {
          userId: this.userId,
        };
      },
    },
  },
};
</script>

