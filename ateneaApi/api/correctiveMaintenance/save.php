<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    include_once('../../class/correcetiveMaintenance.php');

    $correctiveMaintenance = New CorrectiveMaintenance();

    $data = json_decode(file_get_contents("php://input"));

    $correctiveMaintenance->setType($data->rep_document_number);
    $correctiveMaintenance->setTitle($data->rep_title);
    $correctiveMaintenance->setModule($data->rep_module_id);
    $correctiveMaintenance->setSubMod($data->rep_submodule_id);
    $correctiveMaintenance->setMaiBooId($data->rep_maintenance_book_id);

    $correctiveMaintenance->createCorrectiveMaintenace();

?>
