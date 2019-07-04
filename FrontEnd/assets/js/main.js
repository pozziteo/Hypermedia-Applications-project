function genList(){

    var $genres = $('#genres');

    $.ajax({
        type:'GET',
        url:'/books/genres',
        success: function(data){
            $.each(data, function(i,genre){

                // $genres.append('<img class="singleI" src=""> name:'+genre.name+' - <br> </div>');
                $genres.append('<div class="col-12 col-md-6 col-lg-3 genre"><img class="singleI" src="../assets/img/gen/'+genre.name+'.jpg"><a href="BooksList.html?type=genre&name='+genre.name+'"><span>'+genre.name+'</span> </a></div>');
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
                $them.append('<div class="col-12 col-md-6 col-lg-3 "><h2 class="theme"><a href="BooksList.html?type=theme&name='+theme.name+'">'+theme.name+'</a></h2> </div>');
            });
        }
    });


};




function autList(){

    var $author = $('#authors');

    $.ajax({
        type:'GET',
        url:'/authors',
        success: function(data){
            $.each(data, function(i,aut){

                // $genres.append('<img class="singleI" src=""> name:'+genre.name+' - <br> </div>');
                $author.append('<div class="col-12 col-md-6 col-lg-3 auts"><a href="Author.html?autId='+aut.author_id+'"><img class="autI" src="../assets/img/authors/'+aut.author_id+'.jpg"><span>'+aut.name+'</span> </a></div>');
            });
        }
    });


};


/*-------- single book page------*/

