let islogin = true

const form = document.querySelector("form")
const title = document.getElementById("title")


const boxInputFirstName = document.getElementById("inputFirstName")
const inputFirstName = document.querySelector("#firstName")

const boxInputLastName = document.getElementById("inputLastName")
const inputLastName = document.querySelector("#lastName")

const boxInputUsername = document.getElementById("inputUsername")
const inputUsername = document.querySelector("#username ")

const boxInputConfirmPassword = document.getElementById("inputConfirmPassword")
const inputConfirmPassword = document.querySelector("#confirmPassword")



const boxInputEmail = document.getElementById("inputEmail")
const inputEmail = document.querySelector("#email")
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const boxInputPassword = document.getElementById("inputPassword")
const inputPassword = document.querySelector("#password")


const errorInputFirstName = document.querySelector(".text-error-firstName")
const errorInputLastName = document.querySelector(".text-error-lastName")
const errorInputUserName = document.querySelector(".text-error-username")
const errorInputEmail = document.querySelector(".text-error-email")
const errorInputPassword = document.querySelector(".text-error-password")
const errorInputConfirmPassword = document.querySelector(".text-error-confirmPassword")




const button = document.getElementById("button")

const changeAccount = document.getElementById("changeAccount")



const boxTextOk = document.querySelector(".box-text-ok");
const TextOk = document.querySelector(".box-text-ok #text-ok");
const iconOk = document.querySelector(".box-text-ok i")


function login(){
        islogin = true;
        boxInputFirstName.style.display = "none";
        // inputFirstName.removeAttribute("required");
        boxInputLastName.style.display = "none";
        // inputLastName.removeAttribute("required");

        boxInputUsername.style.display = "none";
        // inputUsername.removeAttribute("required");

        boxInputConfirmPassword.style.display = "none";
        // inputConfirmPassword.removeAttribute("required");


        title.textContent = "Welcome";
        inputPassword.setAttribute("placeholder","enter password");

        button.textContent = "Log in";

        changeAccount.textContent = "sing Up";
}

function singUp(){
        islogin = false;

        boxInputFirstName.style.display = "";
        // inputFirstName.setAttribute("required","");
        inputFirstName.attribu
        boxInputLastName.style.display = "";
        // inputLastName.setAttribute("required","");
        boxInputUsername.style.display = "";
        // inputUsername.setAttribute("required","")
        boxInputConfirmPassword.style.display = "";
        // inputConfirmPassword.setAttribute("required","");

        title.textContent = "Sign up";
        document.querySelector("#inputPassword input").setAttribute("placeholder","Create password");

        button.textContent = "Create account";

        changeAccount.textContent = "Log in";
}

function resitInput(){
    inputFirstName.value = ""
    inputLastName.value = ""
    inputUsername.value = ""
    inputEmail.value = ""
    inputPassword.value = ""
    inputConfirmPassword.value = ""
}





login();


changeAccount.onclick = function(){

    islogin = !islogin
    console.log(islogin)
    if(islogin){
        login();    
    }else{
        singUp();
    }
}


function chickInput(input , number){
    // let valueFirstName = inputFirstName.value.trim().replace(/\s+/g, '');
    // let valueLastName = inputLastName.value.trim().replace(/\s+/g, '');

    switch (number){
        
        case "userPass":    // chick password && Username
            if(input.value.length < 8 || input.value != input.value.trim().replace(/\s+/g, '')){
                
                document.querySelector(".text-error-"+input.id).textContent = "Error (تحقق من أنه لا توجد مسافة او اقل من 8)"
                return false;
            }else{
                document.querySelector(".text-error-"+input.id).textContent = " "
                

                return true;
                
            }
            break
            
        case "name":  // chick first & Last Name
            if(input.value == "" || input.value != input.value.trim().replace(/\s+/g, '')){
                document.querySelector(".text-error-"+input.id).textContent = "قم بإزالة المسافات"
                return false;
            }else{
                document.querySelector(".text-error-"+input.id).textContent = ""
                return true;
            }
            break
        case "email": // chick email
            if(!emailPattern.test(inputEmail.value) || input.value.length < 8){
                document.querySelector(".text-error-"+input.id).textContent = "البريد غير صالح"
                return false
            }else{
                document.querySelector(".text-error-"+input.id).textContent = ""
                return true
            }
            break

        case "confirmPass": // confirm password   AND  Password
            if(input.value != inputPassword.value){
                document.querySelector(".text-error-"+input.id).textContent = "Error Password "
                return false
            }else{
                document.querySelector(".text-error-"+input.id).textContent = ""
                return true
            }
            break


    }
    
}

