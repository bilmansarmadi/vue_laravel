import ApiService from "@/core/services/api.service";
import Service from '@/core/services/employee-api/Services';
import localStorage from "@/core/services/store/localStorage";

export const Fetch_MPositions            = "fetchMasterpositions";

export const SET_MASTER_positions = "setMasterpositions";
export const SET_ERROR = "setError";

const state = {
  master_positions: [],
};

const getters = {
  masterpositions(state) {
    return state.master_positions;
  }
};

const actions = {
  [Fetch_MPositions](context) {
    return new Promise((resolve, reject) => {
      Service.GetData(
          ApiService,
          `/positions`, // Append parameters to the URL
          response => {
              resolve(response.data);
              context.commit(SET_MASTER_positions, response.data);
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
  [SET_MASTER_positions](state, data) {
    state.master_positions= data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
