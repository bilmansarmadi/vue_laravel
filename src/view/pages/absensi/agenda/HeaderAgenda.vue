<template>
    <div>
        <div class="card cardHover mb-10">
            <div class="d-block px-3 py-3" data-toggle="collapse" style="background-color: #FFF;"
                role="button" aria-expanded="true" v-b-toggle.filter-header variant="primary">
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
            <b-collapse id="filter-header" class="mt-2">
                <b-card>
                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-autocomplete
                                v-model="formFilter.kelas_id"
                                :items="master_data_kelas"
                                item-text="nama_kelas"
                                item-value="kelas_id"
                                label="Kelas"
                                clearable
                                color="#ee8b3d"
                            ></v-autocomplete>
                        </v-col>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-autocomplete
                                v-model="formFilter.tahun_id"
                                :items="master_data_tahunAjaran"
                                item-text="tahun_ajaran"
                                item-value="tahun_ajaran"
                                label="Tahun Ajaran"
                                clearable
                                color="#ee8b3d"
                            ></v-autocomplete>
                        </v-col>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-autocomplete
                                v-model="formFilter.mapel_id"
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
                            md="6"
                        >
                            <v-select
                                v-model="formFilter.semester"
                                :items="dropdown_semester"
                                item-text="text"
                                item-value="value"
                                label="Semester"
                                clearable
                                color="#ee8b3d"
                            ></v-select>
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

        <!-- @click:row="handleRowClick" -->
        <div class="card cardHover">
            <v-data-table responsive show-empty
                :headers="headers"
                :items="dataHeader"
                :search="search"
                :loading="loading"
                loading-text="Loading... Please wait"
                :items-per-page="5"
                item-key="tahun_id"
                class="elevation-1"
                :footer-props="{
                showFirstLastPage: false,
                    'items-per-page-text':'Data Per Halaman'
                }"
            >
                <v-progress-linear 
                v-show="progressBar"
                slot="progress"
                color="#73a4ef" 
                indeterminate>
                </v-progress-linear>

                <template v-slot:item="{ item }">
                    <tr 
                        :class="{ 'bg-primary': item === clickedRow, '': item !== clickedRow }"
                        @click="handleRowClick(item)"
                    >
                        <td v-for="(header, key) in headers" :key="key">
                            {{ item[header.value] }}
                        </td>
                    </tr>
                </template>
    
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
            </v-data-table>
        </div>
    </div>
</template>

<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import localStorage from "@/core/services/store/localStorage";

export default {
    name:"laporan-header",
    props: {
        accessList: {
            required: false,
            default: () => []
        }
    },
    data(){
        return{
            formFilter: {
                kelas_id: "",
                tahun_id: "",
                semester: "",
                mapel_id: "",
            },
            clickedRow: null,
            master_data_kelas: [],
            master_data_tahunAjaran: [],
            master_data_mapel: [],
            dropdown_semester: [
                { value: 1, text: "Ganjil" },
                { value: 2, text: "Genap" },
            ],
            dataHeader: [],
            search: '',
            progressBar: true,
            headers: [
                { 
                    text: 'Kelas', 
                    value: 'nama_kelas',
                    align: 'left',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Mapel', 
                    value: 'mapel_nama',
                    align: 'left',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Tahun Ajaran', 
                    value: 'tahun_ajaran_nama',
                    align: 'left',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Semester', 
                    value: 'tipe_ajaran_nama',
                    align: 'left',
                    width: "100px",
                    sortable: false 
                }
            ],
            loading: false
        }
    },
    watch: {
        dataHeader(){
            this.progressBar = false
        }
    },
    methods: {
        getMasterKelas(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "COMBOBOX_KELAS"
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Kelas",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.master_data_kelas= response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },
        getMasterTahunAjaran(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "DEFAULT"
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
        getMasterMapel(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "COMBOBOX_MAPEL"
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Mapel",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.master_data_mapel = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },
        filterData(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "DEFAULT",
                    mapel_id: this.formFilter.mapel_id,
                    kelas_id: this.formFilter.kelas_id,
                    semester: this.formFilter.semester,
                    tahun_id: this.formFilter.tahun_id
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Users",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_user = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },
        clearFilter(){
            this.formFilter.kelas_id = ""
            this.formFilter.mapel_id = ""
            this.formFilter.semester = ""
            this.formFilter.tahun_id = ""
        },
        getDataheaderLaporan(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("kode_user"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "READ_HEADER_NILIA"
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
                        this.dataHeader = response.data;
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
                this.$emit("detail-agenda", obj);

                this.clickedRow = item;
            }
        },
        async load() {
            Promise.all([
                await this.getMasterKelas(),
                await this.getMasterTahunAjaran(),
                await this.getMasterMapel(),
                await this.getDataheaderLaporan()
            ]).then(function(results) {
                results;
            });
        },
    },
    mounted(){
        this.load();
    }
}
</script>