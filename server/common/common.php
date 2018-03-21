<?php

//载入配置文件
include 'config.php';

//php发起http请求，默认用get方式请求微信接口
function request_by_curl($remote_server)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $remote_server);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

//获取微信接口地址集合
/*function getApiUrl(apiName) {

    $apiUrls = array(
        "authBase" => "https://api.weixin.qq.com/sns/oauth2/access_token?appid=".$appid."&secret=".$secret."&code=".$code."&grant_type=authorization_code",
        "authUserinfo" => "https://api.weixin.qq.com/sns/userinfo?access_token=".$access_token."&openid=".$openid."&lang=zh_CN"
    );

    return $apiUrls[apiName];

}*/

?>