<template>
    <div>
        <div v-show="accessList.R">
            <div class="card mt-4 shadow-xs cardHover mb-10">
                <div class="d-block px-3 py-3" data-toggle="collapse" style="background-color: #FFF;"
                    role="button" aria-expanded="true" v-b-toggle.collapse-2 variant="primary">
                    <div class="card-toolbar">
                    <div class="d-flex">
                        <v-icon
                        color="#73a4ef">
                            mdi-filter
                        </v-icon>
                        <h6 class="font-weight-bold font-weight-black mt-2">FILTER</h6>
                        <v-icon
                            class="ml-auto"
                            color="#73a4ef">
                            mdi-arrow-down-drop-circle-outline
                        </v-icon>
                    </div>
                    </div>
                </div>
                <b-collapse visible  id="collapse-2" class="mt-2">
                    <b-card>
                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-autocomplete
                                    v-model="formFilter.tahun_id"
                                    :items="master_data_tahunAjaran"
                                    item-text="tahun_ajaran_nama"
                                    item-value="tahun_id"
                                    label="Tahun Ajaran"
                                    clearable
                                    color="#ee8b3d"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
    
                        <v-btn 
                            class="accent-4 mr-2"
                            color="#73a4ef"
                            dark
                            rounded
                            @click="filterData()"
                        >
                            Cari
                        </v-btn>
                        <v-btn 
                            dark
                            rounded
                            color="red"
                            @click="clearFilter"
                        >
                            Reset
                        </v-btn>
                    </b-card>
                </b-collapse>
            </div>
    
            <div v-show="showDetail">
                <table-detail
                class="without-min-height" 
                v-bind:idHeader="idHeader"
                ></table-detail>
            </div>
            <div v-show="showDetail">
                <table-nasihat
                class="without-min-height" 
                v-bind:idHeader="idHeader"
                ></table-nasihat>
            </div>
        </div>

        <div v-show="accessList.R == 0">
            <div class="d-flex justify-content-center">
                <img src="media/bg/access.png" alt="Jadwal Kelas Icon" width="35%">
            </div>
        </div>
    </div> 
</template>

<script>
import TableDetail from "@/view/pages/pengajaran/santri/KHS/KHS_Detail";
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import localStorage from "@/core/services/store/localStorage";
import TableNasihat from "@/view/pages/pengajaran/santri/KHS/KHS_Nasihat";

export default {
    components: {
        TableDetail,
        TableNasihat
    },
    mounted() {
        this.Santri_Id  = this.$route.query.id;
        this.load();
    },
    data(){
        return{
            idHeader: '',
            showDetail: false,
            isDataReload: true,
            formFilter: {
                tahun_id: ""
            },
            master_data_tahunAjaran: [],
            getData: "",
            Santri_Id: ""
        }
    },
    props: {
        accessList: {
            required: false,
            default: () => []
        }
    },
    methods: {
        getDataRow(item){
            if(item){
                this.idHeader = item.tahun_id
                this.showDetail = true
            }else{
                this.showDetail = false
            }
        },

        getMasterTahunAjaran(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "DEFAULT",
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
                        this.master_data_tahunAjaran = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        hideDetail(item){
            if(item)
            this.showDetail = false
        },

        clearFilter(){
            this.formFilter.tahun_id = ""
            this.showDetail = false
        },

        filterData(){
            this.getData = this.formFilter.tahun_id;
            if(this.getData){
                this.idHeader = this.getData
                this.showDetail = true
            }else{
                this.showDetail = false
            }
        },

        async load() {
            Promise.all([
                await this.getMasterTahunAjaran()
            ]).then(function(results) {
                results;
            });
        }
    }
}
</script>