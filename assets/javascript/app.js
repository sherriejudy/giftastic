var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});

/////////////////////////
var api = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=cats";

function setup() {
  noCanvas();
  var url = api + apiKey + query;
  loadJSON(url, gotData);
}

function gotData(giphy) {
  for (var i = 0; i < giphy.data.length; i++) {
    createImg(giphy.data[i].images.original.url);
  }
}
