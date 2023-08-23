<template>
  <div>
    <div class="card cardHover mb-10">
      <div class="d-block px-3 py-3" data-toggle="collapse" style="background-color: #FFF;"
        role="button" aria-expanded="true" v-b-toggle.filter-detail variant="primary">
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
      <b-collapse visible id="filter-detail" class="mt-2">
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
                    label="Tanggal Agenda"
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
              @click="clearFilterDetail"
          >
              Reset
          </v-btn>
        </b-card>
      </b-collapse>
    </div>

    <div align="center" v-if="printingInProgress">
      <v-progress-circular
        color="primary"
        indeterminate
        :siize="40"
        :wdth="5"
      ></v-progress-circular>
      <p>{{ progressData }}%</p>
    </div>

    <div class="card cardHover" v-show="showTable">
      <v-data-table 
        :headers="headers" 
        :items="dataDetailAgenda" 
        :search="search" 
        loading-text="Loading... Please wait"
        :items-per-page="5"
        group-by="tanggal_agenda"
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
              v-model="dialogCreate"
              max-width="600px"
              persistent
            >
              <template v-slot:activator="{ on, attrs }">
                  <v-btn
                  color="#73a4ef"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  rounded
                  >
                  <i class="flaticon-add-circular-button mr-1 text-white"></i>
                      <span class="hideText">Tambah Data</span> 
                  </v-btn>
              </template>
                <v-card>
                  <v-card-title class="border">
                    <span class="text-h5">{{ formTitle }}</span>
                    <v-spacer></v-spacer>
                    <v-icon
                      class="rounded-circle p-2 shadow-sm"
                      small
                      @click="closeCreate"
                      color="#000"
                    >
                      mdi-close
                    </v-icon>
                  </v-card-title>
        
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                          cols="12"
                          md="12"
                          >
                            <v-menu
                              ref="menu2"
                              v-model="menu2"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="dateFormatted2"
                                  label="Tanggal"
                                  persistent-hint
                                  prepend-icon="mdi-calendar"
                                  v-bind="attrs"
                                  @blur="date2 = parseDate2(dateFormatted2)"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="date2"
                                no-title
                                @input="menu2 = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                          >
                            <v-textarea
                              v-model="formInput.deskripsi"
                              label="Deskripsi"
                              required
                              clearable
                              color="#ee8b3d"
                              rows="2"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
        
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <button
                      @click="formSubmit"
                      class="btn btn-primary btn-sm font-weight-bolder text-md-body-1 rounded-lg py-2 mb-3 mr-3 w-100px"
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      @click="closeCreate"
                      class="btn btn-light-primary btn-sm font-weight-bolder text-md-body-1 rounded-lg py-2 mb-3 w-100px"
                    >
                      Batal
                    </button>
                    </v-card-actions>
                </v-card>
            </v-dialog>
          <div>
            <b-dropdown
              block
              variant="primary"
              class="m-2 font-weight-bold rounded-lg"
              text="CETAK">
              <b-dropdown-item @click="openModalExport()">PDF</b-dropdown-item>
              <b-dropdown-item>
                <vue-excel-xlsx
                  :data="dataDetailAgenda"
                  :columns="columnsExcel"
                  :file-name="'data-agenda'"
                  :file-type="'xlsx'"
                  :sheet-name="'Data'"
                  >
                  EXCEL
                </vue-excel-xlsx>
              </b-dropdown-item>
            </b-dropdown>
          </div>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mr-2"
                fab
                dark
                x-small
                color="#73a4ef"
                v-bind="attrs"
                v-on="on"
                @click="editItem(item)"
                >
                <i class="flaticon2-pen text-white"></i>
              </v-btn>
            </template>
          <span>Ubah Data</span>
          </v-tooltip>
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
        </template>
      </v-data-table>
    </div>

    <v-dialog
      v-model="dialog"
      max-width="600px"
      persistent
    >
      <v-card>
        <v-card-title class="border">
          <span class="text-h5">Cetak Data</span>
          <v-spacer></v-spacer>
          <v-icon
            class="rounded-circle p-2 shadow-sm"
            small
            @click="closeModalExport"
            color="#000"
          >
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="12"
              >
                <v-textarea
                  v-model="formExport.judul"
                  label="Judul"
                  required
                  clearable
                  color="#ee8b3d"
                  rows="1"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="12"
              >
                <v-textarea
                  v-model="formExport.sub_judul"
                  label="Sub Judul"
                  required
                  clearable
                  color="#ee8b3d"
                  rows="2"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <button
            @click="generateReportAll()"
            class="btn btn-primary btn-sm font-weight-bolder text-md-body-1 rounded-lg py-2 mb-3 mr-3 w-100px"
          >
            Cetak
          </button>
          <button
            type="button"
            @click="closeModalExport"
            class="btn btn-light-primary btn-sm font-weight-bolder text-md-body-1 rounded-lg py-2 mb-3 w-100px"
          >
            Batal
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- PDF ALL Session -->
    <template>
      <div>
        <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="false"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          :pdf-quality="2"
          :manual-pagination="false"
          :html-to-pdf-options="htmlToPdfAllOptions"
          pdf-content-width="100%"
          @progress="onProgress($event)"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasGenerated="hasGenerated($event)"
          @beforeDownload="beforeDownload($event)"
          @hasDownloaded="hasDownloaded($event)"
          ref="html2PdfAll"
        >
          <section slot="pdf-content">
            <section class="pdf-item">
              <div
                align="center"
                style="
                  font-family: 'Verdana';
                  font-style: normal;
                  font-size: 10pt;
                  color: black;
                  "
                >
                {{ formExport.judul }}
                <br>{{ formExport.sub_judul }}
              </div>
              <br>
              <div align="left">
                <table border="1" cellspacing="0" cellpadding="2" width="100%" style="text-color:black;overflow:wrap;border-collapse: collapse;">
                  <thead>
                    <tr align="center">
                      <th
                        scope="col"
                        width="7%"
                        style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                      >
                      No.
                      </th>
                      <th
                        scope="col"
                        width="93%"
                        style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                      >
                      Deskripsi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(groupData, date) in groupedData">
                      <tr>
                        <td colspan="2" style="font-family: Verdana; font-style: normal; font-size: 12px;">Tanggal: {{ date }}</td>
                      </tr>
                      <tr v-for="(data, index) in groupData" :key="index">
                        <td align="center" style="font-family: Verdana; font-style: normal; font-size: 12px;">
                          {{ index + 1 }}
                        </td>
                        <td align="left" style="font-family: Verdana; font-style: normal; font-size: 12px;">
                          {{ data.deskripsi }}
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </vue-html2pdf>
      </div>
    </template>
        <!-- END PDF ALL Session -->
  </div>
