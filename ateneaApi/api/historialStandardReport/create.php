<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    include_once('../../class/historialStandardReport.php');

    $historialReport = New HistorialStandardReport();

    $data = json_decode(file_get_contents("php://input"));

    $historialReport->setRepId($data->sta_rep_id);
    $historialReport->setText($data->sta_rep_observation);
    $historialReport->setStatus($data->sta_rep_status);
    $historialReport->setWorkerId($data->sta_rep_workerId);

    $historialReport->createHistorialStandardReport();

?>
