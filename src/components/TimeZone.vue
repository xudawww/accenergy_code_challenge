<script setup>
import { mapGetters } from 'vuex'
import axios from 'axios'
</script>
<script>
export default {
  components: {},
  data() {
    return {
      timeZoneInfo: null
    };
  },
  computed: {
    //listen the getMapSearchList value changed
    ...mapGetters('search', ['getCurrentLocation']),
  },
  watch: {
    async getCurrentLocation(newVal) {
      if (this.getCurrentLocation) {
        const { lat, lng } = this.getCurrentLocation.latlng;
        try {
          //Get the time zone by the time zone google api(You dont need do this from vuex because only this
          //component need to call api, and only here needs the timezone)
          const res = await axios.get(
            `${import.meta.env.VITE_GOOGLE_TIMEZONE_API_URL}?location=${lat},${lng}&timestamp=${
              Date.now() / 1000
            }&key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`
          );
          //Calc the timezone once if there data is valid
          if (res.data) {
            const { timeZoneId, timeZoneName } =res.data;
            const localTime = new Date().toLocaleString('en-US', { timeZone: timeZoneId });
            this.timeZoneInfo = `Timezone last searched : ${timeZoneName}, local time: ${localTime}`;
          }
        } catch (err) {
          alert('Cant get the timezone!');
        }
      }
    }
  }
}
</script>
<template>
  <span>{{ timeZoneInfo }}</span>
</template>

<style scoped></style>
