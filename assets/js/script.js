document.addEventListener('DOMContentLoaded', function () {
    function showLoading() {
        const loadingDiv = document.getElementById('loading');
        loadingDiv.classList.remove('hidden');
    }

    function hideLoading() {
        const loadingDiv = document.getElementById('loading');
        loadingDiv.classList.add('hidden');
    }

    /**
     * Fetches benchmark results from 'benchmark_output.json' and displays them on the page.
     * Also includes a bar chart visualizing rendering times and information about the fastest framework.
     * @function
     * @returns {void}
     */
    function loadAndDisplayResults() {
        showLoading()

        fetch("benchmark_output.json")
            .then((response) => response.json())
            .then((data) => {
                hideLoading()

                const resultsDiv = document.getElementById("results");
                const lastUpdatedDiv = document.getElementById("last-updated");
                const chartContainer = document.getElementById("chart-container");
                const fastestFrameworkDiv =
                    document.getElementById("fastest-framework");

                resultsDiv.innerHTML = ""; // Clear existing results
                fastestFrameworkDiv.innerHTML = "";

                const results = data.results;

                data.results.forEach((result) => {
                    const resultElement = document.createElement("div");
                    resultElement.className = "result";
                    resultElement.textContent = `${result.name}: ${result.time} seconds`;
                    resultsDiv.appendChild(resultElement);
                });

                // Display Last Updated At
                lastUpdatedDiv.textContent = `Last Updated At: ${data.lastUpdated}`;

                const chartData = {
                    labels: results.map((result) => result.name),
                    datasets: [
                        {
                            label: "Rendering Time (seconds)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                            data: results.map((result) => parseFloat(result.time)),
                        },
                    ],
                };

                const chartOptions = {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                };

                const benchmarkChart = new Chart(
                    document.getElementById("benchmark-chart"),
                    {
                        type: "bar",
                        data: chartData,
                        options: chartOptions,
                    }
                );

                const fastestFramework = results.reduce((fastest, current) => {
                    return parseFloat(current.time) < parseFloat(fastest.time)
                        ? current
                        : fastest;
                }, results[0]);

                // Display information about the fastest framework
                fastestFrameworkDiv.textContent = `Fastest Framework: ${fastestFramework.name} (${fastestFramework.time} seconds)`;
            })
            .catch((error) => {
                hideLoading()
                console.error("Error loading benchmark results:", error)
            });
    }

    // Load and display results initially
    loadAndDisplayResults();

    // Refresh results every 1 minute
    setInterval(loadAndDisplayResults, 1 * 60 * 1000);
})