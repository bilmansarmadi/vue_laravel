<template>
    <div class="container-fluid col-md-10">
        <div class="card cardHover">
            <v-data-table responsive show-empty
                :headers="headers"
                :items="data_kat_kurikulum"
                :search="search"
                loading-text="Loading... Please wait"
                :items-per-page="5"
                item-key="kategori_id"
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
                                        md="12"
                                    >
                                        <v-autocomplete
                                            v-model="formInput.kurikulum_id"
                                            :items="dropdown_kurikulum"
                                            item-text="kurikulum_nama"
                                            item-value="kurikulum_id"
                                            label="Kurikulum"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="12"
                                    >
                                        <v-text-field
                                            v-model="formInput.kategori_nama"
                                            label="Kategori Kurikulum"
                                            placeholder="contoh: QIRO’AH"
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
                                        <v-select
                                            v-model="formInput.kategori_status"
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
            </v-data-table>
        </div>
    </div>
</template>

<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";

export default {
    name:"master-kategori-kurikulum",
    mounted() {
        this.load();
    },

    data(){
        return {
            data_kat_kurikulum: [],
            dropdown_kurikulum: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_data_kat_kurikulum: [],
            update_data_kat_kurikulum: [],
            delete_data_kat_kurikulum: [],
            add_data_kat_kurikulum: {
                kurikulum_id: "",
                kategori_nama: "",
                kategori_status: ""
            },
            dropdown_status: [
                { value: 0, text: "Tidak Aktif" },
                { value: 1, text: "Aktif" },
            ],
            headers: [
                { 
                    text: 'Kurikulum', 
                    value: 'kurikulum_nama',
                    align: 'start',
                    width: "200px",
                    sortable: false 
                },
                { 
                    text: 'Kategori', 
                    value: 'kategori_nama',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Status', 
                    value: 'kategori_status_nama',
                    align: 'center',
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
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        },

        data_kat_kurikulum(){
            this.progressBar = false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_data_kat_kurikulum : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createKategori
                : this.updateKategori;
        },
        isDisabledSimpan(){
            return !this.formInput.kurikulum_id || !this.formInput.kategori_nama
        }
    },

    methods:{
        getMasterKategoriKurikulum(){
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
                    "Master/Kategori",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_kat_kurikulum = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        getMasterKurikulum(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "COMBOBOX_KURIKULUM"
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Kurikulum",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.dropdown_kurikulum = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        createKategori(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "DEFAULT",
                    kurikulum_id: this.add_data_kat_kurikulum.kurikulum_id,
                    kategori_nama: this.add_data_kat_kurikulum.kategori_nama,
                    kategori_status: this.add_data_kat_kurikulum.kategori_status
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                ApiService,
                "Master/Kategori",
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
                    this.create_data_kat_kurikulum = response.data;
                    this.submitted = true;
                    this.save("add_data_kat_kurikulum");
                    this.getMasterKategoriKurikulum();
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            this.editedIndex = this.data_kat_kurikulum.indexOf(item)
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
                        kategori_id: item.kategori_id
                    };

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Master/Kategori',
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
                            this.delete_data_kat_kurikulum = response.data;
                            this.submitted = true;
                            this.data_kat_kurikulum.splice(this.deletedIndex, 1);
                            this.getMasterKategoriKurikulum()
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
                this.add_data_kat_kurikulum.kurikulum_id = ""
                this.add_data_kat_kurikulum.kategori_nama = ""
                this.add_data_kat_kurikulum.kategori_status = ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateKategori() {
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "U",
                    Route: "DEFAULT",
                    kategori_id: this.data_item.kategori_id,
                    kurikulum_id: this.editedItem.kurikulum_id,
                    kategori_nama: this.editedItem.kategori_nama,
                    kategori_status: this.editedItem.kategori_status
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    'Master/Kategori',
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
                        this.update_data_kat_kurikulum = response.data;
                        this.submitted = true;
                        this.save("edit_data_kat_kurikulum");
                        this.getMasterKategoriKurikulum();
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_data_kat_kurikulum") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.data_kat_kurikulum[this.editedIndex],
                    this.add_data_kat_kurikulum
                );
                } else {
                    this.data_kat_kurikulum.push(this.add_data_kat_kurikulum);
                }
            } else if (formInput == "edit_data_kat_kurikulum") {
                if (this.editedIndex > -1) {
                    Object.assign(this.data_kat_kurikulum[this.editedIndex], this.editedItem);
                } else {
                    this.data_kat_kurikulum.push(this.editedItem);
                }
            }
            this.close();
        },

        async load() {
            Promise.all([
                await this.getMasterKategoriKurikulum(),
                await this.getMasterKurikulum()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>