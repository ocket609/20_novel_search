const booksGet = "http://localhost:3000/books";
const commentGet = "http://localhost:3000/books?_expand=comment";

let data = [];

//接收bookId

const value = window.location.search;
const newvalue = value.split("=")[1];
//帶入bookId

window.addEventListener("load",PagebookApi(newvalue));


//PagesBooksApi

const pagesbody = document.querySelector("body");

function PagebookApi(p) {
  axios
    .get(`https://demo-9j6o.onrender.com/books/${p}?_embed=comments`)

    .then(function (response) {
      data = response.data;
      pageRender(data);
      PageCommentRender(data);
    })
    .catch(function (error) {
      console.log(error);
      if(newvalue === '' || error.response.status === 404){
         document.querySelector(".bookSection");
         pagesbody.innerHTML = ``;
         window.setTimeout("alert('無效連結，將導向回首頁')", 50);
         setTimeout("location.href='/'", 500);      
      }
    });
};

//PagesRender
const book = document.querySelector(".bookSection");
const bookImg = document.querySelector(".bookImg");
const bookName = document.querySelector(".bookName2");
const bookInfoLeft = document.querySelector(".bookInfoLeft");
const bookInfoRight = document.querySelector(".bookInfoRight");
const bookDescrt = document.querySelector(".bookDescrt");
const bookHeart = document.querySelector(".bookHeart");

