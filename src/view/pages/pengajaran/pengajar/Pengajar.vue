<template>
    <div class="container-fluid">
        <div v-show="showSearch">
            <div class="card mt-4 shadow-xs cardHover mb-5">
                <div class="d-block px-3 py-3" data-toggle="collapse" style="background-color: #FFF;"
                    role="button" aria-expanded="true" v-b-toggle.collapse-2 variant="primary">
                    <div class="card-toolbar">
                    <div class="d-flex">
                        <v-icon
                        color="#73a4ef">
                            mdi-account-search
                        </v-icon>
                        <h6 class="font-weight-bold font-weight-black mt-2 ml-2">CARI DATA PENGAJAR</h6>
                    </div>
                    </div>
                </div>
            </div>
    
            <v-card>
                <v-card-actions>
                    <v-row>
                        <v-col cols="12" md="6">
                            <button
                                @click="formSubmit"
                                class="btn btn-primary font-weight-bolder text-md-body-1 rounded-lg py-2 col-md-12 mt-5"
                            >
                                Cari
                            </button>
                        </v-col>
                        <v-col cols="12" md="6">
                            <button
                                type="button"
                                @click="reset"
                                class="btn btn-light-primary font-weight-bolder text-md-body-1 rounded-lg py-2 col-md-12 mt-5"
                            >
                                Reset
                            </button>
                        </v-col>
                    </v-row>
                </v-card-actions>
                <v-card-text>
                    <v-container>
                        <form method="post" autocomplete="off">
                            <v-row>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        v-model="formInput.nip"
                                        label="NIP"
                                        required
                                        clearable
                                        type="number"
                                        color="#ee8b3d"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        v-model="formInput.nama_lengkap"
                                        label="Nama Lengkap"
                                        required
                                        clearable
                                        color="#ee8b3d"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        v-model="formInput.panggilan"
                                        label="Nama Panggilan"
                                        required
                                        clearable
                                        color="#ee8b3d"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        v-model="formInput.hafalan_mutqin"
                                        label="Hapalan Mutqin"
                                        clearable
                                        color="#ee8b3d"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        v-model="formInput.tempat_lahir"
                                        label="Tempat Lahir"
                                        required
                                        clearable
                                        color="#ee8b3d"
                                    ></v-text-field>
                                </v-col>
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
                                        label="Tanggal Lahir"
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
                                        v-model="formInput.jenis_kelamin"
                                        :items="dropdown_jenkel"
                                        item-text="text"
                                        item-value="value"
                                        label="Jenis Kelamin"
                                        clearable
                                        color="#ee8b3d"
                                    ></v-select>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-select
                                        v-model="formInput.status_nikah"
                                        :items="dropdown_status_nikah"
                                        item-text="text"
                                        item-value="value"
                                        label="Status Nikah"
                                        clearable
                                        color="#ee8b3d"
                                    ></v-select>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        v-model="formInput.email"
                                        label="Email"
                                        clearable
                                        color="#ee8b3d"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-text-field
                                        v-model="formInput.alamat"
                                        label="Alamat"
                                        clearable
                                        color="#ee8b3d"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-select
                                        v-model="formInput.status"
                                        :items="dropdown_status"
                                        item-text="text"
                                        item-value="value"
                                        label="Status"
                                        clearable
                                        color="#ee8b3d"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-row>
                        <v-col cols="12" md="6">
                            <button
                                @click="formSubmit"
                                class="btn btn-primary font-weight-bolder text-md-body-1 rounded-lg py-2 col-md-12 mb-7"
                            >
                                Cari
                            </button>
                        </v-col>
                        <v-col cols="12" md="6">
                            <button
                                type="button"
                                @click="reset"
                                class="btn btn-light-primary font-weight-bolder text-md-body-1 rounded-lg py-2 col-md-12 mb-7"
                            >
                                Reset
                            </button>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </div>

        <div v-show="showResult">
            <div class="card mt-4 shadow-xs cardHover mb-5">
                <div class="d-block px-3 py-3" data-toggle="collapse" style="background-color: #FFF;"
                    role="button" aria-expanded="true" v-b-toggle.collapse-2 variant="primary">
                    <div class="card-toolbar">
                    <div class="d-flex">
                        <v-icon
                        @click="goBack"
                        color="#73a4ef">
                            mdi-arrow-left
                        </v-icon>
                        <h6 class="font-weight-bold font-weight-black mt-2 ml-2">HASIL PENCARIAN DATA PENGAJAR</h6>
                    </div>
                    </div>
                </div>
            </div>

            <div align="center" v-if="printingInProgress">
                <v-progress-circular
                    color="primary"
                    indeterminate
                    :size="40"
                    :width="5"
                ></v-progress-circular>
                <p>{{ progressData }}%</p>
            </div>

            <div class="card cardHover">
                <v-data-table responsive show-empty
                    :headers="headers"
                    :items="data_pengajar"
                    :search="search"
                    loading-text="Loading... Please wait"
                    :items-per-page="10"
                    item-key="pengajar_id"
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
                                            :data="data_pengajar"
                                            :columns="columnsExcel"
                                            :file-name="'data-pengajar'"
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
                    <template v-slot:[`item.foto`]="{ item }">
                        <img :src="item.foto" class="rounded" alt="Foto" style="max-width: 100px;" v-show="item.foto.length > 40"/>
                    </template>
                    <template v-slot:[`item.tempat_lahir`]="{ item }">
                        <span>{{ item.tempat_lahir }} , {{ item.tanggal_lahir }}</span>
                    </template>
                    <template v-slot:[`item.nip`]="{ item }">
                        <router-link
                            :to="{ name: detail_data, query: {id: item.pengajar_id,}}"
                            target="_blank"> {{ item.nip }}
                        </router-link>
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
                                    Data Pengajar
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
                                                NIP
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
                                                Tempat Lahir
                                                </th>
                                                <th
                                                    scope="col"
                                                    style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                                >
                                                Tanggal Lahir
                                                </th>
                                                <th
                                                    scope="col"
                                                    style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                                >
                                                Jenis Kelamin
                                                </th>
                                                <th
                                                    scope="col"
                                                    style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                                >
                                                Email
                                                </th>
                                                <th
                                                    scope="col"
                                                    style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                                >
                                                Alamat
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="(data, index) in data_pengajar"
                                                :key="data.pengajar_id"
                                            >
                                                <td align="center"
                                                    style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                                >
                                                {{ index +=1 }}
                                                </td>
                                                <td align="left"
                                                    style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                                >
                                                {{ data.nip }}
                                                </td>
                                                <td align="left"
                                                    style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                                >
                                                {{ data.nama_lengkap}}
                                                </td>
                                                <td align="left"
                                                    style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                                >
                                                {{ data.tempat_lahir }}
                                                </td>
                                                <td align="left"
                                                    style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                                >
                                                {{ data.tanggal_lahir }}
                                                </td>
                                                <td align="center"
                                                    style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                                >
                                                {{ data.jenis_kelamin_nama}}
                                                </td>
                                                <td align="left"
                                                    style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                                >
                                                {{ data.email }}
                                                </td>
                                                <td align="left"
                                                    style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                                >
                                                {{ data.alamat }}
                                                </td>
                                            </tr>
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
import { formatDate } from "@/helpers/helper.js";
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import localStorage from "@/core/services/store/localStorage";
import VueHtml2pdf from "vue-html2pdf";

