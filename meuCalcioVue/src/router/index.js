import { createRouter, createWebHistory } from 'vue-router';
import ControleCalcio from '../components/ControleCalcio.vue';

const routes = [
    {
        path: '/controle-calcio',
        name: 'ControleCalcio',
        component: ControleCalcio
    },
    // outras rotas
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
