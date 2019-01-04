import axios from 'axios'
import { key, proxy } from '../config'
// 656bef8b10c143a7681b10cbdc689bbd
// b48e381abf5534796a236798cecdcbc6

export default class Search {
    constructor(query) {
        this.query = query;
    }

        async getResults(){
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

