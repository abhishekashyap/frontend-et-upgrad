const submitBtn = document.getElementById("submit-btn");

async function fetchResults(country, startDate, endDate) {
  const res = await fetch(
    `https://api.covid19api.com/country/${country}?from=${startDate}T00:00:00Z&to=${endDate}T00:00:00Z`
  );
  const data = await res.json();
  return data;
}

function clearContainer(node) {
  node.innerHTML = "";
}

function createTextElement(elementType, text) {
  const element = document.createElement(elementType);
  const textNode = document.createTextNode(text);
  element.appendChild(textNode);
  return element;
}

function createLoader() {
  const element = document.createElement("div");
  element.className = "loader";
  return element;
}

function createResultCard(result) {
  const resultDivContainer = document.createElement("div");
  resultDivContainer.classList.add("card");

  const activeCases = createTextElement("p", `Active Cases: ${result.Active}`);
  const recoveredCases = createTextElement(
    "p",
    `Recovered Cases: ${result.Recovered}`
  );
  const deathCases = createTextElement("p", `Death Cases: ${result.Deaths}`);

  // Append Elements to the card
  resultDivContainer.appendChild(activeCases);
  resultDivContainer.appendChild(recoveredCases);
  resultDivContainer.appendChild(deathCases);

  return resultDivContainer;
}

submitBtn.addEventListener("click", async function onSubmitHandler() {
  // Input elements
  const country = document.getElementById("country").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  const resultsContainer = document.getElementById("cards-container");

  // Check if country, startDate and endDate are truth values else raise an alert
  if (country && startDate && endDate) {
    // Empty the result div to remove initial text
    clearContainer(resultsContainer);

    // Show loader
    const loader = createLoader();
    resultsContainer.appendChild(loader);

    try {
      const results = await fetchResults(country, startDate, endDate);
      if (results) {
        // Empty the result div to remove loader
        clearContainer(resultsContainer);
        results.forEach((result) => {
          const resultCard = createResultCard(result);
          if (resultsContainer) resultsContainer.appendChild(resultCard);
        });
      } else {
        const errorText = createTextElement("h1", "Results not found");
        resultsContainer.appendChild(errorText);
      }
    } catch (error) {
      clearContainer(resultsContainer);
      const errorText = createTextElement(
        "h1",
        "An error occured. Please try again"
      );
      resultsContainer.appendChild(errorText);
    }
  } else {
    alert("Please enter the values");
  }
});
