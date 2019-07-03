function genList(){

    var $genres = $('#genres');

    $.ajax({
        type:'GET',
        url:'/books/genres',
        success: function(data){
            $.each(data, function(i,genre){

                // $genres.append('<img class="singleI" src=""> name:'+genre.name+' - <br> </div>');
                $genres.append('<div class="col-12 col-md-6 col-lg-3 genre"><img class="singleI" src="../assets/img/gen/'+genre.name+'.jpg"><a href="booksList.html?type=genre&name='+genre.name+'"><span>'+genre.name+'</span> </a></div>');
            });
        }
    });


};

function themList(){

    var $them = $('#themes');

    $.ajax({
        type:'GET',
        url:'/books/themes',
        success: function(data){
            $.each(data, function(i,theme){

                // $genres.append('<img class="singleI" src=""> name:'+genre.name+' - <br> </div>');
                $them.append('<div class="col-12 col-md-6 col-lg-3 "><h2 class="theme"><a href="">'+theme.name+'</a></h2> </div>');
            });
        }
    });


};

/*-------- single book page------*/

function bookD(id){

    var $img = $('#bookImage');
    var $title = $('#titoloLibro');
    var $aut = $('#autoreLibro');
    var $desc = $('#descLibro');
    parseInt(id);
    console.log(id);

    $.ajax({
        type:'GET',
        url:'/books/'+id+'',
        success: function(book){



            $title.append(book.title);
            $aut.append(book.authors.name);
            $img.attr('src', '../assets/img/'+book.code +'.jpg');

            $desc.html(book.description);
            $('#prezzoLibro').html('Price: '+book.price.value +' €');
            $('#bind').append('<p>'+book.binding+'</p>');
            $('#code').append('<p>'+book.code+'</p>');
            $('#publish').append('<p>'+book.publisher+'</p>');

            if(book.series!=null){
                $('#fact').append('<div id="publish"><h6>Sries: </h6><p>'+book.series+'</p></div>');
            }

        }
    });

    $.ajax({
        type:'GET',
        url:'/books/'+id+'/similar',
        success: function(data){



            $.each(data, function(i,sim){

                $('#similar').append('<div class="col-sm-6 col-md-3 col-lg-3 "><a href="Book.html?idBook='+sim.code+'"><img  src="../assets/img/'+sim.code+'.jpg" alt=""><h6>'+sim.title+'</h6></a></div>');
            });

        }
    });

    $.ajax({
        type:'GET',
        url:'/books/'+id+'/reviews',
        success: function(data){



            $.each(data, function(i,rev){

                $('#reviews').append('<div class=" col-lg-6 col-sm-12 rBox"><div class="user"><b>'+rev.username+'</b></div><div class="comment"><p>'+rev.comment+'</p></div></div>');
            });

        }
    });


};



/*------single author page-------*/
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




/*function booksList(){

    var $list = $('#books')
    $.ajax({
        type:'GET',
        url:'/books',
        success: function(data){

            $.each(data, function(i,book){

                console.log("ho caricato la lista dei");

                $list.append('<div class="col-lg-2 col-md-3 singleBook"><a href="Book.html?idBook='+book.code+'"><img src="../assets/img/'+book.code+'.jpg" alt="nnndnd"> <h6>'+ book.title +'</h6><h7>'+ book.author +'</h7></a></div>');

            });

        }

    });


};*/


