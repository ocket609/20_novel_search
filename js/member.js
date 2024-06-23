

const displayArea = document.querySelector(".userCenterDisplayArea");
const getBookId = localStorage.getItem("bookId");
const userId = localStorage.getItem("loginUserId");
let token = localStorage.getItem("loginToken");
let bookData;
let commentData;
let userData;



//init
islogin();



function PagebookApi() {
  axios
    .get(`https://two023-json-server-vercel-main.onrender.com/books`)

    .then(function (response) {
      bookData = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}


function  PageCommentApi() {
    axios
      .get(//`https://two023-json-server-vercel-main.onrender.com/comments?_expand=book&&_expand=user`
      `https://two023-json-server-vercel-main.onrender.com/600/users/${userId}?_embed=comments`,
      {
        headers: {
            "authorization": `Bearer ${token}`
        }
      })
  
      .then(function (response) {
        commentData = response.data.comments;
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  function  PageUserApi() {
    axios
      .get(`https://two023-json-server-vercel-main.onrender.com/600/users/${userId}`,
      {
        headers: {
            "authorization": `Bearer ${token}`
        }
      }
      )
  
      .then(function (response) {
        userData = response.data;
        userLoginDisplay(userData);
        searchResult();
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  //登入判斷
  
  function islogin() {
    
    const itemStr = localStorage.getItem("loginStatuswithExpired");
    const item = JSON.parse(itemStr);

    if(item === null || item.value === false || new Date().getTime() > item.expired){
      Swal.fire({
        icon: "error",
        title: "請登入會員",
       });
      setTimeout(() => location.assign(
        `https://ocket609.github.io/20_novel_search/`
      ),1500);
      return;
    }else{
    PagebookApi();
    PageCommentApi();
    PageUserApi();
    }
  }  


  function userLoginDisplay(userData) {
    const loginBtn = document.querySelector(".loginArea");
  
    let str = ""; 
    str += `<div class = "d-flex loginUser">
    <p>HI,</p>
    <p><a class = "loginUserName m-1 p-2" href ="javascript:void(0);">${userData.nick_name}</a></p>
    <p><a class = "logoutBtn m-1 p-2" href = "javascript:void(0);">登出</a></p>
    </div>
    `
    loginBtn.innerHTML = str;
    const logOut = document.querySelector(".logoutBtn");
    logOut.addEventListener("click",logoutBtn);
    
  }
  
  function logoutBtn() {
    
    const item2 = {
      value: false,
      expired: null,
    };
    localStorage.setItem("loginStatuswithExpired", JSON.stringify(item2));
    location.assign(
      `https://ocket609.github.io/20_novel_search/`
    );
  }


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
    Swal.fire({
      icon: "error",
      title: "請輸入搜尋內容",
     });
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




//帶入SearchResult

function searchResult() {
 const value = window.location.search;
 const searchResultvalue = decodeURI(value.split(/[?,=,&]/)[1]);
 const searchResultvalue2 = decodeURI(value.split(/[?,=,&]/)[2]);


  if (searchResultvalue === "" || searchResultvalue2 === "") {
    Swal.fire({
      icon: "error",
      title: "錯誤網址，倒回首頁",
     });
    setTimeout(() =>location.assign("https://ocket609.github.io/20_novel_search/"),1500);
  };

  if(searchResultvalue === 'undefined' || searchResultvalue2 === 'undefined')
  location.search = `page=${'我的收藏'}`;

  const selectAllItem = document.querySelectorAll(".memberbtn");
    selectAllItem.forEach((item) => {
        if(item.value === searchResultvalue2){
        const  selectItem =  item;
        selectItem.style.color = 'rgb(231, 140, 82)';
        selectItem.style['border-bottom'] = '1px solid rgb(231, 140, 82)';
        }
    });

  if (searchResultvalue2 == "我的收藏") {
    setTimeout("myCollectBook()",600);
  }else if(searchResultvalue2 == "評論紀錄"){
    setTimeout("myCollectComment()",600);
  }else if(searchResultvalue2 == "觀看紀錄"){
    setTimeout("myWatchHistory()",600);
  }else{
    setTimeout("myAccountSetup()",600);
  }
}

//會員中心按鈕

const myCollectButton = document.querySelector(".mulitbtn");

myCollectButton.addEventListener("click",mulitButtonJudge);

function mulitButtonJudge(e){
  e.preventDefault();
  if(e.target.value === undefined){
   return;
  }
  if(e.target.value === "我的收藏"){
    //sessionStorage.setItem("centerInfo", JSON.stringify(e.target.value));
    location.search = `page=${e.target.value}`;
  }else if(e.target.value === "評論紀錄"){
    //sessionStorage.setItem("centerInfo", JSON.stringify(e.target.value));
    location.search = `page=${e.target.value}`;
  }else if(e.target.value === "觀看紀錄"){
    //sessionStorage.setItem("centerInfo", JSON.stringify(e.target.value));
    location.search = `page=${e.target.value}`;
  }else{
    //sessionStorage.setItem("centerInfo", JSON.stringify(e.target.value));
    location.search = `page=${e.target.value}`;
  }
  
}

function myCollectBook(){
  let str = "";
  displayArea.classList.value = "userCenterDisplayArea  row row-cols-2 row-cols-lg-5 row-cols-md-4 row-cols-sm-2";
  bookData.forEach((item) => {
    if(getBookId.indexOf(item.id) != -1) {
      str += `<div class="pic">
   <img src=${item.img} class="" id="userCenterBookLink" alt="..." data-id=${item.id} style="width: 15rem;height: 15rem;">
   <div class="card-body ">         
     <div class="row cardIcon">
       <p class=" col-7 card-title">${item.bookName}</p>
       <div class="col-5 startag "><img class="starImg" src="../img/star.svg" alt="star">${item.Star}</div>
      </div> 
   </div>
</div>`;
    };
    
  });
 displayArea.innerHTML = str;
 displayArea.addEventListener('click',userCenterBookLink);
};

function userCenterBookLink(e){
  if(e.target.id === "userCenterBookLink"){
     location.assign(`https://ocket609.github.io/20_novel_search/app/pages.html?Id=${e.target.dataset.id}`);
  };
};


function myCollectComment(){

  let str = "";
  commentData.forEach((item) => {

    if(item.userId == Number(userId)){
      str += `
        <div class="row m-3 p-3 cardIcon align-items-center border-bottom border-2">
            <div class="col-8 col-lg-4"><a href="javascript:void(0);"><h5 class="booklink" id="userCenterCommentlink" data-id=${item.bookId}>${item.bookName}</h5></a></div>
            <div class="col-4 col-lg-2  d-flex startag align-items-center"><img class="starImg " src="../img/star.svg" alt="star">${item.score}</div> 
            <div class="col-12 col-lg-6"><p class="userCenterCommentText card-text mt-3">${item.textContent}</p></div>
        </div>`;
    };
  });
 displayArea.innerHTML = str;
 displayArea.addEventListener('click',userCenterCommentlink);
};

function userCenterCommentlink(e){
   if(e.target.id === "userCenterCommentlink"){
      location.assign(`https://ocket609.github.io/20_novel_search/app/pages.html?Id=${e.target.dataset.id}`);
   };
};

function myWatchHistory(){
  const bookHistory = localStorage.getItem("bookHistoryId");
  const bookHistoryParse = JSON.parse(bookHistory);
  let str = "";
  let i = 0;
  if(bookHistoryParse.length === 0){
    displayArea.innerHTML = str;
  }

  bookData.forEach((item) => {
    if(bookHistoryParse.indexOf(item.id) != -1){
      i++;
      str += `
        <div class="row m-3 pb-3 border-bottom border-2">
            <div class ="col-9"><h5 class="">${i}.${item.bookName}</h5>
            <p class ="mt-2">${item.author}</p></div>
            <div class ="col-3 clearButtonDiv"><a class="clearButton" role="button" data-id = "${item.id}">刪除</a></div>
        </div>`;
    };
  });
  if(bookHistoryParse.length > 1){
    str += `<div class ="row mx-3">
    <div class ="col-9"></div>
    <div class ="col-3"><a class ="clearButton" role="button">全部移除</a></div>
    </div>`;
  };
 displayArea.innerHTML = str;
 displayArea.addEventListener('click',myWatchHistoryDelete);
};


function myWatchHistoryDelete(e){
    const bookHistory = localStorage.getItem("bookHistoryId");
    const bookHistoryParse = JSON.parse(bookHistory);
    let id = Number(e.target.dataset.id); 
      if(e.target.innerHTML === "全部移除"){
        Swal.fire({
          title: "確定要刪除全部紀錄嗎?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "確認",
          denyButtonText: `取消`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire("刪除成功", "", "success");
            const emptyArr = [];
            localStorage.setItem("bookHistoryId", JSON.stringify(emptyArr));
            myWatchHistory();
          } else if (result.isDenied) {
            Swal.fire("取消成功", "", "info");
          }
        });
       };

       if(e.target.className === "clearButton"){
        const newbookHistory = bookHistoryParse.findIndex(item => item == id);
        if(newbookHistory != -1){
          bookHistoryParse.splice(newbookHistory,1);
          localStorage.setItem("bookHistoryId", JSON.stringify(bookHistoryParse));
          myWatchHistory();
        };
       };    
};


function myAccountSetup(){

  displayArea.classList.value = "userCenterDisplayArea";
   let str = `  
   <form class="mb-3 accountInfoForm">
   <div class="row mt-2">
     <div class="col-4 text-end"><label for="staticEmail" class="col-form-label">Email:</label></div>
     <div class="col-8"><input type="text" readonly class="form-control-plaintext" name="staticEmail" value="${userData.email}"></div>
   </div>
   <div class="row mt-2">
     <div class="col-4 text-end"><label for="nickName" class="col-form-label ">暱稱:</label></div>
     <div class="col-7"><input type="text" class="userCenterAccountFromInput nickName" name="nickName" value="${userData.nick_name}">
     <span class="span-message nickName-message"></span>
     </div>

   </div>
   <div class="row mt-2 ">
      <div class="col-4 text-end"><label for="phone" class="col-form-label ">電話:</label></div>
      <div class="col-7"><input type="text" class="userCenterAccountFromInput phone" name="phone" value="${userData.phone}">
      <span class="span-message phone-message text-center"></span>
      </div>

   </div>
   <div class="row mt-2">
    <div class="col-6"></div>
    <div class="col-6"><input  class="btn btn-primary mb-3" type="submit" value="修改"></div>
  </div>
 </form>`;
   displayArea.innerHTML = str;
   displayArea.addEventListener('submit', submitAccountInfoForm);
}

function updateAccountInfo() {

  const upgradeNickName = document.querySelector('.nickName');
  const upgradePhone =    document.querySelector('.phone');

  axios
      .patch(`https://two023-json-server-vercel-main.onrender.com/600/users/${userId}`, {
          "nick_name": upgradeNickName.value,
          "phone": upgradePhone.value
      }, {
          headers: {
              "authorization": `Bearer ${token}`
          }
      })
      .then((response) => {
          Swal.fire("會員資料更新完成!", "", "success");
          PageUserApi();
          setTimeout("myAccountSetup()",600);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "會員資料更新失敗",
         });
          console.log(error.response);
      })
};


//聆聽修改功能


//Validate.JS 驗證格式
let constraints = {
  nickName: {
    presence: {
        message: "^必填"
    }
   },
  phone: {
    presence: {
        message: "^必填"
    },
    length: {
        is: 10, // 長度等於10
        message: "^號碼需10碼"
    }
   }
};

function submitAccountInfoForm(e) {
  e.preventDefault();
  const accountInfoForm = document.querySelector('.accountInfoForm');
  let result = validate(accountInfoForm, constraints);
  cleanMessage();
  if (result) {
    let message;
    let nameList = Object.keys(result);
   
    nameList.forEach((item) => {
      message = document.querySelector(`.${item}-message`);
      message.innerHTML = result[item];
    });
  } else{
    Swal.fire({
      title: "確定要更新會員資料嗎?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "確認",
      denyButtonText: `取消`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        updateAccountInfo();
      } else if (result.isDenied) {
        Swal.fire("取消成功", "", "info");
      }
    });
   }
  }


//清除驗證訊息
function cleanMessage() {
  let message = document.querySelectorAll(".span-message");
  message.forEach((message) => {
    message.innerHTML = "";
  });
}