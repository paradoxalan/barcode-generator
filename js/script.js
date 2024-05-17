var defaultValues = {
    CODE128 : "Example 1234",
    CODE128A : "EXAMPLE",
    CODE128B : "Example text",
    CODE128C : "12345678",
    EAN13 : "1234567890128",
    EAN8 : "12345670",
    UPC : "123456789999",
    CODE39 : "EXAMPLE TEXT",
    ITF14 : "10012345000017",
    ITF : "123456",
    MSI : "123456",
    MSI10 : "123456",
    MSI11 : "123456",
    MSI1010 : "123456",
    MSI1110 : "123456",
    pharmacode : "1234"
};

$(document).ready(function(){
    //$("#userInput").on('input',newBarcode);
    $("#gerar").on('click',generateBarcodes);

    $("#barcodeType").change(function(){
        //$("#userInput").val( defaultValues[$(this).val()] );

        newBarcode();
    });

    $("#bar-margin").change(function(){
        //$("#userInput").val( defaultValues[$(this).val()] );

        generateBarcodes()
    });

    $("#bar-width").change(function(){
        //$("#userInput").val( defaultValues[$(this).val()] );

        generateBarcodes()
    });

    $("#bar-height").change(function(){
        //$("#userInput").val( defaultValues[$(this).val()] );

        generateBarcodes()
    });

    //newBarcode();
});

var generateBarcodes = function() {
  $("#barcodes").empty()
  var lines = $('#userInput').val().split('\n');
  for(var i = 0;i < lines.length;i++){
    var line = lines[i]

    if (line) {
      line = line.trim()
      if (line != '') {
        var id = "barcode"+(i+1)
        var el = '<div class="barcode-container">'
        var chk = '<span class="chk"><input type="checkbox" onchange="window[\'chkOnChange\'](event);"></input></span>'
        el += '<div class="hide red text-danger" id="'+id+'invalid">Erro ao gerar código de barras, valor: '+line+'</div>'
        el += '<div>'+chk
        el += '<svg id="'+id+'" /></div>'
        el += '</div>'
        
        var svg = $(el)
        $("#barcodes").append(svg)
        newBarcode(line, "#"+id, "#"+id+'invalid')

      }
    }

  }
  updateTitles()
}

var newBarcode = function(inputArg, elementSelectorArg, elementInputinvalid) {
    //Convert to boolean
    $(elementSelectorArg).JsBarcode(
        inputArg,
        {
          "format": $("#barcodeType").val(),
          //"background": $("#background-color").val(),
          //"lineColor": $("#line-color").val(),
          //"fontSize": parseInt($("#bar-fontSize").val()),
          "height": parseInt($("#bar-height").val()),
          "width": $("#bar-width").val(),
          "margin": parseInt($("#bar-margin").val()),
          //"textMargin": parseInt($("#bar-text-margin").val()),
          //"displayValue": $(".display-text.btn-primary").val() == "true",
          //"font": $("#font").val(),
          //"fontOptions": $(".font-option.btn-primary").map(function(){return this.value;}).get().join(" "),
          //"textAlign": $(".text-align.btn-primary").val(),
          "valid":
            function(valid,arg){
              if(valid){
                console.log('valid')
                $(elementSelectorArg).show();
                $(elementInputinvalid).hide();
              }
              else{
                console.log('invalid')
                $(elementSelectorArg).hide();
                $(elementInputinvalid).show();
              }
            }
        });
};