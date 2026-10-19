'use strict';
let runtimeHalted=false;
function runtimeDiagnostic(error){return {version:'0.46',message:String(error?.message||error||'알 수 없는 오류'),location:String(error?.stack||'').split('\n').slice(0,5).join('\n'),year:s?.year,phase:s?.phase,pending:s?.pending?{...s.pending}:null,resultPresent:Boolean(s?.result),progress:s?.progress,paused:settings.paused,screen,hidden:document.hidden}}
function showRuntimeProblem(error){runtimeHalted=true;const clock=document.getElementById("clock-state");if(clock)clock.textContent="진행 오류 · 기록 보존";const info=runtimeDiagnostic(error);if(s){s.runtimeDiagnostic=info;save()}const box=document.getElementById('runtime-note');if(!box)return;box.hidden=false;box.innerHTML='<strong>다음 화면으로 넘어가는 중 문제가 생겼습니다.</strong><p>진행 기록은 유지했습니다. 먼저 화면 다시 표시를 눌러 보세요. 반복되면 아래 오류 내용을 알려 주세요.</p><button id="retry-screen" class="secondary">화면 다시 표시</button><details><summary>오류 내용 확인</summary><pre>'+escapeHTML(JSON.stringify(info,null,2))+'</pre></details>';const button=document.getElementById('retry-screen');if(button)button.onclick=()=>render()}
function installRuntimeDiagnostics(){
 const baseRender=render;render=function(){try{const result=baseRender();runtimeHalted=false;const box=document.getElementById('runtime-note');if(box)box.hidden=true;return result}catch(error){showRuntimeProblem(error);return false}};
 const baseAdvance=advance;advance=function(){try{return baseAdvance()}catch(error){showRuntimeProblem(error);return false}};
 const baseTick=tick;tick=function(now){if(runtimeHalted)return;try{return baseTick(now)}catch(error){showRuntimeProblem(error)}};
 window.addEventListener('error',event=>{if(s&&screen==='game'&&(event.error||event.message))showRuntimeProblem(event.error||new Error(event.message))});
}

