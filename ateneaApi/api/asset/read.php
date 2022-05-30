<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/asset.php');
    
    $asset = new Asset(); // Create a new Report Class
    
    $assetArray = array(); // Create the array with te JSON structore to save the API Call return
    $assetArray['message'] = array();
    $assetArray['data'] = array();

    $stmt = $asset->getAssetBasicInformation($_GET['maintenanceBookId']);

    if($stmt->rowCount() > 0){
        while ($ass = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($ass);
            $d = array(
                "ass_name" => $ass_name,
            );
            array_push($assetArray["data"], $d);
        }
        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($assetArray['message'], $m);
        echo json_encode($assetArray); // Print to verify if ti works
    }else{
        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        array_push($assetArray['message'], $m);
        echo json_encode($assetArray); // Print to verify if ti works
    }

?>