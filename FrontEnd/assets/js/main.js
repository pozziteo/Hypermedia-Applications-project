$(function(){

    var $genres = $('#genres');

    $.ajax({
        type:'GET',
        url:'/books/genres',
        success: function(data){
            $.each(data, function(i,genre){

                // $genres.append('<img class="singleI" src=""> name:'+genre.name+' - <br> </div>');
                $genres.append('<div class="col-3 genre"><img class="singleI" src="../assets/img/gen/'+genre.name+'.jpg"><a href=""><span>'+genre.name+'</span> </a></div>');
            });
        }
    });


});



$(function(){

    var $img = $('#bookImage');
    var $title = $('#titoloLibro');
    var $aut = $('#autoreLibro');
    var $desc = $('#descLibro');



    $.ajax({
        type:'GET',
        url:'/books/9780743477154',
        success: function(book){

          // console.log(book);

            $title.append(book.title);
            // $aut.append(book.au)
            $img.attr('src', '../assets/img/'+book.code +'.jpg');

            $desc.html(book.description);
            $('#prezzoLibro').html('Price: '+book.price.value +' €');

        }
    });


});


$(function(){

    $.ajax({
        type:'GET',
        url:'/authors/11',
        success: function(author){

            console.log(author);

            $('#autName').html(author.name);

            $('#authorPic').attr('src', '../assets/img/authors/'+author.author_id +'.jpg');

            $('#bio').html(author.biography);


        }
    });


});




$(function(){

    var $list = $('#books')
    $.ajax({
        type:'GET',
        url:'/books',
        success: function(data){

            $.each(data, function(i,book){

                //console.log(books);

                $list.append('<div class="col-2 singleBook"><a href=""><img src="../assets/img/'+book.code+'.jpg" alt="nnndnd"> <h6>'+ book.title +'</h6><h7>'+ book.author +'</h7></a></div>');

            });

        }

    });


});


$(function(){

    var $list = $('#gFilters');
    $.ajax({
        type:'GET',
        url:'/books/genres',
        success: function(data){

            $.each(data, function(i,genre){

               // console.log(genre);


                $list.append("<button class="+"btn"+" onclick="+"filterSelection('genre','"+genre.name+"')"+">"+genre.name+"</button>");

            });

        }

    });


});

$(function(){

    var $list = $('#tFilters');
    $.ajax({
        type:'GET',
        url:'/books/themes',
        success: function(data){

            $.each(data, function(i,theme){

               // console.log(urlString(theme.name));

                $list.append("<button class="+"btn"+" onclick="+"filterSelection('theme','"+urlString(theme.name)+"')"+">"+theme.name+"</button>");

            });

        }

    });


});


function filterSelection(type, nome){

     document.getElementById("gFilters").style.backgroundColor = "red";


    console.log(type);
    var $list = $('#books');
   // var $genre="Fatasy"
    $.ajax({
        type:'GET',
        url:'/books?'+type+'='+nome+'',
        success: function(data){

            $list.html("");

            $.each(data, function(i,book){


                //console.log(book);

                $list.append('<div class="col-2 singleBook"><a href=""><img src="../assets/img/'+book.code+'.jpg" alt="nnndnd"> <h6>'+ book.title +'</h6><h7>'+ book.author +'</h7></a></div>');

            });

        }

    });


};






function urlString(text){
    
    var array = text.split(" ");
    var newString=array[0];

    for(i=1; i< array.length; i++){

       newString+="%20"+array[i];
    }


    return newString;
};



/*----------------
Function for events page
----------------*/


$(function(){

    var $list = $('#events');
    $.ajax({
        type:'GET',
        url:'/events',
        success: function(data){

            $.each(data, function(i,event){

                console.log(event.id);

                $list.append("<div class='event'><div class='ribbon'>"+ dateSplit(event.date)+"</div> <div><a href=''><img src='../assets/img/events/"+event.event_id+".jpg' alt='Event Image'></a><div class='overlayInfo'><h5> <a href=''>"+ event.title +"</a></h5><h6> <a href=''>"+ event.book.title +"</a>, by <a href=''>"+ event.book.authors[0].name +"</a></h6><p>"+ event.place+"</p></div></div></div>");

            });

        }

    });


});

function dateSplit(text){
    
    var array = text.split("T");
    var date=array[0].split("-");
    var newDate=date[1]+"-"+date[2]+"-"+date[0];

    return newDate;
    
};


/*----------------
Function for BestSeller in Home Page
----------------*/

$(function(){
    var $list = $('#bestSellerContainer');
    $.ajax({
        type:'GET',
        url:'/books/best-sellers',
        success: function(data){

            $.each(data, function(i, bestSeller){

            if(i == 0){
                $list.append('<div id="firstBestSeller" class="bestSeller row"><div class="col-4"><img src="assets/img/'+ bestSeller.code +'.jpg" alt="'+ bestSeller.title +'"></div><div class="col-7"><p id="firstBestSellerNumber">#1</p><span><p>'+ bestSeller.title +'</p><p>'+ bestSeller.author +'</p><p>'+ bestSeller.value +'</p><span></div></div>');
            }
            else{
                $list.append('<div class="bestSeller"><p class="bestSellerNumber">#2</p><span><p>'+ bestSeller.title +'</p><p>'+ bestSeller.author +'</p><p>'+ bestSeller.value +'</p></span></div>');
                }
            });
        }
    });
});


/*----------------
Function for OurFavourite in Home Page
----------------*/

$(function(){
    var $left = $('#leftOurFavourite');
    var $right = $('#rightOurFavourite');
    $.ajax({
        type:'GET',
        url:'/books',
        success: function(data){
            $.each(data, function(i, ourFavourite){
                if(i%2 == 0){
                    $left.append('<div class="ourFavourite row"><div class="col"><img src="assets/img/'+ ourFavourite.code +'.jpg" alt="'+ ourFavourite.title +'"></div><div class="col"><span><p>'+ ourFavourite.title +'</p><p>'+ ourFavourite.author +'</p><p>'+ ourFavourite.value +'</p></span></div></div>');
                }
                else{
                    $right.append('<div class="ourFavourite row"><div class="col"><img src="assets/img/'+ ourFavourite.code +'.jpg" alt="'+ ourFavourite.title +'"></div><div class="col"><span><p>'+ ourFavourite.title +'</p><p>'+ ourFavourite.author +'</p><p>'+ ourFavourite.value  +'</p></span></div></div>');
                }
            });
        }
    });
});
