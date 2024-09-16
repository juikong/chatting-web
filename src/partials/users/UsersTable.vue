<template>
  <div class="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
    <div>
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full dark:text-gray-300">
          <!-- Table header -->
          <thead
            class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60"
          >
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                <div class="flex items-center">
                  <label class="inline-flex">
                    <span class="sr-only">Select all</span>
                    <input
                      class="form-checkbox"
                      type="checkbox"
                      v-model="selectAll"
                      @click="checkAll"
                    />
                  </label>
                </div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Username</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Display Name</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Email</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <span class="sr-only">Menu</span>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody
            class="text-sm divide-y divide-gray-100 dark:divide-gray-700/60"
          >
            <User
              v-for="user in users"
              :key="user._id"
              :user="user"
              v-model:selected="selected"
              :value="user._id"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, watch, onMounted } from "vue";
import User from "./UsersTableItem.vue";

export default {
  name: "UsersTable",
  components: {
    User,
  },
  props: ["selectedItems"],
  setup(props, { emit }) {
    const selectAll = ref(false);
    const selected = ref([]);
    const selected2 = ref([]);
    const users = ref([]);

    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/users/allusers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        users.value = response.data;
        emitUserCount();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const emitUserCount = () => {
      emit("count-users", users.value.length);
    };

    const checkAll = () => {
      selected.value = [];
      if (!selectAll.value) {
        selected.value = users.value.map((user) => user._id);
      }
    };

    watch(selected, () => {
      selectAll.value =
        users.value.length === selected.value.length ? true : false;
      emit("change-selection", selected.value);
      emit("count-users", selected2.value.length);
    });

    onMounted(() => {
      fetchAllUsers();
    });

    return {
      selectAll,
      selected,
      checkAll,
      users,
    };
  },
};
</script>
