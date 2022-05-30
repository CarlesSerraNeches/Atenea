<?php

    // CONTROL THE ERROR -> TO DO


    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/report.php');
    
    $report = new Report(); // Create a new Report Class
    
    $reportArray = array(); // Create the array with te JSON structore to save the API Call return
    $reportArray['message'] = array();
    $reportArray['data'] = array();

    $stmt = $report->recovery();

    if($stmt->rowCount() > 0){
        while ($rep = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($rep);
            $d = array(
                "SubModuleName" => $SubModuleName,
                "ModuleID" => $ModuleID,
                "DocNumber" => $DocNumber,
                "DeleteDate" => $DeleteDate,
                "Title" => $Title,
                "Id" => $id,
            );
            array_push($reportArray['data'], $d);
        }
    }

    echo json_encode($reportArray);
?>