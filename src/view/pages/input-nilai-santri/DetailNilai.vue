<template>
  <div>
    <!-- <div class="card cardHover mb-10">
      <div class="d-block px-3 py-3" data-toggle="collapse" style="background-color: #FFF;"
        role="button" aria-expanded="true" v-b-toggle.collapse-2 variant="primary">
        <div class="card-toolbar">
        <div class="d-flex">
          <v-icon
          color="#73a4ef">
            mdi-filter
          </v-icon>
          <h6 class="font-weight-bold font-weight-black mt-2">FILTER DETAIL</h6>
          <v-icon
            class="ml-auto"
            color="#73a4ef">
            mdi-arrow-down-drop-circle-outline
          </v-icon>
        </div>
        </div>
      </div>
      <b-collapse visible id="collapse-2" class="mt-2">
        <b-card>
          <v-row>
            <v-col
            cols="12"
            md="6"
            >
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateFormatted"
                    label="Tanggal"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="formFilter.tipe_nilai"
                :items="dropdown_tipe_nilai"
                item-text="text"
                item-value="value"
                label="Tipe Nilai"
                clearable
                color="#ee8b3d"
              ></v-select>
            </v-col>
          </v-row>

          <v-btn 
              class="accent-4 mr-2"
              color="#73a4ef"
              dark
              rounded
              @click="filterData()"
          >
              Cari
          </v-btn>
          <v-btn 
              dark
              rounded
              color="red"
              @click="clearFilter"
          >
              Reset
          </v-btn>
        </b-card>
      </b-collapse>
    </div> -->

    <div class="card cardHover">
      <v-data-table 
        :headers="headers" 
        :items="dataDetail" 
        :search="search" 
        loading-text="Loading... Please wait"
        :items-per-page="5"
        class="elevation-1"
        :footer-props="{
        showFirstLastPage: false,
          'items-per-page-text':'Page'
        }"
      >
        <template v-slot:top>
          <v-toolbar
            flat
            class="mb-5"
          >
          <v-spacer></v-spacer>
          <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          color="#ee8b3d"
          single-line
          hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="1200px"
            persistent
          >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="#73a4ef"
                dark
                v-bind="attrs"
                v-on="on"
                rounded
                v-show="accessList.C"
                >
                <i class="flaticon-add-circular-button mr-1 text-white"></i>
                    <span class="hideText">Ubah Data</span> 
                </v-btn>
            </template>
            <form
              @submit.prevent="formSubmit"
            >
              <v-card>
                <v-card-title class="border">
                  <span class="text-h5">{{ formTitle }}</span>
                  <v-spacer></v-spacer>
                  <v-icon
                    class="rounded-circle p-2 shadow-sm"
                    small
                    @click="close"
                    color="#000"
                  >
                    mdi-close
                  </v-icon>
                </v-card-title>
      
                  <v-card-text>
                      <v-container>
                          <v-row v-for="(data, santri_id) in dataDetail" :key="santri_id">
                              <v-col
                                  cols="12"
                                  md="2"
                                  hidden
                              >
                                  <v-text-field
                                      v-model="data.santri_id"
                                      label="Id"
                                      clearable
                                      color="#ee8b3d"
                                      name="santri_id"
                                  ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  md="2"
                              >
                                  <v-text-field
                                      v-model="data.nama_lengkap_santri"
                                      label="Nama"
                                      clearable
                                      class="font-weight-medium"
                                      required
                                      name="nama_lengkap_santri"
                                      color="#ee8b3d"
                                  ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  md="2"
                              >
                                  <v-text-field
                                      v-model="data.uas"
                                      label="UAS"
                                      type="number"
                                      clearable
                                      name="uas"
                                      color="#ee8b3d"
                                  ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  md="2"
                              >
                                  <v-text-field
                                      v-model="data.uts"
                                      label="UTS"
                                      type="number"
                                      clearable
                                      name="uts"
                                      color="#ee8b3d"
                                  ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  md="2"
                              >
                                  <v-text-field
                                      v-model="data.tugas"
                                      label="Tugas"
                                      type="number"
                                      clearable
                                      name="tugas"
                                      color="#ee8b3d"
                                  ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  md="2"
                              >
                                  <v-text-field
                                      v-model="data.praktek"
                                      label="Praktek"
                                      type="number"
                                      clearable
                                      name="praktek"
                                      color="#ee8b3d"
                                  ></v-text-field>
                              </v-col>
                              <v-col
                                  cols="12"
                                  md="2"
                              >
                                  <v-textarea
                                      v-model="data.keterangan_nilai"
                                      label="Catatan"
                                      clearable
                                      rows="1"
                                      name="keterangan_nilai"
                                      color="#ee8b3d"
                                  ></v-textarea>
                              </v-col>
                          </v-row>
                      </v-container>
                  </v-card-text>
      
                  <v-card-actions>
                  <v-spacer></v-spacer>
                  <button
                      type="submit"
                      class="btn btn-primary btn-sm font-weight-bolder text-md-body-1 rounded-lg py-2 mb-3 mr-3 w-100px"
                  >
                      Simpan
                  </button>
                  <button
                      type="button"
                      @click="close"
                      class="btn btn-light-primary btn-sm font-weight-bolder text-md-body-1 rounded-lg py-2 mb-3 w-100px"
                  >
                      Batal
                  </button>
                  </v-card-actions>
              </v-card>
            </form>
          </v-dialog>
          </v-toolbar>
        </template>
  
        <!-- <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                dark
                x-small
                color="red"
                v-bind="attrs"
                v-on="on"
                @click="deleteItem(item)"
                >
                <v-icon dark>
                mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Hapus Data</span>
          </v-tooltip>
        </template> -->
      </v-data-table>
    </div>
  </div>
