<?php
    require('../../config/connection.php');

    class GeneralInstructions{
        private $gen_ins_id;
        private $gen_ins_text_one;
        private $gen_ins_text_two;
        private $gen_ins_module_id;

        private $dbConn = null;

        public function __construct(){
            $this->dbConn = Connection::getConn(); 
        }

        public function getGeneralInstructions($maiBooId, $genInsDocNumber){
            try{
                $stmt = $this->dbConn->prepare("SELECT gen_ins_id, gen_ins_text_one, gen_ins_text_two FROM general_instructions WHERE gen_ins_mai_boo_id = '".$maiBooId."' and gen_ins_document_number = '".$genInsDocNumber."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }
        }
    }
?>