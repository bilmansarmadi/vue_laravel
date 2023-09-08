<template>
    <div class="container-fluid">
        <div v-show="accessList.R">
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
                                    v-model="formFilter.hari"
                                    label="Hari"
                                    required
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
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
                                    v-model="formFilter.pengajar_id"
                                    :items="master_data_pengajar"
                                    item-text="nama_lengkap"
                                    item-value="pengajar_id"
                                    label="Guru"
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
                    :sort-by="sortBy"
                    group-by="nama_kelas"
                    :headers="headers"
                    :items="jadwal_kelas"
                    :search="search"
                    :loading="progressBar"
                    loading-text="Loading... Please wait"
                    :items-per-page="10"
                    item-key="jadwal_id"
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
                        color="#ee8b3d"
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
                            v-show="accessList.C"
                            >
                            <i class="flaticon-add-circular-button mr-1 text-white"></i>
                                <span class="hideText">Tambah Data</span> 
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="border">
                                <span class="text-h5">{{ formTitle }}</span>
                                <v-spacer></v-spacer>
                                <v-icon
                                    class="rounded-circle p-2 shadow-sm"
                                    small
                                    @click="close"
                                    color="#000"
                                >
                                    mdi-close
                                </v-icon>
                            </v-card-title>
                
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                            md="6"
                                        >
                                            <v-text-field
                                                v-model="formInput.hari"
                                                label="Hari"
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
                                            <v-menu
                                                ref="menu"
                                                v-model="menu2"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                :return-value.sync="time"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                max-width="290px"
                                                min-width="290px"
                                            >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                    v-model="formInput.jam_mulai"
                                                    label="Jam Mulai"
                                                    prepend-icon="access_time"
                                                    readonly
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                v-if="menu2"
                                                v-model="formInput.jam_mulai"
                                                full-width
                                                @click:minute="$refs.menu.save(time)"
                                            ></v-time-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="6"
                                        >
                                            <v-menu
                                                ref="menu1"
                                                v-model="menu3"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                :return-value.sync="time"
                                                lazy
                                                transition="scale-transition"
                                                offset-y
                                                full-width
                                                max-width="290px"
                                                min-width="290px"
                                            >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field
                                                    v-model="formInput.jam_akhir"
                                                    label="Jam Akhir"
                                                    prepend-icon="access_time"
                                                    readonly
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                v-if="menu3"
                                                v-model="formInput.jam_akhir"
                                                full-width
                                                @click:minute="$refs.menu1.save(time)"
                                            ></v-time-picker>
                                            </v-menu>
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
                                        <!-- <v-col
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
                                        </v-col> -->
                                        <v-col
                                            cols="12"
                                            md="6"
                                        >
                                            <v-autocomplete
                                                v-model="formInput.pengajar_id"
                                                :items="master_data_pengajar"
                                                item-text="nama_lengkap"
                                                item-value="pengajar_id"
                                                label="Guru"
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
                                                item-text="tahun_ajaran_nama"
                                                item-value="tahun_id"
                                                label="Tahun Ajaran"
                                                clearable
                                                color="#ee8b3d"
                                            ></v-autocomplete>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                
                            <v-card-actions>
                            <v-spacer></v-spacer>
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
                                    v-show="accessList.U"
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
                                    v-show="accessList.D"
                                    >
                                    <v-icon dark>
                                    mdi-delete
                                    </v-icon>
                                </v-btn>
                            </template>
                        <span>Hapus Data</span>
                        </v-tooltip>
                    </template>
                    <template v-slot:[`item.jam_mulai`]="{ item }">
                        <span>{{ item.jam_mulai }} - {{ item.jam_akhir }}</span>
                    </template>
                </v-data-table>
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
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";