function bookD(id){
    var $breads = $('#breads');
    var $pagetitle = $('#pagetitle');
    var $img = $('#bookImage');
    var $title = $('#titoloLibro');
    var $aut = $('#autoreLibro');
    var $desc = $('#descLibro');
    var $button = $('#addToCartButton');

    parseInt(id);
    //console.log(id);

    $.ajax({
        type:'GET',
        url:'/books/'+id+'',
        success: function(book){

            $('#semAut').attr('href','Author.html?autId='+book.authors[0].author_id+'');

            $pagetitle.html(book.title);
            $breads.append("<b>"+book.title+"</b>");
            $title.append(book.title);
             $aut.html("");
            $aut.append(book.authors[0].name);
            $aut.attr('href','Author.html?autId='+book.authors[0].author_id+'');
            $('#genB').html(book.genre);
            $('#genB').attr('href','BooksList.html?type=genre&name='+book.genre+'');

            $('#themB').html(book.theme);
            $('#themB').attr('href','BooksList.html?type=theme&name='+book.theme+'');
            $img.attr('src', '../assets/img/'+book.code +'.jpg');

            $desc.html(book.description);
            $('#prezzoLibro').html('Price: '+book.price.value +' €');
            $('#bind').append('<p>'+book.binding+'</p>');
            $('#code').append('<p>'+book.code+'</p>');
            $('#publish').append('<p>'+book.publisher+'</p>');
            $button.attr('onclick', 'addToCartID(' + id + ')')

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
function authorD(id){
    var $breads=$('#breads');
    var $pagetitle = $('#pagetitle');
    parseInt(id);
    $.ajax({
        type:'GET',
        url:'/authors/'+id+'',
        success: function(author){

            // console.log(author);
            $pagetitle.html(author.name);
            $breads.append("<b>"+author.name+"</b>")
            $('#autName').html(author.name);

            $('#authorPic').attr('src', '../assets/img/authors/'+author.author_id +'.jpg');

            $('#bio').html(author.biography);


        }
    });


};




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


                $list.append("<button class='dropdown-item' onclick="+"filterSelection('genre','"+urlString(genre.name)+"')"+">"+genre.name+"</button>");

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



                    $list.append('<div class="col-lg-3 col-md-3 singleBook"><a href="Book.html?idBook='+book.code+'"><img class="book" src="../assets/img/'+book.code+'.jpg" alt="nnndnd"> <h6>'+ book.title +'</h6><h7>'+ book.authors[0].name +'</h7></a></div>');

                });

            }

        });


    }else{

        $('#activeF').html("<button onclick='unsetF()'class=' btn btn-success '><p>"+type+" : "+name+" x</p></button>")
        $.ajax({
            type:'GET',
            url:'/books?'+type+'='+name+'',
            success: function(data){
                //console.log(name);

                if(data==""){
                    $list.append("<h3 class='sorry'>Sorry at the moment we don't have books for this "+type+" </h3>");
                }else{



                    $.each(data, function(i,book){


                        // console.log(book);

                        $list.append('<div class="col-lg-3 col-md-3 singleBook"><a href="Book.html?idBook='+book.code+'"><img class="book" src="../assets/img/'+book.code+'.jpg" alt="nnndnd"> <h6>'+ book.title +'</h6><h7>'+ book.author +'</h7></a></div>');

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
     $list.html("");
    $.ajax({
        type:'GET',
        url:'/events',
        success: function(data){

                $('#evfall').addClass("selected");
                $('#evfmon').removeClass("selected");

                $.each(data, function(i,event){

                    $list.append("<div class='event'><div class='ribbon'>"+ dateSplit(event.date,'date')+"</div> <div><a href='Event.html?idEv="+event.event_id+"'><img src='../assets/img/events/"+event.event_id+".jpg' alt='Event Image'></a><div class='overlayInfo'><h5> <a href=''>"+ event.title +"</a></h5><h6> <a href=''>"+ event.book.title +"</a>, by <a href=''>"+ event.book.authors[0].name +"</a></h6><p>"+ event.place+"</p></div></div></div>");

                });



        }

    });
};


function eventsThisMonth(){


    $('#evfall').addClass("selected");
    $('#evfmon').removeClass("selected");

    var $list = $('#events');
    $list.html("");
    $.ajax({
        type:'GET',
        url:'/events/this-month',
        success: function(data){



            //if(data!=""){

                $.each(data, function(i,event){


                    $list.append("<div class='event'><div class='ribbon'>"+ dateSplit(event.date,'date')+"</div> <div><a href='Event.html?idEv="+event.event_id+"'><img src='../assets/img/events/"+event.event_id+".jpg' alt='Event Image'></a><div class='overlayInfo'><h5> <a href=''>"+ event.title +"</a></h5><h6> <a href=''>"+ event.book.title +"</a>, by <a href=''>"+ event.book.authors[0].name +"</a></h6><p>"+ event.place+"</p></div></div></div>");

                });
            /*}else{
                $list.html("<h3 class='sorry'>There aren't Events this month</h3>");
            }*/


        }

    });
};






function dateSplit(text, type){

    var array = text.split("T");
    var date;
    var newDate;

    if(type=="date"){

        date=array[0].split("-");
        newDate=date[2]+"-"+date[1]+"-"+date[0];
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
    var number;
    $.ajax({
        type:'GET',
        url:'/books/best-sellers',
        success: function(data){
            $.each(data, function(i, bestSeller){
                number = parseInt(i);
                if(i == 0){
                    $list.append('<a href="pages/book.html?idBook='+bestSeller.code+'"><div id="firstBestSeller" class="bestSeller row"><div class="col-4"><img src="assets/img/'+ bestSeller.code +'.jpg" alt="'+ bestSeller.title +'"></div><div class="col-7"><p id="firstBestSellerNumber">#1</p><span><p>'+ bestSeller.title +'</p><p>'+ bestSeller.authors[0].name +'</p><p>'+ bestSeller.price.value + ' ' + bestSeller.price.currency +'</p><span></div></div></a>');
                }
                else{
                    $list.append('<a href="pages/book.html?idBook='+bestSeller.code+'"><div class="bestSeller"><p class="bestSellerNumber">#' + (number + 1) + '</p><span><p>'+ bestSeller.title +'</p><p>'+ bestSeller.authors[0].name +'</p><p>'+ bestSeller.price.value + ' ' + bestSeller.price.currency +'</p></span></div></a>');
                }
            });
        }
    });
});

/*----------------
Function for fill user Cart Item in Cart page
----------------*/


$(function(){
  var $cartTitle = $('#cartTitle');
  var $cart = $('#cartList');
  var $buy = $('#buyCart');
  var books;
  var total;
  $.ajax({
    type:'GET',
    url:'/cart',
    success: function(data){
      if(data.books == null){
        $cartTitle.html('<p>Your cart is empty</p><p>Add element to your cart to buy them</p>');
        $buy.html('<p>Totale Provvisorio: 0 eur</p>');
      }
      else{
        books = data.books;
        total = data.total;
        $.each(books, function(i, cartItem){
          if(i == 0){
            $cart.append('<div class="cartItem"><img src="../assets/img/' + cartItem.code + '.jpg" alt="' + cartItem.title + '"><span class="cartItemInfo"><a class="cartItemTitle" href="#">' + cartItem.title + '</a> by <a class="cartItemAuthor" href="#">' + cartItem.authors[0].name + '</a><p class="cartItemPrice"> ' + cartItem.price.value + ' ' + cartItem.price.currency + '</p><a id="' + cartItem.code + '" class="cartItemRemove" href="" onclick="removeFromCart(' + cartItem.code + ')">remove</a></span></div>');
          }
          else{
            $cart.append('<div class="cartItem"><hr><img src="../assets/img/' + cartItem.code + '.jpg" alt="' + cartItem.title + '"><span class="cartItemInfo"><a class="cartItemTitle" href="">' + cartItem.title + '</a> by <a class="cartItemAuthor" href="">' + cartItem.authors[0].name + '</a><p class="cartItemPrice">EUR ' + cartItem.price.value + ' ' + cartItem.price.currency + '</p><a id="' + cartItem.code + '" class="cartItemRemove" href="" onclick="removeFromCart(' + cartItem.code + ')">remove</a></span></div>');
          }
        });
        $buy.html('<p>Totale Provvisorio: ' + total.value + ' ' + total.currency + '</p><button type="button" type="submit" onclick="clearCart()">Complete your order</button>');
      }
    }
  });
});

/*----------------
Function for clear user Cart Item in Cart page
----------------*/

function clearCart() {
  $.ajax({
    type: 'PUT',
    url : '/cart/items',
    success: function() {
      alert("Your order has been placed");
    },
    error: function(res) {
      alert("Impossible to complet you order");
    }
  });
};


/*----------------
Function for remove a book from the Cart in Cart page
----------------*/

function removeFromCart(id) {
  $.ajax({
    type: 'DELETE',
    url : '/cart/items/'+id,
    data: {itemID:parseInt(id)},
    success: function() {
      alert("You have successful removed the book from your cart");
    },
    error: function(res) {
      alert("Impossible to remove the book from your cart");
    }
  });
};

/*----------------
Function for add a book to the Cart in Book page
----------------*/
function addToCartID(id){

    $.ajax({
        type:'POST',
        url:'/cart/items',
        data:JSON.stringify(parseInt(id, 10)),
        success: function(){
            alert("You added an element to your cart");
        },
        error: function(data){
            alert("Impossible to add this element to your cart");
        }
    });

};

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
                  $left.append('<a href="pages/book.html?idBook='+ourFavourite.code+'""><div class="ourFavourite row"><div class="col"><img src="assets/img/'+ ourFavourite.code +'.jpg" alt="'+ ourFavourite.title +'" ></div><div class="col"><span><p>'+ ourFavourite.title +'</p><p>'+ ourFavourite.authors[0].name +'</p><p>'+ ourFavourite.price.value +'</p></span></div></div></a>');

                }
                else{
                  $right.append('<a href="pages/book.html?idBook='+ourFavourite.code+'""><div class="ourFavourite row"><div class="col"><img src="assets/img/'+ ourFavourite.code +'.jpg" alt="'+ ourFavourite.title +'" ></div><div class="col"><span><p>'+ ourFavourite.title +'</p><p>'+ ourFavourite.authors[0].name +'</p><p>'+ ourFavourite.price.value +'</p></span></div></div></a>');

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


function logIn() {
    var $username = $('#logInUsername');
    var $psw = $('#logInPassword');
    $.ajax({
        type: "POST",
        url:'/user/login',
        data:jQuery.param({username:$username.val(),password:$psw.val()}),
        success: function () {
            alert("You have successfully logged in");
            window.open("../index.html", "index.html");
        },
        error: function (response) {
            alert("Log In failed\nYou are probably already logged");
        }

    });

};



/*----------------
Function for LogOut in Home page
----------------*/

function logOut() {
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
};


/*-------------function single event----------*/

function eventD(id){
    var $breads = $('#breads');
    var $img = $('#eventImg');
    var $pagetitle = $('#pagetitle');
    parseInt(id);


    $.ajax({
        type:'GET',
        url:'/events/'+id+'',
        success: function(eve){


            $pagetitle.html(eve.title);
            $breads.append("<b>"+eve.title+"</b>");
            $('#title').html(eve.title);
            $('#book').append("<a href='Book.html?idBook="+eve.book.code+"'>"+eve.book.title+"</a");
            $img.attr('src', '../assets/img/events/'+id +'.jpg');

            $('#evDesc').html(eve.description);
            $('#evDate').html(dateSplit(eve.date, "date")+" / "+dateSplit(eve.date, "time"));

            $('#evPlace').html(eve.place);




        }
    });




};
