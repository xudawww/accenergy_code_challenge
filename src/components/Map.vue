<script setup>
import { GoogleMap, MarkerCluster, Marker,CustomMarker  } from 'vue3-google-map';
import { mapGetters } from 'vuex';
import InlineMessage from 'primevue/inlinemessage';

</script>
<script>
export default {
  components: {
    GoogleMap,
    MarkerCluster,
    Marker,
    InlineMessage,
    CustomMarker
  },
  data() {
    return {
      mapApiKey: import.meta.env.VITE_GOOGLE_PLACE_API_KEY
    }
  },
  computed: {
    //listen the getMapSearchList value changed and errormsg
    ...mapGetters('search', ['getMapSearchList','getErrorMsg','getCurrentLocation']),
    //Once it changed generated mappedMaker list
    mappedMarkerList() {
      //this process cant be done in vuex so I choose to map the search list here
      return this.getMapSearchList.map(e=> ({position:e}));
    },
  },


}
</script>
<template>
  <div>
   <InlineMessage severity="error" :text="getErrorMsg" v-if="getErrorMsg" :life="2000">{{getErrorMsg}}</InlineMessage>
   <GoogleMap :api-key="mapApiKey" :center="getCurrentLocation.latlng" :zoom="13" id="map">
    <MarkerCluster>
      <Marker v-for="(ele, i) in mappedMarkerList" :options="ele" :key="i" />
    </MarkerCluster>

   </GoogleMap>
   
  </div>
</template>

<style scoped>
#map {
  height: 500px;
}
</style>
