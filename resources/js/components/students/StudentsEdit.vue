<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/">
                                Home
                            </router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            Editar Estudante
                        </li>
                    </ol>
                </nav>

                <div class="alert alert-danger" v-if="errors !== ''">
                    <p class="m-0">{{ errors }}</p>
                </div>

                <form @submit.prevent="saveStudent">
                    <div class="form-group mb-3">
                        <label for="matricula">Matrícula</label>
                        <input type="text" class="form-control" id="matricula" name="matricula" placeholder="Digite a matrícula" v-model="student.matricula" v-mask="'####'">
                    </div>

                    <div class="form-group mb-3">
                        <label for="cpf">CPF</label>
                        <input type="text" class="form-control" id="cpf" name="cpf" placeholder="Digite o CPF" v-model="student.cpf" v-mask="'###.###.###-##'">
                    </div>

                    <div class="form-group mb-3">
                        <label for="email">E-mail</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Digite o e-mail" v-model="student.email">
                    </div>

                    <button type="submit" class="btn btn-primary">
                        Atualizar
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import useStudents from "../../composables/students";
    import {
        onMounted
    } from "vue";
    import {
        mask
    } from "vue-the-mask";

    export default {
        directives: {
            mask
        },
        props: {
            id: {
                required: true,
                type: String,
            },
        },

        setup(props) {
            const {
                errors,
                student,
                updateStudent,
                getStudent
            } = useStudents();

            onMounted(() => getStudent(props.id));

            const saveStudent = async () => {
                await updateStudent(props.id);
            };

            return {
                errors,
                student,
                saveStudent,
            };
        },
    };

</script>
