document.addEventListener("DOMContentLoaded", async function () {
  const baseUrl =
    "https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json";

  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    createBookCard();
    // 在指定容器中顯示Star分數前五名的各類型書籍
    displayTopThreeBooksByTag("奇幻．科幻", "fantasyBooks");
    displayTopThreeBooksByTag("歷史．武俠", "historyBooks");
    displayTopThreeBooksByTag("愛情．文藝", "loveBooks");
    displayTopThreeBooksByTag("懸疑．推理", "suspenseBooks");
    displayTopThreeBooksByTag("恐怖．驚悚", "fearBooks");
   
    islogin();

    // 前五名熱門小說排名
    
 
    

    function createBookCard () {
      const sortedBooks = data.books.sort((a, b) => b.Star - a.Star);
    const topFiveBooks = sortedBooks.slice(0, 5);
    const topBooksContainer = document.getElementById("topBooksContainer");

      topFiveBooks.forEach((book, index) => {
        //createBookCard(book, index);
      const card = document.createElement("div");
	    card.classList.add(
 	    "swiper-slide",
 	    "bg-orange-300"
	  );
   
       card.innerHTML = `
   	    <div class="pic"><img src="${
    	 book.img
   	    }" alt="書" class="bookCover" data-id=${book.id}></div>
  	    <div class="amount text-white" id="number">
    	 <p class="py-1 px-3">no.</p>
    	 <h5 class="py-1 px-3">${index + 1}</h5>
   	    </div>
   	  <ul class="share d-flex">
    	 <li><a href="javascript:void(0);"><img class="likeIcon" data-bookheartid=${book.id} src="./img/likeBox.png" alt="like"></a></li>
     	<li><a href=""><img class="pagesIcon" src="./img/shareBox.png" alt=""></a></li>
    	</ul>
   	  <h5 class="mt-2 mb-0">${book.bookName}</h5>
   	  <div class="star">
     	<img src="./img/star.png" alt="star">
     	<p>${book.Star}</p>
   	  </div>
   	  <div class="justify-content-end" style="margin-left:50%;">
     	<a href="https://ocket609.github.io/20_novel_search/app/search.html?" 
     	class="rankbtn" title="按左鍵前往">查看更多&rarr;</a>
   	  </div>
   	  `;
       topBooksContainer.appendChild(card);
    });
      
     
    };

    
   
  
    // 點擊事件監聽器指定給特定元素
    topBooksContainer.addEventListener("click", (e) => {
      if (e.target.dataset.bookheartid) {
         goodBookListener(e.target,e.target.dataset.bookheartid);
      }

      if (e.target.dataset.id !== undefined) {
        const pageId = e.target.dataset.id;
        location.assign(
          `https://ocket609.github.io/20_novel_search/app/pages.html?Id=${pageId}`
        );
      }
    });

    // 各類別小說前3名
      function displayTopThreeBooksByTag(tag, containerId) {
      const books = data.books.filter((book) => book.tags.includes(tag));
      const topThreeBooks = books.sort((a, b) => b.Star - a.Star).slice(0, 5);

      const container = document.getElementById(containerId);

      topThreeBooks.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("swiper-slide","bookImg");

        card.innerHTML = `
  	    <img src="${book.img}" alt="書" class="book-cover" data-id=${book.id}>
  	    <ul class="bookshare d-flex">
    	  <li><a href="javascript:void(0);"><img class="likeIcon" data-bookheartid=${book.id} src="./img/likeBox.png" alt="like"></a></li>
    	  <li><a href=""><img class="pagesIcon" src="./img/shareBox.png" alt=""></a></li>
 	      </ul>
  	    <h5 class="mt-2 mb-0">${book.bookName}</h5>
  	    <div class="star">
   	    <img src="./img/star.png" alt="">
    	  <p>${book.Star}</p>
  	    </div>
     `;

        container.appendChild(card);
        card.addEventListener("click", (e) => {

          if (e.target.dataset.bookheartid) {
            goodBookListener(e.target,e.target.dataset.bookheartid);
         }

         if (e.target.dataset.id !== undefined) {
          const pageId = e.target.dataset.id;
          location.assign(
            `https://ocket609.github.io/20_novel_search/app/pages.html?Id=${pageId}`
          );
        }
        });
        
      });
    };
   
    

    //熱門小說排名swiper
    const swiper = new Swiper(".swiper-container", {
      loop: false,
      centeredSlides: false,
      spaceBetween: 10,
      navigation: {
        nextEl: '.next',
        prevEl: '.previous',
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: false,
      },
      breakpoints: {
        992: {
          slidesPerView: 3,
          allowTouchMove: true,
        },
        780: {
          slidesPerView: 2,
          allowTouchMove: true,
        },
        360: {
          slidesPerView: 1,
          allowTouchMove: true,
        },
      },
    });

    // 初始化各類型書籍Swiper
    const swiperContainer = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 10,
      freeMode: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        992: {
          slidesPerView: 3,
          allowTouchMove: true,
        },
        360: {
          slidesPerView: 1.5,
          allowTouchMove: true,
        },
      },
    });
  } catch (error) {
    console.log("發生錯誤：", error);
  }
});

