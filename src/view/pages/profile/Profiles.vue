<template>
    <div class="container-fluid">
        <div class="pt-15 card cardHover p-15">
            <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                        v-model="update_data_user.kode_user"
                        label="Kode User"
                        required
                        clearable
                        disabled
                        color="#ee8b3d"
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                        v-model="update_data_user.user_fullname"
                        label="Fullname"
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
                        v-model="update_data_user.user_email"
                        label="Email"
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
                        v-model="update_data_user.user_passwords"
                        label="Password"
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
                        v-model="update_data_user.role_nama"
                        label="Role"
                        required
                        clearable
                        disabled
                        color="#ee8b3d"
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                        v-model="update_data_user.Status_Aktif"
                        label="Status"
                        required
                        clearable
                        disabled
                        color="#ee8b3d"
                    ></v-text-field>
                </v-col>
            </v-row>
            <div class="form-group d-flex flex-wrap pb-lg-0 pb-3">
                  <button
                  @click="updateUsers"
                    class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-2 my-3 mr-4"
                    style="width:150px;"
                  >
                    Submit
                  </button>
            </div>
        </div>
    </div>
</template>

<script>
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import localStorage from "@/core/services/store/localStorage";
import Swal from 'sweetalert2'

  export default {
    name:"profiles",
    mounted() {
        this.KodeUser = localStorage.getLocalStorage("kode_user")
        this.load();
    },
    data: () => ({
        data_user: [],
        update_data_user: {
            kode_user: "",
            email: "",
            passwords: "",
            role_nama: "",
            Status_Aktif: "",
            user_fullname: "",
        },
        current_photo: null,
        KodeUser: ""
    }),
    methods: {
        getMasterUsers(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    kode_user: this.KodeUser,
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "R",
                    Route: "DEFAULT"
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    "Master/Users",
                    qs.stringify(mydata),
                    contentType,
                    response => {
                        resolve(response.data);
                        this.data_user = response.data[0];
                        this.update_data_user = this.data_user
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        updateUsers(){
            return new Promise(resolve => {
                var mydata = {
                    UID: localStorage.getLocalStorage("uid"),
                    Token: localStorage.getLocalStorage("token"),
                    Trigger: "U",
                    Route: "DEFAULT",
                    user_id: this.data_user.User_Id,
                    kode_user: this.data_user.kode_user,
                    role_id: this.data_user.role_id,
                    status: this.data_user.status,
                    user_email: this.update_data_user.user_email,
                    user_password: this.update_data_user.password,
                    user_fullname: this.update_data_user.user_fullname,
                };

                let contentType = `application/x-www-form-urlencoded`;

                const qs = require("qs");

                Services.PostData(
                    ApiService,
                    'Master/Users',
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
                        this.update_data_user = response.data[0];
                        this.getMasterUsers();
                    },
                    err => {
                        err;
                    }
                );
            });
        },

        async load() {
            Promise.all([
                await this.getMasterUsers()
            ]).then(function(results) {
                results;
            });
        },
    }
  }
</script>