import ApiService from "@/core/services/api.service";
import Service from '@/core/services/aljazary-api/Services';
import localStorage from "@/core/services/store/localStorage";

export const Fetch_MThn_Ajaran_By_Santri      = "fetchMasterTahunAjaran";
export const Fetch_MThn_Ajaran                = "fetchMasterTahunAjaranDefault";
export const Fetch_MThn_Ajaran_ComboBox       = "fetchMasterTahunAjaranComboBox";

export const SET_MASTER_TAHUN_AJARAN          = "setMasterTahunAjaran";
export const SET_MASTER_TAHUN_AJARAN_DEFAULT  = "setMasterTahunAjaranDefault";
export const SET_MASTER_TAHUN_AJARAN_COMBOBOX = "setMasterTahunAjaranComboBox";
export const SET_ERROR = "setError";

const state = {
  master_tahun_ajaran_by_santri: [],
  master_tahun_ajaran_default: [],
  master_tahun_ajaran_combobox: [],
};

const getters = {
  masterTahunAjaranBySantri(state) {
    return state.master_tahun_ajaran_by_santri;
  },
  masterTahunAjaran(state) {
    return state.master_tahun_ajaran_default;
  },
  masterTahunAjaranComboBox(state) {
    return state.master_tahun_ajaran_combobox;
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
  [Fetch_MThn_Ajaran_ComboBox](context) {
    return new Promise(resolve => {
      var mydata = {
        UID                 : localStorage.getLocalStorage("uid"),
        Token               : localStorage.getLocalStorage("token"),
        Trigger             : "R",
        Route               : 'COMBOBOX_TAHUN_AJARAN'
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
            context.commit(SET_MASTER_TAHUN_AJARAN_COMBOBOX, response.data);
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
  [SET_MASTER_TAHUN_AJARAN_COMBOBOX](state, data) {
    state.master_tahun_ajaran_combobox = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
