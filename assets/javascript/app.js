var gifs = ["Cats", "Dogs", "Frog", "NBA"];     //Default buttons 
var numberGifs = 10;


function displayGifimage() {

    var gif = $(this).attr("data-name");     // "this" button that you press will be the gif
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=7Rs4QaXgUVWvHB0kweSOc66Z9IzPloXF&tag=" + gif;

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
    
    // The gif from the textbox is then added to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
    });

    // Adding click event listeners to all elements with a class of "gif"
    $(document).on("click", ".gif", displayGifimage);

    // Calling the renderButtons function to display the initial buttons
    renderButtons();

    $("#gif-input").val("");


var generate = function(docs) {
    for(var i = 0; i < 10; i++) {
    displayGifimage();
        // contentdiv as a container
        var contentDiv = $("<div>");
        contentDiv.addClass("card border-secondary");
        // Append the rating to the top of the gif
        var img = $("<img>");
        img.addClass("card-img-top p-2 border-secondary image-fluid image");
        img.attr("src", docs.fixed_height_small_still_url)
        img.attr("state", "still");
        img.attr("animated", docs.fixed_height_small_url);
        img.attr("still", docs.fixed_height_small_still_url);
        // Append the gif from its URL
        var cardBody = $("<div>");
        cardBody.addClass("card-body")

        var rating = $("<h5>");
        rating.addClass("card-title");
        rating.html("Rating: " + docs.rating);

        cardBody.append(rating);

    
        // Append the contentdiv
        contentDiv.append(img, cardBody);
        $("#gifs-view").append(contentDiv);
    };
};

function animation() {
    $(".image").off("click");
    $(".image").on("click", function() {
        var animationState = $(this).attr("state");
        if(animationState === "still") {
            $(this).attr("src", $(this).attr("animated"))
            $(this).attr("state", "animated");
        }
        else {
            $(this).attr("src", $(this).attr("still"))
            $(this).attr("state", "still");
        }
    });
};




