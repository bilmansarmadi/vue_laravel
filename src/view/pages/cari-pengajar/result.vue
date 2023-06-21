<template>
    <div>
        <div class="card mt-4 shadow-xs cardHover mb-5">
            <div class="d-block px-3 py-3" data-toggle="collapse" style="background-color: #FFF;"
                role="button" aria-expanded="true" v-b-toggle.collapse-2 variant="primary">
                <div class="card-toolbar">
                <div class="d-flex">
                    <v-icon
                    color="#73a4ef">
                        mdi-account-group-outline
                    </v-icon>
                    <h6 class="font-weight-bold font-weight-black mt-2 ml-2">HASIL PENCARIAN DATA PENGAJAR</h6>
                </div>
                </div>
            </div>
        </div>

        <div class="card cardHover">
            <v-data-table responsive show-empty
                :headers="headers"
                :items="data_pengajar"
                :search="search"
                loading-text="Loading... Please wait"
                :items-per-page="10"
                item-key="santri_id"
                class="elevation-1"
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
                    color="purple"
                    single-line
                    hide-details
                    ></v-text-field>
                    <v-spacer></v-spacer>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                class="mr-2"
                                dark
                                rounded
                                color="#73a4ef"
                                v-bind="attrs"
                                v-on="on"
                                >
                                <v-icon
                                    class="mr-1"
                                >
                                    mdi-file-pdf-outline
                                </v-icon>
                                <span class="hideText">Cetak</span>
                            </v-btn>
                        </template>
                    <span>Cetak Data</span>
                    </v-tooltip>
                </v-toolbar>
                </template>
            <template v-slot:[`item.foto`]="{ item }">
                <img :src="item.foto" class="rounded" alt="Foto" style="max-width: 100px;" v-show="item.foto.length > 40"/>
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
    name: "resultpengajar",
    props:['data'],
    data(){
        return{
            searchForm: "",
            search: '',
            data_pengajar: [],
            headers: [
                { 
                    text: 'NIP', 
                    value: 'nip',
                    align: 'start',
                    width: "110px",
                    sortable: false 
                },
                { 
                    text: 'Nama Lengkap', 
                    value: 'nama_lengkap',
                    align: 'start',
                    width: "180px",
                    sortable: false 
                },
                { 
                    text: 'Nama Panggilan', 
                    value: 'panggilan',
                    align: 'start',
                    width: "140px",
                    sortable: false 
                },
                { 
                    text: 'Foto', 
                    value: 'foto',
                    align: 'center',
                    width: "250px",
                    sortable: false 
                },
                { 
                    text: 'Hapalan Mutqin', 
                    value: 'hafalan_mutqin',
                    align: 'start',
                    width: "140px",
                    sortable: false 
                },
                { 
                    text: 'Tempat Lahir', 
                    value: 'tempat_lahir',
                    align: 'start',
                    width: "140px",
                    sortable: false 
                },
                { 
                    text: 'Tanggal Lahir', 
                    value: 'tanggal_lahir',
                    align: 'start',
                    width: "120px",
                    sortable: false 
                },
                { 
                    text: 'Jenis Kelamin', 
                    value: 'jenis_kelamin_nama',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Status Nikah', 
                    value: 'status_nikah_nama',
                    align: 'start',
                    width: "120px",
                    sortable: false 
                },
                { 
                    text: 'Berat Badan', 
                    value: 'berat_badan',
                    align: 'start',
                    width: "110px",
                    sortable: false 
                },
                { 
                    text: 'Tinggi Badan', 
                    value: 'tinggi_badan',
                    align: 'start',
                    width: "120px",
                    sortable: false 
                },
                { 
                    text: 'Email', 
                    value: 'email',
                    align: 'start',
                    width: "120px",
                    sortable: false 
                },
                { 
                    text: 'Alamat', 
                    value: 'alamat',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Status', 
                    value: 'status',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                }
            ],
        }
    },
    mounted(){
        this.searchForm = this.data;
        this.load();
    },
    methods: {
        getMasterDataPengajar(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "Read_Pengajar",
                    nip: this.searchForm.nip,
                    nama_lengkap: this.searchForm.nama_lengkap,
                    panggilan: this.searchForm.panggilan,
                    hafalan_mutqin: this.searchForm.hafalan_mutqin,
                    tempat_lahir: this.searchForm.tempat_lahir,
                    tanggal_lahir: this.searchForm.tanggal_lahir,
                    jenis_kelamin: this.searchForm.jenis_kelamin,
                    status_nikah: this.searchForm.status_nikah,
                    email: this.searchForm.email,
                    alamat: this.searchForm.alamat,
                    status: this.searchForm.status
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Pengajar",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_pengajar = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        async load() {
            Promise.all([
                await this.getMasterDataPengajar()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>