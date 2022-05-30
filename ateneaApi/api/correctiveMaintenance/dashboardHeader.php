<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    require('../../class/correcetiveMaintenance.php');
    
    $correctiveMaintenance = new CorrectiveMaintenance();

    $corMaiAsset = array(); // The big One
    $corMaiAsset['message'] = array();
    $corMaiAsset['data'] = array();

    switch($_GET['control']){
        case '1':
            $stmt = $correctiveMaintenance->getTotalExpensesYear($_GET['maiBooId']);
            if($stmt->rowCount() > 0 ){
                while ($tot = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($tot);
                    $d = array(
                        "total" => $totalExpense,           
                    );
                    array_push($corMaiAsset['data'], $d);
                }
        
                $m = array(
                    "code" => '200',
                    "message" => 'OK',
                );
                array_push($corMaiAsset['message'], $m);
            }else{
        
                http_response_code(404);
                $m = array(
                    "code" => '404',
                    "message" => 'Not Found',
                );
                
                array_push($corMaiAsset['message'], $m);
            }
        break;
        case '2':
            $stmt = $correctiveMaintenance->getTotalExpensesLastMonth($_GET['maiBooId']);
            if($stmt->rowCount() > 0 ){
                while ($tot = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($tot);
                    $d = array(
                        "total" => $totalExpense,           
                    );
                    array_push($corMaiAsset['data'], $d);
                }
        
                $m = array(
                    "code" => '200',
                    "message" => 'OK',
                );
                array_push($corMaiAsset['message'], $m);
            }else{
        
                http_response_code(404);
                $m = array(
                    "code" => '404',
                    "message" => 'Not Found',
                );
                
                array_push($corMaiAsset['message'], $m);
            }
        break;
        case '3':
            $stmt = $correctiveMaintenance->getElementMostProblematic($_GET['maiBooId']);
            if($stmt->rowCount() > 0 ){
                while ($tot = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($tot);
                    $d = array(
                        "total" => $result,           
                    );
                    array_push($corMaiAsset['data'], $d);
                }
        
                $m = array(
                    "code" => '200',
                    "message" => 'OK',
                );
                array_push($corMaiAsset['message'], $m);
            }else{
        
                http_response_code(404);
                $m = array(
                    "code" => '404',
                    "message" => 'Not Found',
                );
                
                array_push($corMaiAsset['message'], $m);
            }
        break;
        case '4':
            $stmt = $correctiveMaintenance->getElementMostProblematic($_GET['maiBooId']);
            if($stmt->rowCount() > 0 ){
                while ($tot = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($tot);
                    $d = array(
                        "total" => $result,           
                    );
                    array_push($corMaiAsset['data'], $d);
                }
        
                $m = array(
                    "code" => '200',
                    "message" => 'OK',
                );
                array_push($corMaiAsset['message'], $m);
            }else{
        
                http_response_code(404);
                $m = array(
                    "code" => '404',
                    "message" => 'Not Found',
                );
                
                array_push($corMaiAsset['message'], $m);
            }
        break;
    }
    echo json_encode($corMaiAsset); // Print to verify if ti works
?>


