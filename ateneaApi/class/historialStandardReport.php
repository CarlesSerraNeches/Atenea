<?php
    require('../../config/connection.php');

    class HistorialStandardReport{
       
        private $sta_rep_id;
        private $sta_rep_text;
        private $sta_rep_status;
        private $sta_rep_worker_id;
        private $sta_rep_date;


        private $dbConn = null;

        public function __construct(){
            $this->dbConn = Connection::getConn(); 
        }
        public function __destruct(){
            $this->dbConn = null; 
        }

        public function createHistorialStandardReport(){
            try{
                $stmt=$this->dbConn->prepare("INSERT INTO report_historial( rep_his_standard_report_id, rep_his_text_one, rep_his_status, rep_his_worker_id, rep_his_date) 
                VALUES (
                        '".$this->sta_rep_id."',
                        '".$this->sta_rep_text."',
                        '".$this->sta_rep_status."',
                        '".$this->sta_rep_worker_id."',
                        (SELECT CURDATE())
                        )");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }
            
        }
        public function getHistorialStandardReport($staRepId){
            try{
                $stmt=$this->dbConn->prepare("SELECT rep_his_text_one, rep_his_status, users.usr_name as worker, rep_his_date
                FROM report_historial
                INNER JOIN users ON users.usr_id = rep_his_worker_id
                WHERE rep_his_standard_report_id = '".$staRepId."'
                ORDER BY rep_his_date asc");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }
        }

        public function getTotalByStatus(){
            try{
                $stmt=$this->dbConn->prepare("SELECT COUNT(`rep_his_id`) as total, `rep_his_status` as status
                FROM report_historial
                GROUP BY status");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function getTotal(){
            try{
                $stmt=$this->dbConn->prepare("SELECT COUNT(`rep_his_id`) as total, (EXTRACT(YEAR from `rep_his_date`)) as year
                FROM report_historial
                GROUP BY year");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function getTotalCorrect(){
            try{
                $stmt=$this->dbConn->prepare("SELECT COUNT(`rep_his_id`) as total, (EXTRACT(YEAR from `rep_his_date`)) as year, rep_his_status as status

                FROM report_historial
                GROUP BY year, status");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function setRepId($value) { $this->sta_rep_id = $value; }
        public function setText($value) { $this->sta_rep_text = $value; }
        public function setStatus($value) { $this->sta_rep_status = $value; }
        public function setWorkerId($value) { $this->sta_rep_worker_id = $value; } 
    }

?>
