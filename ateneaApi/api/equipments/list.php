<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    require('../../class/equipment.php');
    
    $equipment = new Equipment();

    if(!isset($_GET['assetId'])) { http_response_code(400); } // Send error if the are not a get variable
    $stmt = $equipment->initEquipmentList($_GET['assetId']);
    
    $equAsset = array(); // The big One
    $equAssetArray['message'] = array();
    $equAssetArray['data'] = array();
        
    if($stmt->rowCount() > 0 ){
        while ($equ = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($basIns);
            $d = array(
                "zon_identifier" => $zon_identifier,
                "zon_name" => $zon_name,
                "equ_model" => $equ_model,
                "equ_description" => $equ_description,            
            );
            array_push($equAssetArray['data'], $d);
        }

        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($equAssetArray['message'], $m);
        echo json_encode($equAssetArray); // Print to verify if ti works
    }else{

        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        
        array_push($equAssetArray['message'], $m);
        echo json_encode($equAssetArray); // Print to verify if ti works
    }


?>