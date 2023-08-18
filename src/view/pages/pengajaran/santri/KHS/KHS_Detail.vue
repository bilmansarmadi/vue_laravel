<template>
    <v-data-table responsive show-empty
        :headers="headers"
        :items="khs_detail"
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
</template>

<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";

export default {
    name:"khs-detail",
    mounted() {
        this.Santri_Id  = this.$route.query.id;
        // this.load();
    },

    created() {
        this.$parent.$on("update-khs-detail", this.updateKhsDetail);
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
        //     this.getMasterKHS(val)
        // },

        khs_detail(){
            this.progressBar = false
        }
    },

    methods:{
        getMasterKHS(idHeader){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "READ_KALKULASI",
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