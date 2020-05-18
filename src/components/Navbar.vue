<template>
  <nav class="navbar navbar-dark" style="background-color: #7f55ff;">
    <div class="container">
      <router-link to>
        <span class="navbar-brand">Foodzone Items</span>
      </router-link>
      <form class="form-inline">
        <router-link to>
          <button class="btn btn-success my-2 my-sm-0">Add Item</button>
        </router-link>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style></style>
