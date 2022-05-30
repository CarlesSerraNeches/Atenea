<?php

    // CONTROL THE ERROR -> TO DO
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/report.php');
    
    $report = new Report(); // Create a new Report Class
    
    $reportModuleArray = array(); // Create the array with te JSON structore to save the API Call return
    $reportModuleArray['message'] = array();
    $reportModuleArray['data'] = array();

    $stmt = $report->getReportModules($_GET['maintenanceBookId']);
    

    if($stmt->rowCount() > 0){
        while ($rep = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($rep);
            $d = array(
                "rep_module_name" => $ModuleName,
                "rep_module_id" => $ModuleID,
            );
            array_push($reportModuleArray['data'], $d);
        }

        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($reportModuleArray['message'], $m);
    }else{

        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        
        array_push($reportModuleArray['message'], $m);
    }

    echo json_encode($reportModuleArray);
?>