# Framework Benchmarking Project (Beta)

[![Frameworks Benchmark Results](https://github.com/devmirza-bot/frameworks-benchmark/actions/workflows/update-results.yml/badge.svg)](https://github.com/devmirza-bot/frameworks-benchmark/actions/workflows/update-results.yml) [![pages-build-deployment](https://github.com/devmirza-bot/frameworks-benchmark/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/devmirza-bot/frameworks-benchmark/actions/workflows/pages/pages-build-deployment)

![Website Screenshot](https://github.com/devmirza-bot/frameworks-benchmark/assets/142266648/f77aae71-560a-40ce-814c-b4aab8d24f00)

## Overview

This project aims to benchmark the rendering performance of various web frameworks. The included script evaluates the rendering time of sample data using different frameworks and outputs the results to a JSON file.

## Getting Started

### Prerequisites

- Node.js: Ensure you have Node.js installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/framework-benchmark.git
   cd framework-benchmark

   ```

2. Install Dependencies

   ```bash
   npm install
   ```

## Usage

### Run Benchmark

Execute the benchmark script to compare the rendering performance of different frameworks.

```bash
npm run benchmark
```

The results will be saved in `benchmark_output.json`.

### View Results

Open the `index.html` file to view the benchmark results in a user-friendly web interface.

## Frameworks Tested

- React 18
- Next.js 14
- Vue 3

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (git checkout -b feature/1. your-feature)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin feature/1. your-feature)
5. Create a pull request :)
