<template>
    <div class="container-fluid col-md-10">
        <div class="card mt-4 shadow-xs cardHover mb-5">
            <div class="d-block px-3 py-3" data-toggle="collapse" style="background-color: #FFF;"
                role="button" aria-expanded="true" v-b-toggle.collapse-2 variant="primary">
                <div class="card-toolbar">
                <div class="d-flex">
                    <v-icon
                    color="#73a4ef">
                        mdi-account-search
                    </v-icon>
                    <h6 class="font-weight-bold font-weight-black mt-2 ml-2">CARI DATA SANTRI</h6>
                </div>
                </div>
            </div>
        </div>

        <v-card>
            <v-card-actions>
                <v-row>
                    <v-col cols="12" md="6">
                        <button
                            @click="formSubmit"
                            class="btn btn-primary font-weight-bolder text-md-body-1 rounded-lg py-2 col-md-12 mt-5"
                        >
                            Cari
                        </button>
                    </v-col>
                    <v-col cols="12" md="6">
                        <button
                            type="button"
                            @click="reset"
                            class="btn btn-light-primary font-weight-bolder text-md-body-1 rounded-lg py-2 col-md-12 mt-5"
                        >
                            Reset
                        </button>
                    </v-col>
                </v-row>
            </v-card-actions>
            <v-card-text>
                <v-container>
                    <form method="post" autocomplete="off">
                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-autocomplete
                                    v-model="formInput.kelas_id"
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
                                    v-model="formInput.tahun_id"
                                    :items="master_data_tahunAjaran"
                                    item-text="tahun_ajaran"
                                    item-value="tahun_id"
                                    label="Tahun Ajaran"
                                    clearable
                                    color="#ee8b3d"
                                ></v-autocomplete>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                    v-model="formInput.semester"
                                    :items="dropdown_semester"
                                    item-text="text"
                                    item-value="value"
                                    label="Semester"
                                    clearable
                                    color="#ee8b3d"
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
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
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.kode_santri"
                                    label="Kode Santri"
                                    required
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.nama_lengkap_santri"
                                    label="Nama Lengkap"
                                    required
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.panggilan"
                                    label="Nama Panggilan"
                                    required
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.hafalan_ziyadah"
                                    label="Hapalan Ziyadah"
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.hafalan_mutqin"
                                    label="Hapalan Mutqin"
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.tempat_lahir"
                                    label="Tempat Lahir"
                                    required
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            md="6"
                            >
                            <v-menu
                                ref="menu1"
                                v-model="menu1"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="formInput.tanggal_lahir"
                                    label="Tanggal Lahir"
                                    persistent-hint
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    @blur="date = parseDate(formInput.tanggal_lahir)"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="date"
                                no-title
                                @input="menu1 = false"
                                ></v-date-picker>
                            </v-menu>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                    v-model="formInput.jenis_kelamin"
                                    :items="dropdown_jenkel"
                                    item-text="text"
                                    item-value="value"
                                    label="Jenis Kelamin"
                                    clearable
                                    color="#ee8b3d"
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.anak_ke"
                                    label="Anak Ke"
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.email"
                                    label="Email"
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.alamat"
                                    label="Alamat"
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.hp_ortu"
                                    label="Nomor HP Ortu"
                                    clearable
                                    type="number"
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.nama_ayah"
                                    label="Nama Ayah"
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                    v-model="formInput.status"
                                    :items="dropdown_status"
                                    item-text="text"
                                    item-value="value"
                                    label="Status"
                                    clearable
                                    color="#ee8b3d"
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.nama_ibu"
                                    label="Nama Ibu"
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </form>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-row>
                    <v-col cols="12" md="6">
                        <button
                            @click="formSubmit"
                            class="btn btn-primary font-weight-bolder text-md-body-1 rounded-lg py-2 col-md-12 mb-7"
                        >
                            Cari
                        </button>
                    </v-col>
                    <v-col cols="12" md="6">
                        <button
                            type="button"
                            @click="reset"
                            class="btn btn-light-primary font-weight-bolder text-md-body-1 rounded-lg py-2 col-md-12 mb-7"
                        >
                            Reset
                        </button>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { formatDate } from "@/helpers/helper.js";
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import localStorage from "@/core/services/store/localStorage";

export default {
    name: "formSearchSantri",
    data(){
        return{
            formInput: {
                kode_santri: "",
                nama_lengkap_santri: "",
                panggilan: "",
                hafalan_ziyadah: "",
                hafalan_mutqin: "",
                tempat_lahir: "",
                jenis_kelamin: "",
                anak_ke: "",
                email: "",
                alamat: "",
                hp_ortu: "",
                nama_ayah: "",
                nama_ibu: "",
                status: "",
                tanggal_lahir: "",
                kelas_id: "",
                tahun_id: "",
                semester: "",
                mapel_id: ""
            },
            dropdown_jenkel: [
                { value: 'L', text: "Laki-laki" },
                { value: 'P', text: "Perempuan" },
            ],
            dropdown_status: [
                { value: 0, text: "Tidak Aktif" },
                { value: 1, text: "Aktif" },
            ],
            dropdown_semester: [
                { value: 1, text: "Ganjil" },
                { value: 2, text: "Genap" },
            ],
            menu1: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            master_data_kelas: [],
            master_data_tahunAjaran: [],
            master_data_mapel: [],
        }
    },
    mounted(){
        this.load();
    },
    methods: {
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },

        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },

        formSubmit(){
            this.$router.push(
            {
                name: `resultsantri`,
                params: {data: this.formInput} 
            });
        },
        reset(){
            this.formInput.kode_santri = ""
            this.formInput.nama_lengkap_santri = ""
            this.formInput.panggilan = ""
            this.formInput.hafalan_ziyadah = ""
            this.formInput.hafalan_mutqin = ""
            this.formInput.tempat_lahir = ""
            this.formInput.jenis_kelamin = ""
            this.formInput.anak_ke = ""
            this.formInput.email = ""
            this.formInput.alamat = ""
            this.formInput.hp_ortu = ""
            this.formInput.nama_ayah = ""
            this.formInput.nama_ibu = ""
            this.formInput.status = ""
            this.formInput.kelas_id = ""
            this.formInput.tahun_id = ""
            this.formInput.semester = ""
            this.formInput.mapel_id = ""
        },
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
                    Route: "COMBOBOX_TAHUN_AJARAN"
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
        async load() {
            Promise.all([
                await this.getMasterKelas(),
                await this.getMasterTahunAjaran(),
                await this.getMasterMapel(),
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>