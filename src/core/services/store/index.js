import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./auth.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";
import mCity from './mCity.module';
import mBank from './mBank.module';
import mPositions from './mPositions.module';
import mProvinces from './mProvinces.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    htmlClass,
    config,
    breadcrumbs,
    mCity,
    mBank,
    mPositions,
    mProvinces

  },
  plugins: [createPersistedState()],
});
