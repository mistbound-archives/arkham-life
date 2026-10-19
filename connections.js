'use strict';
// 사건끼리 원인을 합치지 않고, 도시 안의 사람과 공개 기록만 이어 준다.
const CASE_CONNECTIONS={
 nora:{peers:['press','beacon','portrait'],request:'창고에서 일하는 사람의 근황과 화물 서류를 확인할 연락처'},
 factory:{peers:['beacon','orchard','burial'],request:'기계 설치 기록을 보관한 곳과 작업자에게 연락할 방법'},
 debt:{peers:['boarding','press','patient'],request:'공증 자료의 보관처와 가족 서류를 대조할 창구'},
 patient:{peers:['factory','orchard','portrait'],request:'보호자의 동의를 받고 진료 기록을 대조할 절차'},
 press:{peers:['debt','nora','portrait'],request:'사본을 안전하게 보관하고 발행 기록을 확인할 창구'},
 boarding:{peers:['debt','burial','factory'],request:'옛 건축 기록의 보관처와 세입자에게 연락할 방법'},
 beacon:{peers:['factory','nora','orchard'],request:'항만 일지의 보관처와 선원에게 연락할 방법'},
 orchard:{peers:['patient','beacon','factory'],request:'출하 기록과 일꾼들의 검진 자료를 대조할 절차'},
 portrait:{peers:['press','patient','nora'],request:'촬영 자료의 사본을 보관하고 장비 출처를 확인할 창구'},
 burial:{peers:['boarding','debt','factory'],request:'옛 토지 기록의 보관처와 작업자에게 연락할 방법'}
};
function caseConnection(id){
 s.caseConnections||={};if(Object.prototype.hasOwnProperty.call(s.caseConnections,id))return s.caseConnections[id];
 syncWorldStories();const candidates=Object.values(s.worldStories||{}).filter(w=>w.id!==id&&w.queued<=s.year);
 const rank=w=>(CASE_CONNECTIONS[id].peers.includes(w.id)?10:0)+(w.relationship!=='distant'?2:0)+w.queued/10000;
 candidates.sort((a,b)=>rank(b)-rank(a));const w=candidates[0];
 if(!w)return s.caseConnections[id]=null;
 const trusted=['help','listen','work'].includes(w.relationship)||['rebuild','protect'].includes(w.regionChoice)||['remember','ordinary'].includes(w.laterChoice);
 const status=w.kind==='complicit'?'guarded':trusted?'support':w.kind==='public'?'privacy':w.kind==='catastrophe'?'grief':'record';
 return s.caseConnections[id]={source:w.id,person:worldContact(w),status,year:s.year,used:false,recordShared:w.regionChoice==='protect'||w.kind==='public'};
}
function connectionProse(id){const c=caseConnection(id);if(!c)return '';const place=LIFE_PROFILES[c.source].place,need=CASE_CONNECTIONS[id].request;
 const context={support:c.person+' 기억에는 사건 뒤에도 당신이 연락을 이어 온 일이 남아 있다. 이번에는 '+need+'을 알아봐 주겠다고 했다.',guarded:c.person+' 측은 지난 타협으로 피해를 떠안은 사람들을 먼저 떠올린다. 새 부탁을 전하기는 했지만 당사자 소개나 비공개 자료 제공에는 동의하지 않았다.',privacy:'공개된 기록을 보고 이번 사건의 당사자가 당신에게 연락할 방법을 찾았다. '+c.person+' 측은 이전 사건 뒤 신원이 알려진 이들의 부담을 설명하며 이번에는 이름을 먼저 공개하지 말아 달라고 했다.',grief:'수습 과정에서 연락처를 주고받은 이들이 이번 부탁을 전했다. '+c.person+' 측은 아직 자기 생활을 추스를 여력이 없어 현장에 동행할 수 없다고 한다.',record:'지난 수습 때 남긴 연락처를 통해 이번 부탁이 전해졌다. '+c.person+' 측과는 일상적인 왕래까지 이어지지 않아, 소개 뒤의 확인은 당신이 직접 맡아야 한다.'}[c.status];
 return '**이전 사건에서 이어진 연락**\n'+place+'에서 남긴 인연이 이번 연락의 통로가 되었다. '+context+(c.recordShared?' 당시 신원을 가려 남긴 공개 자료는 보관처를 찾는 데 쓸 수 있지만, 이번 현상의 원인까지 설명해 주지는 않는다.':'');
}
function installCaseConnections(){
 const init=initialiseRevision;initialiseRevision=function(r){r=init(r);r.caseConnections||={};return r};if(s)s.caseConnections||={};
 const start=startEncounter;startEncounter=function(id){caseConnection(id);start(id);const c=s.caseConnections[id];if(c)addLog(connectionProse(id))};
 const panel=renderCaseMotivation;renderCaseMotivation=function(){const html=panel();if(!s||!isInvestigation())return html;const prose=connectionProse(currentArcId());return html+(prose?'<aside class="case-motivation"><p>'+formatProse(prose)+'</p></aside>':'')};
 const current=currentEvent;currentEvent=function(){const e=current();if(!e||!isInvestigation()||s.result||s.pending.index!==1||exclusiveMadness())return e;const id=currentArcId(),c=caseConnection(id);if(!c||c.status!=='support'||c.used)return e;
 const evidence=e.choices.find(x=>x.evidence)?.evidence;
 return {...e,choices:[...e.choices,{text:c.person+' 측에 연락해 '+CASE_CONNECTIONS[id].request+'을 함께 확인한다. 당사자의 동의 없이 이름은 넘기지 않는다.',skill:'설득',difficulty:1,evidence,branchMode:'allies',stressReduction:2,connectionHelp:id,success:'이전 사건 뒤 이어 온 연락이 실제 협조로 돌아왔다. 소개받은 담당자와 자료를 대조해 이번 단계의 확인을 마쳤다. '+(e.lead||''),failure:'소개는 받았지만 보관 기록과 증언이 맞지 않았다. 지인의 신뢰만으로 사실을 확정하지 않고, 남은 의문을 적었다. '+(e.lead||'')} ]};
 };
 const links=applyLifeLinks;applyLifeLinks=function(e,c,ok){links(e,c,ok);if(c.connectionHelp){const record=s.caseConnections[c.connectionHelp];record.used=true;record.helped=ok;addLog(record.person+' 측의 협조 — '+(ok?'자료와 담당자를 함께 확인했다.':'소개는 받았지만 의문을 모두 풀지는 못했다.'))}};
 const words=lifeAfterwords;lifeAfterwords=function(){return [...words(),...Object.entries(s.caseConnections||{}).filter(([,c])=>c?.used).map(([id,c])=>LIFE_PROFILES[c.source].place+'에서 이어 온 연락이 '+LIFE_PROFILES[id].place+'의 조사로 이어졌다. '+(c.helped?'사람 사이의 신뢰가 다음 확인을 도왔다.':'서로 돕고도 끝내 확인하지 못한 부분이 남았다.'))]};
}
