<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/maintenanceBookSupport.php');

    $maiBooSup = new MaintenanceBookSupport(); // Create a new Report Class

    $maiBooSupArray = array(); // Create the array with te JSON structore to save the API Call return
    $maiBooSupArray['message'] = array();
    $maiBooSupArray['data'] = array();
    
    $stmt = $maiBooSup->getSupport($_GET['supType']);
    
    if($stmt->rowCount() > 0){
        while ($mod = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($mod);
            $d = array(
                "mai_boo_sup_type" => $mai_boo_sup_type,
                "mai_boo_sup_description" => $mai_boo_sup_description,
                "mai_boo_sup_value" => $mai_boo_sup_value,
            );
            array_push($maiBooSupArray['data'], $d);
        }
    }else{
        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        array_push($maiBooSupArray['message'], $m);
    }
    echo json_encode($maiBooSupArray);
?>
