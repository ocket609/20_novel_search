// 从提供的 URL 获取 JSON 数据
fetch('https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json')
  .then(response => response.json())
  .then(data => {
    // 获取 books 数组并按 Star 值排序
    const sortedBooks = data.books.sort((a, b) => b.Star - a.Star);

    // 获取前三名书籍
    const topThreeBooks = sortedBooks.slice(0, 5);

    // 找到用于显示书籍信息的容器
    const topBooksContainer = document.getElementById('topBooksContainer');

    // 将前三本书籍信息以 Bootstrap 卡片样式插入到 HTML 页面中
    topThreeBooks.forEach((book, index) => {
      const card = document.createElement('div');
      card.classList.add('swiper-slide','col-12', 'col-md-4', 'bg-white', 'novelImg', 'my-3');

      card.innerHTML = `
        <img src="${book.img}" alt="書">
        <div class="amount text-white" id="number">
          <p class="py-1 px-3">no.</p>
          <h5 class="py-1 px-3">${index + 1}</h5>
        </div>
        <ul class="share d-flex">
          <li><img src="./img/starBox.png" alt=""></li>
          <li><img src="./img/like.png" alt=""></li>
          <li><img src="./img/shareBox.png" alt=""></li>
        </ul>
        <h5 class="mt-2 mb-0">${book.bookName}</h5>
        <div class="star">
          <img src="./img/star.png" alt="star">
          <p>${book.Star}</p>
        </div>
        <div class="col-12 d-flex justify-content-end">
          <a href="${book.link}" class="rankbtn" title="按左鍵前往">查看更多&rarr;</a>
        </div>
      `;

      topBooksContainer.appendChild(card);
    });
  })


  document.addEventListener("DOMContentLoaded", function() {
    // 从提供的 URL 获取 JSON 数据
    fetch('https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json')
      .then(response => response.json())
      .then(data => {
        // 获取 tags 包含“奇幻．科幻”的书籍
        const fantasyAndSciFiBooks = data.books.filter(book =>
          book.tags.includes("奇幻．科幻")
        );
  
        // 找到用于显示书籍信息的容器
        const BooksContainer = document.getElementById('BooksContainer');
  
        // 将符合条件的书籍信息以卡片样式插入到 HTML 页面中
        fantasyAndSciFiBooks.forEach(book => {
          const card = document.createElement('div');
          card.classList.add('col-12', 'col-md-4', 'bookImg');
  
          card.innerHTML = `
          <img src="${book.img}" alt="書">
            <ul class="bookshare d-flex">
            <li><img src="./img/starBox.png" alt=""></li>
            <li><img src="./img/like.png" alt=""></li>
            <li><img src="./img/shareBox.png" alt=""></li>
            </ul>
            <h5 class="mt-2 mb-0">${book.bookName}</h5>
            <div class="star">
            <img src="./img/star.png" alt="">
            <p>${book.Star}</p>
            </div>
            </div>

          `;
          BooksContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.log('发生错误：', error);
      });
  });
  

