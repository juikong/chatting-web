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
            <!-- New Password -->
            <div>
              <label class="block text-sm font-medium mb-1" for="password">
                New Password
              </label>
              <input
                id="password"
                v-model="password"
                class="form-input w-full"
                type="password"
              />
            </div>
            <!-- Confirm New Password -->
            <div>
              <label class="block text-sm font-medium mb-1" for="newpassword">
                Confirm New Password
              </label>
              <input
                id="newpassword"
                v-model="newpassword"
                class="form-input w-full"
                type="password"
              />
            </div>
          </div>
          <!-- Form footer -->
          <div class="mt-6">
            <div class="mb-4">
              <button
                @click="changePassword"
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
  name: "Changepassword",
  data() {
    return {
      userId: this.$route.params.id,
      password: "",
      newpassword: "",
    };
  },
  methods: {
    async changePassword() {
      if (this.password == this.newpassword) {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.patch(
            `${import.meta.env.VITE_SERVER_URL}/users/${this.userId}/password`,
            {
              password: this.password,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Password updated successfully!");
        } catch (error) {
          console.error("Error updating password:", error);
          alert("Failed to update Password.");
        }
      } else {
        alert("New Password doesn't match.");
      }
    },
  },
};
</script>
