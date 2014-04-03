$(function() {
    var settings = $('.settings');

    settings.each(function () {
        var $this = $(this);
        $this.on('focus', function() {
            var menu = $this.next('.drop-menu');
            menu.fadeIn('fast');
        });
        
        $this.on('blur', function() {
            var menu = $this.next('.drop-menu');
            menu.fadeOut('fast');
        });
    });
    
    var menu = $('.drop-menu');
    menu.on('click', 'a', function (e) {
        var $this = $(this),
            parentText = $this.parent().prev('.settings');
        
        parentText.val($(e.target).text());
    });
});