

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
        url:'/v2/books/9780743477154',
        success: function(book){

            console.log(book);

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

    var $list = $('#gFilters')
    $.ajax({
        type:'GET',
        url:'/books/genres',
        success: function(data){

            $.each(data, function(i,genre){

                console.log(genre);

                $list.append('<button class="btn" onclick="filterSelection('+genre.name+')">'+genre.name+'</button>');

            });                   

        }

    });


});

$(function(){

    var $list = $('#tFilters')
    $.ajax({
        type:'GET',
        url:'/books/themes',
        success: function(data){

            $.each(data, function(i,theme){

                console.log(theme);

                $list.append('<button class="btn" onclick="filterSelection('+theme.name+')">'+theme.name+'</button>');

            });                   

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

                console.log(books);

                $list.append('<div class="col-2 singleBook"><a href=""><img src="../assets/img/'+book.code+'.jpg" alt="nnndnd"> <h6>'+ book.title +'</h6><h7>'+ book.author +'</h7></a></div>');

            });                   

        }

    });


});




$(function filterSelection(filter){
    var $filter=filter;
    
    console.log("ilfiltro è" + $filter);
    var $list = $('#books')
    $.ajax({
        type:'GET',
        url:'/books?genre='+filter,
        success: function(data){

            $.each(data, function(i,book){
                

                console.log(books);

                $list.append('<div class="col-2 singleBook"><a href=""><img src="../assets/img/'+book.code+'.jpg" alt="nnndnd"> <h6>'+ book.title +'</h6><h7>'+ book.author +'</h7></a></div>');

            });                   

        }

    });


});






