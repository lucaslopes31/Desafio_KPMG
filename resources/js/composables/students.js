import {
    ref
} from 'vue'
import axios from 'axios'
import {
    useRouter
} from 'vue-router'

export default function useStudents() {
    const student = ref([])
    const students = ref([])

    const errors = ref('')
    const message = ref('')
    const router = useRouter()

    const getStudents = async(page = 1) => {
        let response = await axios.get(`/api/students?page=${page}`)
        students.value = response.data
    }

    const getStudent = async(id) => {
        let response = await axios.get(`/api/students/${id}`)
        student.value = response.data.data
    }

    const storeStudent = async(data) => {
        errors.value = ''
        try {
            let response = await axios.post('/api/students', data)
            let message = response.data.message
            await router.push({
                name: 'students.index',
                params: { message }
            })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }

    }

    const updateStudent = async(id) => {
        errors.value = ''
        try {
            let response = await axios.patch(`/api/students/${id}`, student.value)
            let message = response.data.message
            await router.push({
                name: 'students.index',
                params: { message }
            })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    const destroyStudent = async(id) => {
        let response = await axios.delete(`/api/students/${id}`)
        message.value = response.data.message
    }

    return {
        errors,
        message,
        router,
        student,
        students,
        getStudent,
        getStudents,
        storeStudent,
        updateStudent,
        destroyStudent
    }
}