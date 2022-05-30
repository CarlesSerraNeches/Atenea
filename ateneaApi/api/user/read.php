<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    require('../../config/connection.php');
    require('../../config/redisConnection.php');
    require('../../class/user.php');
    
    $user = new User();
    $redis = new RedisConnection();

    // Verificar si los datos existen en Cache
    try{
        if($redis->exists($_GET['user']) == true){
            $stmt = $redis->get($_GET['user']);    // Devolvemos la información de la cache
        }else{
            $stmt = $user->getUser($_GET['user']);
        }
    }catch(Exception $e){
        console.log('Exception');
        // No se puede recuperar de la cache, devolvemos la información de la BBBDD
        $stmt = $user->getUser($_GET['user']); 
    }

    //Montamos el Objeto para devolver

    $userArray = array();
    $userArray['message'] = array();
    $userArray['data'] = array();

    if($stmt->rowCount() > 0 ){
        while ($usr = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($usr);
            $d = array(
                "usr_id" => $usr_id,
                "usr_user" => $usr_user,
                "usr_password" => $usr_password,
                "usr_salt" => $usr_salt,
                "usr_name" => $usr_name,
                "usr_first_last_name" => $usr_first_last_name,
            );

            array_push($userArray["data"], $d);
        }
        $m = array(
            "code" => '200',
            "message" => 'OK',
        );
        array_push($userArray['message'], $m);

        echo json_encode($userArray);
    }else{
        http_response_code(404);
        echo json_encode(
            array("message" => "No record found.")
        );
    }


?>