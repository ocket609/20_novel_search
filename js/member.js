

const displayArea = document.querySelector(".userCenterDisplayArea");
const getBookId = localStorage.getItem("bookId");
const userId = localStorage.getItem("userId");
let bookData;
let commentData;
console.log(displayArea);
console.log(getBookId);
PagebookApi();



function PagebookApi() {
  axios
    .get(`https://demo-9j6o.onrender.com/books`)

    .then(function (response) {
      bookData = response.data;
      PageCommentApi()
    })
    .catch(function (error) {
      console.log(error);
    });
}


function  PageCommentApi() {
    axios
      .get(`https://demo-9j6o.onrender.com/comments?_expand=book&&_expand=user`)
  
      .then(function (response) {
        commentData = response.data;
        searchResult();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 

//接收SearchResult

let value = window.location.search;
const searchResultvalue = decodeURI(value.split(/[?,=,&]/)[1]);
const searchResultvalue2 = decodeURI(value.split(/[?,=,&]/)[2]);
const searchResultvalue3 = decodeURI(value.split(/[?,=,&]/)[1]);
console.log(searchResultvalue);
console.log(searchResultvalue2);

//帶入SearchResult

function searchResult() {
  if (searchResultvalue === "" || searchResultvalue2 === "") {
    alert("錯誤語法，倒回首頁");
    location.assign("https://ocket609.github.io/20_novel_search/");
  }

  if(searchResultvalue != "page"){
    return;
  }

  if (searchResultvalue2 == "我的收藏") {
    myCollectBook();
  }else if(searchResultvalue2 == "評論紀錄"){
    myCollectComment();
  }
}


//會員中心按鈕

const myCollectButton = document.querySelector(".mulitbtn");


myCollectButton.addEventListener("click",mulitButtonJudge);

function mulitButtonJudge(e){
  e.preventDefault();
  console.log(e.target.value);
  if(e.target.value === undefined){
   return;
  }else{
    location.search = `page=${e.target.value}`;
  }
  
}

function myCollectBook(){
  let str = "";
  let newData;
  bookData.forEach((item) => {
       
    if(getBookId.indexOf(item.id) != -1) {
      str += `<div class="col p-0 m-2">
   <img src=${item.img} class="card-img-top" alt="..." data-id=${item.id} style="width: 13rem;height: 10rem;">
   <div class="card-body ">         
     <div class="row cardIcon">
       <p class=" col-xl-8 card-title">${item.bookName}</p>
       <div class="col-xl-4 p-1 startag "><img class="starImg" src="/img/star.svg" alt="star">${item.Star}</div>
      </div> 
   </div>
</div>`;
    }
    
  })
 console.log(newData);
 displayArea.innerHTML = str;

}

function myCollectComment(){
  console.log(commentData);
  let str = "";
  let newData;
  commentData.forEach((item) => {

    if(item.userId == Number(userId)){
      str += `
      <div class="card-footer bg-transparent m-5">

        <div class="d-flex cardIcon align-items-center ">
            <h5 class="">${item.book.bookName}</h5>
            <div class="d-flex startag align-items-center ms-2"><img class="starImg " src="/img/star.svg" alt="star">${item.score}</div>
        </div>  
        <div><p class=" card-text mt-3">${item.textContent}</p></div> 
      </div>`;
    }
    
  })
 console.log(newData);
 displayArea.innerHTML = str;

}