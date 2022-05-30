<?php // Just for testing

var_dump('ATENEA API is UP and RUNNING');

/*SQL: get all the reports

SELECT maintenance_book_support.mai_boo_sup_description as ModuleName,
	maintenance_book_support.mai_boo_sup_description as SubModuleName, cor_ma_title as Title , cor_mai_type as DocNumber
FROM corrective_maintenance
INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = corrective_maintenance.cor_mai_module
INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = corrective_maintenance.cor_mai_sub_module


UNION

SELECT maintenance_book_support.mai_boo_sup_description as ModuleName,
	maintenance_book_support.mai_boo_sup_description as SubModuleName, sta_rep_title as Title , sta_rep_document_number as DocNumber
FROM standard_report
INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = standard_report.sta_rep_module_id
INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = standard_report.sta_rep_submodule_id

GROUP BY ModuleName

*/

?>

