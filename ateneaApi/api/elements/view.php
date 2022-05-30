<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once('../../class/elements.php');

    $elements = new Elements(); // Create a new Report Class

    $elementArray = array(); // Create the array with te JSON structore to save the API Call return
    $elementArray['message'] = array();
    $elementArray['data'] = array();
    
    $stmt = $elements->getElements($_GET['subType'], $_GET['subModuleId']);
    
    if($stmt->rowCount() > 0){
        while ($ele = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($ele);
            $d = array(
                "mai_boo_sup_type" => $mai_boo_sup_type,
                "mai_boo_sup_description" => $mai_boo_sup_description,
                "mai_boo_sup_value" => $mai_boo_sup_value,
            );
            array_push($elementArray['data'], $d);
        }
    }else{
        http_response_code(404);
        $m = array(
            "code" => '404',
            "message" => 'Not Found',
        );
        array_push($elementArray['message'], $m);
    }
    echo json_encode($elementArray);
?>
