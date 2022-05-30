<?php
    require('../../config/connection.php');

    class Report{
        private $rep_module_name;
        private $rep_title;
        private $rep_document_number;

        private $dbConn = null;

        public function __construct(){
            $this->dbConn = Connection::getConn(); 
        }

        public function getStandardReports($maintenanceBookId){ // return all the Reports of an Specific Maintenance Book 
            try{
                $stmt = $this->dbConn->prepare("SELECT maintenance_book_support.mai_boo_sup_description as ModuleName, sta_rep_title as Title , sta_rep_document_number as DocNumber
                FROM standard_report
                INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = standard_report.sta_rep_module_id                
                WHERE standard_report.sta_rep_maintenace_book_id = '".$maintenanceBookId."'
                GROUP BY DocNumber
                ORDER BY DocNumber ASC");
                $stmt->execute();
                return $stmt;
            }catch(Exemption $e){
                echo($e);
            }
        }

        public function getReportModules($maintenanceBookId){
            try{
                $stmt = $this->dbConn->prepare("SELECT maintenance_book_support.mai_boo_sup_description as ModuleName, corrective_maintenance.cor_mai_module as ModuleID
                FROM corrective_maintenance
                INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = corrective_maintenance.cor_mai_module
                
                UNION
                
                SELECT maintenance_book_support.mai_boo_sup_description as ModuleName, standard_report.sta_rep_module_id as ModuleId
                FROM standard_report
                INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = standard_report.sta_rep_module_id
                
                WHERE standard_report.sta_rep_maintenace_book_id = '".$maintenanceBookId."'
                GROUP BY ModuleName
                ORDER BY ModuleId ASC");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function getReportSubModules($maintenanceBookId){
            try{
                $stmt = $this->dbConn->prepare("SELECT maintenance_book_support.mai_boo_sup_description as SubModuleName, corrective_maintenance.cor_mai_module as ModuleID, cor_mai_type as DocNumber
                FROM corrective_maintenance
                INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = corrective_maintenance.cor_mai_sub_module
                
                UNION
                
                SELECT maintenance_book_support.mai_boo_sup_description as SubModuleName, standard_report.sta_rep_module_id ,sta_rep_document_number as DocNumber
                FROM standard_report
                INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = standard_report.sta_rep_submodule_id
                
                WHERE standard_report.sta_rep_maintenace_book_id = '1'
                GROUP BY SubModuleName
                ORDER BY DocNumber ASC");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function recovery(){
            try{
                $stmt = $this->dbConn->prepare("SELECT maintenance_book_support.mai_boo_sup_description as SubModuleName, corrective_maintenance.cor_mai_module as ModuleID, cor_mai_type as DocNumber, corrective_maintenance.cor_mai_delete_date as DeleteDate, corrective_maintenance.cor_ma_title as Title, corrective_maintenance.cor_mai_id as id
                FROM corrective_maintenance
                INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = corrective_maintenance.cor_mai_sub_module
                                
                UNION
                               
                SELECT maintenance_book_support.mai_boo_sup_description as SubModuleName, standard_report.sta_rep_module_id ,sta_rep_document_number as DocNumber, standard_report.sra_rep_delete_date as DeleteDate, standard_report.sta_rep_title as Title, standard_report.sta_rep_id as id
                FROM standard_report
                INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = standard_report.sta_rep_submodule_id
                                
                WHERE standard_report.sta_rep_maintenace_book_id = '1' and (sta_rep_status = '1')
                GROUP BY SubModuleName
                ORDER BY DocNumber ASC");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }
        public function recoveryStandardReport($id){
            try{
                $stmt = $this->dbConn->prepare("UPDATE standard_report SET 
                sta_rep_status = '0',
                sra_rep_delete_date = NULL
                WHERE 
                sta_rep_id = '".$id."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }
    }
/*

SELECT maintenance_book_support.mai_boo_sup_description as ModuleName, cor_ma_title as Title , cor_mai_type as DocNumber
                FROM corrective_maintenance
                INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = corrective_maintenance.cor_mai_module
                
                UNION
                
                SELECT maintenance_book_support.mai_boo_sup_description as ModuleName, sta_rep_title as Title , sta_rep_document_number as DocNumber
                FROM standard_report
                INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = standard_report.sta_rep_module_id
                
                WHERE standard_report.sta_rep_maintenace_book_id = '".$maintenanceBookId."'
*/
?>

