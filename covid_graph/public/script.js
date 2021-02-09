var d = new Date()
var date = d.getDate()
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var day = dayNames[d.getDay()]
var monthNames = ['January','February','March','April','May','Juin','July','August','September','October','November','December']
var month = monthNames[d.getMonth()]

document.getElementById('date').textContent = date 
document.getElementById('day').textContent = day+','
document.getElementById('month').textContent = month



const url = 'https://finnhub.io/api/v1/covid19/us?token=c0gla0f48v6ttm1se070'

async function Getdata(){
    const response = await fetch(url);
    const data = await response.json();

    /// Total morts et cas
    var sumdeath = data.reduce(function(_this, val) {
        return _this + val.death
    }, 0);
    var sumcases = data.reduce(function(_this, val) {
        return _this + val.case
    }, 0);

    document.getElementById('TotalDeath').textContent = sumdeath;
    document.getElementById('Totalcases').textContent = sumcases;

    /// Liste pour graphes 5 villes avec + de morts 
    var rankmort = []
    for (let morts in data){
        rankmort.push(data[morts].death)
    }
    /// tri liste

    var rankmort5 = rankmort.sort((a, b) => b - a);
    rankmort5 = rankmort.slice(0,40);

    indexville = []

    for(const i in rankmort5){
        indexville.push(data.map(function(o) { return o.death; }).indexOf(rankmort5[i]));
    }

    console.log(indexville)
    var rankville5 = []
    for (i in indexville){
        rankville5.push((data[indexville[i]].state));
    }
    



        /// Graph ///

    var ctx = document.getElementById('rankstate').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
            labels: rankville5,
            datasets: [{
                label: 'Deaths in USA',
                backgroundColor: '#CDD8F4',
                borderColor: '#FFFFFF',
                data: rankmort5
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
        
    });

    function test(){
        console.log('succes')
    }

}

Getdata()



