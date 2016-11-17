
var $element= $();
function getFirstVisibleEl() {
    //sid effect
    $element.removeClass("red");

    var $el = $();
     $("body > *").each(function() {
        
        if($(this).offset().top >= $(window).scrollTop()) {
            $el = $(this);
            return false;
        }
    });
    return $el;
}

 Rx.Observable.fromEvent(window, 'scroll')
         .debounce(function (x) { return Rx.Observable.timer(100); })
        .subscribe((event) => {
         $element = getFirstVisibleEl();
         $element.addClass("red");
        });


 Rx.Observable.fromEvent(window, 'resize')
         .debounce(function (x) { return Rx.Observable.timer(1000); })
        .subscribe((event) => {
          $(window).scrollTop($element.offset().top);
        });
		