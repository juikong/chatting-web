<template>
  <div class="relative inline-flex">
    <button
      ref="trigger"
      class="inline-flex justify-center items-center group"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <img
        v-if="photo == 'photo.png'"
        class="w-8 h-8 rounded-full"
        :src="UserAvatar"
        width="30"
        height="30"
        alt="User"
      />
      <img
        v-else
        class="w-8 h-8 rounded-full"
        :src="imageSrc"
        width="30"
        height="30"
        alt="User"
      />
      <div class="flex items-center truncate">
        <span
          class="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white"
          >Admin</span
        >
        <svg
          class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500"
          viewBox="0 0 12 12"
        >
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </div>
    </button>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="dropdownOpen"
        class="origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
        :class="align === 'right' ? 'right-0' : 'left-0'"
      >
        <ul
          ref="dropdown"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >
          <li>
            <router-link
              class="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
              to="/account-settings"
              @click="dropdownOpen = false"
              >Settings</router-link
            >
          </li>
          <li>
            <router-link
              class="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-1 px-3"
              to="/signin"
              @click="signOut"
              >Sign Out</router-link
            >
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";
import UserAvatar from "../images/user-avatar-30.jpg";

export default {
  name: "DropdownProfile",
  props: ["align"],
  data() {
    return {
      UserAvatar: UserAvatar,
      photo: "",
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
        this.photo = response.data.photo;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    async signOut() {
      try {
        this.$cookies.remove("auth");
      } catch (error) {
        console.error("Error sign out:", error);
      }
    },
  },
  setup() {
    const dropdownOpen = ref(false);
    const trigger = ref(null);
    const dropdown = ref(null);

    // close on click outside
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen.value ||
        dropdown.value.contains(target) ||
        trigger.value.contains(target)
      )
        return;
      dropdownOpen.value = false;
    };

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return;
      dropdownOpen.value = false;
    };

    onMounted(() => {
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keyHandler);
    });

    onUnmounted(() => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    });

    return {
      dropdownOpen,
      trigger,
      dropdown,
    };
  },
};
</script>
