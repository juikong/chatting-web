<template>
  <div
    class="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700/60 min-w-60 md:space-y-3"
  >
    <!-- Group 1 -->
    <div>
      <div
        class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-3"
      >
        Settings
      </div>
      <ul class="flex flex-nowrap md:block mr-3 md:mr-0">
        <router-link
          to="/account-settings"
          custom
          v-slot="{ href, navigate, isExactActive }"
        >
          <li class="mr-0.5 md:mr-0 md:mb-0.5">
            <a
              class="flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap"
              :class="
                isExactActive &&
                'bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'
              "
              :href="href"
              @click="navigate"
            >
              <svg
                class="shrink-0 fill-current mr-2"
                :class="
                  isExactActive
                    ? 'text-violet-500 dark:text-violet-400'
                    : 'text-gray-400 dark:text-gray-500'
                "
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-5.143 7.91a1 1 0 1 1-1.714-1.033A7.996 7.996 0 0 1 8 10a7.996 7.996 0 0 1 6.857 3.877 1 1 0 1 1-1.714 1.032A5.996 5.996 0 0 0 8 12a5.996 5.996 0 0 0-5.143 2.91Z"
                />
              </svg>
              <span
                class="text-sm font-medium"
                :class="
                  isExactActive
                    ? 'text-violet-500 dark:text-violet-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                "
                >Account Settings</span
              >
            </a>
          </li>
        </router-link>
        <router-link
          to="/server-settings"
          custom
          v-slot="{ href, navigate, isExactActive }"
        >
          <li class="mr-0.5 md:mr-0 md:mb-0.5">
            <a
              class="flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap"
              :class="
                isExactActive &&
                'bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'
              "
              :href="href"
              @click="navigate"
            >
              <svg
                class="shrink-0 fill-current mr-2"
                :class="
                  isExactActive
                    ? 'text-violet-500 dark:text-violet-400'
                    : 'text-gray-400 dark:text-gray-500'
                "
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.354 2a2 2 0 0 0-1.857 1.257l-.338.845C3.43 4.035 3.71 4 4 4h8c.29 0 .571.035.84.102l-.337-.845A2 2 0 0 0 10.646 2H5.354Z"
                />
                <path
                  fill-rule="evenodd"
                  d="M2 13a2 2 0 0 1 2-2h8a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Zm10.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9 13.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4 5.5a2 2 0 1 0 0 4h8a2 2 0 1 0 0-4H4Zm8 2.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM9.75 7.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span
                class="text-sm font-medium"
                :class="
                  isExactActive
                    ? 'text-violet-500 dark:text-violet-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                "
                >Server Settings</span
              >
            </a>
          </li>
        </router-link>
        <router-link
          to="/email-settings"
          custom
          v-slot="{ href, navigate, isExactActive }"
        >
          <li class="mr-0.5 md:mr-0 md:mb-0.5">
            <a
              class="flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap"
              :class="
                isExactActive &&
                'bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'
              "
              :href="href"
              @click="navigate"
            >
              <svg
                class="shrink-0 fill-current mr-2"
                :class="
                  isExactActive
                    ? 'text-violet-500 dark:text-violet-400'
                    : 'text-gray-400 dark:text-gray-500'
                "
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
                />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
                />
              </svg>
              <span
                class="text-sm font-medium"
                :class="
                  isExactActive
                    ? 'text-violet-500 dark:text-violet-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                "
                >Email Settings</span
              >
            </a>
          </li>
        </router-link>
        <router-link
          to="/chatgpt-settings"
          custom
          v-slot="{ href, navigate, isExactActive }"
        >
          <li class="mr-0.5 md:mr-0 md:mb-0.5">
            <a
              class="flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap"
              :class="
                isExactActive &&
                'bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'
              "
              :href="href"
              @click="navigate"
            >
              <img
                class="mr-2 w-4 h-4"
                :class="
                  isExactActive
                    ? 'text-violet-500 dark:text-violet-400'
                    : 'text-gray-400 dark:text-gray-500'
                "
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABN0lEQVR4nLXTSyuFYRQF4CdMGem4xcxMLmd2GDAiozM1lTKTMmDgEpKBS0wwoBhIOSW3Un6Jv6Nd+0hfh5yBVd/ke9+19t5rr5d/wijOcYdFtDZDnsUVOtGGZbzjFlv5/0d04CGJ8S3hHuNowRieMNCIvI4XXKCEV1STOI/pvNeD6yJ5CttJPEYZK6hk+3NYzTEGUSsKnCa5LjCCD+xhH5foR3f681wUOERvCpxhCBvfzjfxht0c6Ti7+0KYdJSHu3k5SHVspOhZFunDgQJesr3ubPcy29/LcUaycgh04aQoUEuDbtOwuTSwkoaWvwnsYLIocJMrkitbyJGqudJSrjgMXNMAA3kYlYI4kSGKMNWD9Yj2RuQ6IqYR1xgj2o8YBzGqR3hmfiMXEQ8oHlI8qHB/uBnyn/EJDpI3UA6xSfUAAAAASUVORK5CYII="
              />
              <span
                class="text-sm font-medium"
                :class="
                  isExactActive
                    ? 'text-violet-500 dark:text-violet-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                "
                >Chatgpt Settings</span
              >
            </a>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsSidebar",
};
</script>
