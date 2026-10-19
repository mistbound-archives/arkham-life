'use strict';
const CASE_STAKES={
 nora:{save:'일기에 적힌 실종을 막고 노라를 창고 밖으로 데려올 수 있다.',limit:'창고 출입과 문제의 화물 운송을 중단',reward:'구조 뒤 창고 측이 지급한 수색 사례금',cash:40},
 factory:{save:'메이를 찾고, 다음 교대 작업자들이 같은 기계에 들어가는 일을 막을 수 있다.',limit:'야간 교대와 위험 설비의 가동을 중단',reward:'작업자 모임과 공장 보험의 수색·정비 보수',cash:50},
 debt:{save:'가족의 신원을 되찾고 다른 집안으로 피해가 넘어가는 일을 끊을 수 있다.',limit:'원장과 관련된 계약 집행을 보류하고 사무실을 봉쇄',reward:'되찾은 담보의 현금 정산',cash:45},
 patient:{save:'앨런의 동생과 환자들이 자기 기억을 되찾고 실험이 반복되는 것을 막을 수 있다.',limit:'추가 입원과 장치 사용을 중단하고 보호자 동의 아래 병동을 격리',reward:'보호자 모임이 마련한 기록 확인 보수',cash:30},
 press:{save:'오언과 삭제된 사람들의 흔적을 되돌리고 취재원을 보호할 수 있다.',limit:'문제의 잉크 유통과 인쇄를 중단하고 남은 인쇄물을 보관',reward:'정정판 발행 뒤 정산한 취재·자료 검증 보수',cash:40},
 boarding:{save:'조지를 찾고 남은 세입자들이 방 안에서 사라지는 일을 막을 수 있다.',limit:'세입자를 다른 거처로 옮기고 건물 출입을 통제',reward:'하숙집 측이 정산한 수색 사례금',cash:30},
 beacon:{save:'실종 선원들을 찾고 다음 배가 거짓 신호를 따라가는 일을 막을 수 있다.',limit:'문제의 항로를 폐쇄하고 신호소 운용을 중단',reward:'항만 조합이 정산한 수색·항로 확인 보수',cash:50},
 orchard:{save:'일꾼들의 온기를 되찾고 오염 수확물이 다른 식탁으로 퍼지는 것을 막을 수 있다.',limit:'출하와 작업을 중단하고 오염 구역을 격리',reward:'농가 조합이 지급한 검진·출하 조사 보수',cash:35},
 portrait:{save:'다니엘을 되찾고 렌즈가 다른 사람의 모습을 가져가는 일을 막을 수 있다.',limit:'렌즈와 건판을 빛이 들지 않는 보관함에 격리하고 촬영을 중단',reward:'사진사 조합이 지급한 장비 회수 사례금',cash:30},
 burial:{save:'벤을 구조하고 이장 작업이 더 깊은 경계를 무너뜨리는 것을 막을 수 있다.',limit:'굴착을 중단하고 묘역과 인근 통로의 출입을 통제',reward:'묘역 관리소가 정산한 구조·안전 조사 보수',cash:45}
};
function caseExit(id,mode){
 const row=CASE_STAKES[id],cost=mode==='handoff'?15:0;
 if(s.wealth<cost)return false;
 s.wealth-=cost;s.caseDecisions||={};s.caseDecisions[id]={mode,year:s.year,rewarded:false};
 if(id==='nora'){s.resolution='withdrawn';s.caseStage=5;s.noraStarted=true}else{const rec=arcState(id);rec.resolution='withdrawn';rec.finished=s.year}
 s.activeInvestigation=null;s.deferredCase=null;s.encounterLead=null;s.encounterAfter=s.year+randomInt(2,4);s.lastCrisisYear=s.year;
 syncWorldStories();const w=s.worldStories[id];w.saved=false;w.exitMode=mode;w.relationship=mode==='handoff'?'listen':'distance';
 w.modifier={income:0,cost:mode==='handoff'?1:3,until:s.year+3,name:LIFE_PROFILES[id].place};
 s.lastRoll=null;s.actionRolls=[];s.lastImpact=null;s.resultOutcome='neutral';
 s.result=(mode==='handoff'?'**자료와 대피 준비를 넘겼다.** $15를 써서 사본과 운송을 마련했다.':'**직접 조사를 중단했다.** 확인한 장소와 위험을 서면으로 신고하고 출입하지 않기로 했다.')+' 담당자들은 '+row.limit+'하기로 했다. **새 피해를 줄이기 위한 통제이며, 실종자 구조나 현상의 소멸이 확인된 것은 아니다.** 당신은 안으로 돌아가지 않았고 해결 보수와 평판 보상도 받지 않는다. '+(mode==='handoff'?'당사자와 연락을 유지한다.':'당사자와의 거리는 남았다.')+' 앞으로 세 해 동안 우회·격리에 따른 추가 생활비가 매년 $'+w.modifier.cost+' 든다.';
 s.history.push({year:s.year,event:currentEvent()?.id||id,choice:mode,investigation:true,success:true});addLog(s.result);save();render();return true;
}
function rewardCaseResolution(id){
 const result=completedArcResult(id);if(!result)return;s.caseDecisions||={};if(s.caseDecisions[id])return;
 const kind=lifeOutcomeKind(id,result);s.caseDecisions[id]={mode:kind,year:s.year,rewarded:false};
 if(['catastrophe','withdrawn','complicit'].includes(kind))return;
 const damaged=kind==='destroyed'||kind==='contained',cash=damaged?Math.floor(CASE_STAKES[id].cash*.6):CASE_STAKES[id].cash;
 applyEffects({wealth:cash,bond:damaged?1:2});s.career.reputation=Math.min(99,s.career.reputation+(damaged?2:4));
 syncWorldStories();s.worldStories[id].relationship='work';s.caseDecisions[id].rewarded=true;s.caseDecisions[id].cash=cash;
 s.communityReference={arc:id,until:s.year+4};
 const note='**해결 뒤의 보상:** '+CASE_STAKES[id].reward+' $'+cash+', 평판 +'+(damaged?2:4)+', 유대 +'+(damaged?1:2)+'. '+(damaged?'구조와 위험 차단의 공로는 남았지만, 파괴하거나 격리한 자료·장소와 미해결 문제도 남았다.':'사람과 기록을 지킨 공로가 남았다.')+' 당사자들과 연락을 이어 가며, 네 해 안의 다음 전문직 지원에 추천을 받을 수 있다.';
 s.result+='\n\n'+note;addLog(note,true);
}
function installCaseStakes(){
 const init=initialiseRevision;initialiseRevision=function(r){r=init(r);if(!r.caseDecisions){r.caseDecisions={};for(const id of Object.keys(CASE_STAKES)){const result=id==='nora'?r.resolution:r.investigations?.[id]?.resolution;if(result)r.caseDecisions[id]={mode:'legacy',rewarded:false}}}return r};if(s&&!s.caseDecisions){s.caseDecisions={};for(const id of Object.keys(CASE_STAKES))if(completedArcResult(id))s.caseDecisions[id]={mode:'legacy',rewarded:false}};
 const current=currentEvent;currentEvent=function(){const e=current();if(!e||!isInvestigation()||s.result||exclusiveMadness())return e;return {...e,choices:[...e.choices.filter(c=>c.episodeOutcome!=='withdrawn'&&c.resolution!=='withdrawn'),{text:'$15를 들여 자료와 대피 준비를 담당자들에게 넘기고 현장 조사에서 물러난다. 구조와 완전한 해결은 보장되지 않으며, 세 해 동안 추가 생활비가 매년 $1 든다.',wealth:-15,caseExit:'handoff'},{text:'확인한 위험을 신고하고 직접 조사를 끝낸다. 현장은 통제되지만 찾지 못한 사람과 원인은 미해결로 남는다. 세 해 동안 추가 생활비가 매년 $3 든다.',caseExit:'report'}]}};
 const chooseBase=choose;choose=function(i){const c=currentEvent()?.choices[i];if(c?.caseExit&&!s.ended&&!s.result&&choiceAvailable(c))return caseExit(currentArcId(),c.caseExit);return chooseBase(i)};
 const after=afterCrisisChoice;afterCrisisChoice=function(e,c,ok,oldSan){const id=isInvestigation()?currentArcId():null;after(e,c,ok,oldSan);if(id&&ok)rewardCaseResolution(id)};
 const follow=lifeFollowupEvent;lifeFollowupEvent=function(id,stage){const e=follow(id,stage),w=s.worldStories[id];if(!w?.exitMode)return e;return {...e,text:e.text+'\n\n'+(w.exitMode==='handoff'?'당신이 사본과 대피 준비를 넘긴 뒤 담당자들이 현장 통제를 이어 갔다.':'당신이 위험을 신고한 뒤 담당자들이 출입 통제를 맡았다.')+' 통제 밖의 생활은 이어지지만, 실종자의 귀환과 위험의 소멸은 아직 확인되지 않았다. 이 만남은 해결 축하가 아니라 남은 사람들의 생활과 수습을 위한 자리다.'}};
 const words=lifeAfterwords;lifeAfterwords=function(){return [...words(),...Object.entries(s.caseDecisions||{}).filter(([,v])=>['handoff','report'].includes(v.mode)).map(([id,v])=>LIFE_PROFILES[id].place+'에서는 '+(v.mode==='handoff'?'자료와 대피 준비를 넘기고 연락을 이어 갔다.':'위험을 신고하고 현장을 떠났다.')+' 출입 통제 뒤에도 실종자와 원인은 끝내 확인하지 못했다.')]};
}
