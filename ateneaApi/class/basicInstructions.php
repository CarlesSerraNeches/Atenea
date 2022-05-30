<?php

    require('../../config/connection.php');
    
    class BasicInstruction{
        private $bas_ins_id;
        private $bas_ins_text_one;
        private $bas_ins_text_two;

        private $dbConn = null;

        public function __construct(){
            $this->dbConn = Connection::getConn();
        }

        public function initWithMaiBooId($mai_boo_id){
            try{
                $stmt=$this->dbConn->prepare("SELECT bas_ins_id, bas_ins_text_one, bas_ins_text_two FROM basic_instructions WHERE bas_ins_maintenance_book_id = '".$mai_boo_id."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }
    }
?>