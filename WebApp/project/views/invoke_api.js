var ctx_tehu = document.getElementById("canTeHu");
var ctx_coso = document.getElementById("canCoSo");
var ctx_bar = document.getElementById("canBar");

//빨강, 파랑, 초록, 빨강배경, 초록배경, 갈색, 갈색배경
var colors = ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(60, 179, 113, 1)','rgba(54, 162, 235, 0.2)','rgba(60, 179, 113, 0.2)','rgba(153, 102, 000, 1)','rgba(153, 102, 000, 0.2)'];

var optionsAnimation = {
    //Boolean - If we want to override with a hard coded scale
    scaleOverride : true,
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps : 10,
    //Number - The value jump in the hard coded scale
    scaleStepWidth : 10,
    //Number - The scale starting value
    scaleStartValue : 0
}
  
  // Not sure why the scaleOverride isn't working...
var optionsNoAnimation = {
    animation : false,
    //Boolean - If we want to override with a hard coded scale
    scaleOverride : true,
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps : 20,
    //Number - The value jump in the hard coded scale
    scaleStepWidth : 10,
    //Number - The scale starting value
    scaleStartValue : 0
}
//0-온도, 1-습도
var ctTeHu = new Chart(ctx_tehu, {
    type: 'line',
    data: {
        labels: ['1', '2', '3', '4', '5', '6','7', '8', '9','10'],
        datasets: [{
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'transparent',
            borderColor: colors[0],
            borderWidth: 4,
            pointBackgroundColor: colors[0],
            label: "온도",
            yAxisID: "y_1",
        },{
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: colors[3],
            borderColor: colors[1],
            borderWidth: 4,
            pointBackgroundColor: colors[1],
            label: "습도",
            yAxisID: "y_2",

        }]
    },
    options: {
        animation : false,
        //Boolean - If we want to override with a hard coded scale
        scaleOverride : true,
        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps : 20,
        //Number - The value jump in the hard coded scale
        scaleStepWidth : 10,
        //Number - The scale starting value
        scaleStartValue : 0,
      scales: {
        yAxes: [{
          label: "온도",
          stacked: false,
          position: "left",
          id: "y_1",
          ticks: {
                min: 0,
                max: 30,
                fontSize : 12
            },
            scaleLabel: {
                display: true,
                labelString: '온도 (°C)',
                fontSize: 14
              }
        }, {
          label: "습도 (%)",
          stacked: false,
          position: "right",
          id: "y_2",
          ticks: {
            min: 0,
            max: 100,
            fontSize : 12
        },
        scaleLabel: {
            display: true,
            labelString: '습도(%) ',
            fontSize: 14
          }
        }]
      }
    }
});
var ctCoSo = new Chart(ctx_coso, {
    type: 'line',
    data: {
        labels: ['1', '2', '3', '4', '5', '6','7', '8', '9','10'],
        datasets: [{
            data: ['1', '2', '3', '4', '5', '6','7', '8', '9','10'],
            backgroundColor: colors[4],
            borderColor: colors[2],
            borderWidth: 4,
            pointBackgroundColor: colors[2],
            label: "CO2",
            yAxisID: "CO2",
        },{
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: colors[6],
            borderColor: colors[5],
            borderWidth: 4,
            pointBackgroundColor: colors[5],
            label: "토양수분",
            yAxisID: "y_solid",
        }
        ]
    },
    options: {
        animation : false,
        //Boolean - If we want to override with a hard coded scale
        scaleOverride : true,
        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps : 20,
        //Number - The value jump in the hard coded scale
        scaleStepWidth : 10,
        //Number - The scale starting value
        scaleStartValue : 0,
      scales: {
        yAxes: [{
          label: "CO2",
          stacked: false,
          position: "left",
          id: "CO2",
          ticks: {
                min: 0,
                max: 2500,
                fontSize : 12
            },
            scaleLabel: {
                display: true,
                labelString: 'CO2 (ppm)',
                fontSize: 14
              }
        },{
          label: "토양수분",
          stacked: false,
          position: "right",
          id: "y_solid",
          ticks: {
                min: 0,
                max: 100,
                fontSize : 12
            },
            scaleLabel: {
                display: true,
                labelString: '토양수분 (%)',
                fontSize: 14
              }
        }]
      }
    }
});
var ctBar = new Chart(ctx_bar, {
    type: 'bar',
    data: {
        labels: ["Sun", "", "Mon", "","Tue", "","Wed", "", "Thr", "","Fri", "","Sat", ""],
        datasets: [{
            label: '조도/온도',
            data: [5,18,7,20,6,17,4,16,6,19,8,21,9,22],
            backgroundColor: [
                'rgba(189, 155, 255, 0.2)',
                'rgba(252, 184, 116, 0.2)',
                'rgba(189, 155, 255, 0.2)',
                'rgba(252, 184, 116, 0.2)',
                'rgba(189, 155, 255, 0.2)',
                'rgba(252, 184, 116, 0.2)',
                'rgba(189, 155, 255, 0.2)',
                'rgba(252, 184, 116, 0.2)',
                'rgba(189, 155, 255, 0.2)',
                'rgba(252, 184, 116, 0.2)',
                'rgba(189, 155, 255, 0.2)',
                'rgba(252, 184, 116, 0.2)',
                'rgba(189, 155, 255, 0.2)',
                'rgba(252, 184, 116, 0.2)',   
            ],
            borderColor: [
                'rgba(189, 155, 255, 1)',
                'rgba(252, 184, 116, 1)',
                'rgba(189, 155, 255, 1)',
                'rgba(252, 184, 116, 1)',
                'rgba(189, 155, 255, 1)',
                'rgba(252, 184, 116, 1)',
                'rgba(189, 155, 255, 1)',
                'rgba(252, 184, 116, 1)',
                'rgba(189, 155, 255, 1)',
                'rgba(252, 184, 116, 1)',
                'rgba(189, 155, 255, 1)',
                'rgba(252, 184, 116, 1)',
                'rgba(189, 155, 255, 1)',
                'rgba(252, 184, 116, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      title: {
        display: true,
        text: '기준 조도/온도'
      },
      maintainAspectRatio: true, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
      legend:{display: false},
      scales: {
        yAxes: [{
          gridLines:{
            drawBorder: false,
            color: ['rgb(140,140,140,0.3)', 'red', 'rgb(140,140,140,0.3)', 'rgb(140,140,140,0.3)', 'green', 'rgb(140,140,140,0.3)', 'rgb(140,140,140,0.3)', 'rgb(140,140,140,0.3)']
          },
          ticks: {
            min:0,
            max:25,
            stepSize:5
          }
        }]
      }
    }
});

////////////////////////////////
//통신
///////////////////////////////
var token;
const num_sensor = 6;

function getTagStram (result) {
    token = result.access_token;
    var API_URI = ':443/api/v1/streams/kshwnaD1577425651530/log?period=1&count=6';

    var rtData = new Array();
    var rtTime = new Array();
    

    $.ajax('https://iotmakers.kt.com' + API_URI, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + result.access_token},
        contentType: 'application/data',
        async: false,
        success: function (data, status, xhr) {
            
            for(var i = 0; i<num_sensor; i++){
                var parseData = data.data[i].attributes;
                var parseTime = data.data[i].occDt;

                //console.log(parseData);
                //console.log(parseTime);

                rtData.push(parseData);
                rtTime.push(parseTime);
            }
        },
        error: function(xhr,status,e){
            console.log(e);
        }
    });
    // console.log(rtData);
    // console.log(rtTime);
    return [rtData,rtTime];
}

