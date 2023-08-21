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
                            <!-- <v-col
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
                            </v-col> -->
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
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-autocomplete
                                    v-model="formFilter.santri_id"
                                    :items="master_data_santri"
                                    :item-text="getTextKodeUser"
                                    item-value="kode_user"
                                    label="Santri"
                                    clearable
                                    color="#ee8b3d"
                                ></v-autocomplete>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                    v-model="formFilter.status_kelompok"
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
                    group-by="nama_kelas"
                    sort-by="kelas_id"
                    :headers="headers"
                    :items="kelompok_kelas"
                    :search="search"
                    loading-text="Loading... Please wait"
                    :items-per-page="10"
                    item-key="kelompok_id"
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
                            max-width="500px"
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
                                        <!-- <v-col
                                            cols="12"
                                            md="12"
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
                                            md="12"
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
                                        <v-col
                                            cols="12"
                                            md="12"
                                        >
                                            <v-autocomplete
                                                v-model="formInput.santri_id"
                                                :items="master_data_santri"
                                                :item-text="getTextKodeUser"
                                                item-value="kode_user"
                                                label="Santri"
                                                multiple
                                                clearable
                                                color="#ee8b3d"
                                            ></v-autocomplete>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="12"
                                        >
                                            <v-select
                                                v-model="formInput.status_kelompok"
                                                :items="dropdown_status"
                                                item-text="text"
                                                item-value="value"
                                                label="Status"
                                                clearable
                                                color="#ee8b3d"
                                            ></v-select>
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
                                hidden
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
                    <template v-slot:[`item.kode_santri`]="{ item }">
                        <span>{{ item.kode_santri }} | {{ item.nama_lengkap_santri }}</span>
                    </template>
                </v-data-table>
            </div>
        </div>

        <div v-show="accessList.R == 0">
            <div class="d-flex justify-content-center">
                <img src="media/bg/access.png" alt="Tidak Ada Access" width="35%">
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
    name:"pengajaran-kelompok-kelas",
    mounted() {
        this.load();
    },

    data(){
        return {
            kelompok_kelas: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_kelompok_kelas: [],
            update_kelompok_kelas: [],
            delete_kelompok_kelas: [],
            add_kelompok_kelas: {
                santri_id: "",
                tahun_id: "", 
                status_kelompok: ""
            },
            formFilter: {
                santri_id: "",
                tahun_id: "", 
                status_kelompok: ""
            },
            headers: [
                { 
                    text: 'Kelas', 
                    value: 'nama_kelas',
                    align: 'start',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Santri', 
                    value: 'kode_santri',
                    align: 'start',
                    width: "200px",
                    sortable: false 
                },
                { 
                    text: 'Tahun Ajaran', 
                    value: 'tahun_ajaran',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Semester', 
                    value: 'semester',
                    align: 'start',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Status', 
                    value: 'status_kelompok_nama',
                    align: 'start',
                    width: "80px",
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
            rulesNotNull: [
                value => !!value || 'Tidak boleh kosong.',
            ],
            master_data_kelas: [],
            master_data_santri: [],
            master_data_tahunAjaran: [],
            dropdown_status: [
                { value: 1, text: "Aktif" },
                { value: 0, text: "Tidak Aktif" },
            ],
            accessList: []
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        },

        kelompok_kelas(){
            this.progressBar = false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_kelompok_kelas : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createKelompokKelas
                : this.updateDataRole;
        },
        isDisabledSimpan(){
            return !this.formInput.tahun_id || !this.formInput.santri_id
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
                    menu_url: this.$router.currentRoute.path
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

        getKelompokKelas(){
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
                    "Riwayat/Kelompok_Kelas",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.kelompok_kelas = response.data;
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

        getMasterSantri(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "COMBO_USER"
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
                        this.master_data_santri = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        createKelompokKelas(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "KELOMPOK_KELAS",
                    kelas_id: this.add_kelompok_kelas.kelas_id,
                    santri_id: JSON.stringify(this.add_kelompok_kelas.santri_id),
                    status_kelompok: this.add_kelompok_kelas.status_kelompok,
                    tahun_id: this.add_kelompok_kelas.tahun_id,
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                ApiService,
                "Riwayat/Kelompok_Kelas",
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
                    this.create_kelompok_kelas = response.data;
                    this.submitted = true;
                    this.save("add_kelompok_kelas");
                    this.getKelompokKelas();
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            console.log(item);
            this.editedIndex = this.kelompok_kelas.indexOf(item)
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
                        kelompok_id: item.kelompok_id
                    };

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Riwayat/Kelompok_Kelas',
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
                            this.delete_kelompok_kelas = response.data;
                            this.submitted = true;
                            this.kelompok_kelas.splice(this.deletedIndex, 1);
                            this.getKelompokKelas()
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
                this.add_kelompok_kelas.kelas_id = ""
                this.add_kelompok_kelas.santri_id = ""
                this.add_kelompok_kelas.status_kelompok = ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateDataRole() {
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "U",
                    Route: "DEFAULT",
                    kelompok_id: this.data_item.kelompok_id,
                    kelas_id: this.editedItem.kelas_id,
                    santri_id: JSON.stringify(this.editedItem.santri_id),
                    status_kelompok: this.editedItem.status_kelompok,
                    tahun_id: this.editedItem.tahun_id
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    'Riwayat/Kelompok_Kelas',
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
                        this.update_kelompok_kelas = response.data;
                        this.submitted = true;
                        this.save("edit_kelompok_kelas");
                        this.getKelompokKelas();
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_kelompok_kelas") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.kelompok_kelas[this.editedIndex],
                    this.add_kelompok_kelas
                );
                } else {
                    this.kelompok_kelas.push(this.add_kelompok_kelas);
                }
            } else if (formInput == "edit_kelompok_kelas") {
                if (this.editedIndex > -1) {
                    Object.assign(this.kelompok_kelas[this.editedIndex], this.editedItem);
                } else {
                    this.kelompok_kelas.push(this.editedItem);
                }
            }
            this.close();
        },

        clearFilter(){
            this.formFilter.kelas_id = ""
            this.formFilter.santri_id= ""
            this.formFilter.tahun_id= ""
            this.formFilter.status_kelompok = ""
            this.getKelompokKelas()
        },

        filterData(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "DEFAULT",
                    kelas_id: this.formFilter.kelas_id,
                    santri_id: this.formFilter.santri_id,
                    tahun_id: this.formFilter.tahun_id,
                    status_kelompok: this.formFilter.status_kelompok
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Riwayat/Kelompok_Kelas",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.kelompok_kelas = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        getTextKodeUser: item => item.nomor_identitas + ' | ' + item.nama,

        async load() {
            Promise.all([
                await this.asyncAccess(),
                await this.getMasterSantri(),
                await this.getMasterTahunAjaran(),
                await this.getKelompokKelas(),
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>