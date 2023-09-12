<template>
    <div>
        <div class="d-flex justify-content-end mt-5 mb-5">
            <v-btn
            @click="openModalExport()"
            rounded
            class="text-white"
            color="#ee8b3d">
                <v-icon
                color="white">
                    mdi-file-pdf-box
                </v-icon>
                Export
            </v-btn>  
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
                    v-show="accessList.C"
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
                        v-show="accessList.U"
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
                        v-show="accessList.D"
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
            <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="false"
                :preview-modal="false"
                :paginate-elements-by-height="1400"
                :pdf-quality="3"
                filename="KHS"
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
                    <div style="font-family: 'Times New Roman', Times, serif;color: black;" class="mt-39 mr-15 ml-15 mb-15">
                        <p style="font-size: 12pt;font-weight: bold;text-align: center;margin-top: 20px;">LAPORAN HASIL BELAJAR SEMESTER GENAP</p>
                        <table width="100%" style="font-size: 11pt;">
                            <tr>
                                <td width="65%">
                                    <table width="100%">
                                        <tr>
                                            <td width="25%">Nama Santri</td>
                                            <td width="5%">:</td>
                                            <td width="70">RAVANNO KHALIFAH AKBAR ALFARIZI</td>
                                        </tr>
                                        <tr>
                                            <td>Nomor Induk</td>
                                            <td>:</td>
                                            <td>AZ1020</td>
                                        </tr>                                
                                    </table>
                                </td>
                                <td width="35%">
                                    <table width="100%">
                                        <tr>
                                            <td width="50%">Semester</td>
                                            <td width="5%">:</td>
                                            <td width="45">1 (SATU)</td>
                                        </tr>
                                        <tr>
                                            <td>Tahun Ajaran</td>
                                            <td>:</td>
                                            <td>2021/2022</td>
                                        </tr>                                
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <br>

                        <div style="font-weight: bold;font-size: 12pt;">I.&emsp;&emsp;KURIKULUM AL-QUR'AN</div>
                        <div style="font-weight: bold;font-size: 12pt;">&emsp;&emsp;&emsp;&emsp;A.&emsp;&emsp;TAHFIDZ</div>
                        <table class="forPdf" width="100%" style="font-size: 11pt;margin-top: 10px;border-color: black;" border="1" >
                            <tr align="center">
                                <th width="5%">No.</th>
                                <th width="35%">Aspek</th>
                                <th width="30%">Nilai</th>
                                <th width="30%">Predikat</th>
                            </tr>
                            <tr align="center">
                            <td>1.</td> 
                            <td align="left">Kuantitas Hafalan</td> 
                            <td>60</td> 
                            <td>RASIB</td> 
                            </tr>
                            <tr align="center">
                            <td>2.</td> 
                            <td align="left">Kualitas Hafalan</td> 
                            <td>55</td> 
                            <td>RASIB</td> 
                            </tr>
                            <tr align="center">
                                <td>3.</td>
                                <td align="left">Total Hafalan Mutqin</td>
                                <td colspan="3" style="font-weight: bold;">1/2 Juz (Juz 30)</td>
                            </tr>
                        </table>
                        <br>
                        <div style="font-weight: bold;font-size: 12pt;">&emsp;&emsp;&emsp;&emsp;B.&emsp;&emsp;QIRO'AH</div>
                        <table class="forPdf" width="100%" style="font-size: 11pt;margin-top: 10px;border-color: black;" border="1" >
                            <tr align="center">
                                <th width="5%">No.</th>
                                <th width="35%">Aspek</th>
                                <th width="30%">Nilai</th>
                                <th width="30%">Predikat</th>
                            </tr>
                            <tr align="center">
                            <td>1.</td> 
                            <td align="left">Fashohah</td> 
                            <td>65</td> 
                            <td>JAYYID</td> 
                            </tr>
                            <tr align="center">
                            <td>2.</td> 
                            <td align="left">Maqomat</td> 
                            <td>75</td> 
                            <td>JAYYID</td> 
                            </tr>
                            <tr align="center">
                            <td>3.</td> 
                            <td align="left">Teori</td> 
                            <td>60</td> 
                            <td>RASIB</td> 
                            </tr>
                        </table>
                        <br>

                        <div style="font-weight: bold;font-size: 12pt;">II.&emsp;&emsp;SYARIAH</div>
                        <table class="forPdf" width="100%" style="font-size: 11pt;margin-top: 10px;border-color: black;" border="1" >
                            <tr align="center">
                                <th width="5%">No</th>
                                <th width="40%">Aspek</th>
                                <th width="15%">Nilai</th>
                                <th width="20%">Predikat</th>
                                <th width="20%">Deskripsi</th>
                            </tr>
                            <tr align="center">
                                <td>1</td>
                                <td align="left">Akhlaq kepada Ustadz/Ustadzah</td>
                                <td>75</td>
                                <td>JAYYID</td>
                                <td>TUNTAS</td>
                            </tr>
                            <tr align="center">
                                <td>2</td>
                                <td align="left">MPAK1/3/l</td>
                                <td>48</td>
                                <td>JAYYID JIDDAN</td>
                                <td>TIDAK TUNTAS</td>
                            </tr>
                        </table>

                        <div class="html2pdf__page-break"/>

                        <div style="font-weight: bold;font-size: 12pt;" class="mt-39">III.&emsp;&emsp;AKHLAK</div>
                        <table class="forPdf" width="100%" style="font-size: 11pt;margin-top: 10px;border-color: black;" border="1" >
                            <tr align="center">
                                <th width="5%">No.</th>
                                <th width="40%">Aspek</th>
                                <th width="15%">Nilai</th>
                                <th width="20%">Pedikat</th>
                                <th width="20%">Deskripsi</th>
                            </tr>
                            <tr align="center">
                                <td>1.</td> 
                                <td align="left">Akhlaq kepada Ustadz/Ustadzah</td> 
                                <td>86</td> 
                                <td>JAYYID JIDDAN</td> 
                                <td>TUNTAS</td> 
                            </tr>
                            <tr align="center">
                                <td>2.</td> 
                                <td align="left">Akhlaq kepada Pegawai/Tamu</td> 
                                <td>85</td> 
                                <td>JAYYID JIDDAN</td> 
                                <td>TUNTAS</td> 
                            </tr>
                        </table>
                        <br>
                        <div style="font-weight: bold;font-size: 12pt;">III.&emsp;&emsp;NASIHAT</div>
                        <table class="forPdfNasihat" width="100%" style="font-size: 11pt;margin-top: 10px;border-color: black;" border="1" >
                            <tr>
                                <td class="text-justify p-7">
                                    Ananda sudah mengikuti program dengan baik, namun masih perlu perbaikan untuk Kelancaran dan 
                                    kefasihan baca’annya, untuk materi Syari’ahnya masih ada yang belum tuntas, harus lebih giat lagi 
                                    belajarnya agar nilainya lebih maksimal. Lebih semangat lagi belajar dan menghafal Al-Qur’annya.
                                </td>
                            </tr>
                        </table>
                        <table width="100%" style="font-size: 11pt;margin-top: 40px;text-align: center;">
                            <tr>
                                <td>Mengetahui</td>
                                <td>Mudir</td>
                                <td>Bogor</td>
                            </tr>
                            <tr>
                                <td>Orang Tua/Wali</td>
                                <td>Pondok Pesantren Al-Jazary</td>
                                <td>Murobbi</td>
                            </tr>
                            <tr>
                                <td colspan="3" height="80px"></td>
                            </tr>
                            <tr>
                                <td>(.................................)</td>
                                <td>Ustadz Muhammad Agung Alhaz, S.Kom </td>
                                <td>Ustadz Khaerul Anam, S.Kom</td>
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
import { Fetch_R_Nilai_Tahsin } from "@/core/services/store/rhSantri.module";

