<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialog from 'primevue/confirmdialog'
import Button from 'primevue/button'
import VPagination from '@hennge/vue3-pagination'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'
import Paginator from 'primevue/paginator'
</script>
<script>
export default {
  components: {
    Column,
    Button,
    DataTable,
    ConfirmDialog,
    Paginator
  },

  data() {
    return {
      pageNum: 1,
      itemsPerPage: 10,
      deletedIds: []
    }
  },

  computed: {
    //listen the getMapSearchList value changed
    ...mapGetters('search', ['getLoading', 'getAllSearchInfoList']),
    ...mapState('search', ['searchList']),
    ifShowAddressList() {
      return this.getAllSearchInfoList.length > 0;
    },
    seachListlength() {
      return this.getAllSearchInfoList.length;
    },
    //The pagination is only happened in current page, so there is no need to
    //use Vuex to do pagination, we can just do it in current page. and this function
    //will always listen pageNum and getAllSearchInfoList, if there is any changed, it will reload
    getSearchPaginatedList() {
      const startIdx = (this.pageNum - 1) * this.itemsPerPage;
      const endIdx = startIdx + this.itemsPerPage;
      return [...this.getAllSearchInfoList].splice(startIdx, endIdx);
    }
  },
  watch: {
    searchList: {
      handler(newValue) {
        //remove the deleted id list when there is no seach list left
        if (newValue.length === 0) {
          this.deletedIds = [];
        }
      },
      deep: true
    }
  },
  methods: {
    async deleteSearch(event) {
      //Ask user to comfirm if deleted
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: async () => {
          await this.$store.dispatch('search/deleteSearchList', [...this.deletedIds]);
        }
      });
    },
    //Change the page so that the data will be query again
    handlePageChange(e){
       this.pageNum = e.page + 1;
    }
  }
}
</script>

<template>
  <div>
    <ConfirmDialog></ConfirmDialog>
    <Button
      label="Delete"
      severity="danger"
      v-if="ifShowAddressList"
      :loading="getLoading"
      :disabled="deletedIds.length === 0 || getLoading"
      @click="deleteSearch($event)"
    />
    <DataTable
      :value="getSearchPaginatedList"
      v-if="ifShowAddressList"
      tableStyle="min-width: 50rem"
      dataKey="id"
    >
      <Column headerStyle="width: 3rem">
        <template #body="rowData">
          <input
            type="checkbox"
            v-model="deletedIds"
            :disabled="getLoading"
            :value="rowData.data.id"
          />
        </template>
      </Column>
      <Column class="col" field="address" header="Address"></Column>
      <Column class="col" field="latLan" header="LatLan">
        <template #body="rowData">
          <span>Lat:{{ rowData.data.latlng.lat }} Lng:{{ rowData.data.latlng.lng }}</span>
        </template>
      </Column>
    </DataTable>
    <span v-else> No data searched Yet </span>
    <Paginator :rows="itemsPerPage" :totalRecords="seachListlength" @page="handlePageChange"></Paginator>
  </div>
</template>
<style scoped>
.col {
  width: 30%;
}
</style>
