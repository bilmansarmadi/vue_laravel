<template>
    <v-data-table responsive show-empty
        :headers="headers"
        :items="data_nasihat"
        :search="search"
        loading-text="Loading... Please wait"
        :items-per-page="5"
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
    </v-data-table>
</template>

<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";
import { formatDate } from "@/helpers/helper.js";

export default {
    name: "khs-nasihat",
    mounted() {
        this.Santri_Id  = this.$route.query.id;
    },

    created() {
        this.$parent.$on("update-khs-nasihat", this.updateKhsNasihat);
    },

    // destroyed() {
    //     this.$parent.$off("update-khs-nasihat", this.updateKhsNasihat);
    // },

    props: {
        idHeader: {
            type: [String, Number],
            required: false,
            default: ''
        }
    },

    data(){
        return {
            Santri_Id: "",
            data_nasihat: [],
            search: '',
            progressBar: true,
            headers: [
                { 
                    text: 'Nasihat', 
                    value: 'nasihat',
                    align: 'start',
                    sortable: false 
                }
            ]
        }
    },

    watch: {
        // idHeader(val){
        //     this.getDetailCache(val)
        // },
        
        data_nasihat(){
            this.progressBar = false
        },
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_data_nasihat : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createDetailNasihat
                : this.updateDetailNasihat;
        },
        isDisabledSimpan(){
            return !this.formInput.nasihat
        }
    },

    methods:{
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}-${month}-${year}`
        },

        updateKhsNasihat(idHeader) {
            this.getMasterRiwayatNilai(idHeader);
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
                    Route: "DEFAULT",
                    santri_id: this.Santri_Id,
                    tahun_id: idHeader
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Riwayat/Riwayat_Nasihat",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_nasihat = response.data;
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

        createDetailNasihat(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "C",
                    Route: "DEFAULT",
                    santri_id: this.Santri_Id,
                    tahun_id: this.idHeader,
                    nasihat: this.add_data_nasihat.nasihat
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                ApiService,
                "Riwayat/Riwayat_Nasihat",
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
                    this.create_data_nasihat = response.data;
                    this.submitted = true;
                    this.save("add_data_nasihat");
                    this.getMasterRiwayatNilai(this.idHeader);
                },
                err => {
                    err;
                }
                );
            });
        },

        editItem (item) {
            this.editedIndex = this.data_nasihat.indexOf(item)
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
                        nasihat_id: item.nasihat_id
                    };

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Riwayat/Riwayat_Nasihat',
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
                            this.delete_data_nasihat = response.data;
                            this.submitted = true;
                            this.data_nasihat.splice(this.deletedIndex, 1);
                            this.getMasterRiwayatNilai(this.idHeader);
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
                this.add_data_nasihat.nasihat = ""
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        updateDetailNasihat() {
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "U",
                    Route: "DEFAULT",
                    nasihat_id: this.data_item.nasihat_id,
                    tahun_id: this.data_item.tahun_id,
                    santri_id: this.Santri_Id,
                    nasihat: this.editedItem.nasihat
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    'Riwayat/Riwayat_Nasihat',
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
                        this.update_data_nasihat = response.data;
                        this.submitted = true;
                        this.save("edit_data_nasihat");
                        this.getMasterRiwayatNilai(this.idHeader);
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        save(formInput) {
            if (formInput == "add_data_nasihat") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.data_nasihat[this.editedIndex],
                    this.add_data_nasihat
                );
                } else {
                    this.data_nasihat.push(this.add_data_nasihat);
                }
            } else if (formInput == "edit_data_nasihat") {
                if (this.editedIndex > -1) {
                    Object.assign(this.data_nasihat[this.editedIndex], this.editedItem);
                } else {
                    this.data_nasihat.push(this.editedItem);
                }
            }
            this.close();
        }
    }
}
</script>