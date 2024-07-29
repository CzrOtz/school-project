function draw() {
    // Get history data from local storage
    let history = JSON.parse(localStorage.getItem("powerHistory")) || [];
    console.log(history);

    // Limit to the last seven records
    let recentHistory = history.slice(-7);

    // Extract the power values and the corresponding dates
    let powerValues = recentHistory.map(record => parseFloat(record.power.split(" ")[0]));
    let dates = recentHistory.map(record => record.date);

    
    new RGraph.Line({
        id: 'canvasElement',
        data: powerValues,
        options: {
            gutterLeft: 60,
            gutterRight: 60,
            gutterTop: 60,
            gutterBottom: 60,
            backgroundGrid: true,
            backgroundGridAutofitNumhlines: 10,
            backgroundGridAutofitNumvlines: dates.length,
            colors: ['yellow'],
            hmargin: 1,
            textSize: 5,
            textAngle: 90,
            xaxisLabels: dates,
            xaxisTitle: 'Date and Time',
            yaxisTitle: 'Power Consumed (Wh)',
            title: 'Power Consumption Over Time',
            tooltips: powerValues,
            tooltipsEvent: 'onmousemove',
            linewidth: 3,
            shadow: true,
            shadowColor: '#aaa',
            shadowBlur: 10,
            shadowOffsetx: 5,
            shadowOffsety: 5,
        }
    }).draw();
}



