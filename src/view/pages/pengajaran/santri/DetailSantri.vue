<template>
    <div>
        <div
            class="col-md-12"
        >
            <div class="card card-custom card-stretch border border-primary">
            <div class="card-body pt-4">
                <!--begin::User-->
                <!-- <div class="card-toolbar">
                    <div class="d-flex">
                        <v-icon
                        @click="goBack"
                        style="cursor: pointer;"
                        color="#73a4ef">
                            mdi-arrow-left
                        </v-icon>
                    </div>
                </div> -->
                <div class="text-center mb-10">
                    <div class="symbol symbol-60 symbol-circle symbol-xl-120">
                        <div
                            class="symbol-label"
                            :style="{
                            backgroundImage: `url(${data_header.foto})`
                            }"
                        >
                        </div>
                    </div>
                    <h4 class="font-weight-bold my-2 text-uppercase">
                        {{ data_header.kode_santri }} - {{ data_header.nama_lengkap_santri }}
                    </h4>
                </div>
                <!--end::User-->
    
                <v-divider></v-divider>
    
                <!--begin::Nav-->
                <div
                class="navi navi-bold navi-hover navi-active navi-link-rounded d-flex row col-md-12 mx-auto"
                role="tablist"
                >
                <div class="navi-item mb-2 col-md-2">
                    <a
                    class="navi-link py-4 active"
                    @click="setActiveTab"
                    style="cursor:pointer"
                    data-tab="0"
                    data-toggle="tab"
                    role="tab"
                    aria-selected="false"
                    >
                    <span class="navi-icon mr-2">
                        <span class="svg-icon">
                        <i class="menu-icon flaticon2-user"><span></span></i>
                        </span>
                    </span>
                    <span class="navi-text font-size-lg font-size-h5">Data</span>
                    </a>
                </div>
                <div class="navi-item mb-2 col-md-2">
                    <a
                    class="navi-link py-4"
                    @click="setActiveTab"
                    style="cursor:pointer"
                    data-tab="1"
                    data-toggle="tab"
                    role="tab"
                    aria-selected="false"
                    >
                    <span class="navi-icon mr-2">
                        <i class="menu-icon flaticon2-checking"><span></span></i>
                    </span>
                    <span class="navi-text font-size-lg font-size-h5">Nilai</span>
                    </a>
                </div>
                <div class="navi-item mb-2 col-md-2">
                    <a
                    class="navi-link py-4"
                    @click="setActiveTab"
                    style="cursor:pointer"
                    data-tab="2"
                    data-toggle="tab"
                    role="tab"
                    aria-selected="false"
                    >
                    <span class="navi-icon mr-2">
                        <i class="menu-icon flaticon2-list-1"><span></span></i>
                    </span>
                    <span class="navi-text font-size-lg font-size-h5">KHS</span>
                    </a>
                </div>
                <div class="navi-item mb-2 col-md-2">
                    <a
                    class="navi-link py-4"
                    @click="setActiveTab"
                    style="cursor:pointer"
                    data-tab="3"
                    data-toggle="tab"
                    role="tab"
                    aria-selected="false"
                    >
                    <span class="navi-icon mr-2">
                        <i class="menu-icon flaticon2-list-1"><span></span></i>
                    </span>
                    <span class="navi-text font-size-lg font-size-h5">HSK</span>
                    </a>
                </div>
                <div class="navi-item mb-2 col-md-3">
                    <a
                    class="navi-link py-4"
                    @click="setActiveTab"
                    style="cursor:pointer"
                    data-tab="4"
                    data-toggle="tab"
                    role="tab"
                    aria-selected="false"
                    >
                    <span class="navi-icon mr-2">
                        <span class="svg-icon">
                            <i class="menu-icon flaticon2-layers"><span></span></i>
                        </span>
                    </span>
                    <span class="navi-text font-size-lg font-size-h5">Riwayat Sekolah</span>
                    </a>
                </div>
                </div>
                <v-divider></v-divider>
    
            </div>
            </div>
        </div>
        
        <!--begin::Content-->
        <div class="flex-row-fluid col-md-12">
            <b-tabs class="hide-tabs" v-model="tabIndex">
                <b-tab active>
                    <div class="card card-custom card-stretch border border-primary" v-show="accessList.R">
                        <div class="card-header border-0 pt-4">
                            <v-container>
                                <v-row>
                                    <v-col
                                        cols="12"
                                        md="6"
                                    >
                                        <v-text-field
                                            v-model="data_header.kode_santri"
                                            label="Kode Santri"
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
                                            v-model="data_header.nama_lengkap_santri"
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
                                            v-model="data_header.panggilan"
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
                                            v-model="data_header.hafalan_ziyadah"
                                            label="Hapalan Ziyadah"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="6"
                                    >
                                        <v-text-field
                                            v-model="data_header.hafalan_mutqin"
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
                                            v-model="data_header.tempat_lahir"
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
                                            v-model="data_header.tanggal_lahir"
                                            label="Tanggal Lahir"
                                            persistent-hint
                                            prepend-icon="mdi-calendar"
                                            v-bind="attrs"
                                            @blur="date = parseDate(data_header.tanggal_lahir)"
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
                                            v-model="data_header.jenis_kelamin"
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
                                        <v-text-field
                                            label="Anak Ke"
                                            v-model="data_header.anak_ke"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="6"
                                    >
                                        <v-text-field
                                            v-model="data_header.berat_badan"
                                            label="Berat Badan"
                                            required
                                            clearable
                                            color="#ee8b3d"
                                            type="number"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="6"
                                    >
                                        <v-text-field
                                            v-model="data_header.tinggi_badan"
                                            label="Tinggi Badan"
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
                                            v-model="data_header.email"
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
                                            v-model="data_header.alamat"
                                            label="Alamat"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="6"
                                    >
                                        <v-text-field
                                            v-model="data_header.hp_ortu"
                                            label="Nomor HP Ortu"
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
                                            v-model="data_header.nama_ayah"
                                            label="Nama Ayah"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="6"
                                    >
                                        <v-select
                                            v-model="data_header.status"
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
                                            v-model="data_header.nama_ibu"
                                            label="Nama Ibu"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <div class="d-flex justify-content-end">
                                <button
                                    @click="formSubmit"
                                    v-show="accessList.U"
                                    class="btn btn-primary btn-sm font-weight-bolder text-md-body-1 rounded-lg py-2 mb-3 mr-3 w-100px"
                                >
                                    Simpan
                                </button>
                                </div>
                            </v-container>
                        </div>
                    </div>

                    <div v-show="accessList.R == 0">
                        <div class="d-flex justify-content-center">
                            <img src="media/bg/access.png" alt="Jadwal Kelas Icon" width="35%">
                        </div>
                    </div>
                </b-tab>
        
                <b-tab>
                    <KTNilai v-bind:accessList="accessList"></KTNilai>
                </b-tab>
    
                <b-tab>
                    <KTKHS v-bind:accessList="accessList"></KTKHS>
                </b-tab>

                <b-tab>
                    <KTHSK v-bind:accessList="accessList"></KTHSK>
                </b-tab>
    
                <b-tab>
                    <KTRiwayat_Sekolah v-bind:accessList="accessList"></KTRiwayat_Sekolah>
                </b-tab>
            </b-tabs>
        </div>
        <!--end::Content-->
    </div>
