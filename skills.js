'use strict';
// 제공된 설치본의 기능 범주를 참고한 자체 구현. 수치와 효과는 우리 게임의 규칙이다.
const SKILL_DEFINITIONS=[
{id:'격투',group:'행동',section:'전투',description:'붙잡기, 근접 저항과 위기에서 벗어나기'},
{id:'사격',group:'행동',section:'전투',description:'권총 등 원거리 무기를 이용한 대응'},
{id:'운동',group:'행동',section:'신체',description:'달리기, 등반, 수영과 구조'},
{id:'은밀행동',group:'행동',section:'신체',description:'미행, 잠입과 눈에 띄지 않는 이동'},
{id:'듣기',group:'조사',section:'감각',description:'소리에서 단서와 위험 알아차리기'},
{id:'관찰',group:'조사',section:'감각',description:'흔적과 작은 불일치 발견하기'},
{id:'설득',group:'설득',section:'교섭',description:'이유를 설명하고 협력을 얻기'},
{id:'심리학',group:'설득',section:'교섭',description:'감정과 숨겨진 의도 이해하기'},
{id:'박학',group:'조사',section:'지식',description:'기록, 언어, 역사와 자료 해석'},
{id:'오컬트',group:'조사',section:'지식',description:'민간 전승, 금서와 의식 이해'},
{id:'손재주',group:'행동',section:'기술',description:'기계, 장치, 수리와 섬세한 작업'},
{id:'의학',group:'조사',section:'기술',description:'진료 기록, 부상과 질병 이해'}
];
const SKILLS=SKILL_DEFINITIONS.map(s=>s.id);
const CAREER_SKILLS={
researcher:{관찰:5,박학:16,오컬트:8,의학:0},reporter:{관찰:8,듣기:7,설득:12,심리학:8,박학:3},
detective:{관찰:12,듣기:8,은밀행동:10,심리학:7,격투:5},doctor:{의학:24,박학:8,심리학:8,손재주:3},
dealer:{설득:12,심리학:6,오컬트:10,관찰:6,손재주:3},librarian:{박학:20,오컬트:9,관찰:7,듣기:2},
police:{격투:14,사격:18,운동:8,관찰:7,설득:5},mechanic:{손재주:24,운동:8,관찰:5,격투:3}
};
function careerSkillBonus(job,id){return CAREER_SKILLS[job]?.[id]||0}
function skillValue(id,raw=s){if(Number.isFinite(raw.skills?.[id]))return raw.skills[id];const def=SKILL_DEFINITIONS.find(d=>d.id===id);return raw.skills?.[def?.group]??25}
function createCareerSkills(job,prepared){
 const result={};for(const def of SKILL_DEFINITIONS){const i=['조사','설득','행동'].indexOf(def.group);result[def.id]=clamp(s.baseSkills[i]+s.growthBonus[i]+careerSkillBonus(job,def.id)+(s.skillTraining?.[def.id]||0)+(prepared?5:0),10,90)}return result;
}
function migrateSkills(raw){
 raw.skillTraining=raw.skillTraining||{};
 if([2,3].includes(raw.skillSchema)&&SKILLS.every(k=>Number.isFinite(raw.skills?.[k])))return raw;
 const previous=raw.skills||{};raw.skills={};
 for(const def of SKILL_DEFINITIONS){const i=['조사','설득','행동'].indexOf(def.group);const fallback=raw.phase==='adult'?(raw.baseSkills?.[i]||32)+(raw.growthBonus?.[i]||0)+careerSkillBonus(raw.jobId,def.id):(raw.baseSkills?.[i]||32);raw.skills[def.id]=clamp(Number.isFinite(previous[def.id])?previous[def.id]:Number.isFinite(previous[def.group])?previous[def.group]:fallback,10,95)}
 raw.skillSchema=2;return raw;
}
// 기존 세 계열은 성장기의 기초 소양으로 유지하고 실제 판정은 개별 기능을 사용한다.
function inferSkill(text,legacy){
 if(/의식|봉인|금서|찬송|구절|주석|일기.*해독|이름.*지우/.test(text))return '오컬트';
 if(/환자|치료|증상|검시|진료|실험.*기록|기억.*돌려/.test(text))return '의학';
 if(/배선|기계|안전장치|부품|수리|인장.*누르|잠금|도구/.test(text))return '손재주';
 if(/미행|순찰.*틈|아무도|잠입|창문|몰래|보지 못하도록/.test(text))return '은밀행동';
 if(/기억.*되짚|진정|말을.*바꾸|감정|의도|안심/.test(text))return '심리학';
 if(/노래.*듣|목소리|소리.*듣|두드림.*듣/.test(text))return '듣기';
 if(/원고|자료|기록|장부|계산|도면|문장|논문|일지|조항|서류|책/.test(text)&&legacy==='조사')return '박학';
 if(legacy==='설득')return '설득';if(legacy==='행동')return '운동';return '관찰';
}
for(const events of [caseEvents,ambientEvents,childhoodEvents,professionEvents,consequenceEvents,...newInvestigations.map(a=>a.chapters)])for(const event of events)for(const c of event.choices){if(c.skill){c.legacySkill=c.skill;c.skill=inferSkill(c.text,c.skill)}}
// 직업별 정기 업무는 전문 기능을 우선 사용한다.
const jobPrimary={researcher:'박학',reporter:'설득',detective:'관찰',doctor:'의학',dealer:'관찰',librarian:'박학',police:'심리학',mechanic:'손재주'};
for(const event of professionEvents)event.choices[0].skill=jobPrimary[event.job];
caseEvents[1].choices.push({text:'창고 안에서 들리는 희미한 대화와 발소리를 듣고 화물의 행방을 짚는다.',skill:'듣기',difficulty:1,evidence:'ledger',success:'화물을 대학으로 옮겼다는 대화를 들었다. 장부 사본에서 배송지를 확인했다.',failure:'대화는 들었지만 인기척을 들켜 급히 빠져나왔다. 흘린 장부 사본은 챙겼다.',failureSan:6,lead:caseEvents[1].lead});
caseEvents[1].choices.push({text:'자신을 막아서는 경비에게 붙잡히기 전에 몸을 빼고 장부를 가지고 나온다.',skill:'격투',difficulty:2,hp:-2,evidence:'ledger',success:'경비의 손에서 벗어나 장부와 배송지를 확보했다.',failure:'장부는 챙겼지만 몸싸움으로 다쳤다.',failureSan:6,lead:caseEvents[1].lead});
caseEvents[1].choices.push({text:'경찰에게 지급된 권총으로 다가오는 그림자를 저지하고 장부를 들고 물러난다.',requiresJob:'police',skill:'사격',difficulty:2,hp:-1,evidence:'ledger',success:'위협을 저지하고 장부 사본을 확보했다.',failure:'위협을 멈추지 못해 다쳤지만 장부는 챙겨 도망쳤다.',failureSan:6,lead:caseEvents[1].lead});
caseEvents[3].choices.push({text:'관리인이 말끝을 흐리는 이유를 살피고 두려움을 이야기하게 돕는다.',skill:'심리학',difficulty:2,evidence:'star',success:'관리인은 숨겼던 관측 일지를 내주었다.',failure:'기록은 받았지만 관리인의 공포가 당신에게도 남았다.',failureSan:8,lead:caseEvents[3].lead});
newInvestigations.find(a=>a.id==='patient').chapters[0].choices[0].skill='의학';
newInvestigations.find(a=>a.id==='factory').chapters[1].choices[0].skill='손재주';
newInvestigations.find(a=>a.id==='press').chapters[1].choices[0].skill='은밀행동';
function renderSkillProfile(){return `<div class="skill-profile">${['전투','신체','감각','교섭','지식','기술'].map(section=>`<div><strong>${section}</strong>${SKILL_DEFINITIONS.filter(d=>d.section===section).map(d=>`<p title="${escapeHTML(d.description)}">${d.id}<span>${effectiveSkill(d.id)}</span></p>`).join('')}</div>`).join('')}</div>`}
function applyFocusedTraining(choice){
 if(!choice.bonus)return;
 const highest=Math.max(...choice.bonus);if(highest<=0)return;const group=['조사','설득','행동'][choice.bonus.indexOf(highest)];
 const skill=choice.focusSkill||inferSkill(choice.text,group),gain=Math.min(4,Math.max(1,Math.ceil(highest/3)));
 s.skillTraining[skill]=(s.skillTraining[skill]||0)+gain;
 if(s.phase==='adult')s.skills[skill]=Math.min(95,skillValue(skill)+gain);else syncGrowthSkills(s);
}
// 부모의 일터에서 배운 경험은 그 전문 기능으로 남긴다.
for(const e of childhoodEvents){if(['parent_physician','parent_nurse','parent_pharmacist'].includes(e.id))e.choices[0].focusSkill='의학';if(e.id==='parent_repairer')e.choices[0].focusSkill='손재주';if(['parent_professor','parent_libraryworker','parent_universityclerk','parent_bookkeeper'].includes(e.id))e.choices[0].focusSkill='박학'}

