var userProfile = {displayName: '', email: '', photoUrl: '', uid: ''}

var closeSurveryButton = document.querySelector('[class="lightbox-close-button"]');
closeSurveryButton.addEventListener('click', function(){
    var surveyLightbox = document.querySelector('[class="lightbox-questionnaire-container"]')
    surveyLightbox.classList.add('hidden');
});

var importSurveyInformation = document.querySelector('[data-coffee-questionnaire="form"]');
importSurveyInformation.addEventListener('submit', function (event) {
    event.preventDefault();
    var surveyLightbox = document.querySelector('[class="lightbox-questionnaire-container"]')
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
    surveyLightbox.classList.add('hidden');

});

var eventsRow = function(events) {
    var eventList = document.createElement('li')
    var descripBox = document.createElement('div')
    var dateBox = document.createElement('div')
    var titleBox = document.createElement('div')
    
    titleBox.textContent = 'name: ' + events.name.text.substr(0,80)
    descripBox.textContent = ' description: ' + events.description.text.substr(0,80) 
    dateBox.textContent = ' date: ' + events.start.local
    
    var events = document.querySelector('.coffeeevents')
    eventList.appendChild(titleBox)
    eventList.appendChild(descripBox)
    eventList.appendChild(dateBox)
    events.appendChild(eventList)
}
$.ajax('https://www.eventbriteapi.com/v3/events/search/?q=coffee+&sort_by=distance&location.address=Atlanta&location.within=60mi&token=7TWTF7476W67E2AALYCA', {
		success: function(data) {
			console.log(data)
            var eventsArray = data.events;
            var array = ['']
			eventsArray.forEach(event => {
				array.push(event)
				eventsRow(event)
			})
		}
	}	
)		
// firebase.auth();
var parseLocalStorage = function() {
    var retrievedStorage = localStorage.getItem('firebaseui::rememberedAccounts');
    var parsedStorage = JSON.parse(retrievedStorage);
    return parsedStorage;
};


var signoutButton = document.querySelector('[id="sign-in"]');
console.log(signoutButton.textContent);
signoutButton.addEventListener('click', function (){
    if (signoutButton.textContent === 'Sign out') {
        firebase.auth().signOut().then(function () {
            localStorage.removeItem('user');
            localStorage.removeItem('firebaseui::rememberedAccounts');
            console.log('Signed Out');
        }, function(error) {
            console.error('Sign Out Error', error);
        })
    }
    else if (signoutButton.textContent === 'Sign in') {
        console.log('hi')
        var surveyLightbox = document.querySelector('[class="lightbox-questionnaire-container"]');
        surveyLightbox.classList.add('visible');
        surveyLightbox.classList.remove('hidden');
    }
});


console.log(parseLocalStorage());

if (parseLocalStorage() !== null) {
    var surveyLightbox = document.querySelector('[class="lightbox-questionnaire-container"]')
    surveyLightbox.classList.add('hidden');
}

