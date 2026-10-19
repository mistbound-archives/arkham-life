'use strict';
// 출생 성향과 경험은 이력 문구와 별도로 관리한다. 공식 펄프 재능의 복제가 아닌 자체 설계다.
const exceptionalTraits=[
{id:'iron',name:'강철 같은 침착함',description:'사건의 기본 공포 손실 3 완화',stressGuard:3},
{id:'insight',name:'기이한 직감',description:'오컬트·듣기 +8',skills:{오컬트:8,듣기:8}},
{id:'memory',name:'한 번 본 것을 기억하는 사람',description:'박학 +12, 관찰 +6',skills:{박학:12,관찰:6}},
{id:'leader',name:'타고난 구심점',description:'설득 +10, 심리학 +5',skills:{설득:10,심리학:5}},
{id:'vitality',name:'질긴 생명력',description:'출생 건강 최대치 +6, 신체 판정 실패 부상 1 완화',hpMax:6,injuryGuard:1},
{id:'prodigy',name:'비범한 손끝',description:'손재주 +10, 의학 +5',skills:{손재주:10,의학:5}},
{id:'swift',name:'그림자 같은 몸놀림',description:'운동 +10, 은밀행동 +6',skills:{운동:10,은밀행동:6}},
{id:'fighter',name:'위기에서 빛나는 투지',description:'격투 +10, 사격 +8',skills:{격투:10,사격:8}},
{id:'fortune',name:'기회를 읽는 재능',description:'출생 재산 +30, 직업 연 수입 +10',wealth:30,income:10},
{id:'lucky',name:'벼랑 끝의 행운',description:'한 해에 한 번, 실패 판정을 자동으로 한 번 더 시도',lucky:true}
];
const ordinaryTraits=[
{id:'reader',name:'책을 좋아하는 아이',description:'박학 +6',skills:{박학:6}},
{id:'observer',name:'작은 차이를 보는 아이',description:'관찰 +6',skills:{관찰:6}},
{id:'social',name:'먼저 말을 거는 아이',description:'설득 +6',skills:{설득:6}},
{id:'empath',name:'남의 마음을 살피는 아이',description:'심리학 +6',skills:{심리학:6}},
{id:'tinker',name:'손으로 배우는 아이',description:'손재주 +6',skills:{손재주:6}},
{id:'runner',name:'몸을 움직이는 아이',description:'운동 +6',skills:{운동:6}},
{id:'saver',name:'살림을 살피는 아이',description:'직업 연 수입 +4',income:4},
{id:'carer',name:'돌보기를 좋아하는 아이',description:'의학 +6',skills:{의학:6}},
{id:'quiet',name:'조용히 다가가는 아이',description:'은밀행동 +6',skills:{은밀행동:6}},
{id:'folklore',name:'옛이야기에 끌리는 아이',description:'오컬트 +6',skills:{오컬트:6}}
];
const drawbackTraits=[
{id:'frail',name:'쉽게 지치는 몸',description:'신체 판정 실패 부상 +2',injuryExtra:2,mitigatedBy:'survivor'},
{id:'anxious',name:'걱정을 놓지 못함',description:'사건의 기본 공포 +2',stressExtra:2,mitigatedBy:'composure'},
{id:'timid',name:'낯선 사람 앞의 주저함',description:'설득 −7',skills:{설득:-7},mitigatedBy:'trusted'},
{id:'hasty',name:'성급한 결론',description:'관찰 −6',skills:{관찰:-6},mitigatedBy:'careful'},
{id:'nightmares',name:'낯선 꿈의 침입',description:'오컬트 판정 실패 이성 손실 +2',occultExtra:2,mitigatedBy:'decipher'},
{id:'precarious',name:'불안정한 벌이',description:'직업 연 수입 −6',income:-6,mitigatedBy:'enterprise'},
{id:'distrust',name:'타인의 말을 의심함',description:'심리학 −6',skills:{심리학:-6},mitigatedBy:'colleague'},
{id:'clumsy',name:'섬세한 작업의 서투름',description:'손재주 −7',skills:{손재주:-7},mitigatedBy:'fieldcraft'},
{id:'sheltered',name:'낯선 길의 두려움',description:'은밀행동 −6',skills:{은밀행동:-6},mitigatedBy:'survivor'},
{id:'lavish',name:'돈이 새는 생활',description:'연간 생활비 +6',expenses:6,mitigatedBy:'budgeting'}
];
const experienceTraits=[
{id:'careful',name:'흔적을 놓치지 않는 사람',description:'관찰 +5, 박학 +3 · 성급한 결론 완화',skills:{관찰:5,박학:3}},
{id:'survivor',name:'위기를 견딘 몸',description:'실패 부상 1 완화 · 지치는 몸과 낯선 길의 두려움 완화',injuryGuard:1},
{id:'composure',name:'공포 뒤의 침착함',description:'기본 공포 1 완화 · 걱정을 놓지 못함 완화',stressGuard:1},
{id:'trusted',name:'비밀을 지키는 사람',description:'설득 +5 · 낯선 사람 앞의 주저함 완화',skills:{설득:5}},
{id:'decipher',name:'금서의 행간을 읽음',description:'오컬트 +5 · 낯선 꿈의 침입 완화',skills:{오컬트:5}},
{id:'colleague',name:'함께 일하는 법',description:'심리학 +4 · 타인의 말을 의심함 완화',skills:{심리학:4}},
{id:'fieldcraft',name:'현장에서 배운 손',description:'손재주 +6 · 섬세한 작업의 서투름 완화',skills:{손재주:6}},
{id:'enterprise',name:'자기 일의 책임',description:'직업 연 수입 +5 · 불안정한 벌이 완화',income:5},
{id:'budgeting',name:'살림을 지켜낸 경험',description:'연간 생활비 3 절약 · 돈이 새는 생활 완화',expenses:-3}
];
function birthDefinition(raw=s){const b=raw.birthTalent;return (b?.kind==='exceptional'?exceptionalTraits:ordinaryTraits).find(t=>t.id===b?.id)}
function drawbackDefinition(raw=s){return drawbackTraits.find(t=>t.id===raw.drawback)}
function activeExperience(id,raw=s){return raw.activeExperiences?.includes(id)&&raw.experiences?.some(e=>e.id===id)}
function drawbackActive(raw=s){const d=drawbackDefinition(raw);return Boolean(d&&!activeExperience(d.mitigatedBy,raw))}
function activeTraitDefinitions(raw=s){return [birthDefinition(raw),...(raw.activeExperiences||[]).filter(id=>activeExperience(id,raw)).map(id=>experienceTraits.find(t=>t.id===id)),...(drawbackActive(raw)?[drawbackDefinition(raw)]:[])].filter(Boolean)}
function initialisePersonalTraits(raw,newborn=false){
 raw.experiences=raw.experiences||[];raw.activeExperiences=raw.activeExperiences||[];raw.growthOffers=raw.growthOffers||{};raw.growthTaken=raw.growthTaken||[];raw.traitUsage=raw.traitUsage||{};raw.savingYears=raw.savingYears||0;
 if(!raw.birthTalent){if(newborn){const kind=Math.random()<0.05?'exceptional':'ordinary';raw.birthTalent={kind,id:pick(kind==='exceptional'?exceptionalTraits:ordinaryTraits).id};raw.drawback=pick(drawbackTraits).id;const b=birthDefinition(raw);if(b.hpMax){raw.maxHp=Math.min(99,raw.maxHp+b.hpMax);raw.hp=raw.maxHp}raw.wealth+=b.wealth||0}else{const hash=Array.from((raw.name||'')+(raw.family||'')).reduce((n,c)=>n+c.charCodeAt(0),0);raw.birthTalent={kind:'ordinary',id:ordinaryTraits[hash%10].id};raw.drawback=drawbackTraits[(hash+3)%10].id;raw.birthTraitMigrated=true}}
 if(!raw.drawback)raw.drawback=drawbackTraits[0].id;
 return raw;
}
function traitSum(key,raw=s){return activeTraitDefinitions(raw).reduce((n,t)=>n+(t[key]||0),0)}
function effectiveSkill(id,raw=s){return clamp(skillValue(id,raw)+activeTraitDefinitions(raw).reduce((n,t)=>n+(t.skills?.[id]||0),0),5,95)}
function awardExperience(id,reason){if(s.experiences.some(e=>e.id===id))return;const def=experienceTraits.find(t=>t.id===id);s.experiences.push({id,year:s.year,reason});if(s.activeExperiences.length<5)s.activeExperiences.push(id);addLog(`경험 특성 「${def.name}」을 얻었다. ${reason}`)}
function updateExperienceTraits(){
 if(s.hp<=0||s.san<=0)return;
 const h=s.history||[],count=(skills,ok)=>h.filter(e=>e.success===ok&&skills.includes(e.skill)).length;
 if(count(['관찰','박학'],true)>=3)awardExperience('careful','여러 사건에서 기록과 흔적을 끝까지 확인했다.');
 if(count(['격투','사격','운동','은밀행동','손재주'],false)>=3)awardExperience('survivor','신체적 실패를 겪고도 살아 돌아왔다.');
 if(h.filter(e=>e.investigation).length>=4)awardExperience('composure','공포 속의 조사를 여러 번 견뎠다.');
 if(s.flags.protectedConfidant||s.flags.sourceProtected||s.flags.researchHonest)awardExperience('trusted','다른 사람의 비밀과 기여를 지켰다.');
 if(s.evidence.filter(e=>['diary','chant','star'].includes(e)).length>=3||count(['오컬트'],true)>=3)awardExperience('decipher','위험한 기록의 의미를 이어 맞췄다.');
 if(s.bond>=6&&h.filter(e=>(e.event||'').startsWith('profession_')&&e.success).length>=2)awardExperience('colleague','인연을 지키며 동료와 일을 마쳤다.');
 if(s.investigations?.factory?.resolution==='rescued'||count(['손재주'],true)>=3)awardExperience('fieldcraft','현장의 장치를 이해하고 사람을 도왔다.');
 if(s.career.rank>=1||s.career.mode==='independent')awardExperience('enterprise','자기 일의 성과와 책임을 맡았다.');
 if(s.savingYears>=3)awardExperience('budgeting','세 해 이상 수입 안에서 살림을 지켰다.');
}
function toggleExperience(id){if(!s?.experiences.some(e=>e.id===id))return;if(s.activeExperiences.includes(id))s.activeExperiences=s.activeExperiences.filter(k=>k!==id);else if(s.activeExperiences.length<5)s.activeExperiences.push(id);else return;s.experiencePanelOpen=true;save();render()}
const growthChoicePool=[
{id:'books',text:'도서관에서 책을 빌리고 읽은 내용을 정리한다',minAge:6,bonus:[5,0,0],focusSkill:'박학',trait:'도서관에서 배운 습관'},
{id:'outside',text:'이웃 아이들과 바깥에서 뛰놀며 체력을 기른다',minAge:6,bonus:[0,0,4],hpMax:4,focusSkill:'운동',trait:'바깥에서 기른 체력'},
{id:'listen',text:'어른들의 이야기를 듣고 놓친 소리를 기억한다',minAge:6,bonus:[3,1,0],focusSkill:'듣기',trait:'귀 기울이는 습관'},
{id:'maps',text:'집 주변을 걸으며 길과 작은 흔적을 지도에 그린다',minAge:6,hpMax:2,bonus:[3,0,1],focusSkill:'관찰',trait:'동네를 그린 지도'},
{id:'puzzles',text:'낡은 장난감을 분해하고 다시 맞춰 본다',minAge:6,bonus:[1,0,3],focusSkill:'손재주',trait:'장난감을 고치던 손'},
{id:'swim',text:'강가에서 어른과 함께 안전하게 수영을 배운다',minAge:8,wealth:-6,bonus:[0,0,4],hpMax:5,focusSkill:'운동',trait:'물에서 익힌 침착함',condition:r=>r.hp>=r.maxHp*0.5},
{id:'routine',text:'식사와 잠을 규칙적으로 챙기는 생활을 익힌다',minAge:6,wealth:-8,bonus:[0,0,1],hpMax:7,trait:'규칙적인 식사와 잠'},
{id:'diary',text:'일기를 쓰며 두려움과 감정을 정리한다',minAge:8,bonus:[3,0,0],sanMax:5,focusSkill:'심리학',trait:'마음을 적는 일기'},
{id:'share',text:'믿을 사람에게 걱정을 이야기하고 함께 정리한다',minAge:6,bonus:[0,3,0],sanMax:6,bond:1,focusSkill:'심리학',trait:'걱정을 나누는 법'},
{id:'counsel',text:'가족과 상담을 찾아가 마음을 돌보는 습관을 배운다',minAge:8,wealth:-8,bonus:[1,1,0],sanMax:8,trait:'도움을 구하는 용기',condition:r=>r.bond>=2||r.family==='medical'},
{id:'shop',text:'가게에서 손님을 맞으며 거래와 장부를 배운다',minAge:8,bonus:[1,4,0],focusSkill:'설득',wealth:4,trait:'가게에서 배운 말솜씨',condition:r=>r.family==='merchant'||r.year-r.birthYear>=14},
{id:'repair',text:'수리공의 도제로 도구와 안전장치를 배운다',minAge:12,bonus:[2,0,5],focusSkill:'손재주',trait:'손으로 익힌 기술',routes:['수리공'],condition:r=>r.family==='worker'||r.parentJob==='repairer'||r.year-r.birthYear>=14},
{id:'debate',text:'친구들과 토론하며 상대를 설득하는 법을 배운다',minAge:10,bonus:[0,5,0],focusSkill:'설득',trait:'토론에서 배운 설명'},
{id:'scholarship',text:'장학금 시험을 준비하며 공부를 이어간다',minAge:12,bonus:[6,0,0],focusSkill:'박학',trait:'장학금으로 공부했다',routes:['대학 연구원','의사','사서']},
{id:'errands',text:'이웃의 심부름을 맡고 품삯을 모은다',minAge:10,bonus:[0,1,3],wealth:8,focusSkill:'운동',trait:'스스로 모은 첫 품삯'},
{id:'folklore',text:'지역의 전승과 기묘한 옛이야기를 기록한다',minAge:14,bonus:[5,0,0],san:-2,focusSkill:'오컬트',trait:'기이한 전승의 기록',condition:r=>r.family==='university'||r.family==='merchant'||birthDefinition(r)?.id==='folklore'||r.traits.includes('녹슨 열쇠')},
{id:'news',text:'신문사에서 심부름하며 취재 현장을 배운다',minAge:14,bonus:[2,4,0],focusSkill:'관찰',trait:'신문사 견습',routes:['신문 기자']},
{id:'detective',text:'탐정 사무소에서 기록 정리와 미행을 배운다',minAge:14,bonus:[2,0,4],focusSkill:'은밀행동',trait:'탐정 사무소 조수',routes:['사립탐정','경찰관']},
{id:'university',text:'대학 진학을 준비하고 공개 강의를 듣는다',minAge:14,wealth:-12,bonus:[6,0,0],focusSkill:'박학',trait:'대학 진학 준비',routes:['대학 연구원','의사','사서'],condition:r=>r.family==='university'||r.wealth>=30||r.traits.includes('장학금으로 공부했다')},
{id:'clinic',text:'진료소에서 물품 정리와 환자 돌봄을 돕는다',minAge:10,bonus:[3,2,0],focusSkill:'의학',trait:'돌봄의 첫 기억',routes:['의사'],condition:r=>r.family==='medical'||['physician','nurse','pharmacist'].includes(r.parentJob)||r.year-r.birthYear>=16}
];
function growthCandidates(raw=s){const age=raw.year-raw.birthYear;return growthChoicePool.filter(c=>age>=c.minAge&&(!c.condition||c.condition(raw))&&raw.wealth>=Math.max(0,-(c.wealth||0))&&!raw.growthTaken.includes(c.id))}
// 주제가 정해진 성장 장면은 같은 주제 안에서만 선택지를 추첨한다.
growthChoicePool.push(
{id:'grounding',text:'낯선 꿈에서 깨어나면 눈앞의 물건을 살피며 현실의 감각을 되찾는다',minAge:8,bonus:[2,0,0],sanMax:5,focusSkill:'관찰',trait:'현실을 되짚는 습관',growthTopic:'mind'},
{id:'quiet_walk',text:'걱정이 밀려올 때 익숙한 길을 걸으며 호흡을 고른다',minAge:8,bonus:[0,0,2],sanMax:4,focusSkill:'운동',trait:'마음을 가라앉히는 산책',growthTopic:'mind'},
{id:'small_tasks',text:'감당할 수 있는 작은 일부터 마치며 하루의 리듬을 되찾는다',minAge:8,bonus:[1,0,1],sanMax:5,focusSkill:'심리학',trait:'하루를 되찾는 작은 일',growthTopic:'mind'},
{id:'stretch',text:'아침마다 가볍게 몸을 풀고 조금씩 걷는 거리를 늘린다',minAge:6,bonus:[0,0,3],hpMax:5,focusSkill:'운동',trait:'아침에 몸을 푸는 습관',growthTopic:'body'},
{id:'rest_body',text:'몸이 지치는 때를 알아차리고 무리하기 전에 쉰다',minAge:6,bonus:[1,0,1],hpMax:5,focusSkill:'의학',trait:'몸의 신호를 살피는 법',growthTopic:'body'}
);
function growthMatchesStage(c,stage){if(stage.year===1908)return c.growthTopic==='body'||Boolean(c.hpMax);if(stage.year===1914)return c.growthTopic==='mind'||Boolean(c.sanMax);if(stage.year===1916)return Boolean(c.routes?.length);return true}
function growthOptions(stage){const key=String(stage.year),cached=s.growthOffers[key];
 const completed=s.pending?.kind==='growth'&&s.pending.index===growthStages.indexOf(stage)&&Boolean(s.result);
 const valid=cached?.length===3&&cached.every(id=>{const c=growthChoicePool.find(c=>c.id===id);return c&&growthMatchesStage(c,stage)});
 if(cached&&(completed||valid))return cached.map(id=>growthChoicePool.find(c=>c.id===id)).filter(Boolean);
 let pool=growthCandidates().filter(c=>growthMatchesStage(c,stage)),chosen=[];
 function take(c){if(c&&!chosen.includes(c)){chosen.push(c);pool=pool.filter(x=>x!==c)}}
 const free=pool.filter(c=>!c.wealth||c.wealth>=0);if(free.length)take(pick(free));
 while(chosen.length<3&&pool.length)take(pick(pool));
 // 후보가 부족해도 다른 주제를 섞지 않고 같은 주제의 무료 습관으로 채운다.
 if(chosen.length<3){const fallback=growthChoicePool.filter(c=>growthMatchesStage(c,stage)&&c.minAge<=s.year-s.birthYear&&!c.condition&&!c.wealth);for(const c of fallback){if(chosen.length>=3)break;take(c)}}
 s.growthOffers[key]=chosen.map(c=>c.id);save();return chosen;
}