function pageRender(bookData) {
  if (bookData == 0) {
    albeer("無此頁面");
  } else {
    bookImg.innerHTML = `<div class="bookImgDiv">
            <img src=${bookData.img} class="bookImg" alt="我真的太難了" style="min-width:200px;">
           </div> `;

    bookName.innerHTML = ` 
              <h2>${bookData.bookName}</h2>
              <h4>${bookData.author}</h4>
                   `;

    if (bookData.tags.length === 2) {
      bookInfoLeft.innerHTML = `
            <p >連載狀態 : ${bookData.SerializationStatus}</p>
            <p>集數 : ${bookData.Episode}</p>
            <p>類別 : <span class="bg-success  p-1 text-white rounded-3">${bookData.tags[0]}</span><span class="bg-success ms-3 p-1 text-white rounded-3">${bookData.tags[1]}</span></p>
            <p>語言 : ${bookData.language}</p>`;
    } else {
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
};

//PagesCommentRender

const commentListArea = document.querySelector(".mySwiper");
const commentArea = document.querySelector(".commentArea");

function PageCommentRender(commentAllData) {
  let str = "";

  if (commentAllData.comments.length === 0) {
    commentArea.innerHTML = `<h2 class="text-center mb-5">無任何留言</h2>`;
  } else {
    commentAllData.comments.forEach((item, index) => {
      str += `
          <swiper-slide class="card bg-orange-300 position-relative mt-5 swiper-slide-active " 
          role="group" style="width: 365.333px;height:auto; margin-right: 10px;>
          <div  class="">
           <img src="./assets/images/Avatar2.png" alt="book" style="" class="position-absolute top-0 start-50 translate-middle">
           </div> 
    <div class="card-body bg-white text-center mt-3"> 
      <div class="commitTitlt p-3 dotLine2">${item.commenter}</div>
      <div><p class="card-text p-5 fs-5 text-secondary">${item.textContent}</p></div> 
    </div>
       <div class="d-flex justify-content-between card-footer bg-transparent align-items-center ps-2">
          <div class="">${commentAllData.bookName}</div>
          <div class="d-flex row cardIcon ms-2 align-items-center">
            <div class="col-xl-6 p-1 startag "><img class="starImg" src="./assets/images/star.svg" alt="star">${item.score}</div>
            <div class="col-xl-6 p-1"><a class="ms-1" role="button"><img class="pagesIcon commentheart" src="./assets/images/thumb_up_off_alt.svg" alt="heart" data-heartid=${item.id}></a></div>
           </div>  
       </div>       
    </swiper-slide>
          `;
      //GoodcommentData(item.id, index);
    });
  }
  commentListArea.innerHTML = str;
  //GoodcommentCheckForDisplay();
  islogin();
};

//move to Search.html

const pageArea = document.querySelector(".searchDiv");
const pageSearch = document.querySelector(".search");
const pageSearchImg = document.querySelector(".searchImg");

pageSearchImg.addEventListener("click", pageSearchToSearchPage);
pageArea.addEventListener("keyup", function(e){
    if(e.key === 'Enter'){
      pageSearchToSearchPage();
    }else{
      return;
    }
});

function pageSearchToSearchPage() {
  if (pageSearch.value === undefined || pageSearch.value === "") {
    return;
  } else {
    let result = pageSearch.value;
    pageSearch.value = "";
    location.assign(
      encodeURI(
        //`https://ocket609.github.io/20_novel_search/app/search.html?result=${result}`
        `http://127.0.0.1:5501/app/search.html?result=${result}`
      )
    );
  }
};

//test

const now = new Date()
const loginInfo = {
  value: 'true',
  expired: now.getTime()  +3600000
};
//localStorage.setItem('loginStatuswithExpired', JSON.stringify(loginInfo))

const itemStr = localStorage.getItem('loginStatuswithExpired');
const item = JSON.parse(itemStr);

function islogin(){
  
  console.log((new Date().getTime()/1000),'now');
  console.log((item.expired/1000),'token');
  
   if(new Date().getTime() > item.expired){
    setTimeout(() => {
      const item2 = {
        value: 'false',
        expired: item.expired
      }
         localStorage.setItem('loginStatuswithExpired', JSON.stringify(item2))
     }, 6000)
     console.log('請重新登入');
     console.log(item.value);
     }else{       

      console.log('已登入');
      goodBookCheckForDisplay(item.value);
      GoodcommentCheckForDisplay(item.value);
      console.log(item.value);
     }
};



const newvalueNum = Number(newvalue);
let bookLocal = localStorage.getItem("bookId");
let bookLSdata = JSON.parse(bookLocal);

//聆聽收藏書籍

bookHeart.addEventListener("click", goodBookListener);

function goodBookListener(e) {
  if(item.value == 'false'){
    alert('請先登入唷~\n將跳轉至登入頁面!!!');
    return;
  }
  if (bookLSdata === null) {
    localStorage.setItem("bookId", JSON.stringify([]));
    return;
  } else if (bookLSdata.includes(newvalueNum)) {
    let index = bookLSdata.indexOf(newvalueNum);
    bookLSdata.splice(index, 1);
    localStorage.setItem("bookId", JSON.stringify(bookLSdata));
    e.target.setAttribute("src", "./assets/images/heart.svg");
    alert('收藏已取消!!');
  } else {
    bookLSdata.push(newvalueNum);
    localStorage.setItem("bookId", JSON.stringify(bookLSdata));
    e.target.setAttribute("src", "./assets/images/heart-full.svg");
    alert('收藏成功!!');
  }
};

//判斷是否收藏書籍 & 渲染收藏書籍

//window.addEventListener("load", goodBookCheckForDisplay);

function goodBookCheckForDisplay(){
  let bookLocaldata = JSON.parse(bookLocal);
  if(arguments[0] == false){
    return;
  }

  if (bookLocaldata.includes(newvalueNum)) {
    bookHeart.setAttribute("src", "./assets/images/heart-full.svg")
  } else {
    bookHeart.setAttribute("src", "./assets/images/heart.svg");
  }
};

//判斷是否按讚留言



/*
function GoodcommentData(id, index) {

  console.log(arguments);
   if(arguments[0] == false){
    return;
  }
  let test = JSON.parse(heartLocal);
  if (test === null) {
    localStorage.setItem("heartId", JSON.stringify([]));
    return;
  } else if (test.indexOf(id) !== -1) {
    goodComment.push(index);
  }
}
*/

//判斷是否按讚留言 & 渲染留言按讚

let heartLocal = localStorage.getItem("heartId");

function GoodcommentCheckForDisplay() {
  const commentHeart = document.querySelectorAll(".commentheart");
  const CommentGoodLocaldata = JSON.parse(heartLocal);
  const newCommentGoodLocaldata = CommentGoodLocaldata.sort();
  const commentArry = [];
  const goodCommentArry = [];

  if(arguments[0] == false){
    return;
  }

  for(let i = 0; i < commentHeart.length; i++){
    commentArry.push(Number(commentHeart[i].dataset.heartid));
  }

  commentArry.forEach((item,index) => {
    if(newCommentGoodLocaldata.indexOf(item) !== -1){
      goodCommentArry.push(index);
    }
  })
    goodCommentArry.forEach((item) => {
      commentHeart[item].setAttribute("src", "./assets/images/thumb_up_alt.svg");
    });
};

//聆聽按讚

const swiperTest = document.querySelector(".mySwiper");

swiperTest.addEventListener("click", Goodcommentlistener);
let heartLocalData = JSON.parse(heartLocal);

function Goodcommentlistener(e) {
  let value = e.target.dataset.heartid;
  let numValue = Number(value);

   if(item.value == 'false' && isNaN(value) === false ){
    alert('請先登入唷~\n將跳轉至登入頁面!!!');
    location.assign('https://ocket609.github.io/20_novel_search/app/longin.html');
    return;
  }

  if (value === null || value === NaN || value === undefined) {
    return;
  } else if (heartLocalData.includes(numValue)) {

      let index = heartLocalData.indexOf(numValue);
      heartLocalData.splice(index, 1);
      localStorage.setItem("heartId", JSON.stringify(heartLocalData));
      e.target.setAttribute("src", "./assets/images/thumb_up_off_alt.svg");
      alert('留言按讚已取消!!');
    } else {
      heartLocalData.push(numValue);
      localStorage.setItem("heartId", JSON.stringify(heartLocalData));
      e.target.setAttribute("src", "./assets/images/thumb_up_alt.svg");
      alert('留言按讚成功!!');
    }
  };


