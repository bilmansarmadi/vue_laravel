<template>
    <div>
        <!-- <div align="center" v-if="printingInProgress">
            <v-progress-circular
                color="primary"
                indeterminate
                :size="40"
                :width="5"
            ></v-progress-circular>
            <p>{{ progressData }}%</p>
        </div> -->

        <v-data-table responsive show-empty
            :headers="headers"
            :items="khs_detail"
            :search="search"
            :loading="progressBar"
            loading-text="Loading... Please wait"
            :items-per-page="5"
            group-by="Kurikulum"
            class="elevation-1 border border-primary mb-10"
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
                    <v-btn
                    @click="generateReportAll()"
                    rounded
                    class="text-white"
                    color="#73a4ef">
                        <v-icon
                        color="white">
                            mdi-file-pdf-box
                        </v-icon>
                        Export
                    </v-btn>    
                </v-toolbar>
            </template>
        </v-data-table>

        <!-- PDF ALL Session -->
        <template>
            <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="false"
                :preview-modal="false"
                :paginate-elements-by-height="1400"
                :pdf-quality="2"
                filename="KHS"
                :manual-pagination="false"
                :html-to-pdf-options="htmlToPdfAllOptions"
                pdf-content-width="100%"
                :pdf-header="generatePdfHeader"
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
                        <p style="font-size: 12pt;font-weight: bold;text-align: center;">LAPORAN HASIL BELAJAR</p>
                        <table width="100%" style="font-size: 11pt;">
                            <tr>
                                <td width="70%">
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
                                <td width="30%">
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
                        <table class="forPdf" width="100%" style="font-size: 11pt;margin-top: 10px;" border="1" cellpadding="5" cellspacing="10">
                            <tr align="center">
                                <th width="10%">No.</th>
                                <th width="30%">Aspek</th>
                                <th width="20%">Nilai</th>
                                <th width="20%">Grade</th>
                                <th width="20%">Predikat</th>
                            </tr>
                            <tr align="center">
                            <td>1.</td> 
                            <td align="left">Kuantitas Hafalan</td> 
                            <td>60</td> 
                            <td>D</td> 
                            <td>RASIB</td> 
                            </tr>
                            <tr align="center">
                            <td>2.</td> 
                            <td align="left">Kualitas Hafalan</td> 
                            <td>55</td> 
                            <td>D</td> 
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
                        <table class="forPdf" width="100%" style="font-size: 11pt;margin-top: 10px;" border="1" cellpadding="5" cellspacing="10">
                            <tr align="center">
                                <th width="10%">No.</th>
                                <th width="30%">Aspek</th>
                                <th width="20%">Nilai</th>
                                <th width="20%">Grade</th>
                                <th width="20%">Predikat</th>
                            </tr>
                            <tr align="center">
                            <td>1.</td> 
                            <td align="left">Fashohah</td> 
                            <td>65</td> 
                            <td>C</td> 
                            <td>JAYYID</td> 
                            </tr>
                            <tr align="center">
                            <td>2.</td> 
                            <td align="left">Maqomat</td> 
                            <td>75</td> 
                            <td>C</td> 
                            <td>JAYYID</td> 
                            </tr>
                            <tr align="center">
                            <td>3.</td> 
                            <td align="left">Teori</td> 
                            <td>60</td> 
                            <td>D</td> 
                            <td>RASIB</td> 
                            </tr>
                        </table>
                        <br>
                        <div style="font-weight: bold;font-size: 12pt;">II.&emsp;&emsp;KURIKULUM DIROSAH ISLAMIYAH</div>
                        <table class="forPdf" width="100%" style="font-size: 11pt;margin-top: 10px;" border="1" cellpadding="5" cellspacing="10">
                            <tr align="center">
                                <th>No</th>
                                <th>Kode</th>
                                <th>Mata Pelajaran</th>
                                <th>Nilai</th>
                                <th>Grade</th>
                                <th>Mutu</th>
                                <th>Predikat</th>
                                <th>Deskripsi</th>
                            </tr>
                            <tr align="center">
                                <td>1</td>
                                <td>MPAQ1/3/l</td>
                                <td>Aqidatul Awam</td>
                                <td>75</td>
                                <td>C</td>
                                <td>6</td>
                                <td>JAYYID</td>
                                <td>TUNTAS</td>
                            </tr>
                            <tr align="center">
                                <th colspan="3">Jumlah Mutu</th>
                                <th colspan="5">43</th>
                            </tr>
                            <tr align="center">
                                <th colspan="3">Jumlah SKS</th>
                                <th colspan="5">21</th>
                            </tr>
                            <tr align="center">
                                <th colspan="3">Index Prestasi Semester</th>
                                <th colspan="5">2.04</th>
                            </tr>
                        </table>
                        <table class="forPdf" width="100%" style="font-size: 11pt;margin-top: 5px;" cellpadding="5" cellspacing="10">
                            <tr>
                                <th width="45%">Nilai Grade = A:4, B:3, C:2, D:1, E:0</th>
                                <th width="55%">Mutu = SKS * Nilai Grade</th>
                            </tr>
                            <tr>
                                <th colspan="2">Index Prestasi Semester = Jumlah SKS/Jumlah Mutu</th>
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
</style>


