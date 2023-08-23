<template>
  <div class="container-fluid">
    <div v-show="accessListCache.R">
      <div class="row">
        <div class="col-lg-12 col-xxl-4 order-1 order-xxl-2">
          <table-header 
            class="without-min-height"
            @detail-agenda="getDataDetail"
            @isDataReload="hideDetail"
            v-bind:accessList="accessListCache"
            >
          </table-header>
        </div>
      </div>
      <div class="row" v-show="showDetail">
          <div class="col-lg-12 col-xxl-4 order-1 order-xxl-2">
              <table-detail
                class="without-min-height" 
                v-bind:accessList="accessListCache"
              ></table-detail>
          </div>
      </div>
    </div>

    <div v-show="accessListCache.R == 0">
      <div class="d-flex justify-content-center">
        <img src="media/bg/access.png" alt="Tidak Ada Access" width="35%">
      </div>
    </div>
  </div>
</template>

<script>
import TableHeader from "@/view/pages/absensi/agenda/HeaderAgenda.vue";
import TableDetail from "@/view/pages/absensi/agenda/DetailAgenda.vue";
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import localStorage from "@/core/services/store/localStorage";

export default {
  name: 'agenda',
  data: () => ({
    showDetail: false,
    isDataReload: true,
    accessListCache: [],
  }),
  components: {
    TableHeader,
    TableDetail
  },
  created() {
    this.loadAcces()
  },
  methods: {
    getDataDetail(item){
      this.$emit("get_detail_agenda", item);
      this.showDetail = true
    },

    hideDetail(item){
      if(item)
      this.showDetail = false
    },

    asyncAccessLaporan(){
      return new Promise(resolve => {
        var mydata = {
            UID: localStorage.getLocalStorage("uid"),
            Token: localStorage.getLocalStorage("token"),
            Trigger: "R",
            Route: "READ_AKSES",
            menu_url: this.$router.currentRoute.path
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
            this.accessListCache = response.data[0];
          },
          err => {
              err;
          }
        );
      });
    },

    async loadAcces(){
      Promise.all([  
        await this.asyncAccessLaporan()
      ])
      .then((results)=> {
        this.isFirstLoad = false
        results
      })
    },

    }
}
</script>