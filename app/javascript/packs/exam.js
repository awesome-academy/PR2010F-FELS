$(document).ready(function() {
    $('input[type="checkbox"]').on('change', function() {
        $('input[name="' + this.name + '"]').not(this).prop('checked', false);
        let question_id = $('input[name="' + this.name + '"]').closest('.tab-content').attr('id');
        if ($('input[name="' + this.name + '"]').parent().find('input[name="' + this.name + '"]:checked').length > 0) {
            $('.' + question_id).addClass('answer-bg');
        } else {
            $('.' + question_id).removeClass('answer-bg');
        }
    });


    $('ul.tabs li:first').addClass('current');
    $('.tab-content:first').addClass('current');
    $('ul.tabs li').click(function() {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })

    $('.next-question').on('click', function() {
        console.log($('ul.tabs li').index($('li.current')));
        var currentQuestion = $('ul.tabs li').index($('li.current'));
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        if (currentQuestion === $('ul.tabs li').length - 1) {
            currentQuestion = -1;
        }
        $('ul.tabs li').eq(currentQuestion + 1).addClass('current');
        $('.tab-content').eq(currentQuestion + 1).addClass('current');
    });

    $('.previous-question').on('click', function() {
        var currentQuestion = $('ul.tabs li').index($('li.current'));
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        if (currentQuestion === -1) {
            currentQuestion = $('ul.tabs li').length - 1;
        }
        $('ul.tabs li').eq(currentQuestion - 1).addClass('current');
        $('.tab-content').eq(currentQuestion - 1).addClass('current');
    });
})