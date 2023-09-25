import ApiService from "@/core/services/api.service";
import Service from '@/core/services/aljazary-api/Services';
import localStorage from "@/core/services/store/localStorage";

export const Fetch_mPrivilege         = "fetchMasterPrivilege";

export const SET_MASTER_PRIVILEGE     = "setMasterMapel";
export const SET_ERROR                = "setError";

const state = {
  master_privilege: [],
};

const getters = {
  masterPrivilege(state) {
    return state.master_privilege;
  }
};

const actions = {
  [Fetch_mPrivilege](context, credentials) {
    return new Promise(resolve => {
      var mydata = {
        UID                 : localStorage.getLocalStorage("uid"),
        Token               : localStorage.getLocalStorage("token"),
        Trigger             : "R",
        Route               : 'READ_AKSES',
        menu_url            : credentials.MenuUrl
      };

      let contentType = `application/x-www-form-urlencoded`;

      const qs = require("qs");

      Service.PostData(
        ApiService,
        "Master/Privilege",
        qs.stringify(mydata),
        contentType,
        response => {
          resolve(response);
          if (response.status == 1000) {
            context.commit(SET_MASTER_PRIVILEGE, response.data[0]);
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
          context.commit(SET_ERROR, err);
        }
      );
    });
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_MASTER_PRIVILEGE](state, data) {
    state.master_privilege= data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
