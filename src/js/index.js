import axios from 'axios'

async function getResults(query){
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const key = 'b48e381abf5534796a236798cecdcbc6'
    try {
        const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`)
        const recipes = res.data.recipes;
        console.log(recipes)
    } catch (error){
        alert(error);
    }
}
getResults('pizza')

// https://www.food2fork.com/api/search
// b48e381abf5534796a236798cecdcbc6