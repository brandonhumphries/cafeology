var userProfile = {displayName: '', email: '', photoUrl: '', uid: '', survey: {}};
var retrievedBlogPosts = [];
var suggestContent = function (surveyResults){
    if (surveyResults.temperature === "Iced"){
        if (surveyResults.strength === "3"){
            var coldBrew = document.getElementById("cold-brew-coffee");
            coldBrew.scrollIntoView();
            //point to cold brew
        }
        else {
            var chemexIced = document.getElementById("chemex-iced-coffee");
            chemexIced.scrollIntoView();
            //point to Chemex iced
        }
    }
    else if (surveyResults.strength === "3"){
        if (surveyResults.cream === "3"){
            var mokaPot = document.getElementById("moka-pot-espresso");
            mokaPot.scrollIntoView();
            //point to moka pot
        }
        else if (surveyResults.cream === "2"){
            var handpresso = document.getElementById("handpresso-espresso");
            handpresso.scrollIntoView();
            //point to handpresso
        }
        else if (surveyResults.cream === "1"){
            var frenchPress = document.getElementById("french-press");
            frenchPress.scrollIntoView();
            //point to french press
        }
    }
    else if (surveyResults.strength === "2"){
        if (surveyResults.cream === "1"){
            var aeroPressLatte = document.getElementById("aeropress-latte");
            aeroPressLatte.scrollIntoView();
            //point to AeroPress Latte
        }
        else {
            var aeroPressCoffee = document.getElementById("aeropress-coffee");
            aeroPressCoffee.scrollIntoView();
            //point to AeroPress Coffee
        }
    }
    else if (surveyResults.strength === "1"){
        if (surveyResults.cream === "3"){
            var chemex = document.getElementById("chemex-pour-over");
            chemex.scrollIntoView();
            //point to Chemex Pour over
        }
        else {
            var v60 = document.getElementById("pour-over-coffee");
            v60.scrollIntoView();
            //point to V60
        }
    }
    else {
        v60.scrollIntoView();
        //point to V60
    }
};
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
    saveDataLocalStorage(stringifyData(surveyResults));
    surveyLightbox.classList.add('hidden');
    suggestContent(surveyResults);
    

});



var stringifyData = function (data) {
    var stringifiedData = JSON.stringify(data);
    return stringifiedData;
};

var saveDataLocalStorage = function (stringifiedData) {
    localStorage.setItem('survey', stringifiedData);
};

var parseLocalStorage = function() {
    var retrievedStorage = localStorage.getItem('survey');
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
        var signinLightbox = document.querySelector('[class="signin-lightbox-container"]');
        signinLightbox.classList.add('visible');
    }
});

var checkForSurvey = function () {
    if (parseLocalStorage() !== null) {
        var surveyLightbox = document.querySelector('[class="lightbox-questionnaire-container"]')
        surveyLightbox.classList.add('hidden');
    }
}

checkForSurvey();

var displayBlogPosts = function (retrievedBlogPosts) {
    retrievedBlogPosts.forEach( function (post) {
        var blogPostsSection = document.querySelector('[class="blog-posts-section"]');
        var blogPostContainer = document.createElement('li');
        var blogPostLink = document.createElement('a');
        var blogAuthor = document.createElement('p');

        blogPostLink.classList.add('blog-post-link');
        blogPostLink.textContent = post.title;

        blogAuthor.classList.add('blog-post-author');
        blogAuthor.textContent = 'A blog post by ' + post.author.displayName;

        blogPostContainer.classList.add('blog-post-container');

        blogPostLink.textContent = post.title;
        blogPostLink.setAttribute('href', post.url);
        blogPostContainer.appendChild(blogPostLink);
        blogPostContainer.appendChild(blogAuthor);
        blogPostsSection.appendChild(blogPostContainer);
    })
};
var eventsRow = function(events) {
    var eventList = document.createElement('li')
    var url = document.createElement('a')
    var descripBox = document.createElement('div')
    var dateBox = document.createElement('div')
    var titleBox = document.createElement('div')

    url.classList.add('anchorTag')
    url.setAttribute('href', events.url)
    url.target = ('_blank')
    titleBox.textContent =  events.name.text.substr(0,120)
    descripBox.textContent = events.description.text.substr(0,120)
    dateBox.textContent = events.start.local

    var description = events.description.text
    descripBox.addEventListener('click', function() {
        descripBox.textContent = description
    })
    eventList.classList.add('single-event-container')
    titleBox.classList.add('title-container')
    descripBox.classList.add('descrip-container')
    dateBox.classList.add('date-container')
    
    var events = document.querySelector('.coffeeevents')
    url.appendChild(titleBox)
    url.appendChild(descripBox)
    url.appendChild(dateBox)
    eventList.appendChild(url)
    events.appendChild(eventList)
}
$.ajax('https://www.eventbriteapi.com/v3/events/search/?q=coffee+&sort_by=best&location.address=Atlanta%2C+GA&location.within=40mi&categories=110&include_unavailable_events=on&token=7TWTF7476W67E2AALYCA', {
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

var retrieveBlogPosts = function () {
    $.ajax('https://www.googleapis.com/blogger/v3/blogs/22044142/posts?key=AIzaSyAyiHkRXPD9lFnkjRtYN0uv1J2r8eOZxOA', {
        success: function(data) {
            console.log(data);
            var retrievedData = data;
            var dataValues = Object.values(retrievedData);
            retrievedBlogPosts = dataValues[2];
            console.log(retrievedBlogPosts);
            displayBlogPosts(retrievedBlogPosts);
        }
    });
};

retrieveBlogPosts();