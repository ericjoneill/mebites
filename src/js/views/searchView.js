import { elements } from './base'

export const getInput = () => elements.searchInput.value;

const renderRecipe = recipe => {
    const markup = `
    <li>
    <a class="results__link results__link--active" href="${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="img/test-1.jpg" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">Pasta with Tomato ...</h4>
            <p class="results__author">The Pioneer Woman</p>
        </div>
    </a>
</li>
`
}

export const renderResults = recipes => {
    recipes.forEach(renderRecipe)
}




// export const add = (a, b) => a+b;
// export const multiply = (a, b) => a*b;
// export const ID = 23;

