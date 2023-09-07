import ApiService from "@/core/services/api.service";
import Service from '@/core/services/aljazary-api/Services';
import localStorage from "@/core/services/store/localStorage";

export const Fetch_MThn_Ajaran_By_Santri  = "fetchMasterTahunAjaran";
export const Fetch_MThn_Ajaran            = "fetchMasterTahunAjaranDefault";

export const SET_MASTER_TAHUN_AJARAN = "setMasterTahunAjaran";
export const SET_MASTER_TAHUN_AJARAN_DEFAULT = "setMasterTahunAjaranDefault";
export const SET_ERROR = "setError";

const state = {
  master_tahun_ajaran_by_santri: [],
  master_tahun_ajaran_default: [],
};

const getters = {
  masterTahunAjaran(state) {
    return state.master_tahun_ajaran_default;
  }
};

const actions = {
  [Fetch_MThn_Ajaran_By_Santri](context, credentials) {
    return new Promise(resolve => {
      var mydata = {
        UID                 : localStorage.getLocalStorage("uid"),
        Token               : localStorage.getLocalStorage("token"),
        Trigger             : "R",
        Route               : 'DEFAULT',
        santri_id           : credentials.SantriId
      };

      let contentType = `application/x-www-form-urlencoded`;

      const qs = require("qs");

      Service.PostData(
        ApiService,
        "Master/TahunAjaran",
        qs.stringify(mydata),
        contentType,
        response => {
          resolve(response);
          if (response.status == 1000) {
            context.commit(SET_MASTER_TAHUN_AJARAN, response.data);
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
  [Fetch_MThn_Ajaran](context) {
    return new Promise(resolve => {
      var mydata = {
        UID                 : localStorage.getLocalStorage("uid"),
        Token               : localStorage.getLocalStorage("token"),
        Trigger             : "R",
        Route               : 'DEFAULT'
      };

      let contentType = `application/x-www-form-urlencoded`;

      const qs = require("qs");

      Service.PostData(
        ApiService,
        "Master/TahunAjaran",
        qs.stringify(mydata),
        contentType,
        response => {
          resolve(response);
          if (response.status == 1000) {
            context.commit(SET_MASTER_TAHUN_AJARAN_DEFAULT, response.data);
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
  [SET_MASTER_TAHUN_AJARAN](state, data) {
    state.master_tahun_ajaran_by_santri = data;
  },
  [SET_MASTER_TAHUN_AJARAN_DEFAULT](state, data) {
    state.master_tahun_ajaran_default = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
