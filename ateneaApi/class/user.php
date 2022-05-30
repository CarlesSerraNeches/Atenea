<?php
    /**
     * DESCRIPTION: User class, svae the information from the Users
     * AUTHOR: Carles Serra Neches
     * EMAIL: cserran@uda.ad   
     * DATE: 17 of March 2021
    */

    require_once('../../config/connection.php');

    class User{
        private $usr_id;
        private $usr_identifier;
        private $usr_status;
        private $usr_user;
	    private $usr_password;
	    private $usr_salt;
        private $usr_name; 
        private $usr_first_last_name;
        private $usr_second_last_name; // Phone number to contact
        private $usr_phone_contact_one;
        private $usr_phone_contact_two;
        private $usr_email_one;
        private $usr_email_two;
        private $usr_created_data;
        private $usr_removed_data;

        private $dbConn = null;

        // Construct and Destruct methode
        public function __construct(){
            $this->dbConn = Connection::getConn();
            //$this->redisConn = Connection::getRedisConn();
        }

        //Get the basic information of one user using their identifier
        public function getUser($user){
            $stmt=$this->dbConn->prepare("SELECT usr_id, usr_user, usr_password, usr_salt, usr_name, usr_first_last_name FROM users WHERE usr_status = '1' and usr_user = '".$user."'");
            $stmt->execute();
            return $stmt;           
        }
        
    }

?>