$(function(){

    var $list = $('#gFilters');
    $.ajax({
        type:'GET',
        url:'/books/genres',
        success: function(data){

            $.each(data, function(i,genre){

                // console.log(genre);


                $list.append("<button class="+"btn"+" onclick="+"filterSelection('genre','"+urlString(genre.name)+"')"+">"+genre.name+"</button>");

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


function unsetF(){
    $('#activeF').html("");
    filterSelection("all", "all");
};

function filterSelection(type, name){
    
    var $list = $('#books');
    $list.html("");
    if(type=='all'|| name=='all'){

        $.ajax({
            type:'GET',
            url:'/books',
            success: function(data){

                $.each(data, function(i,book){

                    console.log("ho caricato la lista dei");
                        
                    $list.append('<div class="col-lg-2 col-md-3 singleBook"><a href="Book.html?idBook='+book.code+'"><img src="../assets/img/'+book.code+'.jpg" alt="nnndnd"> <h6>'+ book.title +'</h6><h7>'+ book.authors.name +'</h7></a></div>');

                });

            }

        });


    }else{
        
        $('#activeF').html("<div class='activeF'><p>"+type+" : "+name+"</p><h3 onclick='unsetF()'>x</h3></div>")
        $.ajax({
            type:'GET',
            url:'/books?'+type+'='+name+'',
            success: function(data){
                console.log(name);
                     
                if(data==""){
                   $list.append("<h3>Sorry at the moment we don't have books for this "+type+" </h3>");
                }else{
                    
                    

                    $.each(data, function(i,book){


                        //console.log(book);

                        $list.append('<div class="col-lg-2 col-md-3 singleBook"><a href="book.html?idBook='+book.code+'"><img src="../assets/img/'+book.code+'.jpg" alt="nnndnd"> <h6>'+ book.title +'</h6><h7>'+ book.author +'</h7></a></div>');

                    });

                }



            }

        });}




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


function eventsList(){

    var $list = $('#events');
    $.ajax({
        type:'GET',
        url:'/events',
        success: function(data){

            $.each(data, function(i,event){

                console.log(event.id);

                $list.append("<div class='event'><div class='ribbon'>"+ dateSplit(event.date,'date')+"</div> <div><a href='event.html?idEv="+event.event_id+"'><img src='../assets/img/events/"+event.event_id+".jpg' alt='Event Image'></a><div class='overlayInfo'><h5> <a href=''>"+ event.title +"</a></h5><h6> <a href=''>"+ event.book.title +"</a>, by <a href=''>"+ event.book.authors[0].name +"</a></h6><p>"+ event.place+"</p></div></div></div>");

            });

        }

    });
};

function dateSplit(text, type){

    var array = text.split("T");
    var date;
    var newDate;

    if(type=="date"){

        date=array[0].split("-");
        newDate=date[1]+"-"+date[2]+"-"+date[0];
    }else {
        date=array[1].split(":");
        newDate=date[0]+":"+date[1];

    }





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
Function for fill user Cart Item in Cart page
----------------*/

$(document).ready(function(){
  var $cart = $('#cartList');
  var $buy = $('#buyCart');
    $.ajax({
      type:'GET',
      url:'/cart',
      success: function(data){
        $.each(data, function(i, cartItem){
          if(i == 0){
            $cart.append('<div class="cartItem"><img src="../assets/img/' + cartItem.code + '.jpg" alt="' + JSON.stringify(cartItem.title) + '"><span class="cartItemInfo"><a class="cartItemTitle" href="">' + JSON.stringify(cartItem.title) + '</a> by <a class="cartItemAuthor" href="">' + JSON.stringify(cartItem.author) + '</a><p class="cartItemPrice">EUR ' + cartItem.price + '</p><a class="cartItemRemove" href="#">remove</a></span></div>');
          }
          else{
            $cart.append('<div class="cartItem"><hr><img src="../assets/img/' + cartItem.code + '.jpg" alt="' + JSON.stringify(cartItem.title) + '"><span class="cartItemInfo"><a class="cartItemTitle" href="">' + JSON.stringify(cartItem.title) + '</a> by <a class="cartItemAuthor" href="">' + JSON.stringify(cartItem.author) + '</a><p class="cartItemPrice">EUR ' + cartItem.price + '</p><a class="cartItemRemove" href="#">remove</a></span></div>');
          }
        });
        $buy.append('<p>Totale Provvisorio: EUR ' + data.total.value + '</p><button type="button" type="submit">Complete your order</button>');
      }
    });
});


/*----------------
Function for remove a book from the Cart in Cart page
        $(document).ready(function(){
          $("#cartItemRemove").click(function() {
            $item = $("#bookImage").src;
            $.ajax({
                type: "DELETE",
                url : "/cart/items/{" + $item + "}",
                data:jQuery.param({itemID:$src.val()}),
                success: function() {
                    alert("You have successful removed the book from your cart");
                },
                error: function(res) {
                    alert("Impossible to remove the book from your cart");
                }
            });
        });
    });
    ----------------*/

/*----------------
Function for OurFavourite in Home Page
----------------*/

$(function(){
    var $left = $('#leftOurFavourite');
    var $right = $('#rightOurFavourite');
    $.ajax({
        type:'GET',
        url:'/books/our-favourites',
        success: function(data){
            $.each(data, function(i, ourFavourite){
                if(i%2 == 0){
                    $left.append('<div class="ourFavourite row"><div class="col"><a href="book.html?bookId='+ourFavourite.code+'><img src="assets/img/'+ ourFavourite.code +'.jpg" alt="'+ ourFavourite.title +'"></div><div class="col"><span><p>'+ ourFavourite.title +'</p></a><p>'+ ourFavourite.author +'</p><p>'+ ourFavourite.value +'</p></span></div></div>');
                }
                else{
                    $right.append('<div class="ourFavourite row"><div class="col"><img src="assets/img/'+ ourFavourite.code +'.jpg" alt="'+ ourFavourite.title +'"></div><div class="col"><span><p>'+ ourFavourite.title +'</p><p>'+ ourFavourite.author +'</p><p>'+ ourFavourite.value  +'</p></span></div></div>');
                }
            });
        }
    });
});

/*----------------
Function for SignUp in SignUp page
----------------*/

$(document).ready(function(){

    var $mail = $('#signUpEmail');
    var $username = $('#signUpUsername');
    var $psw = $('#signUpPassword');
    $("#signUpButton").click(function () {
        $.ajax({
            type: "POST",
            url:'/user/register',
            data:jQuery.param({email:$mail.val(),username:$username.val(),password:$psw.val()}),
            success: function () {
                alert("You have successfully registered");
                window.open("../index.html", "index.html");
            },
            error: function (response) {
                alert("Sign Up failed");
            }

        });
    });
});

/*----------------
Function for LogIn in LogIn page
----------------*/

$(document).ready(function(){

    var $username = $('#logInUsername');
    var $psw = $('#logInPassword');
    $("#logInButton").click(function () {
        alert("Log In ???");
        $.ajax({
            type: "POST",
            url:'/user/login',
            data:jQuery.param({username:$username.val(),password:$psw.val()}),
            success: function () {
                alert("You have successfully logged in");
                window.open("../index.html", "index.html");
            },
            error: function (response) {
                alert("Log In failed");
            }


            
        });
    });
});

/*----------------
Function for LogOut in Home page
----------------*/

        $(document).ready(function(){

            $("#logOutButton").click(function() {
            $.ajax({
                type: "POST",
                url : "/user/logout",
                success: function() {
                    alert("You have successfully logged out");
                },
                error: function(res) {
                    alert("Impossibile to log out");
                }
            });
        });
    });





/*----------------
  Function for User Cart Item in Cart page

  $(function(){
  var $cart = $('#cartList');
  var $buy = $('#buyCart');
  $.ajax({
  type:'GET',
  url:'/cart',
  success: function(data){
  $.each(data, function(i, cartItem){
  if(i == 0){
  $cart.append('<div class="cartItem"><img src="../assets/img' + cartItem.code + '.jpg" alt="' + cartItem.title + '"><span class="cartItemInfo"><a class="cartItemTitle" href="">' + cartItem.title + '</a> by <a class="cartItemAuthor" href="">' + cartItem.author + '</a><p class="cartItemPrice">EUR ' + cartItem.price + '</p><a class="cartItemRemove" href="#">remove</a></span></div>');
}
else{
$cart.append('<div class="cartItem"><hr><img src="../assets/img' + cartItem.code + '.jpg" alt="' + cartItem.title + '"><span class="cartItemInfo"><a class="cartItemTitle" href="">' + cartItem.title + '</a> by <a class="cartItemAuthor" href="">' + cartItem.author + '</a><p class="cartItemPrice">EUR ' + cartItem.price + '</p><a class="cartItemRemove" href="#">remove</a></span></div>');

}
});
$buy.append('<p>Totale Provvisorio (' + data.length + 'articolo)</p><p>EUR ' + data + '</p><button type="button" type="submit">Complete your order</button>');
}
});
});

----------------*/



/*-------------function single event----------*/

function eventD(id){

    var $img = $('#eventImg');

    parseInt(id);
    console.log(id);

    $.ajax({
        type:'GET',
        url:'/events/'+id+'',
        success: function(eve){



            $('#title').html(eve.title);
            $('#book').append("<a href='Book.html?idBook="+eve.book.code+"'>"+eve.book.title+"</a");
            $img.attr('src', '../assets/img/events/'+id +'.jpg');

            $('#evDesc').html(eve.description);
            $('#evDate').html(dateSplit(eve.date, "date")+" / "+dateSplit(eve.date, "time"));

            $('#evPlace').html(eve.place);




        }
    });




};
