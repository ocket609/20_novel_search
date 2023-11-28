

const booksGet = "http://localhost:3000/books";
const pagesGet = "http://localhost:3000/books?_expand=commits";
const usersGet = "http://localhost:3000/users";



function indexRender(){
     axios.get(booksGet)
     
       .than(function(response){
           console.log(response.data);
       })
       .catch(function(error){
           console.log(error.response);
       })

}

function pagesRender(){
    axios.get(booksGet)
    
      .than(function(response){
          console.log(response.data);
      })
      .catch(function(error){
          console.log(error.response);
      })

}


function searchRender(){
    axios.get(serachGet)
    
      .than(function(response){
          console.log(response.data);
      })
      .catch(function(error){
          console.log(error.response);
      })

}

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