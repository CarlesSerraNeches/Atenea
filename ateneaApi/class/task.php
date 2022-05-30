<?php
    
    require('../../config/connection.php');

    class Task{

        private $tas_title;
        private $tas_subtitle;
        private $tas_description;
       
        private $dbConn = null;
    
        //Constructor and Destructor methodes
        public function __construct(){
            $this->dbConn = Connection::getConn();
        }

        public function getToDoTak(){
            try{
                $stmt = $this->dbConn->prepare("SELECT tas_title,tas_subtitle,tas_description,tas_id
                FROM task
                WHERE tas_done = '0' and (tas_create_date > (NOW() - INTERVAL 1 MONTH));
                ");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function getDoneTask(){
            try{
                $stmt = $this->dbConn->prepare("SELECT tas_title,tas_subtitle,tas_description
                FROM task
                WHERE tas_done = '1' and (tas_create_date > (NOW() - INTERVAL 1 MONTH));
                ");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            } 
        }
        public function doTask($id){
            try{
                $stmt=$this->dbConn->prepare("UPDATE task SET 
                tas_done = '1'
                WHERE tas_id = '".$id."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }

        }
        public function saveTask(){
            try{
                $stmt=$this->dbConn->prepare("INSERT INTO task(tas_title, tas_subtitle, tas_description, tas_done, tas_worker_id, tas_create_date) 
                VALUES (
                    '".$this->tas_title."',
                    '".$this->tas_subtitle."',
                    '".$this->tas_description."',
                    '0',
                    '1',
                    (SELECT CURDATE()))");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }

        }
        public function getTitle() {return $this->tas_title; }

        public function setTitle($value) { $this->tas_title = $value; }
        public function setSubtitle($value) { $this->tas_subtitle = $value; }
        public function setDescription($value) { $this->tas_description = $value; }
    }
?>