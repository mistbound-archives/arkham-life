'use strict';
// 첫 사건은 동일한 사람, 장소, 물건을 끝까지 추적한다.
const storyChapters=[
{title:'숙부의 마지막 부탁',goal:'노라에게 닥칠 일이 실제인지 확인하고 경고하기',text:'숙부 에이머스가 세상을 떠났다. 당신에게 남긴 편지에는 노라의 이름이 적혀 있다. “내가 지우지 못한 이름이다. 다음 봄, 강변 7번 창고에서 노라가 사라질 것이다.”\n\n노라는 그 창고에서 화물 서류를 정리하는 일을 막 시작했다. 유품 상자에는 미래 날짜의 일기와 작은 유리 인장이 들어 있다. 숙부는 인장을 팔지 말라고 덧붙였다. 당신은 이것이 병든 사람의 망상인지, 친구에게 전해야 할 경고인지 판단해야 한다.',lead:'일기에 적힌 강변 7번 창고와 노라의 근무 기록을 확인한다.'},
{title:'예고된 실종',goal:'노라의 행방과 창고에서 나간 화물을 찾기',text:'봄이 지나자 노라에게서 오는 편지가 끊겼다. 일기에 적힌 날 이후 출근 기록도 없다. 가족은 당신에게 노라를 찾아 달라고 부탁한다. 경찰은 성인의 자발적인 가출일 수 있다며 수색을 미루고 있다.\n\n7번 창고는 지난주 밤 대학 보관실로 상자를 보냈다. 관리인은 관련 장부를 보여주지 않는다. 일기의 주소가 맞았다는 사실보다 지금은 친구가 어디에 있는지 알아내는 일이 급하다.',lead:'장부의 수취인과 책 제목을 대학 도서관의 기록과 대조한다.'},
{title:'장부가 가리킨 책',goal:'노라의 이름이 적힌 의식의 규칙을 이해하기',text:'화물 장부에는 “미스캐토닉 대학 폐쇄 서가, 찬송집 17번”이라고 적혀 있다. 사서는 숙부도 그 책을 찾았다는 것을 기억한다. 책의 여백에는 노라의 이름과 7번 창고의 주소가 함께 적혀 있다.\n\n주석은 사람의 이름을 일기에 옮겨 적으면 특정한 별의 배열에 그 사람이 사라진다고 설명한다. 지워야 할 것은 이름만이 아니다. 유리 인장, 찬송가의 순서, 의식의 정확한 밤이 필요하다. 마지막 관측을 맡았던 사람은 언덕 위 천문대에서 일했다.',lead:'천문대에서 의식의 날짜와 이름을 지울 순서를 찾아낸다.'},
{title:'숙부가 멈춘 자리',goal:'노라가 돌아올 수 있는 다음 밤과 봉인의 방법 확인하기',text:'책의 주석을 들고 천문대를 찾았다. 관리인은 숙부가 노라 대신 다른 이름을 적으라는 제안을 거절했다고 말한다. 숙부는 다음 의식의 계산을 끝내지 못한 채 숨졌다.\n\n관측 기록에 따르면 노라는 죽은 것이 아니라 두 의식 사이에 갇혀 있다. 다음 별의 배열이 돌아오는 밤에 7번 창고에서 이름을 지울 수 있다. 유리 인장과 찬송가를 정확히 쓰면 문을 닫을 수 있지만, 계산을 틀리면 문이 다시 열린다.',lead:'다음 의식의 밤에 7번 창고에서 노라를 구하고 일기를 처리한다.'},
{title:'노라의 이름을 지우는 밤',goal:'친구를 구하기 위해 감수할 대가와 일기의 처분 결정하기',text:'관측한 밤이 왔다. 7번 창고의 안쪽에서 노라가 당신을 부른다. 일기에는 “한 이름을 지우려면 문을 닫거나 다른 이름을 채워라”라는 새 문장이 나타났다.\n\n봉인은 인장과 찬송가, 관측 기록을 정확한 순서로 맞춰야 한다. 불로 일기를 없애면 노라를 데리고 나올 수 있지만 창고에 남은 자료를 잃는다. 거래는 노라를 확실히 돌려주는 대신 다른 사람을 위험에 넘긴다. 도망치면 당신은 살 수 있지만 친구가 돌아온다는 보장은 없다.',lead:'선택의 결과를 감당하며 남은 삶을 살아간다.'}
];
for(let i=0;i<caseEvents.length;i++){Object.assign(caseEvents[i],storyChapters[i]);caseEvents[i].choices.forEach(c=>{c.lead=storyChapters[i].lead})}
Object.assign(caseEvents[0].choices[0],{text:'숙부의 일기와 노라의 근무 기록을 비교하고 경고할 주소를 찾는다.',success:'날짜와 주소가 노라의 근무표와 맞는다. 노라에게 경고 편지를 보냈다. 창고에서 일하는 사람의 증언도 필요하다.',failure:'번진 글씨를 읽느라 밤을 새웠다. 주소는 확인했지만 노라는 이미 새 일터로 떠났다.'});
Object.assign(caseEvents[0].choices[1],{text:'숙부의 동료 리드 교수에게 비밀을 털어놓고 노라를 찾을 도움을 청한다.',flags:{sharedSecret:true},success:'리드 교수는 숙부의 기록을 알아보았다. 함께 노라에게 연락하기로 했다.',failure:'리드는 믿기 어렵다면서도 주소를 확인해 주었다. 비밀을 아는 사람이 하나 늘었다.'});
Object.assign(caseEvents[0].choices[2],{text:'일기와 인장을 보관하고 노라에게 직접 경고 편지를 보낸다.',flags:{warnedFriend:true},success:'노라는 걱정해 줘서 고맙다고 답했지만 일자리를 포기할 수는 없다고 했다. 다음 봄 다시 연락하기로 했다.'});
caseEvents[0].choices.push({text:'일기는 남겨두고 유리 인장을 팔아 생활비를 마련한다.',wealth:35,evidence:'diary',flags:{soldRelic:true},success:'인장을 수집가에게 넘기고 일기의 사본으로 노라에게 경고했다. 구매자는 숙부의 이름을 듣자 가격을 더 묻지 않았다.',lead:storyChapters[0].lead});
Object.assign(caseEvents[1].choices[0],{success:'작업자는 노라가 마지막 화물에 동행했다고 말했다. 장부에는 대학 폐쇄 서가와 찬송집 17번이 적혀 있다.',failure:'작업자는 말을 아꼈다. 장부 사본은 얻었지만 관리인에게 당신의 방문이 알려졌다. 수취인은 대학 폐쇄 서가였다.'});
Object.assign(caseEvents[1].choices[1],{success:'장부를 가지고 나왔다. 노라는 찬송집 17번을 대학으로 옮기는 화물에 동행했다.',failure:'창문에서 떨어지며 다쳤지만 장부는 놓치지 않았다. “폐쇄 서가, 찬송집 17번”을 확인했다.'});
Object.assign(caseEvents[1].choices[2],{success:'노라의 가족과 수색을 요청해 장부 사본을 얻었다. 대학 폐쇄 서가가 마지막 배송지다. 창고의 주인도 수색을 지켜보았다.'});
for(const c of caseEvents[1].choices.filter(c=>c.requiresJob)){c.success+=' 장부에는 “대학 폐쇄 서가, 찬송집 17번”과 노라의 동행 기록이 있었다.';c.failure+=' 장부의 수취인은 대학 폐쇄 서가였다.'}
Object.assign(caseEvents[2].choices[0],{success:'노라의 이름을 지울 찬송가 순서를 복원했다. 의식의 밤은 천문대의 관측 기록으로 확인해야 한다.',failure:'구절은 확보했지만 읽는 동안 노라의 목소리가 머릿속에 울렸다. 정확한 날짜는 천문대에 남아 있다.'});
Object.assign(caseEvents[2].choices[1],{success:'사서는 주석을 풀어 주었다. 찬송가와 인장만으로는 부족하며 천문대의 날짜 계산이 필요하다.',failure:'필요한 페이지를 얻었다. 사서는 위험한 일에는 더 관여하지 않겠다고 했다. 주석은 천문대를 가리킨다.'});
Object.assign(caseEvents[2].choices[2],{success:'찬송가와 천문대의 이름을 베껴 적었다. 나머지 해석은 관측 기록을 구한 뒤 할 수 있다.'});
Object.assign(caseEvents[3].choices[0],{success:'노라를 불러낼 밤과 인장을 누를 순서를 계산했다. 이제 7번 창고로 돌아갈 준비가 되었다.',failure:'날짜는 알아냈지만 관측자의 악몽이 따라왔다. 계산을 다시 확인하며 의식의 밤을 기다리기로 했다.'});
Object.assign(caseEvents[3].choices[1],{success:'관리인은 숙부가 남긴 계산을 건넸다. 7번 창고에서 이름을 지울 다음 밤이 표시돼 있다.',failure:'일지는 얻었지만 관리인은 다시 찾아오지 말라고 했다. 숙부의 계산에는 다음 의식의 밤이 남아 있다.'});
Object.assign(caseEvents[3].choices[2],{success:'열쇠로 관측실을 열었다. 숙부가 숨긴 계산에서 노라를 구할 밤을 확인했다.'});
Object.assign(caseEvents[4].choices[0],{requiresEvidence:['chant','star'],requiresNotFlag:'soldRelic',flags:{friendSaved:true},success:'순서대로 인장을 눌렀다. 노라가 문을 넘어오자 일기에서 이름이 사라지고 창고가 조용해졌다.',failure:'노라의 손을 잡았지만 문이 닫히지 않았다. 그녀는 다시 안쪽으로 끌려갔다. 관측을 보완해 다음 밤에 다시 시도해야 한다.'});
Object.assign(caseEvents[4].choices[1],{flags:{friendSaved:true},success:'노라를 밖으로 이끌고 일기와 창고를 불태웠다. 친구는 살아 돌아왔지만 숙부의 기록은 재가 되었다.',failure:'노라를 찾았지만 불길 때문에 다가가지 못했다. 일기를 들고 탈출해 다음 밤을 준비하기로 했다.'});
Object.assign(caseEvents[4].choices[2],{flags:{friendSaved:true,dangerousDeal:true},success:'노라는 돌아왔다. 일기에는 모르는 사람의 이름이 대신 적혔다. 누가 사라질지 아는 채로 당신은 창고를 나왔다.'});
Object.assign(caseEvents[4].choices[3],{flags:{abandonedFriend:true},success:'노라를 데리고 나올 길을 찾지 못했다. 가족에게 사실을 알리고 아캄을 떠났다. 당신은 살아남았지만 친구의 행방은 남았다.'});
const consequenceEvents=[
{id:'sold_relic',title:'팔았던 인장의 행방',text:'유리 인장을 팔았던 수집가가 편지를 보냈다. 숙부의 이름을 아는 사람들이 물건을 찾고 있으며, 돌려받으려면 처음 받은 돈보다 더 내야 한다. 당신이 내린 생활의 선택이 조사에 돌아왔다.',choices:[{text:'$45를 지불하고 인장을 되찾는다.',wealth:-45,flags:{soldRelic:false,relicRecovered:true},success:'인장을 돌려받았다. 숙부의 부탁을 뒤늦게 지킬 수 있게 되었다.'},{text:'인장을 포기하고 그 없이 친구를 구할 방법을 찾는다.',flags:{relicLost:true},success:'인장 없이도 일기를 없애거나 거래할 수는 있다. 정확한 봉인은 이제 할 수 없다.'}]},
{id:'shared_secret',title:'비밀을 들은 사람의 부탁',text:'일기의 비밀을 털어놓았던 리드 교수가 다시 연락했다. 자신도 이상한 방문을 받았다며 연구실 자료를 옮기는 일을 도와 달라고 한다. 도움을 청한 만큼 상대도 위험을 감수했다.',choices:[{text:'교수의 자료를 안전한 곳으로 옮기고 함께 조사를 이어간다.',wealth:-10,bond:1,flags:{protectedConfidant:true},success:'리드는 끝까지 협력하겠다고 했다. 당신의 비밀은 서로 지켜야 할 약속이 되었다.'},{text:'더 위험해지기 전에 교수에게 조사에서 물러나 달라고 한다.',flags:{confidantLeft:true},success:'리드는 자료의 사본을 남기고 연락을 줄였다. 당신은 이후 조사를 혼자 감당하게 되었다.'}]},
{id:'deal_return',title:'일기에 남긴 다른 이름',text:'노라 대신 일기에 적었던 이름의 가족이 당신을 찾아왔다. 실종자의 소지품에 당신의 주소가 남아 있었다. 거래가 끝났다고 생각했던 대가가 돌아왔다.',choices:[{text:'거래를 숨기지 않고 가족에게 기록을 넘겨 함께 실종자를 찾는다.',san:-3,bond:1,flags:{dealConfessed:true},success:'가족은 용서하지 않았지만 기록을 받았다. 당신은 대가를 외면하지 않기로 했다.'},{text:'아무것도 모른다고 말하고 주소가 적힌 페이지를 없앤다.',san:-5,flags:{dealConcealed:true},success:'방문객은 떠났다. 노라의 귀환을 기뻐하면서도 그 가족의 얼굴을 잊지 못했다.'}]},
{id:'career_pressure',title:'성과의 빈틈',text:'지난 업무에서 서둘러 생략했던 확인 절차가 문제로 돌아왔다. 동료와 의뢰인은 해명을 요구하고 있다. 얻었던 보수보다 신뢰를 잃을 위험이 더 크다.',choices:[{text:'잘못을 인정하고 $15를 들여 결과를 바로잡는다.',wealth:-15,careerRep:3,flags:{careerRepaired:true},success:'수습 비용을 지불하고 다시 확인했다. 신뢰는 천천히 회복될 것이다.'},{text:'문제를 축소하고 기존 성과를 유지하려 한다.',careerRep:-8,flags:{careerConcealed:true},success:'당장의 계약은 지켰지만 동료들은 당신의 말을 다시 확인하기 시작했다.'}]},
{id:'kept_family',title:'사진첩을 찾는 방문객',text:'어린 시절 보관했던 가족 사진첩을 보러 친척이 찾아왔다. 팔려 나간 가구에는 남지 않은 이름과 이야기가 사진 뒤에 적혀 있다.',choices:[{text:'사진을 함께 정리하고 가족의 이야기를 기록한다.',bond:2,san:3,flags:{familyRemembered:true},success:'가족의 이름이 한 권의 기록으로 이어졌다.'},{text:'사진의 사본을 보내고 원본은 간직한다.',bond:1,flags:{familyRemembered:true},success:'떨어져 지내던 친척과 다시 편지를 주고받게 되었다.'}]}
];
const careerPaths={researcher:['독립 연구','의사'],reporter:['프리랜서 취재','사서'],detective:['자기 탐정 사무소','경찰관'],doctor:['개인 진료소','대학 연구원'],dealer:['자기 골동품 가게','신문 기자'],librarian:['독립 기록 조사','대학 연구원'],police:['사립탐정으로 독립','사립탐정'],mechanic:['자기 수리점','골동품상']};
for(const e of professionEvents){
 e.choices[0].careerRep=7;e.choices[0].careerXP=2;e.choices[0].failureCareerRep=-2;
 e.choices[1].careerRep=3;e.choices[1].careerXP=1;
 e.choices[2].careerRep=5;e.choices[2].careerXP=1;
 e.choices.push({text:'의심스러운 부분은 넘기고 빠르게 성과를 내 추가 보수를 받는다.',wealth:18,careerRep:2,careerXP:1,flags:{careerShortcut:true},success:'빠른 성과로 보수를 받았다. 확인하지 않은 부분은 기록에 남았다.'});
}
Object.assign(professionEvents.find(e=>e.job==='reporter').choices[0],{text:'취재원의 신원을 숨기고 증언을 교차 확인해 보도한다.',flags:{sourceProtected:true},success:'취재원을 보호하며 기사를 냈다. 독자와 제보자들의 신뢰가 쌓였다.'});
Object.assign(professionEvents.find(e=>e.job==='reporter').choices[3],{text:'취재원의 이름과 자극적인 내용을 공개해 특종으로 내보낸다.',flags:{sourceExposed:true,careerShortcut:true},success:'기사가 크게 팔렸다. 취재원은 더 이상 연락하지 않겠다고 했다.'});
Object.assign(professionEvents.find(e=>e.job==='researcher').choices[0],{text:'불리한 자료까지 남기고 동료의 기여를 밝혀 발표한다.',flags:{researchHonest:true},success:'결론은 신중했지만 동료들이 연구를 신뢰했다.'});
Object.assign(professionEvents.find(e=>e.job==='researcher').choices[3],{text:'반대되는 자료와 동료의 이름을 빼고 유리한 결과만 발표한다.',flags:{researchHidden:true,careerShortcut:true},success:'발표는 주목받았다. 동료는 빠진 자료가 있다며 해명을 요구했다.'});
function annualIncome(){return (careerEconomy[s.jobId]||90)+(s.career?.rank||0)*12+(s.career?.mode==='independent'?24:0)+(s.career?.incomePenalty||0)+traitSum('income')}
function annualExpenses(){return ANNUAL_LIVING_COST+(s.career?.mode==='independent'?18:0)+traitSum('expenses')}
function queueConsequence(id,delay=1){if(s.followups.some(e=>e.id===id)||s.completedFollowups.includes(id))return;s.followups.push({id,due:s.year+delay})}
function initialiseLifeLinks(raw){
 raw.noraBond=raw.noraBond||0;raw.flags=raw.flags||{};raw.caseNotes=raw.caseNotes||[];raw.followups=raw.followups||[];raw.completedFollowups=raw.completedFollowups||[];
 if(!raw.caseNotes.length&&raw.caseStage>0){for(let i=0;i<Math.min(raw.caseStage,5);i++){const previous=raw.history?.find(h=>h.event===caseEvents[i].id);if(previous)raw.caseNotes.push({year:previous.year,title:caseEvents[i].title,lead:caseEvents[i].lead})}}
 raw.career=raw.career||{reputation:20,rank:0,xp:0,mode:'employed',incomePenalty:0};raw.careerForkDue=raw.careerForkDue||null;
 return raw;
}
function careerForkEvent(){const path=careerPaths[s.jobId]||careerPaths.reporter;return {id:'career_fork',title:'직업의 갈림길',text:`${s.job}로 쌓은 경험`+'이 새로운 기회로 이어졌다. 현재 일터에서 책임을 늘릴지, 자기 방식으로 일할지, 다른 일을 시작할지 선택한다.',choices:[
{text:'현재 일터에 남아 책임 있는 일을 맡는다.',careerRep:3,minReputation:30,promote:true,success:'책임과 연 수입이 함께 늘었다.'},
{text:path[0]+'을 시작한다. 시작 비용 $60을 지불한다.',wealth:-60,independent:true,success:'새 일을 시작했다. 수입과 운영비를 직접 관리하게 되었다.'},
{text:path[1]+'의 일을 배우며 이직한다.',switchJob:careers.find(c=>c.name===path[1]).id,success:'익숙한 일을 뒤로하고 새 직업에서 다시 경험을 쌓기로 했다.'},
{text:'아직은 현재 일을 그대로 이어간다.',success:'큰 변화 대신 익숙한 일상을 선택했다.'}
]}}
function applyLifeLinks(event,c,ok){
 if(c.noraBond)s.noraBond=clamp(s.noraBond+c.noraBond,0,5);
 if(c.flags&&(!c.resolution||ok))Object.assign(s.flags,c.flags);
 if(c.careerRep)s.career.reputation=clamp(s.career.reputation+(ok?c.careerRep:(c.failureCareerRep??c.careerRep)),0,99);
 if(c.careerXP&&ok)s.career.xp+=c.careerXP;
 if(c.promote){s.career.rank=Math.min(3,s.career.rank+1);s.career.xp=0}
 if(c.switchJob)switchProfession(c.switchJob);
 if(c.independent){if(s.jobId!=='police'||switchProfession('detective')!==false)s.career.mode='independent'}
 if(s.pending.kind==='profession'){
  if(s.career.xp>=3&&!s.careerForkDue&&s.career.rank<3)s.careerForkDue=s.year+1;
  if(s.flags.careerShortcut&&!s.flags.careerPressureSeen){s.flags.careerPressureSeen=true;s.career.reputation=clamp(s.career.reputation-6,0,99);s.career.incomePenalty=-6;queueConsequence('career_pressure')}
 }
 if(s.pending.kind==='careerFork'){s.careerForkDue=null;s.career.xp=0}
 if(s.pending.kind==='case'){
  const chapter=s.pending.index;s.caseNotes.push({year:s.year,title:event.title,lead:c.resolution&&!ok?'노라를 아직 데리고 나오지 못했다. 기록을 보완하고 다음 의식의 밤에 다시 시도한다.':c.lead||event.lead});
  s.caseDue=s.year+1; // 첫 실종의 예고와 다음 해의 조사 사이를 연결한다.
  if(chapter===0){if(s.flags.soldRelic)queueConsequence('sold_relic',2);if(s.flags.sharedSecret)queueConsequence('shared_secret',2)}
  if(c.resolution&&ok&&s.flags.dangerousDeal)queueConsequence('deal_return',2);
 }
 if(s.pending.kind==='consequence')s.completedFollowups.push(event.id);
 if(s.flags.careerRepaired)s.career.incomePenalty=0;
}
function switchProfession(id){const next=careers.find(j=>j.id===id),old=careers.find(j=>j.id===s.jobId);if(!next)return;
 for(let i=0;i<SKILLS.length;i++)s.skills[SKILLS[i]]=clamp((skillValue(SKILLS[i]))-careerSkillBonus(old?.id,SKILLS[i])+careerSkillBonus(next.id,SKILLS[i]),10,95);
 s.jobId=id;s.job=next.name;s.career.rank=0;s.career.xp=0;s.career.mode='employed';s.career.incomePenalty=0;s.professionDue=s.year+1;
}
function chapterText(index){let text=caseEvents[index].text;
 if(index===0)text+='\n\n'+relationshipIntro();
 if(index===0&&s.traits.includes('녹슨 열쇠'))text+='\n\n유리 인장 옆에는 어릴 때 받은 열쇠와 같은 문양이 새겨져 있다.';
 if(index===3&&s.flags.soldRelic)text+='\n\n당신은 인장을 팔았다. 되찾지 못하면 정확한 봉인 대신 다른 방법을 선택해야 한다.';
 if(index===4&&s.flags.protectedConfidant)text+='\n\n리드 교수가 함께 와서 관측 기록을 다시 확인해 준다.';
 if(index===4&&s.caseNotes.some(n=>n.title===caseEvents[4].title))text+='\n\n지난 시도에서 무엇이 잘못됐는지 되짚었다. 이번에는 그 실패를 기억하며 선택한다.';
 return text;
}
function lifeAfterwords(){const notes=[];
 if(s.flags.friendSaved)notes.push('노라는 돌아온 뒤에도 당신과 안부를 나누었다.');
 if(s.flags.abandonedFriend)notes.push('노라의 가족에게 보내지 못한 편지를 오래 간직했다.');
 if(s.flags.soldRelic&&!s.flags.relicRecovered)notes.push('팔았던 인장은 끝내 돌아오지 않았다.');
 if(s.flags.relicRecovered)notes.push('되찾은 인장은 마지막까지 서랍 속에 보관했다.');
 if(s.flags.protectedConfidant)notes.push('리드 교수와 지킨 약속은 두 사람의 기록으로 남았다.');
 if(s.flags.confidantLeft)notes.push('비밀을 들었던 리드와는 한동안 연락이 끊겼다.');
 if(s.flags.dealConfessed)notes.push('거래의 대가를 털어놓고 실종자의 가족과 남은 기록을 추적했다.');
 if(s.flags.dealConcealed)notes.push('다른 이름의 가족에게 숨겼던 진실은 마지막까지 말하지 못했다.');
 if(s.flags.familyRemembered)notes.push('어릴 때 지킨 사진첩이 다음 가족에게 전해졌다.');
 if(s.flags.sourceProtected)notes.push('취재원들이 이름을 숨긴 채 당신의 기록을 기억했다.');
 if(s.flags.sourceExposed)notes.push('특종으로 잃은 취재원의 신뢰는 돈으로 되돌릴 수 없었다.');
 if(s.flags.researchHonest)notes.push('동료들은 불리한 자료도 남긴 당신의 연구를 인용했다.');
 if(s.flags.researchHidden)notes.push('빼버린 자료와 동료의 이름이 연구의 평가에 그림자를 남겼다.');
 if(s.career?.mode==='independent')notes.push('자신의 일터를 운영한 시간이 생애에 남았다.');
 if(s.career?.rank)notes.push(`직업에서는 ${['','실무 책임자','숙련 책임자','선임 책임자'][s.career.rank]}까지 경험을 쌓았다.`);
 return notes;
}
function renderStoryMemo(){
 if(s.phase!=='adult')return '';
 const summary=s.resolution?'사건을 마무리한 뒤에도 삶은 이어집니다.':s.caseStage===0?'숙부의 편지에서 노라의 이름을 확인해야 합니다.':caseEvents[Math.min(s.caseStage,4)].goal;
 return `<div class="story-memo"><strong>숙부의 일기 · 노라의 행방</strong><p>${escapeHTML(summary)}</p>${s.caseNotes.slice(-5).map(n=>`<p><span>${n.year} · ${escapeHTML(n.title)}</span><br>${escapeHTML(n.lead)}</p>`).join('')}</div>`;
}
// 노라는 사건에 등장하기 전에 성장기에서 함께 시간을 보낸다.
childhoodEvents.push(
{id:'nora_meeting',scheduled:1907,title:'강가에서 만난 노라',text:'일곱 살의 어느 날, 집으로 돌아오는 길에 비가 쏟아졌다. 같은 학교의 노라가 자기 우산을 내밀며 함께 가자고 한다. 함께 시간을 보내게 될지는 지금의 대화에 달려 있다.',choices:[
{text:'함께 집에 가며 좋아하는 놀이와 책 이야기를 나눈다.',bonus:[0,2,0],bond:1,noraBond:1,flags:{metNora:true},trait:'노라와 나눈 우산',success:'노라와 방과 후에도 만나기 시작했다. 어려울 때 서로 도와주자는 작은 약속이 생겼다.'},
{text:'고맙다고 인사하고 다음 날 노라의 심부름을 돕는다.',bonus:[0,0,2],bond:1,noraBond:1,flags:{metNora:true},trait:'노라에게 갚은 작은 도움',success:'노라가 웃으며 다음에도 함께 가자고 했다. 둘은 서로의 집을 오가는 친구가 되었다.'},
{text:'우산에 감사하고 혼자 조용히 학교생활을 이어간다.',bonus:[1,0,0],flags:{metNora:true},success:'아주 가까워지지는 않았지만 노라는 학교에서 마주칠 때마다 먼저 인사했다.'}]},
{id:'nora_departure',scheduled:1917,title:'각자의 첫 일자리',text:'열일곱 살. 노라는 가족의 생활비를 마련하려 일을 찾고 있다. 어릴 때 함께 걷던 강가에서 노라는 “일을 시작해도 편지는 쓰자”고 말한다.',choices:[
{text:'일자리를 알아보러 갈 교통비 $10을 보태고 서로 연락하기로 한다.',wealth:-10,bonus:[0,2,0],bond:1,noraBond:2,flags:{promisedNora:true},success:'노라는 편지로 소식을 전하겠다고 약속했다. 당신에게 받은 도움을 잊지 않겠다고 했다.'},
{text:'돈을 보태기는 어렵지만 계속 편지를 주고받겠다고 약속한다.',bonus:[0,1,0],noraBond:1,flags:{promisedNora:true},success:'서로의 일과 고민을 편지로 나누었다. 친구의 글씨가 어느새 익숙해졌다.'},
{text:'새 삶을 응원하고 자신의 진로에 집중한다.',bonus:[2,0,0],flags:{distantNora:true},success:'연락은 뜸해졌다. 그래도 예전의 우산과 먼저 건네던 인사는 기억에 남았다.'}]}
);
const purchases={
supplies:{name:'조사 준비',cost:25,description:'자료 복사·등불·동행 준비 · 다음 조사 이성 손실 완화',requiresCase:true},
rest:{name:'안정된 거처와 휴식',cost:35,description:'안전한 방과 휴식 · 이성 10, 건강 5 회복',hp:5,san:10},
training:{name:'직업 교육',cost:45,description:'전문 교육 · 직업 경험 1, 평판 2 증가',adult:true},
visit:{name:'친구와 가족에게 시간 쓰기',cost:15,description:'교통비와 식사 · 인연 1, 이성 4 회복',bond:1,san:4}
};
// 성공해도 진실을 마주하는 대가가 있고, 실패에는 더 큰 추가 손실이 있다.
const investigationStress=[3,6,8,9,12];
for(let i=0;i<caseEvents.length;i++){
 const event=caseEvents[i];event.stress=investigationStress[i];
 for(const c of event.choices){c.san=Math.min(c.san||0,0);if(c.skill)c.difficulty=Math.max(c.difficulty||1,i>=2?2:1);c.failureSan=i>=2?8:6}
}
caseEvents[4].choices[2].san=-12; // 거래 자체의 대가는 기본 공포 손실과 별도다.
caseEvents[4].choices[3].san=-4;
ambientEvents[0].stress=5;ambientEvents[1].stress=6;
// 돈으로 정보를 얻는 대신 공포를 완전히 피할 수는 없다.
caseEvents[1].choices.push({text:'$30를 들여 노라의 마지막 이동을 추적할 현지 조력자를 고용한다.',wealth:-30,evidence:'ledger',stressReduction:3,success:'조력자가 장부 사본과 노라의 동행 기록을 가져왔다. 당신도 실종된 날의 증언을 들어야 했다.',lead:storyChapters[1].lead});
caseEvents[2].choices.push({text:'$35를 지불해 사서와 함께 주석을 해석하고 위험한 구절을 나눠 읽는다.',wealth:-35,evidence:'chant',stressReduction:4,success:'함께 읽으며 찬송가와 천문대의 이름을 확인했다. 낯선 목소리는 잠시 잦아들었다.',lead:storyChapters[2].lead});
caseEvents[3].choices.push({text:'$40를 들여 기록을 복원하고 관리인과 계산을 교차 확인한다.',wealth:-40,evidence:'star',stressReduction:4,success:'날짜와 순서를 확인했다. 혼자 악몽을 읽지 않아도 되었지만 노라의 흔적은 선명했다.',lead:storyChapters[3].lead});

