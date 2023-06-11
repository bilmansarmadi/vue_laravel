<template>
  <ul class="menu-nav">
    <router-link v-for="data in data_menu" :key="data.menu_id"
      :to="`${data.menu_url}`"
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <img class="center-image" :src="`media/svg/shapes/${data.menu_icon}`"> &nbsp;
          <span class="menu-text"> {{ data.menu_nama }} </span>
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import localStorage from "@/core/services/store/localStorage";

export default {
  name: "KTMenu",

  data() {
    return {
      data_menu: [],
      routePath: '',
      route: ""
    };
  },

  mounted() {
    this.route = (this.$route.path).split('/');
    this.routePath = '/'+this.route[1]
    this.load();
  },

  methods: {
    hasActiveChildren(match) {
      return this.$route.path.indexOf(match) !== -1;
    },

    currentRouteName() {
      return this.$route.path;
    },

    getDataMenu() {
        return new Promise(resolve => {
        let contentType = `application/x-www-form-urlencoded`;
        var mydata = {
          UID: localStorage.getLocalStorage('uid'),
          Token: localStorage.getLocalStorage('token'),
          Trigger: 'R',
          Route: 'COMBOBOX_DETAIL_MENU',
          menu_url: this.routePath,
          role_id: localStorage.getLocalStorage('role_id'),
        };
        Services.PostData(ApiService, "Master/Menu", mydata, contentType, async response => {
          this.data_menu = response.data;
        }, err => {
          err;
        });
      });
    },

    async load() {
      Promise.all([await this.getDataMenu()]).then(function(results) {
        results;
      });
    }
  }
};
</script>
