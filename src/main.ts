// main.js
import { createApp } from 'vue';
import './style.css';

import App from './App.vue';

import '@fontsource/inter';
import '@fontsource/inter/100.css'; // Thin
import '@fontsource/inter/200.css'; // Extra Light
import '@fontsource/inter/300.css'; // Light
import '@fontsource/inter/400.css'; // Regular
import '@fontsource/inter/500.css'; // Medium
import '@fontsource/inter/600.css'; // Semi Bold
import '@fontsource/inter/700.css'; // Bold
import '@fontsource/inter/800.css'; // Extra Bold
import '@fontsource/inter/900.css'; // Black

// Import Font Awesome library
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faHome } from '@fortawesome/free-solid-svg-icons'; // Add any icons you need
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add the icons to the library
library.add(faCoffee, faHome);

const app = createApp(App);

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
