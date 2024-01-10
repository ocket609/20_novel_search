const booksGet = "https://demo-9j6o.onrender.com/books";

//API檔案

let data;

//接收bookId

const value = window.location.search;
const newvalue = value.split("=")[1];

//帶入bookId

window.addEventListener("load", PagebookApi(newvalue));

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
      if (newvalue === "" || error.response.status === 404) {
        document.querySelector(".bookSection");
        pagesbody.innerHTML = ``;
        window.setTimeout("alert('無效連結，將導向回首頁')", 50);
        setTimeout("location.href='/'", 500);
      }
    });
}

//Search Area

const pageArea = document.querySelector(".searchDiv");
const SearchBar = document.querySelector(".search");
const SearchButton = document.querySelector(".searchImg");

//Search addEventListener

SearchButton.addEventListener("click", searchKeyWord);
pageArea.addEventListener("keyup", searchKeyWordByEnter);

//PagesRender
const book = document.querySelector(".bookSection");
const bookImg = document.querySelector(".bookImg");
const bookName = document.querySelector(".bookName2");
const bookStar = document.querySelector(".starPtag");
const bookInfoLeft = document.querySelector(".bookInfoLeft");
const bookInfoRight = document.querySelector(".bookInfoRight");
const bookDescrt = document.querySelector(".bookDescrt");
const bookHeart = document.querySelector(".bookHeart");
const breadCrumbName = document.querySelectorAll(".breadcrumb-item")[2];
console.log(breadCrumbName.innerHTML);

function pageRender(bookData) {
  let str = `<p >連載狀態 : ${bookData.SerializationStatus}</p>
  <p>集數 : ${bookData.Episode}</p>
  <p>類別 : <span class="bg-success  p-1 text-white rounded-3">${bookData.tags[0]}</span><span class="bg-success ms-3 p-1 text-white rounded-3">${bookData.tags[1]}</span></p>
  <p>語言 : ${bookData.language}</p>`;
  let str2 = `<p >連載狀態 : ${bookData.SerializationStatus}</p>
  <p>集數 : ${bookData.Episode}</p>
  <p>類別 : <span class="bg-success  p-2 text-white rounded-3">${bookData.tags}</span>
  <p>語言 : ${bookData.language}</p>`;
  let bookTage = bookData.tags === 2 ? str : str2;
  
  if (bookData == 0) {
    albeer("無此頁面");
  } else {
    breadCrumbName.innerHTML = `${bookData.bookName}`;
    bookImg.innerHTML = `<div class="bookImgDiv">
            <img src=${bookData.img} class="bookImg" alt=${bookData.bookName} style="min-width:200px;">
           </div> `;

    bookName.innerHTML = ` 
              <h2>${bookData.bookName}</h2>
              <h4>${bookData.author}</h4>
                   `;
    bookStar.innerHTML = `
                    <p>
                  <img
                    class="starImg"
                    src="./assets/images/star.svg"
                    alt="star"
                    >
                    ${bookData.Star}
                </p>
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
}

//PagesCommentRender

const commentListArea = document.querySelector(".mySwiper");
const commentArea = document.querySelector(".commentArea");

function PageCommentRender(commentAllData) {
  let str = "";

  if (commentAllData.comments.length === 0) {
    commentArea.innerHTML = `<h2 class="text-center mb-5">無任何留言</h2>`;
  } else {
    commentAllData.comments.forEach((item) => {
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
    });
  }
  commentListArea.innerHTML = str;
  islogin();
}

//登入判斷

const itemStr = localStorage.getItem("loginStatuswithExpired");
const item = JSON.parse(itemStr);

function islogin() {
  console.log(new Date().getTime() / 1000, "now");
  console.log(item.expired / 1000, "token");

  if (new Date().getTime() > item.expired) {
    setTimeout(() => {
      const item2 = {
        value: "false",
        expired: item.expired,
      };
      localStorage.setItem("loginStatuswithExpired", JSON.stringify(item2));
    }, 6000);
    console.log("請重新登入");
    console.log(item.value);
  } else {
    console.log("已登入");
    goodBookCheckForDisplay(item.value);
    GoodcommentCheckForDisplay(item.value);
    console.log(item.value);
  }
}


//move to Search.html

function searchKeyWordByEnter(e) {
  if (e.key === "Enter") {
    searchKeyWord();
  }
}

function searchKeyWord() {
  if (SearchBar.value === "") {
    alert("請輸入搜尋內容");
    return;
  }
  if (SearchBar.value === undefined || SearchBar.value === "") {
    return;
  } else {
    let result = SearchBar.value;
    SearchBar.value = "";
    location.assign(
      encodeURI(
        //`https://ocket609.github.io/20_novel_search/app/search.html?result=${result}`    
        `http://127.0.0.1:5501/app/search.html?result=${result}`
      )
    );
  }
}




//聆聽收藏書籍

const newvalueNum = Number(newvalue);
let bookLocal = localStorage.getItem("bookId");
let bookLSdata = JSON.parse(bookLocal);

bookHeart.addEventListener("click", goodBookListener);

function goodBookListener(e) {
  if (item.value == "false") {
    alert("請先登入唷~\n將跳轉至登入頁面!!!");
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
    alert("收藏已取消!!");
  } else {
    bookLSdata.push(newvalueNum);
    localStorage.setItem("bookId", JSON.stringify(bookLSdata));
    e.target.setAttribute("src", "./assets/images/heart-full.svg");
    alert("收藏成功!!");
  }
}

