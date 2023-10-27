<template>
    <div>
        <div align="center" v-if="printingInProgress">
            <v-progress-circular
                color="primary"
                indeterminate
                :siize="40"
                :wdth="5"
            ></v-progress-circular>
            <p>{{ progressData }}%</p>
        </div>

        <div class="d-flex justify-content-end mt-5 mb-5">
            <b-dropdown
                block
                variant="primary"
                class="m-2 font-weight-bold rounded-lg"
                text="Export">
                <b-dropdown-item @click="openModalExport()">PDF</b-dropdown-item>
                <b-dropdown-item @click="fetchDataAndExport()">Word</b-dropdown-item>
            </b-dropdown>
        </div>

        <v-data-table 
            responsive show-empty
            :items="data_tahsin"
            :search="search"
            :headers="headers"
            :loading="progressBar"
            loading-text="Loading... Please wait"
            :items-per-page="5"
            v-show="accessList.R"
            group-by="kategori_nama"
            class="elevation-1 border border-primary card card-custom card-stretch border border-primary"
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
                <h5>{{ CustomMessage }}</h5>
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
                    max-width="500px"
                    persistent
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="#73a4ef"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    rounded
                    v-show="accessList.C || Akses_Nilai"
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
                            @click="close"
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
                                    <v-autocomplete
                                        v-model="formInput.mapel_id"
                                        :items="master_data_mapel"
                                        item-text="mapel_nama"
                                        item-value="mapel_id"
                                        label="Mata Pelajaran"
                                        clearable
                                        color="#ee8b3d"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="12"
                                >
                                    <v-text-field
                                        v-model="formInput.praktek"
                                        label="Praktek"
                                        clearable
                                        color="#ee8b3d"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
        
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <button
                        :disabled='isDisabledSimpan'
                        @click="formSubmit"
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
                </v-dialog>
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
                        v-show="accessList.U || Akses_Nilai"
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
                        v-show="accessList.D || Akses_Nilai"
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

        <v-dialog
        v-model="dialogCetak"
        max-width="800px"
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
                        md="6"
                    >
                        <v-text-field
                        v-model="formExport.tempat"
                        label="Tempat dan Tanggal"
                        required
                        clearable
                        color="#ee8b3d"
                        rows="1"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                        v-model="formExport.ttd1"
                        label="Jabatan 1"
                        required
                        clearable
                        color="#ee8b3d"
                        rows="2"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                        v-model="formExport.subttd1"
                        label="Penandatangan 1"
                        required
                        clearable
                        color="#ee8b3d"
                        rows="2"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                        v-model="formExport.ttd2"
                        label="Jabatan 2"
                        required
                        clearable
                        color="#ee8b3d"
                        rows="2"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                        v-model="formExport.subttd2"
                        label="Penandatangan 2"
                        required
                        clearable
                        color="#ee8b3d"
                        rows="2"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                        v-model="formExport.ttd3"
                        label="Jabatan 3"
                        required
                        clearable
                        color="#ee8b3d"
                        rows="2"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                        v-model="formExport.subttd3"
                        label="Penandatangan 3"
                        required
                        clearable
                        color="#ee8b3d"
                        rows="2"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                        v-model="formExport.ttd4"
                        label="Jabatan 4"
                        required
                        clearable
                        color="#ee8b3d"
                        rows="2"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                        v-model="formExport.subttd4"
                        label="Penandatangan 4"
                        required
                        clearable
                        color="#ee8b3d"
                        rows="2"
                        ></v-text-field>
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
            <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="false"
                :preview-modal="false"
                :paginate-elements-by-height="1400"
                :pdf-quality="3"
                :filename="`KHS${stateSemester.nama_lengkap_santri}`"
                :manual-pagination="true"
                :html-to-pdf-options="htmlToPdfAllOptions"
                pdf-content-width="100%"
                @progress="onProgress($event)"
                @hasStartedGeneration="hasStartedGeneration()"
                @hasGenerated="hasGenerated($event)"
                @beforeDownload="beforeDownload($event)"
                @hasDownloaded="hasDownloaded($event)"
                ref="html2PdfAll"
            >
            <pdf-content slot="pdf-content">
                <section class="pdf-item">
                    <div style="font-family: 'Times New Roman', Times, serif;color: black;">
                        <p style="font-size: 10pt;font-weight: bold;text-align: center;margin-top: 20px;text-transform: uppercase;">LAPORAN HASIL BELAJAR SEMESTER {{ stateSemester.ajaran }}</p>
                        <table width="100%" style="font-size: 9;">
                            <tr>
                                <td width="65%">
                                    <table width="100%">
                                        <tr>
                                            <td width="25%">Nama Santri</td>
                                            <td width="5%">:</td>
                                            <td width="70">{{ stateSemester.nama_lengkap_santri }}</td>
                                        </tr>
                                        <tr>
                                            <td>Nomor Induk</td>
                                            <td>:</td>
                                            <td>{{ stateSemester.no_induk }}</td>
                                        </tr>                                
                                    </table>
                                </td>
                                <td width="35%">
                                    <table width="100%">
                                        <tr>
                                            <td width="50%">Semester</td>
                                            <td width="5%">:</td>
                                            <td width="45">{{ stateSemester.semester }}</td>
                                        </tr>
                                        <tr>
                                            <td>Tahun Ajaran</td>
                                            <td>:</td>
                                            <td>{{ stateSemester.tahun_ajaran }}</td>
                                        </tr>                                
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <br>

                        <div style="font-weight: bold;font-size: 10pt;">I.&emsp;&emsp;KURIKULUM AL-QUR'AN</div>
                        <div style="font-weight: bold;font-size: 10pt;">&emsp;&emsp;&emsp;&emsp;A.&emsp;&emsp;TAHFIDZ</div>
                        <table class="forPdf" width="100%" style="font-size: 9;margin-top: 10px;border-color: black;" border="1" >
                            <thead>
                                <tr align="center">
                                    <th width="5%">No.</th>
                                    <th width="35%">Aspek</th>
                                    <th width="30%">Nilai</th>
                                    <th width="30%">Predikat</th>
                                </tr>
                            </thead>
                            <tbody v-for="(datas, i) in data_tahsin_I">
                                <tr v-if="datas.predikat !== '-'" align="center">
                                    <td>{{ i+1 }}</td> 
                                    <td align="left">{{ datas.mapel_nama }}</td> 
                                    <td :style="datas.predikat === '-' ? 'font-weight:bold;' : ''">{{ datas.praktek }}</td> 
                                    <td>{{ datas.predikat !== '-' ? datas.predikat : '' }}</td> 
                                </tr>
                                <tr v-else align="center">
                                    <td>{{ i+1 }}</td> 
                                    <td align="left">{{ datas.mapel_nama }}</td> 
                                    <td :colspan="datas.predikat === '-' ? 2 : 1"
                                    :style="datas.predikat === '-' ? 'font-weight:bold;' : ''">
                                    {{ datas.praktek }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br>
                        <div style="font-weight: bold;font-size: 10pt;">&emsp;&emsp;&emsp;&emsp;B.&emsp;&emsp;QIRO'AH</div>
                        <table class="forPdf" width="100%" style="font-size: 9;margin-top: 10px;border-color: black;" border="1" >
                            <tr align="center">
                                <th width="5%">No.</th>
                                <th width="35%">Aspek</th>
                                <th width="30%">Nilai</th>
                                <th width="30%">Predikat</th>
                            </tr>
                            <tr align="center" v-for="(data, i) in data_tahsin_II">
                                <td>{{ i+1 }}</td> 
                                <td align="left">{{ data.mapel_nama }}</td> 
                                <td>{{ data.praktek }}</td> 
                                <td>{{ data.predikat }}</td> 
                            </tr>
                        </table>
                        <br>

                        <div style="font-weight: bold;font-size: 10pt;">II. SYARIAH</div>
                        <table class="forPdf" width="100%" style="font-size: 9;margin-top: 10px;border-color: black;" border="1" >
                            <thead>
                            <tr align="center">
                                <th width="5%">No</th>
                                <th width="40%">Aspek</th>
                                <th width="15%">Nilai</th>
                                <th width="20%">Predikat</th>
                                <th width="20%">Deskripsi</th>
                            </tr>
                            </thead>
                            <tbody v-for="(item, i) in stateNilaiInti">
                            <tr v-if="item.STATUS !== '' && item.STATUS !== null" align="center">
                                <td>{{ i+1 }}</td>
                                <td align="left">{{ item.mapel_nama }}</td>
                                <td>{{ item.hasil_akhir }}</td>
                                <td>{{ item.predikat }}</td>
                                <td>{{ item.STATUS }}</td>
                                </tr>
                                <tr style="font-weight: bold;" v-else align="center">
                                    <td :colspan="2">{{ item.mapel_nama }}</td> 
                                    <td :colspan="2">{{ item.hasil_akhir }}</td> 
                                    <td>{{ item.predikat }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="html2pdf__page-break"/>

                        <div style="font-weight: bold;font-size: 10pt;">III.&emsp;&emsp;AKHLAK</div>
                        <table class="forPdf" width="100%" style="font-size: 9;margin-top: 10px;border-color: black;" border="1" >
                            <tr align="center">
                                <th width="5%">No.</th>
                                <th width="40%">Aspek</th>
                                <th width="15%">Nilai</th>
                                <th width="20%">Pedikat</th>
                                <th width="20%">Deskripsi</th>
                            </tr>
                            <tr align="center" v-for="(items, index) in stateNilaiAkhlak">
                                <td>{{ index+1 }}</td> 
                                <td align="left">{{ items.mapel_nama }}</td> 
                                <td>{{ items.praktek }}</td> 
                                <td>{{ items.predikat }}</td> 
                                <td>{{ items.STATUS }}</td> 
                            </tr>
                        </table>
                        <br>
                        <div style="font-weight: bold;font-size: 10pt;">IV.&emsp;&emsp;NASIHAT</div>
                        <table class="forPdfNasihat" width="100%" style="font-size: 9;margin-top: 10px;border-color: black;" border="1" >
                            <tr>
                                <td class="text-justify p-5">
                                    {{ stateNasihat.nasihat }}
                                </td>
                            </tr>
                        </table>
                        <table width="100%" style="font-size: 9;margin-top: 40px;text-align: center;page-break-inside:avoid">
                            <tr>
                                <td></td>
                                <td></td>
                                <td>{{ formExport.tempat }}</td>
                            </tr>
                            <tr>
                                <td>Mengetahui</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>{{ formExport.ttd1 }}</td>
                                <td>{{ formExport.ttd2 }}</td>
                                <td>{{ formExport.ttd3 }}</td>
                            </tr>
                            <tr>
                                <td colspan="3" height="80px"></td>
                            </tr>
                            <tr>
                                <td>{{ formExport.subttd1 }}</td>
                                <td>{{ formExport.subttd2 }}</td>
                                <td>{{ formExport.subttd3 }}</td>
                            </tr>
                        </table>
                        <table width="100%" style="font-size: 9;margin-top: 25px;text-align: center;page-break-inside:avoid">
                            <tr>
                                <td>{{ formExport.ttd4 }}</td>
                            </tr>
                            <tr>
                                <td height="80px"></td>
                            </tr>
                            <tr>
                                <td>{{ formExport.subttd4 }}</td>
                            </tr>
                        </table>
                    </div>
                </section>
            </pdf-content>
            </vue-html2pdf>
        </template>
        <!-- END PDF ALL Session -->
    </div>
</template>

<style>
.forPdf table {
    border-collapse: collapse;
    border-color: black;
}

.forPdf th, td {
    padding: 4px;
}

.forNoBorder td{
    padding: 1px;
}
</style>

<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";
import VueHtml2pdf from "vue-html2pdf";
import { Fetch_R_Nilai_Tahsin, Fetch_R_Semester } from "@/core/services/store/rhSantri.module";

export default {
    mounted() {
        this.Santri_Id  = this.$route.query.id;
        this.load();
        console.log(this.Akses_Nilai);
    },

    components: {
        VueHtml2pdf
    },

    props: {
        idHeader: {
            type: [String, Number],
            required: false,
            default: ''
        },
        Akses_Nilai: {
            type: [String, Number],
            required: false,
            default: ''
        },
        accessList: {
            required: false,
            default: () => []
        }
    },

    data(){
        return {
            Santri_Id: "",
            data_tahsin: [],
            data_tahsin_I: [],
            data_tahsin_II: [],
            logoPath: 'http://localhost:1907/media/logos/LogoAlJazary.png',
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_data_tahsin: [],
            update_data_tahsin: [],
            delete_data_tahsin: [],
            add_data_tahsin: {
                mapel_id: "",
                praktek: "",
            },
            headers: [
                { 
                    text: 'Kategori', 
                    value: 'kategori_nama',
                    align: 'start',
                    sortable: false 
                },
                { 
                    text: 'Aspek', 
                    value: 'mapel_nama',
                    align: 'start',
                    sortable: false 
                },
                { 
                    text: 'Nilai', 
                    value: 'praktek',
                    align: 'start',
                    sortable: false 
                },
                { 
                    text: 'Predikat', 
                    value: 'predikat',
                    align: 'start',
                    sortable: false 
                },
                { 
                    text: 'Aksi', 
                    value: 'actions', 
                    align: 'center',
                    width: "120px",
                    sortable: false 
                },
            ],
            rulesNotNull: [
                value => !!value || 'Tidak boleh kosong.',
            ],
            master_data_mapel: [],
            menu1: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateFormatted: "",
            dataDetailCttn: "",
            dialogSeenBill: false,
            CustomMessage: "",
            htmlToPdfAllOptions: {
                margin: [1.4, 0.7, 1.4, 0.7],
                image: {
                    type: 'jpeg', 
                    quality: 1
                },
                filename: "KHS",
                html2canvas: {
                    dpi: 192,
                    scale:4,
                    letterRendering: true,
                    useCORS: true
                },
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: "portrait"
                }
            },
            printingInProgress: false,
            progressData: 0,
            dialogCetak: false,
            formExport: {
                tempat: "",
                ttd1: "",
                subttd1: "",
                ttd2: "",
                subttd2: "",
                ttd3: "",
                subttd3: "",
                ttd4: "",
                subttd4: ""
            },
            stateSantri: [],
            stateNilaiInti: [],
            stateNilaiAkhlak: [],
            stateNasihat: [],
            stateSemester: [],
        }
    },

    watch: {
        idHeader(val){
            this.getDetailCache(val)
        },

        dialog (val) {
            val || this.close()
        },

        data_tahsin(){
            this.progressBar = false
        },

        date (val) {
            this.dateFormatted = this.formatDate(this.date)
        },
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_data_tahsin : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createTahsin
                : this.updateTahsin;
        },
        isDisabledSimpan(){
            return !this.formInput.mapel_id || !this.formInput.praktek
        }
    },

    methods:{
        openModalExport(){
            var SantriId = this.Santri_Id;
            this.$store
                .dispatch(Fetch_R_Semester, { SantriId })
                .then((res) => {
                    this.stateSemester = res.data[0]
                })
                .catch((err) => err);

            this.stateSantri = this.$store.state.rhSantri.r_santri[0];
            this.stateNilaiInti = this.$store.state.rhSantri.r_nilai_inti;
            this.stateNilaiAkhlak = this.$store.state.rhSantri.r_nilai_akhlak;
            this.stateNasihat = this.$store.state.rhSantri.r_nasihat[0];
            this.dialogCetak = true;

            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const monthIndex = currentDate.getMonth();
            const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ];
            const year = currentDate.getFullYear().toString();
            const monthName = months[monthIndex];

            const formattedDate = `${day} ${monthName} ${year}`;

            this.formExport.tempat = "Bogor, " + formattedDate;
            this.formExport.ttd1 = "Orang Tua/Wali";
            this.formExport.ttd2 = "Mudir Pondok Pesantren Al-Jazary";
            this.formExport.ttd3 = "Pembimbing Halaqoh";
            this.formExport.ttd4 = "Guru Besar Pondok Pesantren Al-jazary";
        },

        closeModalExport(){
            this.dialogCetak = false
        },

        generateReportAll() {
            this.dialogCetak = false;
            this.$refs.html2PdfAll.generatePdf();
        },

        onProgress(data) {
            this.progressData = data-30;
        },

        async beforeDownload ({ html2pdf, options, pdfContent }) {
            this.printingInProgress = true
            await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
                const totalPages = pdf.internal.getNumberOfPages()
                
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i)
                    
                    const imageWidth = 0.87;
                    const imageHeight = 1;
                    const imageX = 0.4;
                    const imageY = 0.08;
                    pdf.addImage('./LogoAlJazary.png', 'PNG', imageX, imageY, imageWidth, imageHeight);

                    const pageWidth = pdf.internal.pageSize.getWidth();
                    const pageHeight = pdf.internal.pageSize.getHeight();
                    const imageWidth1 = 6;
                    const imageHeight1 = 7;
                    const imageX1 = (pageWidth - imageWidth1) / 2;
                    const imageY1 = (pageHeight - imageHeight1) / 2;
                    pdf.addImage('./Trans.png', 'PNG', imageX1, imageY1, imageWidth1, imageHeight1);

                    const imageWidth2 = 2.4;
                    const imageHeight2 = 0.52;
                    const imageX2 = 3;
                    const imageY2 = 0.15;
                    pdf.addImage('./KopArab.png', 'PNG', imageX2, imageY2, imageWidth2, imageHeight2);

                    const imageWidth3 = 3.6;
                    const imageHeight3 = 0.37;
                    const imageX3 = 2.3;
                    const imageY3 = 0.6;
                    pdf.addImage('./KopIndo.png', 'PNG', imageX3, imageY3, imageWidth3, imageHeight3);

                    pdf.setFontSize(7);
                    pdf.setTextColor('#000');
                    pdf.text('Jl. Raya Cipari Batulayang RT 01/RW 04, Kec. Cisarua, Kabupaten Bogor, Jawa Barat 16750', (pdf.internal.pageSize.getWidth() / 2), (pdf.internal.pageSize.getHeight() * 0.09), { align: 'center' });
                    
                    pdf.setLineWidth(0.03);
                    pdf.line(9, (pdf.internal.pageSize.getHeight() * 0.10), pdf.internal.pageSize.getWidth() - 10, (pdf.internal.pageSize.getHeight() * 0.10));
                    pdf.setLineWidth(0.01);
                    pdf.line(9, (pdf.internal.pageSize.getHeight() * 0.105), pdf.internal.pageSize.getWidth() - 10, (pdf.internal.pageSize.getHeight() * 0.105));
                } 
            }).save()
            this.progressData = 100
            setTimeout(() => {
                this.printingInProgress = false;
            }, 500);
        },

        hasDownloaded(){
            this.printingInProgress = false;
            this.progressData = 0;
        },

        async fetchDataAndExport() {
            try {
                var SantriId = this.Santri_Id;
                const res = await this.$store.dispatch(Fetch_R_Semester, { SantriId });
                this.stateSemester = res.data[0];
                this.stateSantri = this.$store.state.rhSantri.r_santri[0];
                this.stateNilaiInti = this.$store.state.rhSantri.r_nilai_inti;
                this.stateNilaiAkhlak = this.$store.state.rhSantri.r_nilai_akhlak;
                this.stateNasihat = this.$store.state.rhSantri.r_nasihat[0];
                this.exportToWord();
            } catch (err) {
                console.error(err);
            }
        },

        exportToWord() {
            const tbodyContent = this.data_tahsin_I.map((datas, i) => {
                if (datas.predikat !== '-') {
                    // Jika predikat bukan '-', tampilkan dua baris
                    return `
                    <tr align="center">
                        <td>${i + 1}</td>
                        <td align="left">${datas.mapel_nama}</td>
                        <td :style="datas.predikat === '-' ? 'font-weight:bold;' : ''">${datas.praktek}</td>
                        <td>${datas.predikat !== '-' ? datas.predikat : ''}</td>
                    </tr>
                    `;
                } else {
                    // Jika predikat adalah '-', gabungkan dua baris menjadi satu
                    return `
                    <tr align="center">
                        <td>${i + 1}</td>
                        <td align="left">${datas.mapel_nama}</td>
                        <td colspan="2" :style="datas.predikat === '-' ? 'font-weight:bold;' : ''">${datas.praktek}</td>
                    </tr>
                    `;
                }
                }).join('');

            const tbodyContentII = this.data_tahsin_II.map((datas, i) => `
                <tr align="center">
                    <td>${i + 1}</td>
                    <td align="left">${datas.mapel_nama}</td>
                    <td>${ datas.praktek }</td> 
                    <td>${ datas.predikat }</td> 
                </tr>
                `).join('');

            const tbodyContentIII = this.stateNilaiInti.map((datas, i) => {
            if (datas.STATUS !== '' && datas.STATUS !== null) {
                // Jika predikat bukan '-', tampilkan dua baris
                return `
                <tr align="center">
                    <td>${i + 1}</td>
                    <td align="left">${datas.mapel_nama}</td>
                    <td>${datas.hasil_akhir }</td>
                    <td>${datas.predikat }</td>
                    <td>${datas.STATUS }</td>
                </tr>
                `;
            } else {
                // Jika predikat adalah '-', gabungkan dua baris menjadi satu
                return `
                <tr style="font-weight: bold;"align="center">
                    <td colspan="2">${datas.mapel_nama }</td> 
                    <td colspan="2">${datas.hasil_akhir }</td> 
                    <td>${datas.predikat }</td>
                </tr>
                `;
            }
            }).join('');

            const tbodyContentIV = this.stateNilaiAkhlak.map((datas, i) => `
                <tr align="center">
                    <td>${i + 1}</td>
                    <td align="left">${datas.mapel_nama}</td>
                    <td>${ datas.praktek }</td> 
                    <td>${ datas.predikat }</td> 
                    <td>${ datas.STATUS }</td> 
                </tr>
                `).join('');
                

            const letterContent = `
            <html>
            <head>
            <style>
            body {
                    page: A4;
                    size: 21cm 29.7cm; /* Ukuran A4 dalam centimeter */
                    margin: 2cm;
                    font-family: Times New Roman, sans-serif;
                }

            .line {
                text-align: center; /* Meletakkan garis bawah di tengah */
            }

            .hr {
                border: 1px solid black;
                width: 80%; 
                color: black; 
                margin: 0; /* Menghilangkan margin atas dan bawah */
                margin-bottom: -4px;
            }
            
            .hr_01 {
                border: 0px solid black;
                width: 80%; 
                margin-top: -4px;
            }

            .table {
                width: 100%;
            }

            .logo {
                max-width: 10px;
                max-height: 10px;
            }

            .bordered-table {
                border-collapse: collapse;
                border-right: 1px solid black; /* Border kanan untuk tabel */
                border-bottom: 1px solid black; /* Border bawah untuk tabel */
            }

            .bordered-table td, .bordered-table th {
                border-top: 1px solid black;
                border-left: 1px solid black;
                padding: 5px; /* Penambahan padding untuk estetika */
            }

            .bordered-table tr:last-child td, .bordered-table tr:last-child th {
                border-bottom: none; /* Menghapus border bawah untuk sel di baris terakhir, karena sudah ada pada tabel */
            }

            .bordered-table td:last-child, .bordered-table th:last-child {
                border-right: none; /* Menghapus border kanan untuk sel di kolom terakhir, karena sudah ada pada tabel */
            }

            </style>
            </head>
            <body>
            <div>
                <table class="table">
                    <tr>
                        <td rowspan="4" width="25%" style="text-align: right;"><img src="${this.logoPath}" alt="Logo" class="logo" width="110" height="120"></td>
                        <td style="font-family: 'Traditional Arabic', 'Scheherazade', 'Amiri', sans-serif; font-size: 30px; font-weight: bold; padding-left: 30px;"> معهد تحفيظ القرآن الجزري</td>
                    </tr>
                    <tr>
                        <td style="font-family: 'Times New Roman'; font-size: 16px; font-weight: bold; padding-left: 25px;">PONDOK PESANTREN QUR’AN AL-JAZARY</td>
                    </tr>
                    <tr>
                        <td style="font-family: 'Times New Roman'; font-size: 8px; font-weight: bold;">Jl. Al Hikmah, Gang Warung Nangka Kec. Bojongkerta, Bogor Selatan, Kota Bogor, Jawa Barat Kode Pos 16139 </td>
                    </tr>
                    <tr>
                        <td style="font-family: 'Times New Roman'; font-size: 8px; font-weight: bold;"></td>
                    </tr>
                    <tr>
                        <td colspan="2"><hr class="hr"></td>
                    </tr>
                </table>
                <p style="font-family: 'Times New Roman'; font-size: 16px; font-weight: bold; text-align: center;text-transform: uppercase;">LAPORAN HASIL BELAJAR SEMESTER ${ this.stateSemester.ajaran }</p>

                <table width="100%" style="font-size: 9;">
                    <tr>
                        <td width="100%" align="center">
                            <table width="90%" style="font-family: 'Times New Roman';">
                                <tr>
                                    <td width="27%">Nama Santri</td>
                                    <td width="2%">:</td>
                                    <td width="45%">${ this.stateSemester.nama_lengkap_santri }</td>
                                    <td width="27%">Semester</td>
                                    <td width="1%">:</td>
                                    <td width="45%">${ this.stateSemester.semester }</td>
                                </tr>
                                <tr>
                                    <td width="22%">Nomor Induk</td>
                                    <td>:</td>
                                    <td> ${ this.stateSemester.no_induk }</td>
                                    <td width="22%">Tahun Ajaran</td>
                                    <td>:</td>
                                    <td> ${ this.stateSemester.tahun_ajaran }</td>
                                </tr>               
                            </table>
                        </td>
                    </tr>
                </table>
                <br>
                <div style="font-weight: bold;font-size: 10pt;">I. KURIKULUM AL-QUR'AN</div>
                <div style="font-weight: bold;font-size: 10pt;">&emsp;A. TAHFIDZ</div>
                <table width="100%" class="bordered-table" >
                    <thead>
                        <tr align="center">
                            <th width="5%">No.</th>
                            <th width="35%">Aspek</th>
                            <th width="30%">Nilai</th>
                            <th width="30%">Predikat</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tbodyContent}
                    </tbody>
                </table>
                <br>
                <div style="font-weight: bold;font-size: 10pt;">&emsp;B. QIRO'AH</div>
                <table class="bordered-table" >
                    <tr align="center">
                        <th width="5%">No.</th>
                        <th width="35%">Aspek</th>
                        <th width="30%">Nilai</th>
                        <th width="30%">Predikat</th>
                    </tr>
                    ${tbodyContentII}
                </table>
                <br>
                <div style="font-weight: bold;font-size: 10pt;">II. YARIAH</div>
                <table class="bordered-table" >
                    <thead>
                    <tr align="center">
                        <th width="5%">No</th>
                        <th width="40%">Aspek</th>
                        <th width="15%">Nilai</th>
                        <th width="20%">Predikat</th>
                        <th width="20%">Deskripsi</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${tbodyContentIII}
                    </tbody>
                </table>
                <br>
                <div style="font-weight: bold;font-size: 10pt;">III. AHLAK</div>
                <table class="bordered-table">
                    <tr align="center">
                        <th width="5%">No.</th>
                        <th width="40%">Aspek</th>
                        <th width="15%">Nilai</th>
                        <th width="20%">Pedikat</th>
                        <th width="20%">Deskripsi</th>
                    </tr>
                    ${tbodyContentIV}
                </table>
                <br>
                <div style="font-weight: bold;font-size: 10pt;">IV. NASIHAT</div>
                <table class="bordered-table" >
                    <tr>
                        <td style="font-size: 12pt;text-align: left;font-family: 'Times New Roman';">
                            ${ this.stateNasihat.nasihat }
                        </td>
                    </tr>
                </table>
            </div>
            </body>
            </html>
            `;
            const word = `<html xmlns:o='urn:schemas-microsoft-com:office:office xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>${letterContent}</body></html>`;

            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(word);
            const fileDownload = document.createElement('a');
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = 'Nilai.doc'; // Nama berkas yang akan diunduh
            fileDownload.click();
            document.body.removeChild(fileDownload);
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

        filterDataByCategory(categoryName) {
            const filteredData = this.data_tahsin.filter(item => item.kategori_nama === categoryName);
            
            return filteredData;
        },

        getMasterRiwayatTahsin(idHeader){
            var SantriId = this.Santri_Id;
            var TahunId  = idHeader;
            this.$store
                .dispatch(Fetch_R_Nilai_Tahsin, { SantriId, TahunId })
                .then((res) => {
                    this.CustomMessage = res.message_opt
                    this.data_tahsin = res.data
                    this.data_tahsin_I = this.filterDataByCategory("TAHFIDZ")
                    this.data_tahsin_II = this.filterDataByCategory("QIRO’AH")
                })
                .catch((err) => err);
        },

        getMasterMapel(){
            this.master_data_mapel = this.$store.state.mMapel.master_mapel;
            this.master_data_mapel =this.master_data_mapel.filter(item => item.kategori_nama === 'QIRO’AH' || item.kategori_nama === 'TAHFIDZ');
        },

        async getDetailCache(idHeader) {
            Promise.all([
                await this.getMasterRiwayatTahsin(idHeader)
            ])
            .then(async (results) => {
                this.progressBar = false
                results
            })
        },

        createTahsin(){
            return new Promise(resolve => {
                const currentDate = new Date();
                const day = currentDate.getDate().toString().padStart(2, '0'); // Mendapatkan hari (dd)
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Mendapatkan bulan (mm)
                const year = currentDate.getFullYear().toString(); // Mendapatkan tahun (yyyy)

                const formattedDate = `${day}-${month}-${year}`;

                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "DEFAULT",
                    santri_id: this.Santri_Id,
                    tahun_id: this.idHeader,
                    mapel_id: this.add_data_tahsin.mapel_id,
                    praktek: this.add_data_tahsin.praktek,
                    tanggal_nilai: formattedDate
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
                    this.create_data_tahsin = response.data;
                    this.submitted = true;
                    this.save("add_data_tahsin");
                    this.getDetailCache(this.idHeader);
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            this.editedIndex = this.data_tahsin.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dateFormatted = item.tanggal_nilai
            this.data_item = item
            this.dialog = true
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
                        nilai_id: item.nilai_id
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
                            this.delete_data_tahsin = response.data;
                            this.submitted = true;
                            this.data_tahsin.splice(this.deletedIndex, 1);
                            this.getDetailCache(this.idHeader)
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
                this.add_data_tahsin.mapel_id = ""
                this.add_data_tahsin.uas = ""
                this.add_data_tahsin.uts= ""
                this.add_data_tahsin.tugas= ""
                this.add_data_tahsin.praktek= ""
                this.add_data_tahsin.keterangan_nilai= ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateTahsin() {
            return new Promise(resolve => {
                const currentDate = new Date();
                const day = currentDate.getDate().toString().padStart(2, '0'); // Mendapatkan hari (dd)
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Mendapatkan bulan (mm)
                const year = currentDate.getFullYear().toString(); // Mendapatkan tahun (yyyy)

                const formattedDate = `${day}-${month}-${year}`;

                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "U",
                    Route: "DEFAULT",
                    santri_id: this.Santri_Id,
                    tahun_id: this.data_item.tahun_id,
                    nilai_id: this.data_item.nilai_id,
                    mapel_id: this.editedItem.mapel_id,
                    praktek: this.editedItem.praktek,
                    tanggal_nilai: formattedDate
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
                        this.update_data_tahsin = response.data;
                        this.submitted = true;
                        this.save("edit_data_tahsin");
                        this.getDetailCache(this.idHeader);
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_data_tahsin") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.data_tahsin[this.editedIndex],
                    this.add_data_tahsin
                );
                } else {
                    this.data_tahsin.push(this.add_data_tahsin);
                }
            } else if (formInput == "edit_data_tahsin") {
                if (this.editedIndex > -1) {
                    Object.assign(this.data_tahsin[this.editedIndex], this.editedItem);
                } else {
                    this.data_tahsin.push(this.editedItem);
                }
            }
            this.close();
        },

        seenFileBill(item) {
            this.dataDetailCttn = item.keterangan_nilai
            this.dialogSeenBill = true;
        },  

        async load() {
            Promise.all([
                await this.getMasterMapel(),
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>