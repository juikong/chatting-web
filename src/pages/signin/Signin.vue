<template>
  <header class="bg-white dark:bg-gray-900">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link class="block" to="/">
          <img
            class="w-8 h-8"
            src="../../images/logo.png"
            width="32"
            height="32"
          />
        </router-link>
      </div>
    </div>
  </header>

  <main class="grow">
    <div class="relative mt-12 px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto">
      <div class="bg-white dark:bg-gray-800 px-8 py-6 rounded-b-xl shadow-sm">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1
            class="text-3xl leading-snug text-gray-800 dark:text-gray-100 font-semibold"
          >
            Chat-ing
          </h1>
        </div>

        <!-- Form -->
        <div>
          <div class="space-y-4">
            <!-- Server URL -->
            <div>
              <label class="block text-sm font-medium mb-1" for="email">
                Email Address
              </label>
              <input
                id="email"
                v-model="email"
                class="form-input w-full"
                type="email"
              />
            </div>
            <!-- Server Port -->
            <div class="flex space-x-4">
              <div class="flex-1">
                <label class="block text-sm font-medium mb-1" for="password">
                  Password
                </label>
                <input
                  id="password"
                  v-model="password"
                  class="form-input w-full"
                  type="password"
                />
              </div>
            </div>
            <!-- Error Message -->
            <p v-if="errorMessage">{{ errorMessage }}</p>
          </div>
          <!-- Form footer -->
          <div class="mt-6">
            <div class="flex items-center justify-between mb-4">
              <div class="mr-1">
                <router-link
                  v-if="emailhost == ''"
                  class="text-sm underline hover:no-underline"
                  to="/resetemailpassword"
                  >Forgot Password?</router-link
                >
                <router-link
                  v-else
                  class="text-sm underline hover:no-underline"
                  to="/resetpassword"
                  >Forgot Password?</router-link
                >
              </div>
              <button
                @click="signin"
                class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: "",
      emailhost: "",
      errorMessage: "",
    };
  },
  mounted() {
    this.fetchEmailhost();
  },
  methods: {
    async fetchEmailhost() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/configs/EMAIL_HOST`
        );
        if (response.data.exists) {
          this.emailhost = response.data.value.configvalue;
        }
      } catch (error) {
        console.error("Error fetching Email Host:", error);
      }
    },
    async signin() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/login`,
          {
            username: "admin",
            password: this.password,
          }
        );
        const token = response.data.access_token;
        localStorage.setItem("accessToken", token);
        this.$cookies.set("auth", "true", {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        this.$router.push({ name: "Users" });
      } catch (error) {
        this.errorMessage = "Login failed. Please check your credentials.";
      }
    },
  },
};
</script>
