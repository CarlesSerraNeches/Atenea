<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    require('../../class/basicInstructions.php');
    
    $basicInstructions = new BasicInstruction();

    if(!isset($_GET['maintenanceBookId'])) { http_response_code(400); } // Send error if the are not a get variable
    $stmt = $basicInstructions->initWithMaiBooId($_GET['maintenanceBookId']);
    
    $basInsArray = array(); // The big One
    $basInsArray['message'] = array();
    $basInsArray['data'] = array();
        
    if($stmt->rowCount() > 0 ){
        while ($basIns = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($basIns);
            $d = array(
                "bas_ins_id" => $bas_ins_id,
                "bas_ins_text_one" => $bas_ins_text_one,
                "bas_ins_text_two" => $bas_ins_text_two,
            );
            array_push($basInsArray['data'], $d);
        }

        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($basInsArray['message'], $m);
        echo json_encode($basInsArray); // Print to verify if ti works
    }else{

        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        
        array_push($basInsArray['message'], $m);
        echo json_encode($basInsArray); // Print to verify if ti works
    }


?>