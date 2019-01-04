import { elements } from './base'

export const getInput = () => elements.searchInput.value;

export const clearInput = () => { elements.searchInput.value = '';}

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
}
/**
 * Pasta with tomato and spinach
 * acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
 *acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta','with']
 *acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta','with','tomato']
 */
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
    </a>
</li>
`
elements.searchResList.insertAdjacentHTML('beforeend', markup)
}
// type 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--prev">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-left"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
<!--
<button class="btn-inline results__btn--prev">
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-left"></use>
    </svg>
    <span>Page </span>
</button>
<button class="btn-inline results__btn--next">
    <span>Page 3</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-right"></use>
    </svg>
</button>
-->`

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage)
    if (page === 1 && pages > 1){
        // Only button to go to next page

    } else if (page < pages) {
        // Both buttons
    } else if (page === pages && pages > 1){
        // Only button to go to prev page
    }
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = (page * resPerPage);

    recipes.slice(start, end).forEach(renderRecipe);
}




// export const add = (a, b) => a+b;
// export const multiply = (a, b) => a*b;
// export const ID = 23;

