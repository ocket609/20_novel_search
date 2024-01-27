// 登入、註冊
let token = "";
let longinUrl = `https://two023-json-server-vercel-main.onrender.com/`;

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
            console.log(userData[0].id);
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
const forget_password = document.querySelector(".forget-password-btn");
forget_password.addEventListener("click", (e) => {
    e.preventDefault();
    longin.classList.add("d-none");
    textEmail.classList.remove("d-none");
});

const register_content = document.querySelector(".register-content");
// 註冊送出鈕
//getSignUp_btn.addEventListener("submit"
register_content.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target);
    const signupEmail = document.querySelector("#signupEmail").value;
    const signupPassword = document.querySelector("#signupPassword").value;
    const signupPasswordAgain = document.querySelector("#signupPasswordAgain").value;
    const signupPhone = document.querySelector("#signupPhone").value;
    //const signupEmailInput = document.querySelector("#signupEmail");
    //signupEmailInput.reportValidity();

    const checkValidate = validate(register_content, constraints);
    if (checkValidate) {
        console.log(checkValidate);
        return;
    }
    
    userData.forEach((item) => {
        if(signupEmail === item.email) {
            Swal.fire({
                icon: "error",
                title: "信箱已註冊過囉！"
            });
            return;
        }
    });
    /*if(signupPasswordAgain !== signupPassword) {
        Swal.fire({
            icon: "error",
            title: "請確認密碼2次輸入是否正確！"
        });
        return; //中斷，不中斷會繼續往下跑註冊成功
    };*/

    SignUp(signupEmail, signupPassword, signupPhone);
});
// 註冊POST
function SignUp(signupEmail, signupPassword, signupPhone) {
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
            //alert("註冊完成");
            Swal.fire("註冊完成");
            //跳出註冊成功alert，點擊確認後轉跳登入頁面(按鈕a給小說主頁網址)
            // 清空
            document.querySelector("#signupEmail").value = "";
            document.querySelector("#signupPassword").value = "";
            document.querySelector("#signupPasswordAgain").value = "";
            document.querySelector("#signupPhone").value = "";
            // 註冊完成切換登入
            longin.classList.remove("d-none");
            signup.classList.add("d-none");
        })
        .catch((error) => {
            console.log(error);
        })
};

// 登入送出鈕
let longinUserId = "";
getLongin_btn.addEventListener("click", (e) => {
    e.preventDefault();
    //console.log(e.target);
    const longinEmail = document.querySelector("#longinEmail").value;
    const longinPassword = document.querySelector("#longinPassword").value;
    //const longinEmailInput = document.querySelector("#longinEmail");
    //longinEmailInput.reportValidity();

    userData.forEach((item) => {
        if(longinEmail === item.email) {
            //longinEmailInput.classList.add("is-valid");
            longinUserId = item.id;
            console.log(longinUserId);
        }
    });

    validate(longin, constraints);

    login(longinEmail, longinPassword);
});
// 登入POST
function login(longinEmail, longinPassword) {
    axios
        .post(`${longinUrl}login`, {
            "email": longinEmail,
            "password": longinPassword,
            "token": token
        })
        .then((response) => {
            console.log(response.data);
            token = response.data.accessToken;
            //alert("登入成功");
            window.setTimeout('Swal.fire("登入成功")',50);
            //跳出成功登入alert，點擊確認後轉跳小說首頁

            localStorage.setItem("loginUserId",longinUserId);
            console.log(longinUserId);
            localStorage.setItem("loginToken",token);
            console.log(token);

            // 用來判斷是否登入
            const now = new Date();
            const loginInfo = {
                value: 'true',
                expired: now.getTime()  +3600000
            };
            localStorage.setItem('loginStatuswithExpired', JSON.stringify(loginInfo))

            // 清空
            document.querySelector("#longinEmail").value = "";
            document.querySelector("#longinPassword").value = "";
            // 登入完成轉跳首頁
            //location.href="https://ocket609.github.io/20_novel_search/#",3000;
            //countDown();
            setTimeout('location.href="https://ocket609.github.io/20_novel_search/#"',1000);
        })
        .catch((error) => {
            console.log(error.response);
            console.log(error.response["data"]); //取到網頁console error data 訊息，用來比對判斷
            if(error.response["data"] == "Cannot find user") {
                Swal.fire({
                    icon: "error",
                    title: "Email 尚未註冊"
                });
            } else if (error.response["data"] == "Incorrect password") {
                Swal.fire({
                    icon: "error",
                    title: "密碼輸入錯誤",
                    text: "請再次嘗試！"
                });
            }
        })
};

// 密碼重設完成切換登入
getReset_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const resetPassword = document.querySelector("#resetPassword").value;
    const resetPasswordAgain = document.querySelector("#resetPasswordAgain").value;
    if(resetPassword !== resetPasswordAgain) {
        Swal.fire({
            icon: "error",
            title: "請確認密碼2次輸入是否正確！"
        });
        return;
    }
    updatePassword(resetPassword);
});
// 重設密碼PATCH
function updatePassword(resetPassword) {
    axios
        .patch(`${longinUrl}600/users/${longinUserId}`, {
            "password": resetPassword
        }, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data);
            token = response.data.accessToken;
            Swal.fire("密碼重新設定完成");
            //跳出密碼修改完成alert，點擊確認後轉跳登入頁面
            // 清空
            document.querySelector("#resetPassword").value = "";
            document.querySelector("#resetPasswordAgain").value = "";
            resetPasswordclassList.add("d-none");
            longin.classList.remove("d-none");
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
        .patch(`${longinUrl}users/1`, {
            "password": "bestPassw0rd"
        })
        .then((response) => {
            console.log(response.data);
            //token = response.data.accessToken;
        })
        .catch((error) => {
            console.log(error);
        })
};


// constraints 驗證器
let constraints = {
    email: {
        presence: {
            message: "^必填" //必填
        },
        email: true //需符合 email 格式
    },
    password: {
        presence: {
            message: "^必填"
        },
        length: {
            minimum: 6, //長度大於6
            maximum: 12, //長度小於12
            message: "^密碼需6~12碼"
        }
    },
    passwordAgain: {
        presence: {
            message: "^必填"
        },
        equality: {
            attribute: "password",// 此欄位要和密碼欄位一樣
            message: "^與輸入密碼不符"
        }
    },
    phone: {
        presence: {
            message: "^必填"
        }
    }
}

