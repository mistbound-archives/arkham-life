'use strict';
const ADVANCED_EXPERIENCES=[
{id:'attentive',name:'소란 속의 한 목소리',tier:'숙련',description:'듣기 +6 · 관찰 +2',skills:{듣기:6,관찰:2}},
{id:'unseen',name:'돌아올 길을 남기는 잠입',tier:'숙련',description:'은밀행동 +6 · 운동 +2',skills:{은밀행동:6,운동:2}},
{id:'healer',name:'현장에서 익힌 처치',tier:'숙련',description:'의학 +6 · 심리학 +2',skills:{의학:6,심리학:2}},
{id:'marksman',name:'떨림을 읽는 사수',tier:'숙련',description:'사격 +7 · 관찰 +2',skills:{사격:7,관찰:2}},
{id:'protector',name:'사람을 지키는 몸싸움',tier:'숙련',description:'격투 +6 · 운동 +3',skills:{격투:6,운동:3}},
{id:'runner',name:'위기 속의 발걸음',tier:'숙련',description:'운동 +7 · 은밀행동 +2',skills:{운동:7,은밀행동:2}},
{id:'narrow_path',name:'불가능해 보이던 틈',tier:'위업',description:'관찰 +8 · 은밀행동 +5',skills:{관찰:8,은밀행동:5}},
{id:'ritualist',name:'금기의 문장을 고친 자',tier:'위업',description:'오컬트 +10 · 박학 +5',skills:{오컬트:10,박학:5}},
{id:'miracle_care',name:'마지막 호흡을 붙든 손',tier:'위업',description:'의학 +10 · 심리학 +5',skills:{의학:10,심리학:5}},
{id:'last_line',name:'무너지지 않은 마지막 줄',tier:'위업',description:'격투 +9 · 운동 +5 · 실패 부상 1 완화',skills:{격투:9,운동:5},injuryGuard:1},
{id:'precision',name:'한 발로 연 퇴로',tier:'위업',description:'사격 +10 · 관찰 +5',skills:{사격:10,관찰:5}},
{id:'master_hand',name:'멎어야 할 것을 아는 손',tier:'위업',description:'손재주 +10 · 관찰 +5',skills:{손재주:10,관찰:5}},
{id:'abyss_return',name:'심연에서 돌아온 증인',tier:'위업',description:'기본 공포 2 · 실패 부상 1 완화',stressGuard:2,injuryGuard:1},
{id:'ward_keeper',name:'여러 문을 닫아 본 사람',tier:'위업',description:'박학 +6 · 설득 +6 · 기본 공포 1 완화',skills:{박학:6,설득:6},stressGuard:1},
{id:'recovered_self',name:'상처와 함께 사는 법',tier:'숙련',description:'심리학 +6 · 기본 공포 1 완화',skills:{심리학:6},stressGuard:1},
{id:'network',name:'혼자 돌아가지 않는 길',tier:'숙련',description:'설득 +7 · 심리학 +4',skills:{설득:7,심리학:4}},
{id:'district_steward',name:'동네가 기억하는 손길',tier:'숙련',description:'연 수입 +5 · 생활비 4 절약',income:5,expenses:-4},
{id:'debt_survivor',name:'빚의 겨울을 건넌 사람',tier:'위업',description:'생활비 6 절약 · 설득 +5',expenses:-6,skills:{설득:5}},
{id:'historical_master',name:'살아 있는 전승의 해석자',tier:'위업',description:'오컬트 +9 · 박학 +5',skills:{오컬트:9,박학:5}},
{id:'independent_master',name:'자기 일터를 지킨 사람',tier:'숙련',description:'연 수입 +8 · 설득 +4',income:8,skills:{설득:4}},
{id:'last_guardian',name:'마지막 세기에 남긴 봉인',tier:'위업',description:'오컬트 +12 · 기본 공포 3 완화',skills:{오컬트:12},stressGuard:3}
];
experienceTraits.push(...ADVANCED_EXPERIENCES);for(const t of experienceTraits)t.tier||='경험';
function initialiseExperienceExpansion(raw){raw.experienceNotices||=[];raw.activeExperiences=[...new Set(raw.activeExperiences||[])].filter(id=>raw.experiences?.some(e=>e.id===id)&&experienceTraits.some(t=>t.id===id)).slice(0,5);raw.experienceEvidence||={debtPeak:raw.debt||0};raw.experienceEvidence.debtPeak=Math.max(raw.experienceEvidence.debtPeak||0,raw.debt||0);return raw}
function renderExperienceGains(){const notices=s.experienceNotices||[];return notices.length?'<section class="experience-gains" aria-live="polite"><strong>새로운 경험 특성을 얻었습니다</strong>'+notices.map(n=>{const t=experienceTraits.find(t=>t.id===n.id);return '<div class="experience-gain '+(t.tier==='위업'?'rare':'')+'"><small>'+escapeHTML(t.tier)+'</small><h4>'+escapeHTML(t.name)+'</h4><p>'+escapeHTML(n.reason)+'</p><p><b>'+escapeHTML(t.description)+'</b></p><p>'+ (s.ended?'생애의 마지막 기록에 남았습니다.':activeExperience(t.id)?'현재 활성화되어 있습니다.':'보관 중입니다. 경험 특성에서 활성화할 수 있습니다.')+'</p></div>'}).join('')+'<button id="ack-experience" class="secondary">확인</button></section>':''}
function updateExpandedExperience(){if(!s||s.hp<=0||s.san<=0)return;initialiseExperienceExpansion(s);const h=s.history||[],success=(id,hard=false)=>h.filter(e=>e.success&&e.skill===id&&(!hard||(e.roll?.difficulty||1)>=2)).length;
 for(const [skill,id] of [['듣기','attentive'],['은밀행동','unseen'],['의학','healer'],['사격','marksman'],['격투','protector'],['운동','runner']])if(success(skill)>=3)awardExperience(id,skill+' 판정을 세 차례 이상 성공하며 실제 대응을 익혔다.');
 for(const [skill,id] of [['오컬트','ritualist'],['의학','miracle_care'],['격투','last_line'],['사격','precision'],['손재주','master_hand']])if(success(skill,true)>=2)awardExperience(id,'어려운 '+skill+' 판정을 두 차례 이상 성공해 위험한 조건을 극복했다.');
 if(h.filter(e=>e.success&&(e.roll?.difficulty||1)>=2).length>=3)awardExperience('narrow_path','어려운 판정을 세 차례 이상 성공해 불리한 상황을 헤쳐 나왔다.');
 if(h.some(e=>e.success&&(e.event||'').startsWith('critical_')))awardExperience('abyss_return','재앙 직후의 생존 대응을 성공하고 살아남았다.');
 const full=Object.keys(CITY_SITES).filter(id=>{const r=completedArcResult(id);return r&&['restored','public'].includes(lifeOutcomeKind(id,r))}).length;
 if(full>=3)awardExperience('ward_keeper','세 사건 이상을 근본 해결해 위험의 연결을 끊었다.');
 if(s.aftereffects?.some(e=>e.remaining===0))awardExperience('recovered_self','재앙 뒤의 장기 후유증을 감당하는 시간을 끝까지 보냈다.');
 const worlds=Object.values(s.worldStories||{});if(worlds.filter(w=>['help','listen','work'].includes(w.relationship)).length>=3)awardExperience('network','서로 다른 세 사건의 당사자와 연락할 인연을 이어 놓았다.');
 if(worlds.filter(w=>['rebuild','protect'].includes(w.regionChoice)).length>=2)awardExperience('district_steward','두 지역 이상에서 복구와 기록 보호를 맡았다.');
 if(s.experienceEvidence.debtPeak>=100&&s.debt===0)awardExperience('debt_survivor','백 달러 이상의 빚을 겪고 생활 빚을 모두 정리했다.');
 if(s.jobId==='historian'&&s.career.rank>=2)awardExperience('historical_master','역사 연구의 책임 있는 자리까지 경험을 쌓았다.');
 if(s.career.mode==='independent'&&s.career.rank>=1)awardExperience('independent_master','자기 업장에서 책임과 성과를 함께 쌓았다.');
}
function installExpandedExperiences(){
 const init=initialiseRevision;initialiseRevision=raw=>initialiseExperienceExpansion(init(raw));if(s)initialiseExperienceExpansion(s);
 const award=awardExperience;awardExperience=function(id,reason){const had=s.experiences.some(e=>e.id===id);award(id,reason);if(!had){initialiseExperienceExpansion(s);s.experienceNotices.push({id,reason,year:s.year});s.experiencePanelOpen=true}};
 const update=updateExperienceTraits;updateExperienceTraits=function(){update();updateExpandedExperience()};
 const after=afterCrisisChoice;afterCrisisChoice=function(...args){after(...args);updateExpandedExperience()};
 const settle=settleYear;settleYear=function(){initialiseExperienceExpansion(s);s.experienceEvidence.debtPeak=Math.max(s.experienceEvidence.debtPeak,s.debt||0);settle();s.experienceEvidence.debtPeak=Math.max(s.experienceEvidence.debtPeak,s.debt||0);updateExpandedExperience()};
 const renderBase=render;render=function(){const out=renderBase();const button=document.getElementById('ack-experience');if(button)button.onclick=()=>{s.experienceNotices=[];save();render()};return out};
}
