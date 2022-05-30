<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/correcetiveMaintenance.php');

    $corEleRep = new CorrectiveMaintenance(); // Create a new Report Class

    $correctiveElement = array(); // Create the array with te JSON structore to save the API Call return
    $correctiveElement['data'] = array();
    
    $stmt = $corEleRep->getHistorialCorrectiveMaintenace($_GET['maiBooId']);
    
    if($stmt->rowCount() > 0){
        while ($corRep = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($corRep);
            $d = array(
                "module_id" => $Element,
                "observations" => $reg_cor_mai_text_one,
                "price" => $reg_cor_mai_price,
                "date" => $reg_cor_mai_date_acceptation,
                "propiety" => $reg_cor_mai_propiety,
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
