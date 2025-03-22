document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', calculateItemsNeeded);
});

// Function to handle number input increment/decrement
function changeValue(inputId, change) {
    const input = document.getElementById(inputId);
    let value = parseInt(input.value) || 0;
    value += change;
    
    // Respect min/max attributes
    const min = parseInt(input.getAttribute('min'));
    const max = parseInt(input.getAttribute('max'));
    
    if (min !== null && !isNaN(min) && value < min) {
        value = min;
    } else if (max !== null && !isNaN(max) && value > max) {
        value = max;
    }
    
    input.value = value;
}

function calculateItemsNeeded() {
    // Get input values
    const ilvl = parseInt(document.getElementById('item-level').value);
    const isHq = document.getElementById('is-hq').checked;
    const fcRank = parseInt(document.getElementById('current-fc-rank').value);
    let currentCredits = parseInt(document.getElementById('current-credits').value);
    
    // Validate inputs
    if (isNaN(ilvl) || ilvl <= 0) {
        alert("Please enter a valid item level.");
        return;
    }
    
    if (isNaN(currentCredits) || currentCredits < 0) {
        currentCredits = 0;
    }
    
    // Define the credit amounts required for each rank
    const fcRankCredits = {
        1: 0,
        2: 3700,
        3: 15300,
        4: 33300,
        5: 59300,
        6: 89300
    };
    
    // If the FC credits are less than the current rank credits, 
    // use the required credits amount for that rank
    if (currentCredits < fcRankCredits[fcRank]) {
        currentCredits = fcRankCredits[fcRank];
    }
    
    // Calculate how many credits are needed to reach rank 6
    const creditsNeeded = fcRankCredits[6] - currentCredits;
    
    // Calculate the credit amount for the given ilvl and item quality
    const creditAmount = isHq ? ilvl * 3 : ilvl * 1.5;
    
    // Calculate the number of items needed
    const itemsNeeded = Math.ceil(creditsNeeded / creditAmount);
    
    // Display the result
    document.getElementById('items-needed').textContent = itemsNeeded;
    document.getElementById('result').classList.remove('hidden');
}