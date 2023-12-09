// 从提供的 URL 获取 JSON 数据
fetch('https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json')
  .then(response => response.json())
  .then(data => {
    // 撈books 並按 Star 值排序
    const sortedBooks = data.books.sort((a, b) => b.Star - a.Star);

    // 撈前5名小說
    const topThreeBooks = sortedBooks.slice(0, 5);

    // 找到用於顯示小說資訊的容器
    const topBooksContainer = document.getElementById('topBooksContainer');

    // 將排名前5名塞到html
    topThreeBooks.forEach((book, index) => {
      const card = document.createElement('div');
      card.classList.add('swiper-slide','col-12', 'col-md-4', 'bg-white', 'novelImg', 'my-3');

      card.innerHTML = `
        <img src="${book.img}" alt="書" class="bookCover">
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
    fetch('https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json')
      .then(response => response.json())
      .then(data => {
        const fantasyAndSciFiBooks = data.books.filter(book =>
          book.tags.includes("奇幻．科幻")
        );
  
        // 找到用於顯示小說資訊的容器
        const fantasyBooks = document.getElementById('fantasyBooks');
  
        // 符合條件的小說塞入到 HTML 
        fantasyAndSciFiBooks.forEach(book => {
          const card = document.createElement('div');
          card.classList.add('col-12', 'col-md-4', 'bookImg');
  
          card.innerHTML = `
          <img src="${book.img}" alt="書" class="book-cover">
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
          fantasyBooks.appendChild(card);
        });
      })
      .catch(error => {
        console.log('發生錯誤：', error);
      });
  });
  
  
  document.addEventListener("DOMContentLoaded", function() {
    fetch('https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json')
      .then(response => response.json())
      .then(data => {
        const fantasyAndSciFiBooks = data.books.filter(book =>
          book.tags.includes("歷史．武俠")
        );
    
        // 找到用於顯示小說資訊的容器
        const historyBooks = document.getElementById('historyBooks');
    
        // 符合條件的小說塞入到 HTML 
        fantasyAndSciFiBooks.forEach(book => {
          const card = document.createElement('div');
          card.classList.add('col-12', 'col-md-4', 'bookImg');
    
          card.innerHTML = `
          <img src="${book.img}" alt="書" class="book-cover">
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
          historyBooks.appendChild(card);
        });
      })
      .catch(error => {
        console.log('發生錯誤：', error);
      });
  });



  document.addEventListener("DOMContentLoaded", function() {
    fetch('https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json')
      .then(response => response.json())
      .then(data => {
        const fantasyAndSciFiBooks = data.books.filter(book =>
          book.tags.includes("愛情．文藝")
        );
    
        // 找到用於顯示小說資訊的容器
        const loveBooks = document.getElementById('loveBooks');
    
        // 符合條件的小說塞入到 HTML 
        let counter = 0;
        fantasyAndSciFiBooks.forEach(book => {
          if (counter < 3) {
          const card = document.createElement('div');
          card.classList.add('col-12', 'col-md-4', 'bookImg');
    
          card.innerHTML = `
          <img src="${book.img}" alt="書" class="book-cover">
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
          loveBooks.appendChild(card);
          counter++;
        }
        });
      })
      .catch(error => {
        console.log('發生錯誤：', error);
      });
  });



  document.addEventListener("DOMContentLoaded", function() {
    fetch('https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json')
      .then(response => response.json())
      .then(data => {
        const fantasyAndSciFiBooks = data.books.filter(book =>
          book.tags.includes("懸疑．推理")
        );
    
        // 找到用于显示书籍信息的容器
        const suspenseBooks = document.getElementById('suspenseBooks');
    
        // 符合條件的小說塞入到 HTML 
        let counter = 0;
        fantasyAndSciFiBooks.forEach(book => {
          if (counter < 3) {
          const card = document.createElement('div');
          card.classList.add('col-12', 'col-md-4', 'bookImg');
    
          card.innerHTML = `
          <img src="${book.img}" alt="書" class="book-cover">
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
          suspenseBooks.appendChild(card);
          counter++;
        }
        });
      })
      .catch(error => {
        console.log('發生錯誤：', error);
      });
  });
    
    
  document.addEventListener("DOMContentLoaded", function() {
    fetch('https://raw.githubusercontent.com/ocket609/20_novel_search/main/app/assets/json/db.json')
      .then(response => response.json())
      .then(data => {
        const fantasyAndSciFiBooks = data.books.filter(book =>
          book.tags.includes("恐怖．驚悚")
        );
    
        // 找到用于显示书籍信息的容器
        const fearBooks = document.getElementById('fearBooks');
    
        // 符合條件的小說塞入到 HTML 
        let counter = 0;
        fantasyAndSciFiBooks.forEach(book => {
          if (counter < 3) {
          const card = document.createElement('div');
          card.classList.add('col-12', 'col-md-4', 'bookImg');
    
          card.innerHTML = `
          <img src="${book.img}" alt="書" class="book-cover">
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
          fearBooks.appendChild(card);
          counter++;
        }
        });
      })
      .catch(error => {
        console.log('發生錯誤：', error);
      });
  });
    
    
    
    
    
   
    
    
  

