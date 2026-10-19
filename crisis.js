'use strict';
const madnessPool=[
{id:'watched',name:'등 뒤의 시선',skills:{심리학:-15,관찰:-10}},
{id:'blank',name:'비어 버린 문장',skills:{박학:-15}},
{id:'tremor',name:'멎지 않는 손의 떨림',skills:{손재주:-15,사격:-15}},
{id:'threshold',name:'넘지 못하는 문턱',skills:{운동:-10,은밀행동:-10}},
{id:'sleepless',name:'잠들지 않는 밤',skills:{듣기:-10,관찰:-10}},
{id:'counting',name:'끝없는 검산',exclusive:true,action:'같은 기록을 처음부터 다시 세어 본다.',san:4},
{id:'flight',name:'도망쳐야 한다는 확신',exclusive:true,action:'모든 것을 남겨두고 숨어서 밤을 보낸다.',san:2},
{id:'rage',name:'멈추지 않는 분노',exclusive:true,action:'앞을 막는 것에 충동적으로 달려든다.',san:3,hp:6},
{id:'ritual',name:'반복해야 하는 의식',exclusive:true,action:'안전하다고 믿는 동작을 끝없이 반복한다.',san:3},
{id:'silence',name:'말을 빼앗긴 느낌',exclusive:true,action:'아무에게도 대답하지 않고 문을 닫는다.',san:2},
{id:'guilt',name:'지워지지 않는 죄책감',skills:{설득:-12}},
{id:'memory',name:'끊어진 기억의 고리',skills:{박학:-20}},
{id:'voices',name:'겹쳐 들리는 목소리',skills:{듣기:-15,관찰:-10}},
{id:'crowd',name:'군중 속의 공포',skills:{설득:-15,격투:-5}},
{id:'walls',name:'다가오는 벽',skills:{은밀행동:-12,운동:-8}},
{id:'dark',name:'어둠에 남은 얼굴',skills:{오컬트:-12}},
{id:'suspicion',name:'믿을 수 없는 표정',skills:{심리학:-20}},
{id:'numb',name:'타인의 고통이 먼 느낌',skills:{의학:-12,심리학:-8}},
{id:'impulse',name:'생각보다 빠른 손',skills:{사격:-12,관찰:-8}},
{id:'echo',name:'의식의 메아리',skills:{오컬트:-10},stress:2}
];
const catastropheNames={nora:'이름 없는 방문자의 강림',factory:'기계 심장의 각성',debt:'이름을 거두는 채권자의 도래',patient:'기억의 합창이 병동을 삼킴',press:'백지의 행렬이 거리에 나타남'};
function initialiseCrisis(r){r.madness=r.madness||[];r.hospital=r.hospital||null;r.crisisClocks=r.crisisClocks||{};r.critical=r.critical||null;r.encounterLead=r.encounterLead||null;r.lastCrisisYear=r.lastCrisisYear??null;return r}
function activeMadness(){return s.madness.map(m=>madnessPool.find(d=>d.id===m.id)).filter(Boolean)}
function exclusiveMadness(){return activeMadness().find(m=>m.exclusive)}
function madnessSkill(id){return activeMadness().reduce((n,m)=>n+(m.skills?.[id]||0),0)}
function currentArcId(){return s.pending?.kind==='case'?'nora':s.pending?.kind==='investigation'?s.pending.arc:s.activeInvestigation}
function clockFor(id){return s.crisisClocks[id]||(s.crisisClocks[id]={lastProgress:s.year,deadline:s.year+4,catastrophe:false})}
function arcIsResolved(id){return id==='nora'?Boolean(s.resolution):Boolean(arcState(id)?.resolution)}
function addMadness(loss){if(loss<Math.max(10,Math.ceil(s.maxSan*0.2))||s.madness.length>=3||s.san<=0)return;const pool=madnessPool.filter(d=>!s.madness.some(m=>m.id===d.id));const m=pick(pool);s.madness.push({id:m.id,year:s.year});const msg=`한 번에 이성 ${loss}을 잃어 광기 「${m.name}」이 남았다. 입원 치료로 회복해야 한다.`;s.result=(s.result||'')+' '+msg;addLog(msg,false,'failure')}
function closeCatastrophicArc(id){if(id==='nora'){s.resolution='catastrophe';s.caseStage=5}else{const state=arcState(id);if(state){state.resolution='catastrophe';state.finished=s.year}}s.activeInvestigation=null;s.deferredCase=null;s.encounterLead=null;s.encounterAfter=s.year+3}
function triggerCatastrophe(id,reason){const clock=clockFor(id);if(clock.catastrophe)return;clock.catastrophe=true;closeCatastrophicArc(id);s.critical={arc:id,since:s.year};applyEffects({san:-30,hp:-12});const msg=`${catastropheNames[id]} — ${reason} 이성 30과 건강 12를 잃었다. 살아남았어도 다음에는 즉시 생존을 위한 결정을 내려야 한다.`;s.result=(s.result||'')+' '+msg;s.resultOutcome='failure';addLog(msg,false,'failure')}
function afterCrisisChoice(event,c,ok,oldSan){
 const id=currentArcId();if(isInvestigation()&&id){const final=s.pending.index===(id==='nora'?4:arcById(id).chapters.length-1);if(final&&!ok)triggerCatastrophe(id,'마지막 시도가 실패하며 막아야 할 문이 열렸다.');else if(ok||(!c.resolution&&!c.episodeOutcome)){const clock=clockFor(id);clock.lastProgress=s.year;clock.deadline=s.year+4}if(arcIsResolved(id))s.lastCrisisYear=s.year}
 if(s.pending?.kind==='catastrophe'){s.critical=null;if(!ok)applyEffects({hp:-12,san:-8});s.result+=' 재앙에서 달아난 흔적은 오래 남는다.'}
 addMadness(Math.max(0,oldSan-s.san));
}
function postponeInvestigation(mania=null){const id=currentArcId();if(!id)return;clockFor(id);if(mania)applyEffects({san:-(mania.san||2),hp:-(mania.hp||0)});if(s.pending.kind==='case')s.caseDue=s.year+1;else arcState(id).due=s.year+1;s.pending={kind:'recuperation'};s.resultOutcome=mania?'failure':'neutral';s.result=mania?`광기 「${mania.name}」 때문에 조사를 진행하지 못했다. ${mania.action}`:'조사를 다음 해로 미뤘다. 증거를 찾을 수 있는 시간은 계속 줄어든다.';s.progress=0;addLog(s.result,false,s.resultOutcome);if(!s.hp||!s.san)finish(!s.hp?'사망 — 남겨진 기록':'현실의 경계 너머');else{save();render()}}
function criticalEvent(){const arc=s.critical?.arc||s.pending.arc;return {id:'critical_'+arc,title:'재앙 뒤의 생존',text:`${catastropheNames[arc]} 이후 익숙한 거리가 무너졌다. 지금은 사건의 진실보다 살아서 이곳을 벗어나는 것이 먼저다. 실패하면 치명적인 부상이 더해진다.`,choices:[{text:'좁아지는 탈출로를 끝까지 달려 빠져나간다.',skill:'운동',difficulty:2,hp:-4,san:-4,success:'상처를 입었지만 재앙의 중심에서 벗어났다.',failure:'탈출로에서 붙잡혀 치명적인 부상을 입었다.'},{text:'$60을 쓰고 부상자를 실어 나르는 차량과 함께 도망친다.',wealth:-60,hp:-6,san:-5,success:'재산과 건강을 잃었지만 살아서 빠져나왔다.'},{text:'함께했던 사람들에게 구조를 요청한다.',availability:r=>r.bond>=3,bond:-2,hp:-5,san:-6,success:'인연들이 당신을 끌어냈다. 그들에게도 상처가 남았다.'}]}}
function admitHospital(){if(!s||s.ended||s.hospital||!s.madness.length)return false;
 s.hospital={remaining:2,admitted:s.year};s.wealth=Math.max(0,s.wealth-30);s.pending={kind:'inpatient'};s.result='광기 후유증 치료를 위해 입원했다. 두 해 동안 일·조사·업무를 수행하지 못한다. 수입은 없고 생활비는 계속 들며, 시작된 사건의 기한도 멈추지 않는다.';s.resultOutcome='neutral';addLog(s.result);save();render();return true;
}
function crisisYearStart(){
 if(s.activeInvestigation&&!arcIsResolved(s.activeInvestigation)){const clock=clockFor(s.activeInvestigation);if(s.year>=clock.deadline){const before=s.san;triggerCatastrophe(s.activeInvestigation,'경고한 조사 기한을 넘겨 의식을 막지 못했다.');addMadness(before-s.san)}}
 if(s.encounterLead&&s.year-s.encounterLead.since>=7&&!s.activeInvestigation){const id=s.encounterLead.id;if(id!=='nora'&&!arcState(id)){s.investigations[id]={stage:0,due:s.year,notes:[],resolution:null,started:s.encounterLead.since}}const before=s.san;triggerCatastrophe(id,'이미 드러난 징후를 너무 오래 방치했다.');addMadness(before-s.san)}
 if(!s.hp||!s.san){finish(!s.hp?'사망 — 남겨진 기록':'현실의 경계 너머');return true}
 if(s.hospital){s.pending={kind:'inpatient'};s.result='입원 중이다. 지금은 직업과 조사 대신 치료에 시간을 쓴다. 사건의 위험은 계속 흐른다.';return true}
 if(s.critical){s.pending={kind:'catastrophe',arc:s.critical.arc};s.result=null;return true}return false;
}
function hospitalYearEnd(){if(!s.hospital)return;applyEffects({san:15,hp:4});s.hospital.remaining--;if(s.hospital.remaining<=0){s.madness=[];s.hospital=null;addLog('두 해의 입원 치료를 마치고 광기 후유증에서 회복했다. 밀린 사건의 위험은 사라지지 않았다.')}}
function crisisEventPanel(){if(!s)return '';const clock=s.activeInvestigation?clockFor(s.activeInvestigation):null;return `<section class="crisis-panel">${s.critical?'<p><strong>재앙 발생 · 아직 생존 위기에서 벗어나지 못했습니다.</strong></p>':''}${clock?`<p>진행 중인 조사 기한: ${clock.deadline}년 · 방치하면 재앙이 발생합니다.</p>`:''}${s.encounterLead?`<p>사건의 징후: ${s.encounterLead.id==='nora'?'숙부의 일기':arcById(s.encounterLead.id).title} · ${s.encounterLead.since}년부터 감지됨. ${escapeHTML(encounterLeadText(s.encounterLead.id))} 입원하지 않으면 2~4년 안에 본 조사가 시작됩니다. 징후를 7년간 방치하면 재앙이 발생합니다.</p>`:''}${s.madness.length?`<strong>광기 후유증</strong>${activeMadness().map(m=>`<p>${m.name} — ${m.exclusive?'조사·업무에서 강박 선택만 가능':Object.entries(m.skills||{}).map(([k,v])=>k+' '+v).join(' · ')||'추가 공포 2'}</p>`).join('')}<button id="admit-hospital" ${s.hospital?'disabled':''}>정신병원에 2년 입원 · 입원비 최대 $30 · 수입 중단</button><p>돈이 부족해도 입원할 수 있습니다. 진행 중인 조사 기한은 멈추지 않습니다.</p>`:''}${s.hospital?`<p>입원 치료 ${s.hospital.remaining}년 남음 · 직업 수입 없음</p>`:''}</section>`}
function installCrisisHooks(){
 const baseFork=careerForkEvent;careerForkEvent=function(){const e=baseFork();if(s.career.mode==='independent')e.text='현재 업장을 유지하며 역할을 넓히거나 다른 직업으로 옮길지 결정한다.';e.choices=e.choices.filter(c=>!(s.career.mode==='independent'&&(c.independent||c.promote)));return e};
 const baseCurrent=currentEvent;currentEvent=function(){if(s.pending?.kind==='catastrophe')return criticalEvent();const e=baseCurrent();if(!e)return e;const choices=[...e.choices];if(isInvestigation()){choices.push({text:'조사를 다음 해로 미룬다. 기한이 지나면 재앙이 발생한다.',defer:true})}const mania=exclusiveMadness();if(mania&&(isInvestigation()||['profession','careerFork'].includes(s.pending?.kind)))choices.push({text:'광기: '+mania.action,madnessAction:mania.id});return {...e,choices}};
 const baseEligible=eligibleEncounters;eligibleEncounters=function(ignoreWait=false){const after=s.encounterAfter;if(ignoreWait)s.encounterAfter=0;const list=baseEligible();s.encounterAfter=after;return list};
 const baseStart=startEncounter;startEncounter=function(id){baseStart(id);s.encounterLead=null;clockFor(id)};
 const baseNext=nextInvestigation;nextInvestigation=function(){if(s.activeInvestigation||s.deferredCase||s.noraStarted&&!s.resolution)return baseNext();if(!s.encounterLead){const pool=eligibleEncounters(true);if(!pool.length)return false;s.encounterLead={id:weightedEncounter(pool),since:s.year};addLog(encounterLeadText(s.encounterLead.id))}
 const elapsed=s.year-s.encounterLead.since;if(s.year<s.encounterAfter||elapsed<2)return false;if(elapsed>=4||Math.random()<0.5){startEncounter(s.encounterLead.id);return true}return false};
 const baseSkill=effectiveSkill;effectiveSkill=(id,raw=s)=>clamp(baseSkill(id,raw)+(raw.madness||[]).reduce((n,m)=>n+(madnessPool.find(d=>d.id===m.id)?.skills?.[id]||0),0),5,95);
 const previousWords=lifeAfterwords;lifeAfterwords=function(){return [...previousWords(),...s.madness.map(m=>'마지막까지 남은 광기: '+madnessPool.find(d=>d.id===m.id).name)]};
}

