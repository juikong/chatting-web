<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Add New User
      </h2>
      <!-- Username -->
      <section>
        <h3
          class="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1"
        >
          Username
        </h3>
        <div class="mt-2">
          <label class="sr-only" for="username">Username</label>
          <input
            id="username"
            v-model="username"
            class="form-input"
            type="text"
          />
        </div>
      </section>
      <!-- Display Name -->
      <section>
        <h3
          class="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1"
        >
          Display Name
        </h3>
        <div class="mt-2">
          <label class="sr-only" for="displayname">Display Name</label>
          <input
            id="displayname"
            v-model="displayname"
            class="form-input"
            type="text"
          />
        </div>
      </section>
      <!-- Email -->
      <section>
        <h3
          class="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1"
        >
          Email
        </h3>
        <div class="mt-2">
          <label class="sr-only" for="email">Email address</label>
          <input id="email" v-model="email" class="form-input" type="email" />
        </div>
      </section>
      <!-- Password -->
      <section>
        <h3
          class="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1"
        >
          Password
        </h3>
        <div class="flex flex-wrap mt-2">
          <div class="mr-2">
            <label class="sr-only" for="password">Password</label>
            <input
              id="password"
              v-model="password"
              class="form-input"
              type="password"
            />
          </div>
          <button
            @click="generatePassword"
            class="btn dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
          >
            Generate Password
          </button>
        </div>
      </section>
      <!-- Department -->
      <section>
        <h3
          class="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1"
        >
          Department
        </h3>
        <div
          class="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2"
        >
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1" for="departmentname"
              >Department Name</label
            >
            <input
              id="departmentname"
              v-model="departmentname"
              class="form-input w-full"
              type="text"
            />
          </div>
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1" for="division"
              >Division</label
            >
            <input
              id="division"
              v-model="division"
              class="form-input w-full"
              type="text"
            />
          </div>
          <div class="sm:w-1/3">
            <label class="block text-sm font-medium mb-1" for="location"
              >Location</label
            >
            <input
              id="location"
              v-model="location"
              class="form-input w-full"
              type="text"
            />
          </div>
        </div>
        <!-- Send email -->
        <section>
          <h3
            class="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mt-4 mb-1"
          >
            Email account information to user
          </h3>
          <div class="flex items-center mt-2">
            <div class="form-switch">
              <input
                type="checkbox"
                id="toggle"
                class="sr-only"
                v-model="sendemail"
                true-value="Yes"
                false-value="No"
              />
              <label class="bg-gray-400 dark:bg-gray-700" for="toggle">
                <span class="bg-white shadow-sm" aria-hidden="true"></span>
                <span class="sr-only">Email account information</span>
              </label>
            </div>
            <div class="text-sm text-gray-400 dark:text-gray-500 italic ml-2">
              {{ sendemail }}
            </div>
          </div>
        </section>
      </section>
    </div>
    <!-- Panel footer -->
    <footer>
      <div
        class="flex flex-col px-6 py-5 border-t border-gray-200 dark:border-gray-700/60"
      >
        <div class="flex self-end">
          <button
            @click="goBack"
            class="btn dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            @click="registerUser"
            class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3"
          >
            Save Changes
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "NewUserPanel",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      displayname: "",
      departmentname: "",
      division: "",
      location: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/users/signup`,
          {
            email: this.email,
            username: this.username,
            displayname: this.displayname,
            password: this.password == "" ? "password" : this.password,
            departmentname: this.departmentname,
            division: this.division,
            location: this.location,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("User updated successfully!");
        this.$router.push({ name: "Users" });
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update User.");
      }
    },
    generatePassword() {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
      let password = "";
      for (let i = 0; i < 12; i++) {
        password += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      this.password = password;
    },
    goBack() {
      this.$router.back();
    },
  },
  setup() {
    const sendemail = ref("No");

    return {
      sendemail,
    };
  },
};
</script>
