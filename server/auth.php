<?php

include 'common/common.php';

session_start();

$code = $_POST["code"];

$baseUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" . $appid . "&secret=" . $secret . "&code=" . $code . "&grant_type=authorization_code";

$base = json_decode(request_by_curl($baseUrl)); //通过code获取用户openid和access_token

if ($base->scope == 'snsapi_base') {
    echo json_encode($base);
    return;
}

$openid = $base->openid;
$access_token = $base->access_token;

$userinfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=" . $access_token . "&openid=" . $openid . "&lang=zh_CN";

if ($base->scope == 'snsapi_userinfo') {

    $userinfo = json_decode(request_by_curl($userinfoUrl));
    //$userinfo -> access_token = $access_token; //可删除

    $userinfoJson = json_encode($userinfo);

    $_SESSION['userinfo'] = $userinfoJson;

    echo $userinfoJson;

    return;
}

echo json_encode(array(
    "code" => 500,
    "model" => null,
    "msg" => "出错了"
));

?>