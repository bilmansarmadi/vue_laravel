<template>
    <div class="container-fluid col-md-10">
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
                                  v-model="formFilter.judul_buku"
                                  label="Judul Buku"
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
                                  v-model="formFilter.penulis"
                                  label="penulis"
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
                                  v-model="formFilter.user_nama"
                                  label="Nama Peminjam"
                                  required
                                  clearable
                                  color="#ee8b3d"
                              ></v-text-field>
                          </v-col>
                          <v-col
                              cols="12"
                              md="6"
                          >
                          <v-select
                                  v-model="formFilter.status"
                                  :items="tanggalDikembalikanOptions"
                                  label="Status Pengembalian"
                                  required
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
                :items="data_transactions"
                :search="search"
                :loading="progressBar"
                loading-text="Loading... Please wait"
                :items-per-page="5"
                item-key="transactions_id"
                class="elevation-1"
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
                </v-toolbar>
                </template>
                <template v-slot:[`item.status_keterlambatan`]="{ item }">
                    <v-btn
                        fab
                        dark
                        x-small
                        :color="getButtonColor(item.status_keterlambatan)"
                        >
                    </v-btn>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            fab
                            dark
                            x-small
                            color="#73a4ef"
                            v-bind="attrs"
                            v-on="on"
                            @click="validasiItem(item)"
                            >
                            <i class="flaticon2-pen text-white"></i>
                        </v-btn>
                    </template>
                <span>Validasi</span>
                </v-tooltip>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
import Services from "@/core/services/employee-api/Services";
import ApiService from "@/core/services/api.service";
import Swal from 'sweetalert2'
import localStorage from "@/core/services/store/localStorage";
import { Fetch_MKelas} from "@/core/services/store/mKelas.module";

export default {
    name:"master-kelas",
    mounted() {
        this.load();
    },

    data(){
        return {
            data_transactions: [],
            search: '',
            progressBar: true,
            dialog: false,
            data_item: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {},
            submitted: false,
            create_data_transactions: [],
            update_data_transactions: [],
            delete_data_transactions: [],
            dropdown_status: [
                { value: 0, text: "Tidak Aktif" },
                { value: 1, text: "Aktif" },
            ],
                formFilter: {
                judul_buku: "",
                penulis: "",
                user_nama: "",
                status: ""
            },
            tanggalDikembalikanOptions: [
                    { text: 'Belum Mengembalikan', value: '1' },
                    { text: 'Sudah Mengembalikan', value: '0' },
                ],
            headers: [
                { 
                    text: 'Nama Peminjam', 
                    value: 'user_nama',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Judul Buku', 
                    value: 'judul_buku',
                    align: 'start',
                    width: "150px",
                    sortable: false 
                },
                { 
                    text: 'Meminjam', 
                    value: 'tanggal_peminjaman',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Tempo', 
                    value: 'tanggal_pengembalian',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Dikembalikan', 
                    value: 'tanggal_dikembalikan',
                    align: 'center',
                    width: "100px",
                    sortable: false 
                },
                { 
                    text: 'Status', 
                    value: 'status_keterlambatan', 
                    align: 'center',
                    width: "150px",
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

        data_transactions(){
            this.progressBar = false
        }
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tambah Data' : 'Ubah Data'
        },
        formInput() {
            return this.editedIndex === -1 ? this.add_data_transactions : this.editedItem;
        },
        formSubmit() {
            return this.editedIndex === -1
                ? this.createDataKelas
                : this.updateDataKelas;
        },
        isDisabledSimpan(){
            return !this.formInput.nama_kelas
        }
    },

    methods:{
        getDataTransactions_book(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    user_level: localStorage.getLocalStorage("user_level"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "DEFAULT"
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Transactions/Books",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_transactions = response.data;
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        validasiItem (item) {
            Swal.fire({
                title: localStorage.getLocalStorage("user_level") == 0 ? 'Verifikasi buku diterima' : 'Kembalikan Buku',
                text: localStorage.getLocalStorage("user_level") == 0 ? 'Konfirmasi bahwa buku benar sudah dikembalikan' : '',
                icon: 'info',
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
                        Trigger: "U",
                        Route: "DEFAULT",
                        transactions_id: item.transactions_id
                    };
                    if (localStorage.getLocalStorage("user_level") == 0) {
                            mydata.status = "0";
                        } else {
                            var currentDate = new Date();
                            var formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
                            mydata.tanggal_dikembalikan = formattedDate;
                        }

                    let contentType = `application/x-www-form-urlencoded`;
                    const qs = require("qs");

                    Services.PostData(
                        ApiService,
                        'Transactions/Books',
                        qs.stringify(mydata),
                        contentType,
                        response => {
                            resolve(response.data);
                            if (response.status == 1000) {
                                Swal.fire({
                                    title: "",
                                    text: "Berhasil.",
                                    icon: "success",
                                    heightAuto: true,
                                    timer: 1500
                                });
                            } else {
                                Swal.fire({
                                    title: "",
                                    text: response.message_opt, 
                                    icon: "info",
                                    heightAuto: true,
                                    timer: 1500
                                });
                            }
                            this.delete_data_transactions = response.data;
                            this.submitted = true;
                            this.data_transactions.splice(this.deletedIndex, 1);
                            this.getDataTransactions_book()
                            this.$store.dispatch(Fetch_MKelas)
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
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save(formInput) {
            if (formInput == "add_data_transactions") {
                if (this.editedIndex > -1) {
                Object.assign(
                    this.data_transactions[this.editedIndex],
                    this.add_data_transactions
                );
                } else {
                    this.data_transactions.push(this.add_data_transactions);
                }
            } else if (formInput == "edit_data_transactions") {
                if (this.editedIndex > -1) {
                    Object.assign(this.data_transactions[this.editedIndex], this.editedItem);
                } else {
                    this.data_transactions.push(this.editedItem);
                }
            }
            this.close();
        },

        getButtonColor(status) {
            switch (status) {
                case 1:
                    return 'green';
                case 2:
                    return 'red';
                case 3:
                    return 'orange';
                default:
                    return '';
            }
        },

        filterData(){
          return new Promise(resolve => {
              var mydata = {
                  UID: localStorage.getLocalStorage("uid"),
                  Token: localStorage.getLocalStorage("token"),
                  Trigger: "R",
                  Route: "DEFAULT",
                  judul_buku: this.formFilter.judul_buku,
                  penulis: this.formFilter.penulis,
                  status: this.formFilter.status,
                  user_nama: this.formFilter.user_nama,
              };

              let contentType = `application/x-www-form-urlencoded`;

              const qs = require("qs");

              Services.PostData(
                  ApiService,
                  "Transactions/Books",
                  qs.stringify(mydata),
                  contentType,
                  response => {
                      resolve(response.data);
                      this.data_transactions = response.data;
                  },
                  err => {
                      err;
                  }
              );
          });
      },

        async load() {
            Promise.all([
                await this.getDataTransactions_book()
            ]).then(function(results) {
                results;
            });
        },
    }
}
</script>
