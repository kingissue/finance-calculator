
function $(id){return document.getElementById(id)}
// 금액 입력은 '만원' 단위입니다. 계산 내부에서는 원 단위로 환산합니다.
function num(id){return (Number($(id).value.replace(/,/g,''))||0)*10000}
function manwon(n){return Math.round((n||0)/10000).toLocaleString('ko-KR')+'만원'}
function pct(n){return (n||0).toFixed(2)+'%'}
function moneyInput(e){e.value=e.value.replace(/[^0-9]/g,'');if(e.value)e.value=Number(e.value).toLocaleString('ko-KR')}
document.querySelectorAll('.money').forEach(e=>{e.addEventListener('input',()=>moneyInput(e));moneyInput(e)})
function annuity(p,rate,months){let r=rate/100/12;if(months<=0)return 0;return r===0?p/months:p*r*Math.pow(1+r,months)/(Math.pow(1+r,months)-1)}
