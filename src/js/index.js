import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import { renderLoader, elements, clearLoader } from './views/base'
 
// Global state of the app
// Search object
// Current recipe object
// Shopping list object
// Liked recipes

const state = {}

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

/** SEARCH CONTROLLER
 * 
 */
// const r = new Recipe(46956)
// r.getRecipe()
// console.log(r)

const controlRecipe = async () => {
    // Get ID from URL
    const id = window.location.hash.replace('#','');
    console.log(id)

    if (id){
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id)
        // Get recipe data
        try{
        await state.recipe.getRecipe();

        // Calculate sevings and time
        state.recipe.calcTime()
        state.recipe.calcServings();
        // Render Recipe
        console.log(state.recipe)
        } catch(err){
            alert('Error processing recipe!')
        }
    }
}

// window.addEventListener('hashchange', controlRecipe)
// window.addEventListener('load',controlRecipe)

const wel = window.addEventListener;

['hashchange','load'].forEach(event => wel(event, controlRecipe))





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