<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="flex items-center">
        <label class="inline-flex">
          <span class="sr-only">Select</span>
          <input
            :id="user._id"
            class="form-checkbox"
            type="checkbox"
            :value="value"
            @change="check"
            :checked="checked"
          />
        </label>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="flex items-center">
        <div class="w-10 h-10 shrink-0 mr-2 sm:mr-3">
          <img
            class="rounded-full"
            :src="imageSrc"
            width="40"
            height="40"
            :alt="user.username"
          />
        </div>
        <div class="font-medium text-gray-800 dark:text-gray-100">
          {{ user.username }}
        </div>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{ user.displayname }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{ user.email }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <button
        class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full"
        @click="navigateToEdit(user._id)"
      >
        <span class="sr-only">Edit</span>
        <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path
            d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
          />
          <path
            d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
          />
        </svg>
        Edit
      </button>
      <button
        class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full ml-2"
        @click="deleteUser(user._id)"
      >
        <span class="sr-only">Delete</span>
        <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path
            fill-rule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
            clip-rule="evenodd"
          />
        </svg>
        Delete
      </button>
    </td>
  </tr>
</template>

<script>
import axios from "axios";
import { computed } from "vue";

export default {
  name: "UsersTableItem",
  props: ["user", "value", "selected"],
  computed: {
    imageSrc() {
      return `${import.meta.env.VITE_SERVER_URL}/photos/${this.user.photo}`;
    },
  },
  setup(props, context) {
    const checked = computed(() => props.selected.includes(props.value));

    function check() {
      let updatedSelected = [...props.selected];
      if (this.checked) {
        updatedSelected.splice(updatedSelected.indexOf(props.value), 1);
      } else {
        updatedSelected.push(props.value);
      }
      context.emit("update:selected", updatedSelected);
    }

    return {
      check,
      checked,
    };
  },
  methods: {
    navigateToEdit(userId) {
      this.$router.push({ name: "EditUser", params: { id: userId } });
    },
    async deleteUser(userId) {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        window.location.reload();
      } catch (error) {
        console.error("Error delete User:", error);
      }
    },
  },
};
</script>
