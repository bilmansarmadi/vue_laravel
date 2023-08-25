<template>
    <div>
        <div align="center" v-if="printingInProgress">
            <v-progress-circular
                color="primary"
                indeterminate
                :size="40"
                :width="5"
            ></v-progress-circular>
            <p>{{ progressData }}%</p>
        </div>

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
                <div>
                    <vue-html2pdf
                        :show-layout="false"
                        :float-layout="true"
                        :enable-download="true"
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
                    <pdf-content slot="pdf-content" >
                        <pdf-header slot="pdf-header">
                            <div class="pdf-header-content">
                                <img src="media/logos/LogoAlJazary.png" alt="Logo" class="logo" />
                            </div>
                        </pdf-header>
                        <div class="html2pdf__page-break"/>
                        <h1>Makan</h1>
                        <div class="html2pdf__page-break"/>
                    </pdf-content>
                    </vue-html2pdf>
                </div>
            </template>
            <!-- END PDF ALL Session -->
    </div>
</template>

<style>
.pdf-header-content {
  display: flex;
  align-items: center;
  padding: 10px;
}

.logo {
  width: 100px;
  height: 100px;
}

.header-text {
  font-size: 16pt;
  font-weight: bold;
  color: #be6f30;
  margin-left: 10px;
}</style>

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

    // destroyed() {
    //     this.$parent.$off("update-khs-detail", this.updateKhsDetail);
    // },

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
                margin: 0.4,
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
            printingInProgress: false,
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
            this.printingInProgress = true;

            await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
                const totalPages = pdf.internal.getNumberOfPages()
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i)
                    pdf.setFontSize(10)
                    pdf.setTextColor(150)
                    pdf.text(i + ' ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
                    
                    pdf.setPage(i);
                    pdf.setFontSize(16);
                    pdf.setTextColor('#be6f30');
                    pdf.setFont('ArabicFont', 'bold'); // Menggunakan font Arab bold yang sudah ditambahkan
                    pdf.text('معهد اجلزري', (pdf.internal.pageSize.getWidth() / 2), (pdf.internal.pageSize.getHeight() * 0.04), { align: 'center' });
                    pdf.text('PONDOK PESANTREN AL-JAZARY', (pdf.internal.pageSize.getWidth() / 2), (pdf.internal.pageSize.getHeight() * 0.07), { align: 'center' });

                    pdf.setFontSize(8);
                    pdf.setTextColor('#000');
                    pdf.text('Jl. Sirnagalih III, Kp.Pojok RT 02/RW 01 No.88A, Cipayung Girang, Kec. Megamendung, Kabupaten Bogor, Jawa Barat 16770', (pdf.internal.pageSize.getWidth() / 2), (pdf.internal.pageSize.getHeight() * 0.09), { align: 'center' });

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
            this.printingInProgress = false;
            this.progressData = 0;
        },

        getMasterKHS(idHeader){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "READ_NILAI SEMESTER",
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