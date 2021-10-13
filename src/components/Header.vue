<template>
  <header>
    <span id="brand">Mision Tic P73</span>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
header {
  background: rgb(58, 58, 124);
  color: white;
}

span {
  font-size: x-large;
}
</style>