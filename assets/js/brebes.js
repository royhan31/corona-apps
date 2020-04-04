async function brebes(){
    const data = await getData();
    const dataBrebes = data !== null ? await getData() : {};

    function getData() {
      return fetch('http://api-corona-brebes.herokuapp.com/').then(res => res.json())
      .then(res => res)
    }

    function numberFormat(number){
      let reverse = number.toString().split('').reverse().join(''),
      thousand = reverse.match(/\d{1,3}/g);
      thousand = thousand.join('.').split('').reverse().join('');
      return thousand;
    }

    const confirm_options = {
        chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              show: false,
            },
            dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 1,
                color: '#515365',
                opacity: 0.3,
            }
        },
        colors: ['#ffbb44','#007bff', '#dc3545','#20c997'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        legend: {
              position: 'bottom',
              horizontalAlign: 'center',
              fontSize: '14px',
              markers: {
                width: 10,
                height: 10,
              },
              itemMargin: {
                horizontal: 0,
                vertical: 8
              }
        },
        grid: {
          borderColor: '#191e3a',
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        series: [{
            name: 'Kasus',
            data: [+dataBrebes.konfirmasi.total_kasus]
        }, {
            name: 'Dirawat',
            data: [+dataBrebes.konfirmasi.dirawat]
        },{
            name: 'Meninggal',
            data: [+dataBrebes.konfirmasi.meninggal]
        },{
            name: 'Sembuh',
            data: [+dataBrebes.konfirmasi.sembuh]
        },
      ],
        xaxis: {
            categories: ['Data'],
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.3,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100]
          }
        },
        tooltip: {
          theme: 'dark',
            y: {
                formatter: function (value) {
                  let format = value;
                  if(format !== undefined){
                    format = numberFormat(value);
                  }
                  return format;
                }
            }
        }
      }

const pdp_options = {
    chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        },
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            color: '#515365',
            opacity: 0.3,
        }
    },
    colors: ['#ffbb44','#dc3545','#20c997'],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '14px',
          markers: {
            width: 10,
            height: 10,
          },
          itemMargin: {
            horizontal: 0,
            vertical: 8
          }
    },
    grid: {
      borderColor: '#191e3a',
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    series: [{
        name: 'Total',
        data: [+dataBrebes.pdp.total_pdp]
    }, {
        name: 'Dirawat',
        data: [+dataBrebes.pdp.dirawat]
    },{
        name: 'Pulang',
        data: [+dataBrebes.pdp.pulang]
    }
  ],
    xaxis: {
        categories: ['Data'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.3,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100]
      }
    },
    tooltip: {
      theme: 'dark',
        y: {
            formatter: function (value) {
              let format = value;
              if(format !== undefined){
                format = numberFormat(value);
              }
              return format;
            }
        }
    }
  }

  const odp_options = {
      chart: {
          height: 370,
          type: 'bar',
          toolbar: {
            show: false,
          },
          dropShadow: {
              enabled: true,
              top: 1,
              left: 1,
              blur: 1,
              color: '#515365',
              opacity: 0.3,
          }
      },
      colors: ['#ffbb44','#007bff', '#20c997'],
      plotOptions: {
          bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
          },
      },
      dataLabels: {
          enabled: false
      },
      legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            markers: {
              width: 10,
              height: 10,
            },
            itemMargin: {
              horizontal: 0,
              vertical: 8
            }
      },
      grid: {
        borderColor: '#191e3a',
      },
      stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
      },
      series: [{
          name: 'Total',
          data: [+dataBrebes.odp.total_odp]
      }, {
          name: 'Dalam Pemantauan',
          data: [+dataBrebes.odp.dalam_pemantauan - +dataBrebes.odp.selesai_pemantauan]
      },{
          name: 'Selesai Pemantauan',
          data: [+dataBrebes.odp.selesai_pemantauan]
      }
    ],
      xaxis: {
          categories: ['Data'],
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 0.3,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.8,
          stops: [0, 100]
        }
      },
      tooltip: {
        theme: 'dark',
          y: {
              formatter: function (value) {
                let format = value;
                if(format !== undefined){
                  format = numberFormat(value);
                }
                return format;
              }
          }
      }
    }

  const confirm = new ApexCharts(
    document.querySelector("#confirm"),
    confirm_options
   );
  const pdp = new ApexCharts(
   document.querySelector("#pdp"),
   pdp_options
  );
  const odp = new ApexCharts(
    document.querySelector("#odp"),
    odp_options
   );

   confirm.render();
   pdp.render();
   odp.render();
  }

  brebes();
