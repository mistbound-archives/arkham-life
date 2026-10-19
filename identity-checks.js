'use strict';
const CHARACTER_NAMES={남성:['엘리엇','아서','헨리','줄리언','새뮤얼','테오도어'],여성:['마리온','에블린','클라라','에디스','비비언','앨리스']};
// 두 접근을 모두 설명하는 선택지만 후보를 명시한다. 선택 전에 판정 기능을 노출하지 않는다.
const DUAL_APPROACHES={
 nora:[[/일기의 과거 실종 날짜/,'박학','관찰'],[/순찰 공백.*창문/,'은밀행동','운동'],[/관측에서 정확한 밤/,'박학','관찰'],[/관리인을 진정|두려움을 이야기/,'심리학','설득'],[/모아 온 노래와 관측 기록/,'오컬트','박학'],[/서류 상자를 옮겨/,'운동','손재주']],
 factory:[[/교대 기록을 대조/,'박학','관찰'],[/배선과 안전장치/,'손재주','박학'],[/도면의 표시와 실제 안전장치/,'관찰','손재주'],[/정비대를 건너.*연결부를 닫/,'운동','손재주']],
 debt:[[/다른 서류와 필체|공증 도장의 겹침|업무 일지와 차용증/,'박학','관찰'],[/피해 가족들이 이름을 부를 시점/,'설득','심리학']],
 patient:[[/퇴원증과 진료 일지/,'의학','박학'],[/도장과 덧쓴 병동 번호/,'관찰','박학'],[/복잡한 실험 기록을 복원/,'의학','박학']],
 press:[[/보관된 원고와 발행 기록|교정쇄와 신문을 겹쳐/,'박학','관찰'],[/감시인을 붙잡아/,'격투','운동']],
 boarding:[[/방 번호와 봉투의 도면/,'관찰','박학'],[/세입자들과 .*기억을 맞추고/,'심리학','설득'],[/장부의 서명과 문틀 표식/,'오컬트','박학']],
 beacon:[[/호출의 간격을 듣고 신호 일지/,'듣기','박학'],[/예인선을 살피고 소금 자국/,'손재주','관찰'],[/호출을 듣고 역순의 마지막 섬광/,'듣기','관찰']],
 orchard:[[/진료 메모와 수확물의 변화/,'의학','관찰'],[/배수문과 수문을 직접 살펴/,'손재주','관찰'],[/차단 순서대로 수문을 닫고/,'손재주','운동']],
 portrait:[[/촬영 일지와 건판 번호|시험 노출과 수리 메모/,'박학','관찰'],[/가림막과 카메라 잠금 장치를 살펴/,'손재주','관찰']],
 burial:[[/흙의 이동과 작업표/,'관찰','박학'],[/관리 수첩과 장례 기록/,'오컬트','박학'],[/난간과 지지대를 살펴|지지대를 무너뜨려 통로를 매몰/,'손재주','운동']]
};
let dualCheckCandidates=null;
function bestApproach(skills){return skills.reduce((best,id)=>effectiveSkill(id)>effectiveSkill(best)?id:best,skills[0])}
function annotateApproach(c,arc){let options=c.skillOptions;if(!options&&c.worldAction==='remember')options=['박학','심리학'];if(!options&&c.worldAction==='protect')options=['박학','설득'];if(!options){const rule=DUAL_APPROACHES[arc]?.find(([re])=>re.test(c.text));if(rule)options=rule.slice(1)}if(!options)return c;options=[...new Set(options)].filter(id=>SKILLS.includes(id)).slice(0,2);if(options.length!==2)return c;return {...c,skillOptions:options,skill:bestApproach(options)}}
function installIdentityChecks(){
 const startBase=start;start=function(){const supplied=String($('character-name')?.value||'').replace(/[\u0000-\u001f\u007f]/g,'').replace(/\s+/g,' ').trim().slice(0,24),selected=$('character-gender')?.value;startBase();const gender=Object.hasOwn(CHARACTER_NAMES,selected)?selected:pick(['남성','여성']);s.gender=gender;s.name=supplied||pick(CHARACTER_NAMES[gender]);addLog('기록의 주인 — '+s.name+' · '+s.gender+'.',true);save();render()};
 const current=currentEvent;currentEvent=function(){const e=current();if(!e)return e;const arc=['case','investigation'].includes(s.pending?.kind)?currentArcId():null;return {...e,choices:e.choices.map(c=>annotateApproach(c,arc))}};
 const check=skillCheck;skillCheck=function(id,difficulty=1,penalty=0){const options=dualCheckCandidates?.includes(id)?dualCheckCandidates:null,other=options?.find(k=>k!==id),supportTarget=other?effectiveSkill(other):null;const ok=check(id,difficulty,penalty);if(options&&s.lastRoll){const r=s.lastRoll;r.skillOptions=[...options];if(other){const roll=randomInt(1,100),gain=roll>supportTarget&&skillValue(other)<95?1:0;if(gain){s.skills[other]=Math.min(95,skillValue(other)+gain);s.skillOrigins[other]=[...new Set([...(s.skillOrigins[other]||[]),'복합 행동의 보조 경험'])].slice(-5)}r.supportGrowth={skill:other,roll,target:supportTarget,gain};}const last=s.actionRolls.at(-1);if(last){last.skillOptions=r.skillOptions;last.supportGrowth=r.supportGrowth}}return ok};
 const chooseBase=choose;choose=function(i){const c=currentEvent()?.choices[i];try{dualCheckCandidates=c?.skillOptions||null;return chooseBase(i)}finally{dualCheckCandidates=null}};
 const description=rollDescription;rollDescription=function(){const r=s.lastRoll;return description()+(r?.skillOptions?' · '+r.skillOptions.join(' / ')+' 중 '+r.skill+' 사용':'')};
 const result=renderResultPanel;renderResultPanel=function(){const support=(s.actionRolls||[]).filter(r=>r.supportGrowth);return result()+(support.length?'<details class="growth-rolls support-growth" open><summary>함께 익힌 보조 경험</summary>'+support.map(r=>{const g=r.supportGrowth;return '<p><strong>'+escapeHTML(g.skill)+'</strong> · 성장 1d100 '+g.roll+' / '+g.target+' · '+(g.gain?'실패 → 기능 +1':'성장 없음')+'</p>'}).join('')+'</details>':'')};
 const profile=renderProfile;renderProfile=function(){return profile().replace('<p>',()=>'<p>성별: '+escapeHTML(s.gender||'기록 없음')+'</p><p>')};
 const build=buildLifeRecord;buildLifeRecord=function(ending){const r=build(ending);r.character={name:s.name,gender:s.gender||null};if(s.gender)r.sections.unshift({title:'기록의 주인',text:s.name+' · '+s.gender+'.'});return r};
 const followup=lifeFollowupEvent;lifeFollowupEvent=function(id,stage){const e=followup(id,stage);return {...e,choices:e.choices.map(c=>c.worldAction==='remember'?{...c,success:c.success+' 동의한 기록을 함께 보관하고 소식을 주고받을 연락처도 남겼다.'}:c.worldAction==='protect'?{...c,success:c.success+' 기록을 받는 창구와 사생활을 보호할 책임을 함께 정했다.'}:c)}};
}
