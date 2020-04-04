  const contentData = document.querySelector('#content-data');
  const dropdownItem = document.querySelectorAll('.dropdown-item');
  const status = document.querySelector('#status');
  const dropdown = document.querySelector('#dropdown');

  async function country(){
    const countryData = [];
    const data = await getData();
    data.map(d => {
      let path = {}
      if (d.attributes.Country_Region === 'US') { path.name = 'United States'; }
      else if (d.attributes.Country_Region === 'Laos') { path.name = 'Lao PDR'; }
      else if (d.attributes.Country_Region === 'Dominican Republic') { path.name = 'Dominican Rep.'; }
      else if (d.attributes.Country_Region === "Cote d'Ivoire") { path.name = "CÃ´te d'Ivoire"; }
      else if (d.attributes.Country_Region === "Bosnia and Herzegovina") { path.name = "Bosnia and Herz."; }
      else if (d.attributes.Country_Region === "North Macedonia") { path.name = "Macedonia"; }
      else if (d.attributes.Country_Region === "Czechia") { path.name = "Czech Rep."; }
      else if (d.attributes.Country_Region === "Congo (Brazzaville)") { path.name = "Dem. Rep. Congo"; }
      else if (d.attributes.Country_Region === "Congo (Kinshasa)") { path.name = "Congo"; }
      else if (d.attributes.Country_Region === "Central African Republic") { path.name = "Central African Rep."; }
      else if (d.attributes.Country_Region === "Equatorial Guinea") { path.name = "Eq. Guinea"; }
      else { path.name = d.attributes.Country_Region; }
      let lastUpdate = new Date(d.attributes.Last_Update).toLocaleDateString("id-ID",{timeZone: "Asia/Jakarta"});

      path.data = {
        confirmed: d.attributes.Confirmed,
        deaths:d.attributes.Deaths,
        recovered:d.attributes.Recovered,
        active: d.attributes.Active,
        last_update: lastUpdate
      }
        countryData.push(path)
    })

    const casesTotal = countryData.map(r => r.data.confirmed).reduce((a,b) => a+b);
    const deathTotal = countryData.map(r => r.data.deaths).reduce((a,b) => a+b);
    const recoverTotal = countryData.map(r => r.data.recovered).reduce((a,b) => a+b);
    const activeTotal = countryData.map(r => r.data.active).reduce((a,b) => a+b);

    function getData(){
      return fetch('https://api.kawalcorona.com/').then(res => res.json()).then(res => res);
    }

    function numberFormat(number){
      let reverse = number.toString().split('').reverse().join(''),
      thousand = reverse.match(/\d{1,3}/g);
      thousand = thousand.join('.').split('').reverse().join('');
      return thousand;
    }

    const map = new jvm.Map({
      map: 'world_mill_en',
      container: $('#world-map'),
      backgroundColor: '#2196f3',
      borderColor: '#818181',
      borderOpacity: 0.25,
      borderWidth: 0.25,
      color: '#f4f3f0',
      regionStyle: {
          initial: {
              fill: '#6c757d',
              stroke: '#2196f3',
              "stroke-width": 0.01,
          },
          hover: {
             "fill-opacity": 1,
             cursor: 'pointer',
             fill: '#5c1ac3'

              },
      },
      onRegionTipShow: function (e, el, code) {
        const map = $('#world-map').vectorMap('get', 'mapObject');
        const countries = map.getRegionName(code);
        const countryFilter = countryData.filter(c => c.name.replace(', South','') === countries);
        if(countryFilter.length > 0){
          el.html(el.html() + `<p id="popop"> Kasus : ${numberFormat(countryFilter[0].data.confirmed)}</p>`).css("fontSize","15px");
          el.html(el.html() + `<p id="popop"> Meninggal : ${numberFormat(countryFilter[0].data.deaths)}</p>`).css("fontSize","15px");
          el.html(el.html() + `<p id="popop"> Sembuh : ${numberFormat(countryFilter[0].data.recovered)}</p>`).css("fontSize","15px");
          el.html(el.html() + `<p id="popop"> Aktif : ${numberFormat(countryFilter[0].data.active)}</p>`).css("fontSize","15px");
          el.html(el.html() + `<p id="popop"> Update : ${countryFilter[0].data.last_update}</p>`).css("fontSize","15px");
        }else{
           el.html(el.html() + `<p id="popop"> Tidak ada Data</p>`).css("fontSize","15px");
        }
      }
  }
);

  const mapCountry = [];
  for (let key in map.regions) {
    if (map.regions.hasOwnProperty(key)) {
      let path = {
        path: key,
        data: map.regions[key]
      }
      mapCountry.push(path)
   }
  }

  mapCountry.map(m=> {
    mapCountryFilter(m);
  });

  function mapCountryFilter(m){
    countryData.filter(c => {
      if(c.name.replace('*','').replace(', South','') === m.data.config.name){
        if(c.data.confirmed < 1000){
            m.data.element.config.style.selected.fill = '#fffc00';
            m.data.element.config.style.selectedHover.fill = '#5c1ac3';
              map.setSelectedRegions(m.path);
        }else if (c.data.confirmed > 1000 && c.data.confirmed < 5000) {
            m.data.element.config.style.selected.fill = '#fcd116';
            m.data.element.config.style.selectedHover.fill = '#5c1ac3';
            map.setSelectedRegions(m.path);
        }else if (c.data.confirmed > 5000 && c.data.confirmed < 30000) {
            m.data.element.config.style.selected.fill = '#ff5f5f';
            m.data.element.config.style.selectedHover.fill = '#5c1ac3';
            map.setSelectedRegions(m.path);
        }else if (c.data.confirmed > 30000) {
            m.data.element.config.style.selected.fill = '#ff0037';
            m.data.element.config.style.selectedHover.fill = '#5c1ac3';
            map.setSelectedRegions(m.path);
        }
      }
    })
  }

  const donutChart = {
      chart: {
          height: 330,
          type: 'donut',
          toolbar: {
            show: false,
          }
      },
      legend: {
          position: 'bottom'
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
      colors: ['#ffc107', '#e7515a', '#20c997'],
      series: [casesTotal,deathTotal,recoverTotal],
      labels: ['Kasus', 'Meninggal', 'Sembuh'],
      responsive: [{
          breakpoint: 480,
          options: {
              chart: {
                  width: 300,
              },
              legend: {
                  position: 'bottom'
              }
          }
      }]
  }


  const donut = new ApexCharts(
      document.querySelector("#world-percentase"),
      donutChart
  );

  donut.render();

  contentData.innerHTML = showData();

  status.style.display = '';
  dropdown.style.display = '';

  const casesSort = countryData.sort((a, b) => {
    return a.data.confirmed - b.data.confirmed;
  }).reverse().slice(0,20);

  // console.log(casesSort);

  console.log(casesSort.map(r => numberFormat(r.data.confirmed)));


  const sBar = {
        chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              show: false,
            }
        },
        backgroundBarRadius: 0,
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        colors: ['#ffc107'],
        dataLabels: {
            enabled: false
        },
        series: [{
            data: casesSort.map(r => numberFormat(r.data.confirmed))
        }],
        xaxis: {
            categories: casesSort.map(r => r.name),
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: true
          },
          y: {
            title: {
              formatter: function () {
                return 'Kasus '
              }
            }
          }
        }
      }

  const chart = new ApexCharts(
    document.querySelector("#mixed-chart"),
    sBar
  );

