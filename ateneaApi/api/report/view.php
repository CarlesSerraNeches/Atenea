<?php

    // CONTROL THE ERROR -> TO DO


    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/report.php');
    
    $report = new Report(); // Create a new Report Class
    
    $reportArray = array(); // Create the array with te JSON structore to save the API Call return
    $reportArray['message'] = array();
    $reportArray['data'] = array();

    $stmt0 = $report->getBasicInstructions($_GET['maintenanceBookId']);
    $stmt1 = $report->getGeneralInstructions($_GET['maintenanceBookId']);
    $stmt2 = $report->getStandardReports($_GET['maintenanceBookId']);

    if($stmt0->rowCount() > 0){
        while ($rep0 = $stmt0->fetch(PDO::FETCH_ASSOC)){
            extract($rep0);
            $d = array(
                "rep_maintenance_book_id" => $bas_ins_maintenance_book_id,
                "rep_document_number" => $bas_ins_document_number,
                "rep_id" => $bas_ins_id,
                "rep_title" => $bas_ins_title,
                "rep_type" => 'Basic Instructions',
            );
            array_push($reportArray['data'], $d);
        }
    }

    if($stmt1->rowCount() > 0){
        while ($rep1 = $stmt1->fetch(PDO::FETCH_ASSOC)){
            extract($rep1);
            $d = array(
                "rep_maintenance_book_id" => $gen_ins_mai_boo_id,
                "rep_document_number" => $gen_ins_document_number,
                "rep_id" => $gen_ins_id,
                "rep_title" => $gen_ins_title,
                "rep_type" => 'General Instructions',
            );
            array_push($reportArray['data'], $d);
        }
    }

    if($stmt1->rowCount() > 0){
        while ($rep2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
            extract($rep2);
            $d = array(
                "rep_maintenance_book_id" => $sta_rep_maintenace_book_id,
                "rep_document_number" => $sta_rep_document_number,
                "rep_id" => $sta_rep_id,
                "rep_title" => $sta_rep_title,
                "rep_type" => 'Standard Report',
            );
            array_push($reportArray['data'], $d);
        }
    }

    echo json_encode($reportArray);
?>