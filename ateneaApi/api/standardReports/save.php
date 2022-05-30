<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    include_once('../../class/standardReports.php');
    require('../../config/redisConnection.php');

    $standardReport = New StandardReport();
    $redis = New RedisConnection();

    $data = json_decode(file_get_contents("php://input"));

    try{
        // En este caso como es un insert debemos romper la cache -> Super importante
        if($redis->exist($data->rep_module_id) == true) {
            $redis->del($data->rep_module_id);      // Rompo la cache

            //Creo el nuevo registro
            $standardReport->setModId($data->rep_module_id);
            $standardReport->setSubMoId($data->rep_submodule_id);
            $standardReport->setDocNumber($data->rep_document_number);
            $standardReport->setTitle($data->rep_title);
            $standardReport->setMaiBooId($data->rep_maintenance_book_id);
            $standardReport->setTiming($data->rep_periodicity);

            $smtp = ($standardReport->createStandardReport());

            $redis->set($data->rep_module_id, $smtp);  // Guardo en cahce el nuevo registro

        }else{
            // No existe en cache, guardamos en DDBB y cache
            $standardReport->setModId($data->rep_module_id);
            $standardReport->setSubMoId($data->rep_submodule_id);
            $standardReport->setDocNumber($data->rep_document_number);
            $standardReport->setTitle($data->rep_title);
            $standardReport->setMaiBooId($data->rep_maintenance_book_id);
            $standardReport->setTiming($data->rep_periodicity);

            $smtp = ($standardReport->createStandardReport());

            $redis->set($data->rep_module_id, $smtp);  
        }        
    } catch(Excemption $e) {
        // No funcionado volvemos a intentar por DDBB directamente

        // No existe en cache, guardamos en DDBB y cache
        $standardReport->setModId($data->rep_module_id);
        $standardReport->setSubMoId($data->rep_submodule_id);
        $standardReport->setDocNumber($data->rep_document_number);
        $standardReport->setTitle($data->rep_title);
        $standardReport->setMaiBooId($data->rep_maintenance_book_id);
        $standardReport->setTiming($data->rep_periodicity);

        $smtp = ($standardReport->createStandardReport());

        $redis->set($data->rep_module_id, $smtp); 
    } 

    var_dump($smtp); 

    
?>
