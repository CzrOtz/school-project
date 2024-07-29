class Info {
    constructor(Id = "", Nm = "", Ltn = "", Di = "") {
        this.Id = Id;
        this.Nm = Nm;
        this.Ltn = Ltn;
        this.Di = Di;
    }

    deny(event) {
        event.preventDefault();
        alert("You have not completed the form");
    }

    retrieveValues(event) {
        const ID = $("#plantID").val() || this.Id;
        const Name = $("#plantName").val() || this.Nm;
        const Location = $("#plantLocation").val() || this.Ltn;
        const DateInstall = $("#plantDate").val() || this.Di;

        if (!ID || !Name || !Location || !DateInstall) {
            this.deny(event);
            return null;
        }

        return { ID, Name, Location, DateInstall };
    }

    storeInLocal(plant) {
        localStorage.setItem("plant", JSON.stringify(plant));
    }

    displayInformation() {
        const plant = JSON.parse(localStorage.getItem("plant"));
        if (plant) {
            $("#plantID").text(plant.ID);
            $("#plantName").text(plant.Name);
            $("#plantLocation").text(plant.Location);
            $("#plantDate").text(plant.DateInstall);
        }
    }
}

const myPlant = new Info();

$(document).ready(function () {
    $("#submit").click(function (event) {
        event.preventDefault();
        const plant = myPlant.retrieveValues(event);
        if (plant) {
            myPlant.storeInLocal(plant);
            alert("Data successfully stored");
            window.location.href = "displayPlantInfo.html";
        } else {
            alert("There was a problem storing your data. Please try again.");
        }
    });

    // Display information if on the display page
    if (window.location.pathname.endsWith("displayPlantInfo.html")) {
        myPlant.displayInformation();
    }
});






