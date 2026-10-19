'use strict';
// 사건을 맡은 당시의 관계와 생활상의 이해관계를 고정해, 이직 뒤에도 동기가 바뀌지 않게 한다.
function makeCaseMotivation(id,r){
 const job=r.jobId,parent=r.parentJob,family=r.family;
 const m=(kind,reason,intro)=>({kind,reason,intro,year:r.year,jobId:job||null,family,parentJob:parent});
 switch(id){
 case 'nora':return m('family','숙부가 남긴 미완의 부탁이고, 일기에 적힌 사람은 실제로 찾아가 경고할 수 있다. 유품을 받은 당신이 먼저 사실을 확인할 위치에 있다.',null);
 case 'debt':return m('personal','차용증에 적힌 것은 당신의 서명과 가족의 물건이다. 사실을 확인하지 않으면 빚을 인정하지 않아도 가족의 살림과 신원을 위협받는다.',null);
 case 'factory':{
  const relation=parent==='factoryworker'?'루이스는 부모와 같은 교대에서 일하던 사람이다.':family==='worker'?'루이스는 일감이 끊길 때 당신 집안과 일을 나눠 온 이웃이다.':job==='mechanic'?'당신이 맡은 정비 의뢰의 담당자가 루이스다.':job==='police'?'루이스가 낸 실종 신고가 당신의 확인 업무로 넘어왔다.':'루이스는 실종 동료를 찾는 정식 수색 의뢰를 당신에게 맡기러 왔다.';
  return m('work',relation+' 루이스는 메이가 돌아올 때까지 마지막 배치라도 알아보겠다며 당신을 찾아왔다.',relation+' 그는 동료 메이의 급여 봉투와 장갑을 내민다. 메이가 야간 정비 뒤 사라졌는데 감독이 고용 사실부터 부인한다고 한다. 그는 봉투의 날짜를 짚으며 출근부를 함께 확인해 달라고 한다.');}
 case 'patient':{
  const relation=job==='doctor'?'앨런은 당신에게 진료받던 환자의 보호자다.':family==='medical'?'앨런은 의료 일을 하는 가족이 오랫동안 안부를 묻던 환자의 보호자다.':'앨런은 요양처를 알아보던 당신에게 병원 사정을 알려 주던 사람이다.';
  return m(job==='doctor'?'work':family==='medical'?'family':'personal',relation+' 그가 소개한 병원의 기록이 어긋나 있어, 환자의 안전뿐 아니라 당신과 가족이 믿고 의지할 진료처인지도 확인해야 한다.',relation+' 그는 동생의 퇴원증과 병원의 재원 확인서를 가지고 찾아왔다. 집에 돌아온 동생이 가족의 이름을 모르고, 잠결에 한 번도 가 본 적 없는 바다 이야기를 한다며 도움을 청한다. 이미 이야기를 나누던 사람의 부탁이라 단순한 병원 소문으로 넘기기 어렵다.');}
 case 'press':{
  const relation=job==='reporter'?'편집부가 당신에게 동료 기자 오언의 행방과 누락 기사의 확인을 맡겼다.':job==='librarian'?'당신이 관리하는 열람 자료를 취재에 쓴 기자 오언이 사라졌고, 대출 기록까지 빈칸이 되었다.':job==='researcher'?'당신이 자료를 검토해 준 기자 오언이 사라졌고, 기사에서 당신이 확인했던 대목까지 지워졌다.':'지역 기록을 확인할 때 자료를 주고받던 인쇄공 베아트리스가 찾아왔다.';
  return m('work',relation+' 침묵하면 동료의 행방과 함께 당신이 맡아 확인한 기록도 사라진 채 남는다.',relation+' 인쇄소 교정공 베아트리스가 오언의 교정쇄와 발행된 신문을 가져왔다. 강변 재개발 기사가 실려야 할 면이 비어 있다. 그녀는 원고를 쓴 사람이 사라진 일과 같은 원인인지 함께 확인해 달라고 부탁한다.');}
 case 'boarding':{
  const relation=r.wealth<=80?'생활비를 줄일 방을 알아보던 당신은 소개받은 클라라의 하숙집을 보러 갔다.':job==='doctor'?'세입자들을 왕진하러 드나들던 클라라의 하숙집에서 연락이 왔다.':job==='cleaner'?'당신에게 건물 점검을 맡긴 하숙집 주인 클라라가 연락해 왔다.':job==='detective'?'클라라가 세입자 조지를 찾는 수색 의뢰를 당신에게 맡겼다.':'도서관에서 책을 빌려 가던 세입자 조지가 돌아오지 않아, 하숙집 주인 클라라에게 안부를 물으러 갔다.';
  return m(r.wealth<=80?'personal':'work',relation+' 당신의 거처나 이미 맡은 일과 연결된 집이다. 그곳에 사람이 남아 있는지 확인해야 다음 생활을 결정할 수 있다.',relation+' 조지의 짐은 그대로인데 그는 사라졌고, 잠가 둔 방에서 다음 달 집세 봉투가 발견되었다. 클라라는 경찰에 마지막 행적을 전할 자료가 없다며 방과 봉투를 함께 확인해 달라고 한다.');}
 case 'beacon':{
  const relation=job==='dockworker'?'다음 하역에 들어올 배가 강 하구의 신호 이상 때문에 묶였다.':job==='mechanic'?'당신에게 강 하구 신호기의 점검 작업이 배정되었다.':job==='reporter'?'편집부가 강 하구의 선박 실종과 운항 중단을 취재하라고 당신을 보냈다.':job==='police'?'강 하구 예인선의 실종 신고가 들어와 당신이 신호소 기록 확인을 맡았다.':parent==='dockworker'?'항만에서 일한 부모의 오랜 동료 헤스터가 당신 집안에 연락해 왔다.':'가족이 이용하려던 강 하구의 항로가 선박 실종으로 멎어, 당신이 운항 사정을 확인하러 갔다.';
  return m(['dockworker','mechanic','reporter','police'].includes(job)?'work':'family',relation+' 배를 다시 보내도 되는지 모르면 생계와 가족의 안전을 걸어야 한다.',relation+' 신호수 헤스터는 안개철마다 오래전 침몰한 우편선의 호출 부호가 들린다고 일지를 내민다. 다시 배를 보내기 전에 누구의 신호인지 기록부터 맞춰 달라는 부탁이다.');}
 case 'orchard':{
  const relation=job==='doctor'?'과수원 일꾼들이 당신에게 같은 쇠약 증상을 호소해 왔다.':family==='medical'?'의료 일을 하는 가족이 과수원 일꾼들의 잇따른 쇠약을 걱정해 당신에게 표본 확인을 부탁했다.':family==='merchant'||job==='dealer'?'당신 집안이나 일터가 거래하는 루스 과수원의 수확물에 이상이 생겼다.':job==='dockworker'?'당신의 다음 하역 물량인 루스 과수원의 과일이 안전 문제로 보류되었다.':'당신에게 루스 과수원의 철 지난 수확과 토양을 비교하는 조사 업무가 맡겨졌다.';
  return m('work',relation+' 원인을 모른 채 일을 재개하면 일꾼과 거래처가 함께 위험해지고, 당신이 확인해야 할 안전 문제도 남는다.',relation+' 주인 루스가 과일 상자와 일꾼들의 진료 메모를 가져왔다. 서리가 내린 뒤에도 한 구역에서만 열매가 익고 그곳에서 일한 사람들의 체온이 낮아진다. 출하를 멈춘 채 무엇부터 확인해야 할지 묻는다.');}
 case 'portrait':{
  const relation=job==='reporter'?'당신의 기사에 사진을 납품하던 아이리스가 촬영을 중단했다.':job==='researcher'||job==='librarian'?'당신의 자료 촬영을 맡아 온 사진사 아이리스가 원본과 기록의 대조를 부탁했다.':job==='dealer'?'당신에게 중고 렌즈의 출처를 확인해 달라는 사후 문의가 들어왔다.':job==='detective'?'사진사 아이리스가 조수의 이상 행동과 촬영 기록의 확인을 정식으로 의뢰했다.':parent==='journalist'?'기자로 일한 부모와 오래 거래한 사진사 아이리스가 가족에게 도움을 청했다.':'가족사진을 맡겼던 아이리스에게 인화지를 받으러 갔다가 촬영 일지가 어긋난다는 이야기를 들었다.';
  return m(parent==='journalist'?'family':'work',relation+' 사진의 진위를 확인하지 않으면 당신이 쓰거나 전달할 자료까지 믿을 수 없고, 기다리는 조수의 안전도 확인할 수 없다.',relation+' 그녀는 시험 인화지와 촬영 일지를 내민다. 중고 렌즈를 쓴 뒤 촬영한 적 없는 거리 사진이 섞여 나온다며, 건판 보관상의 실수인지 함께 확인해 달라고 한다.');}
 case 'burial':{
  const relation=family==='fallen'?'당신 가족의 옛 묘역이 이장 대상에 들어가, 관리인 오스틴에게 작업 내역을 확인하러 갔다.':parent==='estatekeeper'?'저택을 관리하던 부모가 맡았던 집안의 묘역에서 이장 문제가 생겼다.':job==='doctor'?'이장 인부의 이상 증상에 대한 진료 확인을 맡았는데, 환자 벤이 현장에서 돌아오지 않았다.':job==='detective'||job==='police'?'이장 인부 벤의 실종 수색을 당신이 맡았다.':job==='cleaner'?'묘역의 계단과 환기 시설을 점검하는 일이 당신에게 맡겨졌다.':'가족 묘역의 수리 때문에 오스틴과 연락하던 당신은 이장 공사 중 사람이 사라졌다는 소식을 들었다.';
  return m(family==='fallen'||parent==='estatekeeper'?'family':'work',relation+' 기다리던 사람의 구조와 묘역의 안전을 확인해야 맡은 일을 마칠 수 있다.',relation+' 오스틴은 이장 작업표와 옛 지도를 내민다. 야간 인부 벤이 점검 뒤 사라져 가족과 경찰에 알렸지만, 안전하게 내려갈 통로를 찾지 못했다고 한다. 더 파기 전에 마지막 작업 장소부터 함께 확인해 달라는 부탁이다.');}
 default:return m('personal','당신에게 맡겨진 기록과 현장의 안전을 먼저 확인할 필요가 있다.',null);
 }
}
function caseMotivation(id,raw=s){raw.investigationMotives||={};return raw.investigationMotives[id]||(raw.investigationMotives[id]=makeCaseMotivation(id,raw))}
function motivatedText(text,id){const m=caseMotivation(id);return m.intro?npcText(m.intro)+'\n\n'+text.split('\n\n').slice(1).join('\n\n'):text}
function renderCaseMotivation(){if(!s||!isInvestigation())return '';const m=caseMotivation(currentArcId());return '<aside class="case-motivation"><strong>이 일을 맡은 이유</strong><p>'+formatProse(npcText(m.reason))+'</p></aside>'}
function installMotivationHooks(){
 const oldInit=initialiseRevision;initialiseRevision=function(r){const out=oldInit(r);out.investigationMotives||={};return out};if(s)s.investigationMotives||={};
 const oldStart=startEncounter;startEncounter=function(id){caseMotivation(id);oldStart(id);addLog('이 일을 맡은 이유 — '+caseMotivation(id).reason)};
 const oldCurrent=currentEvent;currentEvent=function(){const e=oldCurrent();if(!e||!isInvestigation()||s.pending.index!==0||s.result)return e;return {...e,text:motivatedText(e.text,currentArcId())}};
 const oldChapter=chapterText;chapterText=function(i){const text=oldChapter(i);return i===0?motivatedText(text,'nora'):text};
 const oldNew=newChapterText;newChapterText=function(){const text=oldNew();return s.pending.index===0?motivatedText(text,s.pending.arc):text};
}
// 도입 기록도 화면의 전달 경위와 같게 유지한다.
for(const arc of newInvestigations)arc.reason=r=>{const m=caseMotivation(arc.id,r);return m.intro||m.reason};
