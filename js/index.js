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
  // 从提供的 URL 获取 JSON 数据
  fetch(
    "https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json"
  )
    .then((response) => response.json())
    .then((data) => {
      // 获取 books 数组并按 Star 值排序
      const sortedBooks = data.books.sort((a, b) => b.Star - a.Star);

      // 获取前五名书籍
      const topFiveBooks = sortedBooks.slice(0, 5);

      // 找到用于显示书籍信息的容器
      const topBooksContainer = document.getElementById("topBooksContainer");

      // 将前五本书籍信息以卡片样式插入到 HTML 页面中
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
          }" alt="書" class="bookCover" data-id=${book.id} ></div>
          <div class="amount text-white" id="number">
            <p class="py-1 px-3">no.</p>
            <h5 class="py-1 px-3">${index + 1}</h5>
          </div>
          <ul class="share d-flex">
            <li><a href=""><img src="./img/starBox.png" alt=""></a></li>
            <li><a href=""><img src="./img/like.png" alt=""></a></li>
            <li><a href=""><img src="./img/shareBox.png" alt=""></a></li>
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
       window.open(
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
          <img src="${book.img}" alt="書" class="book-cover">
            <ul class="bookshare d-flex">
            <li><a href=""><img src="./img/starBox.png" alt=""></a></li> 
            <li><a href=""><img src="./img/like.png" alt=""></a></li>
            <li><a href=""><img src="./img/shareBox.png" alt=""></a></li>
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
          <img src="${book.img}" alt="書" class="book-cover">
            <ul class="bookshare d-flex">
            <li><a href=""><img src="./img/starBox.png" alt=""></a></li>
            <li><a href=""><img src="./img/like.png" alt=""></a></li>
            <li><a href=""><img src="./img/shareBox.png" alt=""></a></li>
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
          <img src="${book.img}" alt="書" class="book-cover">
            <ul class="bookshare d-flex">
            <li><a href=""><img src="./img/starBox.png" alt=""></a></li>
            <li><a href=""><img src="./img/like.png" alt=""></a></li>
            <li><a href=""><img src="./img/shareBox.png" alt=""></a></li>
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
          <img src="${book.img}" alt="書" class="book-cover">
            <ul class="bookshare d-flex">
            <li><a href=""><img src="./img/starBox.png" alt=""></a></li>
            <li><a href=""><img src="./img/like.png" alt=""></a></li>
            <li><a href=""><img src="./img/shareBox.png" alt=""></a></li>
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
          <img src="${book.img}" alt="書" class="book-cover">
            <ul class="bookshare d-flex">
            <li><a href=""><img src="./img/starBox.png" alt=""></a></li>
            <li><a href=""><img src="./img/like.png" alt=""></a></li>
            <li><a href=""><img src="./img/shareBox.png" alt=""></a></li>
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
    window.open(
      encodeURI(
        `https://ocket609.github.io/20_novel_search/app/search.html?result=${result}`
      )
    );
  }
}
