<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Edit User
      </h2>
      <!-- Picture -->
      <section>
        <div class="flex items-center">
          <div class="mr-4">
            <img
              class="w-16 h-16 rounded-full"
              :src="imageSrc"
              width="64"
              height="64"
              alt="User upload"
            />
          </div>
          <div class="flex flex-col">
            <input
              id="file"
              type="file"
              @change="handleFileUpload"
              accept="image/jpeg, image/png"
              class="btn-sm dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
            />
            <button
              @click="updatePhoto"
              class="mt-2 btn-sm dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
            >
              Update Photo
            </button>
          </div>
        </div>
      </section>
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
            :disable="true"
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
        <div class="flex flex-wrap mt-2">
          <div class="mr-2">
            <label class="sr-only" for="email">Email address</label>
            <input id="email" v-model="email" class="form-input" type="email" />
          </div>
          <button
            @click="updateEmail"
            class="btn dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
          >
            Change
          </button>
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
            @click="updatePassword"
            class="btn dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
          >
            Set New Password
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
            @click="updateUser"
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

export default {
  name: "EditUserPanel",
  data() {
    return {
      userId: this.$route.params.id,
      username: "",
      email: "",
      password: "",
      displayname: "",
      departmentname: "",
      division: "",
      location: "",
      photo: "",
      selectedImage: null,
      selectedImageName: "",
    };
  },
  computed: {
    imageSrc() {
      return `${import.meta.env.VITE_SERVER_URL}/photos/${this.photo}`;
    },
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/users/user/${this.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.username = response.data.username;
        this.email = response.data.email;
        this.displayname = response.data.displayname;
        this.departmentname = response.data.departmentname;
        this.division = response.data.division;
        this.location = response.data.location;
        this.photo = response.data.photo;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedImage = file;
        this.selectedImageName = file.name;
      }
    },
    async updatePhoto() {
      try {
        const formData = new FormData();
        formData.append("photo", this.selectedImage);
        const token = localStorage.getItem("accessToken");

        const response = await axios.patch(
          `${import.meta.env.VITE_SERVER_URL}/users/${this.userId}/photo`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Photo updated successfully!");
      } catch (error) {
        console.error("Error updating photo:", error);
        alert("Failed to update photo.");
      }
    },
    async updateEmail() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.patch(
          `${import.meta.env.VITE_SERVER_URL}/users/${this.userId}/email`,
          {
            email: this.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Email updated successfully!");
      } catch (error) {
        console.error("Error updating email:", error);
        alert("Failed to update Email.");
      }
    },
    async updatePassword() {
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
    },
    async updateUser() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.patch(
          `${import.meta.env.VITE_SERVER_URL}/users/${this.userId}`,
          {
            displayname: this.displayname,
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
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update User.");
      }
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>
