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

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        // console.log(state.search.result)
        clearLoader()
        searchView.renderResults(state.search.result)
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
const r = new Recipe(46956)
r.getRecipe()
console.log(r)








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