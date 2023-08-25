<template>
    <div class="container-fluid col-md-8">
        <div class="card cardHover">
            <v-data-table responsive show-empty
                :headers="headers"
                :items="tahun_ajaran"
                :search="search"
                :loading="progressBar"
                loading-text="Loading... Please wait"
                :items-per-page="5"
                item-key="tahun_id"
                class="elevation-1"
                :footer-props="{
                showFirstLastPage: false,
                    'items-per-page-text':'Data Per Halaman'
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
                </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn
                        rounded color="#73a4ef"
                        small
                        @click="handleRowClick(item)"
                    >
                        <span class="text-white">Detail Nilai</span>
                    </v-btn>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import localStorage from "@/core/services/store/localStorage";

export default {
    name:"master-tahun-ajaran",
    mounted() {
        this.Santri_Id  = this.$route.query.id;
        this.load();
    },
    props: {
      accessList: {
        type: Array,
        required: false,
        default: () => []
      },
    },

    data(){
        return {
            Santri_Id: "",
            isFirstLoad : true,
            tahun_ajaran: [],
            search: '',
            progressBar: true,
            headers: [
                { 
                    text: 'Tahun Ajaran', 
                    value: 'tahun_ajaran_nama',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Aksi', 
                    value: 'actions', 
                    align: 'center',
                    width: "150px",
                    sortable: false 
                },
            ],
            loading: false
        }
    },

    watch: {
        tahun_ajaran(){
            this.progressBar = false
        }
    },

    computed: {
    },

    methods:{
        getMasterTahunAjaran(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "COMBOBOX_TAHUN_AJARAN",
                    santri_id: this.Santri_Id
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/TahunAjaran",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.tahun_ajaran = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        handleRowClick(item) {
            if(item){
                var obj = Object.assign({}, item)
                this.$emit('data_row', obj);
            }
        },

        async load() {
            Promise.all([
                await this.getMasterTahunAjaran(),
            ]).then(function(results) {
                this.isFirstLoad = false
                results;
            });
        },
    }
}
</script>