//判斷是否收藏書籍 & 渲染收藏書籍

function goodBookCheckForDisplay() {
  let bookLocaldata = JSON.parse(bookLocal);
  if (arguments[0] == false) {
    return;
  }

  if (bookLocaldata.includes(newvalueNum)) {
    bookHeart.setAttribute("src", "./assets/images/heart-full.svg");
  } else {
    bookHeart.setAttribute("src", "./assets/images/heart.svg");
  }
}

//判斷是否按讚留言 & 渲染留言按讚

let heartLocal = localStorage.getItem("heartId");

function GoodcommentCheckForDisplay() {
  const commentHeart = document.querySelectorAll(".commentheart");
  const CommentGoodLocaldata = JSON.parse(heartLocal);
  const newCommentGoodLocaldata = CommentGoodLocaldata.sort();
  const commentArry = [];
  const goodCommentArry = [];

  if (arguments[0] == false) {
    return;
  }

  for (let i = 0; i < commentHeart.length; i++) {
    commentArry.push(Number(commentHeart[i].dataset.heartid));
  }

  commentArry.forEach((item, index) => {
    if (newCommentGoodLocaldata.indexOf(item) !== -1) {
      goodCommentArry.push(index);
    }
  });
  goodCommentArry.forEach((item) => {
    commentHeart[item].setAttribute("src", "./assets/images/thumb_up_alt.svg");
  });
}

//聆聽按讚

const swiperTest = document.querySelector(".mySwiper");

swiperTest.addEventListener("click", Goodcommentlistener);
let heartLocalData = JSON.parse(heartLocal);

function Goodcommentlistener(e) {
  let value = e.target.dataset.heartid;
  let numValue = Number(value);

  if (item.value == "false" && isNaN(value) === false) {
    alert("請先登入唷~\n將跳轉至登入頁面!!!");
    location.assign(
      "https://ocket609.github.io/20_novel_search/app/longin.html"
    );
    return;
  }

  if (value === null || value === NaN || value === undefined) {
    return;
  } else if (heartLocalData.includes(numValue)) {
    let index = heartLocalData.indexOf(numValue);
    heartLocalData.splice(index, 1);
    localStorage.setItem("heartId", JSON.stringify(heartLocalData));
    e.target.setAttribute("src", "./assets/images/thumb_up_off_alt.svg");
    alert("留言按讚已取消!!");
  } else {
    heartLocalData.push(numValue);
    localStorage.setItem("heartId", JSON.stringify(heartLocalData));
    e.target.setAttribute("src", "./assets/images/thumb_up_alt.svg");
    alert("留言按讚成功!!");
  }
}

//聆聽留言功能
//localStorage.setItem("loginUserId",1);
const pagesEvaluateForm = document.querySelector(".pagesEvaluateForm");

pagesEvaluateForm.addEventListener("submit", submitCommentForm);

//Validate.JS 驗證格式
let constraints = {
  name: {
    presence: {
      message: "必填",
    },
    length: {
      minimum: 3,
      message: "must be at least 6 characters",
    },
  },
  content: {
    presence: {
      message: "必填",
    },
    length: {
      minimum: 3,
      message: "must be at least 6 characters",
    },
  },
  score: {
    presence: {
      message: "必填",
    },
    length: {
      minimum: 3,
      message: "must be at least 6 characters",
    },
  },
};

function submitCommentForm(e) {
  e.preventDefault();
  const commenterName = document.querySelector(".name").value;
  const commentContent = document.querySelector(".content").value;
  const commentScore = document.querySelector(".score").value;
  const commentUserId = localStorage.getItem("loginUserId");

  let result = validate(pagesEvaluateForm, constraints);
  cleanMessage();
  console.log(result);
  if (result) {
    let message;
    let nameList = Object.keys(result);
    console.log(nameList);
    nameList.forEach((item) => {
      message = document.querySelector(`.${item}-message`);
      message.innerHTML = result[item];
    });
  } else {
    let modalContent = `
                          <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content bg-primary">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">評分完成</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body text-center">
                                <form id="myForm"">
                                  <label for="name">名字：${commenterName}</label>                        
                                 <label for="content">內容：${commentContent}</label>                           
                                  <label for="score">分數：${commentScore}</label>  
                                </form>
                              </div>                           
                            </div>
                          </div>
                        `;

    setTimeout(() => {
      document.getElementById("exampleModal").innerHTML = modalContent;
    }, 500);
    addCommentApi(commentUserId, commenterName, commentContent, commentScore);
    setTimeout(() => {
      PagebookApi(newvalue);
    }, 1000);
  }
}

//清除驗證訊息
function cleanMessage() {
  let message = document.querySelectorAll(".span-message");
  message.forEach((message) => {
    console.log(message);
    message.innerHTML = "";
  });
}

//送評分訊息至後端

function addCommentApi(id, name, content, score) {
  axios
    .post("https://demo-9j6o.onrender.com/comments", {
      userId: Number(id),
      bookId: Number(newvalue),
      commenter: name,
      textContent: content,
      score: score,
      like: 0,
    })

    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//登入測試

const now = new Date();
const loginInfo = {
  value: "true",
  expired: now.getTime() + 3600000,
};
//localStorage.setItem('loginStatuswithExpired', JSON.stringify(loginInfo))