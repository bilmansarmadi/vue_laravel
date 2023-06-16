<template>
    <div>
        <div class="card mt-4 shadow-xs cardHover mb-5">
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
            <b-collapse id="collapse-2" class="mt-2">
                <b-card>
                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-model="formFilter.kode_santri"
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
                                v-model="formFilter.nama_lengkap_santri"
                                label="Nama"
                                required
                                clearable
                                color="#ee8b3d"
                            ></v-text-field>
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
                    </v-row>

                    <v-btn 
                        class="accent-4 mr-2"
                        color="#73a4ef"
                        dark
                        rounded
                        @click="filterData"
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
        
        <div class="card cardHover">
            <v-data-table responsive show-empty
                :headers="headers"
                :items="data_santri"
                :search="search"
                loading-text="Loading... Please wait"
                :items-per-page="5"
                item-key="santri_id"
                class="elevation-1"
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
                    <v-dialog
                        v-model="dialog"
                        max-width="800px"
                        persistent
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="#73a4ef"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        rounded
                        >
                        <i class="flaticon-add-circular-button mr-1 text-white"></i>
                            <span class="hideText">Tambah Data</span> 
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="border">
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>
            
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col
                                        cols="12"
                                        md="6"
                                    >
                                        <v-text-field
                                            v-model="formInput.kode_santri"
                                            label="Kode Santri"
                                            :rules="rulesNotNull"
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
                                            :rules="rulesNotNull"
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
                                            :rules="rulesNotNull"
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
                                            :rules="rulesNotNull"
                                            required
                                            clearable
                                            color="#ee8b3d"
                                        ></v-text-field>
                                    </v-col>
                                    <!-- <v-col
                                    cols="12"
                                    md="6"
                                    >
                                        <v-menu
                                            v-model="addDate"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="formInput.tanggal_lahir"
                                                label="Tanggal Lahir"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                clearable
                                                :rules="rulesNotNull"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker
                                            v-model="formInput.tanggal_lahir"
                                            color="#ee8b3d"
                                            @input="addDate = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col> -->
                                    <v-col
                                    cols="12"
                                    lg="6"
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
                                            v-model="dateFormatted"
                                            label="Tanggal Lahir"
                                            persistent-hint
                                            prepend-icon="mdi-calendar"
                                            v-bind="attrs"
                                            @blur="date = parseDate(dateFormatted)"
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
                                            v-model="formInput.berat_badan"
                                            label="Berat Badan"
                                            :rules="rulesNotNull"
                                            required
                                            clearable
                                            color="#ee8b3d"
                                            type="number"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="6"
                                    >
                                        <v-text-field
                                            v-model="formInput.tinggi_badan"
                                            label="Tinggi Badan"
                                            :rules="rulesNotNull"
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
                                            v-model="formInput.email"
                                            label="Email"
                                            :rules="rulesNotNull"
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
                                            :rules="rulesNotNull"
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
                                            :rules="rulesNotNull"
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
                                            :rules="rulesNotNull"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="6"
                                    >
                                    <h6>Foto</h6>
                                        <div class="input_images">
                                            <div class="file_upload">
                                                <i class="far fa-images text-primary"></i>
                                                <input type="file" name="file" id="file" @change="onImageChange" ref="file"
                                                accept="image/*"/>
                                            </div>
                                        </div>
                                        <div class="ma-2">
                                            <div v-show="img.length > 0">
                                                <span class="text-lg-body-1 font-weight-bold">Baru</span>
                                                <v-img
                                                    :src="img"
                                                    width="300px"
                                                ></v-img>
                                            </div>
                                            <div v-show="editedItem.foto != null">
                                                <span class="text-lg-body-1 font-weight-bold">Lama</span>
                                                <v-img
                                                v-bind:src="editedItem.foto"
                                                width="300px"
                                                ></v-img>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
            
                        <v-card-actions>
                        <button
                            :disabled='isDisabledSimpan'
                            @click="formSubmit"
                            class="btn btn-primary btn-sm font-weight-bolder text-md-body-1 rounded-lg py-2 mb-3 mr-3 w-100px"
                        >
                            Simpan
                        </button>
                        <button
                            type="button"
                            @click="close"
                            class="btn btn-light-primary btn-sm font-weight-bolder text-md-body-1 rounded-lg py-2 mb-3 w-100px"
                        >
                            Batal
                        </button>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogSeenBill" max-width="800px">
                        <v-card>
                        <v-card-title class="border">
                            <span class="text-h5">Detail Foto</span>
                        </v-card-title>
    
                        <v-card-text>
                            <v-container>
                                <img :src="tabelFoto" alt="Foto" style="max-width: 700px;" />
                            </v-container>
                        </v-card-text>
    
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="mb-3 text-xl-subtitle-1" color="#73a4ef" text @click="dialogSeenBill = false">
                            Tutup
                            </v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
                </template>
    
                <template v-slot:[`item.actions`]="{ item }">
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                class="mr-2"
                                fab
                                dark
                                x-small
                                color="#73a4ef"
                                v-bind="attrs"
                                v-on="on"
                                @click="editItem(item)"
                                >
                                <i class="flaticon2-pen text-white"></i>
                            </v-btn>
                        </template>
                    <span>Ubah Data</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                fab
                                dark
                                x-small
                                color="red"
                                v-bind="attrs"
                                v-on="on"
                                @click="deleteItem(item)"
                                >
                                <v-icon dark>
                                mdi-delete
                                </v-icon>
                            </v-btn>
                        </template>
                    <span>Hapus Data</span>
                    </v-tooltip>
                </template>
                <template v-slot:[`item.foto`]="{ item }">
                    <img :src="item.foto" class="rounded" alt="Foto" style="max-width: 100px;" v-show="item.foto.length > 40"/>
                    <v-btn
                        color="#73a4ef"
                        light
                        small
                        class="ml-3"
                        @click="seenFileBill(item)"
                        data-toggle="tooltip"
                        title="Lihat Foto"
                        v-show="item.foto.length > 40"
                        style="text-transform: capitalize !important; min-width: 0px; padding: 0 6px;"
                    >
                    <v-icon small color="white">
                        mdi-eye
                    </v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";
