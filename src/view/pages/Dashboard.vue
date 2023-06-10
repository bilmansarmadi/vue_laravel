<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row">
      <div class="col-xl-4" 
        v-for="data in data_menu" :key="data.menu_id">
        
        <router-link :to="`${data.menu_url}`">
          <div
            class="card card-custom border border-primary bgi-no-repeat gutter-b card-stretch cardHover"
            :style="`background-position: right top; background-size: 30% auto; background-image: url(media/svg/shapes/${data.menu_icon})`"
          >
            <!--begin::Body-->
            <div class="card-body shadow-xs">
              <div class="card-title font-weight-bold text-muted text-hover-primary font-size-h5">{{ data.menu_nama }}</div>

              <div class="font-weight-bold text-success font-size-h5 mt-9 mb-5">
                {{ data.arab_deskripsi }}
              </div>
              <router-link :to="{ name: data.menu_url }"></router-link>
              <p class="text-dark-75 font-weight-bolder font-size-h7 m-0">
                {{ data.menu_deskripsi }}
              </p>
            </div>
            <!--end::Body-->
          </div>
        </router-link>
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import localStorage from "@/core/services/store/localStorage";

export default {
  name: "dashboard",
  data() {
    return {
      data_menu: [],
    }
  },
  components: {
  },
  mounted() {
    this.load();
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
  },
  methods: {
    getDataMenu() {
      return new Promise(resolve => {
        var mydata = {
          UID                 : localStorage.getLocalStorage("uid"),
          Token               : localStorage.getLocalStorage("token"),
          Trigger             : "R",
          Route               : "DEFAULT",
          menu_lvl            : 0,
          role_id             : localStorage.getLocalStorage('role_id')
        };

        let contentType = `application/x-www-form-urlencoded`;

        const qs = require("qs");

        Services.PostData(
          ApiService,
          "Master/Menu",
          qs.stringify(mydata),
          contentType,
          response => {
            resolve(response.data);
            this.data_menu = response.data;
          },
          err => {
            err;
          }
        );
      });
    },

    async load() {
      Promise.all([
        await this.getDataMenu()
      ]).then(function(results) {
        results;
      });
    },
  },
};
</script>
