
const booksGet = "http://localhost:3000/books";
let data = [];


//預載入

searchPageApi();

//Search Area
const searchPageSearch = document.querySelector('.search');
const searchPageSearchImg = document.querySelector('.searchImg');

//Select Area
const selectArea = document.querySelector('.selectArea');
const searchPageSelectCategory = document.querySelector('.selectCategory');
const searchPageSelectStar = document.querySelector('.selectStar');

//addEventListener
searchPageSearchImg.addEventListener('click', function() {searchRender(searchPageSearch.value,data)});
selectArea.addEventListener('change',selectRender);

//searchPageApi

 function searchPageApi(){
  axios.get(booksGet)
  
    .then(function(response){
        data = response.data;
        searchResult(data);
    })
    .catch(function(error){
        console.log(error);
    })
}


//searchPageRender
const bookListArea = document.querySelector('.bookList');

function searchPageRender(bookAllData) {
      let str = '';

      bookAllData.forEach((item,index) => {
            str +=  `<div class="col p-0 position-relative m-3"  style="width: 15rem;height: 32rem; " >
            <img src=${item.img} class="card-img-top" alt="..." data-id=${item.id} style="height: 360px;">
            <div class="d-flex position-absolute top-50 end-0 mt-5  align-items-center ">
              <div><span class="p-1" role="button"><img class="pagesIcon" src="./assets/images/star2.svg" alt="star"></span></div>
              <div><span class="p-1" role="button"><img class="pagesIcon bookHeart" data-bookHeartid=${item.id} src="./assets/images/heart.svg" alt="heart"></span></div>
              <div><span class="p-1" role="button"><img class="pagesIcon" src="./assets/images/share.svg" alt="share"></span></div>      
            </div>
            <div class="card-body ">         
              <div class="row cardIcon ">
                <h5 class=" col-xl-12 card-title">${item.bookName}</h5>
                <div class="col-xl-12 p-1 startag "><img class="starImg" src="./assets/images/star.svg" alt="star">${item.Star}</div>
               </div> 
            </div>
        </div> `
        GoodBookData(item.id,index);
      })

     bookListArea.innerHTML = str;
     GoodBookCheckForDisplay();

}

//search render

function searchlistener(){

}

 function searchRender(r,data){
    location.search = `result=${r}`;
    let newData  = data.filter((item) => item.bookName.includes(r));
    if(newData.length === 0){
      alert('無法搜尋到相關書籍');
    }else{
    searchPageRender(newData);
    searchPageSelectCategory.options[0].selected = true;
    searchPageSelectStar.options[0].selected = true;
  }
}

function searchRenderfromPage(r,data){
    
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


let value = window.location.search;
const newvalue = decodeURI(value.split('=')[1]);

//帶入SearchResult

function searchResult(data){
  if(newvalue === 'undefined'){
     return;
   }else if(newvalue === ''){
    searchPageRender(data)
   }else{
    searchPageSearch.value = newvalue;
    searchRenderfromPage(newvalue,data);
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




//判斷是否收藏書籍

let goodBook = [];

let bookLocal = localStorage.getItem('bookId');

function GoodBookData(id,index){
  let bookLocalData = JSON.parse(bookLocal);
  if( bookLocalData === null){
    localStorage.setItem('BookId',JSON.stringify([]));
    return;
  }else if( bookLocalData.indexOf(id) !== -1){
    
    goodBook.push(index);

 }
}

//渲染書籍收藏

function GoodBookCheckForDisplay(){
  
  const bookHeart = document.querySelectorAll('.bookHeart'); 
    goodBook.forEach((item) => {
       
      bookHeart[item].setAttribute('src', './assets/images/heart-full.svg')
  })
  goodBook = [];
}


//聆聽收藏

const bookList = document.querySelector('.bookList');

bookList.addEventListener('click',GoodBooklistener);

function GoodBooklistener(e){

  let bookLocalData = JSON.parse(bookLocal);
  let value = e.target.dataset.bookheartid;
  let numValue = Number(value);

  if(value === null || value === NaN || value === undefined){
    
    return;
  }else{
    if(bookLocalData.includes(numValue)){
      console.log(1);
      let index =  bookLocalData.indexOf(numValue);
      console.log(index);
      bookLocalData.splice(index,1);
      console.log(bookLocalData);
      localStorage.setItem('bookId',JSON.stringify(bookLocalData));
      window.location.reload();
  
    }else{
      console.log(1);
      bookLocalData.push(numValue);
      localStorage.setItem('bookId',JSON.stringify(bookLocalData));
      window.location.reload();
    }
  }
}

