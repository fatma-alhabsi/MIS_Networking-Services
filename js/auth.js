function register() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let role = document.getElementById("role").value;

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.email === email)) {
    alert("User already exists");
    return;
  }

  users.push({ email, password, role });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful");
  location.href = "login.html";
}

function login() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  if (user.role === "client") location.href = "client/dashboard.html";
  if (user.role === "technician") location.href = "technician/dashboard.html";
  if (user.role === "admin") location.href = "admin/dashboard.html";
}
function togglePassword(){
  const pass = document.getElementById("password");

  if(pass.type === "password"){
    pass.type = "text";
  }else{
    pass.type = "password";
  }
}
function resetPassword(){

const email=document.getElementById("resetEmail").value;
const newPassword=document.getElementById("newPassword").value;

let users=JSON.parse(localStorage.getItem("users")) || [];

const user=users.find(u=>u.email===email);

if(!user){
alert("User not found");
return;
}

user.password=newPassword;

localStorage.setItem("users",JSON.stringify(users));

alert("Password reset successfully");

window.location.href="login.html";

}
function sendOTP(){

const email=document.getElementById("email").value;

let users=JSON.parse(localStorage.getItem("users")) || [];

const user=users.find(u=>u.email===email);

if(!user){
alert("User not found");
return;
}

const otp=Math.floor(100000 + Math.random()*900000);

localStorage.setItem("resetOTP",otp);
localStorage.setItem("resetEmail",email);

alert("Your OTP is: " + otp); // simulation

}

function sendOTP(){

const email=document.getElementById("email").value;

let users=JSON.parse(localStorage.getItem("users")) || [];

const user=users.find(u=>u.email===email);

if(!user){
alert("User not found");
return;
}

const otp=Math.floor(100000 + Math.random()*900000);

localStorage.setItem("resetOTP",otp);
localStorage.setItem("resetEmail",email);

const templateParams={
to_email:email,
otp_code:otp
};

emailjs.send("service_ry6ejyr","template_ep5icyo",templateParams)
.then(function(){
alert("OTP sent to your email");
})
.catch(function(error){
alert("Email failed: "+error);
});

}