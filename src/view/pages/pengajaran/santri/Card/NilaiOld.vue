<template>
        <div>
            <table-header 
                class="without-min-height"
                @data_row="getDataRow"
                @isDataReload="hideDetail"
                >
            </table-header>
        <div v-show="showDetail">
            <table-detail
            class="without-min-height" 
            v-bind:idHeader="idHeader"
            ></table-detail>
        </div>
        <div v-show="showDetail">
            <table-nasihat
            class="without-min-height" 
            v-bind:idHeader="idHeader"
            ></table-nasihat>
        </div>
    </div> 
</template>

<script>
import TableHeader from "@/view/pages/pengajaran/santri/Nilai/HeaderNilai";
import TableDetail from "@/view/pages/pengajaran/santri/Nilai/DetailNilai";
import TableNasihat from "@/view/pages/pengajaran/santri/Nilai/DetailNasihat";

export default {
    components: {
        TableHeader,
        TableDetail,
        TableNasihat
    },
    data(){
        return{
            title: "hahahah",
            idHeader: '',
            showDetail: false,
            isDataReload: true,
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
        },

        hideDetail(item){
            if(item)
            this.showDetail = false
        }

    }
}
</script>