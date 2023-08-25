<template>
    <v-data-table responsive show-empty
        :headers="headers"
        :items="data_ips"
        :search="search"
        :loading="progressBar"
        loading-text="Loading... Please wait"
        :items-per-page="5"
        class="elevation-1 border border-primary card card-custom card-stretch border border-primary"
        :footer-props="{
        showFirstLastPage: false,
            'items-per-page-text':'Page'
        }"
    >
    </v-data-table>
</template>

<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";
import { formatDate } from "@/helpers/helper.js";

export default {
    name: "khs-ips",
    mounted() {
        this.Santri_Id  = this.$route.query.id;
    },

    created() {
        this.$parent.$on("update-khs-ips", this.updateKhsips);
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
            data_ips: [],
            search: '',
            progressBar: true,
            headers: [
                { 
                    text: 'IPS', 
                    value: 'ips',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'SKS', 
                    value: 'sks',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                }
            ]
        }
    },

    watch: {
        data_ips(){
            this.progressBar = false
        },
    },

    methods:{
        updateKhsips(idHeader) {
            this.getMasterRiwayatNilai(idHeader);
        },

        getMasterRiwayatNilai(idHeader){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "READ_NILAI_IPS",
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
                        this.data_ips = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },
    }
}
</script>
