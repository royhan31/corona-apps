const contentData = document.querySelector('#content-data');
const timeline = document.querySelector('.timeline-line');
const rs = document.querySelector('#rs');
const ket = document.querySelector('#ket');
const accordian = document.querySelector('#iconsAccordion');
  async function tegal(){
    const result = await getData();
    console.log(result);

    function getData() {
      return fetch('https://api-corona-brebes.herokuapp.com/tegal',{headers: {'Authorization' : 'RGlSdW1haEFqYVNheWFuZw=='}})
      .then(res => res.json())
      .then(res => res)
    }

    function numberFormat(number){
      let reverse = number.toString().split('').reverse().join(''),
      thousand = reverse.match(/\d{1,3}/g);
      thousand = thousand.join('.').split('').reverse().join('');
      return thousand;
    }

    const showContentData = displayData(result.data);
    contentData.innerHTML = showContentData

    accordian.style.display = ''

    let line = ``;
    result.kecamatan.forEach(k => {
      line += ` <div class="item-timeline timeline-new">
           <div class="t-content">
               <div class="t-uppercontent">
                   <h5>${k.KECAMATAN}</h5>
               </div>
               <div class="tags">
                   <span>PP</span>
                   <div class="badge badge-info">${k.PP}</div>
                   <br>
                    <span>ODP</span>
                   <div class="badge badge-warning">${k.ODP}</div>
                   <br>
                    <span>PDP</span>
                   <div class="badge badge-danger">${k.PDP}</div>
                   <br>
                    <span> Konfirmasi </span>
                   <div class="badge badge-primary">${k.CONFIRM}</div>
                   <br>
                    <span> Sembuh </span>
                   <div class="badge badge-success">${k.SEMBUH}</div>
               </div>
           </div>
       </div>`
    });

    timeline.innerHTML = line

    let rsData = ``;
    result.rs.data.forEach(r => {
      rsData += `<p class="text-white">${r}</p>`
    });

    rs.innerHTML = rsData

    let ketData = ``;
    result.rs.keterangan.forEach(r => {
      ketData += `<p class="text-white">${r}</p>`
    });

    ket.innerHTML = ketData

    function displayData(d){
        return ` <div class="transactions-list">
             <div class="t-item">
                 <div class="t-company-name">
                     <div class="t-icon">
                         <div class="icon">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users">
                             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                             <circle cx="9" cy="7" r="4"></circle>
                             <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                             </svg>
                         </div>
                     </div>
                     <div class="t-name">
                         <h4 class="text-white">PP</h4>
                         <p class="meta-date">Pelaku Perjalanan</p>
                     </div>
                 </div>
                 <div class="row">
                   <div class="col-12">
                     <div class="float-right t-rate rate-dec">
                       <p><span> <strong> Total : ${numberFormat(d.PP.total)} </strong></span> </p>
                    </div>
                   </div>
                   <div class="col-12">
                     <div class="float-right t-rate rate-inc">
                       <p><span> <strong> Selesai : ${numberFormat(d.PP.selesai)} </strong></span> </p>
                    </div>
                   </div>
                   <div class="col-12">
                     <div class="float-right t-rate rate-dec">
                       <p><span> <strong> Pantauan : ${numberFormat(d.PP.pantauan)} </strong></span> </p>
                    </div>
                   </div>
                 </div>
             </div>
         </div>
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
                          <h4 class="text-white">OTG</h4>
                          <p class="meta-date">Orang Tanpa Gejala</p>
                      </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="float-right t-rate rate-dec">
                        <p><span> <strong> Total : ${numberFormat(d.OTG.total)} </strong></span> </p>
                     </div>
                    </div>
                    <div class="col-12">
                      <div class="float-right t-rate rate-inc">
                        <p><span> <strong> Selesai : ${numberFormat(d.OTG.selesai)} </strong></span> </p>
                     </div>
                    </div>
                    <div class="col-12">
                      <div class="float-right t-rate rate-dec">
                        <p><span> <strong> Pantauan : ${numberFormat(d.OTG.pantauan)} </strong></span> </p>
                     </div>
                    </div>
                  </div>
              </div>
          </div>
         <div class="transactions-list">
              <div class="t-item">
                  <div class="t-company-name">
                      <div class="t-icon">
                          <div class="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye">
                             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                             <circle cx="12" cy="12" r="3"></circle>
                             </svg>
                          </div>
                      </div>
                      <div class="t-name">
                          <h4 class="text-white">ODP</h4>
                          <p class="meta-date">Orang Dalam Pantauan</p>
                      </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="float-right t-rate rate-dec">
                        <p><span> <strong> Total : ${numberFormat(d.ODP.total)} </strong></span> </p>
                     </div>
                    </div>
                    <div class="col-12">
                      <div class="float-right t-rate rate-inc">
                        <p><span> <strong> Selesai : ${numberFormat(d.ODP.selesai)} </strong></span> </p>
                     </div>
                    </div>
                    <div class="col-12">
                      <div class="float-right t-rate rate-dec">
                        <p><span> <strong> Pantauan : ${numberFormat(d.ODP.pantauan)} </strong></span> </p>
                     </div>
                    </div>
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
                          <h4 class="text-white">PDP</h4>
                          <p class="meta-date">Pasien Dalam Pemantauan</p>
                      </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="float-right t-rate rate-dec">
                        <p><span> <strong> Total : ${numberFormat(d.PDP.total)} </strong></span> </p>
                     </div>
                    </div>
                    <div class="col-12">
                      <div class="float-right t-rate rate-inc">
                        <p><span> <strong> Sembuh : ${numberFormat(d.PDP.sembuh)} </strong></span> </p>
                     </div>
                    </div>
                    <div class="col-12">
                      <div class="float-right t-rate rate-dec">
                        <p><span> <strong> Dirawat : ${numberFormat(d.PDP.dirawat)} </strong></span> </p>
                     </div>
                    </div>
                    <div class="col-12">
                      <div class="float-right t-rate rate-dec">
                        <p><span> <strong> Meninggal : ${numberFormat(d.PDP.meniggal)} </strong></span> </p>
                     </div>
                    </div>
                  </div>

              </div>
          </div>
         <div class="transactions-list">
              <div class="t-item">
                  <div class="t-company-name">
                      <div class="t-icon">
                          <div class="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-check">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="8.5" cy="7" r="4"></circle>
                          <polyline points="17 11 19 13 23 9"></polyline>
                          </svg>
                          </div>
                      </div>
                      <div class="t-name">
                          <h4 class="text-white">Konfirmasi</h4>
                          <p class="meta-date"></p>
                      </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="float-right t-rate rate-dec">
                        <p><span> <strong> Total : ${numberFormat(d.CONFIRM.total)} </strong></span> </p>
                     </div>
                    </div>
                    <div class="col-12">
                      <div class="float-right t-rate rate-inc">
                        <p><span> <strong> Sembuh : ${numberFormat(d.CONFIRM.sembuh)} </strong></span> </p>
                     </div>
                    </div>
                    <div class="col-12">
                      <div class="float-right t-rate rate-dec">
                        <p><span> <strong> Dirawat : ${numberFormat(d.CONFIRM.dirawat)} </strong></span> </p>
                     </div>
                    </div>
                    <div class="col-12">
                      <div class="float-right t-rate rate-dec">
                        <p><span> <strong> Meninggal : ${numberFormat(d.CONFIRM.meniggal)} </strong></span> </p>
                     </div>
                    </div>
                  </div>
              </div>
          </div>

          `
    }
  }

  tegal();
