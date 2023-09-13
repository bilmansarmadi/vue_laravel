import ApiService from "@/core/services/api.service";
import Service from '@/core/services/aljazary-api/Services';
import localStorage from "@/core/services/store/localStorage";
import Swal from 'sweetalert2'

export const Fetch_R_Nilai_Tahsin     = "fetchRNilaiTahsin";
export const Fetch_R_Nilai_Inti       = "fetchRNilaiInti";
export const Fetch_R_Nilai_Akhlak     = "fetchRNilaiAkhlak";
export const Fetch_R_Nasihat          = "fetchRNasihat";
export const Fetch_R_Santri           = "fetchRSantri";
export const Fetch_R_Semester         = "fetchRSemester";

export const SET_R_NILAI_TAHSIN       = "setRNilaiTahsin";
export const SET_R_NILAI_INTI         = "setRNilaiInti";
export const SET_R_NILAI_AKHLAK       = "setRNilaiAkhlak";
export const SET_R_NASIHAT            = "setRNasihat";
export const SET_R_SANTRI             = "setRSantri";
export const SET_R_SEMESTER           = "setRSemester";

export const SET_ERROR                = "setError";

const state = {
  r_nilai_tahsin: [],
  r_nilai_inti: [],
  r_nilai_akhlak: [],
  r_nasihat: [],
  r_santri: [],
  r_semester: [],
};

const getters = {
  rNilaiTahsin(state) {
    return state.r_nilai_tahsin;
  },
  rNilaiInti(state) {
    return state.r_nilai_inti;
  },
  rNilaiAkhlak(state) {
    return state.r_nilai_akhlak;
  },
  rNasihat(state) {
    return state.r_nasihat;
  },
  rSantri(state) {
    return state.r_santri;
  },
  rSemester(state) {
    return state.r_semester;
  },
};

const actions = {
  [Fetch_R_Nilai_Tahsin](context, credentials) {
    return new Promise(resolve => {
      var mydata = {
        UID                 : localStorage.getLocalStorage("uid"),
        Token               : localStorage.getLocalStorage("token"),
        Trigger             : "R",
        Route               : 'READ_NILAI_TAHSIN',
        santri_id           : credentials.SantriId,
        tahun_id            : credentials.TahunId
      };

      let contentType = `application/x-www-form-urlencoded`;

      const qs = require("qs");

      Service.PostData(
        ApiService,
        "Riwayat/Riwayat_Nilai",
        qs.stringify(mydata),
        contentType,
        response => {
          resolve(response);
          if (response.status == 1000) {
            context.commit(SET_R_NILAI_TAHSIN, response.data);
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
  [Fetch_R_Nilai_Inti](context, credentials) {
    return new Promise(resolve => {
      var mydata = {
        UID                 : localStorage.getLocalStorage("uid"),
        Token               : localStorage.getLocalStorage("token"),
        Trigger             : "R",
        Route               : 'READ_NILAI_INTI',
        santri_id           : credentials.SantriId,
        tahun_id            : credentials.TahunId
      };

      let contentType = `application/x-www-form-urlencoded`;

      const qs = require("qs");

      Service.PostData(
        ApiService,
        "Riwayat/Riwayat_Nilai",
        qs.stringify(mydata),
        contentType,
        response => {
          resolve(response);
          if (response.status == 1000) {
            context.commit(SET_R_NILAI_INTI, response.data);
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
  [Fetch_R_Nilai_Akhlak](context, credentials) {
    return new Promise(resolve => {
      var mydata = {
        UID                 : localStorage.getLocalStorage("uid"),
        Token               : localStorage.getLocalStorage("token"),
        Trigger             : "R",
        Route               : 'READ_NILAI_AHLAK',
        santri_id           : credentials.SantriId,
        tahun_id            : credentials.TahunId
      };

      let contentType = `application/x-www-form-urlencoded`;

      const qs = require("qs");

      Service.PostData(
        ApiService,
        "Riwayat/Riwayat_Nilai",
        qs.stringify(mydata),
        contentType,
        response => {
          resolve(response);
          if (response.status == 1000) {
            context.commit(SET_R_NILAI_AKHLAK, response.data);
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
  [Fetch_R_Nasihat](context, credentials) {
    return new Promise(resolve => {
      var mydata = {
        UID                 : localStorage.getLocalStorage("uid"),
        Token               : localStorage.getLocalStorage("token"),
        Trigger             : "R",
        Route               : 'DEFAULT',
        santri_id           : credentials.SantriId,
        tahun_id            : credentials.TahunId
      };

      let contentType = `application/x-www-form-urlencoded`;

      const qs = require("qs");

      Service.PostData(
        ApiService,
        "Riwayat/Riwayat_Nasihat",
        qs.stringify(mydata),
        contentType,
        response => {
          resolve(response);
          if (response.status == 1000) {
            context.commit(SET_R_NASIHAT, response.data);
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
  [Fetch_R_Santri](context, credentials) {
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
        "Master/Santri",
        qs.stringify(mydata),
        contentType,
        response => {
          resolve(response);
          if (response.status == 1000) {
            context.commit(SET_R_SANTRI, response.data);
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
  [Fetch_R_Semester](context, credentials) {
    return new Promise(resolve => {
      var mydata = {
        UID                 : localStorage.getLocalStorage("uid"),
        Token               : localStorage.getLocalStorage("token"),
        Trigger             : "R",
        Route               : 'select_bysemester',
        santri_id           : credentials.SantriId
      };

      let contentType = `application/x-www-form-urlencoded`;

      const qs = require("qs");

      Service.PostData(
        ApiService,
        "Master/Santri",
        qs.stringify(mydata),
        contentType,
        response => {
          resolve(response);
          if (response.status == 1000) {
            context.commit(SET_R_SEMESTER, response.data[0]);
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
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_R_NILAI_TAHSIN](state, data) {
    state.r_nilai_tahsin = data;
  },
  [SET_R_NILAI_INTI](state, data) {
    state.r_nilai_inti = data;
  },
  [SET_R_NILAI_AKHLAK](state, data) {
    state.r_nilai_akhlak = data;
  },
  [SET_R_NASIHAT](state, data) {
    state.r_nasihat = data;
  },
  [SET_R_SANTRI](state, data) {
    state.r_santri = data;
  },
  [SET_R_SEMESTER](state, data) {
    state.r_semester = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
