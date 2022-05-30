<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/standardReports.php');
    //include_once('../../class/equipment.php');
    
    $standardReport = new StandardReport();
    $standardReportStmt = $standardReport->getStandardReportId($_GET['timming'], $_GET['staRepDocNum'], $_GET['maiBooId']);

    $staRepArray = array(); // The big One
    $staRepArray['message'] = array();
    $staRepArray['data'] = array();

    if($standardReportStmt->rowCount() > 0 ){
        while ($staRep = $standardReportStmt->fetch(PDO::FETCH_ASSOC)){
            extract($staRep);
            $d = array(
                "sta_rep_id" => $sta_rep_id,
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
?>