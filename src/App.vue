<script setup>
import Map from './components/Map.vue';
import AddressList from './components/AddressList.vue';
import SearchInput from './components/SearchInput.vue';
import LocateButton from './components/LocateButton.vue'
import TimeZone from './components/TimeZone.vue'
</script>
<script>
export default {
  components: {
    SearchInput,
    Map,
    AddressList,
    LocateButton
  },
};
</script>
<template>
  <div id="appWrap">
    <div id="firstCol">
      <div class='wrapLocTime'>
        <LocateButton/>
        <TimeZone/>
      </div>
      <br><br/>
      <SearchInput/>
      <Map/>
    </div>
    <div id="secCol">
      <AddressList/>
    </div>
  </div>
</template>

<style scoped>

</style>
