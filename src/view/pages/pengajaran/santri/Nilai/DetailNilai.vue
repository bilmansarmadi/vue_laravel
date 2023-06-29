<template>
    <v-data-table responsive show-empty
        :headers="headers"
        :items="data_nilai"
        :search="search"
        loading-text="Loading... Please wait"
        :items-per-page="5"
        v-show="accessList.R"
        class="elevation-1 border border-primary card card-custom card-stretch border border-primary mt-8 mb-8"
        group-by="Kurikulum"
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
                </v-card-title>
    
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-autocomplete
                                    v-model="formInput.mapel_id"
                                    :items="master_data_mapel"
                                    item-text="mapel_nama"
                                    item-value="mapel_id"
                                    label="Aspek/Mata Pelajaran"
                                    clearable
                                    color="#ee8b3d"
                                ></v-autocomplete>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.nilai"
                                    label="Nilai"
                                    :rules="rulesNotNull"
                                    required
                                    type="number"
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                    v-model="formInput.tipe_nilai"
                                    :items="dropdown_tipe_nilai"
                                    item-text="text"
                                    item-value="value"
                                    label="Tipe"
                                    clearable
                                    color="#ee8b3d"
                                ></v-select>
                            </v-col>
                            <v-col
                            cols="12"
                            md="6"
                            >
                                <v-menu
                                    ref="menu1"
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="dateFormatted"
                                        label="Tanggal Nilai"
                                        persistent-hint
                                        prepend-icon="mdi-calendar"
                                        v-bind="attrs"
                                        @blur="date = parseDate(dateFormatted)"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="date"
                                    no-title
                                    @input="menu1 = false"
                                    ></v-date-picker>
                                </v-menu>
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
</template>

<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";
import { formatDate } from "@/helpers/helper.js";

export default {
    mounted() {
        this.Santri_Id  = this.$route.query.id;
        this.load();
    },

    props: {
        idHeader: {
            type: [String, Number],
            required: false,
            default: ''
        },
        accessList: {
            required: false,
            default: () => []
        }
    },

    data(){
        return {
            Santri_Id: "",
            data_nilai: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_data_nilai: [],
            update_data_nilai: [],
            delete_data_nilai: [],
            add_data_nilai: {
                mapel_id: "",
                nilai: "",
                tipe_nilai: ""
            },
            dropdown_tipe_nilai: [
                { value: "Tugas", text: "Tugas" },
                { value: "UTS", text: "UTS" },
                { value: "UAS", text: "UAS" },
            ],
            headers: [
                { 
                    text: 'Kurikulum', 
                    value: 'Kurikulum',
                    align: 'start',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Aspek/Mata Pelajaran', 
                    value: 'mapel_nama',
                    align: 'start',
                    width: "200px",
                    sortable: false 
                },
                { 
                    text: 'Nilai', 
                    value: 'nilai',
                    align: 'center',
                    width: "80px",
                    sortable: false 
                },
                { 
                    text: 'Tipe', 
                    value: 'tipe_nilai',
                    align: 'center',
                    width: "80px",
                    sortable: false 
                },
                { 
                    text: 'Tanggal', 
                    value: 'tanggal_nilai',
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
            master_data_mapel: [],
            menu1: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateFormatted: "",
        }
    },

    watch: {
        idHeader(val){
            this.getDetailCache(val)
        },

        dialog (val) {
            val || this.close()
        },

        data_nilai(){
            this.progressBar = false
        },

        date (val) {
            this.dateFormatted = this.formatDate(this.date)
        },
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_data_nilai : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createTahunAjaran
                : this.updateTahunAjaran;
        },
        isDisabledSimpan(){
            return !this.formInput.mapel_id || !this.formInput.nilai
            || !this.formInput.tipe_nilai || !this.dateFormatted
        }
    },

    methods:{
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}-${month}-${year}`
        },

        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },

        getMasterRiwayatNilai(idHeader){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "READ_RIWAYAT_NILAI",
                    santri_id: this.Santri_Id,
                    tahun_id: idHeader
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Riwayat/Riwayat_Nilai",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_nilai = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        getMasterMapel(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "COMBOBOX_MAPEL"
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
                        this.master_data_mapel = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        async getDetailCache(idHeader) {
            Promise.all([
                await this.getMasterRiwayatNilai(idHeader)
            ])
            .then(async (results) => {
                this.progressBar = false
                results
            })
        },

        createTahunAjaran(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "DEFAULT",
                    santri_id: this.Santri_Id,
                    tahun_id: this.idHeader,
                    tipe_nilai: this.add_data_nilai.tipe_nilai,
                    nilai: this.add_data_nilai.nilai,
                    tanggal_nilai: this.dateFormatted,
                    mapel_id: this.add_data_nilai.mapel_id
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                ApiService,
                "Riwayat/Riwayat_Nilai",
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
                    this.create_data_nilai = response.data;
                    this.submitted = true;
                    this.save("add_data_nilai");
                    this.getMasterRiwayatNilai(this.idHeader);
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            console.log(item);
            this.editedIndex = this.data_nilai.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dateFormatted = item.tanggal_nilai
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
                        nilai_id: item.nilai_id
                    };

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Riwayat/Riwayat_Nilai',
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
                            this.delete_data_nilai = response.data;
                            this.submitted = true;
                            this.data_nilai.splice(this.deletedIndex, 1);
                            this.getMasterRiwayatNilai(this.idHeader)
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
                this.add_data_nilai.mapel_id = ""
                this.add_data_nilai.nilai = ""
                this.add_data_nilai.tipe_nilai = ""
                this.dateFormatted = ""
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
                    nilai_id: this.data_item.nilai_id,
                    tahun_id: this.data_item.tahun_id,
                    santri_id: this.Santri_Id,
                    tipe_nilai: this.editedItem.tipe_nilai,
                    nilai: this.editedItem.nilai,
                    tanggal_nilai: this.dateFormatted,
                    mapel_id: this.editedItem.mapel_id
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    'Riwayat/Riwayat_Nilai',
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
                        this.update_data_nilai = response.data;
                        this.submitted = true;
                        this.save("edit_data_nilai");
                        this.getMasterRiwayatNilai(this.idHeader);
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_data_nilai") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.data_nilai[this.editedIndex],
                    this.add_data_nilai
                );
                } else {
                    this.data_nilai.push(this.add_data_nilai);
                }
            } else if (formInput == "edit_data_nilai") {
                if (this.editedIndex > -1) {
                    Object.assign(this.data_nilai[this.editedIndex], this.editedItem);
                } else {
                    this.data_nilai.push(this.editedItem);
                }
            }
            this.close();
        },

        async load() {
            Promise.all([
                await this.getMasterMapel()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>