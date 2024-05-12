/*****************************************************************************************************************/

// @author         Michael Roberts
// @package        @koroutine/web
// @license        Copyright © 2024

/*****************************************************************************************************************/

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt"],
  runtimeConfig: {
    public: {
      crawler: {
        apiBaseUrl: "http://0.0.0.0:8080",
      },
    },
  },
});

/*****************************************************************************************************************/
