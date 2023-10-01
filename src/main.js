import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import App from './App.vue'
import store from '../vuex/store'
import confirmationService from 'primevue/confirmationservice';
//load the google place api script here, so that it won't show multiple google apis loading error 
//(the map API and places API cant run in same level of component at same time.)
const script = document.createElement('script');
script.src = `${import.meta.env.VITE_GOOGLE_API_URL}?key=${
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY
}&libraries=places`;
script.async = true;
script.defer = true;
script.onload = () => {
  //start setup app after the google api script file loaded
  const app = createApp(App);
  app.use(PrimeVue);
  app.use(store);
  app.use(confirmationService);
  app.mount('#app');
}
document.head.appendChild(script);
