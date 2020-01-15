console.log("Let's get this party started!");

$(function() {

    // Declare variable that identifies user input for search term
    $('#submit-button').on("click", async function(e){
        e.preventDefault();
        let searchTerm = $('#giphy').val();
        $('#giphy').val("");
        let gif = await retrieveGiphy(searchTerm)
        displayGiphy(gif);
    });

    async function retrieveGiphy(searchTerm){
        // Make an AJAX request to the to the Giphy API and return a single GIF
        let response = await axios.get(
            "http://api.giphy.com/v1/gifs/search", {params: {
                q: searchTerm, 
                api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym" 
            }});

        let gifArr = response.data.data;
        let randomGifIndex = Math.floor(Math.random()*gifArr.length);
        let gifObj = gifArr[randomGifIndex];

        return gifObj;
    }

    function displayGiphy(gifObj){
        
        // Don't add to DOM if search does not yield any results.
        if (!gifObj){
            return;
        }

        let gifImage = gifObj.images.fixed_height.url;

        // Create div of giphy
        let newGif = `<div class='giphy-wrapper'> 
                        <img  src=${gifImage} alt="gif"> 
                        </div>`;

        // Add giphy div to giphy container
        $('.giphy-container').append(newGif);
    }
    
    // Remove all gifs if remove button is clicked.
    $('#remove-button').on("click", function(e){
        e.preventDefault();
        $('.giphy-container').empty();
    });
    
});





