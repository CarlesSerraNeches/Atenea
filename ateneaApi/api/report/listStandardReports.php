<?php

    // CONTROL THE ERROR -> TO DO
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/report.php');
    
    $report = new Report(); // Create a new Report Class
    
    $reportArray = array(); // Create the array with te JSON structore to save the API Call return
    $reportArray['message'] = array();
    $reportArray['data'] = array();

    $stmt = $report->getStandardReports($_GET['maintenanceBookId']);
    

    if($stmt->rowCount() > 0){
        while ($rep = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($rep);
            $d = array(
                "ModuleName" => $ModuleName,
                "Title" => $Title,
                "DocNumber" => $DocNumber,
            );
            array_push($reportArray['data'], $d);
        }

        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($reportArray['message'], $m);
    }else{

        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        
        array_push($reportArray['message'], $m);
    }

    echo json_encode($reportArray);
?>