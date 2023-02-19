// ==UserScript==
// @name         随手记账单
// @version      0.0.1
// @author       my
// @include      https://www.sui.com/*
// @noframes
// @description  随手记转Bean
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(()=>{"use strict";var F={};const D={60777929312:"alan",60777929298:"home",60777929314:"meimei"},x={5617194443:"Liabilities:Alan:\u62DB\u5546\u94F6\u884C\u4FE1\u7528\u5361",5617194649:"Assets:MeiMei:\u5B81\u6CE2\u94F6\u884C",5617194740:"Assets:MeiMei:\u4EA4\u901A\u94F6\u884C",5617194742:"Assets:MeiMei:\u652F\u4ED8\u5B9D",5617194745:"Assets:Alan:\u5FAE\u4FE1",5617194747:"Assets:Alan:\u62DB\u5546\u94F6\u884C\u50A8\u84C4\u5361",5617194748:"Assets:Alan:\u996D\u5361",5617194750:"Assets:MeiMei:\u5FAE\u4FE1",5617194751:"Assets:Alan:\u516C\u4EA4\u5361",5620194972:"Assets:Home:\u4E94\u53E3\u7076",5620195088:"Liabilities:MeiMei:\u8682\u8681\u82B1\u5457",5620195090:"Liabilities:MeiMei:\u62DB\u5546\u94F6\u884C\u4FE1\u7528\u5361",5650393947:"Assets:Alan:\u8D2D\u7269\u57FA\u91D1"},A={0:"\u672A\u77E5",311593040:"Expenses:Traffic:\u5145\u7535",60777929323:"Expenses:Diet:\u996E\u7528\u6C34",60777929324:"Expenses:Diet:\u6C34\u679C",60777929325:"Expenses:Diet:\u96F6\u98DF",60777929326:"Expenses:Diet:\u5403\u996D",60777929327:"Expenses:Diet:\u5403\u996D",60777929328:"Expenses:Diet:\u5403\u996D",60777929329:"Expenses:Diet:\u5403\u996D",60777929331:"Expenses:Diet:\u4E70\u83DC",60777929354:"Expenses:Fun:\u5F69\u7968",60777929381:"Expenses:Shop:\u8863\u670D",60777929387:"Expenses:Shop:\u62A4\u80A4",60777929389:"Expenses:Shop:\u65E5\u7528",60777929393:"Expenses:Shop:\u6570\u7801",60777929400:"Expenses:Traffic:\u6253\u8F66",60777929402:"Expenses:Traffic:\u5730\u94C1",60777929403:"Expenses:Traffic:\u8F66\u9669",60777929408:"Expenses:Traffic:\u505C\u8F66",60777929409:"Expenses:Traffic:\u52A0\u6CB9",60777929428:"Expenses:Shop:\u836F\u54C1",60777929444:"Expenses:Daily:\u71C3\u6C14\u8D39",60777929456:"Income:Life:\u7EA2\u5305",60777929340:"Expenses:Life:\u7EA2\u5305",60777929440:"Expenses:Daily:\u7535\u8D39",60777929438:"Expenses:Daily:\u5FEB\u9012\u8D39",60777929351:"Expenses:Daily:\u8BDD\u8D39",32609320:"Expenses:Traffic:\u9AD8\u901F",3347911638:"Income:Life:\u53D8\u5356\u5BB6\u4EA7",60777929370:"Expenses:Medical:\u4E70\u836F",60777929333:"Expenses:Life:\u5B5D\u656C\u957F\u8F88",60777929378:"Expenses:Diet:\u8D85\u5E02"};function f(e){return D[e]||e}function h(e,u){return x[e]||`${e}:${u}`}function y(e,u){return A[e]||`${e}:${u}`}var E=(e,u,t)=>new Promise((n,s)=>{var o=i=>{try{c(t.next(i))}catch(r){s(r)}},l=i=>{try{c(t.throw(i))}catch(r){s(r)}},c=i=>i.done?n(i.value):Promise.resolve(i.value).then(o,l);c((t=t.apply(e,u)).next())});g();function g(){return E(this,null,function*(){const e=document.createElement("button");e.style.position="fixed",e.style.top="20px",e.style.right="20px",e.style.zIndex="10000000",e.textContent="\u751F\u6210";const u=document.createElement("input");u.style.position="fixed",u.style.top="20px",u.style.right="70px",u.style.zIndex="10000000",u.style.width="150px",u.style.height="26px",u.value=`${a("YYYY.mm",new Date)}.01-${a("YYYY.mm.dd",new Date)}`,document.body.appendChild(e),document.body.appendChild(u),e.addEventListener("click",()=>E(this,null,function*(){const t=u.value,[n,s]=t.split("-"),o=[],l={},c={};(yield m(n,s)).forEach(r=>{r.list.forEach(p=>{o.push(C(p)),l[p.buyerAcountId]=p.buyerAcount,c[p.categoryId]=p.categoryName}),o.push(`;--------${a("YYYY\u5E74mm\u6708dd\u65E5",new Date(r.list[0].date.time))}--------`)}),console.log(o.reverse().join(`\r
`))}))})}function C(e){const u=`${e.memo}`.trim();return`${a("YYYY-mm-dd",new Date(e.date.time))} * "${e.sellerAcount}" "${u}" #${f(e.memberId)}
    ${y(e.categoryId,e.categoryName)}    ${e.tranName==="\u6536\u5165"?"-":""}${e.itemAmount} CNY
    ${h(e.buyerAcountId,e.buyerAcount)}  ${e.tranName==="\u6536\u5165"?"":"-"}${e.itemAmount} CNY \r
`}function m(e,u){return E(this,null,function*(){const t=yield d(e,u,0),n=t.groups;if(t.pageCount>0)for(let s=1;s<t.pageCount;s++){const{groups:o}=yield d(e,u,s);n.push(...o)}return n})}function d(e,u,t=0){return new Promise((n,s)=>{GM_xmlhttpRequest({method:"POST",url:"https://www.sui.com/tally/new.rmi",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",cookie:document.cookie},data:`opt=list2&beginDate=${e}&endDate=${u}&cids=0&bids=0&sids=0&pids=0&memids=0&order=&isDesc=0&page=${t}&note=&mids=0`,onload(o){const l=JSON.parse(o.responseText);n(l)},onerror(o){console.error("\u8BF7\u6C42\u5931\u8D25:"),console.error(o),s(o)}})})}function a(e,u){let t;const n={"Y+":u.getFullYear().toString(),"m+":(u.getMonth()+1).toString(),"d+":u.getDate().toString(),"H+":u.getHours().toString(),"M+":u.getMinutes().toString(),"S+":u.getSeconds().toString()};for(const s in n)t=new RegExp(`(${s})`).exec(e),t&&(e=e.replace(t[1],t[1].length==1?n[s]:n[s].padStart(t[1].length,"0")));return e}})();