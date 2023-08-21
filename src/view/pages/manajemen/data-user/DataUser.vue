<template>
    <div>
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
                                <v-autocomplete
                                    v-model="formFilter.kode_user"
                                    :items="data_kode_user"
                                    :item-text="getTextKodeUser"
                                    item-value="kode_user"
                                    label="Nomor Identitas"
                                    clearable
                                    color="#ee8b3d"
                                >
                                </v-autocomplete>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-autocomplete
                                    v-model="formFilter.role_id"
                                    :items="data_role_user"
                                    item-text="role_nama"
                                    item-value="role_id"
                                    label="Akses"
                                    clearable
                                    color="#ee8b3d"
                                ></v-autocomplete>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                    v-model="formFilter.status"
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
                    :items="data_user"
                    :search="search"
                    loading-text="Loading... Please wait"
                    :items-per-page="5"
                    item-key="User_Id"
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
                                                v-model="formInput.kode_user"
                                                :items="data_kode_user"
                                                :item-text="getTextKodeUser"
                                                item-value="kode_user"
                                                label="Nomor Identitas"
                                                clearable
                                                color="#ee8b3d"
                                            >
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="6"
                                        >
                                            <v-autocomplete
                                                v-model="formInput.role_id"
                                                :items="data_role_user"
                                                item-text="role_nama"
                                                item-value="role_id"
                                                label="Akses"
                                                clearable
                                                color="#ee8b3d"
                                            ></v-autocomplete>
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
                    <template v-slot:[`item.user_fullname`]="{ item }">
                        <span>{{ item.nomor_identitas }} | {{ item.user_fullname }}</span>
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
                kode_user: "",
                role_id: "",
                password: "",
                status: ""
            },
            formFilter: {
                kode_user: "",
                role_id: "",
                status: ""
            },
            data_role_user: [],
            data_kode_user: [],
            headers: [
                { 
                    text: 'Nomor Identitas', 
                    value: 'user_fullname',
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
                    text: 'Akses', 
                    value: 'role_nama',
                    align: 'start',
                    width: "120px",
                    sortable: false 
                },
                { 
                    text: 'Status', 
                    value: 'Status_Aktif',
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
            dropdown_status: [
                { value: '0', text: "Tidak Aktif" },
                { value: '1', text: "Aktif" },
            ],
            accessList: []
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
            return !this.formInput.kode_user || !this.formInput.password
            || !this.formInput.role_id
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

        getMasterUsers(){
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

        getKodeUser(){
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
                        this.data_kode_user = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        getRoleUser(){
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
                    "Master/RoleUser",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_role_user = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        createDataUser(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "DEFAULT",
                    kode_user: this.add_data_user.kode_user,
                    user_password: this.add_data_user.password,
                    role_id: this.add_data_user.role_id,
                    status: this.add_data_user.status
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
            console.log(item);
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
                        user_id: item.User_Id
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
                this.add_data_user.kode_user = ""
                this.add_data_user.role_id = ""
                this.add_data_user.password = ""
                this.add_data_user.status = ""
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
                    user_id: this.data_item.User_Id,
                    kode_user: this.editedItem.kode_user,
                    user_email: this.editedItem.user_email,
                    role_id: this.editedItem.role_id,
                    status: this.editedItem.status,
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
            this.formFilter.kode_user = ""
            this.formFilter.role_id = ""
            this.formFilter.status = ""
            this.getMasterUsers()
        },

        filterData(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "DEFAULT",
                    kode_user: this.formFilter.kode_user,
                    role_id: this.formFilter.role_id,
                    status: this.formFilter.status
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
                await this.asyncAccess(),
                await this.getRoleUser(),
                await this.getKodeUser(),
                await this.getMasterUsers()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>