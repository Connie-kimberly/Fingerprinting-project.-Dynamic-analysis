const fs = require('fs');
const path = require('path');

// Function to read log data
function readLogData() {
    try {
        return fs.readFileSync('results/collection_log.txt', 'utf8').split('\n');
    } catch (error) {
        console.error(Failed to read log data: ${error});
        return [];
    }
}

// Feature extraction logic based on observed API calls
function extractFeatures(logData) {
    const features = {
        canvasCallCount: 0,
        oscillatorCallCount: 0,
        // More features can be added here
    };

    logData.forEach(line => {
        if (line.includes('Canvas.getContext was called')) {
            features.canvasCallCount++;
        }
        if (line.includes('AudioContext.createOscillator was called')) {
            features.oscillatorCallCount++;
        }
    });

    return features;
}

// Main function to handle feature extraction
(function main() {
    const logData = readLogData();
    const features = extractFeatures(logData);
    fs.writeFileSync('data/features.json', JSON.stringify(features, null, 2));
    console.log('Features extracted and saved to data/features.json');
})();
