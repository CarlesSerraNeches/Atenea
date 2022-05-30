<?php

    // CONTROL THE ERROR -> TO DO
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/report.php');
    
    $report = new Report(); // Create a new Report Class
    
    $reportSubmoduleArray = array(); // Create the array with te JSON structore to save the API Call return
    $reportSubmoduleArray['message'] = array();
    $reportSubmoduleArray['data'] = array();

    $stmt = $report->getReportSubModules($_GET['maintenanceBookId']);
    

    if($stmt->rowCount() > 0){
        while ($rep = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($rep);
            $d = array(
                "rep_subModule_name" => $SubModuleName,
                "rep_module_id" => $ModuleID,
                "rep_document_number" => $DocNumber,
            );
            array_push($reportSubmoduleArray['data'], $d);
        }

        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($reportSubmoduleArray['message'], $m);
    }else{

        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        
        array_push($reportSubmoduleArray['message'], $m);
    }

    echo json_encode($reportSubmoduleArray);
?>