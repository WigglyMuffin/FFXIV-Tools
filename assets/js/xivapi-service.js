// XIVAPI v2 Service for fetching quest data
// Uses the official XIVAPI v2 to get real quest data with categories and genres

class XIVAPIService {
    constructor() {
        this.baseURL = 'https://v2.xivapi.com/api';
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    // Get cached data or fetch if expired
    async getCachedData(key, fetchFunction) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }

        const data = await fetchFunction();
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });

        return data;
    }

    // Fetch all quests with their categories and genres
    async getAllQuests(onProgress = null) {
        return this.getCachedData('all_quests', async () => {
            console.log('Fetching all quests from XIVAPI...');
            
            const allQuests = [];
            let currentRowId = 0;
            const batchSize = 500;
            let batchCount = 0;
            const maxBatches = 100; // Safety limit
            
            while (batchCount < maxBatches) {
                try {
                    const response = await fetch(
                        `${this.baseURL}/sheet/Quest?fields=Id,Name,JournalGenre.Name,JournalCategory.Name,Expansion.Name&limit=${batchSize}&after=${currentRowId}`
                    );
                    
                    if (!response.ok) {
                        throw new Error(`XIVAPI request failed: ${response.status} ${response.statusText}`);
                    }
                    
                    const data = await response.json();
                    
                    if (!data.rows || data.rows.length === 0) break;
                
                // Filter valid quests and add to collection
                const validQuests = data.rows
                    .filter(row => row.fields.Name && row.fields.Name.trim() !== '')
                    .map(row => ({
                        id: row.fields.Id || '',
                        name: row.fields.Name,
                        genre: row.fields.JournalGenre?.fields?.Name || 'Unknown',
                        category: row.fields.JournalCategory?.fields?.Name || 'Unknown',
                        expansion: row.fields.Expansion?.fields?.Name || 'Unknown',
                        rowId: row.row_id
                    }));
                
                allQuests.push(...validQuests);
                batchCount++;
                
                // Report progress
                if (onProgress) {
                    onProgress({
                        batch: batchCount,
                        questsInBatch: validQuests.length,
                        totalQuests: allQuests.length,
                        lastRowId: data.rows[data.rows.length - 1].row_id
                    });
                }
                
                // Update currentRowId for next batch
                currentRowId = data.rows[data.rows.length - 1].row_id;
                
                // If we got fewer rows than requested, we've reached the end
                if (data.rows.length < batchSize) break;
                } catch (error) {
                    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                        throw new Error('Unable to connect to XIVAPI. This may be due to CORS restrictions or network issues.');
                    }
                    throw error;
                }
            }
            
            console.log(`Fetched ${allQuests.length} total quests from XIVAPI`);
            
            // Debug: Show sample of quest categories and genres
            const categoryCount = {};
            const genreCount = {};
            allQuests.forEach(quest => {
                categoryCount[quest.category] = (categoryCount[quest.category] || 0) + 1;
                genreCount[quest.genre] = (genreCount[quest.genre] || 0) + 1;
            });
            
            console.log(`\n📊 XIVAPI Quest Categories (top 10):`);
            Object.entries(categoryCount)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .forEach(([cat, count]) => console.log(`  ${cat}: ${count} quests`));
                
            console.log(`\n📊 XIVAPI Quest Genres (top 10):`);
            Object.entries(genreCount)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .forEach(([genre, count]) => console.log(`  ${genre}: ${count} quests`));
            
            return allQuests;
        });
    }

    // Map XIVAPI expansion names to our expansion keys
    mapXIVAPIExpansionName(xivapiExpansionName) {
        const expansionMapping = {
            'A Realm Reborn': '2.x',
            'Heavensward': '3.x',
            'Stormblood': '4.x',
            'Shadowbringers': '5.x',
            'Endwalker': '6.x',
            'Dawntrail': '7.x'
        };

        return expansionMapping[xivapiExpansionName] || '2.x'; // Default to 2.x for unknown expansions
    }

    // Map XIVAPI quests to expansion-based organization using XIVAPI Expansion field
    mapQuestsToExpansions(quests) {
        const expansionData = {
            '2.x': { name: '2.x - A Realm Reborn', quests: [] },
            '3.x': { name: '3.x - Heavensward', quests: [] },
            '4.x': { name: '4.x - Stormblood', quests: [] },
            '5.x': { name: '5.x - Shadowbringers', quests: [] },
            '6.x': { name: '6.x - Endwalker', quests: [] },
            '7.x': { name: '7.x - Dawntrail', quests: [] }
        };

        // Track expansion mapping statistics
        const expansionCounts = {};
        const unknownExpansions = new Set();
        
        // Initialize counts
        Object.keys(expansionData).forEach(key => {
            expansionCounts[key] = 0;
        });

        quests.forEach(quest => {
            // Use XIVAPI expansion field directly
            const expansionKey = this.mapXIVAPIExpansionName(quest.expansion);
            
            if (expansionKey && expansionData[expansionKey]) {
                expansionData[expansionKey].quests.push(quest);
                expansionCounts[expansionKey]++;
            } else {
                // Track unknown expansion names for debugging
                if (quest.expansion && quest.expansion !== 'Unknown') {
                    unknownExpansions.add(quest.expansion);
                }
                // Default to 2.x for unknown/missing expansion data
                expansionData['2.x'].quests.push(quest);
                expansionCounts['2.x']++;
            }
        });

        // Debug output
        console.log(`\n🔍 XIVAPI Expansion Mapping Results (using Expansion field):`);
        console.log(`✅ Total quests processed: ${quests.length}`);
        
        // Show per-expansion counts
        Object.keys(expansionCounts).forEach(exp => {
            console.log(`  ${exp}: ${expansionCounts[exp]} quests`);
        });
        
        if (unknownExpansions.size > 0) {
            console.log(`🚨 Unknown expansion names found:`, Array.from(unknownExpansions).sort());
        }

        return expansionData;
    }
}
