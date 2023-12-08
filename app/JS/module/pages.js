
const booksGet = "http://localhost:3000/books";

let data = [];


bookPageApi(1);

//searchPageApi

function bookPageApi(p){
    axios.get(`${booksGet}/${p}`)
    
      .then(function(response){
        console.log(response.data);
        data = response.data;
        console.log(data);

      })
      .catch(function(error){
          console.log(error.response);
      })
}

function data1(){
    console.log(data);
}

data1();