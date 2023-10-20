<template>
    <div class="container-fluid col-md-10">
        <div class="card cardHover" v-show="accessList.R">
            <v-data-table responsive show-empty
                :headers="headers"
                :items="data_porsinilai"
                :search="search"
                :loading="progressBar"
                loading-text="Loading... Please wait"
                :items-per-page="5"
                item-key="rumus_id"
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
                    <!-- <template v-slot:activator="{ on, attrs }">
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
                    </template> -->
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
                                        md="12"
                                    >
                                        <v-text-field
                                            v-model="formInput.persentase_abs"
                                            label="Perentase Absen"
                                            :rules="rulesNotNull"
                                            type="number"
                                            required
                                            clearable
                                            color="#ee8b3d"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="12"
                                    >
                                        <v-text-field
                                            v-model="formInput.persentase_tgs"
                                            label="Persentase Tugas"
                                            type="number"
                                            :rules="rulesNotNull"
                                            required
                                            clearable
                                            color="#ee8b3d"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="12"
                                    >
                                        <v-text-field
                                            v-model="formInput.persentase_uts"
                                            label="Persentase UTS"
                                            :rules="rulesNotNull"
                                            type="number"
                                            required
                                            clearable
                                            color="#ee8b3d"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="12"
                                    >
                                        <v-text-field
                                            v-model="formInput.persentase_uas"
                                            label="Persentase UAS"
                                            :rules="rulesNotNull"
                                            type="number"
                                            required
                                            clearable
                                            color="#ee8b3d"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="12"
                                    >
                                        <v-text-field
                                            v-model="formInput.kkm_kelas"
                                            label="KKM Kelas"
                                            :rules="rulesNotNull"
                                            type="number"
                                            required
                                            clearable
                                            color="#ee8b3d"
                                        ></v-text-field>
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
                <!-- <v-tooltip top>
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
                </v-tooltip> -->
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
    name:"master-porsinilai",
    mounted() {
        this.load();
    },

    data(){
        return {
            data_porsinilai: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_data_porsinilai: [],
            update_data_porsinilai: [],
            delete_data_porsinilai: [],
            add_data_porsinilai: {
                persentase_abs: "",
                persentase_tgs: "",
                persentase_uts: "",
                persentase_uas: "",
                kkm_kelas: ""
            },
            headers: [
                { 
                    text: 'Absen', 
                    value: 'persentase_abs',
                    align: 'start',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Tugas',  
                    value: 'persentase_tgs',
                    align: 'start',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'UTS', 
                    value: 'persentase_uts',
                    align: 'start',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'UAS', 
                    value: 'persentase_uas',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'KKM Kelas', 
                    value: 'kkm_kelas',
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
            rulesNotNull: [
                value => !!value || 'Tidak boleh kosong.',
            ],
            accessList: []
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        },

        data_porsinilai(){
            this.progressBar = false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_data_porsinilai : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createDataPorsiNilai
                : this.updateDataPorsiNilai;
        },
        isDisabledSimpan(){
            return !this.formInput.persentase_abs
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

        getMasterDataPorsiNilai(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "selectbyrumus"
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Rumus",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_porsinilai = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        createDataPorsiNilai(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "DEFAULT",
                    persentase_abs: this.add_data_porsinilai.persentase_abs,
                    persentase_tgs: this.add_data_porsinilai.persentase_tgs,
                    persentase_uts: this.add_data_porsinilai.persentase_uts,
                    persentase_uas: this.add_data_porsinilai.persentase_uas,
                    kkm_kelas: this.add_data_porsinilai.kkm_kelas
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                ApiService,
                "Master/Rumus",
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
                    this.create_data_porsinilai = response.data;
                    this.submitted = true;
                    this.save("add_data_porsinilai");
                    this.getMasterDataPorsiNilai();
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            this.editedIndex = this.data_porsinilai.indexOf(item)
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
                        rumus_id: item.rumus_id
                    };

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Master/Rumus',
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
                            this.delete_data_porsinilai = response.data;
                            this.submitted = true;
                            this.data_porsinilai.splice(this.deletedIndex, 1);
                            this.getMasterDataPorsiNilai()
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
                this.add_data_porsinilai.persentase_abs = ""
                this.add_data_porsinilai.persentase_tgs = ""
                this.add_data_porsinilai.persentase_uas = ""
                this.add_data_porsinilai.persentase_uts = ""
                this.add_data_porsinilai.kkm_kelas = ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateDataPorsiNilai() {
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "U",
                    Route: "DEFAULT",
                    rumus_id: this.data_item.rumus_id,
                    persentase_abs: this.editedItem.persentase_abs,
                    persentase_tgs: this.editedItem.persentase_tgs,
                    persentase_uts: this.editedItem.persentase_uts,
                    persentase_uas: this.editedItem.persentase_uas,
                    kkm_kelas: this.editedItem.kkm_kelas
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    'Master/Rumus',
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
                        this.update_data_porsinilai = response.data;
                        this.submitted = true;
                        this.save("edit_data_porsinilai");
                        this.getMasterDataPorsiNilai();
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_data_porsinilai") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.data_porsinilai[this.editedIndex],
                    this.add_data_porsinilai
                );
                } else {
                    this.data_porsinilai.push(this.add_data_porsinilai);
                }
            } else if (formInput == "edit_data_porsinilai") {
                if (this.editedIndex > -1) {
                    Object.assign(this.data_porsinilai[this.editedIndex], this.editedItem);
                } else {
                    this.data_porsinilai.push(this.editedItem);
                }
            }
            this.close();
        },

        async load() {
            Promise.all([
                await this.asyncAccess(),
                await this.getMasterDataPorsiNilai()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>
