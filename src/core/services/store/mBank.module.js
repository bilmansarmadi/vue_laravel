import ApiService from "@/core/services/api.service";
import Service from '@/core/services/employee-api/Services';
import localStorage from "@/core/services/store/localStorage";

export const Fetch_MBank            = "fetchMasterbank";

export const SET_MASTER_bank = "setMasterbank";
export const SET_ERROR = "setError";

const state = {
  master_bank: [],
};

const getters = {
  masterbank(state) {
    return state.master_bank;
  }
};

const actions = {
  [Fetch_MBank](context) {
    return new Promise((resolve, reject) => {
      Service.GetData(
          ApiService,
          `/banks`, // Append parameters to the URL
          response => {
              resolve(response.data);
              context.commit(SET_MASTER_bank, response.data);
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
  [SET_MASTER_bank](state, data) {
    state.master_bank= data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
