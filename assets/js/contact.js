let firebaseConfig = {
    apiKey: "AIzaSyBuGlNW59BCtKQ-hPD4vy9WbUhw9a8jo3g",
    authDomain: "qweqweqweqsad-5a9ef.firebaseapp.com",
    projectId: "qweqweqweqsad-5a9ef",
};


// Initialize Firebase
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

$('#pass').click(() => {

    db.collection("Contact")
    .add({
        Firstname: $('#Firstname').val(),
        Lastname: $('#Lastname').val(),
        Gender: $("[type='radio']:checked").val(),
        Email: $('#Email').val(),
        // Blur_Email: letter,
        Detail: $('#Detail').val(),
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        $('#Firstname').val(''),
        $('#Lastname').val(''),
        $('#Email').val(''),
        $('#Detail').val('')
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
})

$('#reset').click(() => {
        $('#Firstname').val(''),
        $('#Lastname').val(''),
        $('#Email').val(''),
        $('#Detail').val('')
});
    

db.collection('Contact').orderBy("Firstname").onSnapshot(doc =>{
    let table = $('tbody')[0]
    document.querySelectorAll("tbody tr").forEach(item => item.remove())
    var male = 0;
    var female = 0;
    var other = 0;
    doc.forEach(item => {
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secondCell = row.insertCell(1)
        let thridCell = row.insertCell(2)
        let forthCell = row.insertCell(3)
        let fifthCell = row.insertCell(4)

        if (item.data().Gender == "Male") {male++;} else if(item.data().Gender == "Female") {female++; } else {other++;}

        let letter = item.data().Email;
        let letter_buff = letter[0];
        for (let index = 1 ; index < letter.length ; index++) {
        if (letter[index] == "@" || letter[index] == ".") {
            letter_buff += letter[index]
        }else{
            letter_buff +=  "x";
        }
        1
        }

        firstCell.textContent = item.data().Firstname
        secondCell.textContent = item.data().Lastname
        thridCell.textContent = item.data().Gender
        forthCell.textContent = letter_buff
        fifthCell.textContent = item.data().Detail

        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
      
        // var resultmale = male/(male + female + other)*100;
        // var resultfemale = female/(male + female + other)*100;
        // var resultother = other/(male + female + other)*100;
              
        function drawChart() {
                var data = google.visualization.arrayToDataTable([
                  ['Task', 'All Time'],
                  ['Male',male],
                  ['Female',female],
                  ['Others',other],
                ]);
        
                var options = {
                  title: 'Gender',
                  titleTextStyle: {color: 'black', fontSize: 30},
                  colors:['#EC00FF','#3055FF','#7EE182'] ,
                  pieHole: 0.5,
                };
        
                var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                chart.draw(data, options);
              };
                
            })
});