const bookLocal = localStorage.getItem("bookId");

function goodBookListener(item,id) {
  const bookLSdata = JSON.parse(bookLocal);
  const idNumber = Number(id);
  console.log(bookLSdata);
  if (loginStatus == false) {
      alert("請先登入唷~\n將跳轉至登入頁面!!!");
      location.assign(
      "https://ocket609.github.io/20_novel_search/app/longin.html"
       );
        return;
       }

       if (bookLSdata.includes(idNumber)) {
      let index = bookLSdata.indexOf(idNumber);
      bookLSdata.splice(index, 1);
      localStorage.setItem("bookId", JSON.stringify(bookLSdata));
      item.setAttribute("src", "./img/like.png");
      goodBookCheckForDisplay();
      alert("收藏已取消!!");
      } else {
      bookLSdata.push(idNumber);
      localStorage.setItem("bookId", JSON.stringify(bookLSdata));
      item.setAttribute("src", "./img/filledHeart.png");
      goodBookCheckForDisplay();
      alert("收藏成功!!");
      }
      }  


      function goodBookCheckForDisplay() {
        const bookHeart = document.querySelectorAll(".likeIcon");
        console.log(bookHeart);
        const bookLocalData = JSON.parse(bookLocal);
        const newBookLocalData = bookLocalData.sort();
        const bookArry = [];
        const notgoodBookArry = [];
        const goodBookArry = [];
      
        if (loginStatus == false) {
          return;
        }
      
        for (let i = 0; i < bookHeart.length; i++) {
          bookArry.push(Number(bookHeart[i].dataset.bookheartid));
        }
        
        
        bookArry.forEach((item, index) => {
          if (newBookLocalData.indexOf(item) == -1) {
            notgoodBookArry.push(index);
            notgoodBookArry.forEach((item) => {
            bookHeart[item].setAttribute("src", "./img/like.png");
            });
          }else if(newBookLocalData.indexOf(item) !== -1) {
            goodBookArry.push(index);
            goodBookArry.forEach((item) => {
              bookHeart[item].setAttribute("src", "./img/filledHeart.png");
            });
          }
        });
      }


AOS.init();

//手機關閉動畫
new AOS.init({ disable: "phone" });

//搜尋
const pageArea = document.querySelector(".searchDiv");
const SearchBar = document.querySelector(".search");
const SearchButton = document.querySelector(".searchImg");

//searchImg.addEventListener("click", pageSearchToSearchPage);

SearchButton.addEventListener("click", searchKeyWord);
pageArea.addEventListener("keyup", searchKeyWordByEnter);

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
        `https://ocket609.github.io/20_novel_search/app/search.html?result=${result}`    
      )
    );
  }
}

//分類搜尋

const bodyArea = document.querySelector("body");

bodyArea.addEventListener("click", homeCateToSearchPage);

function homeCateToSearchPage(e) {
  bookCateClass = e.target.attributes["class"].value;
  if (bookCateClass === "listbtn") {
    bookCateValue = e.target.attributes["value"].value;
    location.assign(
      encodeURI(
        `https://ocket609.github.io/20_novel_search/app/search.html?cateresult=${bookCateValue}`
      )
    );
  }
}

// 讀者留言
//fetch('https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json')
  fetch('https://demo-9j6o.onrender.com/comments?_expand=book')
  .then(response => response.json())
  .then(data => {
    // 將取得的 JSON 資料傳遞給 PageCommentRender 函式進行渲染
    PageCommentRender(data);
    islogin();
  })
  .catch(error => console.log('發生錯誤：', error));

  const commentListArea = document.querySelector(".CommentSwiper");

