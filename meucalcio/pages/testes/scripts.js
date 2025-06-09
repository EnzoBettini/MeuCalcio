// Elementos DOM
const foodItemInput = document.getElementById('food-item');
const autocompleteList = document.getElementById('autocomplete-list');
const foodQuantityInput = document.getElementById('food-quantity');
const addFoodBtn = document.getElementById('add-food-btn');
const consumedFoodsList = document.getElementById('consumed-foods-list');
const calciumTotalDisplay = document.getElementById('calcium-total-display');

// Variável para guardar o alimento selecionado da API
let selectedFoodFromAPI = null;

// Lista de alimentos consumidos para calcular o total
let consumedFoods = [];

// Função para buscar alimentos na API GraphQL
async function searchFoodAPI(searchTerm) {
    // Se menos de 3 caracteres, limpa e sai
    if (searchTerm.length < 3) {
        autocompleteList.innerHTML = '';
        return;
    }

    // Query GraphQL para pedir alimentos e cálcio
    const query = `query { getAllFood { name nutrients { calcium } } }`;

    try {
        // Faz a chamada POST para API
        const response = await fetch('https://meucalcio.onrender.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });

        const json = await response.json();

        // Pega todos os alimentos
        const allFoods = json.data.getAllFood;

        // Filtra localmente os que contem o termo digitado
        const filteredFoods = allFoods.filter(food =>
            food.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Limpa sugestões anteriores
        autocompleteList.innerHTML = '';

        // Mostra até 10 sugestões
        filteredFoods.slice(0, 10).forEach(food => {
            const div = document.createElement('div');
            div.textContent = food.name;

            // Quando clicar numa sugestão, coloca no input e guarda o alimento selecionado
            div.addEventListener('click', () => {
                foodItemInput.value = food.name;
                selectedFoodFromAPI = food;
                autocompleteList.innerHTML = '';
            });

            autocompleteList.appendChild(div);
        });

        // Se nada encontrado, mostra mensagem
        if (filteredFoods.length === 0) {
            autocompleteList.innerHTML = '<div>Nenhum alimento encontrado.</div>';
        }
    } catch (error) {
        console.error('Erro ao buscar alimentos:', error);
        autocompleteList.innerHTML = '<div>Erro na busca.</div>';
    }
}

// Quando o usuário digitar no input de alimento, chama a busca na API
foodItemInput.addEventListener('input', () => {
    searchFoodAPI(foodItemInput.value);
});

// Função para adicionar alimento consumido
function addFoodItem() {
    // Pega valores dos inputs
    const foodName = foodItemInput.value.trim();
    const quantity = parseFloat(foodQuantityInput.value);

    // Valida se o alimento veio da lista da API
    if (!selectedFoodFromAPI || selectedFoodFromAPI.name !== foodName) {
        alert('Por favor, selecione um alimento da lista.');
        return;
    }

    // Valida quantidade
    if (isNaN(quantity) || quantity <= 0) {
        alert('Insira uma quantidade válida.');
        return;
    }

    // Pega cálcio por 100g do alimento
    const calciumPer100g = selectedFoodFromAPI.nutrients.calcium;

    if (calciumPer100g === undefined || isNaN(calciumPer100g)) {
        alert('Este alimento não possui dados de cálcio.');
        return;
    }

    // Calcula cálcio proporcional à quantidade
    const calciumAmount = (calciumPer100g / 100) * quantity;

    // Adiciona na lista de consumidos
    consumedFoods.push({
        name: foodName,
        quantity: quantity,
        calcium: calciumAmount
    });

    // Atualiza lista na tela e total
    renderConsumedFoods();
    updateTotalCalcium();

    // Limpa campos para nova entrada
    foodItemInput.value = '';
    foodQuantityInput.value = 100;
    selectedFoodFromAPI = null;
    autocompleteList.innerHTML = '';
}

// Função para mostrar lista de alimentos consumidos na tela
function renderConsumedFoods() {
    consumedFoodsList.innerHTML = '';
    consumedFoods.forEach(food => {
        const li = document.createElement('li');
        li.textContent = `${food.name} — ${food.quantity}g — ${food.calcium.toFixed(1)} mg cálcio`;
        consumedFoodsList.appendChild(li);
    });
}

// Atualiza o total de cálcio consumido
function updateTotalCalcium() {
    const total = consumedFoods.reduce((sum, food) => sum + food.calcium, 0);
    calciumTotalDisplay.textContent = total.toFixed(1);
}

// Evento para adicionar alimento ao clicar no botão
addFoodBtn.addEventListener('click', addFoodItem);
