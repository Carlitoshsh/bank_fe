<template>
  <div id="Transaction" class="transaction">
    <div class="container_transaction">
      <h2>Realizar Transacción</h2>
      <form v-on:submit.prevent="processTransaction">
        <input
          type="text"
          v-model="createTransaction.usernameDestiny"
          placeholder="Usuario Destino"
        />
        <br />
        <input
          type="number"
          v-model="createTransaction.value"
          placeholder="Valor"
        />
        <br />
        <button type="submit">Realizar Transacción</button>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "Transaction",
  data: function () {
    return {
      createTransaction: {
        usernameOrigin: localStorage.getItem("username"),
        usernameDestiny: "",
        value: "",
      },
    };
  },
  methods: {
    processTransaction: async function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }

      localStorage.setItem("token_access", "");
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($refresh: String!) {
              refreshToken(refresh: $refresh) {
                access
              }
            }
          `,
          variables: {
            refresh: localStorage.getItem("token_refresh"),
          },
        })
        .then((result) => {
          localStorage.setItem("token_access", result.data.refreshToken.access);
        })
        .catch((error) => {
          this.$emit("logOut");
          return;
        });
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($transaction: TransactionInput!) {
              createTransaction(transaction: $transaction) {
                date
                id
                usernameDestiny
                usernameOrigin
                value
              }
            }
          `,
          variables: {
            transaction: this.createTransaction,
          },
        })
        .then((result) => {
          alert("Transacción Realizada de Manera Correcta, Revise Historial");
        })
        .catch((error) => {
          alert("Saldo Insuficiente o Destino Incorrecto");
        });
    },
  },
};
</script>

<style>
table {
  width: 100%;
  border-spacing: 1rem;
  text-align: center;
}


</style>