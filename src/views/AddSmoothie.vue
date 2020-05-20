<template>
  <div class="container py-4">
    <h2 class="text-center">Add New Food Item</h2>
    <form @submit.prevent="addFoodItem">
      <div class="form-group">
        <label for="title">Recipe Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          name="title"
          v-model="title"
        />
      </div>
      <div class="form-group">
        <div v-for="(ing, index) in ingredients" :key="index">
          <label for="ingredients">Recipe Items</label>
          <input
            type="text"
            name="ingredients"
            v-model="ingredients[index]"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="ingredients">Recipe Items</label>
        <input
          type="text"
          class="form-control"
          id="ingredients"
          @keydown.tab.prevent="addIng"
          v-model="another"
        />
      </div>
      <p v-if="feedback" class="text-danger">{{ feedback }}</p>
      <div class="form-group">
        <button class="btn btn-success">Add Item</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddSmoothie",
  data() {
    return {
      title: "",
      another: "",
      ingredients: [],
      feedback: "",
      slug: "",
    };
  },
  methods: {
    addFoodItem() {
      if (this.title) {
        // console.log(this.title, this.ingredients);
        this.feedback = "";
        //carete slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!-:@]/g,
          lower: true,
        });
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug,
          })
          .then(() => this.$router.push({ name: "Home" }))
          .catch((error) => console.log(error));
      } else {
        this.feedback = "You must enter a recipe title.";
      }
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        // console.log(this.ingredients);
        this.another = "";
        this.feedback = "";
      } else {
        this.feedback = "You must enter a value to add an item.";
      }
    },
  },
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: auto;
}
</style>
