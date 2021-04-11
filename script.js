const submitBtn = document.getElementById("submit-btn");

async function fetchResults(country, startDate, endDate) {
  const res = await fetch(
    `https://api.covid19api.com/country/${country}?from=${startDate}T00:00:00Z&to=${endDate}T00:00:00Z`
  );
  const data = await res.json();
  return data;
}

submitBtn.addEventListener("click", async function onSubmitHandler() {
  const country = document.getElementById("country").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  if (country && startDate && endDate) {
    const results = await fetchResults(country, startDate, endDate);

    if (results) {
      const resultsContainer = document.getElementById("cards-container");

      results.forEach((result) => {
        console.log(resultsContainer);
        console.log("hello");
        const resultDivContainer = document.createElement("div");
        resultDivContainer.className = "card-container";
        if (resultsContainer) resultsContainer.appendChild(resultDivContainer);
      });
    }

    console.log(results);

    console.log(country);
    console.log(startDate);
    console.log(endDate);
  } else {
    alert("Please enter the values");
  }
});
