import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
import { Fetch_MThn_Ajaran, Fetch_MThn_Ajaran_ComboBox } from "@/core/services/store/m_ThnAjaran.module";
import { Fetch_MKelas} from "@/core/services/store/mKelas.module";
import { Fetch_mMapel} from "@/core/services/store/mMapel.module";

import Service from '@/core/services/aljazary-api/Services';
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
        Trigger             : "R",
        Route               : 'LOGIN',
        Token               : '_:>$%#%&%$522*(*&^%',
        UID                 : 'R',
        user_email          : credentials.user_email,
        user_password       : credentials.user_password
      };

      let contentType = `application/x-www-form-urlencoded`;

      const qs = require("qs");

      Service.PostData(
        ApiService,
        "Master/Users",
        qs.stringify(mydata),
        contentType,
        response => {
          resolve(response);
          if (response.status == 1000) {
            context.commit(SET_AUTH, response.data[0]);
            const timestamp = Date.now();
            localStorage.setLocalStorage('loginTimestamp', timestamp);
            localStorage.setLocalStorage('role_id', response.data[0].role_id);
            localStorage.setLocalStorage('uid', response.data[0].User_Id);
            localStorage.setLocalStorage('kode_user', response.data[0].kode_user);
            localStorage.setLocalStorage('user_fullname', response.data[0].nama);
            localStorage.setLocalStorage('token', response.data[0].token);
            localStorage.setLocalStorage('jenis_user', response.data[0].jenis_user);

            context.dispatch(Fetch_MThn_Ajaran)
            context.dispatch(Fetch_MThn_Ajaran_ComboBox)
            context.dispatch(Fetch_MKelas)
            context.dispatch(Fetch_mMapel)

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
          } else{
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
    return new Promise(resolve => {
      ApiService.post("login", credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });
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
