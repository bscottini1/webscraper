

            
// $("#articleButton").on("click", function(){
//     console.log("It works!");
// });

function scrape(){
    $("#articles").empty()
    
    $.get("/scrape", loadPage)
}
scrape();

function loadPage(){
    $.getJSON("/articles", function(data){
        for (let i = 0; i < data.length; i++){
            const headline = $('<h1>')
            .append($('<a>').attr('href', data[i].url).text(data[i].headline))
            const summary = $("<p>").text(data[i].summary);
            const url = $("<a>").attr("href", data[i].url);
            url.text(headline)
            $("#articles").append(headline, summary);
        }
    })
}
// loadPage();


