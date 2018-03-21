(function ($) {

    $(function () {

        $('#goShareBtn').on('click', function () {
            $('#shareTip').show();
        });

        $('#shareTip').on('click', function () {
            $(this).hide();
        });

        function wechatInit(data) {

            wx.config({
                //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'getLocation', 'openLocation'] // 必填，需要使用的JS接口列表
            });

            wx.ready(function () {

                console.log('权限验证成功');

                registerAllShare(data); //注册所有微信分享接口

                openLocation(); //使用微信内置地图查看位置接口

                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

            });

            wx.error(function (res) {
                console.error('权限验证失败');
                console.error(res);
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });

            // wx.checkJsApi({
            //     jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            //     success: function(res) {
            //         // 以键值对的形式返回，可用的api值true，不可用为false
            //         // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            //     }
            // });

        }

        //注册所有微信分享接口
        function registerAllShare(data) {

            var shareParamsBase = {
                title: '标题-' + (Math.random() * 10000).toFixed(0), // 分享标题
                imgUrl: wechat.config.shareUrl + 'images/logo.png', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    $('#shareTip').hide();
                    alert('真帅！分享成功');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    $('#shareTip').hide();
                    alert('您取消了分享，您【TMD】不是在玩我么？');
                }
            };

            shareParamsBase.link = (function () {
                var queryParamsStr = $.param({
                    title: shareParamsBase.title,
                    imgUrl: shareParamsBase.imgUrl,
                    nickname: data.nickname || '',
                    headimgurl: data.headimgurl || ''
                });
                var linkUrl = wechat.config.shareUrl + 'activity.html?' + queryParamsStr; // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                return linkUrl;
            })();

            var shareParamsExtend = $.extend(true, {}, shareParamsBase, {
                desc: '描述-' + (Math.random() * 10000).toFixed(0) // 分享描述
            });

            //注册-分享到朋友圈-接口
            wx.onMenuShareTimeline(shareParamsBase);

            //注册-分享给朋友-接口
            wx.onMenuShareAppMessage($.extend(true, {}, shareParamsExtend, {
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
            }));

            //注册-分享到QQ-接口
            wx.onMenuShareQQ(shareParamsExtend);

            //注册-分享到腾讯微博-接口
            wx.onMenuShareWeibo(shareParamsExtend);

            //注册-分享到QQ空间-接口
            wx.onMenuShareQZone(shareParamsExtend);

        }

        //分享到朋友圈
        function onMenuShareTimeline(data) {


        }

        //使用微信内置地图查看位置接口
        function openLocation() {

            $('#openLocationBtn').on('click', function () {

                wx.getLocation({
                    // type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {

                        console.log(res);

                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var speed = res.speed; // 速度，以米/每秒计
                        var accuracy = res.accuracy; // 位置精度

                        wx.openLocation({
                            latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                            longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                            name: '上海左龙集团', // 位置名
                            address: '上海市浦东新区陆家嘴银城中路501号(上海中心大厦)88F', // 地址详情说明
                            scale: 20, // 地图缩放级别,整形值,范围从1~28。默认为最大
                            infoUrl: 'https://car.m.autohome.com.cn/pic/series/3825.html#pvareaid=103141' // 在查看位置界面底部显示的超链接,可点击跳转
                        });

                    }
                });

            });

        }

        $.ajax({
            type: 'post',
            url: wechat.config.apiUrl + 'accessToken.php',
            data: {},
            dataType: 'json',
            success: function (data) {

                console.log(data);

                $.ajax({
                    type: 'post',
                    url: wechat.config.apiUrl + 'ticket.php',
                    data: {
                        accessToken: data.accessToken
                    },
                    dataType: 'json',
                    success: function (data) {

                        console.log(data);

                        wechatInit(data);

                    },
                    error: function () {
                        alert('ajax调用出错了');
                    }
                });

            },
            error: function () {
                alert('ajax调用出错了');
            }
        });


    });

})(jQuery);