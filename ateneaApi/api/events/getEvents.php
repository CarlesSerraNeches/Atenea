<?php
    // CONTROL THE ERROR -> TO DO
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/event.php');
    
    $event = new Event(); // Create a new Report Class
    
    $taskArray = array(); // Create the array with te JSON structore to save the API Call return

    $stmt = $event->getEvent();
    

    if($stmt->rowCount() > 0){
        while ($tas = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($tas);
            $d = array(
                "title" => $eve_title,
                "desc" => $eve_text,
                "startTime" => $eve_date,
                "endTime" => $eve_end
            );
            array_push($taskArray, $d);
        }
    }else{
        http_response_code(404);
    }

    echo json_encode($taskArray);
?>