const contentData = document.querySelector('#content-data');
const timeline = document.querySelector('.timeline-line');
const rs = document.querySelector('#rs');
const ket = document.querySelector('#ket');
const accordian = document.querySelector('#iconsAccordion');
  async function tegal(){
    const result = await getData();

    function getData() {
      return fetch('https://api-corona-brebes.herokuapp.com/tegal',{headers: {'Authorization' : 'RGlSdW1haEFqYVNheWFuZw=='}})
      .then(res => res.json())
      .then(res => res)
    }
    const showContentData = displayData(result.data.konfirmasi);
    contentData.innerHTML = showContentData

    accordian.style.display = ''

    let line = ``;
    result.data.kecamatan.forEach(k => {
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
    result.data.rs.data.forEach(r => {
      rsData += `<p class="text-white">${r}</p>`
    });

    rs.innerHTML = rsData

    let ketData = ``;
    result.data.rs.keterangan.forEach(r => {
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
                 <div class="t-rate ${JSON.stringify(d.PP).replace('.','') > 1000 ? 'rate-dec' : 'rate-inc'}">
                   <p><span> <strong> ${d.PP} </strong></span> </p>
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
                 <div class="t-rate ${JSON.stringify(d.OTG).replace('.','') > 1000 ? 'rate-dec' : 'rate-inc'}">
                    <p><span> <strong> ${d.OTG} </strong></span> </p>
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
                         <p class="meta-date">Orang Dalam Pengawasan</p>
                     </div>
                 </div>
                 <div class="t-rate ${JSON.stringify(d.ODP).replace('.','') > 1000 ? 'rate-dec' : 'rate-inc'}">
                    <p><span> <strong> ${d.ODP} </strong></span> </p>
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
                         <p class="meta-date">Pasien Dalam Pengawasan</p>
                     </div>
                 </div>
                 <div class="t-rate ${JSON.stringify(d.PDP).replace('.','') > 1000 ? 'rate-dec' : 'rate-inc'}">
                    <p><span> <strong> ${d.PDP} </strong></span> </p>
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
                  <div class="t-rate ${JSON.stringify(d.CONFIRM).replace('.','') > 1000 ? 'rate-dec' : 'rate-inc'}">
                    <p><span> <strong> ${d.CONFIRM} </strong></span> </p>
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
                          <h4 class="text-white">PDP Sembuh</h4>
                          <p class="meta-date">Pasien Dalam Pengawasan (Sembuh)</p>
                      </div>
                  </div>
                  <div class="t-rate ${JSON.stringify(d.PDP_SEMBUH).replace('.','') > 1000 ? 'rate-dec' : 'rate-inc'}">
                     <p><span> <strong> ${d.PDP_SEMBUH} </strong></span> </p>
                  </div>
              </div>
          </div>
          <div class="transactions-list">
              <div class="t-item">
                  <div class="t-company-name">
                      <div class="t-icon">
                          <div class="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          </div>
                      </div>
                      <div class="t-name">
                          <h4 class="text-white">Konfirmasi Sembuh</h4>
                          <p class="meta-date"></p>
                      </div>
                  </div>
                  <div class="t-rate ${JSON.stringify(d.CONFIRM_SEMBUH).replace('.','') > 1000 ? 'rate-dec' : 'rate-inc'}">
                     <p><span> <strong> ${d.CONFIRM_SEMBUH} </strong></span> </p>
                  </div>
              </div>
          </div>
          <div class="transactions-list">
              <div class="t-item">
                  <div class="t-company-name">
                      <div class="t-icon">
                          <div class="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-minus">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="8.5" cy="7" r="4"></circle>
                          <line x1="23" y1="11" x2="17" y2="11"></line>
                          </svg>
                          </div>
                      </div>
                      <div class="t-name">
                          <h4 class="text-white">PDP Meninggal</h4>
                          <p class="meta-date"></p>
                      </div>
                  </div>
                  <div class="t-rate ${JSON.stringify(d.PDP_MENINGGAL).replace('.','') > 1000 ? 'rate-dec' : 'rate-inc'}">
                     <p><span> <strong> ${d.PDP_MENINGGAL} </strong></span> </p>
                  </div>
              </div>
          </div>
          `
    }
  }

  tegal();
