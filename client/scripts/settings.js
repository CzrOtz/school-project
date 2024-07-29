// Class based so I can easily possibly add more settings in the future
class Settings {
    constructor() {}

    // Reset the passcode within the user object
    resetPassword(NewPasscode) {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            user = {};
        }
        user.passcode = NewPasscode;
        localStorage.setItem("user", JSON.stringify(user));
    }

    // Confirm the action
    confirmAction() {
        return confirm("Are you sure you want to reset the password?");
    }

    // Verify if the old passcode is correct
    verifyPassword(oldPasscode) {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user && user.passcode === oldPasscode) {
            return true;
        }
        return false;
    }

    // Compare if the two new passcodes are the same
    comparePasswords(NewPasscode1, NewPasscode2) {
        return NewPasscode1 === NewPasscode2;
    }

    error(old, new1, new2) {
        let compareOld = this.verifyPassword(old);
        let compareNew = this.comparePasswords(new1, new2);
        let inDependentCompare = new1 === new2;

        alert("wrong password entered or new passwords do not match");
        console.log("new error")
        console.log(old, new1, new2);
        console.log("this is the old: ", compareOld, "this is the new: ", compareNew);
        console.log("type of new1", typeof new1);
        console.log("type of new2 ", typeof new2);
        console.log("independent binary operand ", inDependentCompare);
        console.log("this is the type of stored password ", typeof JSON.parse(localStorage.getItem("user")).passcode, "this is the value of stored passcode ", JSON.parse(localStorage.getItem("user")).passcode);
        console.log("this is the type of the input password: ", typeof old);
    }
}

const userSettings = new Settings();

$(document).ready(function() {
    $("#submit").click(function(event) {
        event.preventDefault(); // Prevent the default form submission

        let oldPasscode = $("#oldPass").val();
        let newPasscode1 = $("#newPass").val();
        let newPasscode2 = $("#confirmPass").val();

        if (userSettings.verifyPassword(oldPasscode) && userSettings.comparePasswords(newPasscode1, newPasscode2)) {
            if (userSettings.confirmAction()) {
                userSettings.resetPassword(newPasscode1);
                alert("Password has been reset");
                window.location.href = "userMenu.html"
            }
        } else {
            userSettings.error(oldPasscode, newPasscode1, newPasscode2);
        }
    });

    
   
});