<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";
import VueHtml2pdf from "vue-html2pdf";

export default {
    name:"khs-detail",
    mounted() {
        this.Santri_Id  = this.$route.query.id;
        // this.load();
    },

    created() {
        this.$parent.$on("update-khs-detail", this.updateKhsDetail);
    },

    components: {
        VueHtml2pdf
    },

    destroyed() {
        this.$parent.$off("update-khs-detail", this.updateKhsDetail);
    },

    props: {
        idHeader: {
            type: [String, Number],
            required: false,
            default: ''
        }
    },

    data(){
        return {
            Santri_Id: "",
            khs_detail: [],
            search: '',
            progressBar: true,
            headers: [
                { 
                    text: 'Kurikulum', 
                    value: 'Kurikulum',
                    align: 'start',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Aspek/Mata Pelajaran', 
                    value: 'mapel_nama',
                    align: 'start',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Presensi', 
                    value: 'absensi',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Tugas', 
                    value: 'tugas',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'UTS', 
                    value: 'uts',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'UAS', 
                    value: 'uas',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Status', 
                    value: 'status_lulus',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                }
            ],
            htmlToPdfAllOptions: {
                margin: [1.4, 0.4, 0.4, 0.4],
                image: {
                    type: 'jpeg', 
                    quality: 0.98
                },
                html2canvas: {useCORS: true}, 
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: "portrait"
                }
            },
            // printingInProgress: false,
            progressData: 0
        }
    },

    watch: {
        // idHeader(val){
        //     this.getMasterKHS(val)
        // },

        khs_detail(){
            this.progressBar = false
        }
    },

    methods:{
        generateReportAll() {
            this.data_santri;
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
                    const imageX = 0.08;
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

                    pdf.setFontSize(8);
                    pdf.setTextColor('#000');
                    pdf.text('Jl. Sirnagalih III, Kp.Pojok RT 02/RW 01 No.88A, Cipayung Girang, Kec. Megamendung, Kabupaten Bogor, Jawa Barat 16770', (pdf.internal.pageSize.getWidth() / 2), (pdf.internal.pageSize.getHeight() * 0.09), { align: 'center' });
                    
                    pdf.setLineWidth(0.03);
                    pdf.line(9, (pdf.internal.pageSize.getHeight() * 0.10), pdf.internal.pageSize.getWidth() - 10, (pdf.internal.pageSize.getHeight() * 0.10));
                    pdf.setLineWidth(0.01);
                    pdf.line(9, (pdf.internal.pageSize.getHeight() * 0.105), pdf.internal.pageSize.getWidth() - 10, (pdf.internal.pageSize.getHeight() * 0.105));
                } 
            }).save()
        },

        generatePdfHeader() {
            return {
                content: [
                {
                    text: 'KOP SURAT',
                    alignment: 'center',
                    margin: [0, 20],
                },
                {
                    text: 'Alamat Perusahaan Anda',
                    alignment: 'center',
                    margin: [0, 5],
                },
                {
                    text: 'Nomor Telepon: 123-456-789',
                    alignment: 'center',
                    margin: [0, 5],
                },
                ],
                layout: 'noBorders',
            };
        },

        hasDownloaded(){
            // this.printingInProgress = false;
            this.progressData = 0;
        },

        getMasterKHS(idHeader){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "READ_NILAI_SEMESTER",
                    santri_id: this.Santri_Id,
                    tahun_id: idHeader
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
                        this.khs_detail = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        updateKhsDetail(idHeader) {
            this.getMasterKHS(idHeader);
        },

        // async load() {
        //     Promise.all([
        //         await this.getMasterKHS(this.idHeader)
        //     ]).then(function(results) {
        //         results;
        //     });
        // },
    }
}
</script>