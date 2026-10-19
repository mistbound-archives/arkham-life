'use strict';
const PASSIVE_YEAR_STATES=new Set(['studyYear','inpatient','recuperation']);
function waitingForDecision(){return Boolean(s?.pending&&!s.result&&!PASSIVE_YEAR_STATES.has(s.pending.kind))}
function repairEducationTransition(){
 if(!s||s.ended||s.result)return false;
 const kind=s.pending?.kind;
 if(kind==='college'&&!s.education.enrolled){s.pending={kind:'career'};s.careerApplicationDue=null;s.careMessage='학업 이후의 진로 선택으로 이어집니다.';return true}
 if(kind==='educationDecision'&&s.education.considered&&!s.education.enrolled){s.pending={kind:'career'};s.careMessage='학교 이후의 진로 선택으로 이어집니다.';return true}
 return false;
}
function installFlowRepair(){
 const renderBase=render;render=function(){if(repairEducationTransition())save();if(s&&s.pending&&!s.result&&PASSIVE_YEAR_STATES.has(s.pending.kind)){s.result={studyYear:'정해 둔 공부와 단기 일을 이어가는 해다. 준비 기간이 끝나면 다음 진로를 정한다.',inpatient:'입원 치료를 이어가는 해다. 치료 기간과 바깥 사건의 시간은 계속 흐른다.',recuperation:'치료와 휴식을 마치고 다음 기록을 기다린다.'}[s.pending.kind];s.resultOutcome='neutral'}const out=renderBase();const button=document.getElementById('continue-record');if(button)button.onclick=()=>advance();return out};
}

