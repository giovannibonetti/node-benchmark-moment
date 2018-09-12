# Benchmark: Moment.js x raw string manipulation

This is a simple benchmark I've made to compare the performance of moment.js time string generation with raw string manipulation.
The use case is to generate a bunch of time strings like "10:00 AM".
It is implemented in Node.js

# Running the benchmark

Run the following command to run the benchmark and compare all implementations.

```sh
$ node index.js 

Adding numbers x 17,467 ops/sec ±1.82% (83 runs sampled)
Adding moment duration x 10,422 ops/sec ±1.94% (83 runs sampled)
Combining both ideas x 17,295 ops/sec ±1.00% (85 runs sampled)
Combining both ideas (optimized) x 169,515 ops/sec ±2.22% (87 runs sampled)
Fastest is Combining both ideas (optimized)
```
