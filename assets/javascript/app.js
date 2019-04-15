var gifs = ["Cats", "Dogs", "Frog", "NBA"];     //Default buttons 
var query = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=H1yyu4os8QNVJ1Mn2kcPzpeypAeQYV1H";
var numberGifs = 10;


function displaygifInfo() {

    var gif = $(this).attr("data-name");     // "this" button that you press will be the gif
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=H1yyu4os8QNVJ1Mn2kcPzpeypAeQYV1H";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        docs = response.data;
        console.log(docs);
        generate(docs);
    });
};


    // Function for displaying gif data
function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the gifs of movies
    for (var i = 0; i < gifs.length; i++) {

        var a = $("<button>");
        a.addClass("gif");
        a.addClass("btn");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a);
    };
};

    // This function handles events where the add movie button is clicked
$("#user-input").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();
    
    // The movie from the textbox is then added to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    });

    // Adding click event listeners to all elements with a class of "gif"
    $(document).on("click", ".gif", displaygifInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();


var generate = function(docs) {
    for(i = 0; i < numberGifs; i++) {
    
        // contentdiv as a container
        var contentDiv = $("<div>");
    
        // Append the rating to the top of the gif
        var ratingDiv = $("<div>");
        ratingDiv.text("Rating: " + docs[i].rating);
    
        // Append the gif from its URL
        var giphyDiv = $("<img>");
        giphyDiv.attr("src", docs[i].images.fixed_height.url);
    
        // Append all the divs into the contentDiv
        contentDiv.append(ratingDiv, giphyDiv);
    
        // Append the contentdiv
        $("#gifs-view").append(contentDiv);
    };
};


$.ajax({
    url: query,
    method: "GET"
  }).then(function(response) {
    console.log(response);
});