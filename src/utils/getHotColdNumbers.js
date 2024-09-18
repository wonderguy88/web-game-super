function getNumberFrequencies(spinResults) {
  const frequencies = {};
  for (let index = 0; index < 37; index++) {
    frequencies[`${index}`] = 0;
  }
  frequencies["00"] = 0;

  spinResults.length > 1 &&
    spinResults.forEach((number) => {
      if (frequencies[number]) {
        frequencies[number]++;
      } else {
        frequencies[number] = 1;
      }
    });

  return frequencies;
}

export default function getHotAndColdNumbers(spinResults, topN = 5) {
  const frequencies = getNumberFrequencies(spinResults);

  // Convert frequencies object to an array of [number, frequency] pairs
  const frequencyArray = Object.entries(frequencies);

  // Sort array based on frequency, descending
  frequencyArray.sort((a, b) => 0.5 - Math.random());
  frequencyArray.sort((a, b) => b[1] - a[1]);

  // Extract top N hot numbers
  const hotNumbers = frequencyArray
    .slice(0, topN)
    .map((entry) => ({
      number: entry[0],
      count: entry[1],
    }))
    .filter((one) => one.count > 0);

  // Extract bottom N cold numbers
  const coldNumbers = frequencyArray.slice(-topN).map((entry) => ({
    number: entry[0],
    count: entry[1],
  }));

  return { hotNumbers, coldNumbers };
}