function a(){
    


}

// 1. اجعل مستمع الحدث الخاص بالفورم مستقلاً وخارج الـ onclick
form.addEventListener('submit', function(event) {
    event.preventDefault();

});

// 2. زر الـ button الآن وظيفته فقط تفعيل إرسال الفورم (Submit)
// أو تغيير الحالة (islogin) إذا كنت تستخدمه للتبديل بين الواجهات
button.onclick = () => {
    
    if (islogin) {
        let isValid = true;
        // التحقق من الإيميل
        
        if (!chickInput(inputEmail,"email")) {
            isValid = false;
        }
        
        // التحقق من كلمة المرور
        if (!chickInput(inputPassword,"userPass")) {
            isValid = false;
        }
    
        // إذا كان هناك خطأ، امنع الإرسال
        // داخل button.onclick في الجزء الخاص بالـ Login (islogin == true)
        if (isValid) {
            let loginData = {
                email: inputEmail.value,
                password: inputPassword.value
            };

            fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === "تم تسجيل الدخول بنجاح") {
                    // حفظ بيانات المستخدم في السيشين أو التوجه للصفحة الرئيسية
                    window.open("page/home.html", "_top");
                } else {
                    alert(data.message);
                }
            })
            .catch(err => alert("السيرفر لا يعمل أو هناك مشكلة في الاتصال"));
}
    } else {
        // منطق التسجيل (Sign Up)
         // نمنع التحديث لحفظ البيانات في LocalStorage
    
        let isValid = true;
    
        if (!chickInput(inputFirstName,"name")) {
            isValid = false;
        }
        if (!chickInput(inputLastName,"name")) {
            isValid = false;
        }
        if (!chickInput(inputUsername,"userPass")) {
            isValid = false;
        }
        if (!chickInput(inputEmail,"email")) {
            isValid = false;
        }
        // التحقق من كلمة المرور
        if (!chickInput(inputPassword,"userPass")) {
            isValid = false;
        }
        if (!chickInput(inputConfirmPassword,"confirmPass")) {
            isValid = false;
        }
        
        if(isValid){
            // داخل button.onclick في الجزء الخاص بالـ SignUp

            let userData = {
                username: inputUsername.value,
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                email: inputEmail.value,
                password: inputPassword.value,
                confirmPassword: inputConfirmPassword.value
            };

            // الربط مع السيرفر
            fetch('http://localhost:3000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), // تحويل البيانات لنص JSON
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message === "تم إنشاء الحساب بنجاح") {
                    iconOk.className = "fa-regular fa-circle-check";
                    iconOk.style.color = "rgb(0, 236, 0)";
                    TextOk.textContent = "تم إنشاء حساب"
                    boxTextOk.style.transform = "translate(-50% , 0px)";
                    setTimeout(()=> {
                        boxTextOk.style.transform = "translate(-50% , -80px)";
                    }, 2000)
                    resitInput();
                    login();
                } else {
                    if(data.message === "اسم المستخدم هذا مأخوذ، اختر اسماً آخر"){
                        errorInputUserName.textContent = data.message;
                    }
                    if(data.message === "هذا الإيميل مسجل لدينا بالفعل"){
                        errorInputEmail.textContent = data.message;
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                iconOk.className = "fa-regular fa-circle-xmark";
                iconOk.style.color = "red";
                TextOk.textContent = "خطأ في السيرفر"
                boxTextOk.style.transform = "translate(-50% , 0px)";
                    setTimeout(()=> {
                        boxTextOk.style.transform = "translate(-50% , -80px)";
                    }, 2000)
            });

        }
        
    }
    // إذا كان الزر من نوع type="submit" داخل الفورم، 
    // فسيقوم تلقائياً بتشغيل الـ addEventListener أعلاه.
};
