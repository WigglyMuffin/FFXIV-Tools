document.addEventListener('DOMContentLoaded', function() {
    // Event listeners for automatic calculation
    const inputs = [
        'item-level',
        'is-hq',
        'current-fc-rank',
        'current-credits',
        'num-fcs'
    ];
    
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.type === 'checkbox') {
                element.addEventListener('change', calculateItemsNeeded);
            } else {
                element.addEventListener('input', calculateItemsNeeded);
            }
        }
    });
    
    // Calculate on page load with default values
    calculateItemsNeeded();
});

// Function to handle number input increment/decrement
function changeValue(inputId, change) {
    const input = document.getElementById(inputId);
    let value = parseInt(input.value) || 0;
    value += change;
    
    const min = parseInt(input.getAttribute('min'));
    const max = parseInt(input.getAttribute('max'));
    
    if (min !== null && !isNaN(min) && value < min) {
        value = min;
    } else if (max !== null && !isNaN(max) && value > max) {
        value = max;
    }
    
    input.value = value;
    
    // Trigger automatic calculation
    calculateItemsNeeded();
}

function toggleBreakdown() {
    const breakdown = document.getElementById('ilvl-breakdown');
    const toggleText = document.getElementById('breakdown-toggle-text');
    const toggleIcon = document.getElementById('breakdown-toggle-icon');
    
    if (breakdown.classList.contains('hidden')) {
        breakdown.classList.remove('hidden');
        toggleText.textContent = 'Hide Comparison';
        toggleIcon.textContent = '▲';
    } else {
        breakdown.classList.add('hidden');
        toggleText.textContent = 'Compare Item Levels';
        toggleIcon.textContent = '▼';
    }
}

function calculateItemsNeeded() {
    // Get input values
    const ilvl = parseInt(document.getElementById('item-level').value);
    const isHq = document.getElementById('is-hq').checked;
    const fcRank = parseInt(document.getElementById('current-fc-rank').value);
    let currentCredits = parseInt(document.getElementById('current-credits').value);
    const numFcs = parseInt(document.getElementById('num-fcs').value);
    
    // Validate inputs
    if (isNaN(ilvl) || ilvl <= 0) {
        document.getElementById('items-needed').textContent = '--';
        return;
    }
    
    if (isNaN(numFcs) || numFcs <= 0) {
        document.getElementById('items-needed').textContent = '--';
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
    
    // Calculate how many credits are needed to reach rank 6 for one FC
    const creditsNeededPerFC = fcRankCredits[6] - currentCredits;
    
    // Calculate the credit amount for the given ilvl and item quality
    const creditAmount = isHq ? ilvl * 3 : ilvl * 1.5;
    
    const itemsPerFC = Math.ceil(creditsNeededPerFC / creditAmount);

    const totalItemsNeeded = itemsPerFC * numFcs;
    
    // Display the main result
    document.getElementById('items-needed').textContent = totalItemsNeeded.toLocaleString();
    
    // Always show calculation details
    const calculationBreakdown = document.getElementById('calculation-breakdown');
    const totalCreditsNeeded = creditsNeededPerFC * numFcs;
    
    // Generate breakdown items based on number of FCs
    let breakdownHTML = `
        <div class="breakdown-item">
            <span class="breakdown-label">Item Level & Quality</span>
            <span class="breakdown-value">i${ilvl} ${isHq ? 'HQ' : 'NQ'}</span>
        </div>
        <div class="breakdown-item">
            <span class="breakdown-label">Credits per Item</span>
            <span class="breakdown-value">${creditAmount.toLocaleString()}</span>
        </div>
    `;
    
    if (numFcs > 1) {
        breakdownHTML += `
            <div class="breakdown-item">
                <span class="breakdown-label">Items per FC</span>
                <span class="breakdown-value">${itemsPerFC}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Number of FCs</span>
                <span class="breakdown-value">${numFcs}</span>
            </div>
        `;
    }
    
    breakdownHTML += `
        <div class="breakdown-item">
            <span class="breakdown-label">Credits Needed</span>
            <span class="breakdown-value">${creditsNeededPerFC === totalCreditsNeeded ? creditsNeededPerFC.toLocaleString() : totalCreditsNeeded.toLocaleString()}</span>
        </div>
    `;
    
    calculationBreakdown.innerHTML = breakdownHTML;
    
    // Generate item level comparison
    generateIlvlBreakdown(creditsNeededPerFC, numFcs, isHq);
}

function generateIlvlBreakdown(creditsNeededPerFC, numFcs, isHq) {
    const comparisonContainer = document.getElementById('ilvl-comparison');
    const columnHeader = document.getElementById('items-column-header');
    
    // Item level data
    const itemLevels = [
        { ilvl: 450, name: 'Facet' },
        { ilvl: 480, name: 'Neo-Ishgardian' },
        { ilvl: 510, name: 'Exarchic' },
        { ilvl: 580, name: 'Classical' },
        { ilvl: 610, name: 'Rinascita' },
        { ilvl: 640, name: 'Diadochos' },
        { ilvl: 710, name: 'Archeo Kingdom' },
        { ilvl: 740, name: 'Ceremonial' }
    ];
    
    // Update column header
    columnHeader.textContent = `${isHq ? 'HQ' : 'NQ'} Items Needed`;
    
    // Generate table rows
    const rows = itemLevels.map(({ ilvl, name }) => {
        const creditValue = ilvl * (isHq ? 3 : 1.5);
        const itemsPerFC = Math.ceil(creditsNeededPerFC / creditValue);
        const totalItems = itemsPerFC * numFcs;
        
        return `
            <tr>
                <td>
                    <span class="ilvl-badge">i${ilvl}</span>
                    <span class="gear-name">${name}</span>
                </td>
                <td class="items-needed">${totalItems.toLocaleString()}</td>
            </tr>
        `;
    }).join('');
    
    comparisonContainer.innerHTML = rows;
}