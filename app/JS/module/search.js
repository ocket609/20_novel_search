const booksGet = "https://demo-9j6o.onrender.com/books";
let data = [];

//預載入

searchPageApi();

//Search Area
const searchPageSearch = document.querySelector(".search");
const searchPageSearchImg = document.querySelector(".searchImg");

//Select Area
const selectArea = document.querySelector(".selectArea");
const searchPageSelectCategory = document.querySelector(".selectCategory");
const searchPageSelectStar = document.querySelector(".selectStar");

//addEventListener
searchPageSearchImg.addEventListener("click", function () {
  searchRender(searchPageSearch.value, data);
});
selectArea.addEventListener("change", selectRender);

//searchPageApi

function searchPageApi() {
  axios
    .get(booksGet)

    .then(function (response) {
      data = response.data;
      searchResult(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//searchPageRender
const bookListArea = document.querySelector(".bookList");

function searchPageRender(bookAllData) {
  let str = "";
  if (bookAllData.length === 0) {
    alert("無法搜尋到相關書籍");
    return;
  } else {
    bookAllData.forEach((item, index) => {
      str += `<div class="col p-0 position-relative m-3"  style="width: 15rem;height: 32rem; " >
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
        </div> `;
      GoodBookData(item.id, index);
    });
  }
  bookListArea.innerHTML = str;
  GoodBookCheckForDisplay();
}

//search render

function searchlistener() {}

function searchRender(r, data) {
  location.search = `result=${r}`;
  let newData = data.filter((item) => item.bookName.includes(r));
  searchPageRender(newData);
  searchPageSelectCategory.options[0].selected = true;
  searchPageSelectStar.options[0].selected = true;
}

function searchRenderfromPage(r, data) {
  let newData = data.filter((item) => item.bookName.includes(r));
  searchPageRender(newData);
  searchPageSelectCategory.options[0].selected = true;
  searchPageSelectStar.options[0].selected = true;
}

//select render
function selectRender(e) {
  const CateValue = searchPageSelectCategory.value;
  const StarValue = searchPageSelectStar.value;

  if (CateValue === "" && StarValue === "") {
    searchPageRender(data);
    location.search = `result=`;
  } else if (CateValue !== "" && StarValue === "") {
    searchPageSearch.value = "";
    let newDataFormCategory = data.filter((item) => {
      return item.tags.includes(CateValue);
    });
    location.search = `result=${CateValue}`;
  } else if (StarValue !== "" && CateValue === "") {
    searchPageSearch.value = "";
    let newDataFromStar = data.filter((item) => {
      let newStar = parseInt(item.Star);
      let newStartoString = newStar.toString();
      return newStartoString.includes(StarValue);
    });
    searchPageRender(newDataFromStar);
  } else {
    searchPageSearch.value = "";
    let newDataFormCategory = data.filter((item) => {
      return item.tags.includes(CateValue);
    });
    let newDataFromStar = newDataFormCategory.filter((item) => {
      let newStar = parseInt(item.Star);
      let newStartoString = newStar.toString();
      return newStartoString.includes(StarValue);
    });
    searchPageRender(newDataFromStar);
  }
}

//select renderFromHome
function selectRenderFromHome(cate) {
  if (data === undefined) {
    return;
  } else {
    searchPageSelectCategory.value = cate;
    let newDataFormCategory = data.filter((item) => {
      return item.tags.includes(cate);
    });

    searchPageRender(newDataFormCategory);
    //selectRender();
  }
}

//接收SearchResult from pages

let value = window.location.search;
const newvalue = decodeURI(value.split("=")[1]);
//帶入SearchResult

function searchResult(data) {
  if (newvalue === "undefined") {
    return;
  } else if (newvalue === "") {
    searchPageRender(data);
  } else if (
    newvalue === "奇幻．科幻" ||
    newvalue === "歷史．武俠" ||
    newvalue === "愛情．文藝" ||
    newvalue === "懸疑．推理" ||
    newvalue === "恐怖．驚悚"
  ) {
    selectRenderFromHome(newvalue);
  } else {
    searchPageSearch.value = newvalue;
    searchRenderfromPage(newvalue, data);
  }
}

//move to pages.html

const toPages = document.querySelector(".bookList");
toPages.addEventListener("click", getBookId);

function getBookId(e) {
  if (e.target.dataset.id === undefined) {
    return;
  } else {
    let pageId = e.target.dataset.id;
    console.log(e.target.dataset.id);
    location.assign(
      //`https://ocket609.github.io/20_novel_search/app/pages.html?Id=${pageId}`
      `http://127.0.0.1:5501/app/pages.html?Id=${pageId}`
    );
  }
}

//判斷是否收藏書籍

let goodBook = [];

let bookLocal = localStorage.getItem("bookId");

function GoodBookData(id, index) {
  let bookLocalData = JSON.parse(bookLocal);
  if (bookLocalData === null) {
    localStorage.setItem("bookId", JSON.stringify([]));
    return;
  } else if (bookLocalData.indexOf(id) !== -1) {
    goodBook.push(index);
  }
}

//渲染書籍收藏

function GoodBookCheckForDisplay() {
  const bookHeart = document.querySelectorAll(".bookHeart");
  goodBook.forEach((item) => {
    bookHeart[item].setAttribute("src", "./assets/images/heart-full.svg");
  });
  goodBook = [];
}

//聆聽收藏

const bookList = document.querySelector(".bookList");
let bookLocalData = JSON.parse(bookLocal);
bookList.addEventListener("click", GoodBooklistener);

function GoodBooklistener(e) {
  
  let value = e.target.dataset.bookheartid;
  let numValue = Number(value);

  if (value === null || value === NaN || value === undefined) {
    return;
  } else {
    if (bookLocalData.includes(numValue)) {
      let index = bookLocalData.indexOf(numValue);
      bookLocalData.splice(index, 1);
      localStorage.setItem("bookId", JSON.stringify(bookLocalData));
      e.target.setAttribute("src", "./assets/images/heart.svg");
      alert('收藏已取消!!');
    } else {
      bookLocalData.push(numValue);
      localStorage.setItem("bookId", JSON.stringify(bookLocalData));
      e.target.setAttribute("src", "./assets/images/heart-full.svg");
      alert('收藏成功!!');
    }
  }
}
