const React = require('react');
const fs = require('fs');

const frameworks = [
    {
        name: 'React',
        library: React,
        render: (data) => data.map((item) => React.createElement('div', { key: item.id }, item.name)),
    },
    {
        name: 'Next.js',
        library: require('next'),
        render: (data) => React.createElement('div', null, data.map((item) => React.createElement('div', { key: item.id }, item.name))),
    },
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
        const elapsedTime = endTime - startTime;

        results.push({
            name: framework.name,
            time: elapsedTime.toFixed(4),
        });

        console.log(`${framework.name} took ${elapsedTime.toFixed(4)} milliseconds to render.`);
    });

    const lastUpdated = new Date()
    const jsonResults = JSON.stringify({ results, lastUpdated: lastUpdated.toLocaleString() }, null, 2);

    fs.writeFileSync('benchmark_output.json', jsonResults);
};

runBenchmark();
