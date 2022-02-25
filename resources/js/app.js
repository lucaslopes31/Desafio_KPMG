require('./bootstrap');

import {
    createApp
} from 'vue';
import router from './router'

import StudentsIndex from './components/students/StudentsIndex.vue'
import {
    library
} from "@fortawesome/fontawesome-svg-core"
import {
    faChevronLeft,
    faChevronRight,
    faCircleCheck,
    faClose,
    faPenToSquare,
    faPlus,
    faSpinner,
    faTrash,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons"
import {
    FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(faChevronLeft, faChevronRight, faSpinner, faClose, faPenToSquare, faTrash, faPlus, faCircleCheck, faTriangleExclamation)

createApp({
        components: {
            StudentsIndex
        }
    })
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')