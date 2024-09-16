<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Chatgpt Settings
      </h2>
      <!-- Chatgpt API Keys-->
      <section>
        <h3
          class="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1"
        >
          Chatgpt API Key
        </h3>
        <div class="mt-2">
          <label class="sr-only" for="chatgptapikey">Chatgpt API Key</label>
          <textarea
            id="chatgptapikey"
            v-model="chatgptapikey"
            class="form-textarea w-full focus:border-gray-300"
            rows="4"
            placeholder="Chatgpt API Key"
          ></textarea>
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
            @click="updateChatgptkey"
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
  name: "ServerPanel",
  data() {
    return {
      chatgptapikey: "",
      chatgptapikeyId: "",
    };
  },
  mounted() {
    this.fetchChatapikey();
  },
  methods: {
    async fetchChatapikey() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/adminconfigs/CHATGPT_KEY`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.exists) {
          this.chatgptapikeyId = response.data.value._id;
          this.chatgptapikey = response.data.value.configvalue;
        }
      } catch (error) {
        console.error("Error fetching Chatgpt Key:", error);
      }
    },
    async updateChatgptkey() {
      try {
        if (this.chatgptapikeyId == "" && this.chatgptapikey != "") {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/adminconfigs`,
            {
              configname: "CHATGPT_KEY",
              configvalue: this.chatgptapikey,
            }
          );
        } else if (this.chatgptapikeyId != "") {
          const response = await axios.patch(
            `${import.meta.env.VITE_SERVER_URL}/adminconfigs/${
              this.chatgptapikeyId
            }`,
            {
              configvalue: this.chatgptapikey,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        alert("Chatgpt Settings updated successfully!");
      } catch (error) {
        console.error("Error updating chatgpt settings:", error);
        alert("Failed to update Chatgpt Settings.");
      }
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>
