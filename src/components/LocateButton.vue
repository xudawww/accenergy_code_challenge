<script setup>
import Button from 'primevue/button'
import { mapGetters } from 'vuex'
</script>
<script>
export default {
  components: {
    Button
  },
  computed: {
    //listen the search loading value changed
    ...mapGetters('search', ['getLoading'])
  },
  methods: {
    //Please this is getting current location and send to vuex, so that map can
    //move camera, but dont move the map(meaning not using our search function to move map), or the camera wont move

    async getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          //get current location
          const addressName = "Your location";
          await this.$store.dispatch('search/insertSearchList', {
            address: addressName,
            latlng: { lat: position.coords.latitude, lng: position.coords.longitude }
          });
        },
        () => {
          //error to get current location
          alert("Can't get current location");
        }
      );
    }
  }
}
</script>
<template>
  <Button label ="Locate" :disabled="getLoading" :loading="getLoading"  @click="getCurrentLocation"/>
</template>

<style scoped>
#map {
  height: 500px;
}
</style>
