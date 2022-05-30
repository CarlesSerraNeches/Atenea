<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/standardReports.php');
    //include_once('../../class/equipment.php');
    
    $standardReport = new StandardReport();
    $standardReportStmt = $standardReport->getStandardReport($_GET['maiBooId'], $_GET['staRepDocNum']);

    $staRepArray = array(); // The big One
    $staRepArray['message'] = array();
    $staRepArray['data'] = array();

    if($standardReportStmt->rowCount() > 0 ){
        while ($staRep = $standardReportStmt->fetch(PDO::FETCH_ASSOC)){
            extract($staRep);
            $d = array(
                "sta_rep_id" => $sta_rep_id,
                "sta_rep_document_number" => $sta_rep_document_number,
                "sta_rep_title" => $sta_rep_title,
                "sta_rep_module_id" => $sta_rep_module_id,
                "sta_rep_submodule_id" => $sta_rep_submodule_id,
                "sta_rep_created_data" => $sta_rep_created_date,    
            );
            array_push($staRepArray['data'], $d);
        }

        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($staRepArray['message'], $m);
        echo json_encode($staRepArray); // Print to verify if ti works
    }else{

        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        
        array_push($staRepArray['message'], $m);
        echo json_encode($staRepArray); // Print to verify if ti works
    }

    /*  TEST 
    $equipment = new Equipment();
    $equipmentStmt = $equipment->getEquipmentStandardReportAssigned($_GET['satRepId']);

    $staRepArray = array(); // The big One
    $staRepArray['message'] = array();
    $staRepArray['data'] = array();


    // Creat the JSON response    
    if($standardReportStmt->rowCount() > 0 ){
        while ($staRep = $standardReportStmt->fetch(PDO::FETCH_ASSOC)){
            extract($staRep);
            $d = array(
                "sta_rep_id" => $sta_rep_id,
                "sta_rep_document_number" => $sta_rep_document_number,
                "sta_rep_title" => $sta_rep_title,
                "sta_rep_module_id" => $sta_rep_module_id,
            );
            array_push($staRepArray['data'], $d);
        }

        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($staRepArray['message'], $m);
        echo json_encode($staRepArray); // Print to verify if ti works
    }else{

        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        
        array_push($staRepArray['message'], $m);
        echo json_encode($staRepArray); // Print to verify if ti works
    }

    Creat the JSON response with the Equipment Information    
    if($equipmentStmt->rowCount() > 0 ){
        while ($equ = $equipmentStmt->fetch(PDO::FETCH_ASSOC)){
            extract($equ);
            $d = array(
                "zon_identifier" => $zon_identifier,
                "zon_name" => $zon_name,
                "equ_model" => $equ_model, 
                "equ_desctiption" => $equ_description, 
                "bra_name" => $bra_name,
            );
            array_push($staRepArray['data'], $d);
        }

        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($staRepArray['message'], $m);
        echo json_encode($staRepArray); // Print to verify if ti works
    }else{

        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        
        array_push($staRepArray['message'], $m);
        echo json_encode($staRepArray); // Print to verify if ti works
    
    }*/
?>