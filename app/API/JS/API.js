

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

//search API

function searchApi(){
    axios.get(booksGet)
    
      .then(function(response){
          searchRender(response.data);
      })
      .catch(function(error){
          console.log(error.response);
      })

}



//search render
const searchPageSearch = document.querySelector('.search');
const searchPageSearchBtn = document.querySelector('.searchImg');
const bookListArea = document.querySelector('.bookList');
console.log(searchPageSearchBtn);

searchPageSearchBtn.addEventListener('click',searchApi);

function searchRender(bookData){
    
    console.log(searchPageSearch.value);
    console.log(bookData);
    let strAll = '';
    bookData.forEach((item) => {
        let str = item.bookName; 
        if(str.includes(searchPageSearch.value)){
            strAll += `<div class="col p-0 position-relative m-3" style="width: 15rem;" >
            <img src=${item.img} class="card-img-top" alt="..." >
            <div class="d-flex position-absolute top-50 end-0 mt-5  align-items-center ">
              <div><span class="p-1" role="button"><img class="pagesIcon" src="./assets/images/star2.svg" alt="star"></span></div>
              <div><span class="p-1" role="button"><img class="pagesIcon" src="./assets/images/heart.svg" alt="heart"></span></div>
              <div><span class="p-1" role="button"><img class="pagesIcon" src="./assets/images/share.svg" alt="share"></span></div>      
            </div>
            <div class="card-body ">         
              <div class="row cardIcon ">
                <h5 class=" col-xl-12 card-title">${item.bookName}</h5>
                <div class="col-xl-12 p-1 startag "><img class="starImg" src="./assets/images/star.svg" alt="star">${item.Star}</div>
               </div> 
            </div>
        </div> `
        }
        
    });
    bookListArea.innerHTML = strAll;

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