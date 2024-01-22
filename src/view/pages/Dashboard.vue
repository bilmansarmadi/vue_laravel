<template>
  <div>
      <div>
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
                                  v-model="formFilter.first_name"
                                  label="First Name"
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
                                  v-model="formFilter.last_name"
                                  label="last name"
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
                                  v-model="formFilter.date_of_birth"
                                  label="Date of Birth"
                                  required
                                  clearable
                                  color="#ee8b3d"
                                  type="date"
                              ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              md="6"
                          >
                              <v-text-field
                                  v-model="formFilter.phone_number"
                                  label="Phone Number"
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
                                  v-model="formFilter.email"
                                  label="Email"
                                  required
                                  clearable
                                  color="#ee8b3d"
                                  type="email"
                              ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              md="6"
                          >
                              <v-autocomplete
                              v-model="formFilter.province_id"
                                :items="data_province"
                                item-text="provinces_name"
                                item-value="id"
                                label="Provinces"
                                clearable
                                color="#ee8b3d"
                            ></v-autocomplete>
                          </v-col>
                          <v-col
                              cols="12"
                              md="6"
                          >
                          <v-autocomplete
                            v-model="formFilter.province_id"
                                :items="data_city"
                                item-text="cities_name"
                                item-value="id"
                                label="City"
                                clearable
                                color="#ee8b3d"
                            ></v-autocomplete>
                          </v-col>
                          <v-col
                              cols="12"
                              md="6"
                          >
                              <v-text-field
                                  v-model="formFilter.street_address"
                                  label="Street Address"
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
                                  v-model="formFilter.zip_code"
                                  label="Zip Code"
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
                                  v-model="formFilter.ktp_number"
                                  label="KTP Number"
                                  required
                                  clearable
                                  color="#ee8b3d"
                              ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              md="6"
                          >
                              <v-autocomplete
                              v-model="formFilter.position_id"
                                    :items="data_position"
                                    item-text="positions_name"
                                    item-value="id"
                                    label="Position"
                                    clearable
                                    color="#ee8b3d"
                                ></v-autocomplete>
                          </v-col>
                          <v-col
                              cols="12"
                              md="6"
                          >
                              <v-autocomplete
                                    v-model="formFilter.bank_id"
                                    :items="data_bank"
                                    item-text="bank_name"
                                    item-value="id"
                                    label="Bank Name"
                                    clearable
                                    color="#ee8b3d"
                                ></v-autocomplete>
                          </v-col>
                          <v-col
                              cols="12"
                              md="6"
                          >
                              <v-text-field
                                  v-model="formFilter.bank_account_number"
                                  label="Bank Account Number"
                                  required
                                  clearable
                                  color="#ee8b3d"
                                  type="number"
                              ></v-text-field>
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
                  :items="data_employee"
                  :search="search"
                  loading-text="Loading... Please wait"
                  :items-per-page="5"
                  item-key="book_id"
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
                                        v-model="formInput.id"
                                        label="id"
                                        :rules="rulesNotNull"
                                        required
                                        clearable
                                        color="#ee8b3d"
                                        readonly
                                        v-show=false
                                        ></v-text-field>
                                          <v-text-field
                                              v-model="formInput.first_name"
                                              label="First Name"
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
                                              v-model="formInput.last_name"
                                              label="Last Name"
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
                                              v-model="formInput.date_of_birth"
                                              label="Date Of Birth"
                                              :rules="rulesNotNull"
                                              required
                                              clearable
                                              color="#ee8b3d"
                                              type="date"
                                          ></v-text-field>
                                      </v-col>
                                      <v-col
                                          cols="12"
                                          md="6"
                                      >
                                          <v-text-field
                                              v-model="formInput.phone_number"
                                              label="Phone Number"
                                              clearable
                                              required
                                              color="#ee8b3d"
                                          ></v-text-field>
                                      </v-col>
                                      <v-col
                                          cols="12"
                                          md="6"
                                      >
                                          <v-text-field
                                              v-model="formInput.email"
                                              label="Email"
                                              clearable
                                              required
                                              color="#ee8b3d"
                                              type="email"
                                          ></v-text-field>
                                      </v-col>
                                      
                                      <v-col
                                          cols="12"
                                          md="6"
                                      >
                                          <v-autocomplete
                                            v-model="formInput.province_id"
                                            :items="data_province"
                                            item-text="provinces_name"
                                            item-value="id"
                                            label="Provinces"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-autocomplete>
                                      </v-col>
                                      
                                      <v-col
                                          cols="12"
                                          md="6"
                                      >
                                          <v-autocomplete
                                            v-model="formInput.city_id"
                                            :items="data_city"
                                            item-text="cities_name"
                                            item-value="id"
                                            label="City"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-autocomplete>
                                      </v-col>
                                      
                                      <v-col
                                          cols="12"
                                          md="6"
                                      >
                                          <v-text-field
                                              v-model="formInput.street_address"
                                              label="Street Address"
                                              clearable
                                              required
                                              color="#ee8b3d"
                                              type="text"
                                          ></v-text-field>
                                      </v-col>
                                      <v-col
                                          cols="12"
                                          md="6"
                                      >
                                          <v-text-field
                                              v-model="formInput.zip_code"
                                              label="Zip Code"
                                              clearable
                                              required
                                              color="#ee8b3d"
                                          ></v-text-field>
                                      </v-col>
                                      <v-col
                                          cols="12"
                                          md="6"
                                      >
                                          <v-text-field
                                              v-model="formInput.ktp_number"
                                              label="KTP Number"
                                              clearable
                                              required
                                              color="#ee8b3d"
                                          ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6">
                                        <v-autocomplete
                                            v-model="formInput.position_id"
                                            :items="data_position"
                                            item-text="positions_name"
                                            item-value="id"
                                            label="Position"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-autocomplete>
                                    </v-col>
                                      
                                      <v-col
                                          cols="12"
                                          md="6"
                                      >
                                          <v-autocomplete
                                            v-model="formInput.bank_id"
                                            :items="data_bank"
                                            item-text="bank_name"
                                            item-value="id"
                                            label="Bank Name"
                                            clearable
                                            color="#ee8b3d"
                                        ></v-autocomplete>
                                      </v-col>
                                      <v-col
                                          cols="12"
                                          md="6"
                                      >
                                          <v-text-field
                                              v-model="formInput.bank_account_number"
                                              label="Bank Account Number"
                                              clearable
                                              required
                                              color="#ee8b3d"
                                              type="number"
                                          ></v-text-field>
                                      </v-col>
                                      <v-col
                                          cols="12"
                                          md="6"
                                      >
                                      <h6>Foto</h6>
                                          <div class="input_images">
                                              <div class="file_upload">
                                                  <i class="far fa-images text-primary"></i>
                                                  <input type="file" name="file" id="file" @change="onImageChange" ref="file"
                                                  accept="image/*"/>
                                              </div>
                                          </div>
                                          <div class="ma-2">
                                              <div v-show="img.length > 0">
                                                  <span class="text-lg-body-1 font-weight-bold">Baru</span>
                                                  <v-img
                                                      :src="img"
                                                      width="300px"
                                                  ></v-img>
                                              </div>
                                              <div v-show="editedItem.image_path != null">
                                                  <span class="text-lg-body-1 font-weight-bold">Lama</span>
                                                  <img v-bind:src="'http://127.0.0.1:8000/' + editedItem.image_path"  width="300px" alt="Image">

                                              </div>
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

                      <v-dialog v-model="dialogSeenBill" max-width="800px">
                          <v-card>
                          <v-card-title class="border">
                              <span class="text-h5">Detail Foto</span>
                              <v-spacer></v-spacer>
                              <v-icon
                                  class="rounded-circle p-2 shadow-sm"
                                  small
                                  @click="dialogSeenBill = false"
                                  color="#000"
                              >
                                  mdi-close
                              </v-icon>
                          </v-card-title>
      
                          <v-card-text>
                              <v-container>
                                  <img :src="tabelFoto" alt="Foto" style="max-width: 700px;" />
                              </v-container>
                          </v-card-text>
      
                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn class="mb-3 text-xl-subtitle-1" color="#73a4ef" text @click="dialogSeenBill = false">
                              Tutup
                              </v-btn>
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
                                  >
                                  <i class="flaticon2-pen text-white"></i>
                              </v-btn>
                          </template>
                      <span>Ubah Data</span>
                      </v-tooltip>
                      <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                              <v-btn
                              class="mr-2"
                                  fab
                                  dark
                                  x-small
                                  color="red"
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="deleteItem(item)"
                                  >
                                  <v-icon dark>
                                  mdi-delete
                                  </v-icon>
                              </v-btn>
                          </template>
                      <span>Hapus Data</span>
                      </v-tooltip>
                  </template>
                  <template v-slot:[`item.image_path`]="{ item }">
                      <img :src="item.image_path" class="rounded" alt="Foto" style="max-width: 100px;" v-show="item.image_path.length > 10"/>
                      <v-btn
                          color="#73a4ef"
                          light
                          small
                          class="ml-3"
                          @click="seenFileBill(item)"
                          data-toggle="tooltip"
                          title="Lihat Foto"
                          v-show="item.image_path.length > 10"
                          style="text-transform: capitalize !important; min-width: 0px; padding: 0 6px;"
                      >
                      <v-icon small color="white">
                          mdi-eye
                      </v-icon>
                      </v-btn>
                  </template>
              </v-data-table>
          </div>
      </div>

      <!-- <div v-show="accessList.R == 0">
          <div class="d-flex justify-content-center">
              <img src="media/bg/access.png" alt="Tidak Ada Access" width="35%">
          </div>
      </div> -->
  </div>
