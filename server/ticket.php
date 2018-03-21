<?php

include 'common/common.php';

session_start();

$accessToken = $_POST["accessToken"];

if (!isset($_SESSION['ticket'])) {
    $ticketUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" . $accessToken . "&type=jsapi";
    $ticket = json_decode(request_by_curl($ticketUrl)); //获取ticket
    $_SESSION['ticket'] = $ticket->ticket;
}

function createNonceStr($length)
{
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
        $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
}

//    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
//    $url = $protocol.''.$_SERVER[HTTP_HOST].''.$_SERVER[REQUEST_URI];
$url = $_SERVER["HTTP_REFERER"];
$timestamp = time();
$nonceStr = createNonceStr(16);

$string = "jsapi_ticket=" . $_SESSION['ticket'] . "&noncestr=" . $nonceStr . "&timestamp=" . $timestamp . "&url=" . $url;

$signature = sha1($string);

$signPackage = array(
    "appId" => $appid,
    "nonceStr" => $nonceStr,
    "timestamp" => $timestamp,
    "url" => $url,
    "signature" => $signature,
    "rawString" => $string
);

if (isset($_SESSION['userinfo'])) {
    $userinfo = json_decode($_SESSION['userinfo']);
    $signPackage->nickname = $userinfo . nickname;
    $signPackage->headimgurl = $userinfo . headimgurl;
}

echo json_encode($signPackage);

?>