chart.render();

dropdownItem.forEach(d => {
  d.addEventListener('click', function (){
    if(this.text === 'Kasus'){
      status.classList.remove('badge-danger');
      status.classList.remove('badge-success');
      status.classList.add('badge-warning');
      status.innerText = 'Kasus';
      chart.updateOptions({
          colors: ['#ffc107'],
          series: [{
              data: casesSort.map(r => numberFormat(r.data.confirmed))
          }],
          xaxis: {
              categories: casesSort.map(r => r.name),
          },
          tooltip: {
            theme: 'dark',
            x: {
              show: false
            },
            y: {
              title: {
                formatter: function () {
                  return 'Kasus '
                }
              }
            }
          }
      })
    }
    else if(this.text === 'Meninggal'){
      status.classList.remove('badge-warning');
      status.classList.remove('badge-success');
      status.classList.add('badge-danger');
      status.innerText = 'Meninggal'
      const death = countryData.sort((a, b) => {
        return a.data.deaths - b.data.deaths;
      }).reverse().slice(0,20);

      chart.updateOptions({
          colors: ['#dc3545'],
          xaxis: {
              categories: death.map(r => r.name),
          },
          series: [{
            data: death.map(r => r.data.deaths)
          }],
          tooltip: {
            theme: 'dark',
            x: {
              show: false
            },
            y: {
              formatter : function (val){
                return numberFormat(val)
              },
              title: {
                formatter: function () {
                  return 'Meninggal '
                }
              }
            }
          }
      })

    }else{
      status.classList.remove('badge-warning');
      status.classList.remove('badge-danger');
      status.classList.add('badge-success');
      status.innerText = 'Sembuh';
      const recover = countryData.sort((a, b) => {
        return a.data.recovered - b.data.recovered;
      }).reverse().slice(0,20);

      chart.updateOptions({
          colors: ['#28a745'],
          xaxis: {
              categories: recover.map(r => r.name),
          },
          series : [{
            data: recover.map(r => r.data.recovered)
          }],
          tooltip: {
            theme: 'dark',
            x: {
              show: false
            },
            y: {
              formatter : function (val){
                return numberFormat(val)
              },
              title: {
                formatter: function () {
                  return 'Sembuh '
                }
              }
            }
          }
      })

    }
  })
})

  function showData() {
    return `
    <div class="transactions-list">
           <div class="t-item">
               <div class="t-company-name">
                   <div class="t-icon">
                       <div class="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                       </div>
                   </div>
                   <div class="t-name">
                       <h4 class="text-white">Total Kasus</h4>
                       <p class="meta-date">Seluruh Dunia</p>
                   </div>
               </div>
               <div class="t-rate rate-dec">
                  <p><span> <strong> ${numberFormat(casesTotal)} </strong></span> </p>
               </div>
           </div>
       </div>
    <div class="transactions-list">
           <div class="t-item">
               <div class="t-company-name">
                   <div class="t-icon">
                       <div class="icon">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-frown">
                       <circle cx="12" cy="12" r="10"></circle>
                       <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                       <line x1="9" y1="9" x2="9.01" y2="9"></line>
                       <line x1="15" y1="9" x2="15.01" y2="9"></line>
                       </svg>
                       </div>
                   </div>
                   <div class="t-name">
                       <h4 class="text-white">Total Meninggal</h4>
                       <p class="meta-date">Seluruh Dunia</p>
                   </div>
               </div>
               <div class="t-rate rate-dec">
                  <p><span> <strong> ${numberFormat(deathTotal)} </strong></span> </p>
               </div>
           </div>
       </div>
    <div class="transactions-list">
           <div class="t-item">
               <div class="t-company-name">
                   <div class="t-icon">
                       <div class="icon">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile">
                       <circle cx="12" cy="12" r="10"></circle>
                       <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                       <line x1="9" y1="9" x2="9.01" y2="9"></line>
                       <line x1="15" y1="9" x2="15.01" y2="9"></line>
                       </svg>
                       </div>
                   </div>
                   <div class="t-name">
                       <h4 class="text-white">Total Sembuh</h4>
                       <p class="meta-date">Seluruh Dunia</p>
                   </div>
               </div>
               <div class="t-rate rate-inc">
                  <p><span> <strong> ${numberFormat(recoverTotal)} </strong></span> </p>
               </div>
           </div>
       </div>
    <div class="transactions-list">
           <div class="t-item">
               <div class="t-company-name">
                   <div class="t-icon">
                       <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard">
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                       </div>
                   </div>
                   <div class="t-name">
                       <h4 class="text-white">Total Kasus Aktif</h4>
                       <p class="meta-date">Seluruh Dunia</p>
                   </div>
               </div>
               <div class="t-rate rate-dec">
                  <p><span> <strong> ${numberFormat(activeTotal)} </strong></span> </p>
               </div>
           </div>
       </div>`
  }

}

  country();
