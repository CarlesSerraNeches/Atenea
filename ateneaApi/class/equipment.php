<?php
    
    require('../../config/connection.php');

    class Equipment{
        private $zon_identifier;
        private $zon_name;
        private $equ_model;
        private $equ_description; 
        private $bra_name;


        private $dbConn = null;
    
        //Constructor and Destructor methodes
        public function __construct(){
            $this->dbConn = Connection::getConn();
        }
        public function __destruct(){
            $this->dbConn = null; 
        }

        public function initEquipmentList($assetId){
            try{
                    $stmt=$this->dbConn->prepare("SELECT zones.zon_identifier, zones.zon_name, equipments.equ_model, equipments.equ_description
                    FROM assets_equipments
                    INNER JOIN zones ON assets_equipments.ass_equ_zon_id = zones.zon_id
                    INNER JOIN equipments ON assets_equipments.ass_equ_equ_id = equipments.equ_id
                    WHERE assets_equipments.ass_equ_ass_id = '".$assetId."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function getEquipmentStandardReportAssigned($staReportId){
            try{
                $stmt = $this->dbConn->prepare("SELECT equipments.equ_description, equipments.equ_model, brands.bra_name
                    FROM equipments
                    INNER JOIN report_equipment_assigned ON equipments.equ_id = report_equipment_assigned.equipments_equ_id
                    INNER JOIN brands ON equipments.equ_bra_id = brands.bra_id
                    WHERE report_equipment_assigned.standard_report_sta_rep_id = '".$staReportId."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }

        }
    }
?>