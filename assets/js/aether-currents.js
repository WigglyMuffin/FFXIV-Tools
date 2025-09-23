// Aether Currents data will be loaded from assets/data/aether-currents-data.js

// Map display settings
const mapConfig = {
    baseWidth: 600,
    baseHeight: 600,
    gridSize: 30,
    maxWidth: 600
};

// Zone organization by expansion
const expansionGroups = {
    "Heavensward": [
        "Coerthas Western Highlands",
        "The Dravanian Forelands", 
        "The Dravanian Hinterlands",
        "The Churning Mists",
        "The Sea of Clouds"
    ],
    "Stormblood": [
        "The Fringes",
        "The Peaks",
        "The Lochs", 
        "The Ruby Sea",
        "Yanxia",
        "The Azim Steppe"
    ],
    "Shadowbringers": [
        "Lakeland",
        "Kholusia",
        "Amh Araeng",
        "Il Mheg",
        "Rak'tika",
        "Tempest"
    ],
    "Endwalker": [
        "Labyrinthos",
        "Thavnair", 
        "Garlemald",
        "Mare Lamentorum",
        "Elpis",
        "Ultima Thule"
    ],
    "Dawntrail": [
        "Urqopacha",
        "Kozama'uka",
        "Yak T'el",
        "Shaaloani",
        "Heritage Found",
        "Living Memory"
    ]
};

class AetherCurrentsMap {
    constructor() {
        this.selectedMap = null;
        this.canvas = null;
        this.ctx = null;
        this.currentPoints = [];
        this.aetherytePoints = [];
        this.hoveredPoint = null;
        this.backgroundImage = null;
        this.imageLoading = false;
        this.imageLoadError = false;
        this.init();
    }

    init() {
        this.createMapInterface();
        this.setupEventListeners();
    }

    createMapInterface() {
        const container = document.getElementById('aether-currents');
        if (!container) return;

        // Generate organized dropdown options
        let dropdownOptions = '<option value="">Choose a map...</option>';
        
        Object.entries(expansionGroups).forEach(([expansion, zones]) => {
            dropdownOptions += `<optgroup label="${expansion}">`;
            zones.forEach(zoneName => {
                if (typeof aetherData !== 'undefined' && aetherData[zoneName]) {
                    dropdownOptions += `<option value="${zoneName}">${zoneName}</option>`;
                }
            });
            dropdownOptions += '</optgroup>';
        });

        container.innerHTML = `
            <div class="card">
                <h2>Aether Currents & Aetherytes</h2>
                <p>View locations of Aether Currents and Aetherytes across different maps</p>
                
                <div class="form-group">
                    <label for="map-select">Select Map:</label>
                    <div class="custom-select">
                        <select id="map-select">
                            ${dropdownOptions}
                        </select>
                    </div>
                </div>

                <div id="map-display" class="map-display" style="display: none;">
                    <div class="map-container">
                        <canvas id="aether-map"></canvas>
                        <div class="map-legend">
                            <div class="legend-item">
                                <div class="legend-color current-color"></div>
                                <span>Aether Current</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color aetheryte-color"></div>
                                <span>Aetheryte</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="location-lists">
                        <div class="location-column">
                            <h4>Aether Currents</h4>
                            <ul id="currents-list" class="location-list"></ul>
                        </div>
                        <div class="location-column">
                            <h4>Aetherytes</h4>
                            <ul id="aetherytes-list" class="location-list"></ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.canvas = document.getElementById('aether-map');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }

    setupEventListeners() {
        const mapSelect = document.getElementById('map-select');
        if (mapSelect) {
            mapSelect.addEventListener('change', (e) => {
                this.selectedMap = e.target.value;
                if (this.selectedMap) {
                    this.loadBackgroundImage();
                    this.displayMap();
                } else {
                    this.hideMap();
                }
            });
        }
        
        // Add resize listener
        window.addEventListener('resize', () => {
            if (this.selectedMap) {
                this.resizeCanvas();
                this.drawMap();
            }
        });
    }

    setupCanvasEventListeners() {
        if (!this.canvas) return;
        
        // Mouse move handler for hover effects
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Scale coordinates to canvas internal dimensions
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const canvasX = x * scaleX;
            const canvasY = y * scaleY;
            
            // Check if hovering over any point
            let hoveredPoint = null;
            const hoverRadius = 12; // Slightly larger than visual radius for easier hovering
            
            // Check aetheryte points
            this.aetherytePoints.forEach(point => {
                const distance = Math.sqrt(Math.pow(canvasX - point.canvasX, 2) + Math.pow(canvasY - point.canvasY, 2));
                if (distance <= hoverRadius) {
                    hoveredPoint = point;
                }
            });
            
            // Check current points
            this.currentPoints.forEach(point => {
                const distance = Math.sqrt(Math.pow(canvasX - point.canvasX, 2) + Math.pow(canvasY - point.canvasY, 2));
                if (distance <= hoverRadius) {
                    hoveredPoint = point;
                }
            });
            
            // Update hover state and redraw if changed
            if (hoveredPoint !== this.hoveredPoint) {
                this.hoveredPoint = hoveredPoint;
                this.canvas.style.cursor = hoveredPoint ? 'pointer' : 'default';
                this.drawMap();
            }
        });
        
        // Mouse leave handler to clear hover
        this.canvas.addEventListener('mouseleave', () => {
            if (this.hoveredPoint) {
                this.hoveredPoint = null;
                this.canvas.style.cursor = 'default';
                this.drawMap();
            }
        });
    }

    loadBackgroundImage() {
        if (!this.selectedMap || !territoryMapping[this.selectedMap]) {
            this.backgroundImage = null;
            this.imageLoadError = false;
            return;
        }

        this.imageLoading = true;
        this.imageLoadError = false;
        this.backgroundImage = null;

        const territory = territoryMapping[this.selectedMap];
        const imageUrl = `https://v2.xivapi.com/api/asset/map/${territory.territory}/${territory.index}`;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
            this.backgroundImage = img;
            this.imageLoading = false;
            this.imageLoadError = false;
            this.drawMap(); // Redraw with background
        };
        
