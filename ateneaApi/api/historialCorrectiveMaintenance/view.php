<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    require('../../class/historialCorrectiveMaintenance.php');
    $historial = new HistorialCorrectiveMaintenance();
    $stmt=$historial->getHistorialCorrecive();

    $genInsArray = array(); // The big One
    $genInsArray['message'] = array();
    $genInsArray['data'] = array();
        
    if($stmt->rowCount() > 0 ){
        while ($genIns = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($genIns);
            $d = array(
                "Module" => $Module,
                "SubModule" => $SubModule,
                "Data" => $Data,
                "Pricce" => $Preu
            );
            array_push($genInsArray['data'], $d);
        }

        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($genInsArray['message'], $m);
        echo json_encode($genInsArray); // Print to verify if ti works
    }else{

        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        
        array_push($genInsArray['message'], $m);
        echo json_encode($genInsArray); // Print to verify if ti works
    }
?>