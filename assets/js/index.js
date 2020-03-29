const timazone = document.querySelector('#timezone');
const chases = document.querySelector('#chases');
const chasesProgress = document.querySelector('#chases-progress');
const active = document.querySelector('#active');
const activeProgress = document.querySelector('#active-progress');
const death = document.querySelector('#death');
const deathProgress = document.querySelector('#death-progress');
const recover = document.querySelector('#recover');
const recoverProgress = document.querySelector('#recover-progress');
const timeline = document.querySelector('.timeline-line');
const status = document.querySelector('.tm-action');


async function charts() {

  const getData = await fetch('https://api.kawalcorona.com/')
  .then(res => res.json())
  .then(res => res);

  const region = await fetch('https://api.kawalcorona.com/indonesia/provinsi/')
  .then(res => res.json())
  .then(res => res);

  const indonesia = getData.filter(r => r.attributes.Country_Region === 'Indonesia');
  const lastUpdate = new Date(indonesia[0].attributes.Last_Update);
  const {Confirmed,Active,Deaths,Recovered} =  indonesia[0].attributes;
  timezone.innerHTML = `Update :
   ${h[lastUpdate.getDay()]}
   ${lastUpdate.getDate()}
   ${m[lastUpdate.getMonth()]}
   ${lastUpdate.getFullYear()}
   Pukul
   ${lastUpdate.toLocaleTimeString("id-ID", {timeZone: "Asia/Jakarta"})} WIB
   `
  chases.innerHTML = Confirmed;
  chasesProgress.style.width = +Confirmed/100+'%'

  active.innerHTML = Active;
  activeProgress.style.width = +Active/100+'%'

  death.innerHTML = Deaths;
  deathProgress.style.width = +Deaths/100+'%'

  recover.innerHTML = Recovered;
  recoverProgress.style.width = +Recovered/100+'%'

  const donutChart = {
      chart: {
          height: 350,
          type: 'donut',
          toolbar: {
            show: false,
          }
      },
      colors: ['#ffc107', '#e7515a', '#20c997'],
      series: [Confirmed,Deaths,Recovered],
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

  if(region !== null){

    let line = ``;
    region.forEach(r => {
      line += ` <div class="item-timeline timeline-new">
           <div class="t-content">
               <div class="t-uppercontent">
                   <h5>${r.attributes.Provinsi}</h5>
               </div>
               <div class="tags">
                   <span>Kasus </span>
                   <div class="badge badge-warning">${r.attributes.Kasus_Posi}</div>
                   <br>
                    <span> Meninggal </span>
                   <div class="badge badge-danger">${r.attributes.Kasus_Meni}</div>
                   <br>
                    <span> Sembuh </span>
                   <div class="badge badge-success">${r.attributes.Kasus_Semb}</div>
               </div>
           </div>
       </div>`
    })

    timeline.innerHTML = line

    map = new jvm.Map(
      {
       map: 'indonesia_id',
      container: $('#map-indonesia'),
       backgroundColor: '#2196f3',
       enableZoom: true,
       showTooltip: true,
       regionStyle:{
         initial: {
            fill: '#00ff11',
            stroke: '#2196f3',
            "stroke-width": 0.5,
         },
       hover: {
         "fill-opacity": 1,
         cursor: 'pointer',
         fill: '#133060'

          },
       },
       onRegionTipShow: function (e, el, code) {
         const map = $('#map-indonesia').vectorMap('get', 'mapObject');
         const city = map.getRegionName(code);

         const cityData = region.filter(r => r.attributes.Provinsi.replace('Daerah Istimewa ','') === city );
         if(cityData.length > 0){
           el.html(el.html() + `<p id="popop"> Kasus ${cityData[0].attributes.Kasus_Posi}</p>`).css("fontSize","15px");
           el.html(el.html() + `<p id="popop"> Meninggal ${cityData[0].attributes.Kasus_Meni}</p>`).css("fontSize","15px");
           el.html(el.html() + `<p id="popop"> Sembuh ${cityData[0].attributes.Kasus_Semb}</p>`).css("fontSize","15px");
         }else{
            el.html(el.html() + `<p id="popop"> Tidak ada kasus</p>`).css("fontSize","15px");
         }
       }
      }
    );
    // map.regionStyle = {initial: { fill: '#f8538d'}};
    const mapRegion = [];
    for (let key in map.regions) {
      if (map.regions.hasOwnProperty(key)) {
        let path = {
          path: key,
          data: map.regions[key]
        }
        mapRegion.push(path)
     }
    }


    mapRegion.map(m=> {
      mapRegionFilter(m);
    });

    function mapRegionFilter(m){
      region.filter(r => {
        if(r.attributes.Provinsi.replace('Daerah Istimewa ','') === m.data.config.name){
          if(r.attributes.Kasus_Posi < 50){
              m.data.element.config.style.selected.fill = '#fffc00';
              m.data.element.config.style.selectedHover.fill = '#133060';
                map.setSelectedRegions(m.path);
          }else if (r.attributes.Kasus_Posi > 50 && r.attributes.Kasus_Posi < 100) {
              m.data.element.config.style.selected.fill = '#fcd116';
              m.data.element.config.style.selectedHover.fill = '#133060';
              map.setSelectedRegions(m.path);
          }else if (r.attributes.Kasus_Posi > 100 && r.attributes.Kasus_Posi < 500) {
              m.data.element.config.style.selected.fill = '#ff5f5f';
              m.data.element.config.style.selectedHover.fill = '#133060';
              map.setSelectedRegions(m.path);
          }else if (r.attributes.Kasus_Posi > 500) {
              m.data.element.config.style.selected.fill = '#ff0037';
              m.data.element.config.style.selectedHover.fill = '#133060';
              map.setSelectedRegions(m.path);
          }
        }
      })
    }

    status.style.display = ''

} else {
      Snackbar.show({
      text: 'Wilayah Gagal Dimuat',
      pos: 'bottom-center',
      actionText: 'OK!'
      });
    }
}


charts();
