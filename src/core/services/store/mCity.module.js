import ApiService from "@/core/services/api.service";
import Service from '@/core/services/employee-api/Services';
import localStorage from "@/core/services/store/localStorage";

export const Fetch_MCity            = "fetchMastercity";

export const SET_MASTER_city = "setMastercity";
export const SET_ERROR = "setError";

const state = {
  master_city: [],
};

const getters = {
  mastercity(state) {
    return state.master_city;
  }
};

const actions = {
  [Fetch_MCity](context) {
    return new Promise((resolve, reject) => {
      Service.GetData(
          ApiService,
          `/city`, // Append parameters to the URL
          response => {
              resolve(response.data);
              context.commit(SET_MASTER_city, response.data);
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
  [SET_MASTER_city](state, data) {
    state.master_city= data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