</template>

<script>
import localStorage from "@/core/services/store/localStorage";
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import KTNilai from "@/view/pages/pengajaran/santri/Card/Nilai";
import KTKHS from "@/view/pages/pengajaran/santri/Card/KHS_Header";
import KTHSK from "@/view/pages/pengajaran/santri/Card/HSK_Header";
import KTRiwayat_Sekolah from "@/view/pages/pengajaran/santri/Card/Riwayat_Sekolah";
import Swal from 'sweetalert2'

export default {
    data(){
        return{
            Santri_Id: "",
            tabIndex: 0,
            data_header: [],
            progressBar: true,
            dropdown_jenkel: [
                { value: 'L', text: "Ikhwan" },
                { value: 'P', text: "Akhwat " },
            ],
            dropdown_status: [
                { value: 0, text: "Tidak Aktif" },
                { value: 1, text: "Aktif" },
            ],
            menu1: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            accessList: [],
            getPath: ""
        }
    },
    watch: {
        data_header(){
            this.progressBar = false
        },

        date (val) {
            this.data_header.tanggal_lahir = this.formatDate(this.date)
        },
    },
    mounted(){
        this.Santri_Id  = this.$route.query.id;
        var getData = (this.$router.currentRoute.path).split('/');
        this.getPath = getData[1];
        this.load()
    },
    components:{
        KTNilai,
        KTRiwayat_Sekolah,
        KTKHS,
        KTHSK
    },
    methods:{
        asyncAccess(){
            var menuUrl = ""
            if (this.getPath == 'carisantri') {
                menuUrl = "/carisantri";
            }else if(this.getPath == 'profil'){
                menuUrl = "/profil";
            }else {
                menuUrl = "/pengajaran/data_santri";
            }
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "READ_AKSES",
                    menu_url: menuUrl
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

        setActiveTab(event) {
            let target = event.target;
            if (!event.target.classList.contains("navi-link")) {
                target = event.target.closest(".navi-link");
            }
    
            const tab = target.closest('[role="tablist"]');
            const links = tab.querySelectorAll(".navi-link");
            // remove active tab links
            for (let i = 0; i < links.length; i++) {
                links[i].classList.remove("active");
            }
    
            // set clicked tab index to bootstrap tab
            this.tabIndex = parseInt(target.getAttribute("data-tab"));
    
            // set current active tab
            target.classList.add("active");
        },

        getMasterDataSantri(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "Read_Santri",
                    santri_id: this.Santri_Id
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Santri",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_header = response.data[0];
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        formSubmit() {
            return new Promise(resolve => {
                const formData = new FormData()
                formData.append("UID", localStorage.getLocalStorage("uid"))
                formData.append("Token", localStorage.getLocalStorage("token"))
                formData.append("Trigger", 'U')
                formData.append("Route", "DEFAULT")
                formData.append("santri_id", this.Santri_Id)
                formData.append("kode_santri", this.data_header.kode_santri)
                formData.append("nama_lengkap_santri", this.data_header.nama_lengkap_santri)
                formData.append("panggilan", this.data_header.panggilan)
                formData.append("hafalan_ziyadah", this.data_header.hafalan_ziyadah)
                formData.append("hafalan_mutqin", this.data_header.hafalan_mutqin)
                formData.append("tempat_lahir", this.data_header.tempat_lahir)
                formData.append("tanggal_lahir", this.data_header.tanggal_lahir)
                formData.append("jenis_kelamin", this.data_header.jenis_kelamin)
                formData.append("anak_ke", this.data_header.anak_ke)
                formData.append("berat_badan", this.data_header.berat_badan)
                formData.append("tinggi_badan", this.data_header.tinggi_badan)
                formData.append("email", this.data_header.email)
                formData.append("alamat", this.data_header.alamat)
                formData.append("hp_ortu", this.data_header.hp_ortu)
                formData.append("nama_ayah", this.data_header.nama_ayah)
                formData.append("nama_ibu", this.data_header.nama_ibu)

                let contentType = `application/x-www-form-urlencoded`;

                Services.PostData(
                    ApiService,
                    'Master/Santri',
                    formData,
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
                        this.getMasterDataSantri();
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        // goBack(){
        //     this.$router.push(
        //     {
        //         name: `pengajaran-data-santri`
        //     });
        // },

        async load() {
            Promise.all([
                await this.getMasterDataSantri(),
                await this.asyncAccess()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>