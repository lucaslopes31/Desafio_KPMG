<template>
    <div class="alert alert-success" v-if="message !== ''">
        <p class="m-0">{{ message }}</p>
    </div>
    <div class="mb-md-5 mb-4 text-end">
        <router-link :to="{ name: 'students.create' }" class="btn btn-primary text-white text-uppercase">Cadastrar Estudante</router-link>
    </div>
    <div class="table-responsive">
        <table class="border w-100 text-center">
            <thead>
                <tr>
                    <th class="p-3">
                        <span class="text-uppercase">Matrícula</span>
                    </th>
                    <th class="p-3">
                        <span class="text-uppercase">CPF</span>
                    </th>
                    <th class="p-3">
                        <span class="text-uppercase">E-mail</span>
                    </th>
                </tr>
            </thead>

            <tbody class="">
                <template v-for="item in students.data" :key="item.id">
                    <tr class="border">
                        <td class="p-3 text-truncate">
                            {{ item.matricula }}
                        </td>
                        <td class="p-3 text-truncate">
                            {{ item.cpf }}
                        </td>
                        <td class="p-3 text-truncate">
                            {{ item.email }}
                        </td>
                        <td class="p-3 text-truncate">
                            <router-link :to="{ name: 'students.edit', params: { id: item.id } }" class="btn btn-secondary text-uppercase me-2">
                                Editar
                            </router-link>
                            <button @click="deleteStudent(item.id)" class="btn btn-danger text-uppercase">
                                Excluir
                            </button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

    <div class="my-4">
        <pagination :data="students" align="center" show-disabled=true @pagination-change-page="getStudents">
            <template #prev-nav>
                <i class="fa-solid fa-chevron-left"></i>
            </template>
            <template #next-nav>
                <i class="fa-solid fa-chevron-right"></i>
            </template>
        </pagination>
    </div>
</template>

<script>
    // Here we're using a Composable file here, its code is above
    import useStudents from "../../composables/students";

    // onMounted will define what method to "fire" automatically
    import {
        onMounted
    } from "vue";

    import pagination from "laravel-vue-pagination";

    export default {
        components: {
            pagination,
        },
        // This is a Vue 3 syntax to define the component setup()
        setup() {
            const {
                students,
                message,
                router,
                getStudents,
                destroyStudent
            } = useStudents();

            const deleteStudent = async (id) => {
                if (!window.confirm("O cadastro do estudante será permanentemente excluído. Deseja prosseguir?")) {
                    return;
                }

                await destroyStudent(id);
                await getStudents();
            };

            onMounted(getStudents);

            message.value = router.currentRoute.value.params.message || '';

            return {
                students,
                message,
                deleteStudent,
                getStudents,
            };
        },
    };

</script>
