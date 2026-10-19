'use strict';
// 광기는 남아 있는 제약과, 안정돼 있을 때만 사용할 수 있는 편향된 집중을 함께 갖는다.
const MADNESS_DUAL={
 watched:{skills:{심리학:-10,설득:-5},benefit:{관찰:6,듣기:4},context:'inquiry',why:'등 뒤를 의식하며 작은 흔적과 소리에 집요하게 주의를 기울인다.'},
 blank:{skills:{박학:-10,설득:-5},benefit:{은밀행동:6},context:'field',why:'말로 정리하지 못한 상황에서 주위의 움직임을 조용히 따라간다.'},
 tremor:{skills:{손재주:-10,사격:-10},benefit:{관찰:4,듣기:6},context:'inquiry',why:'떨리는 손을 멈추고 도구 대신 눈과 귀로 징후를 살핀다.'},
 threshold:{skills:{운동:-10},benefit:{관찰:6,박학:4},context:'inquiry',why:'선뜻 문턱을 넘지 못해 들어가기 전 흔적과 기록을 거듭 확인한다.'},
 sleepless:{skills:{운동:-8,설득:-5},benefit:{듣기:7},context:'inquiry',why:'오래 깨어 있던 밤의 소리와 지금 들리는 소리를 대조한다.'},
 counting:{skills:{손재주:-8,설득:-5},benefit:{박학:8,관찰:4},context:'inquiry',why:'같은 내용을 되짚으며 수와 순서가 어긋난 곳을 찾는다.'},
 flight:{skills:{격투:-10,설득:-5},benefit:{운동:8,은밀행동:6},context:'crisis',why:'달아나야 한다는 감각을 억누르는 대신 탈출 동선에 집중한다.'},
 rage:{skills:{심리학:-12,은밀행동:-8},benefit:{격투:8,운동:4},context:'crisis',why:'치밀어 오르는 분노를 눈앞의 방해물을 밀어내는 데 쏟는다.'},
 ritual:{skills:{설득:-8,손재주:-5},benefit:{오컬트:8},context:'inquiry',why:'반복하던 동작과 현장의 의식에 어떤 공통점이 있는지 대조한다.'},
 silence:{skills:{설득:-15},benefit:{은밀행동:8,듣기:4},context:'inquiry',why:'말을 줄이고 발소리와 상대의 움직임을 따라간다.'},
 guilt:{skills:{설득:-8},benefit:{의학:8},context:'inquiry',why:'다시는 놓치고 싶지 않아 부상과 진료 기록에 주의를 쏟는다.'},
 memory:{skills:{박학:-12},benefit:{운동:6,격투:4},context:'crisis',why:'설명되지 않는 기억 대신 몸으로 익힌 대응 순서를 따른다.'},
 voices:{skills:{관찰:-10,심리학:-5},benefit:{오컬트:8},context:'inquiry',why:'겹쳐 들리는 소리를 사실로 단정하지 않고 전승의 표현과 대조한다.'},
 crowd:{skills:{설득:-12,격투:-5},benefit:{은밀행동:8},context:'inquiry',why:'사람들의 시선을 피하며 눈에 띄지 않는 동선을 찾는다.'},
 walls:{skills:{손재주:-8,박학:-5},benefit:{운동:8,관찰:4},context:'crisis',why:'다가오는 벽에서 시선을 돌려 열린 공간과 출구를 찾는다.'},
 dark:{skills:{듣기:-8,운동:-5},benefit:{오컬트:8},context:'inquiry',why:'어둠에서 떠오르는 형상을 전승에 남은 묘사와 조심스럽게 대조한다.'},
 suspicion:{skills:{설득:-10,심리학:-5},benefit:{관찰:8},context:'inquiry',why:'사람의 말보다 실제 남아 있는 흔적을 우선해 확인한다.'},
 numb:{skills:{심리학:-10,설득:-5},benefit:{},guard:1,context:'inquiry',why:'감정이 멀어진 동안 눈앞의 충격을 차갑게 받아들인다.'},
 impulse:{skills:{관찰:-8,사격:-8},benefit:{격투:8,운동:4},context:'crisis',why:'성급한 움직임을 먼 목표가 아닌 눈앞의 구조와 저지에 집중한다.'},
 echo:{skills:{박학:-8,듣기:-5},benefit:{오컬트:10},stress:1,context:'inquiry',why:'머릿속에 남은 의식의 박자를 기록과 대조한다. 그 울림은 공포도 더한다.'}
};
let madnessFocusedSkill=null;
const MADNESS_CONTEXT_NAMES={inquiry:'조사 중',field:'조사 현장·재앙 대응 중',crisis:'재앙 대응 중'};
function initialiseMadnessDual(raw){if(!raw.madnessDualSchema){for(const m of raw.madness||[])m.acute=['counting','flight','rage','ritual','silence'].includes(m.id)&&m.acute!==false;raw.madnessDualSchema=1}raw.madnessRelapses||=[];return raw}
function madnessContextActive(def,raw=s){const kind=raw.pending?.kind,inquiry=['case','investigation'].includes(kind),crisis=kind==='catastrophe';return def.context==='inquiry'?inquiry:def.context==='crisis'?crisis:crisis||inquiry&&(raw.pending.index||0)>=1}
function madnessBenefit(id,raw=s){return Math.min(10,(raw.madness||[]).filter(m=>m.acute===false).reduce((n,m)=>{const d=MADNESS_DUAL[m.id];return n+(d&&madnessContextActive(d,raw)?d.benefit[id]||0:0)},0))}
function madnessPenalty(id,raw=s){return Math.max(-25,(raw.madness||[]).reduce((n,m)=>n+(MADNESS_DUAL[m.id]?.skills[id]||0),0))}
function madnessDualText(m){const d=MADNESS_DUAL[m.id],status=m.acute===false?'안정됨':'급성 증상',negative=Object.entries(d.skills).map(([id,n])=>id+' '+n).join(' · '),positive=Object.entries(d.benefit).map(([id,n])=>id+' +'+n).join(' · ')+(d.guard?'평소 공포 손실 −1':'');return '<p><strong>'+escapeHTML(madnessPool.find(d=>d.id===m.id)?.name||m.id)+'</strong> · '+status+'</p><p class="madness-cost">제약 · '+escapeHTML(negative+(d.stress?' · 추가 공포 +'+d.stress:''))+'</p><p class="madness-benefit">안정 시 · '+MADNESS_CONTEXT_NAMES[d.context]+' '+escapeHTML(positive)+(m.acute===false&&madnessContextActive(d)?' · 적용 중':' · 현재 미적용')+'</p>'}
function installMadnessDual(){
 for(const m of madnessPool){const d=MADNESS_DUAL[m.id];Object.assign(m,{skills:d.skills,stress:d.stress||0,exclusive:true})}
 const init=initialiseRevision;initialiseRevision=r=>initialiseMadnessDual(init(r));if(s)initialiseMadnessDual(s);
 const startBase=start;start=function(){startBase();initialiseMadnessDual(s);save()};
 effectiveSkill=function(id,raw=s){const value=clamp(skillValue(id,raw)+activeTraitDefinitions(raw).reduce((n,t)=>n+(t.skills?.[id]||0),0)+madnessPenalty(id,raw)+Math.min(10,madnessBenefit(id,raw)+(raw===s&&madnessFocusedSkill===id?5:0)),1,95),aftermath=(raw.aftereffects||[]).filter(e=>e.remaining>0).reduce((n,e)=>n+(AFTERMATH[e.arc]?.skills[id]||0),0);return Math.min(95,Math.max(1,value+aftermath)+boonSkill(id,raw))};
 exclusiveMadness=function(){return activeMadness().find(d=>s.madness.find(m=>m.id===d.id)?.acute!==false)};
 madnessSkill=id=>madnessPenalty(id)+madnessBenefit(id);
 const sum=traitSum;traitSum=function(key,raw=s){return sum(key,raw)+(key==='stressGuard'?Math.min(1,(raw.madness||[]).filter(m=>m.acute===false).reduce((n,m)=>{const d=MADNESS_DUAL[m.id];return n+(d&&madnessContextActive(d,raw)?d.guard||0:0)},0)):0)};
 addMadness=function(loss){if(!s||loss<5||s.san<=0)return;initialiseMadnessDual(s);const calm=s.madness.filter(m=>m.acute===false);if(calm.length){const m=pick(calm);m.acute=true;m.lastRelapse=s.year;s.madnessRelapses.push({id:m.id,year:s.year,loss});const msg='**광기 재발 — '+madnessPool.find(d=>d.id===m.id).name+'**. 한 번에 이성 '+loss+'을 잃자 가라앉았던 증상이 다시 치솟았다. 집중에서 얻던 이점도 급성 증상이 가라앉을 때까지 멎는다.';s.result=(s.result||'')+'\n\n'+msg;addLog(msg,false,'failure');return}if(s.madness.length>=3||Math.random()>=.35)return;const pool=madnessPool.filter(d=>!s.madness.some(m=>m.id===d.id));if(!pool.length)return;const d=pick(pool);s.madness.push({id:d.id,year:s.year,acute:true});const msg='**광기 발현 — '+d.name+'**. 충격 뒤에 생각과 감각이 한쪽으로 쏠렸다. 안정되면 그 집중을 다른 대응에 쓸 수도 있지만, 제약은 치료 전까지 남는다.';s.result=(s.result||'')+'\n\n'+msg;addLog(msg,false,'failure')};
 const current=currentEvent;currentEvent=function(){const e=current();if(!e||s.result||exclusiveMadness()||!['case','investigation','catastrophe'].includes(s.pending?.kind)||e.choices.some(c=>c.madnessRoute))return e;for(const m of s.madness){const d=MADNESS_DUAL[m.id];if(m.acute!==false||!d||!madnessContextActive(d))continue;const c=e.choices.find(c=>c.skill&&d.benefit[c.skill]&&madnessBenefit(c.skill)<10&&!c.madnessAction&&!c.caseExit&&!c.defer&&!c.professionalRecovery&&!c.vocation);if(c)return {...e,choices:[...e.choices,{...c,text:d.why+' '+c.text+' 생각을 끝까지 몰아붙여 더 정확히 시도한다. 끝나면 마음이 소진될 수 있다.',madnessRoute:m.id}]}}return e};
 const chooseBase=choose;choose=function(i){const c=currentEvent()?.choices[i],wasAcute=Boolean(exclusiveMadness());let out;try{if(c?.madnessRoute&&choiceAvailable(c)&&!s.result&&!s.ended)madnessFocusedSkill=c.skill;out=chooseBase(i)}finally{madnessFocusedSkill=null}if(c?.madnessRoute)render();if(wasAcute&&c?.madnessAction&&!exclusiveMadness()){s.careMessage='안정 행동으로 통제력을 되찾았다. **조건부 이점을 다시 사용할 수 있지만 제약은 남는다.** 한 번에 이성을 5 이상 잃으면 급성 증상이 다시 나타날 수 있다.';addLog('급성 증상을 가라앉히고 현재의 선택으로 돌아왔다.',true);save();render()}return out};
 const harm=contextualHarm;contextualHarm=function(e,c,ok){const text=harm(e,c,ok);if(!c.madnessRoute)return text;const loss=Math.min(s.san,rollDice('1d3'));applyEffects({san:-loss});s.lastImpact.focus={formula:'1d3',loss};return text+' **광기의 집중**을 억지로 이어 간 뒤 낯선 감각과 현실을 다시 구분하는 데 지쳤다. 이성 손실 1d3 → '+loss+'.'};
 // 급성 증상은 위험한 일과 조사를 가로막지만, 응급 재앙 대응을 없애지는 않는다.
 renderMadnessSummary=function(){return '<section class="madness-summary"><h3>광기 후유증</h3>'+(s.madness.length?s.madness.filter(m=>MADNESS_DUAL[m.id]).map(madnessDualText).join('')+'<small>안정 행동: 급성 증상 완화 · 입원 치료: 제약과 이점 함께 제거</small>':'<p>현재 발현된 광기 없음</p>')+'</section>'};
 const panel=crisisEventPanel;crisisEventPanel=function(){const html=panel();return html.replace(/<strong>광기 후유증<\/strong>[\s\S]*?(?=<button id="admit-hospital")/,()=>'<strong>광기 후유증</strong>'+s.madness.filter(m=>MADNESS_DUAL[m.id]).map(madnessDualText).join(''))};
 const hospital=hospitalYearEnd;hospitalYearEnd=function(){const treated=s.hospital&&s.madness.length;hospital();if(treated&&!s.hospital&&!s.madness.length){awardExperience('recovered_self','입원 치료를 마치고 광기의 제약과 편향된 집중을 함께 내려놓으며, 현실의 감각을 되찾는 법을 배웠다.');addLog('치료로 광기의 제약과 조건부 이점이 함께 사라졌다.',true)}};
}
