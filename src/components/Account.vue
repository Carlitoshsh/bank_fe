<template>
  <div v-if="loaded" class="information">
    <h1>Información de su cuenta</h1>
    <h2>
      Nombre: <span>{{ name }}</span>
    </h2>
    <h2>
      Saldo: <span>{{ balance }} COP </span>
    </h2>
    <h2>
      Correo electrónico: <span>{{ email }}</span>
    </h2>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
export default {
  name: "Account",
  data: function () {
    return {
      name: "",
      email: "",
      balance: 0,
      loaded: false,
    };
  },
  methods: {
    getData: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      await this.verifyToken();

      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();

      axios
        .get(`https://backendformadorp73.herokuapp.com/user/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.name = result.data.name;
          this.email = result.data.email;
          this.balance = result.data.account.balance;
          this.loaded = true;
        })
        .catch(() => {
          this.$emit("logOut");
        });
    },
    verifyToken: function () {
      return axios
        .post(
          "https://backendformadorp73.herokuapp.com/refresh/",
          { refresh: localStorage.getItem("token_refresh") },
          { headers: {} }
        )
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch(() => {
          this.$emit("logOut");
        });
    },
  },
  created: async function () {
    this.getData();
  },
};
</script>

