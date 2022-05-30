<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    require('../../class/maintenanceBook.php');
    $maintenanceBook = new MaintenanceBook();
    $stmt=$maintenanceBook->getMaintenanceBooks();

    $maiBooArray = array(); // The big One
    $maiBooArray['message'] = array();
    $maiBooArray['data'] = array();
        
    if($stmt->rowCount() > 0 ){
        while ($maiBoo = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($maiBoo);
            $d = array(
                "mai_boo_id" => $mai_boo_id,
                "mai_boo_title" => $mai_boo_title,
                "mai_boo_it" => $mai_boo_it
            );
            array_push($maiBooArray['data'], $d);
        }

        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($maiBooArray['message'], $m);
        echo json_encode($maiBooArray); // Print to verify if ti works
    }else{

        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        
        array_push($maiBooArray['message'], $m);
        echo json_encode($maiBooArray); // Print to verify if ti works
    }
?>