</template>

<script>
import Services from "@/core/services/employee-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";
import { formatDate } from "@/helpers/helper.js";
import { format } from "date-fns";


export default {
  name:"master-data-santri",
  mounted() {
      this.load();
  },

  data(){
      return {
          data_employee: [],
          data_city: [],
          data_province: [],
          data_position: [],
          data_bank: [],
          search: '',
          id_delate: '',
          progressBar: true,
          dialog: false,
          dialogBorrow: false,
          data_item: [],
          data_borrow: [],
          tanggal_peminjaman: '',
          tanggal_pengembalian: '',
          editedIndex: -1,
          editedItem: {},
          defaultItem: {},
          submitted: false,
          create_data_employee: [],
          update_data_employee: [],
          delete_data_employee: [],
          add_data_employe: {
            first_name: "",
            id: "",
              last_name: "",
              date_of_birth: "",
              phone_number:"",
              email:"",
              province_id: "",
              city_id: "",
              street_address: "",
              zip_code:"",
              ktp_number:"",
              position_id: "",
              bank_id: "",
              bank_account_number: ""
          },
          formFilter: {
              first_name: "",
              id: "",
              last_name: "",
              date_of_birth: "",
              phone_number:"",
              email:"",
              province_id: "",
              city_id: "",
              street_address: "",
              zip_code:"",
              ktp_number:"",
              position_id: "",
              bank_id: "",
              bank_account_number: ""
          },
          headers: [
              { 
                  text: 'First Name', 
                  value: 'first_name',
                  align: 'start',
                  width: "180px",
                  sortable: false 
              },
              { 
                  text: 'last_name', 
                  value: 'last_name',
                  align: 'start',
                  width: "180px",
                  sortable: false 
              },
              { 
                  text: 'Date Of Birth', 
                  value: 'date_of_birth',
                  align: 'start',
                  width: "100px",
                  sortable: false 
              },
              { 
                  text: 'Phone Number', 
                  value: 'phone_number',
                  align: 'start',
                  width: "100px",
                  sortable: false 
              },
              { 
                  text: 'Email', 
                  value: 'email',
                  align: 'start',
                  width: "100px",
                  sortable: false 
              },
              { 
                  text: 'Province',  
                  value: 'provinces_name',
                  align: 'start',
                  width: "100px",
                  sortable: false 
              },
              { 
                  text: 'City',  
                  value: 'cities_name',
                  align: 'start',
                  width: "100px",
                  sortable: false 
              },
              { 
                  text: 'Street Address',   
                  value: 'street_address',
                  align: 'start',
                  width: "150px",
                  sortable: false 
              },
              { 
                  text: 'Zip Code',  
                  value: 'zip_code',
                  align: 'start',
                  width: "100px",
                  sortable: false 
              },
              { 
                  text: 'KTP Number',  
                  value: 'ktp_number',
                  align: 'start',
                  width: "100px",
                  sortable: false 
              },
              { 
                  text: 'position',   
                  value: 'positions_name',
                  align: 'start',
                  width: "100px",
                  sortable: false 
              },
              { 
                  text: 'Bank',  
                  value: 'bank_name',
                  align: 'start',
                  width: "100px",
                  sortable: false 
              },
              { 
                  text: 'Scan KTP', 
                  value: 'image_path',
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
          // addDate: false,
          dialogSeenBill: false,
          tabelFoto: "",
          images: "",
          img: "",
          menu1: false,
          menu2: false          
      }
  },

  watch: {
      dialog (val) {
          val || this.close()
      },

      data_employee(){
          this.progressBar = false
      }
      
  },

  computed: {
      formTitle () {
          return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
      },
      formInput() {
          return this.editedIndex === -1 ? this.add_data_employe : this.editedItem;
      },
      formSubmit() {
          return this.editedIndex === -1
              ? this.createDataEmployee
              : this.updateDataEmployee;
      },

      borrowSubmit() {
          return this.editedIndex === -1
              ? this.createDataEmployee
              : this.borrowDataEmployee;
      },

      isDisabledSimpan(){
          return !this.formInput.first_name || !this.formInput.last_name
          || !this.formInput.date_of_birth
      }
  },

  watch: {
      date (val) {
          this.dateFormatted = this.formatDate(this.date)
      },

      dateProg (val) {
          this.dateProgram = this.formatDate(this.dateProg)
      },
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

      getMasterDataEmployee() {
        return new Promise((resolve, reject) => {
            var mydata = {
                first_name: this.formFilter.first_name,
                last_name: this.formFilter.last_name,
                phone_number: this.formFilter.phone_number,
                date_of_birth: this.formFilter.date_of_birth,
                email: this.formFilter.email,
                province_id: this.formFilter.province_id,
                city_id: this.formFilter.city_id,
                street_address: this.formFilter.street_address,
                zip_code: this.formFilter.zip_code,
                ktp_number: this.formFilter.ktp_number,
                position_id: this.formFilter.position_id,
                bank_id: this.formFilter.bank_id,
                bank_account_number: this.formFilter.bank_account_number,
                per_page:11,
                tets: ''
            };

            // Convert object to URL parameters
            const queryParams = new URLSearchParams(mydata).toString();

        

            // Assuming ApiService is an instance of Axios
            Services.GetData(
                ApiService,
                `/employees/getdata?${queryParams}`, // Append parameters to the URL
                response => {
                    resolve(response.data);
                    this.data_employee = response.data;
                },
                err => {
                    reject(err);
                }
            );
        });
    },

      createDataEmployee(){
          return new Promise(resolve => {
              const formData = new FormData()
              formData.append("image_path", this.images)
              formData.append("first_name", this.add_data_employe.first_name)
              formData.append("last_name", this.add_data_employe.last_name)
              formData.append("date_of_birth", this.add_data_employe.date_of_birth)
              formData.append("phone_number", this.add_data_employe.phone_number)
              formData.append("date_of_birth", this.add_data_employe.date_of_birth)
              formData.append("email", this.add_data_employe.email)
              formData.append("province_id", this.add_data_employe.province_id)
              formData.append("city_id", this.add_data_employe.city_id)
              formData.append("street_address", this.add_data_employe.street_address)
              formData.append("zip_code", this.add_data_employe.zip_code)
              formData.append("ktp_number", this.add_data_employe.ktp_number)
              formData.append("position_id", this.add_data_employe.position_id)
              formData.append("bank_id", this.add_data_employe.bank_id)
              formData.append("bank_account_number", this.add_data_employe.bank_account_number)
              

              let contentType = `application/form-data`;

              Services.PostData(
              ApiService,
              "/employees",
              formData,
              contentType,
              response => {
                  resolve(response.data);
                  if (response.status) {
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
                          text: response.data.error,
                          icon: "info",
                          heightAuto: true,
                          timer: 1500
                      });
                  }
                  this.create_data_employee = response.data;
                  this.submitted = true;
                  this.save("add_data_employe");
                  this.getMasterDataEmployee();
              },
              err => {
                console.log(err.response.data.error);
                const errorArray = Object.keys(err.response.data.error).reduce((accumulator, key) => {
                    const errorMessages = err.response.data.error[key].map(errorMessage => `${key}: ${errorMessage}`);
                    return accumulator.concat(errorMessages);
                }, []);

                const errorMessage = errorArray.join('\n'); // Menggabungkan array menjadi satu string dengan baris baru
                Swal.fire({
                    title: "",
                    text: errorMessage,
                    icon: "info",
                    heightAuto: true,
                });
            }
              );
          });
      },

      editItem (item) {
          this.editedIndex = this.data_employee.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.data_item = item
          this.dialog = true
      },


      deleteItem (item) {
        this.id_delate = item.id;
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
            console.log(result)
              if(result.value == true){
              return new Promise(resolve => {
                    
                  let contentType = `application/x-www-form-urlencoded`;
                  const qs = require("qs");

                  Services.DeleteData(
                      ApiService,
                      `/employees/${this.id_delate}`,
                      contentType,
                      response => {
                          resolve(response.data);
                          if (response.status) {
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
                          this.delete_data_employee = response.data;
                          this.submitted = true;
                          this.data_employee.splice(this.deletedIndex, 1);
                          this.getMasterDataEmployee()
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
          this.dialogBorrow = false
          this.$nextTick(() => {
              this.add_data_employe.first_name = ""
              this.add_data_employe.last_name = ""
              this.add_data_employe.date_of_birth = ""
              this.images = ""
              this.img = ""
              this.editedItem = Object.assign({}, this.defaultItem)
              this.editedIndex = -1
          })
      },

        updateDataEmployee() {
                let media = "";
                var check = this.editedItem.foto;
                if (this.images != null) {
                    media = this.images;
                } else {
                    media = check;
                }
                
                return new Promise(resolve => {

                    const requestData = {
                    image_path: media,
                    first_name: this.editedItem.first_name,
                    last_name: this.editedItem.last_name,
                    date_of_birth: this.editedItem.date_of_birth,
                    phone_number: this.editedItem.phone_number,
                    email: this.editedItem.email,
                    province_id: this.editedItem.province_id,
                    city_id: this.editedItem.city_id,
                    street_address: this.editedItem.street_address,
                    zip_code: this.editedItem.zip_code,
                    ktp_number: this.editedItem.ktp_number,
                    position_id: this.editedItem.position_id,
                    bank_id: this.editedItem.bank_id,
                    bank_account_number: this.editedItem.bank_account_number
                    };


                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");
                    // Mengganti permintaan POST menjadi permintaan PUT
                    
                    Services.PutData(
                        ApiService,
                        `/employees/${this.editedItem.id}`, // Sesuaikan dengan endpoint yang benar
                        qs.stringify(requestData),
                        contentType,
                        response => {
                            resolve(response.data);
                            if (response.status) {
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
                                    text: response.error,
                                    icon: "info",
                                    heightAuto: true,
                                    timer: 1500
                                });
                            }
                            this.update_data_employee = response.data;
                            this.submitted = true;
                            this.save("edit_data_employee");
                            this.load();
                        },
                        err => {
                            err;
                        }
                    );
                });
            },



      borrowDataEmployee() {
      },

      save(formInput) {
          if (formInput == "add_data_employe") {
              if (this.editedIndex > -1) {
              Object.assign(
                  this.data_employee[this.editedIndex],
                  this.add_data_employe
              );
              } else {
                  this.data_employee.push(this.add_data_employe);
              }
          } else if (formInput == "edit_data_employee") {
              if (this.editedIndex > -1) {
                  Object.assign(this.data_employee[this.editedIndex], this.editedItem);
              } else {
                  this.data_employee.push(this.editedItem);
              }
          }
          this.close();
      },

      seenFileBill(item) {
         this.tabelFoto = 'http://127.0.0.1:8000/' + item.image_path;

          this.dialogSeenBill = true;
      },

      createImage(file) {
          let reader = new FileReader();

          reader.onload = e => {
              this.img = e.target.result;
          };

          reader.readAsDataURL(file);
      },

      onImageChange() {
          this.images = this.$refs.file.files[0];
          this.createImage(this.$refs.file.files[0]);
      },

      clearFilter(){
        this.formFilter.first_name = "";
        this.formFilter.last_name = "";
        this.formFilter.date_of_birth = "";
        this.formFilter.phone_number = "";
        this.formFilter.email = "";
        this.formFilter.province_id = "";
        this.formFilter.city_id = "";
        this.formFilter.street_address = "";
        this.formFilter.zip_code = "";
        this.formFilter.ktp_number = "";
        this.formFilter.position_id = "";
        this.formFilter.bank_id = "";
        this.formFilter.bank_account_number = "";

          this.getMasterDataEmployee()
      },

      filterData() {
        this.load()
            .then(data => {
            if (data.value.length === 0) {
                this.data_employee = [];
            } else {
                this.data_employee = data.value;
            }
            })
            .catch(error => {
            // Handle any errors that occurred during the data loading process
            console.error("Error loading data:", error);
            // Atur tabel menjadi kosong pada kesalahan
            this.data_employee = [];
            });
        },

        getMasterCity(){
            this.data_city = this.$store.state.mCity.master_city;
        },

        getMasterBank(){
            this.data_bank = this.$store.state.mBank.master_bank;
        },

        getMasterPosition(){
            this.data_position = this.$store.state.mPositions.master_positions;
        },

        getMasterProvince(){
            this.data_province = this.$store.state.mProvinces.master_provinces;
        },

      async load() {
    try {
        await this.getMasterDataEmployee();
        await this.getMasterCity();
        await this.getMasterBank();
        await this.getMasterPosition();
        await this.getMasterProvince();
    } catch (error) {
        // Handle any errors that occurred during the data loading process
        console.error("Error loading data:", error);
    }
}

  }
}
</script>