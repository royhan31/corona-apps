
const timazone = document.querySelector('#timezone');
const timeline = document.querySelector('.timeline-line');
const regionProgress = document.querySelector('.vistorsBrowser');
const provinsiName = document.querySelector('#provinsi-name');

async function regions() {
  const donutChart = {
      chart: {
          height: 350,
          type: 'donut',
          toolbar: {
            show: false,
          }
      },
      tooltip: {
        y: {
          formatter: function(value) {
            let format = value;
            if(format !== undefined){
              format = numberFormat(value);
            }
            return format;
          }
        }
      },
      legend: {
          position: 'bottom'
      },
      colors: ['#ffc107', '#e7515a', '#20c997'],
      series: [1,0,0],
      labels: ['Kasus', 'Meninggal', 'Sembuh'],
      responsive: [{
          breakpoint: 480,
          options: {
              chart: {
                  width: 300
              },
              legend: {
                  position: 'bottom'
              }
          }
      }]
  }

  const donut = new ApexCharts(
      document.querySelector("#donut-chart"),
      donutChart
  );

  donut.render();

  function numberFormat(number){
    let reverse = number.toString().split('').reverse().join(''),
    thousand = reverse.match(/\d{1,3}/g);
    thousand = thousand.join('.').split('').reverse().join('');
    return thousand;
  }

  const getData = await fetch('https://api.kawalcorona.com/indonesia/provinsi/')
  .then(res => res.json())
  .then(res => res);

  let line = ``;
  getData.map((r,i) =>{
    line += `<div class="region item-timeline" data-index=${i}>
        <div class="t-dot" data-original-title="" title="">
        </div>
        <div class="t-text">
            <p>${r.attributes.Provinsi}</p>
        </div>
    </div>`
  });
  timeline.innerHTML = line

  const region = document.querySelectorAll('.region');
  let progress = ``;
  region.forEach((r, i) => {
    r.addEventListener('click', function(){
        this.classList.add('timeline-new');
        provinsiName.innerHTML = getData[i].attributes.Provinsi;
        [...region].find(f => {
          if(f.dataset.index !== this.dataset.index){
            f.classList.remove('timeline-new');
          }
        })
        donut.updateSeries(donutChart.series = [ +getData[i].attributes.Kasus_Posi,
            +getData[i].attributes.Kasus_Meni,
            +getData[i].attributes.Kasus_Semb])

        const showProgress = displayProgress(getData[i])
        regionProgress.innerHTML = showProgress
    })
  })

  function displayProgress(data){
    return `<div class="browser-list">
        <div class="w-browser-details">
            <div class="w-browser-info">
                <h6>Kasus</h6>
                <p class="browser-count">${numberFormat(data.attributes.Kasus_Posi)}</p>
            </div>
            <div class="w-browser-stats">
                <div class="progress">
                    <div class="progress-bar bg-gradient-primary" role="progressbar" style="width: ${data.attributes.Kasus_Posi}%" aria-valuenow="0" aria-valuemin="1000" aria-valuemax="0"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="browser-list">
        <div class="w-browser-details">

            <div class="w-browser-info">
                <h6>Meninggal</h6>
                <p class="browser-count">${numberFormat(data.attributes.Kasus_Meni)}</p>
            </div>

            <div class="w-browser-stats">
                <div class="progress">
                    <div class="progress-bar bg-gradient-danger" role="progressbar" style="width: ${data.attributes.Kasus_Meni}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1000"></div>
                </div>
            </div>

        </div>

    </div>

    <div class="browser-list">
        <div class="w-browser-details">

            <div class="w-browser-info">
                <h6>Sembuh</h6>
                <p class="browser-count">${numberFormat(data.attributes.Kasus_Semb)}</p>
            </div>

            <div class="w-browser-stats">
                <div class="progress">
                    <div class="progress-bar bg-gradient-warning" role="progressbar" style="width: ${data.attributes.Kasus_Semb}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="0"></div>
                </div>
            </div>

        </div>

    </div>`
  }
}
regions();
