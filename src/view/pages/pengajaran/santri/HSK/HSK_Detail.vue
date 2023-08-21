<template>
                <div class="card card-custom card-stretch border border-primary">
    <v-data-table responsive show-empty
        :headers="headers"
        :items="HSK_detail"
        :search="search"
        loading-text="Loading... Please wait"
        :items-per-page="5"
        group-by="Kurikulum"
        class="elevation-1 border border-primary mb-10"
        :footer-props="{
        showFirstLastPage: false,
            'items-per-page-text':'Page'
        }"
    >
        <v-progress-linear 
        v-show="progressBar"
        slot="progress"
        color="#73a4ef" 
        indeterminate>
        </v-progress-linear>
    </v-data-table>
    <div class="py-1">
        <table class="table table-borderless" style="width: 100%; display: flex; align-items: center;"> <!-- Menghapus border -->
            <tbody>
                <tr>
                    <td style="width: 50%;">
                        <!-- Tabel bagian kiri -->
                        <table style="width: 50%;">
                            <table class="table table-borderless" style="width: 800px;"> <!-- Menghapus border -->
        <tbody>
            <tr style="margin-bottom: 4px;">
                <td class="font-weight" style="padding-left: 40px;">Jumlah Kredit Kumulatif</td>
                <td class="font-weight">:</td>
                <td class="font-weight">{{ HSK_sks_semester }} SKS</td>
                <td class="font-weight" style="padding-left: 40px;">Inti (Lulus)</td>
                <td class="font-weight">:</td>
                <td class="font-weight">{{ HSK_inti_lulus }} SKS</td>
                <td class="font-weight" style="padding-left: 40px;">SKS</td>
                <td class="font-weight">:</td>
                <td class="font-weight">{{ HSK_sks }} SKS</td>
            </tr>
            <tr style="margin-bottom: 4px;">
                <td class="font-weight" style="padding-left: 40px;">Jumlah Kredit Semester</td>
                <td class="font-weight">:</td>
                <td class="font-weight">{{ HSK_semester}}</td>
                <td class="font-weight" style="padding-left: 40px;">Inti (Gagal)</td>
                <td class="font-weight">:</td>
                <td class="font-weight">{{ HSK_inti_gagal}} SKS</td>
                <td class="font-weight" style="padding-left: 40px;">SKS Lulus</td>
                <td class="font-weight">:</td>
                <td class="font-weight">{{ HSK_skslulus }} SKS</td>
            </tr>
            <tr style="margin-bottom: 4px;">
                <td class="font-weight-bold" style="padding-left: 40px;">Indek Perstasi Semester</td>
                <td class="font-weight">:</td>
                <td class="font-weight-bold">{{HSK_IKS}}</td>
                <td class="font-weight" style="padding-left: 40px;">Wajib (Lulus)</td>
                <td class="font-weight">:</td>
                <td class="font-weight">{{ HSK_wajib_lulus }} SKS</td>
                <td class="font-weight" style="padding-left: 40px;">Mata Pelajaran</td>
                <td class="font-weight">:</td>
                <td class="font-weight">{{ HSK_jumlah_mapel }}</td>
            </tr>
            <tr style="margin-bottom: 4px;" >
                <td class="font-weight" style="padding-left: 40px;">Jumlah SKS Yang Di dapat</td>
                <td class="font-weight">:</td>
                <td class="font-weight">{{ HSK_sks_semester }} SKS</td>
                <td class="font-weight" style="padding-left: 40px;">Wajib (Gagal)</td>
                <td class="font-weight">:</td>
                <td class="font-weight">{{ HSK_wajib_gagal }} SKS</td>
                <td class="font-weight-bold" style="padding-left: 40px;">IPK</td>
                <td class="font-weight">:</td>
                <td class="font-weight-bold">{{HSK_IPK}}</td>
            </tr>
            <tr style="margin-bottom: 4px;">
                <td class="font-weight" style="padding-left: 40px;"></td>
                <td class="font-weight"></td>
                <td class="font-weight"></td>
                <td class="font-weight" style="padding-left: 40px;">Khusus (Lulus)</td>
                <td class="font-weight">:</td>
                <td class="font-weight">{{HSK_khusus_lulus}} SKS</td>
            </tr>
            <tr style="margin-bottom: 4px;">
                <td class="font-weight" style="padding-left: 40px;"></td>
                <td class="font-weight"></td>
                <td class="font-weight"></td> 
                <td class="font-weight" style="padding-left: 40px;">Khusus (Gagal)</td>
                <td class="font-weight">:</td>
                <td class="font-weight">{{ HSK_khusus_gagal }} SKS</td> 
            </tr>
            <tr style="margin-bottom: 4px;">
                <td class="font-weight" style="padding-left: 40px;"></td>
                <td class="font-weight"></td>
                <td class="font-weight"></td>
            </tr>
            </tbody>
        </table>
    </table>
    </td>
            <td style="width: 50%;">
                <!-- Tabel bagian kanan -->
                <table style="width: 100%;">
                <tbody>
                    <tr v-for="item in HSK_nilai_semester" :key="item.semester" style="margin-bottom: 4px;">
                    <td class="font-weight" style="padding-left: 40 px;">{{ item.semester }}</td>
                    <td class="font-weight">:</td>
                    <td class="font-weight">{{ item.ips }}</td>
                    </tr>
                </tbody>
                </table>
            </td>
        </tr>
    </tbody>
    </table>
    </div>



