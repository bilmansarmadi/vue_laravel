<template>
  <v-app>
    <div class="d-flex flex-column flex-root">
      <div
        class="login login-1 d-flex flex-column flex-lg-row flex-column-fluid" style="background-color: #ecb35c;"
        :class="{
          'login-signin-on': this.state == 'signin',
          'login-signup-on': this.state == 'signup',
          'login-forgot-on': this.state == 'forgot'
        }"
        id="kt_login"
      >
        <!--begin::Aside-->
        <div
          class="login-aside d-flex flex-column flex-row-auto mx-auto"
        >
          <div class="d-flex flex-column-auto flex-column pt-lg-20 pt-10">
            <a href="#" class="text-center mb-5">
              <img
                src="media/logos/logoperpus.png"
                class="max-h-150px"
                alt=""
              />
            </a>
            <h3
              class="font-weight-bolder text-center font-size-h4 font-size-h1-lg mb-10"
              style="color: #000;"
            >
           Employee Data             </h3>
          </div>
          <div
            class="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center"
            :style="{ backgroundImage: `url(${backgroundImage})` }"
          ></div>
        </div>
        <!--begin::Aside-->
        <!--begin::Content-->
        <div
          class="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto"
        >
          <div class="d-flex flex-column-fluid flex-center">
            <!--begin::Signin-->
            <div class="card cardHover login-form login-signin">
              <form
                class="form p-10 mt-10"
                novalidate="novalidate"
                id="kt_login_signin_form"
              >
                <div class="pb-7 pt-lg-0 pt-5">
                  <h3
                    class="font-weight-bolder text-dark font-size-h4 font-size-h4-lg"
                  >
                    Welcome to Web Employee
                  </h3>
                  <span class="text-muted font-weight-bold font-size-h6"
                    >Login Here</span
                  >
                </div>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-text-field
                      class="rounded"
                      v-model="form.user_email"
                      label="Email"
                      color="#ee8b3d"
                      :rules="rulesEmail"
                      hide-details="auto"
                      shaped
                      clearable
                    ></v-text-field>
                  </v-col>
  
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-text-field 
                      class="rounded"
                      v-model="form.user_password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      :rules="rulesPwd"
                      hide-details="auto"
                      color="#ee8b3d"
                      shaped
                      label="Password"
                      clearable
                      @click:append="show = !show"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div class="d-flex justify-content-center mb-10">
                  <button
                    :disabled='isDisabled'
                    ref="kt_login_signin_submit"
                    class="btn btn-primary btn-sm font-weight-bolder font-size-h6 rounded-lg py-3 mt-8"
                  >
                    Sign In
                  </button>
                </div>                
                  <div class="text-center mb-10">
                  Don't have an account? <a @click="showForm('signup')"  style="cursor: pointer;">Register here</a>
                  </div>
              </form>
            </div>
            <!--end::Signin-->
            <!--begin::Signup-->
            <div class="card cardHover login-form login-signup">
              <form
                class="form p-10 mt-10"
                novalidate="novalidate"
                id="kt_login_signup_form"
              >
                <div class="pb-7 pt-lg-0 pt-5">
                  <h3
                    class="font-weight-bolder text-dark font-size-h4 font-size-h4-lg"
                  >
                    Register Login
                  </h3>
                  <span class="text-muted font-weight-bold font-size-h6"
                    >silahkan lakukan registrasi</span
                  >
                </div>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-text-field
                      class="rounded"
                      v-model="form.user_nama"
                      label="Nama"
                      color="#ee8b3d"
                      :rules="rulesNama"
                      hide-details="auto"
                      shaped
                      clearable
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-text-field
                      class="rounded"
                      v-model="form.user_email"
                      label="Email"
                      color="#ee8b3d"
                      :rules="rulesEmail"
                      hide-details="auto"
                      shaped
                      clearable
                    ></v-text-field>
                  </v-col>
  
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-text-field 
                      class="rounded"
                      v-model="form.user_password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      :rules="rulesPwd"
                      hide-details="auto"
                      color="#ee8b3d"
                      shaped
                      label="Password"
                      clearable
                      @click:append="show = !show"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div class="d-flex justify-content-center mb-10">
                  <button
                    :disabled='isDisabled'
                    ref="kt_login_signup_submit"
                    class="btn btn-primary btn-sm font-weight-bolder font-size-h6 rounded-lg py-3 mt-8"
                  >
                    Register
                  </button>
                </div>     
                <div class="text-center mb-10">
                  Already? <a @click="showForm('signin')"  style="cursor: pointer;">Signin here</a>
                  </div>           
              </form>
            </div>
            <!--end::Signup-->
            <!--begin::Forgot-->
            <div class="login-form login-forgot">
              <!--begin::Form-->
              <form
                class="form"
                novalidate="novalidate"
                id="kt_login_forgot_form"
                ref="kt_login_forgot_form"
              >
                <div class="pb-13 pt-lg-0 pt-5">
                  <h3
                    class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                  >
                    Forgotten Password ?
                  </h3>
                  <p class="text-muted font-weight-bold font-size-h4">
                    Enter your email to reset your password
                  </p>
                </div>
                <div class="form-group">
                  <input
                    class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                    type="email"
                    placeholder="Email"
                    name="email"
                    autocomplete="off"
                  />
                </div>
                <div class="form-group d-flex flex-wrap pb-lg-0">
                  <button
                    type="button"
                    id="kt_login_forgot_submit"
                    class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    id="kt_login_forgot_cancel"
                    class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                    @click="showForm('signin')"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <!--end::Forgot-->
          </div>
          <!--begin::Content footer-->
          <div
            class="d-flex justify-content-lg-start justify-content-center align-items-end py-7 py-lg-0"
          >
            <a href="#" class="text-primary font-weight-bolder font-size-h5"
              >Terms</a
            >
            <a href="#" class="text-primary ml-10 font-weight-bolder font-size-h5"
              >Plans</a
            >
            <a href="#" class="text-primary ml-10 font-weight-bolder font-size-h5"
              >Contact Us</a
            >
          </div>
          <!--end::Content footer-->
        </div>
        <!--end::Content-->
      </div>
    </div>
  </v-app>
