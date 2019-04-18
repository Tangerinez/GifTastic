var gifs = ["Cats", "Dogs", "Frog", "NBA"];     //Default buttons 
var query = "https://api.giphy.com/v1/gifs/random?api_key=H1yyu4os8QNVJ1Mn2kcPzpeypAeQYV1H&tag=Penguin";   // test query
var numberGifs = 10;        // number of Gifs to be displayed

var gifContainer = $("<div>");        // container for all the gifs
gifContainer.addClass("container");         

var containerTitle = $("<div>");          //each gif's title container
containerTitle.html($(this).attr("data-name"));
 
var imageDiv = $("<div>");           // each gif's image div
imageDiv.addClass("card-columns card-spacing");

gifContainer.append(containerTitle,imageDiv);     // append title and image into each gifContainer
    $("#gifs-view").prepend(gifContainer);      // prepend the whole container in the area where the gifs go


function displaygifInfo() {         // function that loops through the ajax call 10 times to generate 10 *random* gifs

    var gif = $(this).attr("data-name");     // "this" button that you press will be the gif
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=H1yyu4os8QNVJ1Mn2kcPzpeypAeQYV1H&tag=" + gif;

    for (var i = 0; i< numberGifs; i++) {         // loops through ajac call 10 times
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        docs = response.data;       // .data is the first property in the giphy object that is pulled
        console.log(docs);     // check
        generate(docs);       // after each pull, call this function to create the card for that gif
    });
};
};


    
function renderButtons() {     // Function for displaying gif data

    $("#buttons-view").empty();       // deletes anything currently in this div
    // Loops through the gifs of movies
    for (var i = 0; i < gifs.length; i++) {        // iterates through gif array 

        var a = $("<button>");        // creates button
        a.addClass("gif");
        a.addClass("btn");
        a.attr("data-name", gifs[i]);      // adds a data name to that button based off of what the user types
        a.text(gifs[i]);      // give the button the same name as the data name
        $("#buttons-view").append(a);      // append the button to the button container
    };
};

    
$("#user-input").on("click", function(event) {            // This function handles events where the add movie button is clicked
    event.preventDefault();         // This line of code will grab the input from the textbox

    var gif = $("#gif-input").val().trim();         // capture the user's input
    
    
    gifs.push(gif);           // The gif from the textbox is then added to our array

    
    renderButtons();          // Calling renderButtons which handles the processing of our gif array
    
    $("#gif-input").val("");         // Clears input field after each user input
    });


$(document).on("click", ".gif", displaygifInfo);             // Adding click event listeners to all elements with a class of "gif"


renderButtons();             // Calling the renderButtons function to display the initial buttons


var generate = function(docs) {             // function to generate a card for each gif
    
        
        var contentDiv = $("<div>");      // card container
        contentDiv.addClass("card border-secondary");           // bootstrap classes for cards
        // Append the rating to the top of the gif
        var img = $("<img>");             // image tag
        img.addClass("card-img-top p-2 border-secondary image");         // bootstrap classes for spacing
        img.attr("src", docs.fixed_height_small_still_url)          // path for the gif url
        img.attr("state", "still");                 // gif will have an initial state of still
        img.attr("animated", docs.fixed_height_small_url);         // animated url
        img.attr("still", docs.fixed_height_small_still_url);       // still url
        
        var cardBody = $("<div>");      // div that will hold the title   
        cardBody.addClass("card-body");       

        var title = $("<h5>");         // creating title with h5 tag
        title.addClass("card-title");
        title.html(docs.title);          // path for gif title

        cardBody.append(title);         // appending title with h5 tag to the cardBody div

        contentDiv.append(img, cardBody);          // append the image and cardBody to the card container
        $(imageDiv).append(contentDiv);           // append the card div to the larger overall image div

};

function animation() {
    $(".image").on("click", function() {
        var animationState = $(this).attr("state");
        if (animationState === "still") {
            $(this).attr("src", $(this).attr("animated"))
            $(this).attr("state", "animated");
        }
        else {
            $(this).attr("src", $(this).attr("still"))
            $(this).attr("state", "still");
        };
    });
};