</template>
    
<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import localStorage from "@/core/services/store/localStorage";
import { formatDate } from "@/helpers/helper.js";
import Swal from 'sweetalert2'

export default {
  name: 'detail_nilai_santri',
  props: {
    // idMapel: {
    //   type: [String, Number],
    //   required: false,
    //   default: ''
    // },
    // idTahun: {
    //   type: [String, Number],
    //   required: false,
    //   default: ''
    // },
    accessList: {
      required: false,
      default: () => []
    }
  },

  created() {
    this.$parent.$on("get-detail-nilai", this.getDetailCache);
  },

  destroyed() {
    this.$parent.$off("get-detail-nilai", this.getDetailCache);
  },

  data: () => ({
    search: '',
    dataDetail: [],
    dialog: false,
    data_item: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    submitted: false,
    create_data_nilai: [],
    update_data_nilai: [],
    delete_data_nilai: [],
    add_data_nilai: {
      santri_id: "",
      nilai: ""
    },
    headers: [
      {
        text: 'Kode Santri',
        value: 'kode_santri',
        sortable: false
      },
      {
        text: 'Nama',
        value: 'nama_lengkap_santri',
        sortable: false
      },
      {
        text: 'Tugas',
        value: 'tugas',
        sortable: false
      },
      {
        text: 'UTS',
        value: 'uts',
        sortable: false
      },
      {
        text: 'UAS',
        value: 'uas',
        sortable: false
      },
      {
        text: 'Praktek',
        value: 'praktek',
        sortable: false
      },
      {
        text: 'Kehadiran',
        value: 'kehadiran',
        sortable: false
      },
      {
        text: 'Total Pertemuan',
        value: 'total_pertemuan',
        sortable: false
      },
      {
        text: 'Hasil Akhir',
        value: 'hasil_akhir',
        sortable: false
      },
      {
        text: 'KKM',
        value: 'kkm',
        sortable: false
      },
      {
        text: 'Status',
        value: 'status',
        sortable: false
      },
      {
        text: 'Predikat',
        value: 'predikat',
        sortable: false
      },
      {
        text: 'Catatan',
        value: 'keterangan_nilai',
        sortable: false
      },
      // { text: 'Actions', value: 'actions', sortable: false , width: "150px"},
    ],
    editedIndex: -1,
    editedItem: {
      kode_santri: 0,
      nama_lengkap_santri: '',
      nilai: 0
    },
    defaultItem: {
      kode_santri: 0,
      nama_lengkap_santri: 'New Item',
      nilai: 0
    },
    formFilter: {
      tipe_nilai: ""
    },
    dropdown_tipe_nilai: [
      { value: "Tugas", text: "Tugas" },
      { value: "UTS", text: "UTS" },
      { value: "UAS", text: "UAS" },
    ],
    menu1: false,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateFormatted: "",
    SantriId: [],
    SantriUas: [],
    SantriUts: [],
    SantriTugas: [],
    SantriPraktek: [],
    SantriCttn: [],
    showTable: false,
    idTahun: "",
    idMapel: ""
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Ubah Data' : 'Ubah Data'
    },
    formInput() {
      return this.editedIndex === -1 ? this.add_data_nilai : this.editedItem;
    },
    formSubmit() {
      return this.editedIndex === -1
          ? this.inputNIlai
          : this.updateNIlai;
    }
  },

  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    inputNIlai (submitEvent) {
      return new Promise(resolve => {
        var lengthData = 0;
        const currentDate = new Date();

        const day = currentDate.getDate().toString().padStart(2, '0'); // Mendapatkan hari (dd)
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Mendapatkan bulan (mm)
        const year = currentDate.getFullYear().toString(); // Mendapatkan tahun (yyyy)

        const formattedDate = `${day}-${month}-${year}`;

        lengthData = submitEvent.target.elements.santri_id.length;
        for (let i = 0; i < lengthData; i++) {
          this.SantriId.push(submitEvent.target.elements.santri_id[i]._value)
          this.SantriUas.push(submitEvent.target.elements.uas[i]._value)
          this.SantriUts.push(submitEvent.target.elements.uts[i]._value)
          this.SantriTugas.push(submitEvent.target.elements.tugas[i]._value)
          this.SantriPraktek.push(submitEvent.target.elements.praktek[i]._value)
          this.SantriCttn.push(submitEvent.target.elements.keterangan_nilai[i]._value)
        }

        var formData = new FormData();
        formData.append("Token", localStorage.getLocalStorage("token"))
        formData.append("UID", localStorage.getLocalStorage("kode_user"))
        formData.append("Trigger", "C")
        formData.append("Route", "INSERT_NILAI")
        formData.append("tahun_id", this.idTahun)
        formData.append("mapel_id", this.idMapel)
        formData.append("tanggal_nilai", formattedDate)

        for (let i = 0; i < this.SantriId.length; i++) {
          formData.append("import["+[i]+"][santri_id]", this.SantriId[i])
          formData.append("import["+[i]+"][uas]", this.SantriUas[i])
          formData.append("import["+[i]+"][uts]", this.SantriUts[i])
          formData.append("import["+[i]+"][tugas]", this.SantriTugas[i])
          formData.append("import["+[i]+"][praktek]", this.SantriPraktek[i])
          formData.append("import["+[i]+"][keterangan_nilai]", this.SantriCttn[i])
        }

        let contentType = `application/x-www-form-urlencoded`;

        Services.PostData(
        ApiService,
        "Riwayat/Riwayat_Nilai",
        formData,
        contentType,
        response => {
            resolve(response.data);
            if (response.status == 1000) {
              Swal.fire({
                title: "",
                text: "Berhasil menambahkan data.",
                icon: "success",
                heightAuto: true,
                timer: 1500
              });
            } else {
              Swal.fire({
                title: "",
                text: response.message,
                icon: "info",
                heightAuto: true,
                timer: 1500
              });
            }
            this.create_data_nilai = response.data;
            this.submitted = true;
            this.save("add_data_nilai");
            this.getDataDetail(this.idTahun);
        },
        err => {
            err;
        }
        );
      });
    },

    updateNIlai() {
      return new Promise(resolve => {
          var mydata = {
              UID: localStorage.getLocalStorage("uid"),
              Token: localStorage.getLocalStorage("token"),
              Trigger: "U",
              Route: "DEFAULT",
              nilai_id: this.data_item.nilai_id,
              santri_id: this.editedItem.santri_id
          };

          let contentType = `application/x-www-form-urlencoded`;

          const qs = require("qs");

          Services.PostData(
              ApiService,
              'Riwayat/Riwayat_Nilai',
              qs.stringify(mydata),
              contentType,
              response => {
                  resolve(response.data);
                  if (response.status == 1000) {
                      Swal.fire({
                          title: "",
                          text: "Berhasil mengubah data.",
                          icon: "success",
                          heightAuto: true,
                          timer: 1500
                      });
                  } else {
                      Swal.fire({
                          title: "",
                          text: response.message,
                          icon: "info",
                          heightAuto: true,
                          timer: 1500
                      });
                  }
                  this.update_data_nilai = response.data;
                  this.submitted = true;
                  this.save("edit_data_nilai");
                  this.getDataDetail(this.idHeader);
              },
              err => {
                  err;
              }
          );
      });
    },

    save(formInput) {
          if (formInput == "add_data_nilai") {
              if (this.editedIndex > -1) {
              Object.assign(
                  this.dataDetail[this.editedIndex],
                  this.add_data_nilai
              );
              } else {
                  this.dataDetail.push(this.add_data_nilai);
              }
          } else if (formInput == "edit_data_nilai") {
              if (this.editedIndex > -1) {
                  Object.assign(this.dataDetail[this.editedIndex], this.editedItem);
              } else {
                  this.dataDetail.push(this.editedItem);
              }
          }
          this.close();
    },

    deleteItem (item) {
      Swal.fire({
        title: 'Menghapus Data ?',
        text: "Data yang telah dihapus tidak dapat dikembalikan.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya !',
        cancelButtonText: 'Tidak !',
        confirmButtonColor: '#73a4ef',
        cancelButtonColor: '#ddd',
        heightAuto: false
      }).then((result) => {
          if(result.value == true){
            return new Promise(resolve => {
              var mydata = {
                UID: localStorage.getLocalStorage("uid"),
                Token: localStorage.getLocalStorage("token"),
                Trigger: "D",
                Route: "DEFAULT",
                nilai_id: item.nilai_id,
                santri_id: item.santri_id
              };

              let contentType = `application/x-www-form-urlencoded`;
              const qs = require("qs");

              Services.PostData(
                  ApiService,
                  'Riwayat/Riwayat_Nilai',
                  qs.stringify(mydata),
                  contentType,
                  response => {
                      resolve(response.data);
                      if (response.status == 1000) {
                          Swal.fire({
                              title: "",
                              text: "Berhasil menghapus data.",
                              icon: "success",
                              heightAuto: true,
                              timer: 1500
                          });
                      } else {
                          Swal.fire({
                              title: "",
                              text: response.message,
                              icon: "info",
                              heightAuto: true,
                              timer: 1500
                          });
                      }
                      this.delete_data_nilai = response.data;
                      this.submitted = true;
                      this.dataDetail.splice(this.deletedIndex, 1);
                      this.getDataDetail(this.idTahun);
                  },
                  err => {
                      err;
                  }
              );
            });
          }
      })
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
          this.add_data_nilai.santri_id = ""
          this.add_data_nilai.nilai = ""
          this.SantriId = []
          this.SantriUas = []
          this.SantriUts = []
          this.SantriTugas = []
          this.SantriPraktek = []
          this.SantriCttn = []
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
      })
    },

    getDataDetail(){
      return new Promise(resolve => {
        var mydata = {
          UID: localStorage.getLocalStorage("kode_user"),
          Token: localStorage.getLocalStorage("token"),
          Trigger: "R",
          Route: "READ_DETAIL_NILAI_V1",
          tahun_id: this.idTahun,
          mapel_id: this.idMapel,
          // tipe_nilai: this.formFilter.tipe_nilai,
          // tanggal_nilai: this.dateFormatted
        };

        let contentType = `application/x-www-form-urlencoded`;

        const qs = require("qs");

        Services.PostData(
          ApiService,
          "Riwayat/Riwayat_Nilai",
          qs.stringify(mydata),
          contentType,
          response => {
            resolve(response.data);
            this.dataDetail= response.data;
          },
          err => {
            err;
          }
        );
      });
    },

    // filterData(){
    //   if (!this.formFilter.tipe_nilai || !this.dateFormatted) {
    //     Swal.fire({
    //       title: "",
    //       text: "Filter Tidak Boleh Kosong.",
    //       icon: "info",
    //       heightAuto: true,
    //       timer: 1500
    //     });
    //   } else {
    //     return new Promise(resolve => {
    //       var mydata = {
    //         UID: localStorage.getLocalStorage("kode_user"),
    //         Token: localStorage.getLocalStorage("token"),
    //         Trigger: "R",
    //         Route: "READ_DETAIL_NILIA",
    //         tahun_id: this.idTahun,
    //         mapel_id: this.idMapel,
    //         tipe_nilai: this.formFilter.tipe_nilai,
    //         tanggal_nilai: this.dateFormatted
    //       };
  
    //       let contentType = `application/x-www-form-urlencoded`;
  
    //       const qs = require("qs");
  
    //       Services.PostData(
    //         ApiService,
    //         "Riwayat/Riwayat_Nilai",
    //         qs.stringify(mydata),
    //         contentType,
    //         response => {
    //           resolve(response.data);
    //           this.dataDetail= response.data;
    //           // this.showTable = true
    //         },
    //         err => {
    //           err;
    //         }
    //       );
    //     });
    //   }
    // },
    // clearFilter(){
    //   this.dateFormatted = ""
    //   this.formFilter.tipe_nilai = ""
    //   // this.showTable = false
    // },
    
    async getDetailCache(item) {
      this.idTahun = item.tahun_id
      this.idMapel = item.mapel_id
      
      Promise.all([
        await this.getDataDetail()
      ])
      .then(async (results) => {
        results
      })
    },
  },
}
</script>