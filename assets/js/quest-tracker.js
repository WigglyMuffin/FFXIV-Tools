// Quest Tracker for Questionable
// Uses XIVAPI v2 to get comprehensive quest data

class QuestTracker {
    constructor() {
        this.questData = {};
        this.allQuests = [];
        this.xivapiService = new XIVAPIService();
        this.expansions = [
            { key: '2.x', name: '2.x - A Realm Reborn' },
            { key: '3.x', name: '3.x - Heavensward' },
            { key: '4.x', name: '4.x - Stormblood' },
            { key: '5.x', name: '5.x - Shadowbringers' },
            { key: '6.x', name: '6.x - Endwalker' },
            { key: '7.x', name: '7.x - Dawntrail' }
        ];
        this.initialized = false;
        this.lastUpdated = null;
        this.dataSource = 'Unknown';
        this.totalQuestCount = 0;
        this.expansionStates = {};
    }

    async init() {
        if (this.initialized) return;
        
        console.log('=== QUEST TRACKER INITIALIZATION ===');
        this.showLoading(true, 'Initializing quest tracker...');
        this.hideError();
        
        try {
            console.log('Loading quest data...');
            await this.loadQuestData();
            
            console.log('Rendering expansion filters...');
            this.renderExpansionFilters();
            
            console.log('Rendering quest data...');
            this.renderQuestData();

            console.log('Applying filters...');
            this.applyFilters();
            
            console.log('Setting up event listeners...');
            this.setupEventListeners();
            
            console.log('Resetting filters to default values...');
            this.resetFilters();
            
            console.log('Showing summary...');
            this.showSummary(true);
            this.showLastUpdated();
            
            this.initialized = true;
            console.log('Quest tracker initialization complete!');
            
        } catch (error) {
            console.error('Failed to initialize quest tracker:', error);
            this.showError(`Failed to load quest data: ${error.message}`);
        } finally {
            this.showLoading(false);
        }
    }

    async loadQuestData() {
        // Always try to load from XIVAPI for comparison to get complete quest database
        try {
            await this.loadFromXIVAPI();
        } catch (error) {
            console.warn('Failed to load from XIVAPI, showing local data only:', error);
            this.showProgress('XIVAPI unavailable, showing local quest paths only...');
            await this.loadLocalDataOnly();
        }
    }

    async loadFromXIVAPI() {
        this.showProgress('Connecting to XIVAPI v2...');
        
        const progressCallback = (progress) => {
            this.showProgress(`Loading complete quest database: Batch ${progress.batch}, ${progress.totalQuests} quests found...`);
        };
        
        // Get complete quest database from XIVAPI
        const allXIVAPIQuests = await this.xivapiService.getAllQuests(progressCallback);
        
        this.showProgress('Loading your available quest paths...');
        
        // Load local quest data to get the proper expansion organization
        const localQuestData = await this.loadLocalQuestData();
        
        this.showProgress('Comparing quest databases using local expansion organization...');
        
        // Use local expansion organization instead of XIVAPI mapping
        const comparisonData = this.compareWithLocalOrganization(allXIVAPIQuests, localQuestData);
        
        this.lastUpdated = new Date().toISOString();
        this.dataSource = 'XIVAPI v2 + Local Paths';
        this.totalQuestCount = allXIVAPIQuests.length;
        
        // Reset quest data
        this.questData = {};
        this.allQuests = [];
        
        // Process each expansion using the comparison data
        for (const expansion of this.expansions) {
            const expansionData = comparisonData[expansion.key];
            
            console.log(`Processing expansion ${expansion.key}:`, expansionData ? `${expansionData.available.length} available, ${expansionData.missing.length} missing` : 'No data');
            
            if (!expansionData) {
                this.questData[expansion.key] = { available: [], missing: [] };
                continue;
            }
            
            this.questData[expansion.key] = {
                available: expansionData.available,
                missing: expansionData.missing
            };
            
            // Debug: Check for quest type preservation
            const available = expansionData.available;
            const uQuests = available.filter(q => q.isUnlockQuest).length;
            const sQuests = available.filter(q => q.isCustomDelivery).length;
            const aQuests = available.filter(q => q.isAchievementQuest).length;
            const cQuests = available.filter(q => q.isCraftingQuest).length;
            const nQuests = available.filter(q => q.isNpcQuest).length;
            const regular = available.length - uQuests - sQuests - aQuests - cQuests - nQuests;
            console.log(`  Available types: Regular: ${regular}, U: ${uQuests}, S: ${sQuests}, A: ${aQuests}, C: ${cQuests}, N: ${nQuests}`);
            
            this.allQuests.push(...expansionData.available, ...expansionData.missing);
        }
        
        this.showProgress(`Analysis complete: ${this.getTotalAvailable()} paths available, ${this.getTotalMissing()} missing`);
    }

