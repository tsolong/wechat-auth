(function ($) {

    $(function () {

        $('#goBtn').on('click', function () {
            location.href = 'demoShareTimeline.html';
        });

        var urlData = $.url().param();

        if (urlData.code) {
            $.ajax({
                type: 'post',
                url: wechat.config.apiUrl + 'auth.php',
                data: {
                    code: urlData.code
                },
                dataType: 'json',
                success: function (data) {

                    console.log(data);

                    // sessionStorage.setItem('openid', data.openid || '');
                    // sessionStorage.setItem('access_token', data.access_token || '');

                    $('#resultData').html(JSON.stringify(data));

                    (!data.scope) && ($('#photo').attr('src', data.headimgurl));

                    $('#goBtn').show();

                },
                error: function () {
                    alert('ajax调用出错了');
                }
            });
        }

    });

})(jQuery);