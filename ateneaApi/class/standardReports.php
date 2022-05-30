<?php
    require('../../config/connection.php');

    class StandardReport{
       
        private $sta_rep_id;
        private $sta_rep_module_id;
        private $sta_rep_subModule_id;
        private $sta_rep_timming;
        private $sta_rep_document_number;
        private $sta_rep_title;
        private $sta_rep_maintenanceBookId;
        private $sta_rep_timing;

        private $dbConn = null;

        public function __construct(){
            $this->dbConn = Connection::getConn(); 
        }
        public function __destruct(){
            $this->dbConn = null; 
        }

        public function getStandardReportId($timming, $docNumber, $maiBooId){
            try{
                $stmt = $this->dbConn->prepare("SELECT sta_rep_id
                FROM standard_report 
                WHERE sta_rep_timing like '%".$timming."%' and sta_rep_document_number = '".$docNumber."' and `sta_rep_maintenace_book_id` = '".$maiBooId."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }
        }
        public function getStandardReport($maiBooId, $staRepDocNum){
            try{
                $stmt = $this->dbConn->prepare("SELECT sta_rep_id, sta_rep_document_number, sta_rep_title, sta_rep_module_id, sta_rep_submodule_id ,sta_rep_created_date 
                FROM standard_report
                WHERE sta_rep_document_number LIKE '%".$staRepDocNum."%' and sta_rep_maintenace_book_id = '".$maiBooId."' and sta_rep_status = '0'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }
        }
        public function createStandardReport(){
            try{
                $stmt=$this->dbConn->prepare("INSERT INTO `standard_report`(`sta_rep_id`, `sta_rep_module_id`, `sta_rep_submodule_id`, `sta_rep_document_number`, `sta_rep_title`, `sta_rep_maintenace_book_id`, `sta_Rep_timing`) 
                    VALUES (
                        '',
                        '".$this->sta_rep_module_id."',
                        '".$this->sta_rep_subModule_id."',
                        '".$this->sta_rep_document_number."',
                        '".$this->sta_rep_title."',
                        '".$this->sta_rep_maintenanceBookId."',
                        '".$this->sta_rep_timing."'
                        )");

                        var_dump($stmt);die;
                $stmt->execute();
                var_dump('heee');die;
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }
            
        }

        public function deleteStandardReport($id){
            try{
                $stmt = $this->dbConn->prepare("UPDATE standard_report SET 
                    sta_rep_status = '1',
                    sra_rep_delete_date = (SELECT CURDATE())
                    WHERE 
                    sta_rep_id = '".$id."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                return $e;
            }
        }


        public function getModule() { return $this->sta_rep_module_id; }
        public function getStaRepDocNumber() { return $this->sta_rep_document_number; }
        public function getTitle() { return $this->sta_rep_title; }
        public function getMaiBooId() { return $this->sta_rep_maintenanceBookId; }
        public function getTiming() { return $this->sta_rep_timing; }

        public function setStaRepId($value) { $this->sta_rep_id = $value; }
        public function setModId($value) { $this->sta_rep_module_id = $value; }
        public function setSubMoId($value) { $this->sta_rep_subModule_id = $value; }
        public function setDocNumber($value) { $this->sta_rep_document_number = $value; }
        public function setTitle($value) { $this->sta_rep_title=$value; }
        public function setMaiBooId($value) { $this->sta_rep_maintenanceBookId = $value; }
        public function setTiming($value) { $this->sta_rep_timing = $value; }

    }

?>