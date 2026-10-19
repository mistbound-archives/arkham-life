'use strict';
let finalEvidenceCheck=null;
function finalEvidencePlan(raw=s){
 const p=raw?.pending;if(!['case','investigation'].includes(p?.kind))return null;
 const arc=p.kind==='case'?'nora':p.arc,chapters=arc==='nora'?caseEvents:arcById(arc)?.chapters;
 if(!chapters||p.index!==chapters.length-1)return null;
 const pool=[...new Set(chapters.slice(0,-1).flatMap(e=>e.choices.map(c=>c.evidence)).filter(Boolean))];
 const held=new Set(raw.evidence||[]),used=pool.filter(id=>held.has(id));
 return {arc,total:pool.length,used,bonus:pool.length?Math.floor(20*used.length/pool.length):0};
}
function installFinalEvidence(){
 const chooseBase=choose;choose=function(index){
  const previous=finalEvidenceCheck,c=currentEvent()?.choices[index];
  const plan=s&&!s.ended&&!s.result&&c&&choiceAvailable(c)&&c.skill&&!c.defer&&!c.caseExit&&!c.professionalRecovery&&!c.acuteStabilize&&!c.acuteSupport?finalEvidencePlan():null;
  finalEvidenceCheck=plan?.bonus?{...plan,skill:c.skill}:null;
  try{return chooseBase(index)}finally{finalEvidenceCheck=previous}
 };
 const check=skillCheck;skillCheck=function(id,difficulty=1,penalty=0){
  const plan=finalEvidenceCheck?.skill===id?finalEvidenceCheck:null;
  if(!plan)return check(id,difficulty,penalty);
  const ok=check(id,difficulty,penalty-plan.bonus),r=s.lastRoll;
  if(r){r.penalty+=plan.bonus;r.evidenceBonus=plan.bonus;r.evidenceArc=plan.arc;r.evidenceUsed=[...plan.used];r.evidenceTotal=plan.total;
   const baseline=Math.min(95,Math.max(1,Math.floor(Math.max(1,r.value+(r.careerBonus||0)-r.penalty)/r.difficulty)));r.evidenceTargetGain=r.target-baseline;
   const last=s.actionRolls?.at(-1);if(last)Object.assign(last,{penalty:r.penalty,evidenceBonus:r.evidenceBonus,evidenceArc:r.evidenceArc,evidenceUsed:[...r.evidenceUsed],evidenceTotal:r.evidenceTotal,evidenceTargetGain:r.evidenceTargetGain});
  }return ok;
 };
 const description=rollDescription;rollDescription=function(){const r=s?.lastRoll;return description()+(r?.evidenceBonus?' · 증거 활용 +'+r.evidenceBonus+' (확보 '+r.evidenceUsed.length+'/'+r.evidenceTotal+' · 판정 기준 +'+r.evidenceTargetGain+')':'')};
 const dice=renderDice;renderDice=function(){const html=dice(),r=s?.lastRoll;if(!html||!r?.evidenceUsed?.length)return html;return html+'<details class="evidence-check"><summary>최종 대응에 활용한 증거</summary><p>'+r.evidenceUsed.map(id=>escapeHTML(evidenceNames[id]||id)).join(' · ')+'</p></details>'};
 const failed=renderFailedFinalCheck;renderFailedFinalCheck=function(){const html=failed(),r=s?.critical?.failedAttempt?.roll;if(!html||!r?.evidenceBonus)return html;return html+'<p class="evidence-check">증거 활용 +'+Number(r.evidenceBonus)+' · 판정 기준 +'+Number(r.evidenceTargetGain)+' · '+r.evidenceUsed.map(id=>escapeHTML(evidenceNames[id]||id)).join(' · ')+'</p>'};

}
