import axios from 'axios'

export default class Search {
    constructor(query) {
        this.query = query;
    }

        async getResults(){
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const key = 'b48e381abf5534796a236798cecdcbc6'
            try {
                const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
                this.result = res.data.recipes;
                // console.log(this.result)
            } catch (error){
                alert(error);
            }

// https://www.food2fork.com/api/search
// b48e381abf5534796a236798cecdcbc6
    }
}