</template>

<!-- Load login custom page styles -->
<style lang="scss">
@import "@/assets/sass/pages/login/login-1.scss";
</style>

<script>
import formValidation from "@/assets/plugins/formvalidation/dist/es6/core/Core";

// FormValidation plugins
import Trigger from "@/assets/plugins/formvalidation/dist/es6/plugins/Trigger";
import Bootstrap from "@/assets/plugins/formvalidation/dist/es6/plugins/Bootstrap";
import SubmitButton from "@/assets/plugins/formvalidation/dist/es6/plugins/SubmitButton";

import KTUtil from "@/assets/js/components/util";
import { mapGetters, mapState } from "vuex";
import { LOGIN, LOGOUT, REGISTER } from "@/core/services/store/auth.module";
import Swal from "sweetalert2";

export default {
  name: "login-1",
  data() {
    return {
      state: "signin",
      show: false,
      // Remove this dummy login info
      form: {
        user_email: "",
        user_password: "",
        user_nama: ""
      },
      rulesEmail: [
        value => !!value || 'Email Tidak boleh kosong.',
        value => (value && this.reg.test(value)) || 'Format email salah'
      ],
      rulesPwd: [
        value => !!value || 'Tidak boleh kosong.'
      ],
      rulesNama: [
        value => !!value || 'Tidak boleh kosong.'
      ],
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["currentUser"]),

    backgroundImage() {
      return (
        process.env.BASE_URL + "media/bg/aljazary.svg"
      );
    },

    isDisabled(){
      return !this.form.user_email || !this.form.user_password 
      || !this.reg.test(this.form.user_email)
    },
  },
  mounted() {
    const signin_form = KTUtil.getById("kt_login_signin_form");
    const signup_form = KTUtil.getById("kt_login_signup_form");
    const forgot_form = KTUtil.getById("kt_login_forgot_form");

    this.fv = formValidation(signin_form, {
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: "Username is required"
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: "Password is required"
            }
          }
        }
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap()
      }
    });

    this.fv1 = formValidation(signup_form, {
      fields: {
        fullname: {
          validators: {
            notEmpty: {
              message: "Full name is required"
            }
          }
        },
        email: {
          validators: {
            notEmpty: {
              message: "Email is required"
            },
            emailAddress: {
              message: "The value is not a valid email address"
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: "Password is required"
            }
          }
        },
        cpassword: {
          validators: {
            notEmpty: {
              message: "Confirm password is required"
            },
            identical: {
              compare: function() {
                return signup_form.querySelector('[name="password"]').value;
              },
              message: "The password and its confirm are not the same"
            }
          }
        },
        agree: {
          validators: {
            notEmpty: {
              message: "You should agree terms and conditions"
            }
          }
        }
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap()
      }
    });

    this.fv2 = formValidation(forgot_form, {
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: "Email is required"
            },
            emailAddress: {
              message: "The value is not a valid email address"
            }
          }
        }
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap()
      }
    });

    this.fv.on("core.form.valid", () => {
      var user_email = this.form.user_email;
      var user_password = this.form.user_password;

      // clear existing errors
      this.$store.dispatch(LOGOUT);

      // set spinner to submit button
      const submitButton = this.$refs["kt_login_signin_submit"];
      submitButton.classList.add("spinner", "spinner-light", "spinner-right");

      // dummy delay
      setTimeout(() => {
        // send login request
        this.$store
          .dispatch(LOGIN, { user_email, user_password })
          // go to which page after successfully login
          .then(() => this.$router.push({ name: "dashboard" }))
          .catch(() => {});

        submitButton.classList.remove(
          "spinner",
          "spinner-light",
          "spinner-right"
        );
      }, 2000);
    });

    this.fv.on("core.form.invalid", () => {
      Swal.fire({
        title: "",
        text: "Please, provide correct data!",
        icon: "error",
        confirmButtonClass: "btn btn-secondary",
        heightAuto: false
      });
    });

    this.fv1.on("core.form.valid", () => {
      var user_email = this.form.user_email;
      var user_password = this.form.user_password;
      var user_nama = this.form.user_nama;

      // clear existing errors
      this.$store.dispatch(LOGOUT);

      // set spinner to submit button
      const submitButton = this.$refs["kt_login_signup_submit"];
      submitButton.classList.add("spinner", "spinner-light", "spinner-right");

      // dummy delay
      setTimeout(() => {
        // send register request
        this.$store.dispatch(REGISTER, { user_email, user_password, user_nama })
          .then(() => this.$router.push({ name: "dashboard" }))
          .catch(() => {});

        submitButton.classList.remove(
          "spinner",
          "spinner-light",
          "spinner-right"
        );
      }, 2000);
    });

    this.fv1.on("core.form.invalid", () => {
      Swal.fire({
        title: "",
        text: "Please, provide correct data!",
        icon: "error",
        confirmButtonClass: "btn btn-secondary",
        heightAuto: false
      });
    });
  },
  methods: {
    showForm(form) {
      this.state = form;
      var form_name = "kt_login_" + form + "_form";
      KTUtil.animateClass(
        KTUtil.getById(form_name),
        "animate__animated animate__backInUp"
      );
    }
  }
};
</script>