export default {
    name: "pengajaran-data-pengajar",
    data(){
        return{
            showResult: false,
            showSearch: true,
            formInput: {
                nip: "",
                nama_lengkap: "",
                panggilan: "",
                hafalan_mutqin: "",
                tempat_lahir: "",
                tanggal_lahir: "",
                jenis_kelamin: "",
                status_nikah: "",
                email: "",
                alamat: "",
                status: ""
            },
            dropdown_jenkel: [
                { value: 'L', text: "Ikhwan" },
                { value: 'P', text: "Akhwat " },
            ],
            dropdown_status: [
                { value: 0, text: "Tidak Aktif" },
                { value: 1, text: "Aktif" },
            ],
            dropdown_status_nikah: [
                { value: 'B', text: "Belum Kawin" },
                { value: 'K', text: "Kawin" },
                { value: 'D', text: "Duda" },
                { value: 'J', text: "Janda" }
            ],
            menu1: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateFormatted: "",
            search: '',
            data_pengajar: [],
            headers: [
                { 
                    text: 'NIP', 
                    value: 'nip',
                    align: 'start',
                    width: "110px",
                    sortable: false 
                },
                { 
                    text: 'Nama Lengkap', 
                    value: 'nama_lengkap',
                    align: 'start',
                    width: "180px",
                    sortable: false 
                },
                { 
                    text: 'Nama Panggilan', 
                    value: 'panggilan',
                    align: 'start',
                    width: "140px",
                    sortable: false 
                },
                { 
                    text: 'Foto', 
                    value: 'foto',
                    align: 'center',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Tempat / Tanggal Lahir', 
                    value: 'tempat_lahir',
                    align: 'start',
                    width: "140px",
                    sortable: false 
                },
                { 
                    text: 'Jenis Kelamin', 
                    value: 'jenis_kelamin_nama',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Email', 
                    value: 'email',
                    align: 'start',
                    width: "120px",
                    sortable: false 
                },
                { 
                    text: 'Status', 
                    value: 'status_nama',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                }
            ],
            detail_data: "",
            htmlToPdfAllOptions: {
                margin: 0.2,
                filename: `Data Pengajar.pdf`,
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: "landscape"
                }
            },
            columnsExcel : [
                {
                    label: "NIP",
                    field: "nip",
                },
                {
                    label: "Nama",
                    field: "nama_lengkap",
                },
                {
                    label: "Tempat Lahir",
                    field: "tempat_lahir",
                },
                {
                    label: "Tanggal Lahir",
                    field: "tanggal_lahir",
                },
                {
                    label: "Jenis Kelamin",
                    field: "jenis_kelamin_nama",
                },
                {
                    label: "Email",
                    field: "email",
                },
                {
                    label: "Alamat",
                    field: "alamat",
                },
            ],
            printingInProgress: false,
            progressData: 0,
        }
    },
    watch: {
        date (val) {
            this.dateFormatted = this.formatDate(this.date)
        },
    },
    mounted(){
        var check = this.$router.currentRoute.path;
        if (check == "/caripengajar") {
            this.detail_data = "data_detail_pengajar";
        } else {
            this.detail_data = "detail_pengajar";
        }
    },
    components: {
        VueHtml2pdf
    },
    methods: {
        generateReportAll() {
            this.data_santri;
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

        formSubmit(){
            this.showResult = true;
            this.showSearch= false;
            this.getMasterDataPengajar()
        },
        goBack(){
            this.showResult = false;
            this.showSearch= true;
        },
        reset(){
            this.formInput.nip = ""
            this.formInput.nama_lengkap= ""
            this.formInput.panggilan = ""
            this.formInput.hafalan_mutqin = ""
            this.formInput.tempat_lahir = ""
            this.formInput.jenis_kelamin = ""
            this.formInput.status_nikah = ""
            this.formInput.email = ""
            this.formInput.alamat = ""
            this.formInput.status = ""
            this.dateFormatted = ""
        },
        getMasterDataPengajar(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "Read_Pengajar",
                    nip: this.formInput.nip,
                    nama_lengkap: this.formInput.nama_lengkap,
                    panggilan: this.formInput.panggilan,
                    hafalan_mutqin: this.formInput.hafalan_mutqin,
                    tempat_lahir: this.formInput.tempat_lahir,
                    tanggal_lahir: this.formInput.tanggal_lahir,
                    jenis_kelamin: this.formInput.jenis_kelamin,
                    status_nikah: this.formInput.status_nikah,
                    email: this.formInput.email,
                    alamat: this.formInput.alamat,
                    status: this.formInput.status
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Pengajar",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_pengajar = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        }
    }
}
</script>