    async loadLocalQuestData() {
        try {
            const response = await fetch('assets/data/quest-data.json');
            if (!response.ok) {
                throw new Error(`Failed to load local quest data: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('=== LOCAL QUEST DATA LOADED FOR COMPARISON ===');
            
            // Process and filter the local quest data
            const processedData = {};
            Object.keys(data.expansions).forEach(expKey => {
                const expansion = data.expansions[expKey];
                if (expansion.available) {
                    // Include all quests (including U, S, and A) - filtering will be done in display
                    const allQuests = expansion.available
                        .map(questName => {
                            // Extract the path ID from the quest name (e.g., "5411_A Manager's Discernment" -> 5411)
                            const pathIdMatch = questName.match(/^(\d+)_/);
                            const pathId = pathIdMatch ? parseInt(pathIdMatch[1]) : null;
                            const cleanName = questName.replace(/^\d+_/, '');
                            
                            return {
                                originalName: questName,
                                cleanName: cleanName,
                                pathId: pathId,
                                expansion: expKey,
                                expansionName: expansion.name,
                                isUnlockQuest: questName.startsWith('U'),
                                isCustomDelivery: questName.startsWith('S'),
                                isAchievementQuest: questName.startsWith('A'),
                                isCraftingQuest: questName.startsWith('C'),
                                isNpcQuest: questName.startsWith('N')
                            };
                        });
                    
                    processedData[expKey] = {
                        name: expansion.name,
                        quests: allQuests
                    };
                    
                    console.log(`${expKey}: ${allQuests.length} total quests (including U, S, A, C, and N quests)`);
                    const regularQuests = allQuests.filter(q => !q.isUnlockQuest && !q.isCustomDelivery && !q.isAchievementQuest && !q.isCraftingQuest && !q.isNpcQuest).length;
                    const unlockQuests = allQuests.filter(q => q.isUnlockQuest).length;
                    const customDeliveryQuests = allQuests.filter(q => q.isCustomDelivery).length;
                    const achievementQuests = allQuests.filter(q => q.isAchievementQuest).length;
                    const craftingQuests = allQuests.filter(q => q.isCraftingQuest).length;
                    const npcQuests = allQuests.filter(q => q.isNpcQuest).length;
                    console.log(`  - Regular: ${regularQuests}, Unlock (U): ${unlockQuests}, Custom Delivery (S): ${customDeliveryQuests}, Allied Society (A): ${achievementQuests}, Aether Current (C): ${craftingQuests}, Aethernet (N): ${npcQuests}`);
                }
            });
            
            return processedData;
        } catch (error) {
            console.error('Error loading local quest data:', error);
            return {};
        }
    }

    compareWithLocalOrganization(allXIVAPIQuests, localQuestData) {
        const comparisonData = {};
        
        console.log(`\n=== COMPARING WITH LOCAL ORGANIZATION ===`);
        console.log(`XIVAPI quests: ${allXIVAPIQuests.length}`);
        console.log(`Local expansions: ${Object.keys(localQuestData).length}`);
        
        // Create a map of all XIVAPI quest names for quick lookup
        const xivapiQuestMap = new Map();
        const xivapiQuestSet = new Set();
        
        allXIVAPIQuests.forEach(quest => {
            // Clean the XIVAPI quest name to match local format
            const cleanedName = this.cleanXIVAPIQuestName(quest.name);
            xivapiQuestMap.set(cleanedName, quest);
            xivapiQuestSet.add(cleanedName);
            
            // Also add variations for better matching
            const variations = [
                cleanedName.replace(/'/g, '\''),
                cleanedName.replace(/'/g, '\''),
                cleanedName.replace(/['']/g, '\''),
                cleanedName.replace(/[""]/g, '"'),
                cleanedName.replace(/…/g, '...'),
                cleanedName.trim()
            ];
            
            variations.forEach(variation => {
                if (variation !== cleanedName) {
                    xivapiQuestMap.set(variation, quest);
                }
            });
        });
        
        // Create a set of all local quest names (cleaned) to find missing ones
        const allLocalQuestNames = new Set();
        Object.values(localQuestData).forEach(expansion => {
            expansion.quests.forEach(quest => {
                allLocalQuestNames.add(quest.cleanName);
            });
        });
        
        console.log(`Total unique local quest names: ${allLocalQuestNames.size}`);
        
        // Debug: Count different quest types in local data
        let localRegular = 0, localU = 0, localS = 0, localA = 0, localC = 0, localN = 0;
        Object.values(localQuestData).forEach(expansion => {
            expansion.quests.forEach(quest => {
                if (quest.isUnlockQuest) localU++;
                else if (quest.isCustomDelivery) localS++;
                else if (quest.isAchievementQuest) localA++;
                else if (quest.isCraftingQuest) localC++;
                else if (quest.isNpcQuest) localN++;
                else localRegular++;
            });
        });
        console.log(`LOCAL QUEST TYPES: Regular: ${localRegular}, U: ${localU}, S: ${localS}, A: ${localA}, C: ${localC}, N: ${localN}`);
        console.log(`LOCAL TOTAL: ${localRegular + localU + localS + localA + localC + localN}`);
        
        // Process each expansion using local organization
        Object.keys(localQuestData).forEach(expKey => {
            const localExpansion = localQuestData[expKey];
            const available = [];
            const missing = [];
            
            console.log(`\n--- Processing ${expKey} ---`);
            console.log(`Local quests: ${localExpansion.quests.length}`);
            
            // Check each local quest against XIVAPI
            localExpansion.quests.forEach(localQuest => {
                const xivapiQuest = xivapiQuestMap.get(localQuest.cleanName);
                
                if (xivapiQuest) {
                    const cleanedXIVAPIName = this.cleanXIVAPIQuestName(xivapiQuest.name);
                    const questData = {
                        name: cleanedXIVAPIName,
                        originalName: xivapiQuest.name, // Keep original for reference
                        id: localQuest.originalName,
                        pathId: localQuest.pathId, // Add path ID for debugging
                        xivapiId: xivapiQuest.id, // Add XIVAPI ID for comparison
                        genre: xivapiQuest.genre,
                        category: xivapiQuest.category,
                        expansion: expKey,
                        expansionName: localExpansion.name,
                        status: 'available',
                        isUnlockQuest: localQuest.isUnlockQuest,
                        isCustomDelivery: localQuest.isCustomDelivery,
                        isAchievementQuest: localQuest.isAchievementQuest,
                        isCraftingQuest: localQuest.isCraftingQuest,
                        isNpcQuest: localQuest.isNpcQuest,
                        isUnobtainable: this.isQuestUnobtainable(xivapiQuest)
                    };
                    
                    available.push(questData);
                } else {
                    // Quest exists in local but not in XIVAPI (possibly local-only or renamed)
                    available.push({
                        name: localQuest.cleanName,
                        id: localQuest.originalName,
                        pathId: localQuest.pathId,
                        xivapiId: null,
                        genre: 'Local Path',
                        category: 'Local Path',
                        expansion: expKey,
                        expansionName: localExpansion.name,
                        status: 'available',
                        isUnlockQuest: localQuest.isUnlockQuest,
                        isCustomDelivery: localQuest.isCustomDelivery,
                        isAchievementQuest: localQuest.isAchievementQuest,
                        isCraftingQuest: localQuest.isCraftingQuest,
                        isNpcQuest: localQuest.isNpcQuest,
                        isUnobtainable: false // Local paths are assumed obtainable
                    });
                }
            });
            
            console.log(`${expKey}: ${available.length} available`);
            
            comparisonData[expKey] = {
                available,
                missing: [], // We'll add missing quests in a second pass
                total: available.length,
                coverage: 100  // Will be updated after we find missing quests
            };
        });
        
        // Second pass: Find XIVAPI quests that don't have local paths
        // and try to assign them to expansions based on quest names/patterns
        const unassignedQuests = [];
        
        allXIVAPIQuests.forEach(xivapiQuest => {
            const cleanedXIVAPIName = this.cleanXIVAPIQuestName(xivapiQuest.name);
            if (!allLocalQuestNames.has(cleanedXIVAPIName)) {
                // This quest doesn't have a local path
                // Use the XIVAPI expansion data directly
                let assignedExpansion = this.mapXIVAPIExpansionToKey(xivapiQuest.expansion);
                
                // Final fallback to 2.x if XIVAPI expansion is unknown
                if (!assignedExpansion) {
                    assignedExpansion = '2.x';
                    console.log(`Defaulting to 2.x for quest with unknown expansion: "${cleanedXIVAPIName}" (XIVAPI: ${xivapiQuest.expansion})`);
                }
                
                console.log(`Quest not in local paths: "${cleanedXIVAPIName}" → XIVAPI: ${xivapiQuest.expansion} → Assigned: ${assignedExpansion}`);
                
                if (assignedExpansion && comparisonData[assignedExpansion]) {
                    // Convert XIVAPI ID to quest path format
                    const questPathId = this.convertXIVAPIIdToQuestPath(xivapiQuest.id, cleanedXIVAPIName);
                    
                    comparisonData[assignedExpansion].missing.push({
                        name: cleanedXIVAPIName,
                        originalName: xivapiQuest.name,
                        id: questPathId, // Use converted quest path format instead of raw XIVAPI ID
                        genre: xivapiQuest.genre,
                        category: xivapiQuest.category,
                        expansion: assignedExpansion,
                        expansionName: comparisonData[assignedExpansion].available[0]?.expansionName || assignedExpansion,
                        status: 'missing',
                        isUnobtainable: this.isQuestUnobtainable(xivapiQuest)
                    });
                } else {
                    unassignedQuests.push(xivapiQuest);
                }
            }
        });
        
        // Assign unassigned quests using XIVAPI expansion data first, then name-based detection, fallback to 2.x
        if (unassignedQuests.length > 0) {
            console.log(`Processing ${unassignedQuests.length} unassigned quests...`);
            unassignedQuests.forEach(xivapiQuest => {
                const cleanedXIVAPIName = this.cleanXIVAPIQuestName(xivapiQuest.name);
                
                // Use XIVAPI expansion data directly
                let assignedExpansion = this.mapXIVAPIExpansionToKey(xivapiQuest.expansion);
                
                // Final fallback to 2.x if XIVAPI expansion is unknown
                if (!assignedExpansion || !comparisonData[assignedExpansion]) {
                    assignedExpansion = '2.x';
                    console.log(`Defaulting to 2.x for unassigned quest: "${cleanedXIVAPIName}" (XIVAPI: ${xivapiQuest.expansion})`);
                }
                
                // Convert XIVAPI ID to quest path format
                const questPathId = this.convertXIVAPIIdToQuestPath(xivapiQuest.id, cleanedXIVAPIName);
                
                comparisonData[assignedExpansion].missing.push({
                    name: cleanedXIVAPIName,
                    originalName: xivapiQuest.name,
                    id: questPathId, // Use converted quest path format instead of raw XIVAPI ID
                    genre: xivapiQuest.genre,
                    category: xivapiQuest.category,
                    expansion: assignedExpansion,
                    expansionName: comparisonData[assignedExpansion].available[0]?.expansionName || assignedExpansion,
                    status: 'missing',
                    isUnobtainable: this.isQuestUnobtainable(xivapiQuest)
                });
            });
        }
        
        // Update totals and coverage
        Object.keys(comparisonData).forEach(expKey => {
            const data = comparisonData[expKey];
            data.total = data.available.length + data.missing.length;
            data.coverage = data.total > 0 ? (data.available.length / data.total * 100) : 100;
        });
        
        console.log(`Originally unassigned quests: ${unassignedQuests.length} (now assigned to 2.x)`);
        
        // Debug: Show the difference between XIVAPI total and processed total
        const processedTotal = Object.values(comparisonData).reduce((sum, exp) => sum + exp.total, 0);
        console.log(`\nQUEST COUNT ANALYSIS:`);
        console.log(`XIVAPI total quests: ${allXIVAPIQuests.length}`);
        console.log(`Processed total quests: ${processedTotal}`);
        console.log(`All quests now assigned to expansions: ${processedTotal === allXIVAPIQuests.length ? 'YES' : 'NO'}`);
        console.log(`Difference: ${allXIVAPIQuests.length - processedTotal}`);
        
        if (processedTotal !== allXIVAPIQuests.length) {
            console.warn(`Quest count mismatch! Some quests may not be properly assigned.`);
        }
        
        console.log(`=== COMPARISON COMPLETE ===`);
        return comparisonData;
    }

    // Map XIVAPI expansion names to our internal expansion keys
    mapXIVAPIExpansionToKey(xivapiExpansionName) {
        const expansionMapping = {
            'A Realm Reborn': '2.x',
            'Heavensward': '3.x',
            'Stormblood': '4.x',
            'Shadowbringers': '5.x',
            'Endwalker': '6.x',
            'Dawntrail': '7.x'
        };

        return expansionMapping[xivapiExpansionName] || null; // Return null for unknown expansions (don't default to 2.x here)
    }

    // Convert XIVAPI quest ID to quest path format
    // Example: "KinGwz204_05414" -> "5414_A Manager's Delegation"
    // Example: "FesXmx101_05231" -> "5231_星芒祭と心躍る一杯" (preserves Unicode characters)
    convertXIVAPIIdToQuestPath(xivapiId, questName) {
        if (!xivapiId || !questName) {
            return xivapiId || questName;
        }

        // Extract the numeric part from the end of the XIVAPI ID
        // Pattern: anything ending with underscore followed by digits
        const idMatch = xivapiId.match(/_(\d+)$/);
        
        if (idMatch) {
            // Remove leading zeros from the extracted ID
            const numericId = parseInt(idMatch[1], 10).toString();
            
            // Create quest path format: "{id}_{questName}"
            // Preserves international characters (Japanese, Chinese, Korean, etc.)
            const questPath = `${numericId}_${questName}`;
            
            console.log(`Converted XIVAPI ID: "${xivapiId}" -> Quest Path: "${questPath}"`);
            return questPath;
        }
        
        // If no numeric pattern found, return the original ID
        console.warn(`Could not extract numeric ID from: "${xivapiId}"`);
        return xivapiId;
    }

    // Determine if a quest is unobtainable (no longer available in-game)
    isQuestUnobtainable(quest) {
        if (!quest) return false;
        
        const name = (quest.name || '').toLowerCase();
        const genre = (quest.genre || '').toLowerCase();
        const category = (quest.category || '').toLowerCase();
        const id = (quest.id || '').toLowerCase();
        
        // Seasonal/Event quests that are typically time-limited
        // Made more specific to avoid false positives
        const seasonalKeywords = [
            'starlight celebration', 'little ladies\' day', 'hatching-tide', 'heavensturn', 
            'valentione\'s day', 'white day', 'april fools', 'summer festival',
            'moonfire faire', 'the rising', 'all saints\' wake', 'starlight', 
            'seasonal event', 'limited time event', 'holiday event'
        ];
        
        // Legacy content identifiers
        const legacyKeywords = [
            'legacy', '1.0', 'deprecated', 'removed', 'discontinued'
        ];
        
        // Check for seasonal/event content
        const isSeasonalEvent = seasonalKeywords.some(keyword => 
            genre.includes(keyword) || category.includes(keyword)
        ) || (
            // Only check quest name for very specific seasonal terms
            name.includes('starlight celebration') || 
            name.includes('moonfire faire') || 
            name.includes('hatching-tide') ||
            name.includes('heavensturn') ||
            name.includes('little ladies\' day') ||
            name.includes('valentione\'s day') ||
            name.includes('all saints\' wake')
        );
        
        // Check for legacy content - focus on genre/category and specific ID patterns
        const isLegacyContent = legacyKeywords.some(keyword => 
            genre.includes(keyword) || category.includes(keyword)
        ) || (
            // Check for specific legacy patterns in quest IDs
            id.includes('legacy') || id.includes('1.0') || id.includes('deprecated')
        );
        
        // Check for specific genres/categories that indicate unobtainable content
        const unobtainableGenres = ['seasonal event quest', 'deprecated', 'legacy'];
        const unobtainableCategories = ['seasonal events', 'legacy content', 'removed content'];
        
        const hasUnobtainableGenre = unobtainableGenres.some(unobtainableGenre => 
            genre.includes(unobtainableGenre)
        );
        
        const hasUnobtainableCategory = unobtainableCategories.some(unobtainableCategory => 
            category.includes(unobtainableCategory)
        );
        
        // Whitelist of genres/categories that should always be considered obtainable
        const obtainableGenres = [
            'main scenario quest', 'job quest', 'feature quest', 'side story quest',
            'levequest', 'grand company quest', 'beast tribe quest', 'tribal quest'
        ];
        const obtainableCategories = [
            'dungeons & trials', 'chronicles of a new era', 'the hunt', 'deep dungeon',
            'pvp', 'gold saucer', 'housing', 'crafting & gathering'
        ];
        
        const hasObtainableGenre = obtainableGenres.some(obtainableGenre => 
            genre.includes(obtainableGenre)
        );
        
        const hasObtainableCategory = obtainableCategories.some(obtainableCategory => 
            category.includes(obtainableCategory)
        );
        
        // If quest has obtainable genre/category, don't mark as unobtainable even if other criteria match
        if (hasObtainableGenre || hasObtainableCategory) {
            return false;
        }
        
        const result = isSeasonalEvent || isLegacyContent || hasUnobtainableGenre || hasUnobtainableCategory;
        
        return result;
    }

    // Clean XIVAPI quest names by keeping only alphanumeric characters and common punctuation
    cleanXIVAPIQuestName(questName) {
        if (!questName) return '';
        
        let cleaned = questName;
        
        // Remove common game symbols/icons while preserving Unicode text characters
        // This regex removes control characters and common game symbols but keeps:
        // - All Unicode letters and numbers (\p{L}\p{N})
        // - Basic punctuation and spaces
        // - Japanese, Chinese, Korean, and other international characters
        cleaned = cleaned.replace(/[\u0000-\u001F\u007F-\u009F\uE000-\uF8FF\uFFF0-\uFFFF]/g, '');
        
        // Clean up multiple spaces and normalize whitespace
        cleaned = cleaned.replace(/\s+/g, ' ').trim();
        
        return cleaned;
    }

    async loadLocalDataOnly() {
        try {
            const response = await fetch('assets/data/quest-data.json');
            
            if (!response.ok) {
                throw new Error(`Failed to load quest data: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            this.lastUpdated = data.lastUpdated;
            this.dataSource = 'Local quest paths only';
            
            console.log('=== LOCAL DATA ONLY MODE ===');
            console.log('Available expansions:', Object.keys(data.expansions));
            
            // Reset quest data
            this.questData = {};
            this.allQuests = [];
            let totalPaths = 0;
            
            // Process each expansion
            for (const expansion of this.expansions) {
                console.log(`\n--- Processing expansion: ${expansion.key} (${expansion.name}) ---`);
                const expansionData = data.expansions[expansion.key];
                
                if (!expansionData) {
                    console.log(`No data for expansion: ${expansion.key}`);
                    this.questData[expansion.key] = { available: [], missing: [] };
                    continue;
                }
                
                if (!expansionData.available || !Array.isArray(expansionData.available)) {
                    console.log(`No available quests array for expansion: ${expansion.key}`);
                    this.questData[expansion.key] = { available: [], missing: [] };
                    continue;
                }
                
                console.log(`Found ${expansionData.available.length} quest paths for ${expansion.key}`);
                
                // Include all quest types (including U, S, A, C, and N) - filtering will be done in display
                const availableQuests = expansionData.available
                    .map(questName => {
                        const cleanName = questName.replace(/^\d+_/, '');
                        return {
                            name: cleanName,
                            id: questName,
                            expansion: expansion.key,
                            expansionName: expansion.name,
                            status: 'available',
                            isUnlockQuest: questName.startsWith('U'),
                            isCustomDelivery: questName.startsWith('S'),
                            isAchievementQuest: questName.startsWith('A'),
                            isCraftingQuest: questName.startsWith('C'),
                            isNpcQuest: questName.startsWith('N')
                        };
                    });
                
                totalPaths += availableQuests.length;
                console.log(`Processed ${availableQuests.length} quests for ${expansion.key}`);
                console.log(`Running total: ${totalPaths} quests`);
                
                // Store the data for this expansion
                this.questData[expansion.key] = {
                    available: availableQuests,
                    missing: [] // Can't determine missing without XIVAPI
                };
                
                // Add to the global quest array
                this.allQuests.push(...availableQuests);
                
                console.log(`Quest data for ${expansion.key}:`, {
                    available: this.questData[expansion.key].available.length,
                    missing: this.questData[expansion.key].missing.length
                });
            }
            
            console.log(`=== LOCAL DATA ONLY COMPLETE ===`);
            console.log(`Total quest paths loaded: ${totalPaths}`);
            console.log(`All quests array length: ${this.allQuests.length}`);
            console.log(`Expansions processed: ${Object.keys(this.questData).length}`);
            
            // Debug: Show final questData structure
            console.log('\nFinal questData structure:');
            Object.keys(this.questData).forEach(expKey => {
                const expData = this.questData[expKey];
                console.log(`${expKey}: ${expData.available?.length || 0} available, ${expData.missing?.length || 0} missing`);
            });
            
            this.totalQuestCount = `${totalPaths} paths`;
            
            console.log(`Final state: ${this.allQuests.length} total quests loaded`);
            
        } catch (error) {
            console.error('Error loading quest data:', error);
            throw error;
        }
    }

    getTotalAvailable() {
        let total = 0;
        const breakdown = {};
        
        Object.keys(this.questData).forEach(expKey => {
            const expansion = this.questData[expKey];
            const count = expansion.available.length;
            breakdown[expKey] = count;
            total += count;
        });
        
        console.log(`AVAILABLE QUEST BREAKDOWN:`, breakdown);
        console.log(`Total available calculated: ${total}`);
        
        return total;
    }

    getTotalMissing() {
        const missingCounts = {};
        let total = 0;
        
        Object.keys(this.questData).forEach(expKey => {
            const expansion = this.questData[expKey];
            const count = expansion.missing.length;
            missingCounts[expKey] = count;
            total += count;
        });
        
        console.log(`Missing quests breakdown:`, missingCounts);
        console.log(`Total missing: ${total}`);
        
        return total;
    }

    renderExpansionFilters() {
        const expansionFilter = document.getElementById('expansion-filter');
        
        // Clear existing options except the first one
        while (expansionFilter.children.length > 1) {
            expansionFilter.removeChild(expansionFilter.lastChild);
        }
        
        this.expansions.forEach(expansion => {
            const option = document.createElement('option');
            option.value = expansion.key;
            option.textContent = expansion.name;
            expansionFilter.appendChild(option);
        });
    }

    renderQuestData() {
        console.log('Starting renderQuestData...');
        const container = document.getElementById('quest-containers');
        container.innerHTML = '';

        console.log('Current questData state:', Object.keys(this.questData).map(key => `${key}: ${this.questData[key]?.available?.length || 0} available`));

        this.expansions.forEach(expansion => {
            console.log(`\nRendering expansion: ${expansion.key}`);
            
            if (!this.questData[expansion.key]) {
                console.log(`No questData for ${expansion.key}`);
                return;
            }

            const { available, missing } = this.questData[expansion.key];
            const totalQuests = available.length + missing.length;
            
            console.log(`${expansion.key}: ${available.length} available, ${missing.length} missing, ${totalQuests} total`);

            if (this.expansionStates[expansion.key] === undefined) {
                this.expansionStates[expansion.key] = false;
            }

            const isExpanded = this.expansionStates[expansion.key];
            const toggleText = isExpanded ? 'Hide Quests' : 'Show Quests';

            // Show expansion even if no quests to indicate it exists
            const expansionDiv = document.createElement('div');
            expansionDiv.className = 'expansion-container';
            expansionDiv.setAttribute('data-expansion', expansion.key);
            
            if (totalQuests === 0) {
                console.log(`No quests for ${expansion.key}, showing empty state`);
                expansionDiv.innerHTML = `
                    <div class="expansion-header">
                        <h3>${expansion.name}</h3>
                        <div class="expansion-stats">
                            <span class="stat neutral">No quest data available</span>
                        </div>
                    </div>
                `;
            } else {
                console.log(`Rendering ${totalQuests} quests for ${expansion.key}`);
                const coverage = missing.length > 0 ? Math.floor((available.length / totalQuests) * 100) : 100;
                
                expansionDiv.innerHTML = `
                    <div class="expansion-header">
                        <h3>${expansion.name}</h3>
                        <div class="expansion-stats">
                            <span class="stat available">${available.length} available</span>
                            ${missing.length > 0 ? `<span class="stat missing">${missing.length} missing</span>` : ''}
                            <span class="stat total">Total: ${totalQuests}</span>
                            ${missing.length > 0 ? `<span class="stat coverage">${coverage}% coverage</span>` : ''}
                        </div>
                        <button class="toggle-btn" onclick="questTrackerInstance.toggleExpansion('${expansion.key}')">${toggleText}</button>
                    </div>
                    <div class="quest-grid ${isExpanded ? '' : 'collapsed'}" id="quest-grid-${expansion.key}">
                        ${this.renderQuestCards(this.sortQuestsByType([...available, ...missing]))}
                    </div>
                `;
            }

            container.appendChild(expansionDiv);
            console.log(`Added expansion container for ${expansion.key} to DOM`);
        });

        this.updateSummaryStats();
        console.log('renderQuestData complete');
    }

    // Add method to toggle expansion visibility
    toggleExpansion(expansionKey) {
        this.expansionStates[expansionKey] = !this.expansionStates[expansionKey];
        this.renderQuestData();
        this.applyFilters();
    }

    // Add method to expand/collapse all expansions
    toggleAllExpansions(expand) {
        this.expansions.forEach(expansion => {
            this.expansionStates[expansion.key] = expand;
        });
        this.renderQuestData();
        this.applyFilters();
    }

    sortQuestsByType(quests) {
        // Sort quests so that regular quests come first, then U, S, A quests at the end
        return quests.sort((a, b) => {
            // Get quest type priorities (lower number = higher priority, appears first)
            const getPriority = (quest) => {
                if (quest.isUnlockQuest) return 4;  // U quests
                if (quest.isCustomDelivery) return 5; // S quests  
                if (quest.isAchievementQuest) return 6; // A quests
                if (quest.isCraftingQuest) return 7; // C quests (Aether Current)
                if (quest.isNpcQuest) return 8; // N quests (Aethernet)
                return quest.status === 'available' ? 1 : 2; // Regular quests, available first
            };
            
            const priorityA = getPriority(a);
            const priorityB = getPriority(b);
            
            // First sort by priority
            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }
            
            // Within same priority, sort alphabetically
            return a.name.localeCompare(b.name);
        });
    }

    // Add the missing updateSummaryStats method
    updateSummaryStats() {
        const totalEl = document.getElementById('total-quests');
        const availableEl = document.getElementById('available-quests');
        const missingEl = document.getElementById('missing-quests');

        const total = this.totalQuestCount || 0;
        const available = this.getTotalAvailable();
        const missing = this.getTotalMissing();

        // Full stats breakdown for debugging
        console.log('=== FULL QUEST STATS BREAKDOWN ===');
        console.log(`Overall Totals - Total Quests: ${total}, Available: ${available}, Missing: ${missing}`);
        
        // Per-expansion breakdown
        console.log('Per-Expansion Breakdown:');
        Object.keys(this.questData).forEach(expKey => {
            const exp = this.questData[expKey];
            const expTotal = exp.available.length + exp.missing.length;
            console.log(`  ${expKey}: Available: ${exp.available.length}, Missing: ${exp.missing.length}, Total: ${expTotal}`);
        });
        
        // Quest type breakdown (if data is available)
        let regular = 0, unlock = 0, customDelivery = 0, achievement = 0, crafting = 0, npc = 0;
        Object.values(this.questData).forEach(exp => {
            exp.available.forEach(quest => {
                if (quest.isUnlockQuest) unlock++;
                else if (quest.isCustomDelivery) customDelivery++;
                else if (quest.isAchievementQuest) achievement++;
                else if (quest.isCraftingQuest) crafting++;
                else if (quest.isNpcQuest) npc++;
                else regular++;
            });
        });
        console.log('Quest Type Breakdown (Available Only):');
        console.log(`  Regular: ${regular}, Unlock (U): ${unlock}, Custom Delivery (S): ${customDelivery}, Allied Society (A): ${achievement}, Aether Current (C): ${crafting}, Aethernet (N): ${npc}`);
        console.log('=====================================');

        if (totalEl) {
            totalEl.textContent = total;
        }
        if (availableEl) {
            availableEl.textContent = available;
        }
        if (missingEl) {
            missingEl.textContent = missing;
        }
    }

    // Add method to get descriptive quest type string
    getQuestTypeString(quest) {
        if (quest.isUnlockQuest) return "Unlock Quest";
        if (quest.isCustomDelivery) return "Custom Delivery";
        if (quest.isAchievementQuest) return "Achievement Quest";
        if (quest.isCraftingQuest) return "Crafting Quest";
        if (quest.isNpcQuest) return "NPC Quest";
        return "Side Quest"; // Default for regular quests
    }

    renderQuestCards(quests) {
        return quests.map(quest => `
        <div class="quest-card ${quest.status}" data-expansion="${quest.expansion}" data-status="${quest.status}" data-name="${quest.name.toLowerCase()}" data-unlock-quest="${quest.isUnlockQuest || false}" data-custom-delivery="${quest.isCustomDelivery || false}" data-achievement-quest="${quest.isAchievementQuest || false}" data-crafting-quest="${quest.isCraftingQuest || false}" data-npc-quest="${quest.isNpcQuest || false}" data-unobtainable="${quest.isUnobtainable || false}" title="${quest.name} - ${quest.status === 'available' ? 'Path available' : 'Needs path'}">
            <div class="quest-content">
                <span class="quest-name">${quest.name}${quest.isUnlockQuest ? ' (U)' : ''}${quest.isCustomDelivery ? ' (S)' : ''}${quest.isAchievementQuest ? ' (A)' : ''}${quest.isCraftingQuest ? ' (C)' : ''}${quest.isNpcQuest ? ' (N)' : ''}</span>
                <div class="quest-pills">
                    <span class="quest-type-pill">${this.getQuestTypeString(quest)}</span>
                    ${this.renderQuestTypeInfo(quest)}
                    ${quest.isUnlockQuest ? '<span class="quest-type-pill unlock">Unlock Link</span>' : ''}
                    ${quest.isCustomDelivery ? '<span class="quest-type-pill custom-delivery">Custom Delivery</span>' : ''}
                    ${quest.isAchievementQuest ? '<span class="quest-type-pill allied-society">Allied Society</span>' : ''}
                    ${quest.isCraftingQuest ? '<span class="quest-type-pill aether-current">Aether Current</span>' : ''}
                    ${quest.isNpcQuest ? '<span class="quest-type-pill aethernet">Aethernet</span>' : ''}
                </div>
                ${quest.id ? `<span class="quest-id">${quest.id}</span>` : ''}
            </div>
        </div>
    `).join('');
    }

    renderQuestTypeInfo(quest) {
        // For U, S, A, C, and N quest types, don't show generic quest type info
        if (quest.isUnlockQuest || quest.isCustomDelivery || quest.isAchievementQuest || quest.isCraftingQuest || quest.isNpcQuest) {
            return ''; // The specific type labels are shown elsewhere
        }
        
        // Handle different quest data sources
        const genre = quest.genre;
        const category = quest.category;
        
        // Skip if both are missing or unknown
        if (!genre && !category) {
            return '<span class="quest-type-pill">Quest</span>';
        }
        
        // Skip "Unknown" and "Local Path" values
        const validGenre = genre && genre !== 'Unknown' && genre !== 'Local Path' ? genre : null;
        const validCategory = category && category !== 'Unknown' && category !== 'Local Path' ? category : null;
        
        // Map specific XIVAPI categories/genres to more user-friendly names
        let displayCategory = validCategory;
        let displayGenre = validGenre;
        
        // Map common XIVAPI categories to better display names
        if (validCategory) {
            const categoryMappings = {
                'Dungeons & Trials': 'Dungeon/Trial',
                'Chronicles of a New Era': 'Chronicle Quest',
                'Seasonal Events': 'Seasonal Event',
                'The Hunt': 'Hunt',
                'Deep Dungeon': 'Deep Dungeon',
                'PvP': 'PvP',
                'Gold Saucer': 'Gold Saucer',
                'Housing': 'Housing',
                'Crafting & Gathering': 'Crafting/Gathering'
            };
            displayCategory = categoryMappings[validCategory] || validCategory;
        }
        
        // Map common XIVAPI genres to better display names  
        if (validGenre) {
            const genreMappings = {
                'Main Scenario Quest': 'Main Scenario',
                'Job Quest': 'Job Quest',
                'Feature Quest': 'Feature Quest',
                'Side Story Quest': 'Side Story',
                'Levequest': 'Levequest',
                'Grand Company Quest': 'Grand Company',
                'Beast Tribe Quest': 'Beast Tribe',
                'Seasonal Event Quest': 'Seasonal Event'
            };
            displayGenre = genreMappings[validGenre] || validGenre;
        }
        
        // If we have valid info, show it as pills
        if (displayGenre || displayCategory) {
            let typeInfo = '';
            if (displayCategory) {
                typeInfo += `<span class="quest-type-pill">${displayCategory}</span>`;
            }
            if (displayGenre && displayGenre !== displayCategory) {
                typeInfo += `<span class="quest-type-pill">${displayGenre}</span>`;
            }
            return typeInfo;
        }
        
        // Fallback: try to guess quest type from the quest name or ID
        if (quest.id || quest.name) {
            const id = (quest.id || '').toLowerCase();
            const name = quest.name.toLowerCase();
            
            // Check for Main Scenario Quests
            if (id.includes('msq') || name.includes('main scenario')) {
                return '<span class="quest-type-pill">Main Scenario</span>';
            }
            
            // Check for Job Quests
            if (id.includes('job') || id.includes('class') || name.includes('job quest')) {
                return '<span class="quest-type-pill">Job Quest</span>';
            }
            
            // Check for Trials
            if (name.includes('trial') || id.includes('trial') ||
                name.includes('primal') || name.includes('extreme') || name.includes('hard')) {
                return '<span class="quest-type-pill">Trial</span>';
            }
            
            // Check for Dungeons
            if (name.includes('dungeon') || id.includes('dungeon') ||
                name.includes('deep dungeon') || name.includes('palace of the dead') || 
                name.includes('heaven-on-high')) {
                return '<span class="quest-type-pill">Dungeon</span>';
            }
            
            // Check for Raids
            if (name.includes('raid') || id.includes('raid') ||
                name.includes('savage') || name.includes('ultimate')) {
                return '<span class="quest-type-pill">Raid</span>';
            }
            
            // Check for Beast Tribe/Tribal Quests
            if (name.includes('beast tribe') || name.includes('tribal') ||
                id.includes('beast') || id.includes('tribal')) {
                return '<span class="quest-type-pill">Beast Tribe</span>';
            }
            
            // Check for Levequests
            if (name.includes('levequest') || name.includes('leve') ||
                id.includes('leve') || name.includes('guildleve')) {
                return '<span class="quest-type-pill">Levequest</span>';
            }
            
            // Check for Side Quests
            if (id.includes('side') || id.includes('sq')) {
                return '<span class="quest-type-pill">Side Quest</span>';
            }
        }
        
        // Final fallback
        return '<span class="quest-type-pill">Quest</span>';
    }

    setupEventListeners() {
        const expansionFilter = document.getElementById('expansion-filter');
        const statusFilter = document.getElementById('status-filter');
        const obtainableFilter = document.getElementById('obtainable-filter');
        const searchInput = document.getElementById('search-input');

        [expansionFilter, statusFilter, obtainableFilter, searchInput].forEach(element => {
            if (element) {
                element.addEventListener('change', () => this.applyFilters());
                if (element.type === 'text') {
                    element.addEventListener('input', () => this.applyFilters());
                }
            }
        });
    }

    resetFilters() {
        // Reset expansion filter to "All Expansions"
        const expansionFilter = document.getElementById('expansion-filter');
        if (expansionFilter) {
            expansionFilter.value = '';
        }
        
        // Reset status filter to "All"
        const statusFilter = document.getElementById('status-filter');
        if (statusFilter) {
            statusFilter.value = '';
        }
        
        // Reset obtainable filter to "All Quests"
        const obtainableFilter = document.getElementById('obtainable-filter');
        if (obtainableFilter) {
            obtainableFilter.value = '';
        }
        
        // Clear search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Apply the reset filters to update the display
        this.applyFilters();
    }

    // Enhanced applyFilters with visual feedback
    applyFilters() {
        const expansionFilter = document.getElementById('expansion-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        const obtainableFilter = document.getElementById('obtainable-filter').value;
        const searchTerm = document.getElementById('search-input').value.toLowerCase();

        const questCards = document.querySelectorAll('.quest-card');
        let visibleCount = 0;

        questCards.forEach(card => {
            const expansion = card.dataset.expansion;
            const status = card.dataset.status;
            const name = card.dataset.name;
            const isUnobtainable = card.dataset.unobtainable === 'true';

            const matchesExpansion = !expansionFilter || expansion === expansionFilter;
            const matchesStatus = !statusFilter || status === statusFilter;
            const matchesObtainable = !obtainableFilter || 
                (obtainableFilter === 'obtainable' && !isUnobtainable) ||
                (obtainableFilter === 'unobtainable' && isUnobtainable);
            const matchesSearch = !searchTerm || name.includes(searchTerm);

            const shouldShow = matchesExpansion && matchesStatus && matchesObtainable && matchesSearch;

            if (shouldShow) {
                card.style.display = 'block';
                card.classList.add('fade-in'); // Add fade-in animation
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });

        // Update a dynamic counter for visible quests (add this to HTML if needed)
        const counterElement = document.getElementById('visible-quests-counter');
        if (counterElement) {
            counterElement.textContent = `Showing ${visibleCount} quests`;
        }

        // Show/hide quest grids based on visible cards
        document.querySelectorAll('.quest-grid').forEach(grid => {
            const visibleCardsInGrid = Array.from(grid.querySelectorAll('.quest-card')).filter(card => card.style.display === 'block');
            if (visibleCardsInGrid.length > 0) {
                grid.classList.remove('collapsed'); // Show the grid
            } else {
                grid.classList.add('collapsed'); // Hide the grid
            }
        });

        // Hide empty expansion containers with smoother transitions
        document.querySelectorAll('.expansion-container').forEach(container => {
            const visibleCards = Array.from(container.querySelectorAll('.quest-card')).filter(card => card.style.display === 'block');
            const expansion = container.getAttribute('data-expansion');
            const isExpanded = this.expansionStates[expansion];
            
            const shouldShowExpansion = !expansionFilter || expansion === expansionFilter;
            const hasVisibleCards = visibleCards.length > 0;
            
            let hasMatchingObtainableQuests = true;
            if (obtainableFilter) {
                const allCardsInExpansion = container.querySelectorAll('.quest-card');
                const matchingObtainableCards = Array.from(allCardsInExpansion).filter(card => {
                    const isUnobtainable = card.dataset.unobtainable === 'true';
                    return (obtainableFilter === 'obtainable' && !isUnobtainable) ||
                           (obtainableFilter === 'unobtainable' && isUnobtainable);
                });
                hasMatchingObtainableQuests = matchingObtainableCards.length > 0;
            }
            
            const shouldDisplay = shouldShowExpansion && hasMatchingObtainableQuests && (hasVisibleCards || (!searchTerm && !expansionFilter && !obtainableFilter));
            
            // Show if shouldDisplay and (expanded or has visible cards)
            const finalDisplay = shouldDisplay && (isExpanded || hasVisibleCards);
            container.style.display = finalDisplay ? 'block' : 'none';
            container.classList.toggle('hidden', !finalDisplay);
        });

        // Recalculate visible count based on visible containers
        let newVisibleCount = 0;
        document.querySelectorAll('.expansion-container[style="display: block"] .quest-card[style="display: block"]').forEach(() => newVisibleCount++);
        if (counterElement) {
            counterElement.textContent = `Showing ${newVisibleCount} quests`;
        }
    }

    showLoading(show, message = 'Loading...') {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = show ? 'block' : 'none';
            if (show && message) {
                const messageEl = loading.querySelector('.loading-message');
                if (messageEl) messageEl.textContent = message;
            }
        }
    }

    showProgress(message) {
        // Reuse the loading container for progress messages
        this.showLoading(true, message);
    }

    hideError() {
        const errorEl = document.getElementById('error-message');
        if (errorEl) errorEl.style.display = 'none';
    }

    showError(message) {
        const errorEl = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');
        if (errorEl && errorText) {
            errorText.textContent = message;
            errorEl.style.display = 'block';
        }
        this.showLoading(false); // Hide loading on error
    }

    showSummary(show) {
        const summary = document.getElementById('quest-summary');
        if (summary) summary.style.display = show ? 'block' : 'none';
    }

    showLastUpdated() {
        // Assuming you have an element like <div id="last-updated"></div> in the HTML for this
        const lastUpdatedEl = document.getElementById('last-updated');
        if (lastUpdatedEl && this.lastUpdated) {
            lastUpdatedEl.textContent = `Last updated: ${new Date(this.lastUpdated).toLocaleString()}`;
        }
    }

    async refreshQuestData() {
        console.log('Refreshing quest data...');
        this.showLoading(true, 'Refreshing quest data...');
        this.hideError();
        
        try {
            await this.loadQuestData();
            this.renderQuestData();
            this.applyFilters();            
            this.updateSummaryStats();
            this.showLastUpdated();
            console.log('Quest data refreshed successfully!');
        } catch (error) {
            console.error('Failed to refresh quest data:', error);
            this.showError(`Failed to refresh data: ${error.message}`);
        } finally {
            this.showLoading(false);
        }
    }
}

// Initialize the quest tracker when the page loads
const questTrackerInstance = new QuestTracker();
document.addEventListener('DOMContentLoaded', () => {
    questTrackerInstance.init();
});

window.refreshQuestData = () => questTrackerInstance.refreshQuestData();