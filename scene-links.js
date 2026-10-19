'use strict';
const SCENE_ARRIVALS={
 nora:{1:'숙부가 적은 날짜와 이름을 확인하려 강변 7번 창고로 향했다.',2:'화물의 마지막 행선지를 따라 대학 서가에서 해당 책과 주석을 찾아본다.',3:'주석의 관측 번호를 들고 천문대에서 실행 시점을 확인하려 한다.',4:'관측과 구절을 맞춘 자료를 챙겨, 문이 열리는 밤 창고로 돌아왔다.'},
 factory:{1:'교대 기록이 가리킨 지하 작업장에 도착했다. 이제 기록과 실제 기계를 맞춰 볼 차례다.',2:'확인한 정지 지점과 통로를 바탕으로, 기계 안에 남은 사람을 데려올 준비를 한다.'},
 debt:{1:'서명과 공증 흔적을 따라 옛 대부 사무실의 원장을 확인하러 왔다.',2:'사본과 증언을 챙겨 원장 앞에 섰다. 가족의 이름을 되찾되 다른 사람에게 피해를 넘기지 않을 방법을 실행해야 한다.'},
 patient:{1:'서류에서 확인한 병동과 검사 번호를 가지고 마지막 실험이 이뤄진 곳을 찾았다.',2:'환자와 장치의 연결을 살핀 내용을 바탕으로, 누구를 언제 옮길지 정하고 실험을 멈추려 한다.'},
 press:{1:'남아 있는 기사와 납품 기록을 따라 원판을 확인할 인쇄소로 왔다.',2:'챙긴 원고와 인쇄 자료를 작업대에 펼쳤다. 기록을 복원하면서 취재원의 신원을 지킬 순서를 정한다.'},
 boarding:{1:'방과 봉투에서 얻은 흔적을 임대 장부와 옛 도면에 맞춰 보기 위해 안쪽 복도로 향했다.',2:'확인한 문틀과 이름의 연결을 바탕으로 조지를 부를 위치와 되돌아올 길을 정한다.'},
 beacon:{1:'호출 일지에서 확인한 시각을 시험 해도와 회전등에 맞춰 보러 신호소에 왔다.',2:'확인한 신호 순서와 눈금을 곁에 두고, 다음 호출이 오기 전에 대응을 준비한다.'},
 orchard:{1:'수확물과 일꾼들의 기록이 겹친 구역에 도착했다. 물길과 뿌리의 반응을 대조하려 한다.',2:'배수와 뿌리를 살핀 내용을 가지고 경계에 섰다. 일꾼들을 먼저 옮기고 중심으로 가는 물을 끊어야 한다.'},
 portrait:{1:'시험 인화지와 촬영 일지를 챙겨 현상소의 가림막과 원본 건판을 대조하러 왔다.',2:'노출 반응을 살핀 기록을 펼쳤다. 다니엘의 상과 실체를 맞출 순서를 실행할 때다.'},
 burial:{1:'작업표와 옛 지도를 들고 마지막 신호가 들린 통로를 확인하러 내려왔다.',2:'표시한 환기 통로와 석회선을 따라 구조 위치를 정한다. 벤을 올린 뒤 경계를 복구해야 한다.'}
};
function initialiseSceneLinks(raw){raw.sceneLinks||={};raw.mapVisits||={};raw.cityNews||=[];raw.cityNewsKeys||={};return raw}
function sceneLinkIntro(id,index){const row=s.sceneLinks?.[id]?.[index];if(!row||!SCENE_ARRIVALS[id]?.[index])return '';const clue=row.evidence&&evidenceNames[row.evidence]?' 챙겨 둔 **'+evidenceNames[row.evidence]+'**도 함께 가져왔다.':'';return npcText(row.detail+(row.ok?'':' 아직 확인이 덜 된 부분은 남아 있다. 같은 접근을 반복하기보다 남은 자료와 다른 사람의 확인을 함께 구해야 한다.')+clue+'\n\n'+SCENE_ARRIVALS[id][index])}
function linkedSceneText(text,id,index){const intro=sceneLinkIntro(id,index);return intro&&!text.startsWith(intro)?intro+'\n\n'+text:text}
const CITY_RETURN_NEWS={
 nora:'7번 창고에서 사람이 돌아왔다는 소식이 전해졌다. 남은 화물과 출입 기록은 따로 확인하고 있다.',factory:'야간 작업자들의 귀환과 위험 설비의 정지가 확인됐다. 작업 재개 전 안전 점검이 남았다.',debt:'피해 가족들이 되찾은 이름으로 신분 서류를 고치기 시작했다. 공증 창구에는 확인 신청이 쌓였다.',patient:'환자와 보호자들이 기억을 맞추는 회복 기록을 시작했다. 해당 병동의 실험은 중단됐다.',press:'복원한 기록이 독자들에게 전달됐다. 인쇄소들은 취재원 이름을 가린 사본을 따로 보관했다.',boarding:'하숙집에서 돌아온 사람들의 새 거처를 알아보고 있다. 빈 방의 임대는 당분간 보류됐다.',beacon:'돌아온 선원들의 명부를 확인하고 있다. 신호소와 항로는 시험 운항을 거쳐 다시 열 예정이다.',orchard:'일꾼들의 회복 소식이 전해졌다. 위험한 수확물은 폐기하고 밭과 우물은 점검을 이어 간다.',portrait:'현상소에서 돌아온 사람의 안부가 전해졌다. 위험한 렌즈와 보통 장비를 분리해 목록을 만들었다.',burial:'구조된 인부가 지상에서 회복 중이다. 묘역은 경계를 점검할 때까지 굴착을 멈췄다.'
};
function addCityNews(key,id,text,year=s.year){if(s.cityNewsKeys[key])return;s.cityNewsKeys[key]=true;s.cityNews.push({key,arc:id,year,text:npcText(text)});addLog('지역 소식 — '+text,true)}
function syncCityNews(){if(!s)return;initialiseSceneLinks(s);for(const id of Object.keys(CITY_SITES)){const result=completedArcResult(id);if(!result)continue;const kind=lifeOutcomeKind(id,result),place=CITY_SITES[id].name;
 const text=kind==='catastrophe'?place+' 주변에 재앙 피해가 남았다. 훼손된 구역은 출입을 막고 남은 사람의 행방과 피해를 확인하고 있다.':kind==='withdrawn'||kind==='contained'?place+'에서는 '+CASE_STAKES[id].limit+'하는 통제가 이어진다. 현상의 근본 원인과 확인하지 못한 사람의 행방은 미해결로 남았다.':kind==='destroyed'?place+'에서 위험을 끊는 과정에 현장과 자료 일부가 사라졌다. 남은 사람들은 잔해와 소실 기록을 정리하고 있다.':kind==='complicit'?place+'의 일상 일부는 재개됐지만 타협의 대가를 둘러싼 질문이 남았다. 당사자들은 남은 피해의 확인을 요구한다.':CITY_RETURN_NEWS[id];addCityNews('outcome:'+id+':'+result,id,text,arcState(id)?.finished||s.worldStories?.[id]?.queued||s.year);
 const w=s.worldStories?.[id];if(w?.regionChoice){const messages={rebuild:'주민들이 복구·관리 계획과 부담할 비용에 합의했다. 작업과 지원은 이제부터 이어진다.',protect:'사생활을 가린 기록 공개와 지원 창구의 절차가 마련됐다.',contract:'복구·관리 실무를 맡을 유급 일감이 정해졌다.',leave:'수습을 남은 담당자들이 이어 가고 있다. 지원과 관리 부담은 당분간 남는다.',unsettled:'공개 범위와 수습 비용에 합의하지 못해 논의가 이어지고 있다.'};addCityNews('region:'+id+':'+w.regionChoice,id,place+' — '+messages[w.regionChoice])}
 }}
