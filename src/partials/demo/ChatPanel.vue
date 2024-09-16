<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <h2 class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-4">
        Demo
      </h2>

      <section>
        <!-- Chat -->
        <div class="flex flex-wrap mt-2">
          <div class="mr-2">
            <label class="sr-only" for="message">Demo Chat</label>
            <textarea
              id="message"
              v-model="message"
              class="form-textarea w-full focus:border-gray-300"
              rows="4"
              placeholder="Enter your text here…"
            ></textarea>
          </div>
          <button
            @click="sendMessage"
            class="btn dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
          >
            Send Message
          </button>
        </div>
      </section>
      <section>
        <div class="flex flex-wrap mt-2">
          <p v-if="reply">{{ reply }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChatPanel",
  data() {
    return {
      chatgptapikey: "",
      message: "",
      reply: "",
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
          this.chatgptapikey = response.data.value.configvalue;
        }
      } catch (error) {
        console.error("Error fetching Chatgpt Key:", error);
      }
    },
    async sendMessage() {
      const url = "https://api.openai.com/v1/chat/completions";

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chatgptapikey}`,
      };

      const data = {
        model: "gpt-4o-mini",
        messages: [
          //{ role: "system", content: "You are a helpful assistant." },
          { role: "user", content: this.message },
        ],
        max_tokens: 150,
      };

      try {
        const response = await axios.post(url, data, { headers });
        const completion = response.data.choices[0].message.content;
        this.reply = completion;
      } catch (error) {
        console.error("Error communicating with OpenAI API:", error.message);
      }
    },
  },
};
</script>
