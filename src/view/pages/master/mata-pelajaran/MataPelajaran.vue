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
                            <v-autocomplete
                                v-model="formFilter.kurikulum_id"
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
                            md="6"
                        >
                            <v-autocomplete
                                v-model="formFilter.kategori_id"
                                :items="dropdown_kategori"
                                item-text="kategori_nama"
                                item-value="kategori_id"
                                label="Kategori Kurikulum"
                                @click="getMasterKategori"
                                clearable
                                color="#ee8b3d"
                            ></v-autocomplete>
                        </v-col>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-model="formFilter.mapel_nama"
                                label="Mata Pelajaran"
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
                            <v-select
                                v-model="formFilter.status_mapel"
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
                :items="data_mapel"
                :search="search"
                loading-text="Loading... Please wait"
                :items-per-page="5"
                item-key="mapel_id"
                class="elevation-1"
                mobile-breakpoint="0"
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
                        <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>
            
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col
                                        cols="12"
                                        md="6"
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
                                        md="6"
                                    >
                                        <v-autocomplete
                                            v-model="formInput.kategori_id"
                                            :items="dropdown_kategori"
                                            item-text="kategori_nama"
                                            item-value="kategori_id"
                                            label="Kategori Kurikulum"
                                            @click="getMasterKategori"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="6"
                                    >
                                        <v-text-field
                                            v-model="formInput.mapel_nama"
                                            label="Mata Pelajaran"
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
                                            v-model="formInput.sks"
                                            label="SKS"
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
                                        <v-select
                                            v-model="formInput.status_mapel"
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
                                            v-model="formInput.deskripsi"
                                            label="Deskripsi"
                                            :rules="rulesNotNull"
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
    name:"master-mata-pelajaran",
    mounted() {
        this.load();
    },

    data(){
        return {
            data_mapel: [],
            dropdown_kurikulum: [],
            dropdown_kategori: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_data_mapel: [],
            update_data_mapel: [],
            delete_data_mapel: [],
            add_data_mapel: {
                kurikulum_id: "",
                kategori_id: "",
                mapel_nama: "",
                status_mapel: "",
                sks: "",
                deskripsi: ""
            },
            formFilter: {
                kurikulum_id: "",
                kategori_id: "",
                mapel_nama: "",
                status_mapel: ""
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
                    width: "180px",
                    sortable: false 
                },
                { 
                    text: 'Kategori Kurikulum', 
                    value: 'kategori_nama',
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
                    text: 'SKS', 
                    value: 'sks',
                    align: 'start',
                    width: "80px",
                    sortable: false 
                },
                { 
                    text: 'Deskripsi', 
                    value: 'deskripsi',
                    align: 'start',
                    width: "180px",
                    sortable: false 
                },
                { 
                    text: 'Status', 
                    value: 'status_mapel_nama',
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

        data_mapel(){
            this.progressBar = false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_data_mapel : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createMapel
                : this.updateMapel;
        },
        isDisabledSimpan(){
            return !this.formInput.kurikulum_id || !this.formInput.kategori_id
            || !this.formInput.mapel_nama || !this.formInput.sks
        }
    },

    methods:{
        getMasterMapel(){
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
                    "Master/Mapel",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_mapel = response.data;
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

        getMasterKategori(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "COMBOBOX_KATEGORI_KURIKULUM",
                    kurikulum_id: this.formInput.kurikulum_id
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
                        this.dropdown_kategori = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        changeKurikulum(){
            this.add_data_mapel.kategori_id = ""
        },

        createMapel(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "DEFAULT",
                    kurikulum_id: this.add_data_mapel.kurikulum_id,
                    kategori_id: this.add_data_mapel.kategori_id,
                    mapel_nama: this.add_data_mapel.mapel_nama,
                    status_mapel: this.add_data_mapel.status_mapel,
                    sks: this.add_data_mapel.sks,
                    deskripsi: this.add_data_mapel.deskripsi
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
                    this.create_data_mapel = response.data;
                    this.submitted = true;
                    this.save("add_data_mapel");
                    this.getMasterMapel();
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            this.editedIndex = this.data_mapel.indexOf(item)
            this.editedItem = Object.assign({}, item)
            setTimeout(() => this.getMasterKategori(), 100);
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
                        mapel_id: item.mapel_id
                    };

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Master/Mapel',
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
                            this.delete_data_mapel = response.data;
                            this.submitted = true;
                            this.data_mapel.splice(this.deletedIndex, 1);
                            this.getMasterMapel()
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
                this.add_data_mapel.kurikulum_id = ""
                this.add_data_mapel.kategori_id = ""
                this.add_data_mapel.status_mapel = ""
                this.add_data_mapel.sks = ""
                this.add_data_mapel.deskripsi = ""
                this.add_data_mapel.mapel_nama = ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateMapel() {
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "U",
                    Route: "DEFAULT",
                    mapel_id: this.data_item.mapel_id,
                    kurikulum_id: this.editedItem.kurikulum_id,
                    kategori_id: this.editedItem.kategori_id,
                    mapel_nama: this.editedItem.mapel_nama,
                    status_mapel: this.editedItem.status_mapel,
                    sks: this.editedItem.sks,
                    deskripsi: this.editedItem.deskripsi
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    'Master/Mapel',
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
                        this.update_data_mapel = response.data;
                        this.submitted = true;
                        this.save("edit_data_mapel");
                        this.getMasterMapel();
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_data_mapel") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.data_mapel[this.editedIndex],
                    this.add_data_mapel
                );
                } else {
                    this.data_mapel.push(this.add_data_mapel);
                }
            } else if (formInput == "edit_data_mapel") {
                if (this.editedIndex > -1) {
                    Object.assign(this.data_mapel[this.editedIndex], this.editedItem);
                } else {
                    this.data_mapel.push(this.editedItem);
                }
            }
            this.close();
        },

        clearFilter(){
            this.formFilter.kategori_id = ""
            this.formFilter.kurikulum_id = ""
            this.formFilter.status_mapel = ""
            this.formFilter.mapel_nama = ""
            this.getMasterMapel()
        },

        filterData(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "DEFAULT",
                    mapel_nama: this.formFilter.mapel_nama,
                    status_mapel: this.formFilter.status_mapel,
                    kategori_id: this.formFilter.kategori_id,
                    kurikulum_id: this.formFilter.kurikulum_id
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
                        this.data_mapel = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        async load() {
            Promise.all([
                await this.getMasterKurikulum(),
                await this.getMasterMapel(),
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>