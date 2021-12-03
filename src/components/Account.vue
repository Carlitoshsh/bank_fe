<template>
  <div id="Historial">
    <div class="container">
      <h2>
        Titular Cuenta:
        <span>{{ username }}</span>
      </h2>
      <h2>
        Saldo:
        <span>${{ accountByUsername.balance }} COP</span>
      </h2>
      <h2>
        Último Movimiento:
        <span>
          {{
            new Date(accountByUsername.lastChange).toLocaleDateString("es-CO")
          }}
          {{
            new Date(accountByUsername.lastChange).toLocaleTimeString("es-CO")
          }}
        </span>
      </h2>
    </div>
    <h2>Transacciones</h2>
    <div class="table table-striped">
      <table>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Origen</th>
          <th>Destino</th>
          <th>Valor</th>
        </tr>
        <tr v-for="transaction in transactionByUsername" :key="transaction.id">
          <td>
            {{ new Date(transaction.date).toLocaleDateString("es-CO") }}
          </td>
          <td>
            {{ new Date(transaction.date).toLocaleTimeString("es-CO") }}
          </td>
          <td>{{ transaction.usernameOrigin }}</td>
          <td>{{ transaction.usernameDestiny }}</td>
          <td>${{ transaction.value }} COP</td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
import gql from "graphql-tag";
export default {
  name: "Account",
  data: function () {
    return {
      username: localStorage.getItem("username") || "none",
      transactionByUsername: [],
      accountByUsername: {
        balance: "",
        lastChange: "",
      },
    };
  },
  apollo: {
    transactionByUsername: {
      query: gql`
        query ($username: String!) {
          transactionByUsername(username: $username) {
            id
            usernameOrigin
            usernameDestiny
            value
            date
          }
        }
      `,
      variables() {
        return {
          username: this.username,
        };
      },
    },
    accountByUsername: {
      query: gql`
        query ($username: String!) {
          accountByUsername(username: $username) {
            balance
            lastChange
          }
        }
      `,
      variables() {
        return {
          username: this.username,
        };
      },
    },
  },
  created: function () {
    this.$apollo.queries.transactionByUsername.refetch();
    this.$apollo.queries.accountByUsername.refetch();
  },
};
</script>



