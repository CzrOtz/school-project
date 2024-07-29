$(document).ready(function() {
    $("#submit").click(function(event) {
        event.preventDefault(); // Prevent default form submission

        const enteredPassword = $("#password").val();
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.passcode === enteredPassword) {
            
            // Add your logic to proceed, e.g., redirect to another page
            window.location.href = "plantInfo.html";
        } else {
            // Password does not match
            alert("Incorrect password. Please try again.");
        }
    });
});
