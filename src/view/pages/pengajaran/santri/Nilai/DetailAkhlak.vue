<template>
    <v-data-table responsive show-empty
        :headers="headers"
        :items="data_akhlak"
        :search="search"
        :loading="progressBar"
        loading-text="Loading... Please wait"
        :items-per-page="5"
        v-show="accessList.R"
        class="elevation-1 border border-primary card card-custom card-stretch border border-primary mt-5"
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
            <h5>{{ CustomMessage }}</h5>
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
                                    v-model="formInput.mapel_id"
                                    :items="master_data_mapel"
                                    item-text="mapel_nama"
                                    item-value="mapel_id"
                                    label="Mata Pelajaran"
                                    clearable
                                    color="#ee8b3d"
                                ></v-autocomplete>
                            </v-col>
                            <v-col
                                cols="12"
                                md="12"
                            >
                                <v-text-field
                                    v-model="formInput.praktek"
                                    label="Praktek"
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
    </v-data-table>
</template>

<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";
import { Fetch_R_Nilai_Akhlak } from "@/core/services/store/riwayatNilai.module";

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
            data_akhlak: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_data_akhlak: [],
            update_data_akhlak: [],
            delete_data_akhlak: [],
            add_data_akhlak: {
                mapel_id: "",
                praktek: "",
            },
            headers: [
                { 
                    text: 'Aspek', 
                    value: 'mapel_nama',
                    align: 'start',
                    sortable: false 
                },
                { 
                    text: 'Nilai', 
                    value: 'praktek',
                    align: 'start',
                    sortable: false 
                },
                { 
                    text: 'Predikat', 
                    value: 'predikat',
                    align: 'start',
                    sortable: false 
                },
                { 
                    text: 'Aksi', 
                    value: 'actions', 
                    align: 'center',
                    width: "120px",
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
            dataDetailCttn: "",
            dialogSeenBill: false,
            CustomMessage: ""
        }
    },

    watch: {
        idHeader(val){
            this.getDetailCache(val)
        },

        dialog (val) {
            val || this.close()
        },

        data_akhlak(){
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
            return this.editedIndex === -1 ? this.add_data_akhlak : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createAkhllak
                : this.updateAkhlak;
        },
        isDisabledSimpan(){
            return !this.formInput.mapel_id || !this.formInput.praktek
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
            var SantriId = this.Santri_Id;
            var TahunId  = idHeader;
            this.$store
                .dispatch(Fetch_R_Nilai_Akhlak, { SantriId, TahunId })
                .then((res) => {
                    this.CustomMessage = res.message_opt
                    this.data_akhlak = res.data
                })
                .catch((err) => err);
        },

        getMasterMapel(){
            this.master_data_mapel = this.$store.state.mMapel.master_mapel;
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

        createAkhllak(){
            return new Promise(resolve => {
                const currentDate = new Date();
                const day = currentDate.getDate().toString().padStart(2, '0'); // Mendapatkan hari (dd)
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Mendapatkan bulan (mm)
                const year = currentDate.getFullYear().toString(); // Mendapatkan tahun (yyyy)

                const formattedDate = `${day}-${month}-${year}`;

                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "DEFAULT",
                    santri_id: this.Santri_Id,
                    tahun_id: this.idHeader,
                    mapel_id: this.add_data_akhlak.mapel_id,
                    praktek: this.add_data_akhlak.praktek,
                    tanggal_nilai: formattedDate
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
                    this.create_data_akhlak = response.data;
                    this.submitted = true;
                    this.save("add_data_akhlak");
                    this.getDetailCache(this.idHeader);
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            this.editedIndex = this.data_akhlak.indexOf(item)
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
                            this.delete_data_akhlak = response.data;
                            this.submitted = true;
                            this.data_akhlak.splice(this.deletedIndex, 1);
                            this.getDetailCache(this.idHeader)
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
                this.add_data_akhlak.mapel_id = ""
                this.add_data_akhlak.uas = ""
                this.add_data_akhlak.uts= ""
                this.add_data_akhlak.tugas= ""
                this.add_data_akhlak.praktek= ""
                this.add_data_akhlak.keterangan_nilai= ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateAkhlak() {
            return new Promise(resolve => {
                const currentDate = new Date();
                const day = currentDate.getDate().toString().padStart(2, '0'); // Mendapatkan hari (dd)
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Mendapatkan bulan (mm)
                const year = currentDate.getFullYear().toString(); // Mendapatkan tahun (yyyy)

                const formattedDate = `${day}-${month}-${year}`;

                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "U",
                    Route: "DEFAULT",
                    santri_id: this.Santri_Id,
                    tahun_id: this.data_item.tahun_id,
                    nilai_id: this.data_item.nilai_id,
                    mapel_id: this.editedItem.mapel_id,
                    praktek: this.editedItem.praktek,
                    tanggal_nilai: formattedDate
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
                        this.update_data_akhlak = response.data;
                        this.submitted = true;
                        this.save("edit_data_akhlak");
                        this.getDetailCache(this.idHeader);
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_data_akhlak") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.data_akhlak[this.editedIndex],
                    this.add_data_akhlak
                );
                } else {
                    this.data_akhlak.push(this.add_data_akhlak);
                }
            } else if (formInput == "edit_data_akhlak") {
                if (this.editedIndex > -1) {
                    Object.assign(this.data_akhlak[this.editedIndex], this.editedItem);
                } else {
                    this.data_akhlak.push(this.editedItem);
                }
            }
            this.close();
        },

        seenFileBill(item) {
            this.dataDetailCttn = item.keterangan_nilai
            this.dialogSeenBill = true;
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