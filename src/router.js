import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue")
        },


        {
          path: "/master",
          name: "master",
          component: () => import("@/view/pages/master/Master.vue")
        },
        {
          path: "/master/kelas",
          name: "master-kelas",
          component: () => import("@/view/pages/master/data-kelas/DataKelas.vue")
        },
        {
          path: "/master/kurikulum",
          name: "master-kurikulum",
          component: () => import("@/view/pages/master/kurikulum/Kurikulum.vue")
        },
        {
          path: "/master/kategori_kurikulum",
          name: "master-kategori-kurikulum",
          component: () => import("@/view/pages/master/kategori-kurikulum/KategoriKurikulum.vue")
        },
        {
          path: "/master/tahunajaran",
          name: "master-tahun-ajaran",
          component: () => import("@/view/pages/master/tahun-ajaran/TahunAjaran.vue")
        },
        {
          path: "/master/datasantri",
          name: "master-data-santri",
          component: () => import("@/view/pages/master/data-santri/DataSantri.vue")
        },
        {
          path: "/master/pengajar",
          name: "master-data-pengajar",
          component: () => import("@/view/pages/master/data-pengajar/DataPengajar.vue")
        },
        {
          path: "/master/mata_pelajaran",
          name: "master-mata-pelajaran",
          component: () => import("@/view/pages/master/mata-pelajaran/MataPelajaran.vue")
        },


        {
          path: "/manajemen",
          name: "manajemen",
          component: () => import("@/view/pages/manajemen/Manajemen.vue")
        },
        {
          path: "/manajemen/user",
          name: "manajemen-data-user",
          component: () => import("@/view/pages/manajemen/data-user/DataUser.vue")
        },
        {
          path: "/manajemen/Akses",
          name: "manajemen-web-akses",
          component: () => import("@/view/pages/manajemen/web-akses/WebAkses.vue")
        },
        {
          path: "/manajemen/roleuser",
          name: "manajemen-data-role",
          component: () => import("@/view/pages/manajemen/data-role/DataRole.vue")
        },

        
        {
          path: "/pengajaran",
          name: "pengajaran",
          component: () => import("@/view/pages/pengajaran/Pengajaran.vue")
        },
        {
          path: "/pengajaran/jadwal_kelas",
          name: "pengajaran-jadwal-kelas",
          component: () => import("@/view/pages/pengajaran/jadwal/Jadwal.vue")
        },
        {
          path: "/pengajaran/kelompok_kelas",
          name: "pengajaran-kelompok-kelas",
          component: () => import("@/view/pages/pengajaran/kelompok/Kelompok.vue")
        },
        {
          path: "/pengajaran/data_santri",
          name: "pengajaran-data-santri",
          component: () => import("@/view/pages/pengajaran/santri/Santri.vue")
        },
        {
          path: "/pengajaran/data_santri/detail_santri",
          name: "detail_santri",
          component: () => import("@/view/pages/pengajaran/santri/DetailSantri.vue")
        },
        {
          path: "/pengajaran/data_pengajar",
          name: "pengajaran-data-pengajar",
          component: () => import("@/view/pages/pengajaran/pengajar/Pengajar.vue")
        },
        {
          path: "/pengajaran/data_pengajar/detail_pengajar",
          name: "detail_pengajar",
          component: () => import("@/view/pages/pengajaran/pengajar/DetailPengajar.vue")
        },


        {
          path: "/jadwal",
          name: "jadwal",
          component: () => import("@/view/pages/jadwal-kelas/Jadwal.vue")
        },
        {
          path: "/profil",
          name: "data_diri",
          component: () => import("@/view/pages/data-diri/DataDiri.vue")
        },
        {
          path: "/profil/pengajar",
          name: "profil_pengajar",
          component: () => import("@/view/pages/pengajaran/pengajar/DetailPengajar.vue")
        },
        {
          path: "/profil/santri",
          name: "profil_santri",
          component: () => import("@/view/pages/pengajaran/santri/DetailSantri.vue")
        },
        // {
        //   path: "/caripengajar",
        //   name: "cari_data_pengajar",
        //   component: () => import("@/view/pages/cari-pengajar/CariPengajar.vue")
        // },
        // {
        //   path: "/resultpengajar",
        //   props: true,
        //   name: "resultpengajar",
        //   component: () => import("@/view/pages/cari-pengajar/result.vue")
        // },
        {
          path: "/caripengajar",
          name: "cari_data_pengajar",
          component: () => import("@/view/pages/pengajaran/pengajar/Pengajar.vue")
        },
        {
          path: "/caripengajar/detail_pengajar",
          name: "data_detail_pengajar",
          component: () => import("@/view/pages/pengajaran/pengajar/DetailPengajar.vue")
        },

        // {
        //   path: "/carisantri",
        //   name: "cari_data_santri",
        //   component: () => import("@/view/pages/cari-santri/CariSantri.vue")
        // },
        // {
        //   path: "/resultsantri",
        //   props: true,
        //   name: "resultsantri",
        //   component: () => import("@/view/pages/cari-santri/result.vue")
        // },

        {
          path: "/carisantri",
          name: "cari-data-santri",
          component: () => import("@/view/pages/pengajaran/santri/Santri.vue")
        },
        {
          path: "/carisantri/detail_santri",
          name: "data_detail_santri",
          component: () => import("@/view/pages/pengajaran/santri/DetailSantri.vue")
        },


        {
          path: "/inputnilai",
          name: "page_nilai",
          component: () => import("@/view/pages/input-nilai-santri/Nilai.vue")
        },
        {
          path: "/inputnilai/data",
          name: "input_nilai_santri",
          component: () => import("@/view/pages/input-nilai-santri/InputNilai.vue")
        },
        {
          path: "/inputnilai/laporan",
          name: "laporan_nilai_santri",
          component: () => import("@/view/pages/input-nilai-santri/Laporan.vue")
        },


        {
          path: "/absensi",
          name: "absensi",
          component: () => import("@/view/pages/absensi/Absensi.vue")
        },
        {
          path: "/absensi/data",
          name: "data-absensi",
          component: () => import("@/view/pages/absensi/data/DataAbsensi.vue")
        },
        {
          path: "/absensi/laporan",
          name: "laporan-absensi",
          component: () => import("@/view/pages/absensi/laporan/LaporanAbsensi.vue")
        },
        {
          path: "/absensi/agenda",
          name: "agenda",
          component: () => import("@/view/pages/absensi/agenda/Agenda.vue")
        },

        {
          path: "/profiles",
          name: "profile",
          component: () => import("@/view/pages/profile/Profiles.vue")
        },




        {
          path: "/profile",
          name: "profile",
          component: () => import("@/view/pages/profile/Profile.vue"),
          children: [
            {
              path: "profile-1",
              name: "profile-1",
              component: () => import("@/view/pages/profile/Profile-1.vue")
            },
            {
              path: "profile-2",
              name: "profile-2",
              component: () => import("@/view/pages/profile/Profile-2.vue")
            },
            {
              path: "profile-3",
              name: "profile-3",
              component: () => import("@/view/pages/profile/Profile-3.vue")
            },
            {
              path: "profile-4",
              name: "profile-4",
              component: () => import("@/view/pages/profile/Profile-4.vue")
            }
          ]
        }
      ]
    },
    {
      path: "/error",
      name: "error",
      component: () => import("@/view/pages/error/Error.vue"),
      children: [
        {
          path: "error-1",
          name: "error-1",
          component: () => import("@/view/pages/error/Error-1.vue")
        },
        {
          path: "error-2",
          name: "error-2",
          component: () => import("@/view/pages/error/Error-2.vue")
        },
        {
          path: "error-3",
          name: "error-3",
          component: () => import("@/view/pages/error/Error-3.vue")
        },
        {
          path: "error-4",
          name: "error-4",
          component: () => import("@/view/pages/error/Error-4.vue")
        },
        {
          path: "error-5",
          name: "error-5",
          component: () => import("@/view/pages/error/Error-5.vue")
        },
        {
          path: "error-6",
          name: "error-6",
          component: () => import("@/view/pages/error/Error-6.vue")
        }
      ]
    },
    {
      path: "/",
      component: () => import("@/view/pages/auth/login_pages/Login-1"),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import("@/view/pages/auth/login_pages/Login-1")
        },
        {
          name: "register",
          path: "/register",
          component: () => import("@/view/pages/auth/login_pages/Login-1")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue")
    }
  ]
});
