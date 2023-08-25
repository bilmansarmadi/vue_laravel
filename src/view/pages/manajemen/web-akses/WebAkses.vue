<template>
    <div class="container-fluid col-md-8">
        <div class="card cardHover" v-show="accessList.R">
            <v-data-table responsive show-empty
                :headers="headers"
                :items="web_akses"
                :search="search"
                :loading="progressBar"
                loading-text="Loading... Please wait"
                :items-per-page="5"
                item-key="menu_id"
                class="elevation-1 mt-3 border-0"
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
                        max-width="600px"
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
                            <v-container class="mt-3">
                                <v-row>
                                    <v-col
                                        cols="12"
                                        md="12"
                                    >
                                        <v-autocomplete
                                            v-model="formInput.role_id"
                                            :items="data_role_user"
                                            item-text="role_nama"
                                            item-value="role_id"
                                            label="Nama Akses"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="12"
                                    >
                                        <h5 class="text-black font-weight-bold mb-3">Pilih Menu :</h5>
                                        <div v-for="(menu, menu_id) in data_menu" :key="menu_id" class="menu-item">
                                            <div v-if="menu.parent_id === '0'">
                                                <b-form-checkbox class="text-dark" size="lg" :id="'menu_' + menu.menu_id" v-model="menu.checked">{{ menu.menu_nama }}</b-form-checkbox>
                                            </div>
                                            <div v-for="(submenu, submenu_id) in sub_data_menu" :key="submenu_id" class="submenu">
                                                <div v-if="submenu.parent_id === menu.menu_id" class="d-flex justify-content-start ml-9 m-1">
                                                    <b-form-checkbox class="min-w-140px" size="lg" :id="'menu_' + submenu.menu_id" v-model="submenu.checked">{{ submenu.menu_nama }}</b-form-checkbox>
                                                    <b-form-checkbox class="mr-4" size="lg" :id="'menu_create_' + submenu.menu_id" v-model="submenu.create">Create</b-form-checkbox>
                                                    <b-form-checkbox class="mr-4" size="lg" :id="'menu_update_' + submenu.menu_id" v-model="submenu.update">Update</b-form-checkbox>
                                                    <b-form-checkbox class="mr-4" size="lg" :id="'menu_delete_' + submenu.menu_id" v-model="submenu.delete">Delete</b-form-checkbox>
                                                </div>
                                            </div>
                                            <br>
                                        </div>
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
                                hidden
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
                <template v-slot:[`item.menu_nama`]="{ item }">
                    <div style="white-space: pre-wrap;">{{ getSplitMenu(item.menu_nama) }}</div>
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
    name:"manajemen-web-akses",
    mounted() {
        this.load();
    },

    data(){
        return {
            web_akses: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_web_akses: [],
            update_web_akses: [],
            delete_web_akses: [],
            add_web_akses: {
                role_id: ""
            },
            data_role_user: [],
            data_menu: [],
            sub_data_menu: [],
            headers: [
                { 
                    text: 'Nama Akses', 
                    value: 'role_nama',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Nama Menu', 
                    value: 'menu_nama',
                    align: 'start',
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

        web_akses(){
            this.progressBar = false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_web_akses : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createWebAkses
                : this.updateData;
        },
        isDisabledSimpan(){
            return !this.formInput.role_id
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
                    Route: "HAK_AKSES"
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
                        this.web_akses = response.data;
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

        createWebAkses(){
            const role_id = this.add_web_akses.role_id
            const selectedWebAkses= [];
            
            // Melakukan iterasi melalui data menu
            for (const menuId in this.data_menu) {
                const menu = this.data_menu[menuId];
                // Memeriksa apakah menu dipilih
                if (menu.checked && menu.parent_id == 0) {
                    selectedWebAkses.push({
                        menu_id: menu.menu_id,
                        rprivilege_read: 1,
                        rprivilege_create: 0,
                        rprivilege_update: 0,
                        rprivilege_delete: 0
                    });
                    // Melakukan iterasi melalui submenu yang terkait dengan menu terpilih
                    for (const submenuId in this.sub_data_menu) {
                        const submenu = this.sub_data_menu[submenuId];
                    
                        // Memeriksa apakah submenu terkait dengan   menu terpilih
                        if (submenu.parent_id === menu.menu_id && submenu.checked) {
                            if(submenu.create === false){
                                submenu.create = 0;
                            }else{
                                submenu.create = 1;
                            }

                            if(submenu.update === false){
                                submenu.update = 0;
                            }else{
                                submenu.update = 1;
                            }

                            if(submenu.delete === false){
                                submenu.delete = 0;
                            }else{
                                submenu.delete = 1;
                            }

                            selectedWebAkses.push({
                                role_id: role_id,
                                menu_id: submenu.menu_id,
                                rprivilege_create: submenu.create,
                                rprivilege_update: submenu.update,
                                rprivilege_delete: submenu.delete,
                                rprivilege_read:1
                            });
                        }
                    }
                }
            }

            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "DEFAULT",
                    role_id: this.add_web_akses.role_id,
                    data: selectedWebAkses
                };

                let contentType = `application/x-www-form-urlencoded`;

                Services.PostData(
                ApiService,
                "Master/Privilege",
                mydata,
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
                    this.create_web_akses = response.data;
                    this.submitted = true;
                    this.save("add_web_akses");
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
            this.editedIndex = this.web_akses.indexOf(item)
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
                        role_id: item.role_id
                    };

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Master/Privilege',
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
                            this.delete_web_akses = response.data;
                            this.submitted = true;
                            this.web_akses.splice(this.deletedIndex, 1);
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
                this.add_web_akses.role_id = ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateData() {

        },

        save(formInput) {
            if (formInput == "add_web_akses") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.web_akses[this.editedIndex],
                    this.add_web_akses
                );
                } else {
                    this.web_akses.push(this.add_web_akses);
                }
            } else if (formInput == "edit_web_akses") {
                if (this.editedIndex > -1) {
                    Object.assign(this.web_akses[this.editedIndex], this.editedItem);
                } else {
                    this.web_akses.push(this.editedItem);
                }
            }
            this.close();
        },

        getSplitMenu(item){
            var data = item;
            return data.split(',').join('\n')
        },

        getDataMenu(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "COMBOBOX_MENU"
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Menu",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_menu = response.data;
                        this.sub_data_menu = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        async load() {
            Promise.all([
                await this.asyncAccess(),
                await this.getRoleUser(),
                await this.getDataMenu(),
                await this.getMasterUsers()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>