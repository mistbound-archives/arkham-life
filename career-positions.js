'use strict';
// 직업의 정체성(jobId/job)은 유지하고, 현재 맡은 자리만 경력으로 표시한다.
const CAREER_POSITIONS={
 researcher:[['연구 보조원','연구원','선임 연구원','연구 책임자'],['개인 연구실 연구자','개인 연구실 책임자','공동 연구 책임자','독립 연구소장'],'실험과 자료 검증','동료의 연구 일정과 검증'],
 reporter:[['수습 기자','취재 기자','선임 기자','취재부 책임자'],['독립 취재 기자','전업 독립 기자','공동 취재 책임자','독립 취재사 대표'],'취재와 기사 작성','후배의 취재와 지면 편성'],
 detective:[['탐정 조수','전담 탐정','선임 탐정','조사팀 책임자'],['탐정 사무소장','탐정 사무소장 · 단골 의뢰인 확보','탐정 사무소장 · 조사원 고용','탐정 사무소 대표'],'의뢰 조사와 현장 확인','조사원의 배치와 의뢰 수임'],
 doctor:[['수련 의사','진료 의사','선임 의사','진료과 책임자'],['개인 진료소 원장','개인 진료소 원장 · 정기 환자 확보','개인 진료소 원장 · 진료팀 운영','지역 진료소 대표 원장'],'환자의 진료와 경과 확인','동료 의료진과 진료 일정'],
 dealer:[['골동품점 점원','매입 담당자','선임 감정 담당자','점포 관리 책임자'],['골동품점 주인','골동품점 주인 · 단골 거래처 확보','골동품점 주인 · 직원 고용','골동품 상회 대표'],'매입과 물건 감정','거래처와 점포의 매입 장부'],
 librarian:[['도서관 보조 사서','사서','선임 사서','자료실 책임자'],['독립 자료 조사자','전업 자료 조사자','자료 조사실 책임자','독립 자료 조사소장'],'서가 정리와 열람 지원','자료의 수집과 열람 업무'],
 police:[['순경','선임 순경','순찰반장','수사반 책임자'],['사립탐정','사립탐정','사립탐정','사립탐정'],'순찰과 신고 처리','동료의 순찰 배치와 현장 대응'],
 mechanic:[['견습 수리공','수리공','선임 정비공','정비반장'],['수리점 주인','수리점 주인 · 단골 확보','수리점 주인 · 정비공 고용','정비소 대표'],'고장 진단과 수리','정비 순서와 작업 안전'],
 historian:[['사료 조사 보조원','역사 연구자','선임 역사 연구자','향토사 연구 책임자'],['향토사 연구실 연구자','향토사 연구실장','공동 사료 조사 책임자','독립 향토사 연구소장'],'사료 대조와 전승 조사','사료 조사와 공동 연구'],
 dockworker:[['하역 노동자','숙련 하역공','하역 조장','하역반장'],['하역 도급업자','하역 도급업자 · 고정 화주 확보','하역 도급반 책임자','하역 도급사 대표'],'화물 운반과 적재','작업자의 배치와 하역 안전'],
 cleaner:[['건물 관리 보조원','건물 관리인','관리반장','건물 관리 책임자'],['건물 관리업자','건물 관리업자 · 정기 계약 확보','건물 관리팀장','건물 관리업 대표'],'청소와 시설 점검','관리 구역과 작업 일정'],
 cultist:[['의식 보조자','의식 담당자','선임 의식 담당자','지부 의식 책임자'],['비밀 서재 운영자','비밀 서재 운영자 · 후원자 확보','비밀 연구 모임 책임자','비밀 서재 대표'],'의식 자료와 준비물 관리','의식 준비와 입문자의 배치'],
 fixer:[['조직의 심부름꾼','조직의 해결사','선임 해결사','조직의 현장 책임자'],['경호 사무소장','경호 사무소장 · 고정 의뢰 확보','경호팀 책임자','경호 사무소 대표'],'호위와 조직의 의뢰','호위 인력과 현장 교섭'],
 smuggler:[['운송 연락책','밀수 운송책','운송반 책임자','밀수망 조정자'],['비공식 운송업자','비공식 운송업자 · 고정 화주 확보','비공식 운송망 책임자','비공식 운송사 대표'],'화물 인계와 우회 운송','운송 인력과 화물의 인계'],
 outlawDoctor:[['비공개 진료소 협력 의사','비공개 진료 의사','선임 비공개 진료 의사','비공개 진료 책임자'],['비공개 진료소 원장','비공개 진료소 원장 · 후원 확보','비공개 진료팀 책임자','독립 비공개 진료소 대표'],'비공개 진료와 환자 경과 확인','진료팀과 후원자의 요구']
};
function careerPosition(raw=s){const d=CAREER_POSITIONS[raw.jobId];if(!d)return raw.job||'아직 성장 중';return d[raw.career?.mode==='independent'?1:0][clamp(Math.floor(Number(raw.career?.rank)||0),0,3)]}
function installCareerPositions(){
 const fork=careerForkEvent;careerForkEvent=function(){const e=fork(),d=CAREER_POSITIONS[s.jobId];if(!d)return e;const independent=s.career.mode==='independent',rank=clamp(s.career.rank||0,0,3),next=careerPosition({...s,career:{...s.career,rank:Math.min(3,rank+1)}});e.title=independent?'자기 일의 다음 걸음':'일터에서 맡게 될 자리';e.text='지금 당신은 **'+careerPosition()+'**로 '+d[2]+'을 맡고 있다. '+(independent?'기존 일을 계속 맡기려는 의뢰가 들어왔다. 일을 넓히려면 '+d[3]+'까지 직접 살펴야 한다.':'일터에서 더 많은 책임을 맡아 달라는 제안이 왔다. '+d[3]+'까지 맡을지, 자기 일을 시작할지 생각할 때다.');
 e.choices=e.choices.filter(c=>!c.promote||rank<3).map(c=>c.promote?{...c,text:'**'+next+'**의 자리를 맡는다.',success:'**'+next+'**로 자리를 옮겼다. '+d[3]+'을 맡으며 보수와 책임이 함께 늘었다.'}:c.independent?{...c,text:(s.jobId==='police'?'경찰을 떠나 탐정 사무소를 연다.':careerPaths[s.jobId][0]+'을 시작한다.')+' 준비 비용 $60.',success:'**'+careerPosition({...s,jobId:s.jobId==='police'?'detective':s.jobId,career:{...s.career,mode:'independent',rank:s.jobId==='police'?0:rank}})+'**로 자기 일을 시작했다. 고객과의 약속, 수입과 운영비를 직접 책임진다.'}:!c.switchJob?{...c,text:independent?'지금의 규모로 일을 이어간다.':'지금 맡은 자리에서 일을 이어간다.',success:'**'+careerPosition()+'**로 익숙한 일을 이어가기로 했다.'}:c);
 if(independent&&rank<3)e.choices.unshift({text:'**'+next+'**로 일의 규모를 넓힌다.',promote:true,careerRep:3,minReputation:30,success:'**'+next+'**로 역할이 넓어졌다. '+d[3]+'을 직접 챙기며 수입과 운영 책임을 함께 맡는다.'});return e};
 const profile=renderProfile;renderProfile=function(){return profile().replace(' · '+escapeHTML(s.job||'아직 성장 중')+'</p>',()=> ' · '+escapeHTML(careerPosition())+'</p>').replace(/경력 \d+단계/,()=>escapeHTML(careerPosition()))};
 const stats=renderStats;renderStats=function(){return stats()+(s.job?'<p class="career-position"><small>'+escapeHTML(s.job)+'</small><br><strong>'+escapeHTML(careerPosition())+'</strong></p>':'')};
 const available=choiceAvailable;choiceAvailable=function(c){return !(c.promote&&(s.career.rank>=3||!CAREER_POSITIONS[s.jobId]))&&available(c)};
 const links=applyLifeLinks;applyLifeLinks=function(e,c,ok){const before=careerPosition(),job=s.jobId,mode=s.career.mode;links(e,c,ok);if((c.promote||c.independent)&&s.jobId&&(before!==careerPosition()||mode!==s.career.mode||job!==s.jobId)){s.careerMilestones||=[];s.careerMilestones.push({year:s.year,id:s.jobId,from:before,to:careerPosition(),mode:s.career.mode});}};
 const note=noteCareerJourney;noteCareerJourney=function(){note();const last=s?.careerJourney?.at(-1);if(last&&last.id===s.jobId)last.position=careerPosition()};
 const build=buildLifeRecord;buildLifeRecord=function(ending){const r=build(ending),rows=s.careerMilestones||[];if(rows.length)r.sections.push({title:'일터에서 달라진 자리',text:rows.map(x=>x.year+'년, '+x.from+'에서 '+x.to+'로 '+(x.mode==='independent'?'자기 일의 책임을 넓혔다.':'맡는 자리가 바뀌었다.')).join(' ')});r.careerMilestones=rows.map(x=>({...x}));return r};
}
