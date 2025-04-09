const loginBtn=document.querySelector("#loginbtn");

loginBtn.addEventListener("click",()=>{

    const registrationPage=document.getElementById("registrationPage")
    const loginPage=document.querySelector("#loginPage");

    loginPage.style.zIndex="1";
    registrationPage.style.zIndex="0";


})
const registerBtn=document.querySelector("#registerBtn");
registerBtn.addEventListener("click",()=>{

    const registrationPage=document.getElementById("registrationPage")
    const loginPage=document.querySelector("#loginPage");

    loginPage.style.zIndex="0";
    registrationPage.style.zIndex="1";


})