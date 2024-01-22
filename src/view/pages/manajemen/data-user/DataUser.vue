<template>
    <div>
        <div v-show="accessList == 0">
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
                                    v-model="formFilter.user_nama"
                                    item-value="user_nama"
                                    label="Nama"
                                    clearable
                                    color="#ee8b3d"
                                >
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                            <v-text-field
                                    v-model="formFilter.user_email"
                                    item-value="user_email"
                                    label="Email"
                                    clearable
                                    color="#ee8b3d"
                                    ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                    v-model="formFilter.user_level"
                                    :items="dropdown_user_level"
                                    item-text="text"
                                    item-value="value"
                                    label="user level"
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
                    :items="data_user"
                    :search="search"
                    :loading="progressBar"
                    loading-text="Loading... Please wait"
                    :items-per-page="5"
                    item-key="user_id"
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
                            v-show="accessList == 0"
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
                                                v-model="formInput.user_nama"
                                                item-value="user_nama"
                                                label="Nama User"
                                                clearable
                                                color="#ee8b3d"
                                            >
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="6"
                                        >
                                        <v-text-field
                                                v-model="formInput.user_email"
                                                item-text="user_email"
                                                item-value="user_email"
                                                label="Email"
                                                clearable
                                                color="#ee8b3d"
                                                ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="6"
                                        >
                                            <v-select
                                                v-model="formInput.user_level"
                                                :items="dropdown_user_level"
                                                item-text="text"
                                                item-value="value"
                                                label="user level"
                                                clearable
                                                color="#ee8b3d"
                                            ></v-select>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="6"
                                        >
                                            <v-text-field
                                                v-model="formInput.password"
                                                label="Password"
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
                                v-show="accessList == 0"
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
                                v-show="accessList == 0"
                                >
                                <v-icon dark>
                                mdi-delete
                                </v-icon>
                            </v-btn>
                        </template>
                    <span>Hapus Data</span>
                    </v-tooltip>
                    </template>
                    <template v-slot:[`item.user_fullname`]="{ item }">
                        <span>{{ item.nomor_identitas }} | {{ item.user_fullname }}</span>
                    </template>
                </v-data-table>
            </div>
        </div>
    </div>
</template>

<script>
import Services from "@/core/services/employee-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";

export default {
    name:"manajemen-data-user",
    mounted() {
        this.load();
    },

    data(){
        return {
            data_user: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_data_user: [],
            update_data_user: [],
            delete_data_user: [],
            add_data_user: {
                user_nama: "",
                user_email: "",
                password: "",
                user_level: ""
            },
            formFilter: {
                user_nama: "",
                user_email: "",
                user_level: ""
            },
            data_role_user: [],
            data_user_nama: [],
            headers: [
                { 
                    text: 'Nama user', 
                    value: 'user_nama',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Email', 
                    value: 'user_email',
                    align: 'start',
                    width: "120px",
                    sortable: false 
                },
                { 
                    text: 'user level', 
                    value: 'level_nama',
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
            dropdown_user_level: [
                { value: '0', text: "Admin" },
                { value: '1', text: "Users" },
            ],
            accessList: ''
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        },

        data_user(){
            this.progressBar = false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_data_user : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createDataUser
                : this.updateDataUser;
        },
        isDisabledSimpan(){
            return !this.formInput.user_nama || !this.formInput.password
            || !this.formInput.user_email
        }
    },

    methods:{

        getMasterUsers(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "DEFAULT",
                    user_nama: this.formFilter.user_nama,
                    user_email: this.formFilter.user_email,
                    user_level: this.formFilter.user_level
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Users",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_user = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        getFormattedDate() {
                const currentDate = new Date();
                const day = currentDate.getDate();
                const month = currentDate.getMonth() + 1; // January is 0!
                const year = currentDate.getFullYear();

                // Format tanggal seperti dd-MM-yyyy
                return `${day}-${month}-${year}`;
            },


        createDataUser(){
            return new Promise(resolve => {
                var mydata = {
                UID: localStorage.getLocalStorage("uid"),
                Token: localStorage.getLocalStorage("token"),
                Trigger: "C",
                Route: "DEFAULT",
                user_nama: this.add_data_user.user_nama,
                user_password: this.add_data_user.password,
                user_email: this.add_data_user.user_email,
                user_level: this.add_data_user.user_level,
                tgl_terdaftar: this.getFormattedDate(),
            };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                ApiService,
                "Master/Users",
                qs.stringify(mydata),
                contentType,
                response => {
                    resolve(response.data);
                    if (response.user_level == 1000) {
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
                            text: response.message_opt,
                            icon: "info",
                            heightAuto: true,
                            timer: 1500
                        });
                    }
                    this.create_data_user = response.data;
                    this.submitted = true;
                    this.save("add_data_user");
                    this.getMasterUsers();
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            this.editedIndex = this.data_user.indexOf(item)
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
                        user_id: item.user_id
                    };

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Master/Users',
                        qs.stringify(mydata),
                        contentType,
                        response => {
                            resolve(response.data);
                            if (response.user_level == 1000) {
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
                            this.delete_data_user = response.data;
                            this.submitted = true;
                            this.data_user.splice(this.deletedIndex, 1);
                            this.getMasterUsers()
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
                this.add_data_user.user_nama = ""
                this.add_data_user.user_email = ""
                this.add_data_user.password = ""
                this.add_data_user.user_level = ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateDataUser() {
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "U",
                    Route: "DEFAULT",
                    user_id: this.data_item.user_id,
                    user_nama: this.editedItem.user_nama,
                    user_email: this.editedItem.user_email,
                    user_level: this.editedItem.user_level,
                    user_password: this.editedItem.password
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    'Master/Users',
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        if (response.user_level == 1000) {
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
                        this.update_data_user = response.data;
                        this.submitted = true;
                        this.save("edit_data_user");
                        this.getMasterUsers();
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_data_user") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.data_user[this.editedIndex],
                    this.add_data_user
                );
                } else {
                    this.data_user.push(this.add_data_user);
                }
            } else if (formInput == "edit_data_user") {
                if (this.editedIndex > -1) {
                    Object.assign(this.data_user[this.editedIndex], this.editedItem);
                } else {
                    this.data_user.push(this.editedItem);
                }
            }
            this.close();
        },

        clearFilter(){
            this.formFilter.user_nama = ""
            this.formFilter.user_email = ""
            this.formFilter.user_level = ""
            this.getMasterUsers()
        },

        filterData(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "DEFAULT",
                    user_nama: this.formFilter.user_nama,
                    user_email: this.formFilter.user_email,
                    user_level: this.formFilter.user_level
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Users",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_user = response.data;
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
                await this.getMasterUsers()
            ]).then(function(results) {
                results;
            });
            this.accessList = localStorage.getLocalStorage("user_level")
        },
    }
}
</script>