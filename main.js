var closeSurveryButton = document.querySelector('[class="lightbox-close-button"]');
closeSurveryButton.addEventListener('click', function(){
    var surveyLightbox = document.querySelector('[class="lightbox-questionnaire-container"]')
    surveyLightbox.classList.add('hidden');
});