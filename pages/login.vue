<template>
  <div class="container">
    <div class="login-form">
      <div class="title">Quwi Login</div>
      <form @submit.prevent="login">
        <div class="field">
          <label for="email">Email</label>
          <input
            v-model="email"
            id="email"
            type="text"
            placeholder="Login"
            required
          />
          <div v-if="errors?.email" class="error">{{ errors.email }}</div>
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Password"
            required
          />
          <div v-if="errors?.password" class="error">{{ errors.password }}</div>
        </div>
        <div class="buttons">
          <button>Log in</button>
        </div>
        <div v-if="errors?.network" class="error">{{ errors.network }}</div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errors: null,
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
      } catch (err) {
        if (err.response) {
          this.errors = err.response.data?.first_errors
        } else {
          this.errors = { network: 'Network error' }
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  border: 1px solid silver;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  flex: none;
}

.title {
  font-size: 1.125rem;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
}

input {
  width: 15rem;
}

.field {
  margin: 1rem;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
  }

  .error {
    color: red;
    margin: 0.25rem 0 0 0;
    text-align: left;
  }
}

.error {
  color: red;
  margin: 0 0 1rem 1rem;
  text-align: center;
}

.buttons {
  margin: 1rem;
  display: flex;
  justify-content: flex-end;
}

@media only screen and (min-width: 768px) {
  .login-form {
    max-width: 20rem;
  }
}
</style>
