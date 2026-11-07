class FarmAdvisory {
    constructor(cropType, soilMoistureReadings, weatherForecast) {
        this.cropType = cropType;
        this.soilMoistureReadings = soilMoistureReadings; 
        this.weatherForecast = weatherForecast;
    }

    calculateAverageMoisture() {
        let sum = 0;
        for (let i = 0; i < this.soilMoistureReadings.length; i++) {
            sum += this.soilMoistureReadings[i];
        }
        return sum / this.soilMoistureReadings.length;
    }

    getRecommendation() {
        const avgMoisture = this.calculateAverageMoisture();
        
        if (avgMoisture < 35 && this.weatherForecast === "Sunny") {
            return `Alert: Current moisture is ${avgMoisture.toFixed(1)}%. ${this.cropType} requires immediate irrigation. Turn on pumps for 2 hours.`;
        } else if (avgMoisture >= 35 && avgMoisture <= 65) {
            return `Status Optimal: Current moisture is ${avgMoisture.toFixed(1)}%. No irrigation required for ${this.cropType} today.`;
        } else {
            return `Warning: High moisture detected (${avgMoisture.toFixed(1)}%). Ensure proper drainage to avoid root rot.`;
        }
    }
}

document.getElementById('generateBtn')?.addEventListener('click', function() {
    // ACTUAL FIX: Retrieve the saved moisture from the registration form
    const savedMoistureStr = localStorage.getItem('savedMoisture');
    
    let recentReadings;
    if (savedMoistureStr) {
        // Convert the saved string back into a number array
        recentReadings = [parseFloat(savedMoistureStr)];
    } else {
        // Fallback if they click the button without registering first
        recentReadings = [32]; 
    }
    
    const currentForecast = "Sunny";
    const sugarcaneFarm = new FarmAdvisory("Sugarcane", recentReadings, currentForecast);
    const outputDiv = document.getElementById('advisoryOutput');
    
    outputDiv.innerHTML = `<strong>System Recommendation:</strong> <p>${sugarcaneFarm.getRecommendation()}</p>`;
});