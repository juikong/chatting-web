<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Email Settings
      </h2>
      <!-- Email Host -->
      <section>
        <h3
          class="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1"
        >
          Email Host
        </h3>
        <div class="mt-2">
          <label class="sr-only" for="emailhost">Email Host</label>
          <input
            id="emailhost"
            v-model="emailhost"
            class="form-input"
            type="text"
          />
        </div>
      </section>
      <!-- Email Username -->
      <section>
        <h3
          class="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1"
        >
          Email Username
        </h3>
        <div class="flex flex-wrap mt-2">
          <div class="mr-2">
            <label class="sr-only" for="emailusername">Email Username</label>
            <input
              id="emailusername"
              v-model="emailusername"
              class="form-input"
              type="text"
            />
          </div>
        </div>
      </section>
      <!-- Email Password -->
      <section>
        <h3
          class="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1"
        >
          Email Password
        </h3>
        <div class="flex flex-wrap mt-2">
          <div class="mr-2">
            <label class="sr-only" for="emailpassword">Email Password</label>
            <input
              id="emailpassword"
              v-model="emailpassword"
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
            @click="updateEmail"
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
  name: "EmailPanel",
  data() {
    return {
      emailhost: "",
      emailhostId: "",
      emailusername: "",
      emailusernameId: "",
      emailpassword: "",
      emailpasswordId: "",
    };
  },
  mounted() {
    this.fetchEmailhost();
    this.fetchEmailusername();
    this.fetchEmailpassword();
  },
  methods: {
    async fetchEmailhost() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/configs/EMAIL_HOST`
        );
        if (response.data.exists) {
          this.emailhostId = response.data.value._id;
          this.emailhost = response.data.value.configvalue;
        }
      } catch (error) {
        console.error("Error fetching Email Host:", error);
      }
    },
    async fetchEmailusername() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/adminconfigs/EMAIL_USERNAME`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.exists) {
          this.emailusernameId = response.data.value._id;
          this.emailusername = response.data.value.configvalue;
        }
      } catch (error) {
        console.error("Error fetching Email Username:", error);
      }
    },
    async fetchEmailpassword() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/adminconfigs/EMAIL_PASSWORD`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.exists) {
          this.emailpasswordId = response.data.value._id;
          this.emailpassword = response.data.value.configvalue;
        }
      } catch (error) {
        console.error("Error fetching Email Password:", error);
      }
    },
    async updateEmail() {
      try {
        const token = localStorage.getItem("accessToken");
        if (this.emailhostId == "" && this.emailhost != "") {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/configs`,
            {
              configname: "EMAIL_HOST",
              configvalue: this.emailhost,
            }
          );
        } else if (this.emailhostId != "") {
          const response = await axios.patch(
            `${import.meta.env.VITE_SERVER_URL}/configs/${this.emailhostId}`,
            {
              configvalue: this.emailhost,
            }
          );
        }
        if (this.emailusernameId == "" && this.emailusername != "") {
          const response2 = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/adminconfigs`,
            {
              configname: "EMAIL_USERNAME",
              configvalue: this.emailusername,
            }
          );
        } else if (this.emailusernameId != "") {
          const response2 = await axios.patch(
            `${import.meta.env.VITE_SERVER_URL}/adminconfigs/${
              this.emailusernameId
            }`,
            {
              configvalue: this.emailusername,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        if (this.emailpasswordId == "" && this.emailpassword != "") {
          const response3 = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/adminconfigs`,
            {
              configname: "EMAIL_PASSWORD",
              configvalue: this.emailpassword,
            }
          );
        } else if (this.emailpasswordId != "") {
          const response3 = await axios.patch(
            `${import.meta.env.VITE_SERVER_URL}/configs/${
              this.emailpasswordId
            }`,
            {
              configvalue: this.emailpassword,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        alert("Email Settings updated successfully!");
        this.fetchEmailhost();
        this.fetchEmailusername();
        this.fetchEmailpassword();
      } catch (error) {
        console.error("Error updating email settings:", error);
        alert("Failed to update Email Settings.");
      }
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>
