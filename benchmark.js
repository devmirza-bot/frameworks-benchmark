const React = require('react');
const Vue = require('vue');
const fs = require('fs');

/**
 * Represents a framework used in the benchmark.
 * @typedef {Object} Framework
 * @property {string} name - The name of the framework.
 * @property {Object} library - The library or framework object.
 * @property {function} render - The rendering function that takes data and returns the rendered output.
 */


const frameworks = [
    {
        name: 'React 18',
        library: React,
        render: (data) => data.map((item) => React.createElement('div', { key: item.id }, item.name)),
    },
    {
        name: 'Next.js 14',
        library: require('next'),
        render: (data) => React.createElement('div', null, data.map((item) => React.createElement('div', { key: item.id }, item.name))),
    },
    {
        name: 'Vue 3',
        library: Vue,
        render: (data) => data.map((item) => Vue.h('div', { key: item.id }, item.id))
    },
    // Add other frameworks here
];

/**
 * Generates sample data for the benchmark.
 * @function
 * @param {number} length - The length of the sample data array.
 * @returns {Array<Object>} - An array of sample data objects.
 */
const generateSampleData = (length) =>
    Array.from({ length }, (_, index) => ({ id: index, name: `Item ${index}` }));

/**
 * Save results to a historical log file
 * @param {Array} results - Array of benchmark results
 * @param {Date} timestamp - Timestamp of the benchmark run
 */
function saveToHistory(results, timestamp) {
    try {
        let historicalData = [];

        // Check if the file exists
        if (fs.existsSync('historical_log.json')) {
            historicalData = JSON.parse(fs.readFileSync('historical_log.json', 'utf-8'));
        }

        historicalData.push({ results, timestamp });
        fs.writeFileSync('historical_log.json', JSON.stringify(historicalData, null, 2));
        console.log('Results saved to historical log.');
    } catch (error) {
        console.error('Error saving results to historical log:', error);
    }
}

/**
 * Runs the benchmark for various frameworks.
 * @function
 * @returns {void}
 */
const runBenchmark = () => {
    const data = generateSampleData(1000);
    const results = [];

    frameworks.forEach((framework) => {
        /**
         * Represents the result of rendering using a specific framework.
         * @typedef {Object} BenchmarkResult
         * @property {string} name - The name of the framework.
         * @property {string} time - The rendering time in seconds.
         */

        /** @type {BenchmarkResult} */
        const result = {
            name: framework.name,
            time: undefined,
        };

        const startTime = performance.now();
        const renderedOutput = framework.render(data);
        const endTime = performance.now();
        const elapsedTimeInSeconds = (endTime - startTime) / 1000;

        result.time = elapsedTimeInSeconds.toFixed(4);
        results.push(result);

        console.log(`${framework.name} took ${elapsedTimeInSeconds.toFixed(4)} seconds to render.`);
    });

    const lastUpdated = new Date()

    const timestamp = new Date()

    saveToHistory(results, timestamp)

    /**
     * Represents the overall benchmark results.
     * @typedef {Object} BenchmarkResults
     * @property {Array<BenchmarkResult>} results - An array of results for each framework.
     * @property {string} lastUpdated - The timestamp when the benchmark was last updated.
     */

    /** @type {BenchmarkResults} */
    const benchmarkResults = {
        results,
        lastUpdated: lastUpdated.toLocaleString(),
    };

    const jsonResults = JSON.stringify(benchmarkResults, null, 2);

    fs.writeFileSync('benchmark_output.json', jsonResults);
};

// Run the benchmark initially
runBenchmark();
