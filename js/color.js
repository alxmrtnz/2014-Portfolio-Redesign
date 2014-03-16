// A $( document ).ready() block.
$( document ).ready(function() {
    //FIGURING OUT HOW TO USE DATA STORED IN TAG TO CHANGE COLORS ON SCROLL
    console.log("Length(): " + $('.workPiece').length);
    console.log("Length(): " + $('.workPiece').size());


    console.log("Color: " + $("article[data-color]").data("color"));



    var works = new Array();//create an array
    var count = 0;//used for looping through console.log

    //loops through each workPiece looking for it's data-color and adds it to the array, also logs it so I can see it working
    $('.workPiece').each(function(){
        //my_array.push($(this).data("color"));
        //console.log(my_array[count]);
        count += 1;
        //console.log('name: ' +$(this).attr('id') + " |  bgcolor: " + $(this).data("color") + " |  height: "+ $(this).outerHeight());
        var obj = {
                name: $(this).attr('id'),
                BGcolor: $(this).data("color"),
                height: $(this).outerHeight()
            };
        works.push(obj);
    });

    console.log('ARRAY '+works.length);
    for(var i = 0; i < works.length; i++){
        console.log('Name: '+ works[i].name + ' bgcolor: '+ works[i].BGcolor + ' height: ' + works[i].height);
    }
    ////////////////////////////////////////////////////////












    //BEGIN COLOR CHANGE FUNCTION SETUP/////////////////////////////////////
    var workHeight = $('.hands').height() + 300;
    var scroll_pos = introHeight;

    var animation_begin_pos = workHeight - 500; //where you want the animation to begin

    var animation_end_pos = workHeight ; //where you want the animation to stop

    console.log("start_pos: " + animation_begin_pos);
    console.log("end_pos: " + animation_end_pos);

    //COLOR SELECTION
    //$alxBlue: rgb(56, 136, 222)
    //Hands Green: rgb(154, 184, 166)
    // OUMS Blue: rgb(101,196,229)
    var colors = ['rgb(56, 136, 222)', 'rgb(154, 184, 166)', 'rgb(101,196,229)'];
    //var beginning_color = new $.Color( colors[0] ); //we can set this here, but it'd probably be better to get it from the CSS; for the example we're setting it here.
    //var ending_color = new $.Color( colors[1] ) ;//what color we want to use in the end


    //console.log("HANDS from top: " + $('.hands').offset().top);
    var sectionNum = 0;


    var colorChange = function(obj){
        var beginning_color = new $.Color( obj.BGcolor );
        var ending_color = new $.Color( colors[sectionNum+1] );

        console.log('section number: '+sectionNum + "section color: "+colors[sectionNum]);

        scroll_pos = $(this).scrollTop();
        //console.log("SCROLL POS: " + scroll_pos + " >= " + "ANIMATION BEGIN: " + animation_begin_pos + " && " + scroll_pos + " <= " + animation_end_pos);

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

             //sectionNum++;
             console.log('new section number: '+ sectionNum);
             //return sectionNum;
        } else if ( scroll_pos < animation_begin_pos ) {
             $('body').animate({ backgroundColor: beginning_color }, 0);
             $('.titleInfo').animate({ backgroundColor: beginning_color }, 0);
        } else { }
    }

});