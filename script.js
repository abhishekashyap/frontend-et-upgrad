const submitBtn = document.getElementById("submit-btn");

async function fetchResults(country, startDate, endDate) {
  const res = await fetch(
    `https://api.covid19api.com/country/${country}?from=${startDate}T00:00:00Z&to=${endDate}T00:00:00Z`
  );
  const data = await res.json();
  return data;
}

function createTextElement(elementType, text) {
  const element = document.createElement(elementType);
  const textNode = document.createTextNode(text);
  element.appendChild(textNode);
  return element;
}

function createResultCard(result) {
  const resultDivContainer = document.createElement("div");
  resultDivContainer.classList.add("card");

  const confirmedCases = createTextElement("p", `Confirmed Cases: ${result.Confirmed}`);
  const activeCases = createTextElement("p", `Active Cases: ${result.Active}`);
  const deathCases = createTextElement("p", `Death Cases: ${result.Deaths}`);

  // Append Elements to the card
  resultDivContainer.appendChild(confirmedCases);
  resultDivContainer.appendChild(activeCases);
  resultDivContainer.appendChild(deathCases);

  return resultDivContainer;
}

submitBtn.addEventListener("click", async function onSubmitHandler() {
  const country = document.getElementById("country").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  if (country && startDate && endDate) {
    const results = await fetchResults(country, startDate, endDate);
    console.log(results);

    if (results) {
      const resultsContainer = document.getElementById("cards-container");

      results.forEach((result) => {
        const resultCard = createResultCard(result);
        if (resultsContainer) resultsContainer.appendChild(resultCard);
      });
    }
  } else {
    alert("Please enter the values");
  }
});
