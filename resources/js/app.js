require('./bootstrap');

import {
    createApp
} from 'vue';
import router from './router'

import StudentsIndex from './components/students/StudentsIndex.vue';
import {
    FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';
import {
    library
} from "@fortawesome/fontawesome-svg-core";
import {
    faChevronLeft,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

library.add(faChevronLeft, faChevronRight);

createApp({
        components: {
            StudentsIndex,
        }
    })
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')