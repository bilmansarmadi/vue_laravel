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
                      label="Tanggal Absensi"
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
                      label="s/d Tanggal Absensi"
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
                md="6"
              >
                <v-textarea
                  v-model="formFilter.nama_lengkap_santri"
                  label="Nama Santri"
                  required
                  clearable
                  color="#ee8b3d"
                  rows="1"
                ></v-textarea>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="formFilter.status_kehadiran"
                  :items="dropdown_status_kehadiran"
                  item-text="text"
                  item-value="value"
                  label="Status Kehadiran"
                  name="status_kehadiran"
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
          :items="dataDetailLaporan" 
          :search="search" 
          loading-text="Loading... Please wait"
          :items-per-page="5"
          group-by="tanggal"
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
            color="purple"
            single-line
            hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <div>
              <b-dropdown
                block
                variant="primary"
                class="m-2 font-weight-bold rounded-lg"
                text="CETAK">
                <b-dropdown-item @click="generateReportAll()">PDF</b-dropdown-item>
                <b-dropdown-item>
                  <vue-excel-xlsx
                    :data="dataDetailLaporan"
                    :columns="columnsExcel"
                    :file-name="'data-absensi'"
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
        </v-data-table>
      </div>

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
                <p
                  align="center"
                  style="
                    font-family: 'Verdana';
                    font-style: normal;
                    font-size: 16pt;
                    color: black;
                    "
                  >
                  Data Absensi
                </p>
                <div align="left">
                  <table border="1" cellspacing="0" cellpadding="2" width="100%" style="text-color:black;overflow:wrap;border-collapse: collapse;">
                    <thead>
                      <tr align="center">
                        <th
                          scope="col"
                          style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                        >
                        No.
                        </th>
                        <th
                          scope="col"
                          style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                        >
                        Nama
                        </th>
                        <th
                          scope="col"
                          style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                        >
                        Status Kehadiran
                        </th>
                        <th
                          scope="col"
                          style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                        >
                        Keterangan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(groupData, date) in groupedData">
                        <tr>
                          <td colspan="4" style="font-family: Verdana; font-style: normal; font-size: 12px;">Tanggal : {{ date }}</td>
                        </tr>
                        <tr v-for="(data, index) in groupData" :key="index">
                          <td align="center" style="font-family: Verdana; font-style: normal; font-size: 12px;">
                            {{ index + 1 }}
                          </td>
                          <td align="left" style="font-family: Verdana; font-style: normal; font-size: 12px;">
                            {{ data.nama_lengkap_santri }}
                          </td>
                          <td align="left" style="font-family: Verdana; font-style: normal; font-size: 12px;">
                            {{ data.status_kehadiran_nama }}
                          </td>
                          <td align="left" style="font-family: Verdana; font-style: normal; font-size: 12px;">
                            {{ data.keterangan_absensi }}
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
      dataDetailLaporan: [],
      progressBar: true,
      add_data_absensi: {
        santri_id: "",
        status_kehadiran: "",
        keterangan_absensi: ""
      },
      formFilter: {
        nama_lengkap_santri: "",
        status_kehadiran: ""
      },
      headers: [
        {
          text: 'Tanggal',
          value: 'tanggal',
          sortable: false
        },
        {
          text: 'Nama',
          value: 'nama_lengkap_santri',
          sortable: false
        },
        {
          text: 'Status Kehadiran',
          value: 'status_kehadiran_nama',
          sortable: false
        },
        {
            text: 'Keterangan',
            value: 'keterangan_absensi',
            sortable: 'false'
        },
        // { text: 'Actions', value: 'actions', sortable: false , width: "150px"},
      ],
      menu1: false,
      menu2: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: "",
      dateFormatted2: "",
      SantriId: [],
      StatusKehadiran: [],
      KeteranganKehadiran: [],
      showTable: false,
      dropdown_status_kehadiran : [
        { value: "H", text: "Hadir" },
        { value: "A", text: "Tidak Hadir" },
        { value: "I", text: "Ijin" },
        { value: "S", text: "Sakit" },
      ],
      columnsExcel : [
        {
          label: "Nama",
          field: "nama_lengkap_santri",
        }
      ],
      htmlToPdfAllOptions: {
        margin: 0.2,
        filename: `Data Absensi.pdf`,
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "landscape"
        }
      },
      printingInProgress: false,
      progressData: 0,
    }),
  
    computed: {
      groupedData() {
        const grouped = {};
        this.dataDetailLaporan.forEach((data) => {
          const tanggal = data.tanggal;
          if (!grouped[tanggal]) {
            grouped[tanggal] = [];
          }
          grouped[tanggal].push(data);
        });

        return grouped;
      },
    },
  
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
      date2 (val) {
        this.dateFormatted2 = this.formatDate2(this.date2)
      },
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

      getDataDetailLaporan(idTahun){
        return new Promise(resolve => {
          var mydata = {
            UID: localStorage.getLocalStorage("kode_user"),
            Token: localStorage.getLocalStorage("token"),
            Trigger: "R",
            Route: "READ_ABSENSI",
            tahun_id: idTahun,
            mapel_id: this.idMapel,
            dari_tanggal: this.dateFormatted,
            sampai_tanggal: this.dateFormatted2,
            status_kehadiran: this.formFilter.status_kehadiran,
            nama_lengkap_santri: this.formFilter.nama_lengkap_santri
          };
  
          let contentType = `application/x-www-form-urlencoded`;
  
          const qs = require("qs");
  
          Services.PostData(
            ApiService,
            "Riwayat/Absensi",
            qs.stringify(mydata),
            contentType,
            response => {
              resolve(response.data);
              this.dataDetailLaporan= response.data;
            },
            err => {
              err;
            }
          );
        });
      },

      filterData(){
        if (!this.dateFormatted) {
          Swal.fire({
            title: "",
            text: "Tanggal Absensi Tidak Boleh Kosong.",
            icon: "info",
            heightAuto: true,
            timer: 1500
          });
        } else {
          return new Promise(resolve => {
            var mydata = {
              UID: localStorage.getLocalStorage("kode_user"),
              Token: localStorage.getLocalStorage("token"),
              Trigger: "R",
              Route: "READ_ABSENSI",
              tahun_id: this.idTahun,
              mapel_id: this.idMapel,
              dari_tanggal: this.dateFormatted,
              sampai_tanggal: this.dateFormatted2,
              status_kehadiran: this.formFilter.status_kehadiran,
              nama_lengkap_santri: this.formFilter.nama_lengkap_santri
            };
    
            let contentType = `application/x-www-form-urlencoded`;
    
            const qs = require("qs");
    
            Services.PostData(
              ApiService,
              "Riwayat/Absensi",
              qs.stringify(mydata),
              contentType,
              response => {
                resolve(response.data);
                this.dataDetailLaporan= response.data;
                this.showTable = true
              },
              err => {
                err;
              }
            );
          });
        }
      },

      clearFilterDetail(){
        this.dateFormatted = ""
        this.dateFormatted2 = ""
        this.formFilter.nama_lengkap_santri = ""
        this.formFilter.status_kehadiran = ""
        this.showTable = false
      },

      async getDetailCache(idTahun) {
        Promise.all([
          await this.getDataDetailLaporan(idTahun)
        ])
        .then(async (results) => {
          this.progressBar = false
          results
        })
      },
    },
  }
  </script>