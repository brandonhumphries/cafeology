var closeSurveryButton = document.querySelector('[class="lightbox-close-button"]');
closeSurveryButton.addEventListener('click', function(){
    var surveyLightbox = document.querySelector('[class="lightbox-questionnaire-container"]')
    surveyLightbox.classList.add('hidden');
});

var importSurveyInformation = document.querySelector('[data-coffee-questionnaire="form"]');
importSurveyInformation.addEventListener('submit', function (event) {
    event.preventDefault();
    var temperatureInput = document.querySelector('[name="temperature"]:checked');
    var strengthInput = document.querySelector('[name="strength-level-input"]');
    var creamInput = document.querySelector('[name="cream-level-input"]');
    var sweetnessInput = document.querySelector('[name="sweetness-level-input"]');
    var flavorInput = document.querySelector('[name="flavor-input"]:checked');

    var surveyResults = {temperature: '', strength: '', cream: '', sweetness: '', flavor: ''};
    surveyResults.temperature = temperatureInput.value;
    surveyResults.strength = strengthInput.value;
    surveyResults.cream = creamInput.value;
    surveyResults.sweetness = sweetnessInput.value;
    surveyResults.flavor = flavorInput.value;
    console.log(surveyResults);

});