export default {
    name:"pengajaran-jadwal-kelas",
    mounted() {
        this.load();
    },

    data(){
        return {
            jadwal_kelas: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_jadwal_kelas: [],
            update_jadwal_kelas: [],
            delete_jadwal_kelas: [],
            add_jadwal_kelas: {
                hari: "",
                jam_mulai: "",
                jam_akhir: "",
                mapel_id: "",
                // kelas_id: "",
                pengajar_id: "",
                tahun_id: ""
            },
            formFilter: {
                hari: "",
                mapel_id: "",
                kelas_id: "",
                pengajar_id: "",
                tahun_id: ""
            },
            sortBy: [{ key: 'hari' }],
            groupBy: [{ key: 'nama_kelas' }],
            headers: [
                { 
                    text: 'Hari', 
                    value: 'hari',
                    align: 'start',
                    width: "80px",
                    sortable: false 
                },
                { 
                    text: 'Jam', 
                    value: 'jam_mulai',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Mata Pelajaran', 
                    value: 'mapel_nama',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Kelas', 
                    value: 'nama_kelas',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Guru', 
                    value: 'nama_pengajar',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Tahun Ajaran', 
                    value: 'tahun_ajaran',
                    align: 'start',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Semester', 
                    value: 'semester',
                    align: 'start',
                    width: "80px",
                    sortable: false 
                },
                { 
                    text: 'Aksi', 
                    value: 'actions', 
                    align: 'center',
                    width: "120px",
                    sortable: false 
                },
            ],
            rulesNotNull: [
                value => !!value || 'Tidak boleh kosong.',
            ],
            master_data_mapel: [],
            master_data_kelas: [],
            master_data_pengajar: [],
            master_data_tahunAjaran: [],
            menu2: false,
            menu3: false,
            time: null,
            accessList: []
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        },

        jadwal_kelas(){
            this.progressBar = false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_jadwal_kelas : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createJadwalKelas
                : this.updateJadwalKelas;
        },
        isDisabledSimpan(){
            return !this.formInput.hari
            || !this.formInput.pengajar_id || !this.formInput.mapel_id
            || !this.formInput.tahun_id || !this.formInput.jam_akhir
            || !this.formInput.jam_mulai
        }
    },

    methods:{
        asyncAccess(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "READ_AKSES",
                    menu_url: "/pengajaran/jadwal_kelas"
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Privilege",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.accessList = response.data[0];
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        getJadwalKelas(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "DEFAULT",
                    hari: this.formFilter.hari,
                    kelas_id: this.formFilter.kelas_id,
                    pengajar_id: this.formFilter.pengajar_id,
                    mapel_id: this.formFilter.mapel_id,
                    tahun_id: this.formFilter.tahun_id
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Pengajaran",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.jadwal_kelas = response.data;
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

        getMasterKelas(){
            this.master_data_kelas = this.$store.state.mKelas.master_kelas;
        },

        getMasterPengajar(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "Read_Pengajar"
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
                        this.master_data_pengajar = response.data;
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

        createJadwalKelas(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "DEFAULT",
                    hari: this.add_jadwal_kelas.hari,
                    // kelas_id: this.add_jadwal_kelas.kelas_id,
                    mapel_id: this.add_jadwal_kelas.mapel_id,
                    jam_akhir: this.add_jadwal_kelas.jam_akhir,
                    jam_mulai: this.add_jadwal_kelas.jam_mulai,
                    pengajar_id: this.add_jadwal_kelas.pengajar_id,
                    tahun_id: this.add_jadwal_kelas.tahun_id,
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                ApiService,
                "Master/Pengajaran",
                qs.stringify(mydata),
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
                    this.create_jadwal_kelas = response.data;
                    this.submitted = true;
                    this.save("add_jadwal_kelas");
                    this.getJadwalKelas();
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            this.editedIndex = this.jadwal_kelas.indexOf(item)
            this.editedItem = Object.assign({}, item)
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
                        jadwal_id: item.jadwal_id
                    };

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Master/Pengajaran',
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
                            this.delete_jadwal_kelas = response.data;
                            this.submitted = true;
                            this.jadwal_kelas.splice(this.deletedIndex, 1);
                            this.getJadwalKelas()
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
                this.add_jadwal_kelas.hari = ""
                this.add_jadwal_kelas.jam_akhir = ""
                this.add_jadwal_kelas.jam_mulai = ""
                // this.add_jadwal_kelas.kelas_id = ""
                this.add_jadwal_kelas.mapel_id = ""
                this.add_jadwal_kelas.pengajar_id = ""
                this.add_jadwal_kelas.tahun_id = ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateJadwalKelas() {
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "U",
                    Route: "DEFAULT",
                    jadwal_id: this.data_item.jadwal_id,
                    hari: this.editedItem.hari,
                    // kelas_id: this.editedItem.kelas_id,
                    mapel_id: this.editedItem.mapel_id,
                    jam_akhir: this.editedItem.jam_akhir,
                    jam_mulai: this.editedItem.jam_mulai,
                    pengajar_id: this.editedItem.pengajar_id,
                    tahun_id: this.editedItem.tahun_id,
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    'Master/Pengajaran',
                    qs.stringify(mydata),
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
                        this.update_jadwal_kelas = response.data;
                        this.submitted = true;
                        this.save("edit_jadwal_kelas");
                        this.getJadwalKelas();
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_jadwal_kelas") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.jadwal_kelas[this.editedIndex],
                    this.add_jadwal_kelas
                );
                } else {
                    this.jadwal_kelas.push(this.add_jadwal_kelas);
                }
            } else if (formInput == "edit_jadwal_kelas") {
                if (this.editedIndex > -1) {
                    Object.assign(this.jadwal_kelas[this.editedIndex], this.editedItem);
                } else {
                    this.jadwal_kelas.push(this.editedItem);
                }
            }
            this.close();
        },

        filterData(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "DEFAULT",
                    hari: this.formFilter.hari,
                    kelas_id: this.formFilter.kelas_id,
                    pengajar_id: this.formFilter.pengajar_id,
                    mapel_id: this.formFilter.mapel_id,
                    tahun_id: this.formFilter.tahun_id,
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Pengajaran",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.jadwal_kelas = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        clearFilter(){
            this.formFilter.hari = ""
            this.formFilter.mapel_id = ""
            this.formFilter.kelas_id = ""
            this.formFilter.pengajar_id = ""
            this.formFilter.tahun_id = ""
            this.getJadwalKelas()
        },

        async load() {
            Promise.all([
                await this.getMasterMapel(),
                await this.asyncAccess(),
                await this.getMasterKelas(),
                await this.getMasterPengajar(),
                await this.getMasterTahunAjaran(),
                await this.getJadwalKelas(),
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>