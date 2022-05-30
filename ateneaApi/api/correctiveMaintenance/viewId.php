<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/correcetiveMaintenance.php');

    
    $correctiveMaintenace = new CorrectiveMaintenance();
    $stmt = $correctiveMaintenace->getCorrectiveMaintenanceId($_GET['docNumber'], $_GET['maiBooId']);

    $corMaiArray = array(); // The big One
    $corMaiArray['message'] = array();
    $corMaiArray['data'] = array();

    if($stmt->rowCount() > 0 ){
        while ($reg = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($reg);
            $d = array(
                "cor_mai_id" => $cor_mai_id,
            );
            array_push($corMaiArray['data'], $d);
        }

        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($corMaiArray['message'], $m);
        echo json_encode($corMaiArray); // Print to verify if ti works
    }else{

        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        
        array_push($corMaiArray['message'], $m);
        echo json_encode($corMaiArray); // Print to verify if ti works
    }
?>