class PowerCalculator {
    constructor() {
        this.powerConsumed = 0;
        this.initializeEventListeners();
        this.loadHistory();
    }

    initializeEventListeners() {
        $("#calculate").click(() => this.calculatePower());
        $("#deleteHistory").click(() => this.deleteHistory()); // Ensure deleteHistory event listener is initialized here
    }

    power() {
        return this.powerConsumed;
    }

    date() {
        const now = new Date();
        return now.toLocaleString(); 
    }

    calculatePower() {
        const voltage = parseFloat($("#voltage").val());
        const amperage = parseFloat($("#amperage").val());
        const time = parseFloat($("#timeDuration").val());

        if (!isNaN(voltage) && !isNaN(amperage) && !isNaN(time)) {
            this.powerConsumed = voltage * amperage * time;
            $("#powerConsumed").text(this.powerConsumed.toFixed(2) + " Wh");
            this.saveToHistory(this.powerConsumed, this.date());
        } else {
            alert("Please enter valid numbers for voltage, amperage, and time duration.");
        }
    }

    saveToHistory(power, date) {
        let history = JSON.parse(localStorage.getItem("powerHistory")) || [];
        history.push({ power: power.toFixed(2) + " Wh", date: date });
        localStorage.setItem("powerHistory", JSON.stringify(history));
        this.updateHistoryDisplay(history);
    }

    deleteHistory() {
        localStorage.removeItem("powerHistory"); 
        this.updateHistoryDisplay([]); // Update the display after deletion
    }

    loadHistory() {
        let history = JSON.parse(localStorage.getItem("powerHistory")) || [];
        this.updateHistoryDisplay(history);
    }

    updateHistoryDisplay(history) {
        let historyContainer = $("#history");
        historyContainer.empty();
        history.forEach(record => {
            historyContainer.append(`<div>${record.power} : ${record.date}</div>`);
        });
    }
}

$(document).ready(function() {
    new PowerCalculator();
});