        img.onerror = () => {
            this.backgroundImage = null;
            this.imageLoading = false;
            this.imageLoadError = true;
            console.warn(`Failed to load background map for ${this.selectedMap}`);
            this.drawMap(); // Redraw without background
        };
        
        img.src = imageUrl;
    }

    resizeCanvas() {
        if (!this.canvas) return;
        
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth; // Account for padding
        
        // Calculate responsive dimensions while maintaining aspect ratio
        const aspectRatio = mapConfig.baseHeight / mapConfig.baseWidth;
        let canvasWidth = Math.min(containerWidth, mapConfig.maxWidth);
        let canvasHeight = canvasWidth * aspectRatio;
        
        // Ensure minimum size
        canvasWidth = Math.max(canvasWidth, 300);
        canvasHeight = Math.max(canvasHeight, 300);
        
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        
        // Update grid size proportionally
        mapConfig.currentGridSize = (canvasWidth / mapConfig.baseWidth) * mapConfig.gridSize;
    }

    displayMap() {
        const mapDisplay = document.getElementById('map-display');
        if (mapDisplay) {
            mapDisplay.style.display = 'block';
            this.resizeCanvas();
            this.setupCanvasEventListeners();
            this.drawMap();
            this.populateLocationLists();
        }
    }

    hideMap() {
        const mapDisplay = document.getElementById('map-display');
        if (mapDisplay) {
            mapDisplay.style.display = 'none';
        }
    }

    drawMap() {
        if (!this.ctx || !this.selectedMap || !this.canvas) return;

        const mapData = aetherData[this.selectedMap];
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        
        // Clear stored points
        this.currentPoints = [];
        this.aetherytePoints = [];
        
        // Clear canvas
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Draw background image if available
        this.drawBackground();
        
        // Draw background grid
        this.drawGrid();
        
        // Draw border
        this.ctx.strokeStyle = '#444';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
        
        // Draw aether currents
        mapData.currents.forEach((current, index) => {
            this.drawPoint(current, 'current', index + 1);
        });
        
        // Draw aetherytes
        mapData.aetherytes.forEach((aetheryte, index) => {
            this.drawPoint(aetheryte, 'aetheryte', index + 1);
        });
        
        // Draw coordinate labels
        this.drawCoordinateLabels();
        
        // Draw hover tooltip if hovering over a point
        if (this.hoveredPoint) {
            this.drawTooltip(this.hoveredPoint);
        }
    }

    drawGrid() {
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        const gridSize = mapConfig.currentGridSize || mapConfig.gridSize;
        
        // Make grid more subtle when background image is present
        if (this.backgroundImage) {
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.lineWidth = 0.3;
        } else {
            this.ctx.strokeStyle = '#333';
            this.ctx.lineWidth = 0.5;
        }
        
        // Vertical lines
        for (let x = 0; x <= canvasWidth; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, canvasHeight);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= canvasHeight; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(canvasWidth, y);
            this.ctx.stroke();
        }
    }

    drawBackground() {
        if (!this.backgroundImage) {
            return;
        }

        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        
        // Save the current context state
        this.ctx.save();
        
        // Set lower opacity for background image
        this.ctx.globalAlpha = 0.6;
        
        // Draw the background image scaled to fit the canvas
        this.ctx.drawImage(
            this.backgroundImage, 
            0, 0, 
            canvasWidth, canvasHeight
        );
        
        // Restore the context state
        this.ctx.restore();
    }

    drawPoint(point, type, number) {
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        
        // Convert game coordinates to canvas coordinates
        // Game coordinates range approximately from -850 to +950 for both X and Y
        const gameMinX = -1024;
        const gameMaxX = 1024;
        const gameMinY = -1024; 
        const gameMaxY = 1024;
        
        const x = ((point.x - gameMinX) / (gameMaxX - gameMinX)) * canvasWidth;
        const y = ((point.y - gameMinY) / (gameMaxY - gameMinY)) * canvasHeight;
        
        // Scale point size based on canvas size
        const pointRadius = Math.max(4, (canvasWidth / mapConfig.baseWidth) * 8);
        
        // Store point data for hover detection
        const pointData = {
            canvasX: x,
            canvasY: y,
            name: point.name,
            type: type,
            number: number,
            coordinates: `(${parseFloat(point.x).toFixed(1)}, ${parseFloat(point.y).toFixed(1)}, ${parseFloat(point.z).toFixed(1)})`
        };
        
        if (type === 'current') {
            this.currentPoints.push(pointData);
        } else {
            this.aetherytePoints.push(pointData);
        }
        
        // Draw point
        this.ctx.beginPath();
        this.ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
        
        if (type === 'current') {
            this.ctx.fillStyle = '#4fc3f7';
            this.ctx.strokeStyle = '#0288d1';
        } else {
            this.ctx.fillStyle = '#9c27b0';
            this.ctx.strokeStyle = '#6a1b9a';
        }
        
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw number with scaled font
        const fontSize = Math.max(10, (canvasWidth / mapConfig.baseWidth) * 12);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = `bold ${fontSize}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(number.toString(), x, y + 4);
    }

    drawTooltip(point) {
        const padding = 8;
        const fontSize = 12;
        const lineHeight = 16;
        
        // Set font for measurement
        this.ctx.font = `${fontSize}px Arial`;
        this.ctx.textAlign = 'left';
        
        // Prepare tooltip text (only name and coordinates)
        const nameText = point.name;
        const coordText = point.coordinates;
        
        // Measure text dimensions
        const nameWidth = this.ctx.measureText(nameText).width;
        const coordWidth = this.ctx.measureText(coordText).width;
        const maxWidth = Math.max(nameWidth, coordWidth);
        
        const tooltipWidth = maxWidth + (padding * 2);
        const tooltipHeight = (lineHeight * 2) + (padding * 2);
        
        // Position tooltip (avoid going off canvas)
        let tooltipX = point.canvasX + 15;
        let tooltipY = point.canvasY - tooltipHeight - 10;
        
        if (tooltipX + tooltipWidth > this.canvas.width) {
            tooltipX = point.canvasX - tooltipWidth - 15;
        }
        if (tooltipY < 0) {
            tooltipY = point.canvasY + 25;
        }
        
        // Draw tooltip background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        this.ctx.strokeStyle = point.type === 'current' ? '#4fc3f7' : '#9c27b0';
        this.ctx.lineWidth = 2;
        
        this.ctx.fillRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);
        this.ctx.strokeRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);
        
        // Draw tooltip text
        this.ctx.fillStyle = '#fff';
        this.ctx.font = `bold ${fontSize}px Arial`;
        this.ctx.fillText(nameText, tooltipX + padding, tooltipY + padding + fontSize);
        
        this.ctx.fillStyle = '#aaa';
        this.ctx.font = `${fontSize - 1}px Arial`;
        this.ctx.fillText(coordText, tooltipX + padding, tooltipY + padding + fontSize + lineHeight);
    }

    drawCoordinateLabels() {
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        const fontSize = Math.max(8, (canvasWidth / mapConfig.baseWidth) * 10);
        
        // Game coordinate ranges
        const gameMinX = -1024;
        const gameMaxX = 1024;
        const gameMinY = -1024; 
        const gameMaxY = 1024;

        this.ctx.fillStyle = '#aaa';
        this.ctx.font = `${fontSize}px Arial`;
        this.ctx.textAlign = 'center';
        
        // X-axis labels (bottom) - show game coordinates
        for (let i = 0; i <= 10; i++) {
            const x = (i / 10) * canvasWidth;
            const gameCoord = Math.round(gameMinX + (i / 10) * (gameMaxX - gameMinX));
            this.ctx.fillText(gameCoord.toString(), x, canvasHeight - 5);
        }
        
        // Y-axis labels (left) - show game coordinates  
        this.ctx.textAlign = 'left';
        for (let i = 0; i <= 10; i++) {
            const y = (i / 10) * canvasHeight;
            const gameCoord = Math.round(gameMinY + (i / 10) * (gameMaxY - gameMinY));
            this.ctx.fillText(gameCoord.toString(), 5, y + 3);
        }
    }

    populateLocationLists() {
        const mapData = aetherData[this.selectedMap];
        
        // Populate currents list
        const currentsList = document.getElementById('currents-list');
        if (currentsList) {
            currentsList.innerHTML = mapData.currents.map((current, index) => 
                `<li>
                    <div class="location-info">
                        <span class="location-number">${index + 1}.</span>
                        ${current.name}
                    </div>
                    <span class="coordinates">(${parseFloat(current.x).toFixed(1)}, ${parseFloat(current.y).toFixed(1)}, ${parseFloat(current.z).toFixed(1)})</span>
                </li>`
            ).join('');
        }
        
        // Populate aetherytes list
        const aetherytesList = document.getElementById('aetherytes-list');
        if (aetherytesList) {
            if (mapData.aetherytes && mapData.aetherytes.length > 0) {
                aetherytesList.innerHTML = mapData.aetherytes.map((aetheryte, index) => 
                    `<li>
                        <div class="location-info">
                            <span class="location-number">${index + 1}.</span>
                            ${aetheryte.name}
                        </div>
                        <span class="coordinates">(${parseFloat(aetheryte.x).toFixed(1)}, ${parseFloat(aetheryte.y).toFixed(1)}, ${parseFloat(aetheryte.z).toFixed(1)})</span>
                    </li>`
                ).join('');
            } else {
                aetherytesList.innerHTML = '<li style="color: #888; font-style: italic;">No aetheryte data available for this zone</li>';
            }
        }
    }
}

// Initialize when DOM is loaded and aether data is available
document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize the aether currents map
    function initializeAetherMap() {
        if (typeof aetherData !== 'undefined' && document.getElementById('aether-currents')) {
            new AetherCurrentsMap();
        } else if (document.getElementById('aether-currents')) {
            // If aetherData is not loaded yet, wait and try again
            setTimeout(initializeAetherMap, 50);
        }
    }
    
    // Try to initialize immediately, or wait for script to load
    setTimeout(initializeAetherMap, 10);
});