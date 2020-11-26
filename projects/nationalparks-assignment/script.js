"use strict";

const nationalParksApi = 'https://developer.nps.gov/api/v1/parks?';

const apiKey = 'dsLDKhsDw1xCXeeC0fi7IyLhCJ3k1w04qv8WuszS';

//retrieve user text input
function userInput() {
  let textInput = $("#js-username-username").val();
  return textInput;
}

//from user input, create api url with query parameters
function formatQueryUrl(queryParam) {
  let queryString = Object.keys(queryParam).map(key => encodeURIComponent(key) + '=' + queryParam[key]).join('&');
  return nationalParksApi + queryString
};

//get results based on user input 
function getResults(stateCode, maxResults = 10) {
  let param = {
    api_key: apiKey,
    stateCode: stateCode,
    limit: maxResults
  }
  let url = formatQueryUrl(param);
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
    let stateCode = $('.state-code').val();
    let maxResults = $('.max-results').val();
    getResults(stateCode, maxResults)
  });

};

$(watchSubmit);

//display results in the DOM
function displayResults(responseJson) {
  $(".results-hidden").empty();
  console.log(responseJson);
  responseJson.data.forEach(nationalPark => {
    $(".results-hidden").append(`<li>${nationalPark.fullName} ${nationalPark.description} ${nationalPark.url}</li>`)
  })
  $(".container-2").removeClass('hidden');
}
