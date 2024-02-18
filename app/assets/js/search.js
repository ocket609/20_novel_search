const booksGet = "https://demo-9j6o.onrender.com/books";

//API檔案

let data;

//searchPageApi
function searchPageApi() {
  axios
    .get(booksGet)

    .then(function (response) {
      data = response.data;
      searchResult();
      islogin();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//預載入

window.addEventListener("load", searchPageApi);

//Search Area
const searchArea = document.querySelector(".searchArea");
const SearchBar = document.querySelector(".search");
const SearchButton = document.querySelector(".searchImg");

//Select Area
const selectArea = document.querySelector(".selectArea");
const SelectCategory = document.querySelector(".selectCategory");
const SelectStar = document.querySelector(".selectStar");

//page Area
const pageArea = document.querySelector(".page-number");

//Search addEventListener
searchArea.addEventListener("keyup", searchAreaForEnter);
/*SearchBar.addEventListener("change", function () {
  if (SearchBar.value === "") {
    location.search = "";
  }
});*/
SearchButton.addEventListener("click", searchAreaForClick);

//Select addEventListener

selectArea.addEventListener("change", selectAreaForURL);

//bookDatapagination addEventListener

pageArea.addEventListener("click", changePage, false);

//接收SearchResult

let value = window.location.search;
const searchResultvalue = decodeURI(value.split(/[?,=,&]/)[2]);
const searchResultvalue2 = decodeURI(value.split(/[?,=,&]/)[4]);
const searchResultvalue3 = decodeURI(value.split(/[?,=,&]/)[1]);


//帶入SearchResult

function searchResult() {
  if (searchResultvalue === "" || searchResultvalue2 === "") {
    alert("錯誤語法，倒回首頁");
    location.assign("https://ocket609.github.io/20_novel_search/");
  }

  if (searchResultvalue === "undefined") {
    sliceBookDataForPageNumber(1);
    bookDataForPageNumber(1);
  } else if (isNaN(searchResultvalue) && isNaN(searchResultvalue2) === false) {
    selectRender(searchResultvalue, searchResultvalue2);
    console.log("error");
  } else if (searchResultvalue3 === "cateresult" && searchResultvalue.indexOf("．", 2) != -1) {
    selectRender(searchResultvalue);
    console.log("error1");
  } else if (searchResultvalue3 === "star" && isNaN(searchResultvalue) === false) {
    selectRender(searchResultvalue);
    console.log("error2");
  } else {
    searchRender(searchResultvalue);
    console.log("error3");
  }
}

//searchPageRender
const bookListArea = document.querySelector(".bookList");

function searchPageRender(bookData) {
  let str = "";
  if (bookData.length === 0) {
    alert("無法搜尋到相關書籍");
    return;
  } else {
    //<div><span class="p-1" role="button"><img class="pagesIcon" src="./assets/images/star2.svg" alt="star"></span></div>
    bookData.forEach((item) => {
      str += `<div class="col p-0 position-relative m-3"  style="width: 15rem;height: 32rem; " >
            <img src=${item.img} class="card-img-top" alt="..." data-id=${item.id} style="height: 360px;">
            <div class="d-flex position-absolute top-50 end-0 mt-5  align-items-center ">
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
    });
  }
  bookListArea.innerHTML = str;
}

//登入判斷

let loginStatus;



function islogin() {

  const itemStr = localStorage.getItem("loginStatuswithExpired");
  const item = JSON.parse(itemStr);

  if(item === null){
    loginStatus = false;
    GoodBookCheckForDisplay();
    console.log("第一次登入");
    console.log(loginStatus);
    return;
  }

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
    GoodBookCheckForDisplay();
    console.log(loginStatus);
  } else {
    console.log("已登入");
    GoodBookCheckForDisplay();
    console.log(loginStatus);
  }
}

//頁面切換檔案

let changePageData;

//Search區聆聽

function searchAreaForClick() {
  if (SearchBar.value === "") {
    alert("請輸入搜尋內容");
    return;
  }
  location.search = `result=${SearchBar.value}`;
}

function searchAreaForEnter(e) {
  if (e.key === "Enter") {
    if (SearchBar.value === "") {
      alert("請輸入搜尋內容");
      return;
    }
    location.search = `result=${SearchBar.value}`;
  }
}

//search render

function searchRender(result) {
  SearchBar.value = result;
  let newData = data.filter((item) => item.bookName.includes(result));
  changePageData = newData;
  sliceBookDataForPageNumber(1, newData);
  bookDataForPageNumber(1, newData);
  SelectCategory.options[0].selected = true;
  SelectStar.options[0].selected = true;
}

//select區域聆聽

function selectAreaForURL(e) {
  const CateValue = SelectCategory.value;
  const StarValue = SelectStar.value;
  if (CateValue === "" && StarValue === "") {
    location.search = "";
  } else if (CateValue !== "" && StarValue === "") {
    SearchBar.value = "";
    location.search = `cateresult=${CateValue}`;
  } else if (StarValue !== "" && CateValue === "") {
    SearchBar.value = "";
    location.search = `star=${StarValue}`;
  } else {
    location.search = `cateresult=${CateValue}&star=${StarValue}`;
  }
}

//select render

function selectRender(result, result2) {
  if (result && result2) {
    //兩個都選擇
    SearchBar.value = "";
    SelectCategory.value = result;
    SelectStar.value = result2;
    let newDataFormCategory = data.filter((item) => {
      return item.tags.includes(result);
    });
    let newDataFromStar = newDataFormCategory.filter((item) => {
      let newStar = parseInt(item.Star);
      let newStartoString = newStar.toString();
      return newStartoString.includes(result2);
    });
    changePageData = newDataFromStar;
    sliceBookDataForPageNumber(1, newDataFromStar);
    bookDataForPageNumber(1, newDataFromStar);
  } else if (isNaN(result)) {
    //只選擇類別
    SelectCategory.value = result;
    let newDataFormCategory = data.filter((item) => {
      return item.tags.includes(result);
    });
    changePageData = newDataFormCategory;
    sliceBookDataForPageNumber(1, newDataFormCategory);
    bookDataForPageNumber(1, newDataFormCategory);
  } else {
    //只選擇星星
    SelectStar.value = result;
    let newDataFromStar = data.filter((item) => {
      let newStar = parseInt(item.Star);
      let newStartoString = newStar.toString();
      return newStartoString.includes(result);
    });
    changePageData = newDataFromStar;
    sliceBookDataForPageNumber(1, newDataFromStar);
    bookDataForPageNumber(1, newDataFromStar);
  }
}

//searchBookDatapagination 處理

let selectPage = 1;

function changePage(e) {
  const pageNum = Number(e.target.innerText);
  const totalBookPage =
    searchResultvalue === "undefined"
      ? Math.ceil(data.length / 6)
      : Math.ceil(changePageData.length / 6);

  // click page number
  if (e.target.className === "page-item page-number-item") {
    sliceBookDataForPageNumber(pageNum, changePageData);
    bookDataForPageNumber(pageNum, changePageData);
    selectPage = pageNum;
  }

  // click prev page
  if (e.target.className === "page-item page-item-prev") {
    const prevPage = selectPage - 1 === 0 ? selectPage : selectPage - 1;
    selectPage = prevPage;
    sliceBookDataForPageNumber(prevPage, changePageData);
    bookDataForPageNumber(prevPage, changePageData);
  }

  // click next page
  if (e.target.className === "page-item page-item-next") {
    const nextPage =
      selectPage + 1 > totalBookPage ? selectPage : selectPage + 1;
    selectPage = nextPage;
    sliceBookDataForPageNumber(nextPage, changePageData);
    bookDataForPageNumber(nextPage, changePageData);
  }
}

function sliceBookDataForPageNumber(pageNum, newdata = data) {
  const bookData = newdata.slice((pageNum - 1) * 6, pageNum * 6);
  searchPageRender(bookData);
}

function bookDataForPageNumber(pageNum, newdata = data) {
  const totalBookPage = Math.ceil(newdata.length / 6);
  const prevPage = `<li class="page-item page-item-prev">◀ Prev </li>`;
  const nextPage = `<li class="page-item page-item-next">Next ▶</li>`;
  let str = "";

  for (let i = 1; i <= totalBookPage; i++) {
    str +=
      i === pageNum
        ? `<li class="page-item page-number-item active">${i}</li>`
        : `<li class="page-item page-number-item">${i}</li>`;
  }

  pageArea.innerHTML = totalBookPage > 1 ? prevPage + str + nextPage : str;
}

//移動到pages.html

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

let bookLocal = localStorage.getItem("bookId");

//判斷是否收藏書籍 & 渲染書籍收藏

function GoodBookCheckForDisplay() {
  const bookHeart = document.querySelectorAll(".bookHeart");
  console.log(bookHeart);
  const bookLocalData = JSON.parse(bookLocal);
  if (bookLocalData === null) {
    localStorage.setItem("bookId", JSON.stringify([]));
    return;
  }
  const newBookLocalData = bookLocalData.sort();
  const bookArry = [];
  const goodBookArry = [];

  if (loginStatus == false) {
    return;
  }

  for (let i = 0; i < bookHeart.length; i++) {
    bookArry.push(Number(bookHeart[i].dataset.bookheartid));
  }

  bookArry.forEach((item, index) => {
    if (newBookLocalData.indexOf(item) !== -1) {
      goodBookArry.push(index);
    }
  });
  goodBookArry.forEach((item) => {
    bookHeart[item].setAttribute("src", "./assets/images/heart-full.svg");
  });
}

//聆聽收藏

const bookList = document.querySelector(".bookList");
let bookLocalData = JSON.parse(bookLocal);
bookList.addEventListener("click", GoodBooklistener);

function GoodBooklistener(e) {
  let value = e.target.dataset.bookheartid;
  let numValue = Number(value);

  if (loginStatus == false && isNaN(value) === false) {
    alert("請先登入唷~\n將跳轉至登入頁面!!!");
    location.assign(
      "https://ocket609.github.io/20_novel_search/app/longin.html"
    );
    return;
  }

  if (value === null || value === NaN || value === undefined) {
    return;
  } else {
    if (bookLocalData.includes(numValue)) {
      let index = bookLocalData.indexOf(numValue);
      bookLocalData.splice(index, 1);
      localStorage.setItem("bookId", JSON.stringify(bookLocalData));
      e.target.setAttribute("src", "./assets/images/heart.svg");
      alert("收藏已取消!!");
    } else {
      bookLocalData.push(numValue);
      localStorage.setItem("bookId", JSON.stringify(bookLocalData));
      e.target.setAttribute("src", "./assets/images/heart-full.svg");
      alert("收藏成功!!");
    }
  }
}

//登入測試

const now = new Date();
const item2 = {
  value: "true",
  expired: now.getTime() + 3600000,
};
//localStorage.setItem("loginStatuswithExpired", JSON.stringify(item2));
