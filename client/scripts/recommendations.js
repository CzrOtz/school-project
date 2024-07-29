class Recomendation {
    constructor() {}

    averageTheValues(values) {
        if (values.length === 0) return 0;

        let totalSum = 0;

        for (let i = 0; i < values.length; i++) {
            totalSum += parseFloat(values[i].power.split(" ")[0]);
        }

        let average = totalSum / values.length;
        return average;
    }

    getLastValue() {
        let values = JSON.parse(localStorage.getItem('powerHistory')) || [];
        if (values.length === 0) return null;

        let lastValue = values[values.length - 1];
        return lastValue;
    }

    getPercentageChange(current, previous) {
        return ((current - previous) / previous) * 100;
    }

    calculateAveragesAndDifferences() {
        let values = JSON.parse(localStorage.getItem('powerHistory')) || [];
        if (values.length === 0) return null;

        let historicAverage = this.averageTheValues(values);
        let lastSevenValues = values.slice(-7);
        let lastSevenAverage = this.averageTheValues(lastSevenValues);

        let lastValue = this.getLastValue();
        let lastPowerValue = parseFloat(lastValue.power.split(" ")[0]);

        let lastVsHistoricChange = this.getPercentageChange(lastPowerValue, historicAverage);
        let lastVsSevenDayChange = this.getPercentageChange(lastPowerValue, lastSevenAverage);
        let historicVsSevenDayChange = this.getPercentageChange(lastSevenAverage, historicAverage);

        return {
            historicAverage,
            lastSevenAverage,
            lastPowerValue,
            lastVsHistoricChange,
            lastVsSevenDayChange,
            historicVsSevenDayChange
        };
    }

    generateRecommendation(results) {
        let recommendationText = "";

        if (results.lastVsHistoricChange > 0 && results.lastVsSevenDayChange > 0 && results.historicVsSevenDayChange > 0) {
            recommendationText = "Your power consumption is trending upwards. Keep an eye on it.";
        } else if (results.lastVsHistoricChange < 0 && results.lastVsSevenDayChange < 0 && results.historicVsSevenDayChange < 0) {
            recommendationText = "Your power consumption is trending downwards. Keep up the good work!";
        } else {
            recommendationText = "Your power consumption is inconsistent. Try to identify the cause.";
        }

        return recommendationText;
    }

    getColoredPercentageHtml(value) {
        const color = value > 0 ? 'red' : 'green';
        return `<span style="background-color: ${color}; color: white; padding: 2px 5px; border-radius: 5px;">${Math.abs(value).toFixed(2)}%</span>`;
    }
}

$(document).ready(function() {
    let recommendation = new Recomendation();
    let results = recommendation.calculateAveragesAndDifferences();

    if (results) {
        $('#displayHistoricAverage').text(`Historical Average: ${results.historicAverage.toFixed(2)} Wh`);
        $('#displaySevenDayAverage').text(`Last Seven Days Average: ${results.lastSevenAverage.toFixed(2)} Wh`);
        $('#lastValue').text(`Last Value: ${results.lastPowerValue.toFixed(2)} Wh`);

        let lastVsHistoricHtml = recommendation.getColoredPercentageHtml(results.lastVsHistoricChange);
        let lastVsSevenDayHtml = recommendation.getColoredPercentageHtml(results.lastVsSevenDayChange);
        let historicVsSevenDayHtml = recommendation.getColoredPercentageHtml(results.historicVsSevenDayChange);

        $('#percentageLastVsHistoric').html(`Last value vs Historic Average: ${lastVsHistoricHtml}`);
        $('#percentageLastVsSevenDay').html(`Last value vs Seven Day Average: ${lastVsSevenDayHtml}`);
        $('#percentageHistoricVsSevenDay').html(`Historic Average vs Seven Day Average: ${historicVsSevenDayHtml}`);

        let recommendationText = recommendation.generateRecommendation(results);
        $('#recommendation').text(recommendationText);
    } else {
        console.log("No data available to calculate recommendations.");
    }
});











