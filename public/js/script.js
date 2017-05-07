$(document).ready(function(){
    $("#search-btn").click(function(){
       
        var id = $(this).children(":selected").attr("value");
        alert("Du tryckte: " + $("#select-search").val());
        alert("Du skrev: " + $("#search-word").val());
    
    });
    

    

});





