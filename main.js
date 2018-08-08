var userProfile = {displayName: '', email: '', photoUrl: '', uid: ''};
var retrievedBlogPosts = [];

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
        var signinLightbox = document.querySelector('[class="signin-lightbox-container"]');
        signinLightbox.classList.add('visible');
    }
});


console.log(parseLocalStorage());

if (parseLocalStorage() !== null) {
    var surveyLightbox = document.querySelector('[class="lightbox-questionnaire-container"]')
    surveyLightbox.classList.add('hidden');
}




console.log(retrievedBlogPosts);

var displayBlogPosts = function (retrievedBlogPosts) {
    retrievedBlogPosts.forEach( function (post) {
        var blogPostsSection = document.querySelector('[class="blog-posts-section"]');
        var blogPostContainer = document.createElement('li');
        var blogPostTitle = document.createElement('h3');
        var blogPostContent = document.createElement('p');
        var blogPostTest = document.createElement('body');
        var blogPostLink = document.createElement('a');

        blogPostTitle.textContent = post.title;
        blogPostContent.textContent = post.content;
        blogPostLink.textContent = post.title;
        blogPostLink.setAttribute('href', post.url)
        blogPostContainer.appendChild(blogPostTitle);
        blogPostContainer.appendChild(blogPostLink);
        blogPostsSection.appendChild(blogPostContainer);
    })
};

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