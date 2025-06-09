<template>
    <div class="mt-3">
        <label for="food-quantity">Quantidade (g):</label>

        <input id="food-quantity" :value="quantity" @input="$emit('update:quantity', Number($event.target.value))"
            type="number" class="form-control" min="1" />
    </div>
</template>

<script>
/*
    BLOCO 2: LÓGICA JAVASCRIPT
    Define as propriedades que o componente pode receber.
*/
export default {
    /*
        'props' (propriedades) são a forma como um componente filho recebe dados
        de um componente pai.
    */
    props: {
        // 'quantity' é a propriedade que este componente espera receber.
        quantity: {
            // 'type: Number' define que o valor recebido deve ser um número.
            type: Number,
            // 'required: true' torna obrigatório que o componente pai passe esta propriedade.
            // Se não for passada, o Vue mostrará um aviso no console.
            required: true
        }
    }
    // Nota: Este componente não precisa de 'data()' porque ele não tem um estado interno próprio.
    // Seu valor ('quantity') é totalmente controlado pelo componente pai.
};
</script>
