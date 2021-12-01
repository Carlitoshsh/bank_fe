<template>
  <div class="greetings">
    <h1>
      ¡Bienvenido <span> {{ username }} </span>!
    </h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function () {
    return {
      username: localStorage.getItem("username") || "none",
    };
  },
};
</script>
