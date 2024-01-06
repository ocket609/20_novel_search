//前五名熱門小說排名
document.addEventListener("DOMContentLoaded", function () {
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json"
      );
      const data = await response.json();

      // 獲取 books 數組並按 Star 值排序
      const sortedBooks = data.books.sort((a, b) => b.Star - a.Star);
      // 撈前五名
      const topFiveBooks = sortedBooks.slice(0, 5);
      // 找到用於顯示小說的容器
      const topBooksContainer = document.getElementById("topBooksContainer");

      // 創建書籍卡片
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
      };

      // 渲染前五名書籍卡片
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

      // 初始化 Swiper
      const swiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
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
    } catch (error) {
      console.log("發生錯誤：", error);
    }
  };

  // 執行獲取資料的函數
  fetchData();
});

//各類別小說前三名
document.addEventListener("DOMContentLoaded", function () {
  const baseUrl =
    "https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json";

  // 函數用於顯示書籍資訊到特定容器，顯示Star分數前三名的書籍
  function displayTopThreeBooksByTag(tag, containerId) {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        const books = data.books.filter((book) => book.tags.includes(tag));

        // 將符合條件的書籍依照Star分數排序，並取前三名
        const topThreeBooks = books.sort((a, b) => b.Star - a.Star).slice(0, 3);

        const container = document.getElementById(containerId);

        topThreeBooks.forEach((book) => {
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
          `;

          container.appendChild(card);
        });
      })
      .catch((error) => {
        console.log("發生錯誤：", error);
      });
  }

  // 在指定容器中顯示Star分數前三名的各類型書籍
  displayTopThreeBooksByTag("奇幻．科幻", "fantasyBooks");
  displayTopThreeBooksByTag("歷史．武俠", "historyBooks");
  displayTopThreeBooksByTag("愛情．文藝", "loveBooks");
  displayTopThreeBooksByTag("懸疑．推理", "suspenseBooks");
  displayTopThreeBooksByTag("恐怖．驚悚", "fearBooks");
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
