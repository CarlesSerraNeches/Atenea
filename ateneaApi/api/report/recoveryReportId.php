<?php
    include_once('../../class/report.php');
    
    $report = new Report(); // Create a new Report Class
    $report->recoveryStandardReport($_GET['id']);
    

?>
