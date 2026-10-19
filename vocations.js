'use strict';
// 작업의 대상은 사건별로, 자료를 다루는 방식과 팀 안의 역할은 직업별로 다르게 둔다.
const VOCATION_CASES={
 nora:{record:'창고의 화물 장부와 숙부의 대출 기록',person:'창고 관계자들의 목격과 목소리에 관한 증언',device:'창고 출입 장치와 화물 운반 동선',end:'관측 시각에 인장을 고정하고 찬송 구절을 읽는 동안 노라를 문 밖으로 데려오는 일',risk:'문 너머의 목소리가 서로의 지시를 흉내 낸다'},
 factory:{record:'교대 명부와 기계 설치 도면',person:'마지막 교대 작업자들의 신호와 실종 전 증상',device:'비상 밸브와 정지 장치의 연결',end:'정지 순서대로 압력을 빼고 사람과 연결된 기계를 멎게 하는 일',risk:'증기와 움직이는 연결부가 구조 통로를 가른다'},
 debt:{record:'가족의 서명 사본과 공증 명부',person:'가족들이 기억하는 이름과 서류에서 사라진 이름',device:'원장 보관실의 잠금장치와 문서 반출 동선',end:'증인과 원본을 대조해 가족의 이름을 되찾고 피해를 전가하지 않은 채 계약의 연결을 끊는 일',risk:'원장을 펼칠수록 서로의 이름과 지시를 잊는다'},
 patient:{record:'퇴원증·재원 확인서와 검사 번호',person:'환자들이 말하는 기억과 실제 몸의 반응',device:'기억 장치의 중계 연결과 격리문의 잠금',end:'환자와 기억의 연결을 맞춘 뒤 중계 장치를 끄고 실험을 끝내는 일',risk:'동시에 흘러나오는 기억이 환자와 구조자의 판단을 흐린다'},
 press:{record:'교정쇄·납품 영수증과 삭제 전 기사 사본',person:'인쇄공과 취재원들이 기억하는 삭제 전 이름',device:'원판의 고정 장치와 급지 연결',end:'취재원의 신원을 가린 복원 기록을 다른 잉크로 동시 인쇄해 삭제된 사람들의 흔적을 돌려놓는 일',risk:'읽던 이름이 지워져 작업 지시마저 끊긴다'},
 boarding:{record:'임대 장부와 옛 건축 도면',person:'남은 세입자들의 방 번호와 마지막 목격',device:'반복되는 문틀 표식과 바깥 출입문의 연결',end:'바깥에서 이름을 확인하며 장부와 문틀의 연결을 끊고 조지를 데려오는 일',risk:'복도의 길이가 바뀌어 구조자의 퇴로도 사라진다'},
 beacon:{record:'호출 일지와 신호 장치의 시험 해도',person:'생존 선원들이 들은 호출 순서와 실제 배의 위치',device:'회전등의 눈금과 호출 장치의 연결',end:'역순 신호로 거짓 호출을 끊고 선원들이 돌아올 항로를 여는 일',risk:'허위 섬광과 호출이 구조선까지 같은 항로로 유도한다'},
 orchard:{record:'출하 명부와 관개 공사 기록',person:'일꾼들의 체온 변화와 작업 구역',device:'우회 수문과 빛나는 뿌리로 이어지는 물길',end:'사람과 수확물을 분리한 뒤 우회관을 끊고 뿌리의 중심까지 말리는 일',risk:'젖은 구역의 뿌리가 구조자의 온기까지 빼앗는다'},
 portrait:{record:'촬영 일지·시험 인화지와 렌즈 유통 기록',person:'조수의 실제 행동과 인화지 속 모습의 차이',device:'가림막과 원본 건판의 노출 순서',end:'가림막을 순서대로 닫아 다니엘의 원본과 실체를 맞추고 위험한 렌즈를 분리하는 일',risk:'사진 속 움직임이 실제 사람보다 먼저 퇴로를 막는다'},
 burial:{record:'이장 작업표·옛 지도와 묘역 관리 기록',person:'인부들의 마지막 신호와 지상 목격',device:'환기 통로와 끊긴 석회 경계',end:'벤을 지상으로 올린 뒤 무너진 석회 경계를 복구하고 더 깊은 굴착을 끝내는 일',risk:'아래에서 들리는 신호와 바뀐 통로가 구조자를 깊이 끌어들인다'}
};
const VOCATIONS={
 historian:{skill:'오컬트',mode:'archive',prepare:r=>r.record+'을 지역 전승과 비교해 의례의 조건과 과장된 설명을 구별하고, 현장 담당자와 검증할 항목을 나눈다.',finish:'검증한 의례의 금기와 실행 순서를 짚어 협력자들의 대응 시점을 이끈다.',benefit:'의례 검증',repair:'incomplete'},
 researcher:{skill:'박학',mode:'archive',prepare:r=>r.record+'과 '+r.device+'의 반응을 조건별로 대조해 재현 가능한 순서를 찾고, 현장 팀에 검증을 요청한다.',finish:'반응 기록을 바탕으로 실행과 중단 시점을 계산해 현장 팀을 지휘한다.',benefit:'반응 검증',repair:'incomplete'},
 doctor:{skill:'의학',mode:'allies',prepare:r=>r.person+'을 당사자 동의를 받아 확인하고, 기록 담당자와 구조 중 지킬 의식·호흡의 기준을 나눈다.',finish:'당사자의 반응을 살피며 구조와 처치를 맡고, 연결을 끊는 팀에 환자를 옮길 시점을 알린다.',benefit:'구조 중 처치',guard:3},
 mechanic:{skill:'손재주',mode:'field',prepare:r=>r.device+'을 점검한다. 자료를 보존할 차단·복구 지점을 기록 담당자와 함께 표시한다.',finish:'검증된 차단점을 순서대로 조작하고 다른 팀이 사람과 원본을 확보할 통로를 유지한다.',benefit:'비파괴 차단',guard:2},
 reporter:{skill:'설득',mode:'allies',repair:'exposed',prepare:r=>r.person+'과 '+r.record+'을 별도로 검증하고, 신원을 숨길 범위와 협력자의 역할을 합의한다.',finish:'검증 담당자와 현장 팀의 연락을 잇고, 신원을 숨긴 사본을 분산 보관하며 공동 대응을 이끈다.',benefit:'취재원 보호',guard:2},
 detective:{skill:'관찰',mode:'archive',prepare:r=>r.record+'과 '+r.person+'의 불일치를 추적하고, 확인한 사실과 추가 검증이 필요한 지점을 담당자에게 넘긴다.',finish:'누락된 시간과 위치를 다시 맞춰 실행 팀이 잘못된 대상에 손대지 않도록 확인한다.',benefit:'실패 단서 복구',repair:'incomplete'},
 librarian:{skill:'박학',mode:'archive',prepare:r=>r.record+'의 원본 소재와 수정 이력을 열람 절차로 확인하고, 담당자에게 보존 사본을 제공한다.',finish:'원본과 보존 사본을 대조해 실행 순서의 누락을 확인하고 현장 팀에 정확한 구절과 표식을 전한다.',benefit:'원본 접근',repair:'incomplete'},
 police:{skill:'운동',mode:'allies',prepare:r=>r.device+' 주변의 안전 동선을 직접 확인하고, 기록 검증자와 구조 인력의 역할·신호를 정한다.',finish:'구조대를 호위하고 퇴로를 유지해, 자료 검증 팀이 위험의 연결을 끊을 때까지 사람과 원본을 지킨다.',benefit:'호위·현장 확보',guard:3},
 dealer:{skill:'관찰',mode:'archive',prepare:r=>r.record+'과 관련 물건의 유통 이력·각인을 대조하고, 원 소유자와 기록 담당자에게 진위를 교차 확인한다.',finish:'원본과 대체품을 가려 실행 팀에 넘기고, 위험한 물건이 다시 거래되지 않도록 회수 목록을 확정한다.',benefit:'진품·유통 추적',repair:'incomplete'},
 dockworker:{skill:'운동',mode:'allies',prepare:r=>r.device+' 주변에 안전한 운반 동선을 만들고, 구조 인력과 사람·자료를 옮길 순서를 연습한다.',finish:'구조팀과 사람·자료를 안전한 경계 밖으로 운반하며 검증 팀이 대응할 시간을 번다.',benefit:'구조 운반',guard:2},
 cleaner:{skill:'손재주',mode:'allies',prepare:r=>r.device+' 주변의 잠금·환기·접근 상태를 점검하고, 관리 담당자와 출입 통제 신호를 정한다.',finish:'관리 통로와 잠금장치를 유지하며 구조팀과 검증 팀의 안전한 출입을 돕는다.',benefit:'시설 안전 확보',guard:2}
};
function vocationalChoices(e){
 if(e&&s?.pending?.kind==='catastrophe'&&s.jobId==='police')return {...e,choices:e.choices.map((c,i)=>i>=3?{...c,vocation:'police'}:c)};
 if(!e||!isInvestigation()||s.result||exclusiveMadness())return e;
 const job=s.jobId,v=VOCATIONS[job],id=currentArcId(),r=VOCATION_CASES[id];if(!v||!r)return e;
 const final=s.pending.index===(id==='nora'?4:arcById(id).chapters.length-1),middle=s.pending.index===1;
 if(!middle&&!final)return e;
 const rec=branchRecord(id),prep=s.vocationPlans?.[id]?.[job],ready=Boolean(prep?.success),gap=Boolean(rec.incomplete||rec.exposed);
 const choices=e.choices.filter(c=>!(middle&&(c.professionalArchive||(job==='historian'&&c.skill==='오컬트'&&c.text.startsWith('역사 연구자로서')))));
 if(middle){const evidence=e.choices.find(c=>c.evidence)?.evidence;choices.push({text:v.prepare(r),skill:v.skill,difficulty:1,evidence,branchMode:v.mode,vocation:job,professionalArchive:job==='librarian',vocationPhase:'prepare',vocationArc:id,stressReduction:v.guard||1,success:'확인 결과를 담당자와 대조해 협력할 사람·자료·역할을 정했다. '+(v.repair==='exposed'?'연락 창구를 나누고 신원을 가려 추가 노출 위험을 낮췄다. ':v.repair?'앞선 기록의 공백을 메웠다. ':'')+(e.lead||''),failure:'직업 경험으로 접근했지만 자료와 현장의 반응이 맞지 않아 공동 실행을 확정하지 못했다. '+r.risk+'. '+(e.lead||'')});
 if(job==='police'&&['factory','patient','press','beacon','portrait'].includes(id))choices.push({text:'지급받은 권총으로 '+POLICE_TARGETS[id]+'을 끊을 안전한 사선을 확인하고, 구조팀이 지나갈 틈을 만든다. 기록 담당자에게 차단 전후의 반응을 넘긴다.',skill:'사격',difficulty:2,evidence,branchMode:'allies',vocation:job,vocationPhase:'prepare',vocationArc:id,hpLoss:'1d2',success:'사람이 없는 사선에서 물리적 고정 장치만 끊었다. 원인 자체를 없앤 것은 아니지만 구조 동선과 대응 역할을 확보했다. '+(e.lead||''),failure:'파편이 튀어 안전한 통로를 만들지 못했다. 자료는 챙겼지만 실행 순서는 미확인으로 남았다. '+(e.lead||'')});
 if(job==='police'&&['factory','press'].includes(id))choices.push({text:'사람과 자료를 빼앗으려는 현장 경비를 제압해 동료가 원본을 가져올 틈을 만들고, 구조 담당자와 안전한 동선을 확보한다.',skill:'격투',difficulty:2,evidence,branchMode:'allies',vocation:job,vocationPhase:'prepare',vocationArc:id,hpLoss:'1d3',success:'경비의 팔을 풀어 동료와 자료를 보호했다. 몸싸움으로 원인을 해결한 것은 아니지만, 담당자들이 다음 대응을 준비할 시간을 벌었다. '+(e.lead||''),failure:'경비에게 밀려 통로를 놓쳤다. 동료가 건넨 자료는 챙겼지만 공동 대응의 역할은 확정하지 못했다. '+(e.lead||'')});
 }else if(prep){
 const full=ready,ending=id==='nora'?{resolution:full?'sealed':'quarantined'}:{episodeOutcome:full?encounterSuccess(id):id+'_quarantined'};
 // 인장이 없으면 같은 봉인을 실행했다고 처리하지 않는다.
 if(id!=='nora'||!full||!s.flags.soldRelic&&s.evidence.includes('diary'))choices.push({text:v.finish+' '+(full?'함께 맡을 일은 '+r.end+'이다.':'앞선 검증이 미완성이므로 구조와 현장 격리에 한정한다. 근본 해결은 확인할 수 없다.'),skill:v.skill,difficulty:ready&&!gap?2:3,branchMode:full?'archive':'allies',...ending,flags:id==='nora'&&full?{friendSaved:true}:undefined,vocation:job,vocationPhase:'finish',vocationArc:id,stressReduction:v.guard||1,success:(full?r.end+'을 역할대로 마쳤다. 원본을 보존하고 다른 사람에게 피해를 넘기지 않았다.':'당사자들이 대피할 시간을 확보하고 현장을 격리했다. 실종자의 귀환과 현상의 소멸은 확인하지 못했다.')+(v.guard?' 사전 준비로 공포의 부담을 일부 줄였다.':''),failure:'공동 대응의 신호가 어긋나 '+r.risk+'. 위험의 연결을 끊지 못해 재앙이 시작된다.'});
 }
 return {...e,choices};
}
function vocationLabel(c){const job=c.vocation||c.requiresJob||(s?.jobId==='historian'&&c.text.startsWith('역사 연구자로서')?'historian':c.professionalRecovery?'detective':c.professionalArchive?'librarian':c.professionalEscort?'police':null);const id=job||((s?.jobId==='police'&&s.pending?.kind==='catastrophe'&&c.text.includes('지급받은 권총'))?'police':null);if(!id)return '';const name=careers.find(j=>j.id===id)?.name||id;return '<small class="vocation-label">'+escapeHTML(name)+' · '+escapeHTML(VOCATIONS[id]?.benefit||'직업 경로')+'</small>'}
function installVocations(){
 const init=initialiseRevision;initialiseRevision=function(r){r=init(r);r.vocationPlans||={};return r};if(s)s.vocationPlans||={};
 const current=currentEvent;currentEvent=()=>vocationalChoices(current());
 const after=afterCrisisChoice;afterCrisisChoice=function(e,c,ok,oldSan){after(e,c,ok,oldSan);if(ok&&c.vocationPhase==='finish'&&!s.vocationPlans?.[c.vocationArc]?.[c.vocation]?.success){syncWorldStories();s.worldStories[c.vocationArc].saved=false}};
 const links=applyLifeLinks;applyLifeLinks=function(e,c,ok){links(e,c,ok);if(c.vocationPhase==='prepare'){const id=c.vocationArc;s.vocationPlans[id]||={};s.vocationPlans[id][c.vocation]={success:ok,year:s.year};if(ok){const rec=branchRecord(id);if(VOCATIONS[c.vocation].repair)rec[VOCATIONS[c.vocation].repair]=false;rec.mode=VOCATIONS[c.vocation].mode;s.result+=' 다음 최종 대응에서 '+careers.find(j=>j.id===c.vocation).name+'의 역할을 이어갈 수 있다.'}}};
}

