let islogin = true
const title = document.getElementById("title")


const inputFirstName = document.getElementById("inputFirstName")
const inputLastName = document.getElementById("inputLastName")
const inputUsername = document.getElementById("inputUsername")
const inputConfirmPassword = document.getElementById("inputConfirmPassword")


const inputEmail = document.getElementById("inputEmail")
const inputPassword = document.getElementById("inputPassword")

const button = document.getElementById("button")

const changeAccount = document.getElementById("changeAccount")


function login(){
        inputFirstName.style.display = "none";
        inputLastName.style.display = "none";
        inputUsername.style.display = "none";
        inputConfirmPassword.style.display = "none";

        title.textContent = "Welcome";
        document.querySelector("#inputPassword input").setAttribute("placeholder","enter password");

        button.textContent = "Log in";

        changeAccount.textContent = "sing Up";
}

function singUp(){
        inputFirstName.style.display = "";
        inputLastName.style.display = "";
        inputUsername.style.display = "";
        inputConfirmPassword.style.display = "";

        title.textContent = "Sign up";
        document.querySelector("#inputPassword input").setAttribute("placeholder","Create password");

        button.textContent = "Create account";

        changeAccount.textContent = "Log in";
}

login();


changeAccount.onclick = function(){

    islogin = !islogin
    if(islogin){
        login();    
    }else{
        singUp();
    }
}