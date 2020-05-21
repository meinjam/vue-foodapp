<template>
  <div v-if="smoothies" class="container py-4">
    <h1 class="text-center">Edit {{ smoothies.title }}</h1>
    <!-- <p>{{ this.$route.params.smoothie_slug }}</p> -->

    <form @submit.prevent="editFoodItem">
      <div class="form-group">
        <label for="title">Recipe Title</label>
        <input type="text" class="form-control" id="title" name="title" v-model="smoothies.title" />
      </div>
      <div class="form-group" id="position">
        <div v-for="(ing, index) in smoothies.ingredients" :key="index">
          <label for="ingredients">Recipe Items</label>
          <input
            type="text"
            name="ingredients"
            v-model="smoothies.ingredients[index]"
            class="form-control"
          />
          <i class="fas fa-trash delete" @click="deleteIng(ing)"></i>
        </div>
      </div>
      <div class="form-group">
        <label for="ingredients">New Recipe Items</label>
        <input
          type="text"
          class="form-control"
          id="ingredients"
          @keydown.tab.prevent="addIng"
          v-model="another"
        />
        <p>
          Type recipe name and press Tab to add and then press Update Item
          button to update.
        </p>
      </div>
      <p v-if="feedback" class="text-danger">{{ feedback }}</p>
      <div class="form-group">
        <button class="btn btn-success">Update Item</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditSmoothies",
  data() {
    return {
      smoothies: [],
      another: "",
      feedback: ""
    };
  },
  methods: {
    editFoodItem() {
      // console.log(this.smoothies.title, this.smoothies.ingredients);
      if (this.smoothies.title) {
        // console.log(this.title, this.ingredients);
        this.feedback = "";
        //carete slug
        this.smoothies.slug = slugify(this.smoothies.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!-:@]/g,
          lower: true
        });
        db.collection("smoothies")
          .doc(this.smoothies.id)
          .update({
            title: this.smoothies.title,
            ingredients: this.smoothies.ingredients,
            slug: this.smoothies.slug
          })
          .then(() => this.$router.push({ name: "Home" }))
          .catch(error => console.log(error));
      } else {
        this.feedback = "You must enter a recipe title.";
      }
    },
    addIng() {
      if (this.another) {
        this.smoothies.ingredients.push(this.another);
        // console.log(this.ingredients);
        this.another = "";
        this.feedback = "";
      } else {
        this.feedback = "You must enter a value to add an item.";
      }
    },
    deleteIng(ing) {
      this.smoothies.ingredients = this.smoothies.ingredients.filter(
        ingre => ingre != ing
      );
    }
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);

    ref.get().then(data => {
      data.forEach(doc => {
        this.smoothies = doc.data();
        this.smoothies.id = doc.id;
      });
    });
  }
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: auto;
}
#position {
  position: relative;
}
.delete {
  position: absolute;
  right: 10px;
  bottom: 11px;
  color: #aaa;
  cursor: pointer;
}
</style>
