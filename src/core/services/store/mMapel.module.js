import ApiService from "@/core/services/api.service";
import Service from '@/core/services/aljazary-api/Services';
import localStorage from "@/core/services/store/localStorage";

export const Fetch_mMapel             = "fetchMasterMapel";

export const SET_MASTER_MAPEL         = "fetchMasterMapel";
export const SET_ERROR                = "setError";

const state = {
  master_mapel: [],
};

const getters = {
  masterMapel(state) {
    return state.master_mapel;
  }
};

const actions = {
  [Fetch_mMapel](context) {
    return new Promise(resolve => {
      var mydata = {
        UID                 : localStorage.getLocalStorage("uid"),
        Token               : localStorage.getLocalStorage("token"),
        Trigger             : "R",
        Route               : 'COMBOBOX_MAPEL'
      };

      let contentType = `application/x-www-form-urlencoded`;

      const qs = require("qs");

      Service.PostData(
        ApiService,
        "Master/Mapel",
        qs.stringify(mydata),
        contentType,
        response => {
          resolve(response);
          if (response.status == 1000) {
            context.commit(SET_MASTER_MAPEL, response.data);
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
  [SET_MASTER_MAPEL](state, data) {
    state.master_mapel= data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
