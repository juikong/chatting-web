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
        <div class="text-center mb-6">
          <h1
            class="text-3xl leading-snug text-gray-800 dark:text-gray-100 font-semibold mb-2"
          >
            Chat-ing
          </h1>
          <div>Email Settings</div>
        </div>

        <!-- Form -->
        <div>
          <div class="space-y-4">
            <!-- Email Host-->
            <div>
              <label class="block text-sm font-medium mb-1" for="emailhost">
                Email Host
              </label>
              <input
                id="emailhost"
                v-model="emailhost"
                class="form-input w-full"
                type="text"
              />
            </div>
            <!-- Email Username -->
            <div>
              <label class="block text-sm font-medium mb-1" for="emailusername">
                Email Username
              </label>
              <input
                id="emailusername"
                v-model="emailusername"
                class="form-input w-full"
                type="text"
              />
            </div>
            <!-- Email Password -->
            <div>
              <label class="block text-sm font-medium mb-1" for="emailpassword">
                Email Password
              </label>
              <input
                id="emailpassword"
                v-model="emailpassword"
                class="form-input w-full"
                type="text"
              />
            </div>
          </div>
          <!-- Form footer -->
          <div class="mt-6">
            <div class="mb-4">
              <button
                @click="updateEmail"
                class="btn w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
              >
                Continue
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
  name: "Resetemailpassword",
  data() {
    return {
      emailhost: "",
      emailusername: "",
      emailpassword: "",
    };
  },
  methods: {
    async updateEmail() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/configs`,
          {
            configname: "EMAIL_HOST",
            configvalue: this.emailhost,
          }
        );
        const response2 = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/adminconfigs`,
          {
            configname: "EMAIL_USERNAME",
            configvalue: this.emailusername,
          }
        );
        const response3 = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/adminconfigs`,
          {
            configname: "EMAIL_PASSWORD",
            configvalue: this.emailpassword,
          }
        );
        this.$router.push({ name: "Resetpassword" });
      } catch (error) {
        console.error("Error updating email settings:", error);
        alert("Failed to update Email Settings.");
      }
    },
  },
};
</script>
