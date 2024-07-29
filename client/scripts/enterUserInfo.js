class User {
    constructor(firstName = "", lastName = "", birthDate = "", email = "", passcode = "") {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.passcode = passcode;
    }

    deny(event) {
        event.preventDefault();
        alert("You have not completed the form");
    }

    skipAlert() {
        alert("This button is for web testing only");
    }

    retrieveValues(event) {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const birthDate = $("#birthDate").val();
        const email = $("#email").val();
        const passcode = $("#passcode").val();

        console.log("Retrieved values:", firstName, lastName, birthDate, email, passcode); // Debugging statement

        if (!firstName || !lastName || !birthDate || !email || !passcode) {
            this.deny(event);
            return null;
        }
        return { firstName, lastName, birthDate, email, passcode };
    }

    storeInLocal(user) {
        console.log("Storing user in local storage:", user); // Debugging statement
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Stored user:", localStorage.getItem("user")); // Debugging statement
    }
}

$(document).ready(function() {
    const userInstance = new User();

    $("#submit").click(function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Retrieve values from the form
        const user = userInstance.retrieveValues(event);
        if (user) {
            userInstance.storeInLocal(user);
            alert("Data successfully stored");
            window.location.href = "userMenu.html";
        } else {
            alert("There was a problem storing your data. Please try again.");
        }
    });

    $("#skip").click(function() {
        userInstance.skipAlert();
        window.location.href = "userMenu.html";
    });

    // Check if the user has agreed to the legal notice
    if (localStorage.getItem("agreedToLegal") === null) {
        window.location.href = "disclaimer.html";
    }

    // $("#delete").click(function() {
    //     localStorage.clear();
    //     alert("Local storage cleared");
    // });
});





