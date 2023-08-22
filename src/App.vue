<template>
  <router-view></router-view>
</template>

<style lang="scss">
// 3rd party plugins css
@import "~bootstrap-vue/dist/bootstrap-vue.css";
@import "~perfect-scrollbar/css/perfect-scrollbar.css";
@import "~socicon/css/socicon.css";
@import "~animate.css";
@import "~@fortawesome/fontawesome-free/css/all.css";
@import "~line-awesome/dist/line-awesome/css/line-awesome.css";
@import "assets/plugins/flaticon/flaticon.css";
@import "assets/plugins/flaticon2/flaticon.css";
@import "assets/plugins/keenthemes-icons/font/ki.css";

// Main demo style scss
@import "assets/sass/style.vue";

// Check documentation for RTL css
// Update HTML with RTL attribute at public/index.html
/*@import "assets/css/style.vue.rtl";*/
</style>

<style>
.cardHover:hover{
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 14px !important;
  color: #000 !important;
}

/* .theme--light.v-data-table > .v-data-table__wrapper > table > thead {
  background-color: #e9effd;
} */

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 13px !important;
}

/* .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 14px !important;
  color: #000 !important;
  border: 1px solid gray;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead {
  border: 1px solid gray;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr {
  border: 1px solid gray;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 13px !important;
  border: 1px solid gray;
} */

.input_images{
  display: flex;
  justify-content: center;
}
.input_images i{
  font-size: 3.2rem;
}
.input_images .file_upload{
  overflow: hidden;
  position: relative;
}
.input_images .file_upload #file{
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

@media (max-width: 575.98px) {
  .hideText {
    display:none;
  }
}
</style>

<script>
import Vue from "vue";
import VueExcelXlsx from "vue-excel-xlsx";
Vue.use(VueExcelXlsx);

import { OVERRIDE_LAYOUT_CONFIG } from "@/core/services/store/config.module";
import localStorage from "@/core/services/store/localStorage";
import { LOGOUT } from "@/core/services/store/auth.module";

export default {
  name: "MetronicVue",
  mounted() {
    /**
     * this is to override the layout config using saved data from localStorage
     * remove this to use config only from static json (@/core/config/layout.config.json)
     */
    this.$store.dispatch(OVERRIDE_LAYOUT_CONFIG);
  },
  created() {
    this.checkTokenExpiration();
  },
  methods: {
    checkTokenExpiration() {
      const token = localStorage.getLocalStorage('token');
      const timestamp = parseInt(localStorage.getLocalStorage('loginTimestamp'), 10);
      if (token && timestamp) {
        const currentTime = Date.now();
        const timeElapsed = currentTime - timestamp;
        const sixHours = 6 * 60 * 60 * 1000; // 6 jam dalam milidetik
        if (timeElapsed > sixHours) {
          this.$store
          .dispatch(LOGOUT)
          .then(() => this.$router.push({ name: "login" }));
        }
      }
    },
  }
};
</script>
