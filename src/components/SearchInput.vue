<script setup>
import InputText from 'primevue/inputtext'
import axios from 'axios'
import Button from 'primevue/button'
import { mapGetters } from 'vuex'
</script>
<script>
export default {
  setup() {
    const autocomplete = ref(null);
    return {
      autocomplete
    }
  },

  data() {
    //The state needs to be used in current component
    return {
      address: '',
      autoInput: false,
      addressLastPickObj: {
        address: '',
        latlng: null
      }
    }
  },
  computed: {
    //listen the search loading value changed
    ...mapGetters('search', ['getLoading'])
  },
  mounted() {
    //setup auto completion when first time
    this.initAutocomplete();
  },
  onUnmounted() {
    //remove the listner when unounted
    if (this.autocomplete) this.autocomplete.removeListener('place_changed', this.placeChangeEvent);
  },
  methods: {
    initAutocomplete() {
      //listen when user select location
      const input = document.getElementById('autocomplete-input');
      this.autocomplete = new google.maps.places.Autocomplete(input);
      this.autocomplete.addListener('place_changed', this.placeChangeEvent);
    },
    placeChangeEvent() {
      const place = this.autocomplete.getPlace();
      //check if the address is selected from list, or just mannually input
      this.autoInput = place.geometry ? true : false;
      //Store last pick address, and set current input text value address equals to addressress
      if (place.formatted_address) {
        this.addressLastPickObj.address = place.formatted_address;
        this.address = place.formatted_address;
      }
      //store the lat and lng so that we can have the mark
      if (place.geometry.location) {
        this.addressLastPickObj.latlng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
      }
    },
    //Submit search and reset address texd control after searching
    async submitSearch() {
      await this.$store.dispatch('search/insertSearchList', { ...this.addressLastPickObj });
      this.address = '';
    }
  }
}
</script>
<template>
  <div class="p-inputgroup flex-1 inputSeachWrap">
    <InputText
      v-model="address"
      :disabled="getLoading"
      placeholder="Search"
      id="autocomplete-input"
      class="inputSeach"
    />
    <Button
      label="Search"
      :loading="getLoading"
      @click="submitSearch"
      :disabled="!autoInput || address !== this.addressLastPickObj.address"
    />
  </div>
</template>

<style scoped>
.inputSeach {
  width: 90%;
}
</style>
