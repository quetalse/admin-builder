$( document ).ready(function() {

    $('#kt_aside_mobile_toggle').click(() => {
        $('.aside').addClass('aside-on');
        $('#overlay').addClass('aside-overlay');
    });

    $('#overlay').click(() => {
        $('.aside').removeClass('aside-on');
        $('#overlay').removeClass('aside-overlay');
    });

    $('#kt_aside_toggle').click(() => {
        $('body').toggleClass('aside-minimize')
    })

});