(function ($) {

    $(function () {

        //生成向微信发送授权请求的url
        function getWechatAuthUrl(state) { //state值说明()

            var authParams = {
                appid: wechat.config.appid,
                redirect_uri: wechat.config.redirect_uri,
                response_type: 'code',
                scope: $('input[name="authType"]:checked').val(),
                state: state
            };

            return wechat.config.authUrl + $.param(authParams) + '#wechat_redirect';

        }

        //开始微信授权按钮
        $('#authBtn').on('click', function () {
            location.href = getWechatAuthUrl('auth');
        });

    });

})(jQuery);