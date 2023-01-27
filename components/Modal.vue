<template>
  <div v-if="value" class="modal">
    <div class="modal-content">
      <span @click="close" class="close">&times;</span>
      <h3>Edit</h3>
      <div class="logo"><img :src="logo" /></div>
      <form @submit.prevent="save">
        <div class="field">
          <label for="project_name">Name</label>
          <input v-model="nameLocal" id="project_name" type="text" required />
        </div>
        <div class="field">
          <label for="project_text">Text</label>
          <textarea :value="text" rows="10" disabled></textarea>
        </div>
        <div class="buttons">
          <button>Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      nameLocal: this.name,
    }
  },

  watch: {
    name(value) {
      this.nameLocal = value
    },
  },

  methods: {
    close() {
      this.$emit('input', false)
    },

    save() {
      this.$emit('save', this.nameLocal)
      this.close()
    },
  },
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: white;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 100%;
  border: 1px solid silver;
  border-radius: 0.5rem;
  box-sizing: border-box;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.field {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
  }
}

.buttons {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

img {
  object-fit: scale-down;
  width: 4rem;
  height: 4rem;
}

@media only screen and (min-width: 768px) {
  .modal-content {
    width: 80%;
    max-width: 40rem;
  }
}
</style>
