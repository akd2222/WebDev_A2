function validateForm(event) {
    event.preventDefault(); 
    
    let isValid = true;
    
    const mobile = document.getElementById('mobile').value;
    const soilMoisture = document.getElementById('soilMoisture').value;
    
    const mobileError = document.getElementById('mobileError');
    const moistureError = document.getElementById('moistureError');
    const successMsg = document.getElementById('successMessage');

    mobileError.textContent = '';
    moistureError.textContent = '';
    successMsg.textContent = '';

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
        mobileError.textContent = "Mobile number must be exactly 10 digits.";
        isValid = false;
    }

    if (soilMoisture > 100 || soilMoisture < 0 || soilMoisture === '') {
        moistureError.textContent = "Soil moisture cannot exceed 100%.";
        isValid = false;
    }

    if (isValid) {
        // ACTUAL FIX: Save the soil moisture to the browser's local storage
        localStorage.setItem('savedMoisture', soilMoisture);
        
        successMsg.textContent = "Registration Successful! Moisture data saved to system.";
        document.getElementById('registrationForm').reset();
    }

    return isValid;
}