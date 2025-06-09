<template>
    <div class="container mt-4">
        <h1>Controle de Cálcio</h1>

        <FoodSearch @food-selected="onFoodSelected" />

        <FoodQuantityInput v-model:quantity="quantity" />

        <button class="btn btn-primary mt-3" @click="addFoodItem">Adicionar alimento</button>

        <FoodList :consumedFoods="consumedFoods" />
    </div>
</template>

<script>
// BLOCO 2: LÓGICA JAVASCRIPT (O Cérebro da Aplicação)

// 1. Importamos os "blocos de montar" (componentes filhos) que vamos usar.
import FoodSearch from './FoodSearch.vue';
import FoodQuantityInput from './FoodQuantityInput.vue';
import FoodList from './FoodList.vue';

export default {
    // 2. Registramos os componentes importados para que possam ser usados no <template>.
    components: { FoodSearch, FoodQuantityInput, FoodList },

    // 3. 'data()' armazena o estado central da nossa aplicação. É a "fonte da verdade".
    data() {
        return {
            // Guarda o objeto do alimento que foi selecionado no componente FoodSearch. Inicia como nulo.
            selectedFood: null,
            // Guarda o valor numérico do componente FoodQuantityInput. Inicia com 100.
            quantity: 100,
            // A lista final de alimentos que foram adicionados pelo usuário. Inicia vazia.
            consumedFoods: []
        };
    },

    // 4. 'methods' contém as funções que controlam a lógica da aplicação.
    methods: {
        // Esta função é o "ouvinte" para o evento do FoodSearch.
        // O parâmetro 'food' é o dado que veio junto com o evento emitido pelo filho.
        onFoodSelected(food) {
            this.selectedFood = food;
        },

        // Esta função é chamada quando o botão "Adicionar alimento" é clicado.
        addFoodItem() {
            // --- Bloco de Validação ---
            // Verifica se um alimento foi realmente selecionado.
            if (!this.selectedFood) {
                alert('Selecione um alimento válido.');
                return; // Para a execução se for inválido.
            }
            // Verifica se a quantidade é um número positivo.
            if (this.quantity <= 0 || isNaN(this.quantity)) {
                alert('Insira uma quantidade válida.');
                return;
            }
            // Pega a quantidade de cálcio (por 100g) do alimento selecionado.
            const calciumPer100g = this.selectedFood.nutrients.calcium;
            // Verifica se o dado de cálcio existe e é um número.
            if (isNaN(calciumPer100g)) {
                alert('Este alimento não possui dados de cálcio.');
                return;
            }

            // --- Bloco de Cálculo e Atualização ---
            // Calcula a quantidade de cálcio real com base na quantidade inserida pelo usuário.
            const calciumAmount = (calciumPer100g / 100) * this.quantity;

            // Adiciona o novo item à lista de alimentos consumidos.
            // Como 'consumedFoods' é reativa, o componente <FoodList> vai se
            // atualizar automaticamente para mostrar este novo item!
            this.consumedFoods.push({
                name: this.selectedFood.name,
                quantity: this.quantity,
                calcium: calciumAmount
            });

            // --- Bloco de "Limpeza" ---
            // Reseta os campos para a próxima adição, melhorando a experiência do usuário.
            this.selectedFood = null; // Limpa a seleção (mas o nome continua no input do FoodSearch)
            this.quantity = 100; // Reseta a quantidade para o valor padrão.
        }
    }
};
</script>
