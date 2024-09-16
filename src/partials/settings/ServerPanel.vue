<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Server Settings
      </h2>
      <!-- Server URL -->
      <section>
        <h3
          class="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1"
        >
          Server URL
        </h3>
        <div class="mt-2">
          <label class="sr-only" for="serverurl">Server URL</label>
          <input
            id="serverurl"
            v-model="serverurl"
            class="form-input"
            type="text"
          />
        </div>
      </section>
      <!-- Server Port -->
      <section>
        <h3
          class="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1"
        >
          Server Port
        </h3>
        <div class="flex flex-wrap mt-2">
          <div class="mr-2">
            <label class="sr-only" for="serverport">Server Port</label>
            <input
              id="serverport"
              v-model="serverport"
              class="form-input"
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
            @click="updateServer"
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
      serverurl: "",
      serverurlId: "",
      serverport: "",
      serverportId: "",
    };
  },
  mounted() {
    this.fetchServerurl();
    this.fetchServerport();
  },
  methods: {
    async fetchServerurl() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/configs/SERVER_URL`
        );
        this.serverurlId = response.data.value._id;
        this.serverurl = response.data.value.configvalue;
      } catch (error) {
        console.error("Error fetching Server URL:", error);
      }
    },
    async fetchServerport() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/configs/SERVER_PORT`
        );
        this.serverportId = response.data.value._id;
        this.serverport = response.data.value.configvalue;
      } catch (error) {
        console.error("Error fetching Server Port:", error);
      }
    },
    async updateServer() {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_SERVER_URL}/configs/${this.serverurlId}`,
          {
            configvalue: this.serverurl,
          }
        );
        const response2 = await axios.patch(
          `${import.meta.env.VITE_SERVER_URL}/configs/${this.serverportId}`,
          {
            configvalue: this.serverport,
          }
        );
        alert("Server Settings updated successfully!");
      } catch (error) {
        console.error("Error updating server settings:", error);
        alert("Failed to update Server Settings.");
      }
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>
