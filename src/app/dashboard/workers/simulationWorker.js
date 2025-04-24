self.onmessage = function (e) {
  const { probabilities, claims, iterations } = e.data;
  const results = [];

  for (let i = 0; i < iterations; i++) {
    let revenue = 0;
    for (const claim of claims) {
      const chance = probabilities[claim.payment_status] || 0;
      if (Math.random() < chance) {
        revenue += claim.amount;
      }
    }
    results.push(revenue);
  }

  const dist = {};
  results.forEach((rev) => {
    const bucket = Math.round(rev / 1000) * 1000;
    dist[bucket] = (dist[bucket] || 0) + 1;
  });

  const avg = results.reduce((a, b) => a + b, 0) / results.length;
  const min = Math.min(...results);
  const max = Math.max(...results);

  self.postMessage({ dist, avg, min, max, results });
};
