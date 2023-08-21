<template>
    <div>
        <div v-show="showDetail">
            <table-detail
                class="without-min-height" 
                v-bind:idHeader="idHeader"
            ></table-detail>
        </div>
    </div> 
</template>

<script>
import TableDetail from "@/view/pages/pengajaran/santri/HSK/HSK_Detail";

export default {
    components: {
        TableDetail
    },
    mounted() {
        this.Santri_Id  = this.$route.query.id;
    },
    data(){
        return{
            idHeader: '',
            showDetail: true, // Set to true to always show the detail
            isDataReload: true,
            master_data_tahunAjaran: [],
            getData: "",
            Santri_Id: ""
        }
    },
    props: {
        accessList: {
            required: false,
            default: () => []
        }
    },
    methods: {
        getDataRow(item){
            if(item){
                this.idHeader = item.tahun_id
                this.showDetail = true
            }else{
                this.showDetail = false
            }
        }
    }
}
</script>
