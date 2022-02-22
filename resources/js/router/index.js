import { createRouter, createWebHistory } from 'vue-router'

import StudentsIndex from '../components/students/StudentsIndex.vue'
import StudentsCreate from '../components/students/StudentsCreate.vue'
import StudentsEdit from '../components/students/StudentsEdit.vue'

const routes = [{
        path: '/',
        name: 'students.index',
        component: StudentsIndex
    },
    {
        path: '/students/create',
        name: 'students.create',
        component: StudentsCreate
    },
    {
        path: '/students/:id/edit',
        name: 'students.edit',
        component: StudentsEdit,
        props: true
    },
];

export default createRouter({
    history: createWebHistory(),
    routes
})