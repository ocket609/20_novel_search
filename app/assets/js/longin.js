// 登入、註冊
let token = "";
let loginUrl = `https://two023-json-server-vercel-main.onrender.com/`;

// 初始化
function init() {
    getUsres();
};
init();

// 取得users列表
let userData = [];
function getUsres() {
    axios
        .get(`${loginUrl}users`)
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
const getLogin_btn = document.querySelector(".getLogin-btn");
const getSignUp_btn = document.querySelector(".getSignUp-btn");
const getVerify_btn = document.querySelector(".getVerify-btn");
const getReset_btn = document.querySelector(".getReset-btn");

// 各區塊 DOM
const login = document.querySelector(".login");
const signup = document.querySelector(".signup");
const textEmail = document.querySelector(".textEmail");
const resetPassword = document.querySelector(".resetPassword");

// 現在註冊切換
const signinNew = document.querySelector(".signinNew");
signinNew.addEventListener("click", (e) => {
    login.classList.add("d-none");
    signup.classList.remove("d-none");
});
// 忘記密碼切換
const forget_password = document.querySelector(".forget-password-btn");
forget_password.addEventListener("click", (e) => {
    e.preventDefault();
    login.classList.add("d-none");
    textEmail.classList.remove("d-none");
});

const register_content = document.querySelector(".register-content");
// 註冊送出鈕
register_content.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target);
    const signupEmail = document.querySelector("#signupEmail").value;
    const signupPassword = document.querySelector("#signupPassword").value;
    const signupPasswordAgain = document.querySelector("#signupPasswordAgain").value;
    const signupNickName = document.querySelector("#signupNickName").value;
    const signupPhone = document.querySelector("#signupPhone").value;

    //console.log(userData);
    // 註冊區塊驗證
    const checkValidate = validate(register_content, constraints);
    const checkEmail = userData.filter((item) => item.email.includes(signupEmail));
    cleanMessage();
    // 驗證判斷
    if(checkValidate) { // 判斷如果驗證執行 true，驗證的錯誤資訊呈現
        checkMessage(checkValidate, register_content);
    } else if (checkEmail.length != 0) {
        Swal.fire({
            icon: "error",
            title: "信箱已註冊過囉！"
        });
    } else {
        SignUp(signupEmail, signupPassword, signupPhone);
        // 帶入註冊資料
    }

});
// 註冊POST
function SignUp(signupEmail, signupPassword, signupPhone) {
    axios
        .post(`${loginUrl}users`, {
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
            Swal.fire("註冊完成");
            //跳出註冊成功alert，點擊確認後轉跳登入頁面(按鈕a給小說主頁網址)
            // 清空
            document.querySelector("#signupEmail").value = "";
            document.querySelector("#signupPassword").value = "";
            document.querySelector("#signupPasswordAgain").value = "";
            document.querySelector("#signupNickName").value = "";
            document.querySelector("#signupPhone").value = "";
            // 註冊完成切換登入
            login.classList.remove("d-none");
            signup.classList.add("d-none");
        })
        .catch((error) => {
            console.log(error);
            console.log(error.response);
            if(error.response["data"] == "Email and password are required") {
                Swal.fire({
                    icon: "error",
                    title: "資訊填寫不完全"
                });
            }
            // 清空
            document.querySelector("#signupEmail").value = "";
            document.querySelector("#signupPassword").value = "";
            document.querySelector("#signupPasswordAgain").value = "";
            document.querySelector("#signupNickName").value = "";
            document.querySelector("#signupPhone").value = "";
        })
};

// 登入送出鈕
const login_content = document.querySelector(".login-content");
let loginUserId = "";
login_content.addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log(e.target);
    const loginEmail = document.querySelector("#loginEmail").value;
    const loginPassword = document.querySelector("#loginPassword").value;

    // 登入區塊驗證
    const checkValidate = validate(login_content, constraintsLogin);
    const checkEmail = userData.filter((item) => item.email.includes(loginEmail));
    // 判斷
    const checkEmaliLength = checkEmail.length === 0 ? null : checkEmail[0].id;

    cleanMessage();
    if (checkValidate) {
        checkMessage(checkValidate, login_content);
    } else {
        Login(loginEmail, loginPassword);
    }

});
// 登入POST
function Login(loginEmail, loginPassword, loginUserId) {
    axios
        .post(`${loginUrl}login`, {
            "email": loginEmail,
            "password": loginPassword,
            "token": token
        })
        .then((response) => {
            console.log(response.data);
            token = response.data.accessToken;
            window.setTimeout('Swal.fire("登入成功")',50);
            //跳出成功登入alert，點擊確認後轉跳小說首頁

            localStorage.setItem("loginUserId",loginUserId);
            console.log(loginUserId);
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
            document.querySelector("#loginEmail").value = "";
            document.querySelector("#loginPassword").value = "";
            // 登入完成轉跳首頁
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
            // 清空
            document.querySelector("#loginEmail").value = "";
            document.querySelector("#loginPassword").value = "";
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
        .patch(`${loginUrl}600/users/${loginUserId}`, {
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
            login.classList.remove("d-none");
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
        .patch(`${loginUrl}users/1`, {
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


// 
function checkMessage(checkValidate, formDom) {
    let message = null;
    let messageList = Object.keys(checkValidate);
    messageList.forEach((item) => {
        message = formDom.querySelector(`.${item}-message`);
        message.innerHTML = checkValidate[item];
    });
}

// 清除顯示的
function cleanMessage() {
    //document.querySelectorAll("span").value = "";  直接清空沒用
    let removeMessage = document.querySelectorAll("span");
    removeMessage.forEach((item) => {
        item.innerHTML = "";
    })
}

// constraints 驗證器
// 註冊
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
            message: "^與上方密碼不符"
        }
    },
    NickName: {
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
}

// 登入
let constraintsLogin = {
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
    } 
}
