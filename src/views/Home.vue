<template>
  <div class="index container py-5">
    <div v-for="smoothie in smoothies" :key="smoothie.id" class="card mb-3 shadow">
      <div class="card-body">
        <i class="fas fa-trash delete" @click="deleteSmoothie(smoothie.id)" title="delete item"></i>
        <h2 class="text-center pb-3">{{ smoothie.title }}</h2>
        <div class="ingredients">
          <p v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="d-inline mr-2">
            <span class="badge badge-pill badge-secondary p-2 mb-2">
              {{
              ingredient
              }}
            </span>
          </p>
        </div>
        <router-link
          :to="{
            name: 'EditSmoothies',
            params: { smoothie_slug: smoothie.slug }
          }"
        >
          <i class="fas fa-edit edit" title="edit item"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  data() {
    return {
      smoothies: []
    };
  },
  methods: {
    deleteSmoothie(id) {
      // this.smoothies = this.smoothies.filter(smoothie => smoothie.id != id);
      // Delete doc from mfirestore
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(
          () =>
            (this.smoothies = this.smoothies.filter(
              smoothie => smoothie.id != id
            ))
        );
    }
  },
  created() {
    // Fetch data
    db.collection("smoothies")
      .get()
      .then(data =>
        data.forEach(doc => {
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        })
      );
  }
};
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
}

@media screen and (max-width: 768px) {
  .index {
    grid-template-columns: 1fr;
  }
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  color: #aaa;
  cursor: pointer;
}

.index .edit {
  position: absolute;
  bottom: 4px;
  right: 4px;
  color: #aaa;
  cursor: pointer;
}
</style>
