var $searchButton = $('#search-button');
var currentCard = {};

// On search btn click, run callback fn
$searchButton.on('click', function() {
  // Get input value from search bar -> pass into ajax (fetch) function to query API
  fetch($('#hash-input').val());
  // Re-Set input value from search bar after search
  $('#hash-input').val('');
});

// Pass API data to currentCard (for Handlebars reference) and invoke renderCards (to compile)
var addCard = function(data) {
  console.log('API data: ', data);
  currentCard = {
    userName: data.author.login,
    imageURL: data.author.avatar_url
  };

  renderCards();
};

// Query API with jSON AJAX
var fetch = function(query) {
  $.ajax({
    method: "GET",
    url: "https://api.github.com/repos/facebook/react/commits/" + query,
    dataType: "json",
    // If successful, call addCard on data returned from API
    success: function(data) {
      addCard(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

// Pass API data from currentCard obj to Handlebars template, compile, and append to DOM for display
var renderCards = function() {
  var source = $('#card-template').html();
  var template = Handlebars.compile(source);
  var newHTML =template(currentCard)

  $('.display-area').append(newHTML);
}

