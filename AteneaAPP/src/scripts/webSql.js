export class WebSql {

  // Controlador del WEBSQL / SQLlite
  // NOTA: En un entorno de producción usar SQLite (No funciona en el navegador), pero para testting usar WEBSQL.
  //        RECORDAR: WebSql max 50 Megas

  /** CREATE TABLE
   * Funciones para sicnonizar masivamente la BBDD y el SQLite
   * Funcion para insertar registros de la rutina de la app
   */
  createTable(database, info){
    console.log(database);
    let db = openDatabase('ateneaNew', '1.0', 'My first database', 2 * 1024 * 1024)
    console.log('>>> WEB SQL: Creatting a new Data Base');
    switch(database){
      case 'maibook':
        console.log('DB TRANSACCION');
        db.transaction(function (tx) {  
          tx.executeSql('CREATE TABLE IF NOT EXISTS mai_boo (id, Name, it)');
          info.forEach(element => {
            console.log(element.mai_boo_id);
            tx.executeSql('insert into mai_boo(id, Name, it) values(' + element.mai_boo_id + ',"' + element.mai_boo_title + '","' + element.mai_boo_it + '")');
          }); 
        });
        break;
      case 'staReport':
        db.transaction(function (tx) {  
          tx.executeSql('CREATE TABLE IF NOT EXISTS sta_rep (DocNumber, ModuleName, Title)');
          info.forEach(element => {
            tx.executeSql('insert into sta_rep (DocNumber, ModuleName, Title) values("'+ element.DocNumber +'","' +  element.ModuleName + '","' +  element.Title + '")');
          })
        });
        break;
      case 'corMaintenance':
        db.transaction(function (tx) {  
          tx.executeSql('CREATE TABLE IF NOT EXISTS cor_mai (cor_ma_title, cor_mai_id, cor_mai_module, cor_mai_type)');
          info.forEach(element => {
            tx.executeSql('insert into sta_rep (DocNumber, ModuleName, Title) values("'+ element.DocNumber +'","' +  element.ModuleName + '","' +  element.Title + '")');
          });
        })
        break;
      case 'newDocument':
        db.transaction(function (tx) {  
          tx.executeSql('CREATE TABLE IF NOT EXISTS documents (doc_id, sta_rep_title, sta_rep_document_number, sta_rep_created_data)');
          info.forEach(element => {
            tx.executeSql('insert into sta_rep (doc_id, sta_rep_title, sta_rep_document_number, sta_rep_created_data) values("'+ element.doc_id +'","' +  element.sta_rep_title + '","' +  element.sta_rep_document_number + '","' +  element.sta_rep_created_data + '","' +  element.observations + ' )');
          });
        })
        break;
      default:
        console.log('Excepcion no controlada');
        break;
    }
  }

  /** UPDATE.- Funcion para actualizar 
   * Funcion para actulizar registros -
   */
    update(database, info){
      console.log(database);
      let db = openDatabase('ateneaNew', '1.0', 'My first database', 2 * 1024 * 1024)
      console.log('>>> WEB SQL: Creatting a new Data Base');
      switch(database){
        case 'maibook':
          db.transaction(function (tx) {
            console.log('DB TRANSACTION: Update ' + database);
            tx.executeSql('UPDATE maibook SET  Name = ' + info.name + ' , it = ' + info.it + ' WHERE id=' + info.id);
          });
          break;
        case 'newDocument':
          db.transaction(function (tx) {  
            tx.executeSql('CREATE TABLE IF NOT EXISTS documents (doc_id, sta_rep_title, sta_rep_document_number, sta_rep_created_data)');
            info.forEach(element => {
            tx.executeSql('UPDATE newDocument SET  sta_rep_title = ' + info.sta_rep_title + ' , sta_rep_document_number = ' + info.sta_rep_document_number + ',sta_rep_created_data = '+ info.sta_rep_document_numbe +', active = ' + info.active + ' WHERE doc_id=' + info.doc_id);
            });
          })
          break;
        default:
          console.log('Excepcion no controlada');
          break;
      }
    }


  /* Selector de informacion*/
  selectValues(database){
    var l = [];
    let db = openDatabase('ateneaNew', '1.0', 'My first database', 2 * 1024 * 1024)
    db.transaction(function(tx){
      tx.executeSql("SELECT * FROM "+ database, null,
      function(tx, res){
        for (var i = 0; i < res.rows.length; i++) {
          l.push(res.rows.item(i));
        }

        console.log('Que em de fer ? ');
        console.log(JSON.stringify(l, null, '\t'));
        return(JSON.stringify(l));
      })
    });
  }
}