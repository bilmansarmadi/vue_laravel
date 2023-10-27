<template>
    <div>
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
                <div class="navi-item mb-2 col-md-3">
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
                <div class="navi-item mb-2 col-md-3">
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
                <!-- <div class="navi-item mb-2 col-md-2">
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
                </div> -->
                <div class="navi-item mb-2 col-md-3">
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
        
        
        <div class="flex-row-fluid mt-5">
            <b-tabs class="hide-tabs" v-model="tabIndex">
                <b-tab active>
                    <div class="card card-custom card-stretch border border-primary" v-show="accessList.R">
                        <div class="card-header border-0 pt-4">
                        <!--begin::Content-->
                            <v-container>
                                <div class="d-flex justify-content-end mt-5 mb-5">
                                    <b-dropdown
                                        block
                                        variant="primary"
                                        class="m-2 font-weight-bold rounded-lg"
                                        text="Export">
                                        <b-dropdown-item @click="exportToFile()">PDF</b-dropdown-item>
                                        <b-dropdown-item @click="exportToWord()">Word</b-dropdown-item>
                                    </b-dropdown>
                                </div>
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
                                    <v-col
                                        cols="12"
                                        md="6"
                                    >
                                        <v-select
                                            v-model="data_header.program_pondok"
                                            :items="dropdown_program"
                                            item-text="text"
                                            item-value="value"
                                            label="Program Pondok"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-select>
                                    </v-col>
                                    <v-col
                                    cols="12"
                                    md="6"
                                    >
                                    <v-menu
                                        ref="menu2"
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="data_header.masuk_pondok"
                                            label="Masuk Pondok"
                                            persistent-hint
                                            prepend-icon="mdi-calendar"
                                            v-bind="attrs"
                                            @blur="dateProgram = parseDate(data_header.masuk_pondok)"
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="dateProgram"
                                        no-title
                                        @input="menu2 = false"
                                        ></v-date-picker>
                                    </v-menu>
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
    
                <!-- <b-tab>
                    <KTKHS v-bind:accessList="accessList"></KTKHS>
                </b-tab>

                <b-tab>
                    <KTHSK v-bind:accessList="accessList"></KTHSK>
                </b-tab> -->
    
                <b-tab>
                    <KTRiwayat_Sekolah v-bind:accessList="accessList"></KTRiwayat_Sekolah>
                </b-tab>
            </b-tabs>
        </div>
        <!--end::Content-->
                <!-- PDF ALL Session -->
                <template>
                    <vue-html2pdf
                        :show-layout="false"
                        :float-layout="true"
                        :enable-download="false"
                        :preview-modal="false"
                        :paginate-elements-by-height="1400"
                        :pdf-quality="3"
                        :filename="`Biodata Santri ${data_header.nama_lengkap_santri}`"
                        :manual-pagination="true"
                        :html-to-pdf-options="htmlToPdfAllOptions"
                        pdf-content-width="100%"
                        @progress="onProgress($event)"
                        @hasStartedGeneration="hasStartedGeneration()"
                        @hasGenerated="hasGenerated($event)"
                        @beforeDownload="beforeDownload($event)"
                        @hasDownloaded="hasDownloaded($event)"
                        ref="html2PdfAll"
                    >
                    <pdf-content slot="pdf-content">
                        <section class="pdf-item">
                            <div style="font-family: 'Times New Roman', Times, serif;color: black;">
                                <p style="font-size: 12pt;font-weight: bold;margin-top: 150px;text-transform: uppercase;text-align: center;">FORMULIR BIODATA SANTRI</p>
                                <table width="100%" style="font-size: 9;">
                                    <tr>
                                        <td width="100%" align="center">
                                            <table width="80%" style="">
                                                <tr>
                                                    <td width="10%" style="font-size: 11pt;font-weight: bold;text-align: left;">A.	DATA PRIBADI</td>
                                                    <td width="14%"></td>
                                                    <td width="4%" :rowspan="9" style="vertical-align: top;"><img :src="data_header.foto" alt="Foto" class="smallImage"></td>
                                                </tr>
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">1. Nama Santri</td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.nama_lengkap_santri }}</td>
                                                </tr>                    
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">2. Nama Panggilan</td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.panggilan }}</td>
                                                </tr>
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">3. Tempat dan Tanggal Lahir</td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.tempat_lahir }}, {{ data_header.tanggal_lahir     }}</td>
                                                </tr>
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">4. Anak Ke -...... dari... </td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.anak_ke }}</td>
                                                </tr>
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">5. Alamat Asal (Lengkap) </td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.alamat }}</td>
                                                </tr>
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">6.	Berat Badan & Tinggi Badan  </td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.berat_badan }} KG, {{ data_header.tinggi_badan }} CM</td>
                                                </tr>
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">7.	No. HP Orang Tua  </td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.hp_ortu }}</td>
                                                </tr>
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">8.	Nama Ayah Kandung  </td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.nama_ayah }}</td>
                                                </tr>                    
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">9.	Nama Ibu Kandung  </td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.nama_ibu }}</td>
                                                </tr>                   
                                            </table>
                                            <br>
                                            <table width="80%" style="">
                                                <tr>
                                                    <td width="10%" style="font-size: 11pt;font-weight: bold;text-align: left;">B. Data Riwayat</td>
                                                </tr>
                                                <tr>
                                                    <td width="10%" style="font-size: 11pt;text-align: left;">1. Pendidikan Formal</td>
                                                </tr>                   
                                            </table>
                                            <table width="80%" style="" border="1px">
                                                <thead>
                                                    <tr>
                                                        <td width="10%" :rowspan="2" style="font-size: 11pt;font-weight: bold;">Tingkat</td>
                                                        <td width="15%" :rowspan="2" style="font-size: 11pt;font-weight: bold;">Nama Sekolah</td>
                                                        <td width="10%" :colspan="2" style="font-size: 11pt;font-weight: bold;">Tahun</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="10%" style="font-size: 11pt;font-weight: bold;">Masuk</td>
                                                        <td width="10%" style="font-size: 11pt;font-weight: bold;">Lulus</td>
                                                    </tr>                   
                                                </thead>
                                                <tbody v-for="(item, i) in data_pendidikan">
                                                    <tr v-if="item.status_sekolah !== 0">
                                                        <td style="font-size: 11pt;">{{ item.tingkat }}</td>
                                                        <td style="font-size: 11pt;text-align: left;">{{ item.nama_sekolah }}</td>
                                                        <td style="font-size: 11pt;">{{ item.tahun_masuk }}</td>
                                                        <td style="font-size: 11pt;">{{ item.tahun_lulus }}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                            <br>
                                            <table width="80%" style="">
                                                <tr>
                                                    <td width="10%" style="font-size: 11pt;text-align: left;">2. Pendidikan Pesantren</td>
                                                </tr>                   
                                            </table>
                                            <table width="80%" style="" border="1px">
                                                <thead>
                                                    <tr>
                                                        <td width="10%" :rowspan="2" style="font-size: 11pt;font-weight: bold;">Tingkat</td>
                                                        <td width="15%" :rowspan="2" style="font-size: 11pt;font-weight: bold;">Nama Sekolah</td>
                                                        <td width="10%" :colspan="2" style="font-size: 11pt;font-weight: bold;">Tahun</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="10%" style="font-size: 11pt;font-weight: bold;">Masuk</td>
                                                        <td width="10%" style="font-size: 11pt;font-weight: bold;">Lulus</td>
                                                    </tr>                   
                                                </thead>
                                                <tbody v-for="(item, i) in data_pendidikan">
                                                    <tr v-if="item.status_sekolah === 0">
                                                        <td style="font-size: 11pt;">{{ item.tingkat }}</td>
                                                        <td style="font-size: 11pt;text-align: left;">{{ item.nama_sekolah }}</td>
                                                        <td style="font-size: 11pt;">{{ item.tahun_masuk }}</td>
                                                        <td style="font-size: 11pt;">{{ item.tahun_lulus }}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                            <br>
                                            <table width="80%" style="">
                                                <tr>
                                                    <td width="10%" style="font-size: 11pt;font-weight: bold;text-align: left;">C.PROGRAM TAHFIDZ</td>
                                                    <td width="14%"></td>
                                                </tr>
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">1. Kode Santri</td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.kode_santri }}</td>
                                                </tr>
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">2. Program Pondok</td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.program_pondok_Nama }}</td>
                                                </tr>
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">3. Masuk Pondok</td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.masuk_pondok }}</td>
                                                </tr>
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">4. Hafalan Ziyadah</td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.hafalan_ziyadah }}</td>
                                                </tr>
                                                <tr>
                                                    <td width="10%" style="text-align: left;font-size: 11pt;">5. Hafalan Mutqin</td>
                                                    <td width="14%" style="text-align: left;font-size: 11pt;">: {{ data_header.hafalan_mutqin }}</td>
                                                </tr>                  
                                            </table>
                                        </td>
                                        
                                    </tr>
                                </table>
                                <br>
                            </div>
                        </section>
                    </pdf-content>
                    </vue-html2pdf>
        </template>
        <!-- END PDF ALL Session -->
    </div>
