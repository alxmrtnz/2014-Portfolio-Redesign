// A $( document ).ready() block.
$( document ).ready(function() {

    var win = $(window);
    var intro = $('section.intro');
    var work = $('section.work');

    //used to determine how tall the intro is and where the color change
    //for the work section should begin
    var introHeight = win.height();
    intro.css('height', introHeight);
    work.css('margin-top', introHeight);


    $(window).on('resize', function(){
        introHeight = win.height();
        intro.css('height', introHeight);
        work.css('margin-top', introHeight);
        console.log("RESIZE - introheight: "+introHeight);
    });



    $( ".btn a" ).mouseenter(function() {
        var workBGColor = $('.work').css('background-color');
        $(this).css('color', workBGColor);

    });

    $( ".btn a" ).mouseout(function() {

        $(this).css('color', '#fff');
    });


    var workHeight = $('.hands').height() + 300;
    var scroll_pos = introHeight;
    console.log("height: " + (workHeight));
    var animation_begin_pos = workHeight - 500; //where you want the animation to begin

    var animation_end_pos = workHeight ; //where you want the animation to stop

    console.log("start_pos: " + animation_begin_pos);
    console.log("end_pos: " + animation_end_pos);



    var beginning_color = new $.Color( 'rgb(154, 184, 166)' ); //we can set this here, but it'd probably be better to get it from the CSS; for the example we're setting it here.
    var ending_color = new $.Color( 'rgb(101,196,229)' ); ;//what color we want to use in the end

    var colors = ['rgb(154, 184, 166)', 'rgb(101,196,229)'];
    console.log(colors[0]);
    $(document).scroll(function() {
       scroll_pos = $(this).scrollTop() - introHeight;
       console.log(scroll_pos + " >= " + animation_begin_pos + " && " + scroll_pos + " <= " + animation_end_pos);
       if(scroll_pos >= animation_begin_pos && scroll_pos <= animation_end_pos ) {
            // console.log( 'scrolling and animating' );
            //we want to calculate the relevant transitional rgb value
            var percentScrolled = ((scroll_pos - animation_begin_pos) / ( animation_end_pos - animation_begin_pos ));
            console.log("percentScrolled: " + percentScrolled + "scroll position:  " +scroll_pos);
            var newRed = beginning_color.red() + ( ( ending_color.red() - beginning_color.red() ) * percentScrolled );
            var newGreen = beginning_color.green() + ( ( ending_color.green() - beginning_color.green() ) * percentScrolled );
            var newBlue = beginning_color.blue() + ( ( ending_color.blue() - beginning_color.blue() ) * percentScrolled );
            var newColor = new $.Color( newRed, newGreen, newBlue );
            console.log( newColor.red(), newColor.green(), newColor.blue() );
            $('.work').animate({ backgroundColor: newColor }, 0);

       } else if ( scroll_pos > animation_end_pos ) {
            $('.work').animate({ backgroundColor: ending_color }, 0);

       } else if ( scroll_pos < animation_begin_pos ) {
            $('.work').animate({ backgroundColor: beginning_color }, 0);
       } else { }
    });



});