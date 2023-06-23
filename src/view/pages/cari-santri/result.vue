<template>
    <div class="container-fluid">
        <div class="card mt-4 shadow-xs cardHover mb-5">
            <div class="d-block px-3 py-3" data-toggle="collapse" style="background-color: #FFF;"
                role="button" aria-expanded="true" v-b-toggle.collapse-2 variant="primary">
                <div class="card-toolbar">
                <div class="d-flex">
                    <v-icon
                    color="#73a4ef">
                        mdi-account-group-outline
                    </v-icon>
                    <h6 class="font-weight-bold font-weight-black mt-2 ml-2">HASIL PENCARIAN DATA SANTRI</h6>
                </div>
                </div>
            </div>
        </div>

        <div class="card cardHover">
            <v-data-table responsive show-empty
                :headers="headers"
                :items="data_santri"
                :search="search"
                loading-text="Loading... Please wait"
                :items-per-page="10"
                item-key="santri_id"
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
                            <b-dropdown-item>EXCEL</b-dropdown-item>
                        </b-dropdown>
                    </div>
                    <!-- <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                class="mr-2"
                                dark
                                rounded
                                color="#73a4ef"
                                v-bind="attrs"
                                v-on="on"
                                >
                                <v-icon
                                    class="mr-1"
                                >
                                    mdi-printer-settings
                                </v-icon>
                                <span class="hideText">Cetak</span>
                            </v-btn>
                        </template>
                    <span>Cetak Data</span>
                    </v-tooltip> -->
                </v-toolbar>
                </template>
            <template v-slot:[`item.foto`]="{ item }">
                <img :src="item.foto" class="rounded" alt="Foto" style="max-width: 100px;" v-show="item.foto.length > 40"/>
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
                @hasStartedGeneration="hasStartedGeneration()"
                @hasGenerated="hasGenerated($event)"
                ref="html2PdfAll"
            >
                <section slot="pdf-content">
                <!-- PDF Content Here -->
                <section class="pdf-item">
                    <div align="center">
                        <p
                            style="
                                font-family: 'Verdana';
                                font-style: normal;
                                font-size: 16px;
                                color: black;
                                "
                            >
                            Data Santri
                        </p>
                    </div>
                    <br />
                    <div align="left" class="m-5">
                    <table border="1"  width="100%" style="text-color:black;overflow:wrap;border-collapse: collapse;">
                        <thead>
                        <tr align="center">
                            <th
                                scope="col"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                width="5%"
                            >
                            No.
                            </th>
                            <th
                                scope="col"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                width="18%"
                            >
                            Nama
                            </th>
                            <th
                                scope="col"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                width="10%"
                            >
                            Hafalan Ziyadah / Mutqin
                            </th>
                            <th
                                scope="col"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                width="11%"
                            >
                            Tempat, Tanggal Lahir
                            </th>
                            <th
                                scope="col"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                width="8%"
                            >
                            Jenis Kelamin
                            </th>
                            <th
                                scope="col"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                width="8%"
                            >
                            Berat / Tinggi Badan
                            </th>
                            <th
                                scope="col"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                width="11%"
                            >
                            Email
                            </th>
                            <th
                                scope="col"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                width="12%"
                            >
                            Alamat
                            </th>
                            <th
                                scope="col"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                width="14%"
                            >
                            Nama Ayah/Ibu
                            </th>
                            <th
                                scope="col"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                                width="8%"
                            >
                            No HP Ortu
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            v-for="(data, index) in data_santri"
                            :key="data.santri_id"
                        >
                            <td align="center"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                            >
                            {{ index +=1 }}
                            </td>
                            <td align="center"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                            >
                            {{ data.kode_santri }} - {{ data.nama_lengkap_santri }}
                            </td>
                            <td align="center"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                            >
                            {{ data.hafalan_ziyadah }} / {{ data.hafalan_mutqin }}
                            </td>
                            <td align="center"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                            >
                            {{ data.tempat_lahir }} , {{ data.tanggal_lahir }}
                            </td>
                            <td align="center"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                            >
                            {{ data.jenis_kelamin}}
                            </td>
                            <td align="center"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                            >
                            {{ data.berat_badan }} , {{ data.tinggi_badan }}
                            </td>
                            <td align="center"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                            >
                            {{ data.email }}
                            </td>
                            <td align="center"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                            >
                            {{ data.alamat }}
                            </td>
                            <td align="center"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                            >
                            {{ data.nama_ayah }} , {{ data.nama_ibu }}
                            </td>
                            <td align="center"
                                style="font-family: 'Verdana'; font-style: normal; font-size: 12px;"
                            >
                            {{ data.hp_ortu }}
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
import VueHtml2pdf from "vue-html2pdf";

