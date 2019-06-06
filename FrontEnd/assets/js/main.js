

$(function(){
    
    var $genres = $('#genres');
    
    $.ajax({
        type:'GET',
        url:'/genre',
        success: function(data){
        $.each(data, function(i,genre){
        
        $genres.append('<div> name:'+genre.name+'</div>');
    });
    }
    });
    
    
});