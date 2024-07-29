function reject() {
    alert("to proced, you must accept the terms of this website, you are now being re-directed to the loggin page")
}

function accept() {
    const agree = localStorage.setItem("agreedToLegal", "true");
    return agree
}

$(document).ready(function() {
   $("#noticeNo").click(function(){
    reject();
   })

   $("#noticeYes").click(function() {
        accept();
        alert("reponse recorded");
        window.location.href = "pages/enterUserInfo.html";
        
   });
});