import { formatDate } from "@/helpers/helper.js";

export default {
    name:"master-data-santri",
    mounted() {
        this.load();
    },

    data(){
        return {
            data_santri: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_data_santri: [],
            update_data_santri: [],
            delete_data_santri: [],
            add_data_santri: {
                kode_santri: "",
                nama_lengkap_santri: "",
                panggilan: "",
                hafalan_ziyadah: "",
                hafalan_mutqin: "",
                tempat_lahir: "",
                // tanggal_lahir: "",
                jenis_kelamin: "",
                anak_ke: "",
                berat_badan: "",
                tinggi_badan: "",
                email: "",
                alamat: "",
                hp_ortu: "",
                nama_ayah: "",
                nama_ibu: "",
                status: "",
            },
            formFilter: {
                kode_santri: "",
                nama_lengkap_santri: "",
                jenis_kelamin: "",
                status: ""
            },
            headers: [
                { 
                    text: 'Kode Santri', 
                    value: 'kode_santri',
                    align: 'start',
                    width: "110px",
                    sortable: false 
                },
                { 
                    text: 'Nama Lengkap', 
                    value: 'nama_lengkap_santri',
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
                    text: 'Hafalan Ziyadah', 
                    value: 'hafalan_ziyadah',
                    align: 'start',
                    width: "140px",
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
                    value: 'jenis_kelamin',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Anak Ke', 
                    value: 'anak_ke',
                    align: 'start',
                    width: "150px",
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
                    text: 'No HP Ortu', 
                    value: 'hp_ortu',
                    align: 'start',
                    width: "120px",
                    sortable: false 
                },
                { 
                    text: 'Nama Ayah', 
                    value: 'nama_ayah',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Nama Ibu', 
                    value: 'nama_ibu',
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
                },
                { 
                    text: 'Aksi', 
                    value: 'actions', 
                    align: 'center',
                    width: "150px",
                    sortable: false 
                },
            ],
            dropdown_jenkel: [
                { value: 'L', text: "Laki-laki" },
                { value: 'P', text: "Perempuan" },
            ],
            dropdown_status: [
                { value: 0, text: "Tidak Aktif" },
                { value: 1, text: "Aktif" },
            ],
            rulesNotNull: [
                value => !!value || 'Tidak boleh kosong.',
            ],
            // addDate: false,
            dialogSeenBill: false,
            tabelFoto: "",
            images: "",
            img: "",
            menu1: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateFormatted: formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        },

        data_santri(){
            this.progressBar = false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_data_santri : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createDataSantri
                : this.updateDataSantri;
        },
        isDisabledSimpan(){
            return !this.formInput.kode_santri || !this.formInput.nama_lengkap_santri
            || !this.formInput.panggilan 
            // || !this.formInput.tanggal_lahir
            || !this.formInput.tempat_lahir || !this.formInput.alamat
            || !this.formInput.berat_badan || !this.formInput.tinggi_badan
            || !this.formInput.email || !this.formInput.nama_ayah
            || !this.formInput.nama_ibu
        }
    },

    watch: {
        date (val) {
            this.dateFormatted = this.formatDate(this.date)
        },
    },

    methods:{
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

        getMasterDataSantri(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "Read_Santri"
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Santri",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_santri = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        createDataSantri(){
            return new Promise(resolve => {
                const formData = new FormData()
                formData.append("UID", localStorage.getLocalStorage("uid"))
                formData.append("Token", localStorage.getLocalStorage("token"))
                formData.append("Trigger", 'C')
                formData.append("Route", "DEFAULT")
                formData.append("foto", this.images)
                formData.append("kode_santri", this.add_data_santri.kode_santri)
                formData.append("nama_lengkap_santri", this.add_data_santri.nama_lengkap_santri)
                formData.append("panggilan", this.add_data_santri.panggilan)
                formData.append("hafalan_ziyadah", this.add_data_santri.hafalan_ziyadah)
                formData.append("hafalan_mutqin", this.add_data_santri.hafalan_mutqin)
                formData.append("tempat_lahir", this.add_data_santri.tempat_lahir)
                formData.append("tanggal_lahir", this.dateFormatted)
                formData.append("jenis_kelamin", this.add_data_santri.jenis_kelamin)
                formData.append("anak_ke", this.add_data_santri.anak_ke)
                formData.append("berat_badan", this.add_data_santri.berat_badan)
                formData.append("tinggi_badan", this.add_data_santri.tinggi_badan)
                formData.append("email", this.add_data_santri.email)
                formData.append("alamat", this.add_data_santri.alamat)
                formData.append("hp_ortu", this.add_data_santri.hp_ortu)
                formData.append("nama_ayah", this.add_data_santri.nama_ayah)
                formData.append("nama_ibu", this.add_data_santri.nama_ibu)

                let contentType = `application/x-www-form-urlencoded`;

                Services.PostData(
                ApiService,
                "Master/Santri",
                formData,
                contentType,
                response => {
                    resolve(response.data);
                    if (response.status == 1000) {
                        Swal.fire({
                            title: "",
                            text: "Berhasil menambahkan data.",
                            icon: "success",
                            heightAuto: true,
                            timer: 1500
                        });
                    } else {
                        Swal.fire({
                            title: "",
                            text: response.message,
                            icon: "info",
                            heightAuto: true,
                            timer: 1500
                        });
                    }
                    this.create_data_santri = response.data;
                    this.submitted = true;
                    this.save("add_data_santri");
                    this.getMasterDataSantri();
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            this.editedIndex = this.data_santri.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dateFormatted = item.tanggal_lahir
            this.data_item = item
            this.dialog = true
        },

        deleteItem (item) {
            Swal.fire({
                title: 'Menghapus Data ?',
                text: "Data yang telah dihapus tidak dapat dikembalikan.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya !',
                cancelButtonText: 'Tidak !',
                confirmButtonColor: '#73a4ef',
                cancelButtonColor: '#ddd',
                heightAuto: false
            }).then((result) => {
                if(result.value == true){
                return new Promise(resolve => {
                    var mydata = {
                        UID: localStorage.getLocalStorage("uid"),
                        Token: localStorage.getLocalStorage("token"),
                        Trigger: "D",
                        Route: "DEFAULT",
                        santri_id: item.santri_id
                    };

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Master/Santri',
                        qs.stringify(mydata),
                        contentType,
                        response => {
                            resolve(response.data);
                            if (response.status == 1000) {
                                Swal.fire({
                                    title: "",
                                    text: "Berhasil menghapus data.",
                                    icon: "success",
                                    heightAuto: true,
                                    timer: 1500
                                });
                            } else {
                                Swal.fire({
                                    title: "",
                                    text: response.message,
                                    icon: "info",
                                    heightAuto: true,
                                    timer: 1500
                                });
                            }
                            this.delete_data_santri = response.data;
                            this.submitted = true;
                            this.data_santri.splice(this.deletedIndex, 1);
                            this.getMasterDataSantri()
                        },
                        err => {
                            err;
                        }
                    );
                });
                }
            })
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.add_data_santri.kode_santri = ""
                this.add_data_santri.nama_lengkap_santri = ""
                this.add_data_santri.panggilan = ""
                this.add_data_santri.hafalan_ziyadah = ""
                this.add_data_santri.hafalan_mutqin = ""
                this.add_data_santri.tempat_lahir = ""
                this.add_data_santri.tanggal_lahir = ""
                this.add_data_santri.jenis_kelamin = ""
                this.add_data_santri.anak_ke = ""
                this.add_data_santri.berat_badan = ""
                this.add_data_santri.tinggi_badan = ""
                this.add_data_santri.email = ""
                this.add_data_santri.alamat = ""
                this.add_data_santri.hp_ortu = ""
                this.add_data_santri.nama_ayah = ""
                this.add_data_santri.nama_ibu = ""
                this.images = ""
                this.img = ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateDataSantri() {
            let media = "";
            var check = this.editedItem.foto;
            if (this.images != null && check.length < 40 ) {
                media =  this.images
            } else {
                media = ""
            }
            return new Promise(resolve => {
                const formData = new FormData()
                formData.append("UID", localStorage.getLocalStorage("uid"))
                formData.append("Token", localStorage.getLocalStorage("token"))
                formData.append("Trigger", 'U')
                formData.append("Route", "DEFAULT")
                formData.append("santri_id", this.data_item.santri_id)
                formData.append("foto", media)
                formData.append("kode_santri", this.editedItem.kode_santri)
                formData.append("nama_lengkap_santri", this.editedItem.nama_lengkap_santri)
                formData.append("panggilan", this.editedItem.panggilan)
                formData.append("hafalan_ziyadah", this.editedItem.hafalan_ziyadah)
                formData.append("hafalan_mutqin", this.editedItem.hafalan_mutqin)
                formData.append("tempat_lahir", this.editedItem.tempat_lahir)
                formData.append("tanggal_lahir", this.dateFormatted)
                formData.append("jenis_kelamin", this.editedItem.jenis_kelamin)
                formData.append("anak_ke", this.editedItem.anak_ke)
                formData.append("berat_badan", this.editedItem.berat_badan)
                formData.append("tinggi_badan", this.editedItem.tinggi_badan)
                formData.append("email", this.editedItem.email)
                formData.append("alamat", this.editedItem.alamat)
                formData.append("hp_ortu", this.editedItem.hp_ortu)
                formData.append("nama_ayah", this.editedItem.nama_ayah)
                formData.append("nama_ibu", this.editedItem.nama_ibu)

                let contentType = `application/x-www-form-urlencoded`;

                Services.PostData(
                    ApiService,
                    'Master/Santri',
                    formData,
                    contentType,
                    response => {
                        resolve(response.data);
                        if (response.status == 1000) {
                            Swal.fire({
                                title: "",
                                text: "Berhasil mengubah data.",
                                icon: "success",
                                heightAuto: true,
                                timer: 1500
                            });
                        } else {
                            Swal.fire({
                                title: "",
                                text: response.message,
                                icon: "info",
                                heightAuto: true,
                                timer: 1500
                            });
                        }
                        this.update_data_santri = response.data;
                        this.submitted = true;
                        this.save("edit_data_santri");
                        this.getMasterDataSantri();
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_data_santri") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.data_santri[this.editedIndex],
                    this.add_data_santri
                );
                } else {
                    this.data_santri.push(this.add_data_santri);
                }
            } else if (formInput == "edit_data_santri") {
                if (this.editedIndex > -1) {
                    Object.assign(this.data_santri[this.editedIndex], this.editedItem);
                } else {
                    this.data_santri.push(this.editedItem);
                }
            }
            this.close();
        },

        seenFileBill(item) {
            this.tabelFoto = item.foto
            this.dialogSeenBill = true;
        },

        createImage(file) {
            let reader = new FileReader();

            reader.onload = e => {
                this.img = e.target.result;
            };

            reader.readAsDataURL(file);
        },

        onImageChange() {
            this.images = this.$refs.file.files[0];
            this.createImage(this.$refs.file.files[0]);
        },

        clearFilter(){
            this.formFilter.kode_santri = ""
            this.formFilter.nama_lengkap_santri = ""
            this.formFilter.status = ""
            this.formFilter.jenis_kelamin = ""
            this.getMasterDataSantri()
        },

        filterData(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "Read_Santri",
                    kode_santri: this.formFilter.kode_santri,
                    nama_lengkap_santri: this.formFilter.nama_lengkap_santri,
                    status: this.formFilter.status,
                    jenis_kelamin: this.formFilter.jenis_kelamin,
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Santri",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_santri = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        async load() {
            Promise.all([
                await this.getMasterDataSantri()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>