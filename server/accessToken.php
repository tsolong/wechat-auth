<?php

include 'common/common.php';

session_start();

function responseAccessToken()
{
    echo json_encode(array(
        "accessToken" => $_SESSION['accessToken']
    ));
}

if (!isset($_SESSION['accessToken'])) {
    $accessTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" . $appid . "&secret=" . $secret;
    $accessToken = json_decode(request_by_curl($accessTokenUrl)); //获取access_token
    $_SESSION['accessToken'] = $accessToken->access_token;
    responseAccessToken();
} else {
    responseAccessToken();
}

?>