</template>
<style>
.forPdf table {
    border-collapse: collapse;
    border-color: black;
}

.smallImage {
    max-width: 100px;
    height: auto;  /* mempertahankan aspek rasio */
}

.center-table {
            margin: 0 auto; 
        }

.forPdf th, td {
    padding: 4px;
}

.forNoBorder td{
    padding: 1px;
}

.pageBreak {
  page-break-before: always;
  padding-top: 250px;
}

</style>

<script>
import localStorage from "@/core/services/store/localStorage";
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import KTNilai from "@/view/pages/pengajaran/santri/Card/Nilai";
// import KTKHS from "@/view/pages/pengajaran/santri/Card/KHS_Header";
// import KTHSK from "@/view/pages/pengajaran/santri/Card/HSK_Header";
import KTRiwayat_Sekolah from "@/view/pages/pengajaran/santri/Card/Riwayat_Sekolah";
import Swal from 'sweetalert2'
import VueHtml2pdf from "vue-html2pdf";
import { Fetch_R_Santri, Fetch_R_Pendidikan } from "@/core/services/store/rhSantri.module";

export default {
    data(){
        return{
            Santri_Id: "",
            tabIndex: 0,
            logoPath: 'http://localhost:1907/media/logos/LogoAlJazary.png',
            data_header: [],
            data_pendidikan: [],
            progressBar: true,
            dropdown_jenkel: [
                { value: 'L', text: "Ikhwan" },
                { value: 'P', text: "Akhwat " },
            ],
            dropdown_status: [
                { value: 0, text: "Tidak Aktif" },
                { value: 1, text: "Aktif" },
            ],
            dropdown_program: [
                { value: 0, text: "Non Reguler" },
                { value: 1, text: "Reguler" },
            ],
            menu2: false,
            menu1: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateProgram: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            accessList: [],
            getPath: "",
            htmlToPdfAllOptions: {
                margin: [1.4, 0.7, 1.4, 0.7],
                image: {
                    type: 'jpeg', 
                    quality: 1
                },
                filename: "KHS",
                html2canvas: {
                    dpi: 192,
                    scale:4,
                    letterRendering: true,
                    useCORS: true
                },
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: "portrait"
                }
            },
        }
    },
    watch: {
        data_header(){
            this.progressBar = false
        },

        date (val) {
            this.data_header.tanggal_lahir = this.formatDate(this.date)
        },

        dateProgram (val) {
            this.data_header.masuk_pondok = this.formatDate(this.dateProgram)
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
        VueHtml2pdf
        // KTKHS,
        // KTHSK
    },
    methods:{

        exportToFile() {
            this.data_header;
            this.data_pendidikan;
            this.$refs.html2PdfAll.generatePdf();
        },

        exportToWord() {
            const filteredData = this.data_pendidikan.filter((item) => item.status_sekolah !== 0);
            const filteredData1 = this.data_pendidikan.filter((item) => item.status_sekolah === 0);
            const tbodyContent = filteredData.map((item) => `
                <tr>
                    <td style="font-size: 11pt;font-family: 'Times New Roman';">${item.tingkat}</td>
                    <td style="font-size: 11pt;text-align: left;font-family: 'Times New Roman';">${item.nama_sekolah}</td>
                    <td style="font-size: 11pt;text-align: center;font-family: 'Times New Roman';">${item.tahun_masuk}</td>
                    <td style="font-size: 11pt;text-align: center;font-family: 'Times New Roman';">${item.tahun_lulus}</td>
                </tr>
                `).join('');

            const tbodyContent1 = filteredData1.map((item) => `
                <tr >
                    <td style="font-size: 11px;">${item.tingkat}</td>
                    <td style="font-size: 11px;text-align: left;font-family: 'Times New Roman';">${item.nama_sekolah}</td>
                    <td style="font-size: 11px;text-align: center;font-family: 'Times New Roman';">${item.tahun_masuk}</td>
                    <td style="font-size: 11px;text-align: center;font-family: 'Times New Roman';">${item.tahun_lulus}</td>
                </tr>
                `).join('');

            const letterContent = `
            <html>
            <head>
            <style>
            body {
                    page: A4;
                    size: 21cm 29.7cm; /* Ukuran A4 dalam centimeter */
                    margin: 2cm;
                    font-family: Times New Roman, sans-serif;
                }

            .line {
                text-align: center; /* Meletakkan garis bawah di tengah */
            }

            .hr {
                border: 1px solid black;
                width: 80%; 
                color: black; 
                margin: 0; /* Menghilangkan margin atas dan bawah */
                margin-bottom: -4px;
            }
            
            .hr_01 {
                border: 0px solid black;
                width: 80%; 
                margin-top: -4px;
            }

            .table {
                width: 100%;
            }

            .logo {
                max-width: 10px;
                max-height: 10px;
            }

            .bordered-table {
                border-collapse: collapse;
                border-right: 1px solid black; /* Border kanan untuk tabel */
                border-bottom: 1px solid black; /* Border bawah untuk tabel */
            }

            .bordered-table td, .bordered-table th {
                border-top: 1px solid black;
                border-left: 1px solid black;
                padding: 5px; /* Penambahan padding untuk estetika */
            }

            .bordered-table tr:last-child td, .bordered-table tr:last-child th {
                border-bottom: none; /* Menghapus border bawah untuk sel di baris terakhir, karena sudah ada pada tabel */
            }

            .bordered-table td:last-child, .bordered-table th:last-child {
                border-right: none; /* Menghapus border kanan untuk sel di kolom terakhir, karena sudah ada pada tabel */
            }

            </style>
            </head>
            <body>
            <div>
                <table class="table">
                    <tr>
                        <td rowspan="4" width="25%" style="text-align: right;"><img src="${this.logoPath}" alt="Logo" class="logo" width="110" height="120"></td>
                        <td style="font-family: 'Traditional Arabic', 'Scheherazade', 'Amiri', sans-serif; font-size: 30px; font-weight: bold; padding-left: 30px;"> معهد تحفيظ القرآن الجزري</td>
                    </tr>
                    <tr>
                        <td style="font-family: 'Times New Roman'; font-size: 16px; font-weight: bold; padding-left: 25px;">PONDOK PESANTREN QUR’AN AL-JAZARY</td>
                    </tr>
                    <tr>
                        <td style="font-family: 'Times New Roman'; font-size: 8px; font-weight: bold;">Jl. Al Hikmah, Gang Warung Nangka Kec. Bojongkerta, Bogor Selatan, Kota Bogor, Jawa Barat Kode Pos 16139 </td>
                    </tr>
                    <tr>
                        <td style="font-family: 'Times New Roman'; font-size: 8px; font-weight: bold;"></td>
                    </tr>
                    <tr>
                        <td colspan="2"><hr class="hr"></td>
                    </tr>
                </table>
                <p style="font-family: 'Times New Roman'; font-size: 16px; font-weight: bold; text-align: center;">FORMULIR BIODATA SANTRI</p>

                <table width="100%" style="font-size: 9;">
                    <tr>
                        <td width="100%" align="center">
                            <table width="80%" style="font-family: 'Times New Roman';">
                                <tr>
                                    <td width="12%" style="font-size: 11pt;font-weight: bold;text-align: left;">A.	DATA PRIBADI</td>
                                    <td width="14%"></td>
                                    <td width="4%" rowspan="9" style="vertical-align: top;"><img src="${this.data_header.foto}" alt="Logo" class="logo" width="110" height="140"></td>
                                </tr>
                                <tr>
                                    <td width="12%" style="font-family: 'Times New Roman';text-align: left;font-size: 11pt;">1. Nama Santri</td>
                                    <td width="14%" style="font-family: 'Times New Roman';text-align: left;font-size: 11pt;">: ${this.data_header.nama_lengkap_santri }</td>
                                </tr>                    
                                <tr>
                                    <td width="12%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">2.Nama Panggilan</td>
                                    <td width="14%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">: ${this.data_header.panggilan }</td>
                                </tr>
                                <tr>
                                    <td width="12%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">3.Tempat dan Tanggal Lahir</td>
                                    <td width="14%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">: ${this.data_header.tempat_lahir }, ${this.data_header.tanggal_lahir     }</td>
                                </tr>
                                <tr>
                                    <td width="12%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">4.Anak Ke -...... dari... </td>
                                    <td width="14%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">: ${this.data_header.anak_ke }</td>
                                </tr>
                                <tr>
                                    <td width="12%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">5.Alamat Asal (Lengkap)</td>
                                    <td width="14%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">: ${this.data_header.alamat }</td>
                                </tr>
                                <tr>
                                    <td width="12%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">6.Berat Badan & Tinggi Badan</td>
                                    <td width="14%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">: ${this.data_header.berat_badan } KG, ${ this.data_header.tinggi_badan } CM</td>
                                </tr>
                                <tr>
                                    <td width="12%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">7.No HP Orang Tua  </td>
                                    <td width="14%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">: ${this.data_header.hp_ortu }</td>
                                </tr>
                                <tr>
                                    <td width="12%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">8.Nama Ayah Kandung  </td>
                                    <td width="14%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">: ${this.data_header.nama_ayah }</td>
                                </tr>                    
                                <tr>
                                    <td width="12%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">9.Nama Ibu Kandung  </td>
                                    <td width="14%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">: ${this.data_header.nama_ibu }</td>
                                </tr>                   
                            </table>
                            <br>
                            <table width="80%">
                                <tr>
                                    <td width="10%" style="font-size: 11pt;font-weight: bold;text-align: left;">B. Data Riwayat</td>
                                </tr>
                                <tr>
                                    <td width="10%" style="font-size: 11pt;text-align: left;font-family: 'Times New Roman';">1. Pendidikan Formal</td>
                                </tr>                   
                            </table>
                            <table width="80%" class="bordered-table">
                                <thead>
                                    <tr>
                                        <td width="10%" rowspan="2" style="font-size: 11pt;font-weight: bold;text-align: center;font-family: 'Times New Roman';">Tingkat</td>
                                        <td width="15%" rowspan="2" style="font-size: 11pt;font-weight: bold; text-align: center;font-family: 'Times New Roman';">Nama Sekolah</td>
                                        <td width="10%" colspan="2" style="font-size: 11pt;font-weight: bold; text-align: center;font-family: 'Times New Roman';">Tahun</td>
                                    </tr>
                                    <tr>
                                        <td width="10%" style="text-align: center;font-size: 11pt;font-weight: bold;font-family: 'Times New Roman';">Masuk</td>
                                        <td width="10%" style="text-align: center;font-size: 11pt;font-weight: bold;font-family: 'Times New Roman';">Lulus</td>
                                    </tr>                   
                                </thead>
                                <tbody>
                                    ${tbodyContent}
                                </tbody>
                            </table>
                            <br>
                            <table width="80%" >
                                <tr>
                                    <td width="10%" style="font-size: 11pt;text-align: left;font-family: 'Times New Roman';">2. Pendidikan Pesantren</td>
                                </tr>                   
                            </table>
                            <table width="80%" class="bordered-table">
                                <thead>
                                    <tr>
                                        <td width="10%" rowspan="2" style="font-size: 11pt;font-weight: bold;text-align: center;font-family: 'Times New Roman';">Tingkat</td>
                                        <td width="15%" rowspan="2" style="font-size: 11pt;font-weight: bold;text-align: center;font-family: 'Times New Roman';">Nama Sekolah</td>
                                        <td width="10%" colspan="2" style="font-size: 11pt;font-weight: bold;text-align: center;font-family: 'Times New Roman';">Tahun</td>
                                    </tr>
                                    <tr>
                                        <td width="10%" style="text-align: center;font-size: 11pt;font-weight: bold;font-family: 'Times New Roman';">Masuk</td>
                                        <td width="10%" style="text-align: center;font-size: 11pt;font-weight: bold;font-family: 'Times New Roman';">Lulus</td>
                                    </tr>                   
                                </thead>
                                <tbody>
                                    ${tbodyContent1}
                                </tbody>
                            </table>
                            <br>
                            <table width="80%" style="">
                                <tr>
                                    <td width="10%" style="font-size: 11pt;font-weight: bold;text-align: left;font-family: 'Times New Roman';">C.PROGRAM TAHFIDZ</td>
                                    <td width="14%"></td>
                                </tr>
                                <tr>
                                    <td width="10%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">1. Kode Santri</td>
                                    <td width="14%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">: ${this.data_header.kode_santri }</td>
                                </tr>
                                <tr>
                                    <td width="10%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">2. Program Pondok</td>
                                    <td width="14%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">: ${this.data_header.program_pondok_Nama }</td>
                                </tr>
                                <tr>
                                    <td width="10%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">3. Masuk Pondok</td>
                                    <td width="14%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">: ${this.data_header.masuk_pondok }</td>
                                </tr>
                                <tr>
                                    <td width="10%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">4. Hafalan Ziyadah</td>
                                    <td width="14%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">: ${this.data_header.hafalan_ziyadah }</td>
                                </tr>
                                <tr>
                                    <td width="10%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">5. Hafalan Mutqin</td>
                                    <td width="14%" style="text-align: left;font-size: 11pt;font-family: 'Times New Roman';">: ${this.data_header.hafalan_mutqin }</td>
                                </tr>                  
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            </body>
            </html>
            `;
            const word = `<html xmlns:o='urn:schemas-microsoft-com:office:office xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>${letterContent}</body></html>`;

            const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(word);
            const fileDownload = document.createElement('a');
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = 'contoh_surat.doc'; // Nama berkas yang akan diunduh
            fileDownload.click();
            document.body.removeChild(fileDownload);
        },

        onProgress(data) {
            this.progressData = data-30;
        },

        async beforeDownload ({ html2pdf, options, pdfContent }) {
            this.printingInProgress = true
            await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
                const totalPages = pdf.internal.getNumberOfPages()
                const marginLeft = 8; // Jarak margin kiri
                const marginRight = 8; // Jarak margin kanan      
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i)
                    
                    const imageWidth = 0.87;
                    const imageHeight = 1;
                    const imageX = 0.4;
                    const imageY = 0.08;
                    pdf.addImage('./LogoAlJazary.png', 'PNG', imageX, imageY, imageWidth, imageHeight);

                    const pageWidth = pdf.internal.pageSize.getWidth();
                    const pageHeight = pdf.internal.pageSize.getHeight();
                    const imageWidth1 = 6;
                    const imageHeight1 = 7;
                    const imageX1 = (pageWidth - imageWidth1) / 2;
                    const imageY1 = (pageHeight - imageHeight1) / 2;
                    pdf.addImage('./Trans.png', 'PNG', imageX1, imageY1, imageWidth1, imageHeight1);

                    const imageWidth2 = 2.4;
                    const imageHeight2 = 0.52;
                    const imageX2 = 3;
                    const imageY2 = 0.15;
                    pdf.addImage('./KopArab.png', 'PNG', imageX2, imageY2, imageWidth2, imageHeight2);

                    const imageWidth3 = 3.6;
                    const imageHeight3 = 0.37;
                    const imageX3 = 2.3;
                    const imageY3 = 0.6;
                    pdf.addImage('./KopIndo.png', 'PNG', imageX3, imageY3, imageWidth3, imageHeight3);

                    pdf.setFontSize(7);
                    pdf.setTextColor('#000');
                    pdf.text('Jl. Raya Cipari Batulayang RT 01/RW 04, Kec. Cisarua, Kabupaten Bogor, Jawa Barat 16750', (pdf.internal.pageSize.getWidth() / 2), (pdf.internal.pageSize.getHeight() * 0.09), { align: 'center' });
                    
                    pdf.setLineWidth(0.03);
                    pdf.line(marginLeft, (pdf.internal.pageSize.getHeight() * 0.10), pdf.internal.pageSize.getWidth() - marginRight, (pdf.internal.pageSize.getHeight() * 0.10)); // Ganti dengan jarak margin kanan
                    pdf.setLineWidth(0.01);
                    pdf.line(marginLeft, (pdf.internal.pageSize.getHeight() * 0.105), pdf.internal.pageSize.getWidth() - marginRight, (pdf.internal.pageSize.getHeight() * 0.105)); // Ganti dengan jarak margin kanan
                } 
            }).save()
            this.progressData = 100
            setTimeout(() => {
                this.printingInProgress = false;
            }, 500);
        },

        hasDownloaded(){
            this.printingInProgress = false;
            this.progressData = 0;
        },
        
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
            var SantriId = this.Santri_Id;
            this.$store
                .dispatch(Fetch_R_Santri, { SantriId })
                .then((res) => {
                    this.data_header = res.data[0]
                })
                .catch((err) => err);
        },

        getRiwayatPendidikan(){
            var SantriId = this.Santri_Id;
            this.$store
                .dispatch(Fetch_R_Pendidikan, { SantriId })
                .then((res) => {
                    this.data_pendidikan = res.data
                })
                .catch((err) => err);

        },

        formSubmit() {
            return new Promise(resolve => {
                const formData = new FormData()
                formData.append("UID", localStorage.getLocalStorage("uid"))
                formData.append("Token", localStorage.getLocalStorage("token"))
                formData.append("Trigger", 'U')
                formData.append("Route", "Update_RH")
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
                formData.append("program_pondok", this.data_header.program_pondok)
                formData.append("masuk_pondok", this.data_header.masuk_pondok)
                

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
                await this.getRiwayatPendidikan(),
                await this.asyncAccess()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>