function invokeAPI(){
    var appId = "yxb4uHnXGYt43Qm9";
    var secret = "vHHE2RHSZpsibFRD";
    var tagStream;
    
    $.ajax('https://iotmakers.kt.com/oauth/token', {
        method: 'POST',
        xhrFields: { withCredentials: true },
        headers: { 'Authorization': 'Basic ' + btoa(appId + ':' + secret)},
        data: { grant_type: 'password',
            username: 'kshwnahr',
            password: 'zx10op89!@#'
        },
        async: false,
        success: function(result){
            tagStream = getTagStram(result);
            //console.log(tagStream);
        },
        error: function(xhr,status,error){
            console.log(xhr);
        }
    });
    return tagStream;
};

var sen_data;
var cntLight = 10;
var cntRED = 10;
var cntTeHu = 10;
var cntCoSo =10;

var getData = function() {
    setInterval(function() {
        sen_data = invokeAPI();
    }, 1000);
    
    console.log(sen_data[0]);
    //console.log(sen_data[1]);
    
    for(var i = 0; i<num_sensor; i++){
        for(key in sen_data[0][i]){
            //console.log(key);
            if(key == "Solid"){
                var valSolid = sen_data[0][i][key];

                ctCoSo.data.datasets[1].data.push(valSolid);
                ctCoSo.data.datasets[1].data.shift();
            }
            
            else if(key == "CO2"){
                var valCO2 = sen_data[0][i][key];

                ctCoSo.data.labels.shift();
        
                ctCoSo.data.datasets[0].data.push(valCO2);
                ctCoSo.data.datasets[0].data.shift();

                cntCoSo++;
                ctCoSo.data.labels.push(cntCoSo);
            }
            else if(key == "Humi"){
                var valHumi = sen_data[0][i][key];
            
                ctTeHu.data.datasets[1].data.push(valHumi);
                ctTeHu.data.datasets[1].data.shift();
            }
            else if(key == "Temp"){
                var valTemp = sen_data[0][i][key];

                ctTeHu.data.labels.shift();

                ctTeHu.data.datasets[0].data.push(valTemp);
                ctTeHu.data.datasets[0].data.shift();

                cntTeHu++;
                ctTeHu.data.labels.push(cntTeHu);
            }
        }
    } 
    ctCoSo.update();
    ctTeHu.update();
}