function renderCityNews(){const rows=(s.cityNews||[]).slice().reverse().sort((a,b)=>b.year-a.year).slice(0,3);return rows.length?'<section class="city-news"><strong>지역 소식</strong>'+rows.map(row=>'<p><small>'+row.year+'년 · '+escapeHTML(CITY_SITES[row.arc].name)+'</small>'+formatProse(row.text)+'</p>').join('')+'</section>':''}
function updateSceneMapFocus(){if(!s)return;initialiseSceneLinks(s);syncCityNews();if(s.critical?.arc){const id=s.critical.arc,key='catastrophe:'+id;if(!s.mapVisits[key]){s.mapVisits[key]=true;s.mapFocus={arc:id,kind:'catastrophe',year:s.year};s.cityMapOpen=true}return}if(!isInvestigation()||s.result)return;const id=currentArcId(),index=s.pending.index,key=id+':'+index;if(s.mapVisits[key])return;s.mapVisits[key]=true;const final=index===(id==='nora'?4:arcById(id).chapters.length-1);if(index===0||final){s.mapFocus={arc:id,stage:index,kind:final?'final':'discovery',year:s.year};s.cityMapOpen=true}}
function installSceneLinks(){
 const init=initialiseRevision;initialiseRevision=raw=>initialiseSceneLinks(init(raw));if(s)initialiseSceneLinks(s);
 const current=currentEvent;currentEvent=function(){const e=current();return e&&isInvestigation()&&!s.result?{...e,text:linkedSceneText(e.text,currentArcId(),s.pending.index)}:e};
 const chapter=chapterText;chapterText=i=>linkedSceneText(chapter(i),'nora',i);const newChapter=newChapterText;newChapterText=()=>linkedSceneText(newChapter(),s.pending.arc,s.pending.index);
 const chooseBase=choose;choose=function(i){const p=s?.pending?{...s.pending}:null,id=isInvestigation()?currentArcId():null,c=currentEvent()?.choices[i],year=s?.year;const out=chooseBase(i);if(id&&c&&s.result&&!c.defer&&!c.madnessAction&&!c.professionalRecovery&&!c.caseExit&&!s.professionalInterlude&&!arcIsResolved(id)){const next=id==='nora'?s.caseStage:arcState(id)?.stage;if(next>p.index){initialiseSceneLinks(s);s.sceneLinks[id]||={};const ok=s.resultOutcome!=='failure',detail=npcText((ok?c.success:c.failure)||c.success||'앞선 조사에서 남긴 기록을 챙겼다.').replace(/\*\*/g,'').split(/(?<=[.!?。])\s|\n/)[0];s.sceneLinks[id][next]={from:p.index,year,ok,detail,evidence:c.evidence||null};save();render()}}return out};
 const mapBase=renderCityMap;renderCityMap=function(){let html=mapBase();const f=s.mapFocus,site=f&&discoveredCitySites().find(p=>p.id===f.arc);if(!site)return html;const label=site.status==='ruined'?'재앙 피해 지역':completedArcResult(f.arc)?'마지막 현장':f.kind==='final'?'최종 현장':'장소 확인';html=html.replace('</summary>','<span class="map-current">'+escapeHTML(site.name)+' · '+label+'</span></summary>');return html.replace(/<g class="city-site ([^"]+)"([^>]*transform="translate\(([^)]*)\)")>/g,(whole,status,attrs,coords)=>coords===site.x+' '+site.y?'<g class="city-site '+status+' map-focused"'+attrs+'><circle class="map-focus-ring" r="24"/>':whole)};
 const renderBase=render;render=function(){updateSceneMapFocus();const out=renderBase();if(s)save();return out};
}
