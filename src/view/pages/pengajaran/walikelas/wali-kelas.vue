<template>
    <div class="container-fluid col-md-10">
        <div class="card cardHover" v-show="accessList.R">
            <v-data-table responsive show-empty
                :headers="headers"
                :items="data_walikelas"
                :search="search"
                :loading="progressBar"
                loading-text="Loading... Please wait"
                :items-per-page="5"
                item-key="walikelas_id"
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
                                            md="12"
                                        >
                                            <v-autocomplete
                                                v-model="formInput.tahun_id"
                                                :items="master_data_tahunAjaran"
                                                item-text="tahun_ajaran_nama"
                                                item-value="tahun_id"
                                                label="Kelas"
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
            </v-data-table>
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
    name:"riwayat-walikelas",
    mounted() {
        this.load();
    },

    data(){
        return {
            data_walikelas: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_data_walikelas: [],
            update_data_walikelas: [],
            delete_data_walikelas: [],
            add_data_walikelas: {
                pengajar_id: "",
                tahun_id: "",
                walikelas_id: "",
            },
            headers: [
                { 
                    text: 'Nama Wali', 
                    value: 'nama_lengkap',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Kelas', 
                    value: 'tahun_ajaran_nama',
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
            rulesNotNull: [
                value => !!value || 'Tidak boleh kosong.',
            ],
            master_data_tahunAjaran: [],
            master_data_pengajar: [],
            accessList: []
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        },

        data_walikelas(){
            this.progressBar = false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_data_walikelas : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createDataWaliKelas
                : this.updateDataWaliKelas;
        },
        isDisabledSimpan(){
            return !this.formInput.pengajar_id
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

        getMasterTahunAjaran(){
            this.master_data_tahunAjaran = this.$store.state.mThnAjaran.master_tahun_ajaran_combobox
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

        getRiwayatDataWaliKelas(){
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
                    "Riwayat/Wali_kelas",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_walikelas = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        createDataWaliKelas(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "DEFAULT",
                    pengajar_id: this.add_data_walikelas.pengajar_id,
                    tahun_id: this.add_data_walikelas.tahun_id
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                ApiService,
                "Riwayat/Wali_kelas",
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
                    this.create_data_walikelas = response.data;
                    this.submitted = true;
                    this.save("add_data_walikelas");
                    this.getRiwayatDataWaliKelas();
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            this.editedIndex = this.data_walikelas.indexOf(item)
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
                        walikelas_id: item.walikelas_id
                    };

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Riwayat/Wali_kelas',
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
                            this.delete_data_walikelas = response.data;
                            this.submitted = true;
                            this.data_walikelas.splice(this.deletedIndex, 1);
                            this.getRiwayatDataWaliKelas()
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
                this.add_data_walikelas.tahun_id = ""
                this.add_data_walikelas.pengajar_id = ""
                this.add_data_walikelas.walikelas_id = ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateDataWaliKelas() {
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "U",
                    Route: "DEFAULT",
                    walikelas_id: this.data_item.walikelas_id,
                    pengajar_id: this.editedItem.pengajar_id,
                    tahun_id: this.editedItem.tahun_id
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    'Riwayat/Wali_kelas',
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
                        this.update_data_walikelas = response.data;
                        this.submitted = true;
                        this.save("edit_data_walikelas");
                        this.getRiwayatDataWaliKelas();
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_data_walikelas") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.data_walikelas[this.editedIndex],
                    this.add_data_walikelas
                );
                } else {
                    this.data_walikelas.push(this.add_data_walikelas);
                }
            } else if (formInput == "edit_data_walikelas") {
                if (this.editedIndex > -1) {
                    Object.assign(this.data_walikelas[this.editedIndex], this.editedItem);
                } else {
                    this.data_walikelas.push(this.editedItem);
                }
            }
            this.close();
        },

        async load() {
            Promise.all([
                await this.asyncAccess(),
                await this.getMasterPengajar(),
                await this.getMasterTahunAjaran(),
                await this.getRiwayatDataWaliKelas()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>
