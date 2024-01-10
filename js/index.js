document.addEventListener("DOMContentLoaded", async function () {
  const baseUrl =
    "https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json";

  try {
    const response = await fetch(baseUrl);
    const data = await response.json();

    // 前五名熱門小說排名
    const sortedBooks = data.books.sort((a, b) => b.Star - a.Star);
    const topFiveBooks = sortedBooks.slice(0, 5);
    const topBooksContainer = document.getElementById("topBooksContainer");

    const createBookCard = (book, index) => {
      const card = document.createElement("div");
	    card.classList.add(
 	    "swiper-slide",
 	    "col-12",
  	  "col-md-4",
 	    "bg-white",
 	    "novelImg",
  	  "my-3"
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
    	 <li><a href="#"><img class="likeIcon" src="./img/likeBox.png" alt="like"></a></li>
     	<li><a href=""><img class="pagesIcon" src="./img/shareBox.png" alt=""></a></li>
    	</ul>
   	  <h5 class="mt-2 mb-0">${book.bookName}</h5>
   	  <div class="star">
     	<img src="./img/star.png" alt="star">
     	<p>${book.Star}</p>
   	  </div>
   	  <div class="col-12 d-flex justify-content-end">
     	<a href="https://ocket609.github.io/20_novel_search/app/search.html?result=" 
     	class="rankbtn" title="按左鍵前往">查看更多&rarr;</a>
   	  </div>
   	  `;

      topBooksContainer.appendChild(card);
    };

    topFiveBooks.forEach((book, index) => {
      createBookCard(book, index);
    });

    // 點擊事件監聽器指定給特定元素
    topBooksContainer.addEventListener("click", (e) => {
      if (e.target.dataset.id !== undefined) {
        const pageId = e.target.dataset.id;
        location.assign(
          `https://ocket609.github.io/20_novel_search/app/pages.html?Id=${pageId}`
        );
      }
    });

    // 各類別小說前3名
      const displayTopThreeBooksByTag = (tag, containerId) => {
      const books = data.books.filter((book) => book.tags.includes(tag));
      const topThreeBooks = books.sort((a, b) => b.Star - a.Star).slice(0, 5);

      const container = document.getElementById(containerId);

      topThreeBooks.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("swiper-slide","col-12", "col-md-4", "bookImg");

        card.innerHTML = `
  	    <img src="${book.img}" alt="書" class="book-cover" data-id=${book.id}>
  	    <ul class="bookshare d-flex">
    	  <li><a href="#"><img class="likeIcon" src="./img/likeBox.png" alt="like"></a></li>
    	  <li><a href=""><img class="pagesIcon" src="./img/shareBox.png" alt=""></a></li>
 	      </ul>
  	    <h5 class="mt-2 mb-0">${book.bookName}</h5>
  	    <div class="star">
   	    <img src="./img/star.png" alt="">
    	  <p>${book.Star}</p>
  	    </div>
     `;

        container.appendChild(card);
        
        card.addEventListener("click", () => {
          location.assign(`https://ocket609.github.io/20_novel_search/app/pages.html?Id=${book.id}`);
        });
        
      });
    };

    // 在指定容器中顯示Star分數前五名的各類型書籍
    displayTopThreeBooksByTag("奇幻．科幻", "fantasyBooks");
    displayTopThreeBooksByTag("歷史．武俠", "historyBooks");
    displayTopThreeBooksByTag("愛情．文藝", "loveBooks");
    displayTopThreeBooksByTag("懸疑．推理", "suspenseBooks");
    displayTopThreeBooksByTag("恐怖．驚悚", "fearBooks");

    //熱門小說排名swiper
    const swiper = new Swiper(".swiper-container", {
      pagination: {
        // el: ".swiper-pagination",
        clickable: true,
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

    // 初始化各類型書籍Swiper
    const swiperContainer = new Swiper(".swiperContainer", {
      pagination: {
        // el: ".swiper-pagination",
        clickable: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // spaceBetween: 24, 
      },
      breakpoints: {
        992: {
          slidesPerView: 2.9,
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


AOS.init();

//手機關閉動畫
new AOS.init({ disable: "phone" });

//搜尋
const searchImg = document.querySelector(".searchImg");
const pageSearch = document.querySelector(".search");

searchImg.addEventListener("click", pageSearchToSearchPage);

function pageSearchToSearchPage() {
  if (pageSearch.value === undefined || pageSearch.value === "") {
    return;
  } else {
    let result = pageSearch.value;
    pageSearch.value = "";
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
        `https://ocket609.github.io/20_novel_search/app/search.html?result=${bookCateValue}`
      )
    );
  }
}

// 讀者留言
fetch('https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json')
  .then(response => response.json())
  .then(data => {
    // 將取得的 JSON 資料傳遞給 PageCommentRender 函式進行渲染
    PageCommentRender(data);
  })
  .catch(error => console.log('發生錯誤：', error));

// PageCommentRender 函式用來渲染留言列表
function PageCommentRender(commentAllData) {
  let str = "";

  if (commentAllData.comments.length === 0) {
    str = `<h2 class="text-center mb-5">無任何留言</h2>`;
  } else {
    commentAllData.comments.forEach((item) => {
      str += `
          <div class="card bg-orange-300 position-relative mt-5">
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
            <div class="col-xl-6 p-1">
            <a class="ms-1" role="button"><img class="pagesIcon commentheart" src="./assets/images/thumb_up_off_alt.svg" alt="heart" data-heartid=${item.id}></a></div>
           </div>  
    </div>       
 </swiper-slide>
          <!-- ... -->
        </div>
      `;
    });
  }
  
  // 將動態生成的 HTML 元素插入到 commentListArea 容器中
  const commentListArea = document.getElementById("commentListArea");
  commentListArea.innerHTML = str;
}