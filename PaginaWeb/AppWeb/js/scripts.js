/*!
* Start Bootstrap - The Big Picture v5.0.1 (https://startbootstrap.com/template/the-big-picture)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-the-big-picture/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

let chart;

function getKilometros(lat1,lon1,lat2,lon2)
{
  rad = function(x) {return x*Math.PI/180;}
  var R = 6378.137; //Radio de la tierra en km
  var dLat = rad( lat2 - lat1 );
  var dLong = rad( lon2 - lon1 );
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d.toFixed(3); //Retorna tres decimales
}


function initMap(){
    var coordini = {lat:4.1871214 ,lng:-72.9565297};
    map = new google.maps.Map(document.getElementById('map'),{
      zoom: 6.5,
      center: coordini
    });
}

function homeMap(latitud, longitud)
{
  var coordHome = {lat:latitud ,lng: longitud};
  map = new google.maps.Map(document.getElementById('map'),{
    zoom: 14.5,
    center: coordHome
  });
  var markerHome = new google.maps.Marker({
    position: coordHome,
    title: "Casa del estudiante",
    icon: 'img/casa.png',
    map: map,
  });
}


function coleMap(rowData, latitud, longitud)
{
  var coordref = {lat:latitud ,lng: longitud};
  var marker = new google.maps.Marker({
    position: coordref,
    title: rowData[1],
    icon: 'img/escuela.png',
    map: map,
  });

  const contenido =
    '<h3 align="center">'+ rowData[1] +'</h3>' +
    '<p></p>' +
    '<h5> Información General </h5>' +
    '<p>'+"Departamento: "+ rowData[4] +'<br>' +
    "Municipio: "+ rowData[5] +'<br>' +
    "Sector: "+ rowData[6] +'<br>' +
    "Estrato: "+ rowData[7] +'<br>' +
    "Naturaleza: "+ rowData[8] +'<br>' +
    "Calendario: "+ rowData[9] +'<br>' +
    "Genero: "+ rowData[10] +'</p>' +
    "Cluster: "+ rowData[18] +'</p>' +
    '<p></p>' +
    '<h5 align="center"> Categoria del plantel </h5>' +
    '<h1 align="center">'+rowData[11]+'</h1>' ;


  var infowindow = new google.maps.InfoWindow({
		content: contenido
	});
  google.maps.event.addListener(marker, 'click', function()
  {
  infowindow.open(map,marker);
  });
}

function cargarbd(latitud, longitud, radio)
{
    $.ajax({
      url:'bd/geo.csv',
      dataType: 'text',
      contentType: 'charset=utf-8'
    }).done(grafica);

  function grafica(data)
  {
    var top1 =[]
    var top2 =[]
    var top3 =[]
    var top4 =[]
    var top5 =[]
    var lines = data.split('\n');
    var headers = lines[0].split(';')
    for (var i = 1; i<lines.length-1; i++)
    {
      var rowData = lines[i].split(';')
      var nombre = rowData[1];
      var latitud1 = parseFloat(rowData[2]);
      var longitud1 = parseFloat(rowData[3]);
      var dist = getKilometros(latitud, longitud, latitud1, longitud1)
      if (dist < radio)
      {
        coleMap(rowData, latitud1, longitud1);

        if (rowData[12] < top1[12] )
        {
          if (rowData[12] < top2[12] )
          {
            if (rowData[12] < top3[12] )
            {
                if (rowData[12] < top4[12] )
                {
                  if (rowData[12] < top5[12] )
                  {

                  }
                  else
                  {
                    top5=rowData;
                  }
                }
                else
                {
                  top5=top4;
                  top4=rowData;
                }
            }
            else
            {
              top5=top4;
              top4=top3;
              top3=rowData;
            }
          }
          else
          {
            top5=top4;
            top4=top3;
            top3=top2;
            top2=rowData;
          }
        }
        else
        {
          top5=top4;
          top4=top3;
          top3=top2;
          top2=top1;
          top1=rowData;
        }
      }
    }
    //console.log("-----------");
    //console.log("último  reg:" + rowData[12]);
    //console.log("puesto 1:" + top1[12] + " - " + top1[1] + " - " + top1[11]);
    //console.log("puesto 2:" + top2[12] + " - " + top2[1] + " - " + top2[11]);
    //console.log("puesto 3:" + top3[12] + " - " + top3[1] + " - " + top3[11]);
    //console.log("puesto 4:" + top4[12] + " - " + top4[1] + " - " + top4[11]);
    //console.log("puesto 5:" + top5[12] + " - " + top5[1] + " - " + top5[11]);

    //document.write("Puesto #1: " + top1[1]);

    //Envio los datos a la tabla

    document.getElementById("11").innerHTML = "1";
    document.getElementById("12").innerHTML = top1[1];
    document.getElementById("13").innerHTML = top1[8];
    document.getElementById("14").innerHTML = top1[10];
    document.getElementById("15").innerHTML = top1[7];
    document.getElementById("16").innerHTML = top1[5];
    document.getElementById("17").innerHTML = top1[6];
    document.getElementById("18").innerHTML = top1[11]
    document.getElementById("19").innerHTML = top1[12];
    document.getElementById("21").innerHTML = "2";
    document.getElementById("22").innerHTML = top2[1];
    document.getElementById("23").innerHTML = top2[8];
    document.getElementById("24").innerHTML = top2[10];
    document.getElementById("25").innerHTML = top2[7];
    document.getElementById("26").innerHTML = top2[5];
    document.getElementById("27").innerHTML = top2[6];
    document.getElementById("28").innerHTML = top2[11]
    document.getElementById("29").innerHTML = top2[12];
    document.getElementById("31").innerHTML = "3";
    document.getElementById("32").innerHTML = top3[1];
    document.getElementById("33").innerHTML = top3[8];
    document.getElementById("34").innerHTML = top3[10];
    document.getElementById("35").innerHTML = top3[7];
    document.getElementById("36").innerHTML = top3[5];
    document.getElementById("37").innerHTML = top3[6];
    document.getElementById("38").innerHTML = top3[11]
    document.getElementById("39").innerHTML = top3[12];
    document.getElementById("41").innerHTML = "4";
    document.getElementById("42").innerHTML = top4[1];
    document.getElementById("43").innerHTML = top4[8];
    document.getElementById("44").innerHTML = top4[10];
    document.getElementById("45").innerHTML = top4[7];
    document.getElementById("46").innerHTML = top4[5];
    document.getElementById("47").innerHTML = top4[6];
    document.getElementById("48").innerHTML = top4[11]
    document.getElementById("49").innerHTML = top4[12];
    document.getElementById("51").innerHTML = "5";
    document.getElementById("52").innerHTML = top5[1];
    document.getElementById("53").innerHTML = top5[8];
    document.getElementById("54").innerHTML = top5[10];
    document.getElementById("55").innerHTML = top5[7];
    document.getElementById("56").innerHTML = top5[5];
    document.getElementById("57").innerHTML = top5[6];
    document.getElementById("58").innerHTML = top5[11]
    document.getElementById("59").innerHTML = top5[12];
//    document.getElementById("tablaResultados").innerHTML = top2[1];
  //  document.getElementById("tablaResultados").innerHTML = top3[1];


  var miCanvas=document.getElementById("miGrafica").getContext("2d")
  if (chart) {
        chart.destroy();
    }
  chart =new Chart(miCanvas,{
    type:"line",
    data:{
      labels:["Matematicas","C_Naturales","C_Sociales","Lectura","Ingles"],
      datasets:[
        {
          label:"Posición #1",
          backgroundColor:"rgb(0,0,255)",
          borderColor:"rgb(0,0,255)",
          data:[top1[13],top1[14],top1[15],top1[16],top1[17]],
        },
        {
          label:"Posición #2",
          backgroundColor:"rgb(255,0,0)",
          borderColor:"rgb(255,0,0)",
          data:[top2[13],top2[14],top2[15],top2[16],top2[17]],
        },
        {
          label:"Posición #3",
          backgroundColor:"rgb(70,255,0)",
          borderColor:"rgb(70,255,0)",
          data:[top3[13],top3[14],top3[15],top3[16],top3[17]],
        },
        {
          label:"Posición #4",
          backgroundColor:"rgb(255,0,255)",
          borderColor:"rgb(255,0,255)",
          data:[top4[13],top4[14],top4[15],top4[16],top4[17]],
        },
        {
          label:"Posición #5",
          backgroundColor:"rgb(255,255,0)",
          borderColor:"rgb(255,255,0)",
          data:[top5[13],top5[14],top5[15],top5[16],top5[17]],
        },
      ]
    },

  })

  }

}














function cargarbd2(latitud, longitud, radio,  cluster)
{
    $.ajax({
      url:'bd/geo.csv',
      dataType: 'text',
      contentType: 'charset=utf-8'
    }).done(grafica2);

  function grafica2(data)
  {
    var top1 =[]
    var top2 =[]
    var top3 =[]
    var top4 =[]
    var top5 =[]
    var lines = data.split('\n');
    var headers = lines[0].split(';')
    for (var i = 1; i<lines.length-1; i++)
    {
      var rowData = lines[i].split(';')
      var nombre = rowData[1];
      var latitud1 = parseFloat(rowData[2]);
      var longitud1 = parseFloat(rowData[3]);
      var clusterbd = parseFloat(rowData[18]);
      console.log(cluster);
      console.log(clusterbd);
      var dist = getKilometros(latitud, longitud, latitud1, longitud1)
      if (dist < radio && cluster == clusterbd)
      {
        coleMap(rowData, latitud1, longitud1);

        if (rowData[12] < top1[12] )
        {
          if (rowData[12] < top2[12] )
          {
            if (rowData[12] < top3[12] )
            {
                if (rowData[12] < top4[12] )
                {
                  if (rowData[12] < top5[12] )
                  {

                  }
                  else
                  {
                    top5=rowData;
                  }
                }
                else
                {
                  top5=top4;
                  top4=rowData;
                }
            }
            else
            {
              top5=top4;
              top4=top3;
              top3=rowData;
            }
          }
          else
          {
            top5=top4;
            top4=top3;
            top3=top2;
            top2=rowData;
          }
        }
        else
        {
          top5=top4;
          top4=top3;
          top3=top2;
          top2=top1;
          top1=rowData;
        }
      }
    }
    //console.log("-----------");
    //console.log("último  reg:" + rowData[12]);
    //console.log("puesto 1:" + top1[12] + " - " + top1[1] + " - " + top1[11]);
    //console.log("puesto 2:" + top2[12] + " - " + top2[1] + " - " + top2[11]);
    //console.log("puesto 3:" + top3[12] + " - " + top3[1] + " - " + top3[11]);
    //console.log("puesto 4:" + top4[12] + " - " + top4[1] + " - " + top4[11]);
    //console.log("puesto 5:" + top5[12] + " - " + top5[1] + " - " + top5[11]);

    //document.write("Puesto #1: " + top1[1]);

    //Envio los datos a la tabla

    document.getElementById("11").innerHTML = "1";
    document.getElementById("12").innerHTML = top1[1];
    document.getElementById("13").innerHTML = top1[8];
    document.getElementById("14").innerHTML = top1[10];
    document.getElementById("15").innerHTML = top1[7];
    document.getElementById("16").innerHTML = top1[5];
    document.getElementById("17").innerHTML = top1[6];
    document.getElementById("18").innerHTML = top1[11]
    document.getElementById("19").innerHTML = top1[12];
    document.getElementById("21").innerHTML = "2";
    document.getElementById("22").innerHTML = top2[1];
    document.getElementById("23").innerHTML = top2[8];
    document.getElementById("24").innerHTML = top2[10];
    document.getElementById("25").innerHTML = top2[7];
    document.getElementById("26").innerHTML = top2[5];
    document.getElementById("27").innerHTML = top2[6];
    document.getElementById("28").innerHTML = top2[11]
    document.getElementById("29").innerHTML = top2[12];
    document.getElementById("31").innerHTML = "3";
    document.getElementById("32").innerHTML = top3[1];
    document.getElementById("33").innerHTML = top3[8];
    document.getElementById("34").innerHTML = top3[10];
    document.getElementById("35").innerHTML = top3[7];
    document.getElementById("36").innerHTML = top3[5];
    document.getElementById("37").innerHTML = top3[6];
    document.getElementById("38").innerHTML = top3[11]
    document.getElementById("39").innerHTML = top3[12];
    document.getElementById("41").innerHTML = "4";
    document.getElementById("42").innerHTML = top4[1];
    document.getElementById("43").innerHTML = top4[8];
    document.getElementById("44").innerHTML = top4[10];
    document.getElementById("45").innerHTML = top4[7];
    document.getElementById("46").innerHTML = top4[5];
    document.getElementById("47").innerHTML = top4[6];
    document.getElementById("48").innerHTML = top4[11]
    document.getElementById("49").innerHTML = top4[12];
    document.getElementById("51").innerHTML = "5";
    document.getElementById("52").innerHTML = top5[1];
    document.getElementById("53").innerHTML = top5[8];
    document.getElementById("54").innerHTML = top5[10];
    document.getElementById("55").innerHTML = top5[7];
    document.getElementById("56").innerHTML = top5[5];
    document.getElementById("57").innerHTML = top5[6];
    document.getElementById("58").innerHTML = top5[11]
    document.getElementById("59").innerHTML = top5[12];
//    document.getElementById("tablaResultados").innerHTML = top2[1];
  //  document.getElementById("tablaResultados").innerHTML = top3[1];


  var miCanvas=document.getElementById("miGrafica").getContext("2d")
  if (chart) {
        chart.destroy();
    }
  chart =new Chart(miCanvas,{
    type:"line",
    data:{
      labels:["Matematicas","C_Naturales","C_Sociales","Lectura","Ingles"],
      datasets:[
        {
          label:"Posición #1",
          backgroundColor:"rgb(0,0,255)",
          borderColor:"rgb(0,0,255)",
          data:[top1[13],top1[14],top1[15],top1[16],top1[17]],
        },
        {
          label:"Posición #2",
          backgroundColor:"rgb(255,0,0)",
          borderColor:"rgb(255,0,0)",
          data:[top2[13],top2[14],top2[15],top2[16],top2[17]],
        },
        {
          label:"Posición #3",
          backgroundColor:"rgb(70,255,0)",
          borderColor:"rgb(70,255,0)",
          data:[top3[13],top3[14],top3[15],top3[16],top3[17]],
        },
        {
          label:"Posición #4",
          backgroundColor:"rgb(255,0,255)",
          borderColor:"rgb(255,0,255)",
          data:[top4[13],top4[14],top4[15],top4[16],top4[17]],
        },
        {
          label:"Posición #5",
          backgroundColor:"rgb(255,255,0)",
          borderColor:"rgb(255,255,0)",
          data:[top5[13],top5[14],top5[15],top5[16],top5[17]],
        },
      ]
    },

  })

  }

}















function recomendar()
{
  var latitud = parseFloat(document.getElementById("latitud").value);
  var longitud = parseFloat(document.getElementById("longitud").value);
  var radio = parseFloat(document.getElementById("radio").value);
  homeMap(latitud, longitud);
  cargarbd(latitud, longitud, radio);
}


function recomendar2()
{
  var C0 = [0.00781250000000003, 0.00390625, 0.98828125, 2.22044604925031*Math.pow(10, -16), 1, -2.4980018054066*Math.pow(10, -16), 1.38777878078144*Math.pow(10, -17), 1.7347234759768*Math.pow(10, -17), 2.168404344971*Math.pow(10, -18), 2.168404344971*Math.pow(10, -18), 0.902343749999999, 0.0234375, 0.0195312499999999, 0.0546874999999999, -2.77555756156289*Math.pow(10, -18)];
  var C1 = [0.017857143, 3.46945*Math.pow(10, -18),	0.982142857,	2.22045*Math.pow(10, -16),	0.988095238,	-1.94289*Math.pow(10, -16),	0.005952381,	1.38778*Math.pow(10, -17),	-8.67362*Math.pow(10, -19),	0.005952381,	-5.55112*Math.pow(10, -16),	2.77556*Math.pow(10, -17),	-3.46945*Math.pow(10, -18),	1.38778*Math.pow(10, -17), 1];
  var C2 = [3.46945*Math.pow(10, -17),	4.33681*Math.pow(10, -18),	1,	1,	1.11022*Math.pow(10, -16),	-2.498*Math.pow(10, -16),	6.93889*Math.pow(10, -18),	1.56125*Math.pow(10, -17),	4.33681*Math.pow(10, -19),	4.33681*Math.pow(10, -19),	0.944444444,	3.46945*Math.pow(10, -17),	0.025252525,	0.03030303,	-2.77556*Math.pow(10, -16)];
  var C3 = [0.051282051,	8.67362*Math.pow(10, -19),	0.948717949,	5.55112*Math.pow(10, -17),	0,	1,	6.93889*Math.pow(10, -18),	1.73472*Math.pow(10, -18),	-8.67362*Math.pow(10, -19),	-8.67362*Math.pow(10, -19),	1.11022*Math.pow(10, -16),	0.025641026,	0.038461538,	0.192307692,	0.743589744];
  var C4 = [0.124031008,	0.007751938,	0.868217054,	1.66533*Math.pow(10, -16),	-2.22045*Math.pow(10, -16),	1,	1.38778*Math.pow(10, -17),	1.04083*Math.pow(10, -17),	-1.73472*Math.pow(10, -18),	-1.73472*Math.pow(10, -18),	1,	6.93889*Math.pow(10, -18),	-5.20417*Math.pow(10, -18),	0,	-2.22045*Math.pow(10, -16)];

  var C5 = [-6.93889*Math.pow(10, -18),	-8.67362*Math.pow(10, -19),	1,	1,	-1.11022*Math.pow(10, -16),	-5.55112*Math.pow(10, -17),	0,	1.73472*Math.pow(10, -18),	-1.30104*Math.pow(10, -18),	-1.30104*Math.pow(10, -18),	0,	-6.93889*Math.pow(10, -18),	-5.20417*Math.pow(10, -18),	6.93889*Math.pow(10, -18),	1];

  var C6 = [0,	0,	1,	1,	0,	0,	6.93889*Math.pow(10, -18),	1.73472*Math.pow(10, -18),	-8.67362*Math.pow(10, -19),	-8.67362*Math.pow(10, -19),	1.11022*Math.pow(10, -16),	1,	-1.73472*Math.pow(10, -18),	6.93889*Math.pow(10, -18),	-5.55112*Math.pow(10, -17)];
  var C7 = [0.170731707,	0.048780488,	0.780487805,	0,	-5.55112*Math.pow(10, -17),	0,	0.512195122,	0.365853659,	0.073170732,	0.048780488,	0.951219512,	-6.93889*Math.pow(10, -18),	0.024390244,	0.024390244,	-5.55112*Math.pow(10, -17)];

  var latitud2 = parseFloat(document.getElementById("latitud2").value);
  var longitud2 = parseFloat(document.getElementById("longitud2").value);
  var radio2 = parseFloat(document.getElementById("radio2").value);
  var genero = document.getElementById("genero").value;
  var estrato = document.getElementById("estrato").value;
  var caracter = document.getElementById("caracter").value;

  var D = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

     if (genero == "Femenino") {
        D[0]=1;
      }  else if (genero == "Masculino") {
          D[1]=1;
      } else {
        D[2]=1;
      }

      if (estrato == "Estrato 1") {
        D[3]=1;
      }  else if (estrato == "Estrato 2") {
        D[4]=1;
      } else if (estrato == "Estrato 3") {
        D[5]=1;
      } else if (estrato == "Estrato 4") {
        D[6]=1;
      } else if (estrato == "Estrato 5") {
        D[7]=1;
      } else if (estrato == "Estrato 6") {
        D[8]=1;
      } else {
        D[9]=1;
      }

      if (caracter == "Académico") {
        D[10]=1;
      }  else if (caracter == "No aplica") {
        D[11]=1;
      } else if (caracter == "None") {
        D[12]=1;
      } else if (caracter == "Técnico") {
        D[13]=1;
      } else {
        D[14]=1;
      }


//distancia

  var vClus = [0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i <= 14; i++) {
    vClus[0] = vClus[0] + Math.pow(C0[i]-D[i], 2);
    vClus[1] = vClus[1] + Math.pow(C1[i]-D[i], 2);
    vClus[2] = vClus[2] + Math.pow(C2[i]-D[i], 2);
    vClus[3] = vClus[3] + Math.pow(C3[i]-D[i], 2);
    vClus[4] = vClus[4] + Math.pow(C4[i]-D[i], 2);
    vClus[5] = vClus[5] + Math.pow(C5[i]-D[i], 2);
    vClus[6] = vClus[6] + Math.pow(C6[i]-D[i], 2);
    vClus[7] = vClus[7] + Math.pow(C7[i]-D[i], 2);
  }

  for (let i = 0; i <= 7; i++) {
    vClus[i] =  Math.pow(vClus[i], 1/2);
  }


  //buscando cluster
  var cluster = 0;
  for (let i = 0; i <= 6; i++) {
    if (vClus[i] < vClus[i+1]) {
      cluster = i;
    } else {
      cluster = i+1;
    }
  }

  homeMap(latitud2, longitud2);
  cargarbd2(latitud2, longitud2, radio2, cluster);





}
