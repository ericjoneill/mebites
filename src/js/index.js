import Search from './models/Search'
import Recipe from './models/Recipe'
import List from './models/List'

import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'

import { renderLoader, elements, clearLoader } from './views/base'
 
// Global state of the app
// Search object
// Current recipe object
// Shopping list object
// Liked recipes

const state = {}

/** SEARCH CONTROLLER
 * 
 */

const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput(); // TODO
    console.log(query)
    if (query){
        // 2) New search object and add to state
        state.search = new Search(query)
        
        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes)

        try {
        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        // console.log(state.search.result)
        clearLoader()
        searchView.renderResults(state.search.result)
        } catch (err){
            alert('Smething wrong with the search..')
            clearLoader()
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    // console.log(btn)
    if (btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage)
        // console.log(goToPage)
    }
})

// const r = new Recipe(46956)
// r.getRecipe()
// console.log(r)

const controlRecipe = async () => {
    // Get ID from URL
    const id = window.location.hash.replace('#','');
    console.log(id)

    if (id){
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id)
        // Create new recipe object
        state.recipe = new Recipe(id)
        // Get recipe data and parse ingredients
        try{
        await state.recipe.getRecipe();        state.recipe.parseIngredients();
        // Calculate sevings and time
        state.recipe.calcTime()
        state.recipe.calcServings();
        // Render Recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe);
        } catch(err){
            alert('Error processing recipe!')
        }
    }
}

// window.addEventListener('hashchange', controlRecipe)
// window.addEventListener('load',controlRecipe)

const wel = window.addEventListener;

['hashchange','load'].forEach(event => wel(event, controlRecipe))


/**
 * LIST CONTROLLER
 */

 const controlList = () => {
     // Create a new list IF there is none yet
     if (!state.list) state.list = new List()

     // Add each ingredient to the list and UI
     state.recipe.ingredients.forEach(el => {
         const item = state.list.addItem(el.count, el.unit, el.ingredient)
         listView.renderItem(item)
     })
 }

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        // Decrease button is clicked
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec')
            recipeView.updateServingsIngredients(state.recipe)
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc')
        recipeView.updateServingsIngredients(state.recipe)

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    }
})



window.l = new List();

// const search = new Search('pizza')
// console.log(search)
// search.getResults()










// import axios from 'axios'

// async function getResults(query){
//     const proxy = 'https://cors-anywhere.herokuapp.com/'
//     const key = 'b48e381abf5534796a236798cecdcbc6'
//     try {
//         const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`)
//         const recipes = res.data.recipes;
//         console.log(recipes)
//     } catch (error){
//         alert(error);
//     }
// }
// getResults('pizza')

// // https://www.food2fork.com/api/search
// // b48e381abf5534796a236798cecdcbc6