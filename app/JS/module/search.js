
const booksGet = "http://localhost:3000/books";
let data = [];


//預載入

searchPageApi();

//Search Area
const searchPageSearch = document.querySelector('.search');

//Select Area
const selectArea = document.querySelector('.selectArea');
const searchPageSelectCategory = document.querySelector('.selectCategory');
const searchPageSelectStar = document.querySelector('.selectStar');

//addEventListener
searchPageSearch.addEventListener('change', function() {searchRender(searchPageSearch.value,data)});
selectArea.addEventListener('change',selectRender);

//searchPageApi

 function searchPageApi(){
  axios.get(booksGet)
  
    .then(function(response){
        data = response.data;
        searchPageRender(data);
        searchResult(data);
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
            str +=  `<div class="col p-0 position-relative m-3"  style="width: 15rem;height: 32rem; " >
            <img src=${item.img} class="card-img-top" alt="..." data-id=${item.id} style="height: 360px;">
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

//search render

 function searchRender(r,data){
    let newData  = data.filter((item) => item.bookName.includes(r));
    searchPageRender(newData);
    searchPageSelectCategory.options[0].selected = true;
    searchPageSelectStar.options[0].selected = true;
}


//select render

 function selectRender(e){
  const CateValue = searchPageSelectCategory.value;
  const StarValue = searchPageSelectStar.value

           if(e.target.value === undefined){
               return;

           }else if(CateValue === '' && StarValue === ''){
               searchPageRender(data);

           }else if(CateValue !== '' && StarValue === ''){  
               searchPageSearch.value = ''; 
               let newDataFormCategory = data.filter((item) => {
                   return  item.tags.includes(CateValue) ;
                     });
                   searchPageRender(newDataFormCategory);

           }else if(StarValue !== '' &&CateValue  === ''){
               searchPageSearch.value = ''; 
               let newDataFromStar = data.filter((item) => {
                   let newStar = parseInt(item.Star);
                   let newStartoString = newStar.toString();
                  return newStartoString.includes(StarValue)});
                  searchPageRender(newDataFromStar);
               
           }else{
                searchPageSearch.value = ''; 
                let newDataFormCategory = data.filter((item) => {
                    return  item.tags.includes(CateValue) ;
                      });
                      let newDataFromStar = newDataFormCategory.filter((item) => {
                        let newStar = parseInt(item.Star);
                        let newStartoString = newStar.toString();
                       return newStartoString.includes(StarValue)});
                       searchPageRender(newDataFromStar);
           }
}



//接收SearchResult from pages


const value = window.location.search;
const newvalue = decodeURI(value.split('=')[1]);

//帶入SearchResult

function searchResult(data){
  console.log(newvalue);
  if(newvalue === 'undefined'){
       return;
   }else{
    searchPageSearch.value = newvalue;
    searchRender(newvalue,data);
   }

}

//move to pages.html

const toPages = document.querySelector('.bookList');
toPages.addEventListener('click', getBookId);


function getBookId(e){
    if(e.target.dataset.id === undefined){
        return;   
    }else{
        let pageId = e.target.dataset.id;
        console.log(e.target.dataset.id);
        window.open(`http://127.0.0.1:5501/app/pages.html?Id=${pageId}`);
    }
}

