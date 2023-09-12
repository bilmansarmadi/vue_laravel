import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./auth.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";
import profile from "./profile.module";
import mThnAjaran from './m_ThnAjaran.module';
import mKelas from './mKelas.module';
import mMapel from './mMapel.module';
import riwayatNilai from './riwayatNilai.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    htmlClass,
    config,
    breadcrumbs,
    profile,
    mThnAjaran,
    mKelas,
    mMapel,
    riwayatNilai
  },
  plugins: [createPersistedState()],
});