</div>
</template>

<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";

export default {
    name:"HSK-detail",
    mounted() {
        this.Santri_Id  = this.$route.query.id;
        this.load();
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
            HSK_IPK: "",
            HSK_IKS: "",
            HSK_sks: "", 
            HSK_sks_semester: "", 
            HSK_skslulus: "",
            HSK_sksgagal: "",
            HSK_inti_lulus: "",
            HSK_inti_gagal: "",
            HSK_wajib_lulus: "",
            HSK_wajib_gagal: "",
            HSK_khusus_lulus: "",
            HSK_khusus_gagal: "",
            HSK_jumlah_mapel: "",
            HSK_semester: "",
            HSK_nilai: [],
            HSK_nilai_semester: [],
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
                    text: 'Nilai', 
                    value: 'nilai_akhir',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Dekripsi', 
                    value: 'status_lulus',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                }
            ]
        }
    },

    watch: {
        // idHeader(val){
        //     this.getMasterHSK(val)
        // },

        HSK_detail(){
            this.progressBar = false
        }
    },

    methods:{
        getMasterHSK(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "READ_KALKULASI",
                    santri_id: this.Santri_Id
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
                        this.HSK_detail = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        getNilai(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "READ_NILAI_IPK",
                    santri_id: this.Santri_Id
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
                        this.HSK_nilai = response.data;

                        this.HSK_nilai.forEach(item => {
                        this.HSK_IPK = item.IPK;
                        this.HSK_IKS = item.IKS;
                        this.HSK_sks = item.sks;
                        this.HSK_sks_semester = item.sks_semester;
                        this.HSK_skslulus = item.sks_lulus;
                        this.HSK_semester = item.semester;
                        this.HSK_sksgagal = item.sks_gagal;
                        this.HSK_inti_lulus = item.inti_lulus;
                        this.HSK_inti_gagal = item.inti_gagal;
                        this.HSK_wajib_lulus = item.wajib_lulus;
                        this.HSK_wajib_gagal = item.wajib_gagal;
                        this.HSK_khusus_lulus = item.khusus_lulus;
                        this.HSK_khusus_gagal = item.khusus_gagal;
                        this.HSK_jumlah_mapel = item.jumlah_mapel;
                    });
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        getSemester(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "READ_NILAI_SEMESTER",
                    santri_id: this.Santri_Id
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
                        this.HSK_nilai_semester = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        async load() {
            Promise.all([
                await this.getMasterHSK(this.idHeader),
                await this.getNilai(),
                await this.getSemester()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>