$(function() {
    //set category for search
    $('.search-dropdown').click(function(e) {
        $('#search-text').val(($(e.target).clone()).html() + ': ');
    });
});