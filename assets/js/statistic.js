async function statistic(){
  const results = [];
  const getCountries = await getData();
  const countries = await coutriesData(getCountries);
  const data = results.map(res => res.data);
  const region = results.map(res => res.name);
  const indonesia = results.map(res => res).filter(res => res.name === 'Indonesia');

  function getData(){
    return fetch('https://pomber.github.io/covid19/timeseries.json')
    .then(res => res.json())
    .then(res => res)
  }

  function getDate(res){
    const date = [];
    res.data.map(r => date.push(`${new Date(r.date).getDate()} ${m[new Date(r.date).getMonth()].substring(0, 3)} ${new Date(r.date).getFullYear()}`));
    return date.slice(Math.max(date.length - 7, 0));
    return date
  }

  function getActive(res){
    const results = []
    res.data.map(r => results.push((+r.confirmed - +r.deaths) - +r.recovered))
    return results.slice(Math.max(results.length - 7, 0));
  }

  function getConfirm(res){
    const confirm = [];
    res.data.map(r => confirm.push(r.confirmed));
    return confirm.slice(Math.max(confirm.length - 7, 0));
  }

  function getDeath(res){
    const deaths = [];
    res.data.map(r => deaths.push(r.deaths));
    return deaths.slice(Math.max(deaths.length - 7, 0));
  }

  function getRecover(res){
    const recovered = [];
    res.data.map(r => recovered.push(r.recovered));
    return recovered.slice(Math.max(recovered.length - 7, 0));
  }

  function getTotal(res){
    const total = [] ;
    res.data.map(r => total.push(r.confirmed));
    return total.slice().pop();
  }

  function coutriesData(data){
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let country = {
          name: key,
          data: data[key]
        };
        results.push(country);
      }
    }
  }

  function numberFormat(number){
    let reverse = number.toString().split('').reverse().join(''),
    thousand = reverse.match(/\d{1,3}/g);
    thousand = thousand.join('.').split('').reverse().join('');
    return thousand;
  }

  const options = {
        chart: {
          fontFamily: 'Nunito, sans-serif',
          height: 365,
          type: 'area',
          zoom: {
              enabled: false
          },
          dropShadow: {
            enabled: true,
            opacity: 0.3,
            blur: 5,
            left: -7,
            top: 22
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#e2a03f','#2196f3','#e7515a','#20c997'],
        dataLabels: {
            enabled: false
        },
        markers: {
          discrete: [{
          seriesIndex: 0,
          dataPointIndex: 7,
          fillColor: '#000',
          strokeColor: '#000',
          size: 5
        }, {
          seriesIndex: 2,
          dataPointIndex: 11,
          fillColor: '#000',
          strokeColor: '#000',
          size: 4
        }]
        },
        subtitle: {
          text: 'Total Kasus',
          align: 'left',
          margin: 0,
          offsetX: -10,
          offsetY: 35,
          floating: false,
          style: {
            fontSize: '14px',
            color:  '#888ea8'
          }
        },
        title: {
          text: getTotal(...indonesia),
          align: 'left',
          margin: 0,
          offsetX: -10,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '25px',
            color:  '#bfc9d4'
          },
        },
        stroke: {
            show: true,
            curve: 'smooth',
            width: 2,
            lineCap: 'square'
        },
        series: [
        {
            name: 'Kasus',
            data: getConfirm(...indonesia)
        },{
              name: 'Kasus Aktif',
              data: getActive(...indonesia)
        },{
            name: 'Meninggal',
            data: getDeath(...indonesia)
        },{
            name: 'Sembuh',
            data: getRecover(...indonesia)
        }
      ],
        labels: getDate(...indonesia),
        xaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            show: true
          },
          labels: {
            offsetX: 0,
            offsetY: 5,
            style: {
                fontSize: '12px',
                fontFamily: 'Nunito, sans-serif',
                cssClass: 'apexcharts-xaxis-title',
            },
          }
        },
        yaxis: {
          labels: {
            formatter: function(value, index) {
              let format = value;
              if(format !== undefined){
                format = numberFormat(value);
              }
              return format;
            },
            offsetX: -22,
            offsetY: 0,
            style: {
                fontSize: '12px',
                fontFamily: 'Nunito, sans-serif',
                cssClass: 'apexcharts-yaxis-title',
            },
          }
        },
        grid: {
          borderColor: '#191e3a',
          strokeDashArray: 5,
          xaxis: {
              lines: {
                  show: true
              }
          },
          yaxis: {
              lines: {
                  show: false,
              }
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: -10
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          offsetY: -50,
          fontSize: '16px',
          fontFamily: 'Nunito, sans-serif',
          markers: {
            width: 10,
            height: 10,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
          },
          itemMargin: {
            horizontal: 0,
            vertical: 20
          }
        },
        tooltip: {
          theme: 'dark',
          marker: {
            show: true,
          },
          x: {
            show: false,
          }
        },
        fill: {
            type:"gradient",
            gradient: {
                type: "vertical",
                shadeIntensity: 1,
                inverseColors: !1,
                opacityFrom: .28,
                opacityTo: .05,
                stops: [45, 100]
            }
        },
        responsive: [{
          breakpoint: 575,
          options: {
            legend: {
                offsetY: -30,
            },
          },
          }]
        }

        const stat = new ApexCharts(
          document.querySelector("#revenueMonthly"),
          options
        );

        stat.render();
}
statistic();
