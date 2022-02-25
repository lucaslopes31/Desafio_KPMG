<template>
    <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="message !== ''">
        <font-awesome-icon icon="circle-check" size="lg" class="me-2" />
        <span>{{ message }}</span>
        <button type="button" class="btn-close shadow-none" data-bs-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"></span>
        </button>
    </div>
    <div class="mb-md-5 mb-4 text-end">
        <router-link :to="{ name: 'students.create' }" class="btn btn-primary shadow-none text-white">
            <font-awesome-icon icon="plus" />
            Cadastrar Estudante
        </router-link>
    </div>
    <div class="table-responsive">
        <table class="border w-100 text-center">
            <thead>
                <tr>
                    <th class="p-3 w-25">
                        <span class="text-uppercase">Matrícula</span>
                    </th>
                    <th class="p-3 w-25">
                        <span class="text-uppercase">CPF</span>
                    </th>
                    <th class="p-3 w-25">
                        <span class="text-uppercase">E-mail</span>
                    </th>
                    <th class="p-3 w-25">
                        <span class="text-uppercase"></span>
                    </th>
                </tr>
            </thead>

            <tbody class="">
                <template v-if="!students.data">
                    <tr class="border">
                        <td class="p-3 text-truncate" colspan="4">
                            <font-awesome-icon icon="spinner" spin size="2x" />
                        </td>
                    </tr>
                </template>
                <template v-else-if="!students.data.length">
                    <tr class="border">
                        <td class="p-3 text-truncate" colspan="4">
                            Nenhum registro cadastrado no sistema.
                        </td>
                    </tr>
                </template>
                <template v-else v-for="item in students.data" :key="item.id">
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
                            <router-link :to="{ name: 'students.edit', params: { id: item.id } }" class="btn btn-secondary shadow-none me-2">
                                <font-awesome-icon icon="pen-to-square" />
                                Editar
                            </router-link>
                            <button @click="deleteStudent(item.id)" class="btn btn-danger shadow-none">
                                <font-awesome-icon icon="trash" />
                                Excluir
                            </button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

    <div class="my-4">
        <pagination :data="students" :show-disabled=true @pagination-change-page="getStudents" align="center">
            <template #prev-nav>
                <font-awesome-icon icon="chevron-left" />
            </template>
            <template #next-nav>
                <font-awesome-icon icon="chevron-right" />
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
    import alert from "bootstrap";

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
