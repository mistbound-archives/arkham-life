'use strict';
const CASE_BOONS={
 nora:{name:'문턱을 닫은 자',kind:'특성',text:'사람의 목소리와 그 흉내를 구별했던 기억이 판단을 붙든다.',skills:{심리학:10,오컬트:5}},
 factory:{name:'멎은 심장의 조절추',kind:'유물',text:'위험을 끊은 뒤 회수한 차가운 조절추. 미세한 진동과 장치의 어긋남을 읽게 한다.',skills:{손재주:10,격투:5}},
 debt:{name:'되찾은 이름의 증인',kind:'특성',text:'자기 이름을 되찾은 경험이 문서와 약속을 따질 때 흔들리지 않는 기준이 된다.',skills:{설득:10,박학:5}},
 patient:{name:'자기 목소리를 되찾는 법',kind:'특성',text:'회복 과정에 함께하며 사람의 기억과 몸을 대하는 감각이 깊어졌다.',skills:{의학:10,심리학:5}},
 press:{name:'지워지지 않는 교정활자',kind:'유물',text:'사건을 끝낸 뒤 남겨 받은 활자 한 조각. 덮어쓴 흔적과 빠진 기록에 눈이 간다.',skills:{관찰:10,박학:5}},
 boarding:{name:'바깥문을 기억하는 열쇠',kind:'유물',text:'폐쇄된 문에서 떼어 낸 열쇠. 문과 벽 사이의 작은 틈, 발소리의 방향을 알아차리게 한다.',skills:{은밀행동:10,듣기:5}},
 beacon:{name:'마지막 정방향의 나침반',kind:'유물',text:'신호를 바로잡은 뒤 선원들이 맡긴 나침반. 소음 속 신호와 몸의 방향을 붙든다.',skills:{듣기:10,운동:5}},
 orchard:{name:'겨울을 돌려보낸 자',kind:'특성',text:'땅과 사람의 온기가 돌아오는 과정을 지켜보며 숨은 이상을 읽는 법을 배웠다.',skills:{오컬트:10,의학:5}},
 portrait:{name:'빛을 돌려준 가림판',kind:'유물',text:'위험한 렌즈와 분리해 보관한 가림판. 상과 실체의 차이, 노출 장치의 반응을 읽게 한다.',skills:{관찰:10,손재주:5}},
 burial:{name:'경계 밖으로 이끄는 자',kind:'특성',text:'무너지는 경계에서 사람을 데리고 나온 경험이 위기 속 움직임과 대응에 남았다.',skills:{운동:10,격투:5}}
};
function initialiseBalance(r){r.caseBoons||={};r.hiringExperience||={};r.balancePracticeYear??=null;return r}
function boonSkill(id,raw=s){return Math.min(18,Object.keys(raw.caseBoons||{}).reduce((n,key)=>n+(CASE_BOONS[key]?.skills[id]||0),0))}
function grantCaseBoon(id){if(!s.caseDecisions[id]?.rewarded||s.caseBoons[id]||lifeOutcomeKind(id,completedArcResult(id))!=='restored'&&lifeOutcomeKind(id,completedArcResult(id))!=='public')return false;s.caseBoons[id]={year:s.year};const b=CASE_BOONS[id],text='**완전 해결의 '+b.kind+' — '+b.name+'**: '+b.text+' '+Object.entries(b.skills).map(([k,v])=>k+' +'+v).join(' · ')+'. 기본 기능과 별도로 적용되며, 여러 해결 보상의 같은 기능 도움은 최대 +18이다.';s.result+='\n\n'+text;addLog(text,true);return true}
function annualFoundationPractice(){if(s.balancePracticeYear===s.year)return;s.balancePracticeYear=s.year;if(s.phase!=='adult'||s.hospital||s.career?.onLeave||s.workPausedYear===s.year||s.incomeLoss>=1)return;
 const pool=JOB_PRACTICE[s.jobId]||[];const id=s.jobId==='unemployed'?careerEntry[s.careerStudy?.target]?.[0]:pool.includes(jobPrimary[s.jobId])?jobPrimary[s.jobId]:pool[0];
 if(!id||skillValue(id)>=50)return;const before=skillValue(id);learnSkill(id,Math.min(50-before,s.jobId==='unemployed'?2:1),s.jobId==='unemployed'?'구직 준비의 기초 연습':'일터의 기초 반복 훈련');if(skillValue(id)>before)addLog('기초 연습 — '+id+' +'+(skillValue(id)-before)+' · 숙련 50 미만의 반복 학습.',true)
}
function installBalance(){
 const init=initialiseRevision;initialiseRevision=r=>initialiseBalance(init(r));if(s)initialiseBalance(s);
 const effective=effectiveSkill;effectiveSkill=(id,raw=s)=>Math.min(95,effective(id,raw)+boonSkill(id,raw));
 const reward=rewardCaseResolution;rewardCaseResolution=function(id){reward(id);grantCaseBoon(id)};
 const personal=renderPersonalTraits;renderPersonalTraits=function(){const html=personal(),ids=Object.keys(s.caseBoons||{});return html+(ids.length?'<section class="personal-traits"><h3>완전 해결의 특성 · 유물</h3>'+ids.map(id=>{const b=CASE_BOONS[id];return '<div><small>'+b.kind+' · '+s.caseBoons[id].year+'년</small><strong>'+escapeHTML(b.name)+'</strong><p>'+escapeHTML(b.text)+'</p><p>'+Object.entries(b.skills).map(([k,v])=>k+' +'+v).join(' · ')+'</p></div>'}).join('')+'<p>상시 적용 · 같은 기능에 중첩되는 보상은 최대 +18</p></section>':'')};
 const bonus=jobBackgroundBonus;jobBackgroundBonus=function(id){initialiseBalance(s);const b=bonus(id),n=Math.min(60,(s.hiringExperience[id]||0)*12);if(careerEntry[id]&&n){const gain=Math.min(n,80-b.value);b.value+=gain;b.reasons.push('같은 직업의 재지원 경험 +'+gain)}return b};
 const career=applyCareer;applyCareer=function(id){initialiseBalance(s);const eligible=canChooseCareer(id),checked=Boolean(careerEntry[id]);const ok=career(id);if(s.result)s.result=s.result.replace('중복 도움은 최대 +35','배경 도움 최대 +35 · 재지원 포함 최대 +80');if(eligible&&checked){if(ok)s.hiringExperience[id]=0;else{s.hiringExperience[id]=Math.min(5,(s.hiringExperience[id]||0)+1);s.result+=' 다음 같은 직업 지원에는 채용 과정에서 배운 점이 도움이 된다. (재지원 도움 +'+Math.min(60,s.hiringExperience[id]*12)+')';addLog('채용 피드백 — '+careers.find(j=>j.id===id).name+' 재지원 경험을 정리했다.',true)}}return ok};
 const label=hiringBonusLabel;hiringBonusLabel=function(id){return label(id).replace('(최대 +35)','(배경 최대 +35 · 재지원 포함 최대 +80)')};
 careers.find(j=>j.id==='unemployed').description='정규직 없이 단기 일로 연 $36을 마련한다. 생활비 부족분을 감당하며 재지원이나 시험 없는 일을 준비한다.';
 careerEconomy.dockworker=82;careerEconomy.cleaner=78;
 const income=annualIncome;annualIncome=function(){return income()+(s.phase==='adult'&&s.jobId==='unemployed'&&!s.hospital?36:0)};
 const settle=settleYear;settleYear=function(){annualFoundationPractice();if(s.phase==='adult'&&s.jobId==='unemployed'&&!s.hospital)addLog('구직 중 단기 심부름과 시간제 일로 연 $36의 수입을 마련했다. 생활비 전부를 충당하지는 못한다.',true);return settle()};
 const employment=employmentEvent;employmentEvent=function(){const e=employment();return {...e,text:e.text.replace('당장의 수입은 없다.','정규직 수입은 없지만 단기 일로 연 $36을 마련할 수 있다.')}};
 const study=studyEvent;studyEvent=function(){const e=study();return {...e,text:e.text+' 재지원 경험은 같은 직업의 다음 채용에 적용된다. 구직 중에는 단기 일로 연 $36을 마련하고, 준비 중인 기능의 기초도 연습한다.'}};
 const words=lifeAfterwords;lifeAfterwords=()=>[...words(),...Object.keys(s.caseBoons||{}).map(id=>CASE_BOONS[id].name+' — 사건을 완전히 해결하고 남긴 '+CASE_BOONS[id].kind+'.')];
}
