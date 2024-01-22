import ApiService from "@/core/services/api.service";
import Service from '@/core/services/employee-api/Services';
import localStorage from "@/core/services/store/localStorage";

export const Fetch_MProvinces            = "fetchMasterprovinces";

export const SET_MASTER_provinces = "setMasterprovinces";
export const SET_ERROR = "setError";

const state = {
  master_provinces: [],
};

const getters = {
  masterprovinces(state) {
    return state.master_provinces;
  }
};

const actions = {
  [Fetch_MProvinces](context) {
    return new Promise((resolve, reject) => {
      Service.GetData(
          ApiService,
          `/provinces`, // Append parameters to the URL
          response => {
              resolve(response.data);
              context.commit(SET_MASTER_provinces, response.data);
          },
          err => {
              reject(err);
          }
      );
  });
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_MASTER_provinces](state, data) {
    state.master_provinces= data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
