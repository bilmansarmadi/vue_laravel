<template>
    <div>
        <v-data-table responsive show-empty
            :headers="headers"
            :items="riwayat_sekolah"
            :search="search"
            loading-text="Loading... Please wait"
            :items-per-page="5"
            item-key="r_pendidikan_id"
            v-show="accessList.R"
            class="elevation-1 border border-primary card card-custom card-stretch border border-primary"
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
                                        v-model="formInput.tingkat"
                                        label="Tingkat"
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
                                        v-model="formInput.nama_sekolah"
                                        label="Nama Sekolah"
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
                                      v-model="menu"
                                      :close-on-content-click="false"
                                      :return-value.sync="date"
                                      transition="scale-transition"
                                      offset-y
                                      max-width="290px"
                                      min-width="auto"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                          v-model="formInput.tahun_masuk"
                                          label="Tahun Masuk"
                                          prepend-icon="mdi-calendar"
                                          readonly
                                          v-bind="attrs"
                                          v-on="on"
                                          required
                                        ></v-text-field>
                                      </template>
                                        <v-date-picker
                                            v-model="formInput.tahun_masuk"
                                            reactive
                                            no-title
                                            scrollable
                                            :active-picker.sync="activePicker"
                                            :max="new Date().toISOString().substr(0, 10)"
                                            min="1900-01-01"
                                            @click:year="saveYear(formInput.tahun_masuk)"
                                        >
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
    
                                <v-col
                                      cols="12"
                                      md="6"
                                  >
                                    <v-menu
                                      ref="menu2"
                                      v-model="menu2"
                                      :close-on-content-click="false"
                                      :return-value.sync="date2"
                                      transition="scale-transition"
                                      offset-y
                                      max-width="290px"
                                      min-width="auto"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                          v-model="formInput.tahun_lulus"
                                          label="Tahun Lulus"
                                          prepend-icon="mdi-calendar"
                                          readonly
                                          v-bind="attrs"
                                          v-on="on"
                                          required
                                        ></v-text-field>
                                      </template>
                                        <v-date-picker
                                            v-model="formInput.tahun_lulus"
                                            reactive
                                            no-title
                                            scrollable
                                            :active-picker.sync="activePicker2"
                                            :max="new Date().toISOString().substr(0, 10)"
                                            min="1900-01-01"
                                            @click:year="saveYears(formInput.tahun_lulus)"
                                        >
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-select
                                        v-model="formInput.status_sekolah"
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
                                    <v-textarea
                                        v-model="formInput.alamat_riwayat"
                                        label="Alamat Sekolah"
                                        required
                                        clearable
                                        color="#ee8b3d"
                                        rows="1"
                                    ></v-textarea>
                                </v-col>
                                <v-col
                                    cols="12"
                                    md="6"
                                >
                                    <v-textarea
                                        v-model="formInput.keterangan_riwayat"
                                        label="Keterangan"
                                        required
                                        clearable
                                        color="#ee8b3d"
                                        rows="1"
                                    ></v-textarea>
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
    mounted() {
        this.Santri_Id  = this.$route.query.id;
        this.load();
    },

    data(){
        return {
            Santri_Id: "",
            riwayat_sekolah: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_riwayat_sekolah: [],
            update_riwayat_sekolah: [],
            delete_riwayat_sekolah: [],
            add_riwayat_sekolah: {
                tingkat: "",
                nama_sekolah: "",
                tahun_masuk: "",
                tahun_lulus: "",
                status_sekolah: "",
                alamat_riwayat: "",
                keterangan_riwayat: ""
            },
            headers: [
                { 
                    text: 'Tingkat', 
                    value: 'tingkat',
                    align: 'center',
                    width: "80px",
                    sortable: false 
                },
                { 
                    text: 'Nama Sekolah', 
                    value: 'nama_sekolah',
                    align: 'start',
                    width: "130px",
                    sortable: false 
                },
                { 
                    text: 'Tahun Masuk', 
                    value: 'tahun_masuk',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Tahun Lulus', 
                    value: 'tahun_lulus',
                    align: 'center',
                    width: "80px",
                    sortable: false 
                },
                { 
                    text: 'Status Sekolah', 
                    value: 'status_sekolah_nama',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Alamat Sekolah', 
                    value: 'alamat_riwayat',
                    align: 'start',
                    width: "170px",
                    sortable: false 
                },
                { 
                    text: 'Keterangan', 
                    value: 'keterangan_riwayat',
                    align: 'start',
                    width: "170px",
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
            activePicker: 'YEAR',
            activePicker2: 'YEAR',
            date: '',
            date2: '',
            year: '',
            year2: '',
            menu: '',
            menu2: '',
            dropdown_status: [
                { value: 1, text: "Negeri" },
                { value: 0, text: "Swasta" },
            ],
        }
    },

    props: {
        accessList: {
            required: false,
            default: () => []
        }
    },

    watch: {
        dialog (val) {
            val || this.close()
        },

        riwayat_sekolah(){
            this.progressBar = false
        },

        menu (val) {
            val && setTimeout(()=>(this.activePicker = 'YEAR'))
        },

        menu2 (val) {
            val && setTimeout(()=>(this.activePicker2 = 'YEAR'))
        },
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_riwayat_sekolah : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createRiwayat
                : this.updateKurikulum;
        },
        isDisabledSimpan(){
            return !this.formInput.tingkat || !this.formInput.nama_sekolah
            || !this.formInput.tahun_lulus || !this.formInput.tahun_masuk
        }
    },

    methods:{
        getMasterRiwayat(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "READ_RDIK_SANTRI",
                    santri_id: this.Santri_Id
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Riwayat/Riwayat_Pendidikan_Santri",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.riwayat_sekolah = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        createRiwayat(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "DEFAULT",
                    santri_id: this.Santri_Id,
                    tingkat: this.add_riwayat_sekolah.tingkat,
                    nama_sekolah: this.add_riwayat_sekolah.nama_sekolah,
                    tahun_lulus: this.add_riwayat_sekolah.tahun_lulus,
                    tahun_masuk: this.add_riwayat_sekolah.tahun_masuk,
                    status_sekolah: this.add_riwayat_sekolah.status_sekolah,
                    alamat_riwayat: this.add_riwayat_sekolah.alamat_riwayat,
                    keterangan_riwayat: this.add_riwayat_sekolah.keterangan_riwayat,
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                ApiService,
                "Riwayat/Riwayat_Pendidikan_Santri",
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
                    this.create_riwayat_sekolah = response.data;
                    this.submitted = true;
                    this.save("add_riwayat_sekolah");
                    this.getMasterRiwayat();
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            this.editedIndex = this.riwayat_sekolah.indexOf(item)
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
                        r_pendidikan_id: item.r_pendidikan_id
                    };

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Riwayat/Riwayat_Pendidikan_Santri',
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
                            this.delete_riwayat_sekolah = response.data;
                            this.submitted = true;
                            this.riwayat_sekolah.splice(this.deletedIndex, 1);
                            this.getMasterRiwayat()
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
                this.add_riwayat_sekolah.status_sekolah = ""
                this.add_riwayat_sekolah.alamat_riwayat = ""
                this.add_riwayat_sekolah.keterangan_riwayat = ""
                this.add_riwayat_sekolah.nama_sekolah = ""
                this.add_riwayat_sekolah.tahun_lulus = ""
                this.add_riwayat_sekolah.tahun_masuk = ""
                this.add_riwayat_sekolah.tingkat = ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateKurikulum() {
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "U",
                    Route: "DEFAULT",
                    r_pendidikan_id: this.data_item.r_pendidikan_id,
                    santri_id: this.Santri_Id,
                    tingkat: this.editedItem.tingkat,
                    nama_sekolah: this.editedItem.nama_sekolah,
                    tahun_lulus: this.editedItem.tahun_lulus,
                    tahun_masuk: this.editedItem.tahun_masuk,
                    status_sekolah: this.editedItem.status_sekolah,
                    alamat_riwayat: this.editedItem.alamat_riwayat,
                    keterangan_riwayat: this.editedItem.keterangan_riwayat,
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    'Riwayat/Riwayat_Pendidikan_Santri',
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
                        this.update_riwayat_sekolah = response.data;
                        this.submitted = true;
                        this.save("edit_riwayat_sekolah");
                        this.getMasterRiwayat();
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_riwayat_sekolah") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.riwayat_sekolah[this.editedIndex],
                    this.add_riwayat_sekolah
                );
                } else {
                    this.riwayat_sekolah.push(this.add_riwayat_sekolah);
                }
            } else if (formInput == "edit_riwayat_sekolah") {
                if (this.editedIndex > -1) {
                    Object.assign(this.riwayat_sekolah[this.editedIndex], this.editedItem);
                } else {
                    this.riwayat_sekolah.push(this.editedItem);
                }
            }
            this.close();
        },

        saveYear(year) {
            this.formInput.tahun_masuk = year.slice(0,4)
            this.$refs.menu.save(year)
            this.menu = false
        },

        saveYears(year) {
            this.formInput.tahun_lulus = year.slice(0,4)
            this.$refs.menu2.save(year)
            this.menu2 = false
        },

        async load() {
            Promise.all([
                await this.getMasterRiwayat()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>