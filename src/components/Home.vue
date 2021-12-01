<template>
  <div class="information">
    <h2>
      ¡Bienvenido
      <span>{{ userDetailById.name }}</span
      >!
    </h2>
    <div class="details">
      <h5>Su información es la siguiente</h5>
      <p>
        Nombre de usuario:
        <strong>{{ userDetailById.username }}</strong>
      </p>
      <p>
        Correo electrónico:
        <strong>{{ userDetailById.email }}</strong>
      </p>
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
