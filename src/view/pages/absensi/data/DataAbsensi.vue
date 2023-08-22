<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12 col-xxl-4 order-1 order-xxl-2">
        <table-header 
          class="without-min-height"
          @data_row="getDataRow"
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
              v-bind:idMapel="idMapel"
              v-bind:idTahun="idTahun"
              v-bind:accessList="accessListCache"
            ></table-detail>
        </div>
    </div>
  </div>
</template>

<script>
import TableHeader from "@/view/pages/absensi/data/HeaderAbsensi.vue";
import TableDetail from "@/view/pages/absensi/data/DetailAbsensi.vue";
import Services from "@/core/services/aljazary-api/Services";
import ApiService from "@/core/services/api.service";
import localStorage from "@/core/services/store/localStorage";

export default {
  name: 'data-absensi',
  data: () => ({
    idMapel: '',
    showDetail: false,
    isDataReload: true,
    accessListCache: [],
    idTahun: ""

  }),
  components: {
    TableHeader,
    TableDetail
  },
  created() {
    this.loadAcces()
  },
  methods: {
    getDataRow(item){
      if(item){
        this.idMapel = item.mapel_id
        this.idTahun = item.tahun_id
        this.showDetail = true
      }
    },

    hideDetail(item){
      if(item)
      this.showDetail = false
    },

    asyncAccess(){
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
        await this.asyncAccess()
      ])
      .then((results)=> {
        this.isFirstLoad = false
        results
      })
    },

    }
}
</script>