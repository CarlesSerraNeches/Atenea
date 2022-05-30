<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    include_once('../../class/task.php');

    $task = New Task();

    $data = json_decode(file_get_contents("php://input"));

    $task->setTitle($data->title);
    $task->setSubtitle($data->subtitle);
    $task->setDescription($data->desc);

    echo($task->getTitle());

    $task->saveTask();
?>