<template>
    <div class="container-fluid col-md-10">
        <div class="card cardHover" v-show="accessList.R">
            <v-data-table responsive show-empty
                :headers="headers"
                :items="tahun_ajaran"
                :search="search"
                :loading="progressBar"
                loading-text="Loading... Please wait"
                :items-per-page="5"
                item-key="tahun_id"
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
                                        </v-col>
                                    <v-col
                                        cols="12"
                                        md="12"
                                    >
                                        <v-text-field
                                            v-model="formInput.tahun_ajaran"
                                            label="Tahun"
                                            placeholder="2023/2024"
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
                                            v-model="formInput.tipe_ajaran"
                                            :items="dropdown_semester"
                                            item-text="text"
                                            item-value="value"
                                            label="Semester"
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
import { Fetch_MThn_Ajaran_ComboBox, Fetch_MThn_Ajaran} from "@/core/services/store/m_ThnAjaran.module";

export default {
    name:"master-tahun-ajaran",
    mounted() {
        this.load();
    },

    data(){
        return {
            tahun_ajaran: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_tahun_ajaran: [],
            update_tahun_ajaran: [],
            delete_tahun_ajaran: [],
            add_tahun_ajaran: {
                kelas_id: "",
                tahun_ajaran: "",
                tipe_ajaran: ""
            },
            dropdown_semester: [
                { value: 1, text: "Ganjil" },
                { value: 2, text: "Genap" },
            ],
            headers: [
                { 
                    text: 'Nama Kelas', 
                    value: 'nama_kelas',
                    align: 'start',
                    width: "100px",
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
            accessList: [],
            master_data_kelas: []
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        },

        tahun_ajaran(){
            this.progressBar = false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_tahun_ajaran : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createTahunAjaran
                : this.updateTahunAjaran;
        },
        isDisabledSimpan(){
            return !this.formInput.tahun_ajaran || !this.formInput.tipe_ajaran || !this.formInput.kelas_id
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
            this.tahun_ajaran = this.$store.state.mThnAjaran.master_tahun_ajaran_combobox
        },

        getMasterKelas(){
            this.master_data_kelas = this.$store.state.mKelas.master_kelas
        },

        createTahunAjaran(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "DEFAULT",
                    tahun_ajaran: this.add_tahun_ajaran.tahun_ajaran,
                    tipe_ajaran: this.add_tahun_ajaran.tipe_ajaran,
                    kelas_id: this.add_tahun_ajaran.kelas_id
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
                    this.create_tahun_ajaran = response.data;
                    this.submitted = true;
                    this.save("add_tahun_ajaran");
                    this.getMasterTahunAjaran();
                    this.$store.dispatch(Fetch_MThn_Ajaran_ComboBox)
                    this.$store.dispatch(Fetch_MThn_Ajaran)
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            this.editedIndex = this.tahun_ajaran.indexOf(item)
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
                        tahun_id: item.tahun_id
                    };

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Master/TahunAjaran',
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
                            this.delete_tahun_ajaran = response.data;
                            this.submitted = true;
                            this.tahun_ajaran.splice(this.deletedIndex, 1);
                            this.getMasterTahunAjaran()
                            this.$store.dispatch(Fetch_MThn_Ajaran_ComboBox)
                            this.$store.dispatch(Fetch_MThn_Ajaran)
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
                this.add_tahun_ajaran.tahun_ajaran = ""
                this.add_tahun_ajaran.tipe_ajaran = ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateTahunAjaran() {
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "U",
                    Route: "DEFAULT",
                    tahun_id: this.data_item.tahun_id,
                    tahun_ajaran: this.editedItem.tahun_ajaran,
                    tipe_ajaran: this.editedItem.tipe_ajaran,
                    kelas_id: this.editedItem.kelas_id
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    'Master/TahunAjaran',
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
                        this.update_tahun_ajaran = response.data;
                        this.submitted = true;
                        this.save("edit_tahun_ajaran");
                        this.getMasterTahunAjaran();
                        this.$store.dispatch(Fetch_MThn_Ajaran_ComboBox)
                        this.$store.dispatch(Fetch_MThn_Ajaran)
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_tahun_ajaran") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.tahun_ajaran[this.editedIndex],
                    this.add_tahun_ajaran
                );
                } else {
                    this.tahun_ajaran.push(this.add_tahun_ajaran);
                }
            } else if (formInput == "edit_tahun_ajaran") {
                if (this.editedIndex > -1) {
                    Object.assign(this.tahun_ajaran[this.editedIndex], this.editedItem);
                } else {
                    this.tahun_ajaran.push(this.editedItem);
                }
            }
            this.close();
        },

        async load() {
            Promise.all([
                await this.asyncAccess(),
                await this.getMasterKelas(),
                await this.getMasterTahunAjaran()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>