export default {
    mounted() {
        this.Santri_Id  = this.$route.query.id;
        this.load();
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
        accessList: {
            required: false,
            default: () => []
        }
    },

    data(){
        return {
            Santri_Id: "",
            data_tahsin: [],
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
                margin: {
                    top: 15,    // Margin atas
                    right: 15,  // Margin kanan
                    bottom: 15, // Margin bawah
                    left: 15    // Margin kiri
                },
                image: {
                    type: 'jpeg', 
                    quality: 1
                },
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
            // printingInProgress: false,
            progressData: 0,
            dialogCetak: false,
            formExport: {
                judul: "",
                sub_judul: ""
            },
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
            this.dialogCetak = true;
            this.formExport.judul = "Judul";
            this.formExport.sub_judul = "Sub Judul";
        },

        closeModalExport(){
            this.dialogCetak = false
        },

        generateReportAll() {
            this.dialogCetak = false;
            this.$refs.html2PdfAll.generatePdf();
        },

        onProgress(data) {
            this.progressData = data;
        },

        async beforeDownload ({ html2pdf, options, pdfContent }) {
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
                    // pdf.setFontSize(10)
                    // pdf.setTextColor(150)
                    // pdf.text(i + ' ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
                    
                    // pdf.setPage(i);
                    // pdf.setFontSize(17);
                    // pdf.setTextColor('#be6f30');
                    // pdf.text('معهد اجلزري', (pdf.internal.pageSize.getWidth() / 2), (pdf.internal.pageSize.getHeight() * 0.04), { align: 'center' });
                    // pdf.text('PONDOK PESANTREN AL-JAZARY', (pdf.internal.pageSize.getWidth() / 2), (pdf.internal.pageSize.getHeight() * 0.07), { align: 'center' });

                    pdf.setFontSize(7);
                    pdf.setTextColor('#000');
                    pdf.text('Jl. Raya Cipari Batulayang RT 01/RW 04, Kec. Cisarua, Kabupaten Bogor, Jawa Barat 16750', (pdf.internal.pageSize.getWidth() / 2), (pdf.internal.pageSize.getHeight() * 0.09), { align: 'center' });
                    
                    pdf.setLineWidth(0.03);
                    pdf.line(9, (pdf.internal.pageSize.getHeight() * 0.10), pdf.internal.pageSize.getWidth() - 10, (pdf.internal.pageSize.getHeight() * 0.10));
                    pdf.setLineWidth(0.01);
                    pdf.line(9, (pdf.internal.pageSize.getHeight() * 0.105), pdf.internal.pageSize.getWidth() - 10, (pdf.internal.pageSize.getHeight() * 0.105));
                } 
            }).save()
        },

        hasDownloaded(){
            // this.printingInProgress = false;
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

        getMasterRiwayatTahsin(idHeader){
            var SantriId = this.Santri_Id;
            var TahunId  = idHeader;
            this.$store
                .dispatch(Fetch_R_Nilai_Tahsin, { SantriId, TahunId })
                .then((res) => {
                    this.CustomMessage = res.message_opt
                    this.data_tahsin = res.data
                })
                .catch((err) => err);
        },

        getMasterMapel(){
            this.master_data_mapel = this.$store.state.mMapel.master_mapel;
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
                await this.getMasterMapel()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>