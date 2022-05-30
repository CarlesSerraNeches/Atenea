<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/historialStandardReport.php');

    $historialStandardReport = new HistorialStandardReport; // Create a new Report Class

        
    $historialReportArray = array(); // 
    $historialReportArray['message'] = array();
    $historialReportArray['data'] = array();
    
    $stmt = $historialStandardReport->getHistorialStandardReport($_GET['staRepId']);

    
    if($stmt->rowCount() > 0){
        while ($hisStaRep = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($hisStaRep);
            $d = array(
                "rep_his_text_one" => $rep_his_text_one,
                "rep_his_status" => $rep_his_status,
                "worker" => $worker,
                "rep_his_date" => $rep_his_date,
            );
            array_push($historialReportArray['data'], $d);
        }
    }else{
        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        array_push($historialReportArray['message'], $m);
    }
    echo json_encode($historialReportArray);
?>