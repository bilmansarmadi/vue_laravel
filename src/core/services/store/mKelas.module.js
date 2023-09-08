import ApiService from "@/core/services/api.service";
import Service from '@/core/services/aljazary-api/Services';
import localStorage from "@/core/services/store/localStorage";

export const Fetch_MKelas            = "fetchMasterKelas";

export const SET_MASTER_KELAS = "setMasterKelas";
export const SET_ERROR = "setError";

const state = {
  master_kelas: [],
};

const getters = {
  masterKelas(state) {
    return state.master_kelas;
  }
};

const actions = {
  [Fetch_MKelas](context) {
    return new Promise(resolve => {
      var mydata = {
        UID                 : localStorage.getLocalStorage("uid"),
        Token               : localStorage.getLocalStorage("token"),
        Trigger             : "R",
        Route               : 'COMBOBOX_KELAS'
      };

      let contentType = `application/x-www-form-urlencoded`;

      const qs = require("qs");

      Service.PostData(
        ApiService,
        "Master/Kelas",
        qs.stringify(mydata),
        contentType,
        response => {
          resolve(response);
          if (response.status == 1000) {
            context.commit(SET_MASTER_KELAS, response.data);
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
  [SET_MASTER_KELAS](state, data) {
    state.master_kelas= data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
