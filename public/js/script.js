$(document).ready(function(){
    $("input").blur(function(){
        alert("Value: " + $("#test").val());
    });
});