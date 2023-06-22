<template>
    <div class="container-fluid col-md-10">
        <div class="card mt-4 shadow-xs cardHover mb-5">
            <div class="d-block px-3 py-3" data-toggle="collapse" style="background-color: #FFF;"
                role="button" aria-expanded="true" v-b-toggle.collapse-2 variant="primary">
                <div class="card-toolbar">
                <div class="d-flex">
                    <v-icon
                    color="#73a4ef">
                        mdi-account-search
                    </v-icon>
                    <h6 class="font-weight-bold font-weight-black mt-2 ml-2">CARI DATA PENGAJAR</h6>
                </div>
                </div>
            </div>
        </div>

        <v-card>
            <v-card-actions>
                <v-row>
                    <v-col cols="12" md="6">
                        <button
                            @click="formSubmit"
                            class="btn btn-primary font-weight-bolder text-md-body-1 rounded-lg py-2 col-md-12 mt-5"
                        >
                            Cari
                        </button>
                    </v-col>
                    <v-col cols="12" md="6">
                        <button
                            type="button"
                            @click="reset"
                            class="btn btn-light-primary font-weight-bolder text-md-body-1 rounded-lg py-2 col-md-12 mt-5"
                        >
                            Reset
                        </button>
                    </v-col>
                </v-row>
            </v-card-actions>
            <v-card-text>
                <v-container>
                    <form method="post" autocomplete="off">
                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.nip"
                                    label="NIP"
                                    required
                                    clearable
                                    type="number"
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.nama_lengkap"
                                    label="Nama Lengkap"
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
                                    v-model="formInput.panggilan"
                                    label="Nama Panggilan"
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
                                    v-model="formInput.hafalan_mutqin"
                                    label="Hapalan Mutqin"
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.tempat_lahir"
                                    label="Tempat Lahir"
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
                                    label="Tanggal Lahir"
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
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                    v-model="formInput.jenis_kelamin"
                                    :items="dropdown_jenkel"
                                    item-text="text"
                                    item-value="value"
                                    label="Jenis Kelamin"
                                    clearable
                                    color="#ee8b3d"
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-select
                                    v-model="formInput.status_nikah"
                                    :items="dropdown_status_nikah"
                                    item-text="text"
                                    item-value="value"
                                    label="Status Nikah"
                                    clearable
                                    color="#ee8b3d"
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.email"
                                    label="Email"
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="formInput.alamat"
                                    label="Alamat"
                                    clearable
                                    color="#ee8b3d"
                                ></v-text-field>
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
                        </v-row>
                    </form>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-row>
                    <v-col cols="12" md="6">
                        <button
                            @click="formSubmit"
                            class="btn btn-primary font-weight-bolder text-md-body-1 rounded-lg py-2 col-md-12 mb-7"
                        >
                            Cari
                        </button>
                    </v-col>
                    <v-col cols="12" md="6">
                        <button
                            type="button"
                            @click="reset"
                            class="btn btn-light-primary font-weight-bolder text-md-body-1 rounded-lg py-2 col-md-12 mb-7"
                        >
                            Reset
                        </button>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { formatDate } from "@/helpers/helper.js";

export default {
    name: "formSearchSantri",
    data(){
        return{
            formInput: {
                nip: "",
                nama_lengkap: "",
                panggilan: "",
                hafalan_mutqin: "",
                tempat_lahir: "",
                tanggal_lahir: "",
                jenis_kelamin: "",
                status_nikah: "",
                email: "",
                alamat: "",
                status: ""
            },
            dropdown_jenkel: [
                { value: 'L', text: "Laki-laki" },
                { value: 'P', text: "Perempuan" },
            ],
            dropdown_status: [
                { value: 0, text: "Tidak Aktif" },
                { value: 1, text: "Aktif" },
            ],
            dropdown_status_nikah: [
                { value: 'B', text: "Belum Kawin" },
                { value: 'K', text: "Kawin" },
                { value: 'D', text: "Duda" },
                { value: 'J', text: "Janda" }
            ],
            menu1: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateFormatted: "",
        }
    },
    watch: {
        date (val) {
            this.dateFormatted = this.formatDate(this.date)
        },
    },
    methods: {
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },

        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },

        formSubmit(){
            this.$router.push(
            {
                name: `resultpengajar`,
                params: {data: this.formInput, tgl: this.dateFormatted} 
            });
        },
        reset(){
            this.formInput.kode_santri = ""
            this.formInput.nama_lengkap_santri = ""
            this.formInput.panggilan = ""
            this.formInput.hafalan_ziyadah = ""
            this.formInput.hafalan_mutqin = ""
            this.formInput.tempat_lahir = ""
            this.formInput.jenis_kelamin = ""
            this.formInput.anak_ke = ""
            this.formInput.email = ""
            this.formInput.alamat = ""
            this.formInput.hp_ortu = ""
            this.formInput.nama_ayah = ""
            this.formInput.nama_ibu = ""
            this.formInput.status = ""
            this.dateFormatted = ""
        },
    }
}
</script>