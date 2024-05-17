let dbData = []

var ExcelToJSON = function() {
  this.parseExcel = function(file) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var dataExcel = e.target.result;
      var workbook = XLSX.read(dataExcel, {
        type: 'binary'
      });
      workbook.SheetNames.forEach(function(sheetName) {
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var productList = JSON.parse(JSON.stringify(XL_row_object));
        console.log('productList. length is ')
        console.log(productList.length)
        console.log('------------------------')
        for (i = 0; i < productList.length; i++) {
          var cols = Object.values(productList[i])
          console.log('cols value are')
          console.log(cols)
          console.log('------------------------')
          var objAux = {
            id: i+1,
            nome: cols[0]
          }
          objAux['cachorro'] = cols[1]
          objAux['gato'] = cols[2]
          objAux['filhote'] = cols[3]
          objAux['coleira'] = cols[4]
          objAux['comprimido'] = cols[5]
          objAux['pipeta'] = cols[6]
          objAux['spray'] = cols[7]
          objAux['pulga'] = cols[8]
          objAux['carrapato'] = cols[9]
          objAux['sarna'] = cols[10]
          objAux['verme'] = cols[11]
          objAux['repelente'] = cols[12]
          objAux['detetizador'] = cols[13]
          dbData.push(objAux)
          /*
          console.log('objAux')
          console.log(objAux)
          console.log('------------------------')
          */
        }


        let transaction = db.transaction(dbObjStoreName, "readwrite");
        let objectStore = transaction.objectStore(dbObjStoreName);

        $.each(dbData, function(i, obj){
          let addRequest = objectStore.add(obj);

          addRequest.onsuccess = function(event) {
            console.log('Data added successfully')
          };
        })

        //window.location.reload()
        

        

      })
    };
    reader.onerror = function(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0]);
}

document.getElementById('fileupload').addEventListener('change', handleFileSelect, false);