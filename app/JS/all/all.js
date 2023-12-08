import * as search_module from '../module/search.js'

const pagesGet = "http://localhost:3000/books?_expand=commits";
const usersGet = "http://localhost:3000/users";

//預載入

search_module.searchPageApi();



function haveLogin(){
    axios.get(usersGet)
    
    .than(function(response){
        console.log(response.data);
    })
    .catch(function(error){
        console.log(error.response);
    })
}

function searchButton(){
    axios.get(`booksGet?s=${搜尋名}`)
    
    .than(function(response){
        console.log(response.data);
    })
    .catch(function(error){
        console.log(error.response);
    })
}


function searchSelect(){
    
}