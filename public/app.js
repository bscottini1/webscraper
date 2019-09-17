
            
$("#articleButton").on("click", function(){
    console.log("It works!");
    $.getJSON("/articles", function(data){
        for (let i = 0; i < data.length; i++){
            const headline = $('<h1>')
            .append($('<a>').attr('href', data[i].url).text(data[i].headline))
            const summary = $("<p>").text(data[i].summary);
            const url = $("<a>").attr("href", data[i].url);
            url.text(headline)
            $("#articles").append(headline, summary, url);
        }
    })
});




// $(document).on("click", "p", function(){
//     $("notes").empty();
//     const thisID = $(this).attr("data-id");
//     $.ajax({
//         method: "GET",
//         url: "/articles" + thisID
//     })
//     .then(function(data){
//         console.log(data);
//         $("notes").append("<h2>" + data.title + "</h2>");
//         $("#notes").append("<input id='titleinput' name='title' >");
//         $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//         $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
//         if (data.note){
//             $("#titleinput").val(data.note.title);
//             $("#bodyinput").val(data.note.body);
//         }
//     });
// });
// $(document).on("click", "#savenote", function(){
//     const thisID = $(this).attr("data-id");
//     $.ajax({
//         method: "POST",
//         url: "/articles/" + thisID,
//         data: {
//             title: $("#titleinput").val(),
//             body: $("#bodyinput").val()
//         }
//     })
//         .then(function(data){
//         console.log(data);;
//         $("#notes").empty();
//     });
//     $("#titleinput").val("");
//     $("#bodyinput").val("");
// });