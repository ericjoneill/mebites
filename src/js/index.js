import Search from './models/Search'

// Global state of the app
// Search object
// Current recipe object
// Shopping list object
// Liked recipes

const state = {}

const controlSearch = async () => {
    // 1) Get query from view
    const query = 'pizza'; // TODO

    if (query){
        // 2) New search object and add to state
        state.search = new Search(query)

        // 3) Prepare UI for results

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        console.log(state.search.result)
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})

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