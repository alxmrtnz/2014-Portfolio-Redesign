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


    var titleFromLeft = ((win.width() - 1200) / 2) + (($('.workContainer').outerWidth() - $('.workContainer').width()) / 2);

    var fromRight = (win.width() - $('.workContainer').width()) / 2;
    $(window).on('resize', function(){
        introHeight = win.height();
        intro.css('height', introHeight);
        $('.workPiece').each(function(){
            console.log('name: ' +$(this).attr('id') + " |  bgcolor: " + $(this).data("color") + " |  height: "+ $(this).outerHeight());
            var obj = {
                    name: $(this).attr('id'),
                    BGcolor: $(this).data("color"),
                    height: $(this).outerHeight()
                };
            works.push(obj);
        });

        titleFromLeft = ((win.width() - 1200) / 2) + (($('.workContainer').outerWidth() - $('.workContainer').width()) / 2);
        if($(window).width() > 1200){
            $('.titleInfo.stickit').css({
                left: titleFromLeft
            });
        }
    });
    //////////////////////////////////////////////////////
    var works = new Array();//create an array
    $('.workPiece').each(function(){
        console.log('name: ' +$(this).attr('id') + " |  bgcolor: " + $(this).data("color") + " |  height: "+ $(this).outerHeight());
        var obj = {
                name: $(this).attr('id'),
                BGcolor: $(this).data("color"),
                height: $(this).outerHeight()
            };
        works.push(obj);
    });











    //BACKGROUND COLOR CHANGE PLUGIN THING///////////////
    $('body, .titleInfo').colorScroll({

        colors: [{
            color: '#3888de',
            position: (introHeight/2)
        }, {
            color: works[0].BGcolor,
            position: introHeight
        }, {
            color: works[0].BGcolor,
            position: introHeight + (works[0].height / 2)
        }, {
            color: works[1].BGcolor,
            position: introHeight + works[0].height
        }, {
            color: works[1].BGcolor,
            position: introHeight + works[0].height + (works[1].height / 2)
        },]
    });

    $('body').colorScroll();
    ////////////////////////////////////////////////////////\










    //BUTTON LINK COLOR CHANGE///////////////////////////////////////
    //JS function for changing color of link text in buttons. Had to do this because the color of the text depends on the current background color
    $( "a" ).mouseenter(function() {
        var BGColor = $('body').css('background-color');
        $(this).css('color', BGColor);

    });

    $( "a" ).mouseout(function() {

        $(this).css('color', '#fff');
    });


    ////////////////////////////////////////////////////////////















    /////////////////////////////////////////////////////////////////

    var description = $('.work article.workPiece.current .workPieceContent .description');
    //colorChange();//initial color selection
    $('.current .description').css('color', 'red');;

    $(document).scroll(function() {

        console.log('top: '+ $(document).scrollTop())
    });





    $(".upArrow").click(function() {
        console.log($(this).closest('article').prev());
        $('html, body').animate({
            scrollTop: $(this).closest('article').prev().offset().top
        }, 500);
    });

    $(".downArrow").click(function() {
        console.log($(this).closest('article').next());
        $('html, body').animate({
            scrollTop: $(this).closest('article').next().offset().top
        }, 500);
    });



});