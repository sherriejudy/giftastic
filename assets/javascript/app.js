let api_key = "mohzNO5atvsiXS7XdAVpUevJaoSJtEdc";

$(document).ready(function () {
  //Global Variables
  var gifs = [];
  var searchTerms = ["bubble tea", "rose", "mango", "green tea", "lychee", "jelly"];

  // START!!
  start();

  // Set up
  $("#add").on("click", function () {
    let text = $("#input").val();
    addButton(text);
  });

  // Functions
  function start() {
    // Add all buttons to screen
    for (var i = 0; i < searchTerms.length; i++) {
      addButton(searchTerms[i]);
    }
  }

  function addButton(text) {
    var btn = $("<button>");
    btn.addClass("btn");
    btn.addClass("btn-outline-secondary");
    // Adds margin of 1 on right
    btn.addClass("mr-1");
    btn.text(text);
    btn.on("click", function () {
      clearGifs();
      pullAndPlaceGifs($(this).text());
    });
    $("#buttons").append(btn);
  }

  function clearGifs() {
    $("#gifs").empty();
  }

  function pullAndPlaceGifs(searchTerm) {
    let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchTerm}&limit=10&offset=0&rating=PG13&lang=en`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      let data = response.data;
      processGifs(data);
    });
  }

  function processGifs(gifList) {
    for (var i = 0; i < gifList.length; i++) {
      var gifItem = gifList[i];
      var processedGif = {
        rating: gifItem.rating,
        animatedURL: gifItem.images.fixed_width.url,
        stillURL: gifItem.images.fixed_width_still.url
      };
      placeGif(processedGif);
    }
  }

  function placeGif(gif) {
    var card = $("<div>");
    var cardImage = $("<img>");
    var cardBody = $("<div>");
    var cardText = $("<p>");
    var smallText = $("<small>");

    card.addClass("card");
    card.attr("animating", "false");
    cardImage.addClass("card-img-top");
    cardImage.attr("src", gif.stillURL);
    cardBody.addClass("card-body");
    cardText.addClass("card-text");
    smallText.addClass("text-muted");
    smallText.text("Rating: " + gif.rating);

    cardText.append(smallText);
    cardBody.append(cardText);
    card.append(cardImage);
    card.append(cardBody);

    card.on("click", function () {
      if ($(this).attr("animating") === "false") {
        $(this).attr("animating", "true");
        $(this)
          .find("img")
          .attr("src", gif.animatedURL);
      } else {
        $(this).attr("animating", "false");
        $(this)
          .find("img")
          .attr("src", gif.stillURL);
      }
    });
    $("#gifs").append(card);
  }
});