Object.assign(caseEvents[2].choices[1],{text:'관여하기를 두려워하는 사서에게 책임을 나누자며 금서 해석을 부탁한다.'});
Object.assign(caseEvents[3].choices[1],{text:'기억과 말을 자꾸 바꾸는 관리인을 진정시켜 정확한 관측지를 찾아낸다.'});
Object.assign(caseEvents[4].choices[1],{text:'무너지는 창고와 번지는 불길 사이의 짧은 틈에 노라를 데리고 빠져나온다.'});
// 치료의 시간 비용과 아직 해결하지 않은 조사의 지연.
const recoveryCosts={hospital:{incomeLoss:0.10,label:'당해 직업 수입 10% 감소'},sanatorium:{incomeLoss:0.35,label:'당해 직업 수입 35% 감소'},rest:{incomeLoss:0.20,label:'당해 직업 수입 20% 감소'}};
function initialiseRecovery(raw){raw.incomeLoss=clamp(raw.incomeLoss||0,0,0.75);raw.caseDelays=raw.caseDelays||{};raw.deferredCase=raw.deferredCase||null;raw.totalCaseDelays=raw.totalCaseDelays||0;raw.noraDelayTotal=raw.noraDelayTotal??raw.totalCaseDelays;return raw}
function unresolvedCase(){return isInvestigation()&&!s.result}
function delayCount(index=s.pending?.index){return s.caseDelays[delayKey(index)]||0}
function recoveryWarning(kind){
 const cost=recoveryCosts[kind];if(!cost)return '';
 const lost=s.job?Math.round(annualIncome()*Math.min(cost.incomeLoss,0.75-s.incomeLoss)):0;
 const income=s.job?'올해 직업 수입'+` 약 $${lost} 추가 감소`:'성장기의 선택은 그대로 유지';
 return income+(unresolvedCase()?` · 현재 조사 다음 해로 연기 · 재개 시 이성 손실 +${Math.min(6,(delayCount()+1)*2)}, 판정 여건 악화${s.pending.kind==='case'&&s.noraDelayTotal>=2?' · 노라에게 후유증이 남을 위험':''}`:'');
}
function applyRecoveryTime(kind){
 if(s.job)s.incomeLoss=clamp(s.incomeLoss+recoveryCosts[kind].incomeLoss,0,0.75);
 if(!unresolvedCase())return '';
 const index=s.pending.index;
 const key=delayKey(index);s.caseDelays[key]=(s.caseDelays[key]||0)+1;s.totalCaseDelays++;
 const arc=s.pending.kind==='case'?'nora':s.pending.arc;
 if(arc==='nora')s.noraDelayTotal++;else arcState(arc).delays=(arcState(arc).delays||0)+1;
 s.deferredCase={index,arc,due:s.year+1};if(arc==='nora')s.caseDue=s.year+1;else arcState(arc).due=s.year+1;
 if(arc==='nora'&&s.noraDelayTotal>=3){s.flags.friendTrauma=true;s.noraBond=Math.max(0,s.noraBond-1)}
 const note=`「${currentEvent().title}」을 ${s.year+1}년까지 미뤘다. 목격자와 기록을 다시 찾아야 하며 재개 시 추가 공포와 불리한 판정 여건이 남는다.`;
 s.pending={kind:'recuperation'};s.resultOutcome='neutral';s.result=note;s.progress=0;
 addLog(note);return note;
}
const originalChapterText=chapterText;
chapterText=function(index){let text=originalChapterText(index),delays=delayCount(index);if(delays){text+=`\n\n치료를 받는 동안 이 조사를 ${delays}년 미뤘다. 목격자의 기억은 흐려지고 관련 기록은 흩어졌다. 남아 있는 단서를 다시 찾아야 한다. 이번 조사에는 추가 이성 손실 ${Math.min(6,delays*2)}와 불리한 판정 여건이 따른다.`;if(index===0)text+=' 숙부가 경고했던 봄을 제때 준비하지 못했다.'}return text};
const originalAfterwords=lifeAfterwords;
lifeAfterwords=function(){const notes=originalAfterwords();if(s.flags.friendTrauma&&s.flags.friendSaved)notes.push('조사가 늦어져 노라는 오래 갇혀 있었다. 돌아온 뒤에도 악몽을 함께 견뎌야 했다.');else if(s.totalCaseDelays)notes.push(`치료를 위해 조사를 ${s.totalCaseDelays}번 미뤘던 시간을 기억했다.`);return notes};