// PageCommentRender 函式用來渲染留言列表
function PageCommentRender(commentAllData) {
  const CommentSort = commentAllData.sort((a, b) => b.score - a.score).slice(0, 5);
  let str = "";

  if (commentAllData.length === 0) {
    str = `<h2 class="text-center mb-5">無任何留言</h2>`;
    commentListArea.appendChild(str);
  } else {
    CommentSort.forEach((item) => {
      const str = document.createElement("div");
      str.classList.add("swiper-slide","card","bg-orange-300", "position-relative", "mt-5");
      str.innerHTML = `
      <div class="commentCard">
      <div class="header d-flex justify-content-center">
        <img src="./img/Avatar2.png" alt="網友" class="netizen" />
      </div>
      <div class="card-body bg-white text-center mt-3 h-75">
        <div class="commitTitlt p-3 dotLine2">${item.commenter}</div>
        <div><p class="card-text p-5 fs-5 text-secondary">${item.textContent}</p></div> 
      </div>
      <div class="d-flex justify-content-between card-footer bg-transparent align-items-center">
        <div class="">${item.book.bookName}</div>
        <div class="d-flex row cardIcon mx-1 align-items-center">
            <div class="col-xl-7 p-1 startag star"><img class="starImg" src="./img/star.png" alt="star">${item.score}</div>
            <div class="col-xl-5 p-1 "><a class="" role="button"><img class="thumbIcon commentheart " src="./img/thumb.png" alt="heart" data-heartid=${item.id}></a></div>
         </div>  
      </div>     
       </div>
      `;
      commentListArea.appendChild(str);
    });
    const swiperTest = document.querySelector(".CommentSwiper");

    swiperTest.addEventListener("click", goodcommentlistener);
  }
  // 將動態生成的 HTML 元素插入到 commentListArea 容器中
  //commentListArea.innerHTML = str;
  
};

const heartLocal = localStorage.getItem("heartId");

function goodcommentCheckForDisplay() {
  const commentHeart = document.querySelectorAll(".commentheart");
  console.log(commentHeart);
  const CommentGoodLocaldata = JSON.parse(heartLocal);
  const newCommentGoodLocaldata = CommentGoodLocaldata.sort();
  const commentArry = [];
  const goodCommentArry = [];

  if (loginStatus == false) {
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
    commentHeart[item].setAttribute("src", "./img/filledThumb.png");
  });
}



function goodcommentlistener(e) {
  console.log(e.target.dataset.heartid);
  const heartLocalData = JSON.parse(heartLocal);
  let value = e.target.dataset.heartid;
  let numValue = Number(value);
   console.log(value);
  if (loginStatus == false && isNaN(value) === false) {
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
    e.target.setAttribute("src", "./img/thumb.png");
    alert("留言按讚已取消!!");
  } else {
    heartLocalData.push(numValue);
    localStorage.setItem("heartId", JSON.stringify(heartLocalData));
    e.target.setAttribute("src", "./img/filledThumb.png");
    alert("留言按讚成功!!");
  }
}


function localStorageNullResolve() {
    const bookLSdata = JSON.parse(bookLocal);
    const heartLocalData = JSON.parse(heartLocal);
    if (bookLSdata === null && heartLocalData === null) {
    localStorage.setItem("bookId", JSON.stringify([]));
    localStorage.setItem("heartId", JSON.stringify([]));
    }else if (heartLocalData === null) {
      localStorage.setItem("heartId", JSON.stringify([]));
    }else {
      localStorage.setItem("bookId", JSON.stringify([]));
    }
}


//登入測試

const now = new Date();
const loginInfo = {
  value: true,
  expired: now.getTime() + 3600000,
};
//localStorage.setItem('loginStatuswithExpired', JSON.stringify(loginInfo))
//localStorage.setItem('userId', JSON.stringify(1));


let loginStatus;

//登入判斷

function islogin() {
  
   
  const itemStr = localStorage.getItem("loginStatuswithExpired");
  const item = JSON.parse(itemStr);
  const userStr = localStorage.getItem("loginUserId");
  const userId = JSON.parse(userStr);
  const loginBtn = document.querySelector(".btnLogin");
  console.log(loginBtn);

  if(item === null){
    loginStatus = false;
    localStorageNullResolve();
    goodBookCheckForDisplay();
    goodcommentCheckForDisplay();
    //evaluateWasDone(userId);
    console.log("沒登入過");
    console.log(loginStatus);
    return;
  }

  loginStatus = item.value === true ? true : false;
  let expired = item === null ? 0 : item.expired;
  let str = ""; 

  console.log(new Date().getTime() / 1000, "now");
  console.log(item.expired / 1000, "token");
 
 

  if (new Date().getTime() > item.expired) {
    setTimeout(() => {
      const item2 = {
        value: false,
        expired: item.expired,
      };
      localStorage.setItem("loginStatuswithExpired", JSON.stringify(item2));
    }, 6000);
    console.log("請重新登入");
    console.log(loginStatus);

  }else {
    str += `<div class = "d-flex loginUser">
    <p class = "p-1">HI,</p><a href ="https://ocket609.github.io/20_novel_search/pages/member.html"><p class = "loginUserName">輕輕<p></a><p>登出</p>
    </div>
    `
    loginBtn.setAttribute("href", "javascript:void(0);");
    loginBtn.setAttribute("class", "btnLogin");
    loginBtn.innerHTML = str;
    goodBookCheckForDisplay();
    goodcommentCheckForDisplay();
    //changeToUserCenter();
    //evaluateWasDone(userId);
    
    console.log("已登入");
    console.log(loginStatus);
  }


}