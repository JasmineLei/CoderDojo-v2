
 function add_ZoomIn(){
        var addToAll = false;
        var gallery = false;
        var titlePosition = 'inside';
        $(addToAll ? 'img' : 'img.fancybox').each(function(){
            var $this = $(this);
            var title = $this.attr('title');
            var src = $this.attr('data-big') || $this.attr('src');
            var a = $('<a href="#" class="fancybox"></a>').attr('href', src).attr('title', title);
            $this.wrap(a);
        });
        if (gallery)
            $('a.fancybox').attr('rel', 'fancyboxgallery');
        $('a.fancybox').fancybox({
            titlePosition: titlePosition,
            type: 'image'
        });
 }
 

function hideFeedbackZone(){
    $('div.feedback-options').insertAfter('.afterscreen');
    $('div.feedback-options').css('display','none');
    $('.point-icon').css('display','none');
    var NinjaScreen = $('#localScreen').offset();
    var y_distance = $('#localScreen').height();
    var reset_x = NinjaScreen.left+"px";
    var reset_y = y_distance+NinjaScreen.top+"px";
    $('.follower').css({
        'top':reset_x,
        'left':reset_y,
        }); 
} 
/* $("#fancybox-img").load(function() {
  // Handler for .load() called.
    var ratio=$('img.fancybox').width()/$('img.fancybox').height();
    var ZoomInHeight=500;
    var ZoomInWidth=ZoomInHeight*ratio;
     $("#fancybox-img").css({
                             'width':ZoomInWidth,
                             'height':ZoomInHeight,
                             'speedIn':'300',
                             'speedOut':'300'});
 });*/
