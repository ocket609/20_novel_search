// fetch('https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json')
// .then(response => response.json())
// .then(data => {
//撈books 並按 Star 值排序
// const sortedBooks = data.books.sort((a, b) => b.Star - a.Star);
//
//撈前5名小說
// const topFiveBooks = sortedBooks.slice(0, 5);
//
//找到用於顯示小說資訊的容器
// const topBooksContainer = document.getElementById('topBooksContainer');
//
//將排名前5名塞到html
// topFiveBooks.forEach((book, index) => {
// const card = document.createElement('div');
// card.classList.add('swiper-slide','col-12', 'col-md-4', 'bg-white', 'novelImg', 'my-3');
//
// card.innerHTML = `
// <img src="${book.img}" alt="書" class="bookCover">
// <div class="amount text-white" id="number">
// <p class="py-1 px-3">no.</p>
// <h5 class="py-1 px-3">${index + 1}</h5>
// </div>
// <ul class="share d-flex">
// <li><img src="./img/starBox.png" alt=""></li>
// <li><img src="./img/like.png" alt=""></li>
// <li><img src="./img/shareBox.png" alt=""></li>
// </ul>
// <h5 class="mt-2 mb-0">${book.bookName}</h5>
// <div class="star">
// <img src="./img/star.png" alt="star">
// <p>${book.Star}</p>
// </div>
// <div class="col-12 d-flex justify-content-end">
// <a href="${book.link}" class="rankbtn" title="按左鍵前往">查看更多&rarr;</a>
// </div>
// `;
//
// topBooksContainer.appendChild(card);
// });
// })

