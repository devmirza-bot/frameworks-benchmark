const React = require('react');
const Vue = require('vue');
const fs = require('fs');

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
    }
    // Add other frameworks here
];

const generateSampleData = (length) =>
    Array.from({ length }, (_, index) => ({ id: index, name: `Item ${index}` }));

const runBenchmark = () => {
    const data = generateSampleData(1000);
    const results = [];

    frameworks.forEach((framework) => {
        const startTime = performance.now();
        const renderedOutput = framework.render(data);
        const endTime = performance.now();
        const elapsedTimeInSeconds = (endTime - startTime) / 1000;

        results.push({
            name: framework.name,
            time: elapsedTimeInSeconds.toFixed(4),
        });

        console.log(`${framework.name} took ${elapsedTimeInSeconds.toFixed(4)} seconds to render.`);
    });

    const lastUpdated = new Date()
    const jsonResults = JSON.stringify({ results, lastUpdated: lastUpdated.toLocaleString() }, null, 2);

    fs.writeFileSync('benchmark_output.json', jsonResults);
};

runBenchmark();
