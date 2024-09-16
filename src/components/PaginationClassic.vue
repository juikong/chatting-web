<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <div class="text-sm text-gray-500 text-center sm:text-left">
      Showing
      <span
        v-if="itemsCount == 0"
        class="font-medium text-gray-600 dark:text-gray-300"
        >0</span
      >
      <span v-else class="font-medium text-gray-600 dark:text-gray-300">1</span>
      to
      <span class="font-medium text-gray-600 dark:text-gray-300">{{
        itemsCount
      }}</span>
      results
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginationClassic",
  props: ["itemsCount"],
};
</script>
