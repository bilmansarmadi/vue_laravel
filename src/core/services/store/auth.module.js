import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
import { Fetch_MCity} from "@/core/services/store/mCity.module";
import { Fetch_MBank} from "@/core/services/store/mBank.module";
import { Fetch_MProvinces} from "@/core/services/store/mProvinces.module";
import { Fetch_MPositions} from "@/core/services/store/mPositions.module";

import Service from '@/core/services/employee-api/Services';
import localStorage from './localStorage'
import Swal from 'sweetalert2'

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_PASSWORD = "updateUser";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_PASSWORD = "setPassword";
export const SET_ERROR = "setError";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      var mydata = {
        users_email: credentials.user_email,
        users_password: credentials.user_password
      };
  
      let contentType = `application/x-www-form-urlencoded`;
  
      const qs = require("qs");
  
      Service.PostData(
        ApiService,
        "users/login",
        qs.stringify(mydata),
        contentType,
        response => {
          resolve(response);
          console.log(response, 'oi');
          if (response.success) {
            context.commit(SET_AUTH, response.data);
  
            const timestamp = Date.now();
            localStorage.setLocalStorage('loginTimestamp', timestamp);
            localStorage.setLocalStorage('users_token', response.data.users_token);
            localStorage.setLocalStorage('users_name', response.data.users_nama);
            localStorage.setLocalStorage('users_email', response.data.users_level);
            ApiService.init();
            context.dispatch(Fetch_MCity)
            context.dispatch(Fetch_MBank)
            context.dispatch(Fetch_MProvinces)
            context.dispatch(Fetch_MPositions)
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
  
            Toast.fire({
              icon: 'success',
              title: 'Berhasil login...'
            })
          } else {
            Swal.fire({
              title: response.message,
              icon: "warning",
              confirmButtonClass: "btn btn-secondary",
              heightAuto: true,
              timer: 3000
            });
          }
        },
        err => {
          Swal.fire({
            title: "Gagal Login",
            icon: "error",
            confirmButtonClass: "btn btn-secondary",
            heightAuto: true,
            timer: 1500
          });
          context.commit(SET_ERROR, err);
        }
      );
    });
  },
  
  [LOGOUT](context) {
    localStorage.deleteLocalStorage("uid");
    localStorage.deleteLocalStorage("token");
    localStorage.deleteLocalStorage("role_id");
    localStorage.deleteLocalStorage("user_fullname");
    localStorage.deleteLocalStorage("kode_user");
    localStorage.deleteLocalStorage("jenis_user");
    localStorage.deleteLocalStorage("loginTimestamp");
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
  
      var mydata = {
        Trigger: "C",
        Route: 'DEFAULT',
        Token: '_:>$%#%&%$522*(*&^%',
        UID: 'C',
        user_email: credentials.user_email,
        user_password: credentials.user_password,
        user_nama: credentials.user_nama,
        user_level: 1,
        tgl_terdaftar: formattedDate
      };
  
      let contentType = `application/x-www-form-urlencoded`;
      const qs = require("qs");
  
      Service.PostData(
        ApiService,
        "Master/Users",
        qs.stringify(mydata),
        contentType,
        response => {
          if (response.status == 1000) {
            const timestamp = Date.now();
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              }
            });
  
            Toast.fire({
              icon: 'success',
              title: 'Berhasil Register...'
            });
            resolve(response);
          } else {
            console.log('Hellloos',response);  
            Swal.fire({
              title: response.message_opt,
              icon: "warning",
              confirmButtonClass: "btn btn-secondary",
              heightAuto: true,
              timer: 3000
            });
            reject(response);
          }
        },
        err => {
          console.log('hello', err); // Cetak kesalahan ke konsol
          Swal.fire({
            title: "Gagal Regiter",
            icon: "error",
            confirmButtonClass: "btn btn-secondary",
            heightAuto: true,
            timer: 1500
          });
          context.commit(SET_ERROR, err);
          reject(err);
        }
      );
    });
  },  
  [VERIFY_AUTH](context) {
    if (JwtService.getToken()) {
      if(context.state.user.data > 0){
        context.commit(SET_AUTH, context.state.user.data);
      }else{
        context.commit(SET_ERROR, context.state.user.error);
      }
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_PASSWORD](context, payload) {
    const password = payload;

    return ApiService.put("password", password).then(({ data }) => {
      context.commit(SET_PASSWORD, data);
      return data;
    });
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.token);
  },
  [SET_PASSWORD](state, password) {
    state.user.password = password;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
