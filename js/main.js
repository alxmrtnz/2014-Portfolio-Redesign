// A $( document ).ready() block.
$( document ).ready(function() {

    var win = $(window);
    var intro = $('section.intro');
    var work = $('section.work');



    //INTRO HEIGHT DETERMINATION///////////////////////////
    //used to determine how tall the intro is and where the color change
    //for the work section should begin
    var introHeight = win.height();
    intro.css('height', introHeight);
    //work.css('margin-top', introHeight);

    var fromRight = (win.width() - $('.workContainer').width()) / 2;
    $(window).on('resize', function(){
        introHeight = win.height();
        intro.css('height', introHeight);
        //work.css('margin-top', introHeight);


    });
    //////////////////////////////////////////////////////





    //BUTTON LINK COLOR CHANGE///////////////////////////////////////
    //JS function for changing color of link text in buttons. Had to do this because the color of the text depends on the current background color
    $( ".btn a" ).mouseenter(function() {
        var BGColor = $('body').css('background-color');
        $(this).css('color', BGColor);

    });

    $( ".btn a" ).mouseout(function() {

        $(this).css('color', '#fff');
    });
    ////////////////////////////////////////////////////////////










    //FIGURING OUT HOW TO USE DATA STORED IN TAG TO CHANGE COLORS ON SCROLL
    console.log("Length(): " + $('.workPiece').length);
    console.log("Length(): " + $('.workPiece').size());


    console.log("Color: " + $("article[data-color]").data("color"));



    var my_array = new Array();//create an array
    var count = 0;//used for looping through console.log

    //loops through each workPiece looking for it's data-color and adds it to the array, also logs it so I can see it working
    $('.workPiece').each(function(){
        my_array.push($(this).data("color"));
        console.log(my_array[count]);
        count += 1;
    });


    ////////////////////////////////////////////////////////









    //BEGIN COLOR CHANGE FUNCTION SETUP/////////////////////////////////////
    var workHeight = $('.hands').height() + 300;
    var scroll_pos = introHeight;
    console.log("height: " + (workHeight));
    var animation_begin_pos = workHeight - 500; //where you want the animation to begin

    var animation_end_pos = workHeight ; //where you want the animation to stop

    console.log("start_pos: " + animation_begin_pos);
    console.log("end_pos: " + animation_end_pos);



    //$alxBlue: rgb(56, 136, 222)
    //Hands Green: rgb(154, 184, 166)
    // OUMS Blue: rgb(101,196,229)

    var beginning_color = new $.Color( 'rgb(56, 136, 222)' ); //we can set this here, but it'd probably be better to get it from the CSS; for the example we're setting it here.
    var ending_color = new $.Color( 'rgb(154, 184, 166)' ); ;//what color we want to use in the end

    var colors = ['rgb(154, 184, 166)', 'rgb(101,196,229)'];

    /////////////////////////////////////////////////////////////////



    var description = $('.work article.workPiece.current .workPieceContent .description');
    $('.current .description').css('color', 'red');;
    $(document).scroll(function() {
       //scroll_pos = $(this).scrollTop() - introHeight;
       scroll_pos = $(this).scrollTop();
       console.log("SCROLL POS: " + scroll_pos + " >= " + "ANIMATION BEGIN: " + animation_begin_pos + " && " + scroll_pos + " <= " + animation_end_pos);





        //CHANGING BACKGROUND COLOR
       if(scroll_pos >= animation_begin_pos && scroll_pos <= animation_end_pos ) {
             //console.log( 'work scroll position: ' + scroll_pos );
            //we want to calculate the relevant transitional rgb value
            var percentScrolled = ((scroll_pos - animation_begin_pos) / ( animation_end_pos - animation_begin_pos ));
            //console.log("percentScrolled: " + percentScrolled + "scroll position:  " +scroll_pos);
            var newRed = beginning_color.red() + ( ( ending_color.red() - beginning_color.red() ) * percentScrolled );
            var newGreen = beginning_color.green() + ( ( ending_color.green() - beginning_color.green() ) * percentScrolled );
            var newBlue = beginning_color.blue() + ( ( ending_color.blue() - beginning_color.blue() ) * percentScrolled );
            var newColor = new $.Color( newRed, newGreen, newBlue );
            //console.log( newColor.red(), newColor.green(), newColor.blue() );
            $('body').animate({ backgroundColor: newColor }, 0);
            $('.titleInfo').animate({ backgroundColor: newColor }, 0);

       } else if ( scroll_pos > animation_end_pos ) {
            $('body').animate({ backgroundColor: ending_color }, 0);
            $('.titleInfo').animate({ backgroundColor: ending_color }, 0);

       } else if ( scroll_pos < animation_begin_pos ) {
            $('body').animate({ backgroundColor: beginning_color }, 0);
            $('.titleInfo').animate({ backgroundColor: beginning_color }, 0);
       } else { }





    });



});