<template>
  <div class="topbar-item">
    <b-dropdown
      size="lg"
      toggle-class="topbar-item"
      no-caret
      right
      no-flip
      variant="link">
      <template v-slot:button-content>
        <div
          class="btn btn-lg btn-dark btn-transparent-white btn-dropdown btn-lg text-decoration-none"
        >
          <span class="font-weight-boldest">{{ user_fullname }}<i class="ml-3 fas fa-angle-down"></i></span>
        </div>
      </template>
      <div class="navi navi-hover min-w-md-150px text-black">
        <b-dropdown-text tag="div" class="navi-item">
          <router-link href="#" to="/profiles" class="navi-link">
            <span class="navi-icon">
              <i class="flaticon-profile-1 text-black"></i>
            </span>
            <span class="text-black font-weight-bold">Profile</span>
          </router-link>
        </b-dropdown-text>
        <b-dropdown-text tag="div" class="navi-item">
          <a href="#" class="navi-link" @click="onLogout">
            <span class="navi-icon">
              <i class="flaticon-logout text-black"></i>
            </span>
            <span class="text-black font-weight-bold">Logout</span>
          </a>
        </b-dropdown-text>
      </div>
    </b-dropdown>
  </div>
</template>

<style lang="scss">
.topbar {
  .custom-v-dropdown {
  &.dropdown-toggle {
    padding: 0;
    &:hover {
      text-decoration: none;
    }

    &.dropdown-toggle-no-caret {
      &:after {
        content: none;
      }
    }
  }

  &.dropdown-menu {
    margin: 0;
    padding: 0;
    outline: none;
    .b-dropdown-text {
      padding: 0;
    }
  }
}
}
</style>

<script>
import { LOGOUT } from "@/core/services/store/auth.module";
import localStorage from "@/core/services/store/localStorage";
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";

export default {
  name: "KTQuickUser",
  data() {
    return {
      user_fullname: ""
    };
  },
  mounted() {
    // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
    this.user_fullname = localStorage.getLocalStorage("user_fullname");
  },
  methods: {
    onLogout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "login" }));
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    }
  },
  computed: {
    picture() {
      return process.env.BASE_URL + "media/users/300_21.jpg";
    }
  }
};
</script>
