<?php
    // CONTROL THE ERROR -> TO DO
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/task.php');
    
    $task = new Task(); // Create a new Report Class
    
    $taskArray = array(); // Create the array with te JSON structore to save the API Call return
    $taskArray['message'] = array();
    $taskArray['data'] = array();

    $stmt = $task->getDoneTask();
    

    if($stmt->rowCount() > 0){
        while ($tas = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($tas);
            $d = array(
                "tas_title" => $tas_title,
                "tas_subtitle" => $tas_subtitle,
                "tas_description" => $tas_description
            );
            array_push($taskArray['data'], $d);
        }

        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($taskArray['message'], $m);
    }else{

        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        
        array_push($taskArray['message'], $m);
    }

    echo json_encode($taskArray);
?>