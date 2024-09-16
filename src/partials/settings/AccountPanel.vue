<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Account Settings
      </h2>
      <!-- Picture -->
      <section>
        <div class="flex items-center">
          <div class="mr-4">
            <img
              v-if="photo == 'photo.png'"
              class="w-16 h-16 rounded-full"
              src="../../images/user-avatar-60.jpg"
              width="64"
              height="64"
              alt="User upload"
            />
            <img
              v-else
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
      userId: "",
      email: "",
      password: "",
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
          `${import.meta.env.VITE_SERVER_URL}/users/adminuser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.userId = response.data._id;
        this.email = response.data.email;
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
    goBack() {
      this.$router.back();
    },
  },
};
</script>
