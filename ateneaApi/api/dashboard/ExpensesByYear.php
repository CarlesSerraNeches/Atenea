<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/Dashboard.php');

    $dashboard = new Dashboard(); // Create a new Report Class

    $dasArray = array(); // Create the array with te JSON structore to save the API Call return
    $dasArray['message'] = array();
    $dasArray['data'] = array();
    
    $stmt = $dashboard->getTotalExpensesByYear($_GET['maiBooId']);
    
    if($stmt->rowCount() > 0){
        while ($das = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($das);
            $d = array(
                "total" => $total,
                "year" => $totalByYear,
            );
            array_push($dasArray['data'], $d);
        }
    }else{
        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        array_push($dasArray['message'], $m);
    }
    echo json_encode($dasArray);
?>
