'use strict';
const $=id=>document.getElementById(id), KEY='arkham-life-v1', ARCH='arkham-archive-v1', SETTINGS='arkham-time-v1';
const BASE_YEAR_MS=12000, SPEEDS=[1,2,4,8,16], APTITUDES=['조사','설득','행동'];
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const randomInt=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[randomInt(0,a.length-1)];
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
let s=null, screen='landing', lastTick=performance.now(), lastSave=0;
let settings=read(SETTINGS,{speed:1,paused:false});
if(!SPEEDS.includes(settings.speed))settings.speed=1;
settings.paused=Boolean(settings.paused);
function sampleLifespan(){// 1920년 30세 기대여명 평균 37.105년을 참고한 게임용 분포. 실측 생존곡선은 아니다.
 const u=Math.max(Math.random(),0.000001),v=Math.random();
 return Math.round(clamp(67.105+11*Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v),40,99));
}
function normalise(raw){
 if(!raw||typeof raw!=='object')return null;
 const legacy=(raw.version||1)<3;
 raw.version=12; raw.phase=raw.phase||'adult';raw.birthYear=1900;
 const economy=familyEconomy[raw.family]||familyEconomy.worker;
 if(Number.isFinite(raw.wealth)&&raw.wealth<0){raw.debt=(Number.isFinite(raw.debt)?Math.max(0,raw.debt):0)-raw.wealth;raw.wealth=0}
 raw.wealth=Number.isFinite(raw.wealth)?Math.max(0,raw.wealth):economy.wealth;
 raw.treatments=raw.treatments||[];raw.careMessage=raw.careMessage||null;
 raw.jobId=raw.jobId||careers.find(j=>j.name===raw.job)?.id;
 raw.traits=raw.traits||[]; raw.routes=raw.routes||[];raw.growthBonus=raw.growthBonus||[0,0,0];
 raw.baseSkills=raw.baseSkills||[32,32,32];raw.maxHp=raw.maxHp||Math.max(30,raw.hp||0);raw.maxSan=raw.maxSan||Math.max(70,raw.san||0);
 raw.maxHp=clamp(raw.maxHp,1,99);raw.maxSan=clamp(raw.maxSan,1,99);
 raw.hp=clamp(raw.hp??raw.maxHp,0,raw.maxHp);raw.san=clamp(raw.san??raw.maxSan,0,raw.maxSan);
 raw.parentJob=raw.parentJob||pick(parentJobs[raw.family]||parentJobs.worker)[0];
 raw.childhoodSeen=raw.childhoodSeen||[];raw.professionDue=raw.professionDue||Math.max(1921,raw.year+1);raw.lifeAge=raw.lifeAge||sampleLifespan();raw.longevity=raw.longevity||0;
 raw.evidence=raw.evidence||[];raw.bond=raw.bond??2;raw.risk=raw.risk||0;raw.caseStage=raw.caseStage||0;raw.caseDue=raw.caseDue||1920;
 raw.progress=clamp(raw.progress||0,0,1);raw.history=raw.history||[];raw.cooldowns=raw.cooldowns||{};raw.resolution=raw.resolution||null;
 raw.log=(raw.log||[]).map(entry=>typeof entry==='string'?{year:Number(entry.slice(0,4))||raw.year,text:entry.replace(/<br\s*\/?\s*>/gi,' — ').replace(/<[^>]*>/g,''),minor:false}:entry);
 if(legacy){
  raw.result=null;raw.pending=null;raw.progress=0;
  if(raw.phase==='growth'){
   const step=raw.growthStep??-1;raw.year=step<0?1900:step<3?growthStages[step].year:1919;
   raw.pending=step<0?null:step<3?{kind:'growth',index:step}:{kind:'career'};
  }else if(!raw.ended){raw.pending={kind:'case',index:0};raw.caseDue=raw.year;raw.skills=raw.skills||{조사:50,설득:50,행동:50}}
 }
 initialiseLifeLinks(raw);initialiseRecovery(raw);initialiseEncounters(raw);migrateSkills(raw);initialisePersonalTraits(raw);initialiseCrisis(raw);
 raw.purchased=raw.purchased||[];raw.supplies=raw.supplies||0;raw.resultOutcome=raw.resultOutcome||null;
 if(raw.result&&!raw.resultOutcome){const previous=raw.history?.at(-1);const group={case:caseEvents,profession:professionEvents,ambient:ambientEvents,childhood:childhoodEvents}[raw.pending?.kind];if(previous&&group?.[raw.pending.index]?.id===previous.event)raw.resultOutcome=previous.success?'success':'failure'}
 if(raw.traits.includes('가족의 사진첩')&&!raw.followups.some(e=>e.id==='kept_family')&&!raw.completedFollowups.includes('kept_family'))raw.followups.push({id:'kept_family',due:Math.max(1922,raw.year+2)});
 return raw;
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(s));$('storage-note').hidden=true}catch{$('storage-note').hidden=false}}
function saveSettings(){try{localStorage.setItem(SETTINGS,JSON.stringify(settings))}catch{}}
function addLog(text,minor=false,outcome=null){s.log.push({year:s.year,text,minor,outcome})}
function start(){
 const family=pick(families),maxHp=randomInt(28,40),maxSan=randomInt(50,65);
 s={version:12,phase:'growth',birthYear:1900,name:pick(['엘리엇','마리온','아서','에블린','헨리','클라라']),family:family.id,parentJob:pick(parentJobs[family.id])[0],childhoodSeen:[],professionDue:1921,familyName:family.name,hook:family.hook,year:1900,wealth:familyEconomy[family.id].wealth,treatments:[],careMessage:null,traits:[],growthBonus:[...family.bonus],baseSkills:APTITUDES.map(()=>randomInt(22,42)),routes:[],maxHp,maxSan,hp:maxHp,san:maxSan,skills:{},evidence:[],bond:2,risk:0,caseStage:0,caseDue:1920,resolution:null,lifeAge:sampleLifespan(),longevity:0,progress:0,pending:null,result:null,log:[],history:[],cooldowns:{},ended:false};
 initialiseLifeLinks(s);initialiseRecovery(s);initialiseEncounters(s);migrateSkills(s);initialisePersonalTraits(s,true);initialiseCrisis(s);s.purchased=[];s.supplies=0;s.resultOutcome=null;settings.paused=false;saveSettings();addLog(`출생 성향 「${birthDefinition().name}」과 단점 「${drawbackDefinition().name}」을 지녔다.`);addLog(`${family.name}에서 태어났다. ${family.text}`);save();show('game');render();
}
function show(id){screen=id;['landing','game','archive'].forEach(k=>$(k).hidden=k!==id);$('time-controls').hidden=id!=='game'||!s||s.ended;lastTick=performance.now();if(id==='landing')$('resume').hidden=!s}
function checkOutcome(value,target,difficulty=1){return value<=Math.max(1,Math.floor(target/difficulty))}
function applyEffects(effect){
 if(effect.wealth)changeFunds(effect.wealth,'선택의 수입·지출');
 if(effect.hpMax){const previous=s.maxHp;s.maxHp=clamp(s.maxHp+effect.hpMax,1,99);s.hp+=s.maxHp-previous}
 if(effect.sanMax){const previous=s.maxSan;s.maxSan=clamp(s.maxSan+effect.sanMax,1,99);s.san+=s.maxSan-previous}
 s.hp=clamp(s.hp+(effect.hp||0),0,s.maxHp);s.san=clamp(s.san+(effect.san||0),0,s.maxSan);
 s.bond=clamp(s.bond+(effect.bond||0),0,12);s.risk=clamp(s.risk+(effect.risk||0),0,10);
 s.longevity=clamp(s.longevity+(effect.longevity||0),0,8);
}
function chooseGrowth(index){
 if(s.ended||s.result||s.pending?.kind!=='growth')return;
 const stage=growthStages[s.pending.index],choice=growthOptions(stage)[index];if(!choice||s.wealth<Math.max(0,-(choice.wealth||0)))return;
 if(choice.id&&!s.growthTaken.includes(choice.id))s.growthTaken.push(choice.id);
 s.growthBonus=s.growthBonus.map((n,i)=>n+choice.bonus[i]);s.traits.push(choice.trait);applyFocusedTraining(choice);if(choice.routes)s.routes=choice.routes;
 const oldMaxHp=s.maxHp,oldMaxSan=s.maxSan;applyEffects({...choice,san:Math.max(0,choice.san||0),hp:Math.max(0,choice.hp||0)});s.lastImpact=null;const growthImpact=(choice.san<0||choice.hp<0)?contextualHarm({stress:0}, {...choice,sanityReason:'어린 나이에 접한 기묘한 전승이 밤에도 현실처럼 떠올라 두려움을 남겼다.'},true):'';s.resultOutcome='neutral';s.result=`${choice.text}.`+` 당신의 삶에 「${choice.trait}」라는 기억이 남았다.`+growthImpact;
 if(choice.hpMax)s.result+=' 건강의 그릇이 넓어졌다.';
 if(choice.sanMax)s.result+=' 마음의 그릇이 넓어졌다.';
 if(choice.wealth)s.result+=choice.wealth<0?` 재산 $${-choice.wealth}을 생활과 배움에 사용했다.`:` 품삯 $${choice.wealth}을 모았다.`;
 addMadness(Math.max(0,s.lastImpact?.fear?.loss||0));if(!s.hp||!s.san)finish(!s.hp?'사망 — 남겨진 기록':'현실의 경계 너머');else{addLog(s.result);save();render()}
}
function chooseCareer(index){
 if(s.ended||s.result||s.pending?.kind!=='career')return;
 const job=careers[index];if(!job)return;s.job=job.name;s.jobId=job.id;s.professionDue=s.year+randomInt(1,4);
 const prepared=s.routes.includes(job.name)||(job.id==='librarian'&&s.traits.includes('사서에게 배운 아이'))||(job.id==='mechanic'&&s.traits.includes('손으로 익힌 기술'));
 s.skills=createCareerSkills(job.id,prepared);s.skillSchema=2;
 s.resultOutcome='neutral';s.result=`${job.name}로 일하기 시작했다. ${prepared?'어린 시절의 배움이 첫걸음을 도왔다.':'새로운 길에서도 살아온 경험을 잊지 않기로 했다.'}`;addLog(s.result);save();render();
}
function currentEvent(){if(s.pending?.kind==='investigation')return investigationEvent();if(s.pending?.kind==='case')return caseEvents[s.pending.index];if(s.pending?.kind==='ambient')return ambientEvents[s.pending.index];if(s.pending?.kind==='childhood')return childhoodEvents[s.pending.index];if(s.pending?.kind==='profession')return professionEvents[s.pending.index];if(s.pending?.kind==='consequence')return consequenceEvents.find(e=>e.id===s.pending.id);if(s.pending?.kind==='careerFork')return careerForkEvent();return null}
function choiceAvailable(c){return (!s.hospital||s.pending?.kind==='catastrophe')&&(!c.independent||s.career.mode!=='independent')&&(!(exclusiveMadness()&&(isInvestigation()||['profession','careerFork'].includes(s.pending?.kind)))||Boolean(c.madnessAction))&&(!c.availability||c.availability(s))&&(!c.minReputation||s.career.reputation>=c.minReputation)&&(!c.requiresNotFlag||!s.flags[c.requiresNotFlag])&&(!c.requiresJob||s.jobId===c.requiresJob)&&s.wealth>=Math.max(0,-(c.wealth||0))&&(!c.requiresTrait||s.traits.includes(c.requiresTrait))&&(!c.requiresEvidence||c.requiresEvidence.every(e=>s.evidence.includes(e)))}
function choose(index){
 if(s.ended||s.result)return;const event=currentEvent(),c=event?.choices[index];if(!c||!choiceAvailable(c))return;
 if(c.defer){postponeInvestigation();return}
 if(c.madnessAction){const mania=madnessPool.find(m=>m.id===c.madnessAction);if(isInvestigation())postponeInvestigation(mania);else{applyEffects({san:-(mania.san||2),hp:-(mania.hp||0)});s.result='광기 때문에 업무를 수행하지 못했다. '+mania.action;s.resultOutcome='failure';if(!s.hp||!s.san)finish(!s.hp?'사망 — 남겨진 기록':'현실의 경계 너머');else{save();render()}}return}
 let ok=!c.skill||skillCheck(c.skill,c.difficulty||1,isInvestigation()?Math.min(15,delayCount()*5):0);
 let luckyUsed=false;
 if(!ok&&birthDefinition()?.lucky&&s.traitUsage.lucky!==s.year){s.traitUsage.lucky=s.year;luckyUsed=true;const firstRoll=s.lastRoll?.roll;ok=skillCheck(c.skill,c.difficulty||1,isInvestigation()?Math.min(15,delayCount()*5):0);s.lastRoll.previousRoll=firstRoll}
 const oldMaxHp=s.maxHp,oldMaxSan=s.maxSan,oldHp=s.hp,oldSan=s.san;
 s.resultOutcome=ok?'success':'failure';
 applyEffects({...c,hp:Math.max(0,c.hp||0),san:Math.max(0,c.san||0),wealth:ok?c.wealth:(c.failureWealth??c.wealth)});
 if(c.training)for(const [id,gain] of Object.entries(c.training))learnSkill(id,gain,'연습과 공부');
 if(c.bonus){s.growthBonus=s.growthBonus.map((n,i)=>n+c.bonus[i]);applyFocusedTraining(c)}
 if(c.trait&&!s.traits.includes(c.trait))s.traits.push(c.trait);
 if(!ok)applyEffects({bond:c.skill==='설득'?-1:0,risk:1});
 const impactText=contextualHarm(event,c,ok);
 if(c.evidence&&!s.evidence.includes(c.evidence))s.evidence.push(c.evidence);
 // 판정 자체의 성장 다이스는 skillCheck에서 성공·실패와 무관하게 처리한다.
 s.result=((ok?c.success:c.failure)||c.success)+impactText;if(s.lastRoll)s.result+=' '+rollDescription();
 if(luckyUsed)s.result+=' 위기의 순간에 행운이 한 번 더 기회를 주었다.';
 if(c.evidence)s.result+=` 「${evidenceNames[c.evidence]}」을 기록에 보관했다.`;
 if(s.hp<oldHp||s.san<oldSan)s.result+=` 이번 선택으로 건강 ${s.hp-oldHp}, 이성 ${s.san-oldSan}.`;
 if(c.hpMax)s.result+=` 건강의 최대치가 ${s.maxHp-oldMaxHp} 늘었다.`;
 if(c.sanMax)s.result+=` 이성의 최대치가 ${s.maxSan-oldMaxSan} 늘었다.`;
 if(s.pending.kind==='case'&&c.resolution&&ok){s.resolution=c.resolution;s.caseStage=5;s.result+=' 이 사건은 마무리되었다. 당신의 삶은 계속된다.'}
 if(s.pending.kind==='case'&&!c.resolution)s.caseStage=Math.max(s.caseStage,s.pending.index+1);
 if(s.pending.kind==='case'){s.caseDue=s.year+randomInt(2,4);s.deferredCase=null}
 if(s.pending.kind==='ambient')s.cooldowns[event.id]=s.year+5;
 if(s.pending.kind==='childhood')s.childhoodSeen.push(event.id);
 if(s.pending.kind==='profession')s.professionDue=s.year+randomInt(4,6);
 applyLifeLinks(event,c,ok);advanceNewInvestigation(event,c,ok);
 if(c.trait==='가족의 사진첩')queueConsequence('kept_family',Math.max(2,1922-s.year));
 s.history.push({year:s.year,event:event.id,choice:index,skill:c.skill||(c.switchJob?s.lastRoll?.skill:null)||null,roll:s.lastRoll?{...s.lastRoll}:null,investigation:isInvestigation(),success:c.switchJob?(s.lastRoll?.success??ok):ok});addLog(`${event.title} — ${s.result}`,false,s.resultOutcome);
 updateExperienceTraits();afterCrisisChoice(event,c,ok,oldSan);
 if(!s.hp)finish('사망 — 남겨진 기록');else if(!s.san)finish('현실의 경계 너머');else{save();render()}
}
function beginYear(){
 s.progress=0;s.lastRoll=null;s.pending=null;s.result=null;s.resultOutcome=null;s.incomeLoss=0;s.treatments=[];s.purchased=[];s.careMessage=null;
 if(crisisYearStart())return;
 if(s.year>=1920&&s.phase==='growth'){s.phase='adult';if(!s.job){s.pending={kind:'career'};return}}
 if(s.phase==='growth'){
  const index=growthStages.findIndex(stage=>stage.year===s.year);
  if(index>=0)s.pending={kind:'growth',index};else if(s.year===1919)s.pending={kind:'career'};
  else if(s.year-s.birthYear>=3){
   const scheduled=childhoodEvents.findIndex(e=>childhoodSchedule(e)===s.year);
   if(scheduled>=0){s.pending={kind:'childhood',index:scheduled};return}
   const all=childhoodEvents.map((event,index)=>({event,index})).filter(({event})=>!event.scheduled&&(!event.family||event.family===s.family)&&(!event.parent||event.parent===s.parentJob)&&!s.childhoodSeen.includes(event.id));
   const preferred=all.filter(({event})=>s.year===1904?event.family:s.year===1910?event.parent:true);
   const pool=preferred.length?preferred:all;
   if(pool.length&&([1904,1910].includes(s.year)||Math.random()<0.28))s.pending={kind:'childhood',index:pick(pool).index};
  }
 }else{
  if(s.deferredCase&&s.year>=s.deferredCase.due){nextInvestigation();return}
  if(s.activeInvestigation==='nora'&&s.caseStage<=1&&s.year>=s.caseDue){nextInvestigation();return}
  const nextFollowup=s.followups.find(e=>e.due<=s.year&&!s.completedFollowups.includes(e.id)&&(!e.id.startsWith('life_')||!s.activeInvestigation));
  if(nextFollowup){s.pending={kind:'consequence',id:nextFollowup.id};return}
  if(nextInvestigation())return;
  if(s.careerForkDue&&s.year>=s.careerForkDue){s.pending={kind:'careerFork'};return}
  if(s.jobId&&s.year>=s.professionDue){const index=professionIndex();if(index>=0){s.pending={kind:'profession',index};return}}
  const age=s.year-s.birthYear;
  const pool=ambientEvents.map((event,index)=>({event,index})).filter(({event})=>(s.resolution!=='escaped'||!['wall','club'].includes(event.id))&&(!event.before||s.year<event.before)&&(!event.minAge||age>=event.minAge)&&(!s.cooldowns[event.id]||s.cooldowns[event.id]<=s.year));
  if(pool.length&&Math.random()<0.45)s.pending={kind:'ambient',index:pick(pool).index};
 }
 if(!s.pending){const bucket=s.phase==='growth'?'child':s.year-s.birthYear>=55?'later':'adult';addLog(pick(ordinaryNotes[bucket]),true)}
}
function settleYear(){
 const before=s.wealth;
 if(s.job||s.phase==='adult'){
  const gross=annualIncome(),income=s.hospital?0:Math.max(0,gross-Math.round(gross*s.incomeLoss)),expenses=annualExpenses();
  changeFunds(income-expenses,'연간 생계');
  if(income>=expenses)s.savingYears++;updateExperienceTraits();
  addLog(`생업 수입 $${income}${s.incomeLoss?' (치료·휴식으로 $'+Math.round(gross*s.incomeLoss)+' 감소)':''} · 생활비 $${expenses} · 재산 $${s.wealth} (연간 ${s.wealth-before>=0?'+':'−'}$${Math.abs(s.wealth-before)})`,true);
 }else{
  const change=(familyEconomy[s.family]||familyEconomy.worker).annual;
  changeFunds(change,'집안의 살림');
  addLog(`집안의 살림에서 ${change>=0?'지원이 들어왔다':'지출이 생겼다'}. 재산 $${s.wealth} (${s.wealth-before>=0?'+':'−'}$${Math.abs(s.wealth-before)})`,true);
 }
}
function canTreat(kind){
 const treatment=treatments[kind];return Boolean(s&&!s.ended&&!s.hospital&&screen==='game'&&treatment&&!s.treatments.includes(kind)&&s.wealth>=treatment.cost&&((treatment.hp&&s.hp<s.maxHp)||(treatment.san&&s.san<s.maxSan)));
}
function treat(kind){
 if(!canTreat(kind))return false;const treatment=treatments[kind],oldHp=s.hp,oldSan=s.san;
 s.wealth-=treatment.cost;applyEffects(treatment);s.treatments.push(kind);
 const delayNote=applyRecoveryTime(kind);
 s.careMessage=`${treatment.text} ${delayNote} 치료비 $${treatment.cost} · ${treatment.hp?'건강 +'+(s.hp-oldHp):'이성 +'+(s.san-oldSan)}`;
 addLog(s.careMessage);save();render();return true;
}
function renderCare(){
 return `<div class="care-panel"><div><strong>치료와 요양</strong>${s.job&&s.incomeLoss?`<p>올해 치료·휴식으로 직업 수입 ${Math.round(s.incomeLoss*100)}% 감소 · 예상 수입 $${annualIncome()-Math.round(annualIncome()*s.incomeLoss)}</p>`:''}<small>각 치료는 한 해에 한 번 · ${s.phase==='growth'?'집안의 개인 생활비':'현재 재산'}에서 지불 · 미완료 조사 중 치료는 다음 해로 연기</small></div><div class="care-buttons">${Object.entries(treatments).map(([kind,t])=>`<button data-care="${kind}" ${canTreat(kind)?'':'disabled'}>${t.name} · $${t.cost}<small>${t.hp?'건강 +'+t.hp:'이성 +'+t.san} 회복 · ${recoveryWarning(kind)}${s.treatments.includes(kind)?' · 올해 치료 완료':s.wealth<t.cost?' · 비용 부족':''}</small></button>`).join('')}</div>${s.careMessage?`<p role="status">${formatProse(s.careMessage)}</p>`:''}</div>`;
}
function advance(){
 if(!s||s.ended||waitingForDecision())return false;
 settleYear();hospitalYearEnd();
 s.year++;
 if(s.phase==='adult'){
  const age=s.year-s.birthYear;
  applyEffects({hp:ageingHealthChange(age),san:s.bond>=5?1:0});
  if(shouldEndLife(age)){finish('여생 — 마지막 페이지');return true}
  if(!s.hp){finish('사망 — 남겨진 기록');return true}
 }
 beginYear();save();render();return true;
}
function finish(title){
 if(!s||s.ended)return;noteCareerJourney();s.finalRecord=buildLifeRecord(title);s.ended=true;s.ending=title;
 const endings={quarantined:'통제된 문밖의 미해결 기록',sealed:'봉인을 지킨 사람',destroyed:'불길 뒤의 증언자',bargain:'이름을 바꾼 거래자',escaped:'아캄을 떠난 사람',catastrophe:'강림 이후의 생존자'};
 s.afterwords=lifeAfterwords();s.epilogue=s.resolution?endings[s.resolution]:Object.values(s.investigations).some(e=>e.resolution)?'도시의 숨은 기록을 남긴 사람':'평범한 날들을 살아간 사람';
 s.epilogue=s.finalRecord.title;
 addLog(`${title} — ${s.epilogue}`);
 const a=read(ARCH,[]);a.unshift({name:s.name,job:s.job||'성장기',year:s.year,age:s.year-s.birthYear,title,epilogue:s.epilogue,finalRecord:s.finalRecord,family:s.familyName,traits:s.traits,evidence:[...s.evidence],resolution:s.resolution,wealth:s.wealth,debt:s.debt||0,afterwords:s.afterwords,birthTalent:s.birthTalent,drawback:s.drawback,experiences:s.experiences,career:{...s.career}});
 try{localStorage.setItem(ARCH,JSON.stringify(a.slice(0,30)))}catch{}save();render();
}
function renderLog(all=false){return s.log.slice(all?0:-12).reverse().map(l=>`<p class="${l.minor?'minor-note':''} ${l.outcome==='failure'?'log-failure':''}"><span>${l.year}</span> — ${formatProse(l.text)}</p>`).join('')}
function renderStats(){return `<div class="stats">${[['건강',`${s.hp} / ${s.maxHp}`],['이성',`${s.san} / ${s.maxSan}`],['재산',`$${s.wealth}`],['빚',`$${s.debt||0}`],['인연',s.bond],['나이',`${s.year-s.birthYear}세`]].map(([k,v])=>`<div class="stat">${k}<strong>${v}</strong></div>`).join('')}</div>`}
function renderProfile(){return `<details class="profile"><summary>탐사자의 이력과 기록</summary><p>${escapeHTML(s.familyName)} · ${escapeHTML(s.job||'아직 성장 중')}</p><p>부모 중 한 사람의 직업: ${escapeHTML(Object.values(parentJobs).flat().find(j=>j[0]===s.parentJob)?.[1]||'기록 없음')}</p><p>${s.job?`연 수입 $${annualIncome()} · 생활비 $${annualExpenses()} · 평판 ${s.career.reputation} / 99 · ${s.career.mode==='independent'?'독립 활동':'고용 상태'} · 경력 ${s.career.rank+1}단계`:`집안의 연간 생활비 변화 ${(familyEconomy[s.family]||familyEconomy.worker).annual>=0?'+':'−'}$${Math.abs((familyEconomy[s.family]||familyEconomy.worker).annual)}`}</p><p>${s.traits.map(escapeHTML).join(' · ')||'아직 어린 시절의 첫 페이지입니다.'}</p>${s.phase==='adult'?`${renderSkillProfile()}`:''}<p>${s.evidence.map(e=>escapeHTML(evidenceNames[e]||e)).join(' · ')||'아직 확보한 증거가 없습니다.'}</p></details>`}
function render(){
 if(!s)return;show('game');if(s.ended){renderEnd();return}
 let title,text,choices='';const pending=s.pending;
 if(pending?.kind==='growth'){
  const stage=growthStages[pending.index];title=stage.title;text=stage.text;choices=growthOptions(stage).map((c,i)=>{const cost=Math.max(0,-(c.wealth||0)),notes=[growthHint(c),cost?'비용 $'+cost:'',s.wealth<cost?'비용 부족':''].filter(Boolean).join(' · ');return `<button class="choice" data-growth="${i}" ${s.wealth<cost?'disabled':''}>${escapeHTML(c.text)}${notes?'<small>'+notes+'</small>':''}</button>`}).join('');
 }else if(pending?.kind==='career'){
  title='당신의 직업';text='앞으로 살아갈 일에 지원한다. 전문직은 준비한 실력을 채용 심사에서 보여야 한다. 의사는 특히 엄격한 심사를 거친다. 학력이 필요한 직업은 대학 과정을 마쳐야 지원할 수 있다. 불합격 뒤에는 공부를 더 할지 당장 구할 일을 시작할지 결정한다.';
  choices=careers.map((c,i)=>!careerVisible(c)?'':`<button class="choice" data-job="${i}" ${canChooseCareer(c.id)?'':'disabled'}>${escapeHTML(c.name)}<small>${escapeHTML(c.description)} <b>${escapeHTML(careerEntry[c.id]?("판정: "+careerEntry[c.id][0]+" · "+hiringBonusLabel(c.id)):"채용 판정 없음")}</b> ${!degreeAllows(c.id)?escapeHTML(careerRequirement(c.id))+' · ':''}연 수입 $${careerEconomy[c.id]} · 생활비 $${78}. ${s.routes.includes(c.name)?'익숙한 배움이 이 길로 이어진다.':''}</small></button>`).join('');
 }else if(pending?.kind==='studyYear'){title='다음 도전을 준비하는 해';text='구직 상태로 생활비를 감당하며 정해 둔 공부를 이어간다. 두 해를 채우면 다시 지원할지 일을 시작할지 선택한다.';
 }else if(pending?.kind==='inpatient'){title='정신병원에서 보내는 해';text='광기의 후유증을 치료하며 지낸다. 일과 조사는 할 수 없고 수입도 없지만, 바깥 사건의 기한은 계속 흐른다.';
 }else if(pending?.kind==='recuperation'){title='회복을 위해 멈춘 한 해';text='치료와 휴식에 시간을 썼다. 지금의 조사는 다음 해 다시 시작한다. 올해 수입과 지연의 대가는 기록에 남는다.';
 }else if(pending){
  const event=currentEvent();title=event.title;text=event.text;
  if(s.pending.kind==='case')text=chapterText(s.pending.index);
  if(s.pending.kind==='investigation')text=newChapterText();
  if(event.branchScene)text=event.text;
  choices=renderCompactChoices(event);
 }else if(s.year===1900){title='1900 — 태어난 집';text=`${s.familyName}. ${families.find(f=>f.id===s.family)?.text||''} 계절이 지나면 어린 시절의 선택이 찾아옵니다.`}
 else{title=s.phase==='growth'?'자라는 날들':'조용히 흐르는 한 해';text=s.phase==='growth'?'배움과 놀이, 집안일 사이에서 조금씩 자란다.':s.resolution==='escaped'?'아캄에서 멀어진 새 거처에서 일상을 이어간다. 평범한 날들은 작은 기록으로 남긴다.':'평범한 날들도 당신의 삶이다. 특별한 일은 작은 기록으로 남겨 둔다.'}
 $('game').innerHTML=`<div class="gamehead"><div><p class="tag">${s.phase==='growth'?'성장 기록':'탐사자 파일'} / ${s.year}년</p><h2>${escapeHTML(s.name)}${s.job?' · '+escapeHTML(s.job):'의 생애'}</h2></div>${s.phase==='adult'?'<button class="secondary" id="retire">이 생애를 마무리한다</button>':''}</div>${renderCityMap()}<div class="play-layout"><aside class="status-sidebar"><h3>현재 상태</h3>${renderStats()}<h3>기능치</h3>${renderSkillProfile()}${renderPersonalTraits()}${renderMadnessSummary()}<p class=education-status>${escapeHTML(educationStatus())}</p></aside><div class="play-main">${crisisEventPanel()}${renderAftermathPanel()}${renderWorldChanges()}${renderCityNews()}${renderMortalityNotice()}${renderFinancePanel()}${s.careMessage?`<p class="care-message" role="status">${escapeHTML(s.careMessage)}</p>`:""}<article class="event"><h3>${escapeHTML(title)}</h3>${renderExperienceGains()}${renderCaseMotivation()}<div class="scene-text">${text.split("\n\n").map(p=>"<p>"+formatProse(p)+"</p>").join("")}</div>${isInvestigation()?"<p class=scene-goal>조사의 목적: "+escapeHTML(currentEvent().goal)+"</p>":""}${s.result?`${renderResultPanel()}<p class="muted">${s.fieldContinuation?'현장 조사를 이어갑니다. 기록을 읽은 뒤 다음 장면으로 넘어갈 수 있습니다.':'시간이 다시 흐릅니다. 기록을 더 읽고 싶으면 일시정지하세요.'}</p><button class="secondary" id="continue-record">다음 기록으로 →</button>`:choices?`<p class="waiting-note">선택하는 동안 시간은 멈춥니다.</p><div class="choices">${choices}</div>`:'<p class="muted">이 해는 자동으로 지나갑니다.</p>'}${renderEvidence()}${renderProfile()}</article><details class="services"><summary>치료 · 휴식 · 지출</summary>${s.critical?"<p>눈앞의 위험에서 먼저 벗어나야 합니다. 지금은 치료·입원·구매를 할 수 없습니다.</p>":""}${renderCare()}${renderPurchases()}${renderSkillCourses()}</details><details class="journal-details"><summary>최근 생애 기록</summary><aside class="journal"><p class="tag">PERSONAL JOURNAL</p><h3>남겨진 기록</h3>${renderStoryMemo()}${renderLog()}</aside></details></div></div>`;
 document.querySelectorAll('[data-course]').forEach(b=>b.onclick=()=>studySkill(b.dataset.course));
 document.querySelectorAll('[data-finance]').forEach(b=>b.onclick=()=>financeAction(b.dataset.finance));
 if($('admit-hospital'))$('admit-hospital').onclick=admitHospital;
 document.querySelectorAll('[data-experience]').forEach(b=>b.onclick=()=>toggleExperience(b.dataset.experience));
 document.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>buy(b.dataset.buy));
 document.querySelectorAll('[data-care]').forEach(b=>b.onclick=()=>treat(b.dataset.care));
 document.querySelectorAll('[data-growth]').forEach(b=>b.onclick=()=>chooseGrowth(Number(b.dataset.growth)));
 document.querySelectorAll('[data-job]').forEach(b=>b.onclick=()=>chooseCareer(Number(b.dataset.job)));
 document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>choose(Number(b.dataset.choice)));
 if($('retire'))$('retire').onclick=()=>{$('retire-dialog').showModal();updateClock()};
 updateClock();
}
function renderEnd(){
 const natural=s.ending.startsWith('여생');
 $('time-controls').hidden=true;
 $('game').innerHTML=`${renderCityMap()}<article class="event"><p class="tag">최종 기록 / ${s.year} · ${s.year-s.birthYear}세</p><h2>${escapeHTML(s.ending)}</h2><h3>${escapeHTML(s.epilogue||'남겨진 이야기')}</h3>${s.result&&s.resultOutcome==='failure'?renderResultPanel():''}<p>${natural?'오랜 삶 끝에 기록의 마지막 페이지를 덮었다.':s.hp===0?'마지막 행적은 짧은 신문 기사로 남았다.':s.san===0?'당신이 본 것을 설명할 언어는 더 이상 남아 있지 않았다.':'살아온 이야기를 한 권의 기록으로 남겼다.'} ${s.resolution==='sealed'?'봉인을 지키며 평범한 날들을 되찾았다.':s.resolution==='bargain'?'돌아온 사람의 웃음 뒤로, 거래의 대가를 기억했다.':s.resolution==='escaped'?'아캄에서 멀어진 곳에서 새로운 일상을 이어갔다.':s.resolution==='destroyed'?'일기는 사라졌지만 살아남은 사람들의 증언은 남았다.':Object.values(s.investigations).some(e=>e.resolution)?'당신이 만난 사건의 일부는 기록으로 남았고, 도시에는 다른 비밀도 남아 있다.':'당신이 직접 만나지 않은 도시의 비밀도 있다.'}</p><p>남긴 재산 $${s.wealth} · 남은 빚 $${s.debt||0}</p>${(s.afterwords||[]).map(t=>'<p>'+escapeHTML(t)+'</p>').join('')}<p>${s.bond>=5?'마지막까지 당신을 기억하는 사람들이 있었다.':'많은 기억을 혼자 간직했다.'}</p><button class="primary" id="again">새로운 생애를 시작한다 →</button></article><details><summary>전체 생애 기록</summary>${renderLog(true)}</details>`;
 $('again').onclick=start;
}
function archive(){
 show('archive');const a=read(ARCH,[]);
 $('archive').innerHTML=`<p class="tag">ARCHIVES / ${a.length}개의 생애</p><h2>잊히지 않은 사람들</h2>${a.length?a.map(x=>`<div class="archiveitem"><p class="tag">${escapeHTML(x.year)} / ${escapeHTML(x.job)} / ${escapeHTML(x.family||'이전 버전의 기록')}</p><h3>${escapeHTML(x.name)} — ${escapeHTML(x.title)}</h3><p>${escapeHTML(x.epilogue||'')} · ${escapeHTML(x.age??x.year-1900)}세</p><p>${x.wealth!==undefined?'남긴 재산 $'+escapeHTML(x.wealth):''}${x.debt?' · 남은 빚 $'+escapeHTML(x.debt):''}</p><p>${(x.traits||[]).map(escapeHTML).join(' · ')}</p>${(x.afterwords||[]).map(t=>'<p>'+escapeHTML(t)+'</p>').join('')}</div>`).join(''):'<p>아직 끝난 생애가 없습니다.</p>'}`;
}
function blocked(){return !s||s.ended||screen!=='game'||settings.paused||document.hidden||$('retire-dialog').open||waitingForDecision()}
function updateClock(){
 if(!s||s.ended)return;
 $('year-label').textContent=`${s.year}년 · ${s.year-s.birthYear}세`;
 $('year-progress').value=s.progress*100;
 $('clock-state').textContent=waitingForDecision()?'선택을 기다리는 중':settings.paused?'일시정지':$('retire-dialog').open?'창을 읽는 중':`${settings.speed}배속 · 한 해 ${BASE_YEAR_MS/1000/settings.speed}초`;
 $('pause-time').textContent=settings.paused?'시간 계속':'일시정지';
}
function tick(now){
 const delta=Math.min(250,Math.max(0,now-lastTick));lastTick=now;
 if(blocked())return;
 s.progress=Math.min(1,s.progress+delta*settings.speed/BASE_YEAR_MS);
 if(s.progress>=1){advance();return}updateClock();
 if(now-lastSave>2000){save();lastSave=now}
}
function setSpeed(value){if(!SPEEDS.includes(value))return;settings.speed=value;lastTick=performance.now();saveSettings();document.querySelectorAll('[data-speed]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.speed)===value)));updateClock()}
$('start').onclick=()=>start();$('records').onclick=()=>{if(s)save();archive()};
$('home').onclick=e=>{e.preventDefault();if(s)save();show('landing')};
$('resume').onclick=()=>{if(s){show('game');render()}};
$('pause-time').onclick=()=>{settings.paused=!settings.paused;lastTick=performance.now();saveSettings();save();updateClock()};
$('cancel-retire').onclick=()=>{$('retire-dialog').close();lastTick=performance.now()};
$('confirm-retire').onclick=()=>{$('retire-dialog').close();finish('은퇴 — 살아남은 증언자')};
$('retire-dialog').addEventListener('close',()=>{lastTick=performance.now();updateClock()});
 document.querySelectorAll('[data-speed]').forEach(b=>b.onclick=()=>setSpeed(Number(b.dataset.speed)));
document.addEventListener('visibilitychange',()=>{lastTick=performance.now();if(s)save()});
window.addEventListener('pagehide',()=>{if(s)save()});
s=normalise(read(KEY,null));if(s)save();$('resume').hidden=!s;setSpeed(settings.speed);
setInterval(()=>tick(performance.now()),100);
function canBuy(kind){const item=purchases[kind];return Boolean(s&&!s.ended&&!s.hospital&&screen==='game'&&item&&!s.purchased.includes(kind)&&s.wealth>=item.cost&&(!item.adult||s.phase==='adult')&&(!item.requiresCase||isInvestigation()&&!s.result&&s.supplies===0)&&(!(item.hp||item.san)||s.hp<s.maxHp||s.san<s.maxSan||item.bond))}
function buy(kind){
 if(!canBuy(kind))return false;const item=purchases[kind];s.wealth-=item.cost;s.purchased.push(kind);applyEffects(item);
 const delayNote=kind==='rest'?applyRecoveryTime('rest'):'';
 if(kind==='supplies')s.supplies=1;
 if(kind==='training'){s.career.xp++;s.career.reputation=clamp(s.career.reputation+2,0,99);if(s.career.xp>=3&&!s.careerForkDue&&s.career.rank<3)s.careerForkDue=s.year+1}
 s.careMessage=`${item.name}에 $${item.cost}을 사용했다. ${delayNote}`;
 addLog(s.careMessage);save();render();return true;
}
function renderPurchases(){return `<details class="spending"><summary>생활·직업·조사에 돈 쓰기${s.supplies?' · 조사 준비 완료':''}</summary><p>각 항목은 한 해에 한 번 이용합니다. 조사 준비는 다음 사건의 공포를 줄이지만 실패를 막지는 않습니다.</p><div class="care-buttons">${Object.entries(purchases).filter(([,p])=>!p.adult||s.phase==='adult').map(([id,p])=>`<button data-buy="${id}" ${canBuy(id)?'':'disabled'}>${p.name} · $${p.cost}<small>${p.description}${id==='rest'?' · '+recoveryWarning('rest'):''}${s.purchased.includes(id)?' · 올해 이용 완료':s.wealth<p.cost?' · 비용 부족':''}</small></button>`).join('')}</div></details>`}


installCrisisHooks();
installRevisionHooks();
installRelationshipHooks();
installProgressionHooks();
installConsequencesHooks();
installFinanceHooks();
installMotivationHooks();
installOpportunities();
installHistorian();
installWorldStories();
installEditorial();
installCaseConnections();
installCaseStakes();
installBalance();
installVocations();
installAtlas();
installFlowRepair();
installScenePacing();
installSceneLinks();
installFamilyStarts();
installLifeRecords();
installExpandedExperiences();
installUltimate();
installGenerations();
installIdentityChecks();
installMadnessDual();
installLegacyVault();
installHiddenProfessions();
installUniversityEra();
installAcuteChoices();
installAfterlifeVariety();
installCareerPositions();
installRuntimeDiagnostics();
if(s)save();
