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
    <div class="relative mt-8 px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto">
      <div class="bg-white dark:bg-gray-800 px-8 py-6 rounded-b-xl shadow-sm">
        <!-- Header -->
        <div class="text-center mb-6">
          <h1
            class="text-3xl leading-snug text-gray-800 dark:text-gray-100 font-semibold mb-2"
          >
            Chat-ing
          </h1>
          <div>System Setup</div>
        </div>

        <!-- Form -->
        <div>
          <div class="space-y-4">
            <!-- Server URL -->
            <div>
              <label class="block text-sm font-medium mb-1" for="serverurl">
                Server URL
              </label>
              <input
                id="serverurl"
                v-model="serverurl"
                class="form-input w-full"
                type="text"
                placeholder="domainname.com:3001"
              />
            </div>
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium mb-1" for="adminemail">
                Admin Email
              </label>
              <input
                id="adminemail"
                v-model="adminemail"
                class="form-input w-full"
                type="email"
              />
            </div>
            <!-- Password -->
            <div>
              <label class="block text-sm font-medium mb-1" for="adminpassword">
                Admin Password
              </label>
              <input
                id="adminpassword"
                v-model="adminpassword"
                class="form-input w-full"
                type="password"
              />
            </div>
          </div>
          <!-- Form footer -->
          <div class="mt-6">
            <div class="mb-4">
              <button
                @click="registerAdmin"
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
  name: "Register",
  data() {
    return {
      serverurl: "",
      adminemail: "",
      adminpassword: "",
    };
  },
  mounted() {
    this.fetchServerurl();
  },
  methods: {
    async fetchServerurl() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/configs/SERVER_URL`
        );
        if (response.data.exists) {
          this.$router.push({ name: "SignIn" });
        } else {
          this.serverurl = import.meta.env.VITE_SERVER_URL;
        }
      } catch (error) {
        console.error("Error fetching Server URL:", error);
      }
    },
    async registerAdmin() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/users/signupadmin`,
          {
            email: this.adminemail,
            password: this.adminpassword,
          }
        );
        const response2 = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/configs`,
          {
            configname: "SERVER_URL",
            configvalue: this.serverurl,
          }
        );
        alert("Admin registered successfully!");
        const response4 = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/login`,
          {
            username: "admin",
            password: this.adminpassword,
          }
        );
        const token = response.data.accessToken;
        localStorage.setItem("accessToken", token);
        this.$cookies.set("auth", "true", {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        this.$router.push({ name: "Users" });
      } catch (error) {
        console.error("Error register admin:", error);
        alert("Failed to register Admin.");
      }
    },
  },
};
</script>