export default {
    name: "resultsantri",
    props:['data', 'tgl'],
    data(){
        return{
            searchForm: "",
            search: '',
            data_santri: [],
            headers: [
                { 
                    text: 'Kode Santri', 
                    value: 'kode_santri',
                    align: 'start',
                    width: "110px",
                    sortable: false 
                },
                { 
                    text: 'Nama Lengkap', 
                    value: 'nama_lengkap_santri',
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
                    text: 'Hafalan Ziyadah', 
                    value: 'hafalan_ziyadah',
                    align: 'start',
                    width: "140px",
                    sortable: false 
                },
                { 
                    text: 'Hapalan Mutqin', 
                    value: 'hafalan_mutqin',
                    align: 'start',
                    width: "140px",
                    sortable: false 
                },
                { 
                    text: 'Tempat Lahir', 
                    value: 'tempat_lahir',
                    align: 'start',
                    width: "140px",
                    sortable: false 
                },
                { 
                    text: 'Tanggal Lahir', 
                    value: 'tanggal_lahir',
                    align: 'start',
                    width: "120px",
                    sortable: false 
                },
                { 
                    text: 'Jenis Kelamin', 
                    value: 'jenis_kelamin_Nama',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Anak Ke', 
                    value: 'anak_ke',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Berat Badan', 
                    value: 'berat_badan',
                    align: 'start',
                    width: "110px",
                    sortable: false 
                },
                { 
                    text: 'Tinggi Badan', 
                    value: 'tinggi_badan',
                    align: 'start',
                    width: "120px",
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
                    text: 'Alamat', 
                    value: 'alamat',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'No HP Ortu', 
                    value: 'hp_ortu',
                    align: 'start',
                    width: "120px",
                    sortable: false 
                },
                { 
                    text: 'Nama Ayah', 
                    value: 'nama_ayah',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Nama Ibu', 
                    value: 'nama_ibu',
                    align: 'start',
                    width: "150px",
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
            htmlToPdfAllOptions: {
                margin: 0.1,
                filename: `Data Santri.pdf`,
                image: {
                    type: 'jpeg', 
                    quality: 0.98
                },
                html2canvas: {useCORS: true}, 
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: "landscape"
                }
            },
        }
    },
    components: {
        VueHtml2pdf
    },
    mounted(){
        this.searchForm = this.data;
        this.load();
    },
    methods: {
        generateReportAll() {
            this.data_santri;
            this.$refs.html2PdfAll.generatePdf();
        },

        getMasterDataSantri(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "Read_Santri_Pecarian",
                    kode_santri: this.searchForm.kode_santri,
                    nama_lengkap_santri: this.searchForm.nama_lengkap_santri,
                    panggilan: this.searchForm.panggilan,
                    hafalan_ziyadah: this.searchForm.hafalan_ziyadah,
                    hafalan_mutqin: this.searchForm.hafalan_mutqin,
                    tempat_lahir: this.searchForm.tempat_lahir,
                    tanggal_lahir: this.tgl,
                    jenis_kelamin: this.searchForm.jenis_kelamin,
                    anak_ke: this.searchForm.anak_ke,
                    email: this.searchForm.email,
                    alamat: this.searchForm.alamat,
                    hp_ortu: this.searchForm.hp_ortu,
                    nama_ayah: this.searchForm.nama_ayah,
                    nama_ibu: this.searchForm.nama_ibu,
                    status: this.searchForm.status,
                    kelas_id: this.searchForm.kelas_id,
                    tahun_id: this.searchForm.tahun_id,
                    semester: this.searchForm.semester,
                    mapel_id: this.searchForm.mapel_id
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Santri",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_santri = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        // async beforeDownload ({ html2pdf, options, pdfContent }) {
        //     await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
        //         const totalPages = pdf.internal.getNumberOfPages()
        //         for (let i = 1; i <= totalPages; i++) {
        //             pdf.setPage(i)
        //             pdf.setFontSize(10)
        //             pdf.setTextColor(150)
        //             pdf.text(i, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
        //         } 
        //     }).save()
        // },

        async load() {
            Promise.all([
                await this.getMasterDataSantri()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>