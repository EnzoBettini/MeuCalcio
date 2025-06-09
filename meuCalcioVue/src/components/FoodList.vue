<template>
    <div>
        <h2 class="mt-4">Alimentos consumidos:</h2>
        <ul>
            <li v-for="(food, index) in consumedFoods" :key="index">
                {{ food.name }} — {{ food.quantity }}g — {{ food.calcium.toFixed(1) }} mg cálcio
            </li>
        </ul>
        <h3>Total de Cálcio consumido: {{ totalCalcium.toFixed(1) }} mg</h3>
    </div>
</template>

<script>
/*
    BLOCO 2: LÓGICA JAVASCRIPT
    Aqui definimos de onde vêm os dados (props) e como os cálculos são feitos (computed).
*/
export default {
    /*
        'props' define os dados que este componente espera receber de um componente pai.
    */
    props: {
        // Este componente espera receber uma propriedade chamada 'consumedFoods',
        // que deve ser do tipo Array (uma lista).
        consumedFoods: Array
    },

    /*
        'computed' (Propriedades Computadas) é uma das funcionalidades mais poderosas do Vue.
        Uma propriedade computada é um valor que é calculado automaticamente com base em outras
        propriedades (como 'props' ou 'data').

        Vantagens:
        1. EFICIÊNCIA: O Vue armazena o resultado em cache. 'totalCalcium' só será recalculado
           SE E SOMENTE SE a lista 'consumedFoods' mudar. Se nada mudar, ele simplesmente
           retorna o último valor calculado, sem fazer a conta de novo.
        2. CÓDIGO LIMPO: Mantém a lógica complexa fora do template, tornando-o mais legível.
    */
    computed: {
        // Define a propriedade computada 'totalCalcium'.
        totalCalcium() {
            // Usa o método '.reduce()' do JavaScript para somar valores de um array.
            // '.reduce()' "reduz" a lista a um único valor.
            // - (sum, food) => sum + food.calcium: Para cada 'food' na lista, ele pega o
            //   acumulador 'sum' e soma com o valor de 'food.calcium'.
            // - , 0: O '0' é o valor inicial do acumulador 'sum'.
            return this.consumedFoods.reduce((sum, food) => sum + food.calcium, 0);
        }
    }
};
</script>
