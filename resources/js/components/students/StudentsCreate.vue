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
                            Cadastrar Estudante
                        </li>
                    </ol>
                </nav>

                <div class="alert alert-danger" v-if="errors !== ''">
                    <font-awesome-icon icon="triangle-exclamation" size="lg" class="me-2" />
                    <span>{{ errors }}</span>
                </div>

                <form @submit.prevent="saveStudent">
                    <div class="form-group mb-3">
                        <label for="matricula">Matrícula</label>
                        <input type="text" class="form-control" id="matricula" name="matricula" placeholder="Digite a matrícula" v-model="form.matricula" v-mask="'####'">
                    </div>

                    <div class="form-group mb-3">
                        <label for="cpf">CPF</label>
                        <input type="text" class="form-control" id="cpf" name="cpf" placeholder="Digite o CPF" v-model="form.cpf" v-mask="'###.###.###-##'">
                    </div>

                    <div class="form-group mb-3">
                        <label for="email">E-mail</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Digite o e-mail" v-model="form.email">
                    </div>

                    <button type="submit" class="btn btn-primary shadow-none">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import useStudents from "../../composables/students";
    import {
        reactive
    } from "vue";
    import {
        mask
    } from "vue-the-mask";

    export default {
        directives: {
            mask
        },
        setup() {
            const form = reactive({
                matricula: "",
                cpf: "",
                email: "",
            });

            const {
                errors,
                storeStudent
            } = useStudents();

            const saveStudent = async () => {
                await storeStudent({
                    ...form
                });
            };

            return {
                form,
                errors,
                saveStudent,
            };
        },
    };

</script>
