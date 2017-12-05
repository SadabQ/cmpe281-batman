
$('#search').on('click', function (event) {
    event.preventDefault();
    var searchString = $('#s').val();
    console.log("Value of search strng",searchString);
});

var url = "/search/{{searchString}}";
//console.log("text is", text);
document.getElementById("search").href = url;
