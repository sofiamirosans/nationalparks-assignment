"use strict";


//retrieve user text input
function userInput() {
  let textInput = $("#js-username-username").val();
  return textInput;
}

//from user input, create api url with query parameters
function formatQueryUrl(queryParam) {
  const nationalParksApi = 'https://developer.nps.gov/api/v1/parks?';
  const queryString = Object.keys(queryParam).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParam[key])).join('&');
  return nationalParksApi + queryString
};

//get results based on user input 
function getResults(stateCode, maxResults = 10) {
  const param = {
    api_key: 'dsLDKhsDw1xCXeeC0fi7IyLhCJ3k1w04qv8WuszS',
    stateCode: stateCode,
    limit: maxResults
  }
  const url = formatQueryUrl(param);
  console.log(url)
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText)
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => $('.results-hidden').text(error.message))

};

//watch for submit button then get values
function watchSubmit() {
  $('form').on('submit', event => {
    event.preventDefault();
    const stateCode = $('.state-code').val();
    const maxResults = $('.max-results').val();
    getResults(stateCode, maxResults)
  });

};

$(watchSubmit);

//display results in the DOM
function displayResults(responseJson) {
  $(".results-hidden").html("");
  console.log(responseJson);
  responseJson.data.forEach(nationalPark => {
    $(".results-hidden").append(`<li>${nationalPark.fullName} ${nationalPark.description} ${nationalPark.url}</li>`)
  })
}
