var fileInput = document.getElementById("csv")

function readFile() {
  var reader = new FileReader();
  reader.onload = function () {
    generateData(reader.result);
  };
  // start reading the file. When it is done, calls the onload event defined above.
  reader.readAsText(fileInput.files[0], 'ISO-8859-1');
}

//fileInput.addEventListener('change', readFile);
// Creates the Text Files
function generateData(text) {
  // Find text to fill
  var assid = document.getElementById('ass').value;
  var factors = document.getElementById('stuff').getElementsByTagName( 'input' );
  var sendMail = document.getElementById('checkBox').checked;
  var factorText = [];
  var factorNum = [];
  for(var i = 2; i < factors.length; i++) {
    if(i % 2 === 0) {
      factorText.push(factors[i].value)
    }
    if((i + 1) % 2 === 0) {
      factorNum.push(factors[i].value)
    }
  }
  datar = {
    'factorText': factorText,
    'factorNum': factorNum,
    'text': text,
    'assid': assid,
    'sendMail': sendMail,
  }
  datar=JSON.stringify(datar);

  $.ajax({
       type: "POST",
       url: "/files",
       data: datar,
       contentType: 'application/json',
       success: function (dt, status, request) {
          console.log("happy face")
       },
   });

  /*$.post('/file', {
    data: text,
    numberOfFactors: factors,
    factorText: factorText,
    factorNum: factorNum,
  });*/


  //var textArray = text.split('\n');

  /*for(var i = 0; i < textArray.length - 2; i++) {
    var thisText = textArray[i].split(";");
    console.log(thisText)
    var genText = 'Vefforritun	Verkefni ' + assid + "\r\n";
    genText += " " + "\r\n";

    genText += "Upplýsingar um einkunnagjöf:" + "\r\n";
    for(var j = 0; j < factorText.length; j++) {
      genText += factorText[j] + ": " + factorNum[j] + "%" + "\r\n";
    }
    genText += "Alls: 100.00%" + "\r\n";
    genText += " " + "\r\n";

    genText += "====================== ÞÍNAR EINKUNNIR ======================" + "\r\n";
    genText += "Nemandi: " + thisText[0] + "\r\n";
    for(var j = 0; j < factorText.length; j++) {
      genText += factorText[j] + ": " + thisText[j+1] + "%" + "\r\n";
    }
    genText += "Alls: " + thisText[thisText.length-2] + "%" + "\r\n";
    genText += " "+ "\r\n";

    genText += "Einkunn: "+ thisText[thisText.length-2] + "\r\n";
    genText += "===================== ATHUGASEMDIR ===========================" + "\r\n";

    genText += " "+ "\r\n";
    genText += thisText[thisText.length-1];
    genText += "==============================================================" + "\r\n";

    genText += "emailið er auto-generatað."+ "\r\n";
    var blob = new Blob([genText], {type: "text/plain;charset=utf-8"});
    saveAs(blob, thisText[0]);
  }*/
}
// Adds more factors
function moreFac() {
  var count = document.getElementById('count');
  count.innerHTML = count.innerHTML - -1;

  var br = document.createElement("br");
  var i1 = document.createElement("input");
  i1.setAttribute("type", "text");
  i1.setAttribute("id", "fac");
  var i2 = document.createElement("input");
  i2.setAttribute("type", "number");
  i2.setAttribute("id", "val");
  document.getElementById('stuff').appendChild(br);
  document.getElementById('stuff').appendChild(i1);
  document.getElementById('stuff').appendChild(i2)
}