function renderPersonalTraits(){const b=birthDefinition(),d=drawbackDefinition();return `<section class="personal-traits"><div><small>${s.birthTalent.kind==='exceptional'?'특출난 출생 특성 · 5%':'성장 성향'}</small><strong>${escapeHTML(b.name)}</strong><p>${escapeHTML(b.description)}</p></div><div><small>단점 ${drawbackActive()?'':'· 경험으로 완화 중'}</small><strong>${escapeHTML(d.name)}</strong><p>${escapeHTML(d.description)}<br>「${experienceTraits.find(e=>e.id===d.mitigatedBy).name}」 활성 시 완화</p></div></section><details class="experience-panel" ${s.experiencePanelOpen?'open':''}><summary>경험 특성 · 활성 ${s.activeExperiences.length}/5 · 획득 ${s.experiences.length}</summary><p>최대 다섯 개를 활성화합니다. 잠든 경험은 이점과 단점 완화 효과가 쉬며, 다시 활성화할 수 있습니다. 새 경험을 켜려면 먼저 한 자리를 비워 주세요.</p>${s.experiences.map(e=>{const t=experienceTraits.find(t=>t.id===e.id);return `<button data-experience="${e.id}" aria-pressed="${activeExperience(e.id)}" ${!activeExperience(e.id)&&s.activeExperiences.length>=5?'disabled':''}><em class="experience-tier">${escapeHTML(t.tier||"경험")}</em> ${t.name} · ${activeExperience(e.id)?'활성':'잠듦'}<small>${t.description}<br>${e.year} — ${escapeHTML(e.reason)}</small></button>`}).join('')||'<p>지금부터 실제로 겪는 사건이 경험으로 남습니다.</p>'}</details>`}
// 직업 고유 대응은 기능 이외에도 현재 건강·정신·신뢰·경험을 요구한다.
const specialistConditions={
researcher:r=>activeExperience('decipher',r)||r.career.rank>=1,reporter:r=>activeExperience('trusted',r)||r.career.reputation>=30,
detective:r=>activeExperience('careful',r)||effectiveSkill('관찰',r)>=60,doctor:r=>effectiveSkill('의학',r)>=55&&r.hp>=r.maxHp*0.5,
dealer:r=>activeExperience('decipher',r)||r.wealth>=150,librarian:r=>effectiveSkill('박학',r)>=60&&r.san>=r.maxSan*0.5,
police:r=>activeExperience('colleague',r)||r.career.reputation>=25,mechanic:r=>activeExperience('fieldcraft',r)||effectiveSkill('손재주',r)>=55&&r.hp>=r.maxHp*0.5
};
const specialistTexts={researcher:'쌓아 온 연구와 주석을 동료들에게 교차 검토받는다.',reporter:'신뢰를 쌓은 취재망을 통해 신원을 지키며 추가 증언을 얻는다.',detective:'현장 경험으로 작은 흔적들을 하나의 이동 경로로 잇는다.',doctor:'몸 상태를 유지하며 동료 의료진과 차분히 진료를 나눈다.',dealer:'수집가 인맥을 통해 물건의 출처와 위험을 함께 감정한다.',librarian:'정리된 서가와 목록에서 누락된 기록의 연결을 찾는다.',police:'신뢰하는 동료와 함께 현장을 통제하고 증언을 보호한다.',mechanic:'현장에서 배운 안전 절차로 기계를 먼저 격리하고 작업한다.'};
for(const e of professionEvents)e.choices.push({text:specialistTexts[e.job],availability:specialistConditions[e.job],skill:jobPrimary[e.job],difficulty:1,careerRep:5,careerXP:2,wealth:5,success:'직업의 경험과 현재의 준비를 살려 일을 마쳤다. 동료들의 신뢰가 쌓였다.',failure:'준비한 방식은 있었지만 결과는 충분하지 않았다. 동료와 보완점을 남겼다.'});


