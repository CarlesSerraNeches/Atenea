<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/correcetiveMaintenance.php');

    $corEleRep = new CorrectiveMaintenance(); // Create a new Report Class

    $correctiveElement = array(); // Create the array with te JSON structore to save the API Call return
    $correctiveElement['message'] = array();
    $correctiveElement['data'] = array();
    
    $stmt = $corEleRep->getCorrectiveMaintenances($_GET['maiBooId']);
    
    if($stmt->rowCount() > 0){
        while ($corRep = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($corRep);
            $d = array(
                "cor_mai_id" => $cor_mai_id,
                "cor_mai_type" => $cor_mai_type,
                "cor_ma_title" => $cor_ma_title,
                "cor_mai_module" => $cor_mai_module,
                "cor_mai_sub_module" => $cor_mai_sub_module,
            );
            array_push($correctiveElement['data'], $d);
        }
    }else{
        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        array_push($correctiveElement['message'], $m);
    }
    echo json_encode($correctiveElement);
?>
