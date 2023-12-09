

const booksGet = "http://localhost:3000/books";
const commentGet = "http://localhost:3000/books?_expand=comment";

let data = [];


//接收bookId

const value = window.location.search;
const newvalue = value.split('=')[1];

//帶入bookId

PagebookApi(newvalue);

//PagesBooksApi

const pagesbody = document.querySelector('body');

function PagebookApi(p){
    axios.get(`http://localhost:3000/books/${p}?_embed=comments`)
    
      .then(function(response){
        data = response.data;
        pageRender(data);
        PageCommentRender(data);
       
      })
      .catch(function(error){
        document.querySelector('.bookSection');
          pagesbody.innerHTML = ``;
          console.log(error.response);
          window.setTimeout("alert('無效連結，將導向回首頁')",50);
          setTimeout("location.href='/'",500);
        
      })
}

//PagesCommentsApi

function bookPageApi(p){
  axios.get(`http://localhost:3000/books/${p}`)
  
    .then(function(response){
      data = response.data;
      pageRender(data);
    })
    .catch(function(error){
        console.log(error.response);
    })
}


//PagesRender
const book = document.querySelector('.bookSection');
const bookImg = document.querySelector('.bookImg');
const bookName = document.querySelector('.bookName2');
const bookInfoLeft = document.querySelector('.bookInfoLeft');
const bookInfoRight = document.querySelector('.bookInfoRight');
const bookDescrt = document.querySelector('.bookDescrt');

function pageRender(bookData) {
          
            if(bookData == 0){
              albeer('無此頁面')
            }else{

            bookImg.innerHTML = `<div class="bookImgDiv">
            <img src=${bookData.img} class="bookImg" alt="我真的太難了">
           </div> `;

            bookName.innerHTML = ` 
              <h2>${bookData.bookName}</h2>
              <h4>${bookData.author}</h4>
                   `;
          if(bookData.tags.length === 2){
              
            bookInfoLeft.innerHTML = `
            <p >連載狀態 : ${bookData.SerializationStatus}</p>
            <p>集數 : ${bookData.Episode}</p>
            <p>類別 : <span class="bg-success  p-2 text-white rounded-3">${bookData.tags[0]}</span><span class="bg-success ms-3 p-2 text-white rounded-3">${bookData.tags[1]}</span></p>
            <p>語言 : ${bookData.language}</p>`;

          }else{
            bookInfoLeft.innerHTML = `
            <p >連載狀態 : ${bookData.SerializationStatus}</p>
            <p>集數 : ${bookData.Episode}</p>
            <p>類別 : <span class="bg-success  p-2 text-white rounded-3">${bookData.tags}</span>
            <p>語言 : ${bookData.language}</p>`;
          }

           

           bookInfoRight.innerHTML = `
           <div class="col-6"><p><a class="outsideSiteLink text-dark-50" href="${bookData.link}" >思兔閱讀</a></p></div>
           <div class="col-6"><p><a class="outsideSiteLink text-dark-50" href="https://sto520.com/" >YY書網</a></p></div>
           <div class="col-6"><p><a class="outsideSiteLink text-dark-50" href="https://sto520.com/" >ZZ書網</a></p></div>
           <div class="col-6"><p><a class="outsideSiteLink text-dark-50" href="https://sto520.com/" >XX書網</a></p></div>`;

           bookDescrt.innerHTML = `
           <p class="p-4 lh-lg">${bookData.description}</p>
           `;
          }
      
}


//PagesCommentRender

const commentListArea = document.querySelector('.commentList');
const commentArea = document.querySelector('.commentArea');

function PageCommentRender(commentAllData) {

      let str = '';

      if(commentAllData.comments.length === 0){
        commentArea.innerHTML = `<h2 class="text-center mb-5">無任何留言</h2>`
      }else{

        commentAllData.comments.forEach((item) => {
            str +=  `<div class="card bg-orange-300 mb-3 col-3 col-xl-3 col-md-3 mx-2 px-2 mt-5" style="min-width: 5rem;" >    
            <div class="position-relative mb-3">
              <div class="position-absolute top-50 start-50 translate-middle">
               <img src="./assets/images/Avatar2.png" alt="book">
              </div>   
            </div>
        <div class="card-body bg-white text-center"> 
          <div class="commitTitlt p-3 dotLine2">${item.commenter}</div>
          <div><p class="card-text p-5 fs-5 text-secondary">${item.textContent}</p></div> 
        </div>
           <div class="d-flex justify-content-between card-footer bg-transparent align-items-center ps-2">
              <div class="">${commentAllData.bookName}</div>
              <div class="d-flex row cardIcon align-items-center">
                <div class="col-xl-7 p-1 startag "><img class="starImg" src="./assets/images/star.svg" alt="star">${item.score}</div>
                <div class="col-xl-5 p-1"><a class="ms-1" role="button"><img class="pagesIcon" src="./assets/images/heart.svg" alt="heart"></a></div>
               </div>  
           </div>        
          </div> 
          `
          
      })
    }
    commentListArea.innerHTML = str;
}

//move to Search.html

const pageArea = document.querySelector('.searchDiv');
const pageSearch = document.querySelector('.search')

pageArea.addEventListener('change',pageSearchToSearchPage);

function pageSearchToSearchPage() {
   console.log(pageSearch.value);
   
     if(pageSearch.value === undefined){
      return;
     }else{
      let result = pageSearch.value;
      console.log(result);
      window.open(encodeURI(`http://127.0.0.1:5501/app/search.html?result=${result}`));

     }

}