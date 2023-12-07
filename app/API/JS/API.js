

const booksGet = "http://localhost:3000/books";
const pagesGet = "http://localhost:3000/books?_expand=commits";
const usersGet = "http://localhost:3000/users";
let data = [];


//預載入

searchPageApi()



//searchPageApi

function searchPageApi(){
    axios.get(booksGet)
    
      .then(function(response){
          data = response.data;
          searchPageRender(data);
      })
      .catch(function(error){
          console.log(error.response);
      })
}

//searchPageRender
const bookListArea = document.querySelector('.bookList');

function searchPageRender(bookAllData) {
      let str = '';
      if(bookAllData.length === 0){
         alert('無法搜尋到相關書籍');
      }else{
      bookAllData.forEach((item) => {
            str +=  `<div class="col p-0 position-relative m-3" style="width: 15rem;" >
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
      })
    }
      bookListArea.innerHTML = str;
}


/*search API

function searchApi(){
    axios.get(booksGet)
    
      .then(function(response){
        searchRender(response.data);
          data = response.data;
          console.log(data);
      })
      .catch(function(error){
          console.log(error.response);
      })

}
*/

//search render
const searchPageSearch = document.querySelector('.search');


searchPageSearch.addEventListener('change',searchRender);

function searchRender(){
    
    newData  = data.filter((item) => item.bookName.includes(searchPageSearch.value));
    searchPageRender(newData);
    searchPageSelectCategory.options[0].selected = true;
    searchPageSelectStar.options[0].selected = true;
}


//select render
const searchArea = document.querySelector('.selectArea');
const searchPageSelectCategory = document.querySelector('.selectCategory');
const searchPageSelectStar = document.querySelector('.selectStar');

searchArea.addEventListener('change',selectRender);

function selectRender(e){
    const CateValue = searchPageSelectCategory.value;
    const StarValue = searchPageSelectStar.value
    //console.log(searchPageSelectCategory.value);
    //console.log(searchPageSelectStar.value);
    console.log(e.target.value);
    //console.log(isNaN(e.target.value));
    //console.log(typeof(e.target.value));
    //isNaN(e.target.value)

           if(e.target.value === undefined){
               return;

           }else if(CateValue === '' && StarValue === ''){
               searchPageRender(data);

           }else if(CateValue !== '' && StarValue === ''){  
               searchPageSearch.value = ''; 
               newDataFormCategory = data.filter((item) => {
                   return  item.tags.includes(CateValue) ;
                     });
                   searchPageRender(newDataFormCategory);

           }else if(StarValue !== '' &&CateValue  === ''){
               searchPageSearch.value = ''; 
               newDataFromStar = data.filter((item) => {
                   let newStar = parseInt(item.Star);
                   let newStartoString = newStar.toString();
                  return newStartoString.includes(StarValue)});
                  searchPageRender(newDataFromStar);
               
           }else{
                searchPageSearch.value = ''; 
                newDataFormCategory = data.filter((item) => {
                    return  item.tags.includes(CateValue) ;
                      });
                    newDataFromStar = newDataFormCategory.filter((item) => {
                        let newStar = parseInt(item.Star);
                        let newStartoString = newStar.toString();
                       return newStartoString.includes(StarValue)});
                       searchPageRender(newDataFromStar);
           }
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