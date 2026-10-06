const won=n=>Math.round(Number(n)||0).toLocaleString("ko-KR")+"원";
const pct=n=>(Number(n)||0).toFixed(2)+"%";
function show(id,html){document.getElementById(id).innerHTML=html}
function calcHome(){
 const p=+homePrice.value||0,c=+homeCash.value||0,l=+homeLoan.value||0,cost=+homeCost.value||0;
 const need=Math.max(0,p+l*-1+cost); const gap=Math.max(0,need-c);
 show("homeResult",`<div class="big">필요 자기자금: ${won(need)}</div><p>주택가격: ${won(p)}</p><p>예상 대출금: ${won(l)}</p><p>취득세·부대비용: ${won(cost)}</p><p>보유 현금: ${won(c)}</p><p><strong>${gap>0?"추가로 필요한 현금":"현재 입력한 현금으로 충당 가능"}</strong>: ${won(gap)}</p>`)
}
function calcTax(){
 const p=+taxPrice.value||0,r=+taxRate.value||0,t=p*r/100;
 show("taxResult",`<div class="big">예상 취득세: ${won(t)}</div><p>주택가격 ${won(p)} × 세율 ${pct(r)}</p><p>※ 실제 취득세는 주택 수, 조정대상지역 여부, 감면 등에 따라 달라질 수 있습니다.</p>`)
}
function calcJeonse(){
 const p=+jeonsePrice.value||0,r=+jeonseRate.value||0,c=+jeonseCash.value||0,l=p*r/100,need=Math.max(0,p-l),gap=Math.max(0,need-c);
 show("jeonseResult",`<div class="big">예상 필요 자기자금: ${won(need)}</div><p>전세보증금: ${won(p)}</p><p>계산상 대출금: ${won(l)} (${pct(r)})</p><p>보유 현금: ${won(c)}</p><p><strong>추가 필요 현금</strong>: ${won(gap)}</p>`)
}
function calcInterest(){
 const p=+interestLoan.value||0,r=+interestRate.value||0,y=p*r/100;
 show("interestResult",`<div class="big">연간 이자: ${won(y)}</div><p>월평균 이자: ${won(y/12)}</p><p>대출원금: ${won(p)} · 연이율: ${pct(r)}</p>`)
}
function calcPayment(){
 const p=+payLoan.value||0,r=(+payRate.value||0)/100/12,n=(+payYears.value||0)*12;
 let m=r===0?p/n:p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
 const total=m*n, interest=total-p;
 show("paymentResult",`<div class="big">월 상환금: ${won(m)}</div><p>총 상환액: ${won(total)}</p><p>총 이자: ${won(interest)}</p><p>상환기간: ${n}개월</p>`)
}
function calcDSR(){
 const income=+dsrIncome.value||0,e=+dsrExisting.value||0,n=+dsrNew.value||0;
 const dsr=income?((e+n)/income*100):0;
 show("dsrResult",`<div class="big">예상 DSR: ${pct(dsr)}</div><p>연간 원리금 상환액: ${won(e+n)}</p><p>연소득: ${won(income)}</p><p>※ 실제 DSR 산정은 금융기관의 부채별 산정방식과 스트레스 DSR 적용 등에 따라 달라질 수 있습니다.</p>`)
}
function calcDeposit(){
 const p=+depPrincipal.value||0,r=+depRate.value||0,m=+depMonths.value||0;
 const gross=p*r/100*m/12, tax=gross*.154, net=gross-tax;
 show("depositResult",`<div class="big">세후 예상 이자: ${won(net)}</div><p>세전 이자: ${won(gross)}</p><p>이자소득세(15.4%): ${won(tax)}</p><p>세후 만기 예상금액: ${won(p+net)}</p>`)
}
function calcSaving(){
 const a=+saveMonthly.value||0, annual=(+saveRate.value||0)/100, m=+saveMonths.value||0;
 let gross=0;
 for(let i=1;i<=m;i++) gross += a*(annual/12)*(m-i+1);
 const principal=a*m,tax=gross*.154,net=gross-tax;
 show("savingResult",`<div class="big">세후 예상 만기금액: ${won(principal+net)}</div><p>납입 원금: ${won(principal)}</p><p>세전 이자: ${won(gross)}</p><p>이자소득세(15.4%): ${won(tax)}</p><p>세후 이자: ${won(net)}</p>`)
}
document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
 document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));
 btn.classList.add("active"); document.getElementById(btn.dataset.target).classList.add("active");
 window.scrollTo({top:document.querySelector(".tabs").offsetTop-10,behavior:"smooth"});
}));
calcHome();
