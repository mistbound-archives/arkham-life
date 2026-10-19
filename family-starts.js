'use strict';
const FAMILY_STARTS={
 university:{name:'책과 배움의 울타리',description:'집안의 자료와 학업 지원이 배움의 길을 넓혀 준다.',san:0,guard:0,training:{}},
 merchant:{name:'거래처로 이어진 생활',description:'가게의 자금과 거래 관계가 첫 진로와 생활을 뒷받침한다.',san:0,guard:0,training:{}},
 medical:{name:'돌봄을 배울 여유',description:'집안의 생활 여유와 의료 분야의 연결이 학업과 진로를 뒷받침한다.',san:0,guard:0,training:{}},
 worker:{name:'서로 기대며 버틴 날들',description:'작업과 심부름을 나누고 이웃의 도움을 받으며 자란다. 돌발 상황에서 마음을 붙들 실마리와 손으로 익히는 기초가 남는다.',san:8,guard:1,training:{운동:3,손재주:3}},
 fallen:{name:'줄어든 살림 속의 침착함',description:'형편이 달라지는 가운데 어른들의 말과 표정을 살피며 생활을 꾸린다. 남아 있는 인맥과 함께 마음을 추스를 바탕이 남는다.',san:5,guard:1,training:{설득:3,관찰:3}}
};
function familyStartDefinition(raw=s){return FAMILY_STARTS[raw.family]||FAMILY_STARTS.worker}
function applyFamilyStart(){if(s.familyStartApplied)return false;const def=familyStartDefinition();s.familyStartApplied=true;s.familyStartOrigin='new';s.maxSan=Math.min(99,s.maxSan+def.san);s.san=Math.min(s.maxSan,s.san+def.san);for(const [id,gain] of Object.entries(def.training))learnSkill(id,gain,'성장 환경 · '+def.name);addLog('성장 환경 — '+def.name+'. '+def.description+(def.san?' 이성의 바탕 +'+def.san+'.':'')+(def.guard?' 평소 공포 손실 1 완화.':'')+(Object.keys(def.training).length?' 기초 기능: '+Object.entries(def.training).map(([id,gain])=>id+' +'+gain).join(' · ')+'.':''),true);return true}
function installFamilyStarts(){
 const init=initialiseRevision;initialiseRevision=function(raw){raw=init(raw);if(raw.familyStartApplied===undefined){raw.familyStartApplied=false;raw.familyStartOrigin='legacy'}return raw};
 const startBase=start;start=function(){startBase();applyFamilyStart();save();render()};
 const sum=traitSum;traitSum=function(key,raw=s){return sum(key,raw)+(key==='stressGuard'?familyStartDefinition(raw).guard:0)};
 const personal=renderPersonalTraits;renderPersonalTraits=function(){const def=familyStartDefinition(),legacy=s.familyStartOrigin!=='new';return personal()+'<section class="personal-traits family-background"><div><small>성장 환경</small><strong>'+escapeHTML(def.name)+'</strong><p>'+escapeHTML(def.description)+'</p><p>'+[def.guard?'평소 공포 손실 −1':'집안의 기존 재산·학업·진로 지원',!legacy&&def.san?'출생 시 이성 바탕 +'+def.san:'',!legacy&&Object.keys(def.training).length?'출생 기초 '+Object.entries(def.training).map(([id,gain])=>id+' +'+gain).join(' · '):''].filter(Boolean).join(' · ')+'</p></div></section>'};
}
