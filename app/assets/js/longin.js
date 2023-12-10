// 登入、註冊
let token = "";
let longinUrl = `http://localhost:3000/`;

// 初始化
function init() {
    getUsres();
};
init();

// 取得users列表
let userData = [];
function getUsres() {
    axios
        .get(`${longinUrl}users`)
        .then((response) => {
            console.log(response.data);
            userData = response.data;
        })
        .catch((error) => {
            console.log(error);
        })
};

// 送出鈕 DOM
const getLongin_btn = document.querySelector(".getLongin-btn");
const getSignUp_btn = document.querySelector(".getSignUp-btn");
const getVerify_btn = document.querySelector(".getVerify-btn");
const getReset_btn = document.querySelector(".getReset-btn");

// 各區塊 DOM
const longin = document.querySelector(".longin");
const signup = document.querySelector(".signup");
const textEmail = document.querySelector(".textEmail");
const resetPassword = document.querySelector(".resetPassword");

// 現在註冊切換
const signinNew = document.querySelector(".signinNew");
signinNew.addEventListener("click", (e) => {
    longin.classList.add("d-none");
    signup.classList.remove("d-none");
});
// 忘記密碼切換
const forget_password = document.querySelector(".forget-password");
forget_password.addEventListener("click", (e) => {
    longin.classList.add("d-none");
    textEmail.classList.remove("d-none");
});

// 註冊送出鈕
getSignUp_btn.addEventListener("click", (e) => {
    e.preventDefault();
    //console.log(e.target);
    const signupEmail = document.querySelector("#signupEmail").value;
    const signupPassword = document.querySelector("#signupPassword").value;
    const signupPasswordAgain = document.querySelector("#signupPasswordAgain").value;
    const signupPhone = document.querySelector("#signupPhone").value;
    if(signupPasswordAgain !== signupPassword) {
        alert("請確認密碼2次輸入是否正確！");
        //暫時先用，有時間再換成有設計的alert
    }
    SignUp();
});
// 註冊POST
function SignUp() {
    axios
        .post(`${longinUrl}users`, {
            "email": signupEmail, //必填
            "password": signupPassword, //必填，會自行加密
            "account": "",
            "name": "", //必填
            "given_name": "",
            "family_name": "",
            "phone": signupPhone, //必填
            "img": "",
            "logins_count": 0,
            "created_at": "",
            "updated_at": "",
            "last_login": "",
            "email_verified": true,
            "collect_book": [],
            "collect_comment": [],
            "comment": [],
            "token": "",
        })
        .then((response) => {
            console.log(response.data);
            //跳出註冊成功alert，點擊確認後轉跳登入頁面(按鈕a給小說主頁網址)
        })
        .catch((error) => {
            console.log(error);
        })
};

// 登入送出鈕
getLongin_btn.addEventListener("click", (e) => {
    e.preventDefault();
    //console.log(e.target);
    const longinEmail = document.querySelector("#longinEmail").value;
    const longinPassword = document.querySelector("#longinPassword").value;
    login();
});
// 登入POST
function login() {
    axios
        .post(`${longinUrl}login`, {
            "email": longinEmail,
            "password": longinPassword
        })
        .then((response) => {
            console.log(response.data);
            token = response.data.accessToken;
            //跳出成功登入alert，點擊確認後轉跳小說首頁
        })
        .catch((error) => {
            console.log(error.response);
        })
};

// 重設密碼PATCH
function updatePassword() {
    axios
        .patch(`${longinUrl}600/users/4`, {
            "password": "1122334455"
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            //console.log(response.data);
            token = response.data.accessToken;
            //跳出密碼修改完成alert，點擊確認後轉跳登入頁面
        })
        .catch((error) => {
            console.log(error);
        })
};
//http://localhost:3000/users/${userId} 無權限限制
//http://localhost:3000/600/users/${userId} 有權限限制
//加密前面都要帶上 Bearer

// 修改內容
function patchContent() {
    axios
        .patch(`${longinUrl}users/4`, {
            "name": "毛毛"
        })
        .then((response) => {
            console.log(response.data);
            //token = response.data.accessToken;
        })
        .catch((error) => {
            console.log(error);
        })
};