document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json"
  )
    .then((response) => response.json())
    .then((data) => {
      // 獲取 books 數組並按 Star 值排序
      const sortedBooks = data.books.sort((a, b) => b.Star - a.Star);

      // 撈前五名
      const topFiveBooks = sortedBooks.slice(0, 5);

      // 找到用於顯示小說的容器
      const topBooksContainer = document.getElementById("topBooksContainer");

      topFiveBooks.forEach((book, index) => {
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
            <li><a href=""><img class="pagesIcon" src="./img/starBox.png" alt=""></a></li>
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
      });

      const toPages = document.querySelector("body");
      toPages.addEventListener("click", getBookId);

      function getBookId(e) {
        if (e.target.dataset.id === undefined) {
          return;
        } else {
          let pageId = e.target.dataset.id;
          location.assign(
            `https://ocket609.github.io/20_novel_search/app/pages.html?Id=${pageId}`
          );
        }
      }

      // 初始化 Swiper
      const swiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          // 在寬度小於 768px（手機版）時的設置
          992: {
            slidesPerView: 3,
            allowTouchMove: true,
          },
          360: {
            slidesPerView: 1,
            allowTouchMove: true,
          },
        },
      });
    })
    .catch((error) => {
      console.log("發生错误：", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const fantasyAndSciFiBooks = data.books.filter((book) =>
        book.tags.includes("奇幻．科幻")
      );

      // 找到用於顯示小說資訊的容器
      const fantasyBooks = document.getElementById("fantasyBooks");

      // 符合條件的小說塞入到 HTML
      fantasyAndSciFiBooks.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("col-12", "col-md-4", "bookImg");

        card.innerHTML = `
          <img src="${book.img}" alt="書" class="book-cover" data-id=${book.id}>
            <ul class="bookshare d-flex">
            <li><a href=""><img class="pagesIcon" src="./img/starBox.png" alt=""></a></li> 
            <li><a href="#"><img class="likeIcon" src="./img/likeBox.png" alt="like"></a></li>
            <li><a href=""><img class="pagesIcon" src="./img/shareBox.png" alt=""></a></li>
            </ul>
            <h5 class="mt-2 mb-0">${book.bookName}</h5>
            <div class="star">
            <img src="./img/star.png" alt="">
            <p>${book.Star}</p>
            </div>
            </div>

          `;
        fantasyBooks.appendChild(card);
      });
    })
    .catch((error) => {
      console.log("發生錯誤：", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const fantasyAndSciFiBooks = data.books.filter((book) =>
        book.tags.includes("歷史．武俠")
      );

      // 找到用於顯示小說資訊的容器
      const historyBooks = document.getElementById("historyBooks");

      // 符合條件的小說塞入到 HTML
      fantasyAndSciFiBooks.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("col-12", "col-md-4", "bookImg");

        card.innerHTML = `
          <img src="${book.img}" alt="書" class="book-cover" data-id=${book.id}>
            <ul class="bookshare d-flex">
            <li><a href=""><img class="pagesIcon" src="./img/starBox.png" alt=""></a></li>
            <li><a href="#"><img class="likeIcon" src="./img/likeBox.png" alt="like"></a></li>
            <li><a href=""><img class="pagesIcon" src="./img/shareBox.png" alt=""></a></li>
            </ul>
            <h5 class="mt-2 mb-0">${book.bookName}</h5>
            <div class="star">
            <img src="./img/star.png" alt="">
            <p>${book.Star}</p>
            </div>
            </div>
          `;
        historyBooks.appendChild(card);
      });
    })
    .catch((error) => {
      console.log("發生錯誤：", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const fantasyAndSciFiBooks = data.books.filter((book) =>
        book.tags.includes("愛情．文藝")
      );

      // 找到用於顯示小說資訊的容器
      const loveBooks = document.getElementById("loveBooks");

      // 符合條件的小說塞入到 HTML
      let counter = 0;
      fantasyAndSciFiBooks.forEach((book) => {
        if (counter < 3) {
          const card = document.createElement("div");
          card.classList.add("col-12", "col-md-4", "bookImg");

          card.innerHTML = `
          <img src="${book.img}" alt="書" class="book-cover" data-id=${book.id}>
            <ul class="bookshare d-flex">
            <li><a href=""><img class="pagesIcon" src="./img/starBox.png" alt=""></a></li>
            <li><a href="#"><img class="likeIcon" src="./img/likeBox.png" alt="like"></a></li>
            <li><a href=""><img class="pagesIcon" src="./img/shareBox.png" alt=""></a></li>
            </ul>
            <h5 class="mt-2 mb-0">${book.bookName}</h5>
            <div class="star">
            <img src="./img/star.png" alt="">
            <p>${book.Star}</p>
            </div>
            </div>
          `;
          loveBooks.appendChild(card);
          counter++;
        }
      });
    })
    .catch((error) => {
      console.log("發生錯誤：", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const fantasyAndSciFiBooks = data.books.filter((book) =>
        book.tags.includes("懸疑．推理")
      );

      const suspenseBooks = document.getElementById("suspenseBooks");

      let counter = 0;
      fantasyAndSciFiBooks.forEach((book) => {
        if (counter < 3) {
          const card = document.createElement("div");
          card.classList.add("col-12", "col-md-4", "bookImg");

          card.innerHTML = `
          <img src="${book.img}" alt="書" class="book-cover" data-id=${book.id}>
            <ul class="bookshare d-flex">
            <li><a href=""><img class="pagesIcon" src="./img/starBox.png" alt="star"></a></li>
            <li><a href="#"><img class="likeIcon" src="./img/likeBox.png" alt="like"></a></li>
            <li><a href=""><img class="pagesIcon" src="./img/shareBox.png" alt="share"></a></li>
            </ul>
            <h5 class="mt-2 mb-0">${book.bookName}</h5>
            <div class="star">
            <img src="./img/star.png" alt="">
            <p>${book.Star}</p>
            </div>
            </div>
          `;
          suspenseBooks.appendChild(card);
          counter++;
        }
      });
    })
    .catch((error) => {
      console.log("發生錯誤：", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const fantasyAndSciFiBooks = data.books.filter((book) =>
        book.tags.includes("恐怖．驚悚")
      );

      const fearBooks = document.getElementById("fearBooks");

      let counter = 0;
      fantasyAndSciFiBooks.forEach((book) => {
        if (counter < 3) {
          const card = document.createElement("div");
          card.classList.add("col-12", "col-md-4", "bookImg");

          card.innerHTML = `
          <img src="${book.img}" alt="書" class="book-cover" data-id=${book.id}>
            <ul class="bookshare d-flex">
            <li><a href=""><img class="pagesIcon" src="./img/starBox.png" alt=""></a></li>
            <li><a href="#"><img class="likeIcon" src="./img/likeBox.png" alt="like"></a></li>
            <li><a href=""><img class="pagesIcon" src="./img/shareBox.png" alt=""></a></li>
            </ul>
            <h5 class="mt-2 mb-0">${book.bookName}</h5>
            <div class="star">
            <img src="./img/star.png" alt="">
            <p>${book.Star}</p>
            </div>
            </div>
          `;
          fearBooks.appendChild(card);
          counter++;
        }
      });
    })
    .catch((error) => {
      console.log("發生錯誤：", error);
    });
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

//GPT寫的點愛心收藏邏輯還需要修改
const likeIcon = document.querySelector('likeIcon');
const likeImg = likeIcon.querySelector('img');
const favoriteList = document.getElementById('favoriteList');

likeIcon.addEventListener('click', function(event) {
  event.preventDefault();

  // 更改圖示為填滿的愛心
  likeImg.src = './img/filledHeart.png';

  // 將內容加入收藏列表
  const contentToFavorite = {
    title: '您要收藏的內容標題',
    url: '內容的URL' // 可能是該內容的鏈接或其他識別符
    // 您可能想添加更多相關資訊以便稍後在收藏列表中顯示
  };

  // 檢查本地存儲中是否已經存在收藏列表，如果不存在，則初始化為一個空數組
  let favorites = localStorage.getItem('favorites');
  if (!favorites) {
    favorites = [];
  } else {
    favorites = JSON.parse(favorites);
  }

  // 將新的收藏內容添加到收藏列表
  favorites.push(contentToFavorite);

  // 將更新後的收藏列表存回本地存儲
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // 更新收藏列表的顯示
  renderFavorites();
});

// 用於渲染收藏列表的函數
function renderFavorites() {
  favoriteList.innerHTML = ''; // 清空列表

  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    favorites = JSON.parse(favorites);

    // 將收藏內容顯示在列表中
    favorites.forEach((favorite, index) => {
      const listItem = document.createElement('div');
      listItem.innerHTML = `${index + 1}. <a href="${favorite.url}">${favorite.title}</a>`;
      favoriteList.appendChild(listItem);
    });
  }
}

// 頁面加載時渲染收藏列表
renderFavorites();
