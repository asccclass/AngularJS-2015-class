<?php

   header('Access-Control-allow-Origin: *');  // cross domain

   if($_GET && $_POST)  $_webVars = array_merge($_GET, $_POST);
   else if($_GET)  $_webVars = $_GET;
   else $_webVars = $_POST;
     
   // 資料庫連線等動作
   $_vals = $_webVars;
   $_vals['msg'] = "OK";

   echo json_encode($_vals);

?>
