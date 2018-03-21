<?php

//设置响应头
header('Access-Control-Allow-Origin: *'); //设置允许所有来源跨域访问
header('Content-type: application/json'); //该接口永远只返回json类型的数据

//调用微信接口参数配置
$appid = 'wx131c5cd2fe78e3f7';
$secret = 'a79ff9b0b2c26ddb852da6f597916a6b';

$code = '';
$openid = '';
$access_token = '';

?>