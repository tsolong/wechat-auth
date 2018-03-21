(function ($) {

    $(function () {

        var urlData = $.url().param();

        $('#title').html(urlData.title);

        $('#imgUrl').attr('src', urlData.imgUrl);

        $('#nickname').html(urlData.nickname);

        $('#headimgurl').attr('src', urlData.headimgurl);

    });

})(jQuery);