</template>

<style>
td, th {
  padding: 4px;
  color: #000;
  vertical-align: top;
}
tr { 
  page-break-inside: avoid !important; 
}
</style>
    
<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import localStorage from "@/core/services/store/localStorage";
import { formatDate } from "@/helpers/helper.js";
import Swal from 'sweetalert2'
import VueHtml2pdf from "vue-html2pdf";

export default {
  name: 'laporan-detail',
  props: {
    idMapel: {
      type: [String, Number],
      required: false,
      default: ''
    },
    idTahun: {
      type: [String, Number],
      required: false,
      default: ''
    },
    tipeAjaran: {
      type: [String, Number],
      required: false,
      default: ''
    },
    mapelNama: {
      type: [String, Number],
      required: false,
      default: ''
    },
    namaKelas: {
      type: [String, Number],
      required: false,
      default: ''
    },
    tahunAjaran: {
      type: [String, Number],
      required: false,
      default: ''
    },
    accessList: {
      required: false,
      default: () => []
    }
  },
  
  components: {
    VueHtml2pdf
  },

  data: () => ({
    search: '',
    dataDetailAgenda: [],
    progressBar: true,
    data_item: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    submitted: false,
    create_data_agenda: [],
    update_data_agenda: [],
    delete_data_agenda: [],
    add_data_agenda: {
      deskripsi: ""
    },
    headers: [
      {
        text: 'Tanggal',
        value: 'tanggal_agenda',
        sortable: false
      },
      {
        text: 'Deskripsi',
        value: 'deskripsi',
        sortable: 'false'
      },
      { 
        text: 'Aksi', 
        value: 'actions', 
        align: 'center',
        width: "150px",
        sortable: false 
      },
    ],
    menu1: false,
    menu2: false,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateFormatted: "",
    dateFormatted2: "",
    showTable: false,
    columnsExcel : [
      {
        label: "Tanggal",
        field: "tanggal_agenda"
      },
      {
        label: "Deskripsi",
        field: "deskripsi"
      }
    ],
    htmlToPdfAllOptions: {
      margin: 0.4,
      filename: `Data Agenda.pdf`,
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait"
      }
    },
    printingInProgress: false,
    progressData: 0,
    dialog: false,
    dialogCreate: false,
    formExport: {
      judul: "",
      sub_judul: ""
    }
  }),

  computed: {
    groupedData() {
      const grouped = {};
      this.dataDetailAgenda.forEach((data) => {
        const tanggal = data.tanggal_agenda;
        if (!grouped[tanggal]) {
          grouped[tanggal] = [];
        }
        grouped[tanggal].push(data);
      });

      return grouped;
    },
    formTitle () {
      return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
    },
    formInput() {
      return this.editedIndex === -1 ? this.add_data_agenda : this.editedItem;
    },
    formSubmit() {
      return this.editedIndex === -1
        ? this.createAgenda
        : this.updateAgenda;
    }
  },

  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    },
    date2 (val) {
      this.dateFormatted2 = this.formatDate2(this.date2)
    }
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
    formatDate2 (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    parseDate2 (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },

    generateReportAll() {
      this.dialog = false
      this.$refs.html2PdfAll.generatePdf();
    },

    onProgress(data) {
      this.progressData = data;
    },

    beforeDownload(){
      this.printingInProgress = true;
    },

    hasDownloaded(){
      this.printingInProgress = false;
      this.progressData = 0;
    },

    getAgenda(idTahun){
      return new Promise(resolve => {
        var mydata = {
          UID: localStorage.getLocalStorage("kode_user"),
          Token: localStorage.getLocalStorage("token"),
          Trigger: "R",
          Route: "DEFAULT",
          tahun_id: idTahun,
          mapel_id: this.idMapel,
          tanggal_agenda: this.dateFormatted,
        };

        let contentType = `application/x-www-form-urlencoded`;

        const qs = require("qs");

        Services.PostData(
          ApiService,
          "Riwayat/Agenda",
          qs.stringify(mydata),
          contentType,
          response => {
            resolve(response.data);
            this.dataDetailAgenda= response.data;
          },
          err => {
            err;
          }
        );
      });
    },

    filterData(){
      // if (!this.dateFormatted) {
      //   Swal.fire({
      //     title: "",
      //     text: "Tanggal Tidak Boleh Kosong.",
      //     icon: "info",
      //     heightAuto: true,
      //     timer: 1500
      //   });
      // } else {
      // }
      return new Promise(resolve => {
        var mydata = {
          UID: localStorage.getLocalStorage("kode_user"),
          Token: localStorage.getLocalStorage("token"),
          Trigger: "R",
          Route: "DEFAULT",
          tahun_id: this.idTahun,
          mapel_id: this.idMapel,
          tanggal_agenda: this.dateFormatted,
        };

        let contentType = `application/x-www-form-urlencoded`;

        const qs = require("qs");

        Services.PostData(
          ApiService,
          "Riwayat/Agenda",
          qs.stringify(mydata),
          contentType,
          response => {
            resolve(response.data);
            this.dataDetailAgenda= response.data;
            this.showTable = true
          },
          err => {
            err;
          }
        );
      });
    },

    clearFilterDetail(){
      this.dateFormatted = ""
      this.showTable = false
    },

    openModalExport(){
      this.dialog = true;
      this.formExport.judul = "Agenda Kelas " + this.namaKelas + " Mata Pelajaran " + this.mapelNama
      this.formExport.sub_judul = "Tahun Ajaran " + this.tahunAjaran  + " Semester " + this.tipeAjaran + " Per Tanggal " + this.dateFormatted
    },

    closeCreate(){
      this.dialogCreate = false
      this.$nextTick(() => {
        this.add_data_agenda.deskripsi = ""
        this.dateFormatted2 = ""
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeModalExport(){
      this.dialog = false;
    },

    createAgenda(){
      return new Promise(resolve => {
        var mydata = {
          UID: localStorage.getLocalStorage("uid"),
          Token: localStorage.getLocalStorage("token"),
          Trigger: "C",
          Route: "DEFAULT",
          mapel_id: this.idMapel,
          tahun_id: this.idTahun,
          tanggal_agenda: this.dateFormatted2,
          deskripsi: this.add_data_agenda.deskripsi
        };

        let contentType = `application/x-www-form-urlencoded`;

        const qs = require("qs");

        Services.PostData(
          ApiService,
          "Riwayat/Agenda",
          qs.stringify(mydata),
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
            this.create_data_agenda = response.data;
            this.submitted = true;
            this.save("add_data_agenda");
            this.getDetailCache(this.idTahun);
          },
          err => {
            err;
          }
        );
      });
    },

    updateAgenda() {
      return new Promise(resolve => {
        var mydata = {
          UID: localStorage.getLocalStorage("uid"),
          Token: localStorage.getLocalStorage("token"),
          Trigger: "U",
          Route: "DEFAULT",
          agenda_id: this.data_item.agenda_id,
          mapel_id: this.idMapel,
          tahun_id: this.idTahun,
          tanggal_agenda: this.dateFormatted2,
          deskripsi: this.editedItem.deskripsi
        };

        let contentType = `application/x-www-form-urlencoded`;

        const qs = require("qs");

        Services.PostData(
          ApiService,
          'Riwayat/Agenda',
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
            this.update_data_agenda = response.data;
            this.submitted = true;
            this.save("edit_data_agenda");
            this.getDetailCache(this.idTahun);
          },
          err => {
            err;
          }
        );
      });
    },

    editItem (item) {
      this.editedIndex = this.dataDetailAgenda.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dateFormatted2 = item.tanggal_agenda
      this.data_item = item
      this.dialogCreate = true
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
            agenda_id: item.agenda_id
          };

          let contentType = `application/x-www-form-urlencoded`;
          const qs = require("qs");

          Services.PostData(
            ApiService,
            'Riwayat/Agenda',
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
              this.delete_data_agenda = response.data;
              this.submitted = true;
              this.dataDetailAgenda.splice(this.deletedIndex, 1);
              this.getDetailCache(this.idTahun);
            },
            err => {
              err;
            }
          );
        });
        }
      })
    },

    save(formInput) {
      if (formInput == "add_data_agenda") {
        if (this.editedIndex > -1) {
          Object.assign(
            this.dataDetailAgenda[this.editedIndex],
            this.add_data_agenda
          );
        } else {
          this.dataDetailAgenda.push(this.add_data_agenda);
        }
      } else if (formInput == "edit_data_agenda") {
        if (this.editedIndex > -1) {
          Object.assign(this.dataDetailAgenda[this.editedIndex], this.editedItem);
        } else {
          this.dataDetailAgenda.push(this.editedItem);
        }
      }
      this.closeCreate();
    },

    async getDetailCache(idTahun) {
      Promise.all([
        await this.getAgenda(idTahun)
      ])
      .then(async (results) => {
        this.progressBar = false
        results
      })
    },
  },
}
</script>