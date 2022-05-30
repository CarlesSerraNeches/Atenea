<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/client.php');
    
    $client = new Client(); // Create a new Report Class
    
    $clientArray = array(); // Create the array with te JSON structore to save the API Call return
    $clientArray['message'] = array();
    $clientArray['data'] = array();

    $stmt = $client->getClientBasicInformation($_GET['maintenanceBookId']);

    if($stmt->rowCount() > 0){
        while ($cli = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($cli);
            $d = array(
                "cli_name" => $cli_commercial_name,
            );
            array_push($clientArray["data"], $d);
        }
        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($clientArray['message'], $m);
        echo json_encode($clientArray); // Print to verify if ti works
    }else{
        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        array_push($clientArray['message'], $m);
        echo json_encode($clientArray); // Print to verify if ti works
    }

?>