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
          <div>Reset Password</div>
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
          </div>
          <!-- Form footer -->
          <div class="mt-6">
            <div class="mb-4">
              <button
                @click="sendResetLink"
                class="btn w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
              >
                Send reset link
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
  name: "Resetpassword",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async sendResetLink() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/users/passwordreset`,
          {
            email: this.email,
          }
        );
        alert("Password reset link sent!");
      } catch (error) {
        console.error("Error send password reset link:", error);
        alert("Failed to send password reset link.");
      }
    },
  },
};
</script>
