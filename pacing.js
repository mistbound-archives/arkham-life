'use strict';
function restoreFieldPacing(raw){
 const p=raw.pending;if(raw.fieldContinuation||!raw.result||raw.ended||raw.critical||raw.hospital||raw.deferredCase||raw.professionalInterlude||!['case','investigation'].includes(p?.kind)||p.index<1)return raw;
 const id=p.kind==='case'?'nora':p.arc,record=raw.investigations?.[id],resolved=id==='nora'?raw.resolution:record?.resolution,next=id==='nora'?raw.caseStage:record?.stage;
 if(!resolved&&next>p.index){raw.fieldContinuation={arc:id,from:p.index,next,year:raw.year};if(id==='nora')raw.caseDue=raw.year;else record.due=raw.year}return raw;
}
function installScenePacing(){
 const init=initialiseRevision;initialiseRevision=raw=>restoreFieldPacing(init(raw));if(s)restoreFieldPacing(s);

 const chooseBase=choose;choose=function(i){const before=s?.pending?{...s.pending}:null,c=currentEvent()?.choices[i],year=s?.year,id=isInvestigation()?currentArcId():null;
 const out=chooseBase(i);
 if(!id||!c||!s.result||s.ended||s.critical||s.hospital||s.year!==year||c.defer||c.madnessAction||c.professionalRecovery||c.caseExit||s.professionalInterlude||arcIsResolved(id)||!isInvestigation())return out;
 const next=id==='nora'?s.caseStage:arcState(id)?.stage;if(!(next>before.index))return out;
 if(before.index===0){if(id==='nora')s.caseDue=year+1;else arcState(id).due=year+1}
 else {s.fieldContinuation={arc:id,from:before.index,next,year};if(id==='nora')s.caseDue=year;else arcState(id).due=year;s.result+='\n\n'+({nora:'모은 단서가 다음 확인으로 이어진다. 이번 수색을 마치기 전, 같은 해에 현장을 더 살핀다.',factory:'기계 안에 사람이 남아 있다. 정지 지점을 확인한 지금 구조를 이어가야 한다.',debt:'원장의 이름이 변하고 있다. 사본을 확보한 지금 원본과 증인을 확인하러 움직인다.',patient:'기억의 연결이 남아 있는 동안 환자를 옮겨야 한다. 같은 날 다음 대응을 준비한다.',press:'다음 인쇄가 시작되기 전에 복원 자료를 전달해야 한다. 연락을 이어 마지막 작업으로 넘어간다.',boarding:'열려 있는 통로를 놓치기 전에 세입자의 이름을 확인하고 안쪽으로 향한다.',beacon:'안개 속 호출이 이어진다. 확인한 순서대로 다음 신호에 대응한다.',orchard:'수로를 확인한 일꾼들이 경계 밖에서 기다린다. 뿌리가 다시 물을 받기 전에 차단을 이어간다.',portrait:'가림막을 닫을 순서를 확인했다. 노출이 바뀌기 전에 조수를 되찾을 준비를 한다.',burial:'지하에서 신호가 들리는 동안 구조를 이어가야 한다. 확인한 통로로 다음 대응에 들어간다.'}[id]);}
 save();render();return out;
 };
 const advanceBase=advance;advance=function(){const p=s?.fieldContinuation;if(p){const valid=!s.ended&&!s.critical&&!s.hospital&&s.result&&isInvestigation()&&s.year===p.year&&currentArcId()===p.arc&&s.pending.index===p.from&&!arcIsResolved(p.arc)&&!s.deferredCase;s.fieldContinuation=null;if(valid){s.pending=p.arc==='nora'?{kind:'case',index:p.next}:{kind:'investigation',arc:p.arc,index:p.next};s.result=null;s.resultOutcome=null;s.sceneSnapshot=null;s.resultDelta=null;s.lastRoll=null;s.actionRolls=[];s.lastImpact=null;s.progress=0;s.careMessage=null;lastTick=performance.now();save();render();return true}}return advanceBase()};
 const postpone=postponeInvestigation;postponeInvestigation=function(...args){s.fieldContinuation=null;return postpone(...args)};
 const admit=admitHospital;admitHospital=function(){const pending=s.fieldContinuation;s.fieldContinuation=null;const out=admit();if(!out)s.fieldContinuation=pending;return out};
 const current=currentEvent;currentEvent=function(){const e=current();if(!e||!isInvestigation()||s.pending.index<1||s.result)return e;return {...e,choices:e.choices.map(c=>c.defer?{...c,text:'일단 현장을 벗어나 자료를 정리하며 몸과 마음을 추스른다. 조사는 다음 해로 미뤄지고, 남겨 둔 사람과 현장이 마음에 걸린다.'}:c)}};
 const clock=updateClock;updateClock=function(){clock();if(s?.fieldContinuation&&s.result&&!s.ended){$('clock-state').textContent=settings.paused?'일시정지 · 현장 기록':'현장 기록을 읽는 중 · 다음 장면도 같은 해';$('year-progress').setAttribute('aria-label','다음 현장 장면까지의 시간')}else $('year-progress').setAttribute('aria-label','올해의 시간')};
}
