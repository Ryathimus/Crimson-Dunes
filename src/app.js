const state = {
  mode: 'author',
  events: [],
  rawSource: '',
  selectedId: null,
  reviews: JSON.parse(localStorage.getItem('crimsonDunes.timelineReviews') || '{}'),
  transcript: JSON.parse(localStorage.getItem('crimsonDunes.agentTranscript') || '[]'),
  libraryManifest: null,
  selectedLibraryPath: null
};
const modeConfig = {
  author: { title:'Author Mode', badge:'canon management', description:'Full-access source, draft, canon and migration review shell. Draft-to-canon promotion is deliberately not implemented.', agentNote:'Author Agent can help compare source/draft/canon and prepare generated suggestions, but output remains generated until saved as draft.' },
  player: { title:'Player Mode', badge:'visibility limited', description:'Player-facing shell. Hidden author/dev data should not be exposed here.', agentNote:'Player Agent placeholder should only receive player-visible context. Real provider is disabled.' },
  dev: { title:'Dev Mode', badge:'system design', description:'Development shell for schemas, validation, engine configuration and test fixtures.', agentNote:'Dev Agent placeholder can discuss system design and validation. Real provider is disabled.' }
};
const $ = id => document.getElementById(id);
async function init(){
  const [eventsRes, srcRes] = await Promise.all([
    fetch('data/timelines/full-world-timeline.draft.json'),
    fetch('data/source-import/full-world-timeline.raw.md')
  ]);
  state.events = await eventsRes.json();
  state.rawSource = await srcRes.text();
  populateCategories(); bindEvents(); await loadProjectLibrary(); renderMode(); renderTimeline(); renderTranscript(); renderLibraryList();
}
function bindEvents(){
  document.querySelectorAll('[data-mode]').forEach(btn=>btn.addEventListener('click',()=>{state.mode=btn.dataset.mode;document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b===btn));renderMode();renderTimeline();renderContextPreview();}));
  ['layer-filter','category-filter','impact-filter','review-filter','search'].forEach(id=>$(id).addEventListener('input',renderTimeline));
  $('chat-form').addEventListener('submit',onChatSubmit); $('export-transcript').addEventListener('click',exportTranscript); $('clear-transcript').addEventListener('click',()=>{state.transcript=[];persistTranscript();renderTranscript();});
  $('save-review').addEventListener('click',saveCurrentReview); $('export-review-patch').addEventListener('click',exportReviewPatch); $('library-search').addEventListener('input', renderLibraryList); $('library-group-filter').addEventListener('input', renderLibraryList);
}
function populateCategories(){[...new Set(state.events.map(e=>e.timelineCategory).filter(Boolean))].sort().forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;$('category-filter').appendChild(o);});}
function renderMode(){const c=modeConfig[state.mode];$('mode-title').textContent=c.title;$('mode-badge').textContent=c.badge;$('mode-description').textContent=c.description;$('agent-mode-note').textContent=c.agentNote;$('author-review-panel').hidden=state.mode!=='author';}
function reviewStatus(id){return state.reviews[id]?.status || 'unreviewed';}
function visibleEvents(){const layer=$('layer-filter').value, category=$('category-filter').value, impact=$('impact-filter').value, review=$('review-filter').value, q=$('search').value.trim().toLowerCase();return state.events.filter(e=>{if(layer!=='all'&&e.timelineLayer!==layer)return false;if(category!=='all'&&e.timelineCategory!==category)return false;if(impact!=='all'&&e.australianImpactScope!==impact)return false;if(review!=='all'&&reviewStatus(e.id)!==review)return false;if(!q)return true;return [e.dateText,e.title,e.summary,e.timelineLayer,e.timelineCategory,e.australianImpactScope,...(e.resultingWorldFlags||[])].filter(Boolean).join(' ').toLowerCase().includes(q);});}
function renderTimeline(){const events=visibleEvents();$('timeline-count').textContent=`${events.length} of ${state.events.length} draft events shown`;const list=$('timeline-events');list.innerHTML='';events.forEach(event=>{const li=document.createElement('li');const btn=document.createElement('button');btn.className='event-card'+(event.id===state.selectedId?' selected':'');btn.innerHTML=`<strong>${esc(event.dateText||'Undated')} — ${esc(event.title||event.id)}</strong><span class="meta">${esc(event.timelineLayer)} · ${esc(event.timelineCategory)} · ${esc(event.canonStatus)} · impact: ${esc(event.australianImpactScope||'n/a')} · review: ${esc(reviewStatus(event.id))}</span>`;btn.addEventListener('click',()=>{state.selectedId=event.id;renderTimeline();renderEventDetail(event);renderReviewPanel(event);renderContextPreview();});li.appendChild(btn);list.appendChild(li);});renderContextPreview();}
function renderEventDetail(event){$('event-detail-empty').hidden=true;const el=$('event-detail');el.hidden=false;const rows=[['ID',event.id],['Date',event.dateText],['Layer',event.timelineLayer],['Category',event.timelineCategory],['Canon Status',event.canonStatus],['Impact',event.australianImpactScope],['Source',event.sourcePath],['Summary',event.summary],['Australian Impact Notes',event.australianImpactNotes]];el.innerHTML=`<div class="detail-grid">${rows.map(([k,v])=>`<div class="kv"><b>${esc(k)}</b><span>${esc(String(v??''))}</span></div>`).join('')}${tagBlock('World Flags',event.resultingWorldFlags)}${tagBlock('Locations',event.affectedLocations)}${tagBlock('Factions',event.affectedFactions)}${listBlock('Notes',event.notes)}${listBlock('Details',event.details)}</div>`;}
function renderReviewPanel(event){const r=state.reviews[event.id]||{};$('source-excerpt').textContent=findSourceExcerpt(event);$('source-working-note').value=r.sourceWorkingNote||'';$('draft-review-note').value=r.draftReviewNote||'';$('review-status').value=r.status||'unreviewed';}
function findSourceExcerpt(event){const raw=state.rawSource;const terms=[event.dateText, String(event.startYear||''), event.title?.split(' ').slice(0,4).join(' ')].filter(Boolean);for(const term of terms){const i=raw.toLowerCase().indexOf(String(term).toLowerCase());if(i>=0){const start=Math.max(0,i-650), end=Math.min(raw.length,i+1400);return raw.slice(start,end).trim();}}return 'No direct source excerpt found by simple text search. Use source path and raw markdown for manual review.';}
function saveCurrentReview(){if(!state.selectedId)return alert('Select an event first.');state.reviews[state.selectedId]={...(state.reviews[state.selectedId]||{}),status:$('review-status').value,sourceWorkingNote:$('source-working-note').value,draftReviewNote:$('draft-review-note').value,updatedAt:new Date().toISOString()};localStorage.setItem('crimsonDunes.timelineReviews',JSON.stringify(state.reviews));renderTimeline();renderContextPreview();}
function exportReviewPatch(){const patch={exportedAt:new Date().toISOString(),status:'draft-review-patch',reviews:state.reviews};downloadJson(patch,`crimson-dunes-timeline-review-patch-${new Date().toISOString().slice(0,10)}.json`);}
function tagBlock(title,values=[]){return values?.length?`<section><h4>${esc(title)}</h4><div class="tag-list">${values.map(v=>`<span class="tag">${esc(v)}</span>`).join('')}</div></section>`:'';}
function listBlock(title,values=[]){return values?.length?`<section><h4>${esc(title)}</h4><ul>${values.map(v=>`<li>${esc(v)}</li>`).join('')}</ul></section>`:'';}
function renderContextPreview(){const selected=state.events.find(e=>e.id===state.selectedId);$('context-preview').textContent=JSON.stringify({mode:state.mode,provider:'disabled/no-op',selectedEvent:selected?{id:selected.id,dateText:selected.dateText,title:selected.title,timelineLayer:selected.timelineLayer,timelineCategory:selected.timelineCategory,canonStatus:selected.canonStatus,australianImpactScope:selected.australianImpactScope,reviewStatus:reviewStatus(selected.id)}:null,selectedProjectFile:state.selectedLibraryPath,visibleEventCount:visibleEvents().length,warning:state.mode==='player'?'Player Mode context must be visibility-filtered before any real AI call.':'No network AI call is made in this shell.'},null,2);}

async function loadProjectLibrary(){
  const res = await fetch('data/project-library-manifest.json');
  state.libraryManifest = await res.json();
}
function libraryGroup(path){ return path.split('/')[0]; }
function filteredLibraryFiles(){
  if(!state.libraryManifest) return [];
  const q=$('library-search').value.trim().toLowerCase();
  const group=$('library-group-filter').value;
  return state.libraryManifest.files.filter(f=>{
    const p=f.path || '';
    if(group!=='all' && !p.startsWith(group+'/') && p!==group) return false;
    if(!q) return true;
    return [p,f.source,f.type].filter(Boolean).join(' ').toLowerCase().includes(q);
  }).sort((a,b)=>a.path.localeCompare(b.path));
}
function renderLibraryList(){
  if(!state.libraryManifest) return;
  const files=filteredLibraryFiles();
  $('library-count').textContent=`${files.length} files`;
  const list=$('library-files'); list.innerHTML='';
  for(const f of files){
    const li=document.createElement('li');
    const btn=document.createElement('button');
    btn.className='library-file-btn'+(state.selectedLibraryPath===f.path?' selected':'');
    btn.innerHTML=`<strong>${esc(f.path)}</strong><span>${esc(f.type)} · ${esc(f.source || '')}</span>`;
    btn.addEventListener('click',()=>selectLibraryFile(f));
    li.appendChild(btn); list.appendChild(li);
  }
}
async function selectLibraryFile(file){
  state.selectedLibraryPath=file.path;
  renderLibraryList();
  $('library-file-title').textContent=file.path;
  try{
    const res=await fetch('data/project-library/'+file.path);
    if(!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const text=await res.text();
    $('library-file-content').textContent=text;
  }catch(err){
    $('library-file-content').textContent=`Could not load file content. This may be an index-only/binary record.\n\n${err.message}`;
  }
  renderContextPreview();
}

function onChatSubmit(e){e.preventDefault();const input=$('chat-input'),text=input.value.trim();if(!text)return;state.transcript.push({at:new Date().toISOString(),mode:state.mode,role:'user-note',text,provider:'disabled/no-op'});state.transcript.push({at:new Date().toISOString(),mode:state.mode,role:'agent-placeholder',text:'Provider disabled. This note has been recorded locally only. Future implementation should route this through the mode-aware Agent Orchestrator.',provider:'disabled/no-op'});input.value='';persistTranscript();renderTranscript();}
function renderTranscript(){const log=$('chat-log');log.innerHTML='';state.transcript.slice(-30).forEach(msg=>{const div=document.createElement('div');div.className='chat-msg';div.innerHTML=`<div class="role">${esc(msg.mode)} · ${esc(msg.role)} · ${esc(msg.provider)}</div><div>${esc(msg.text)}</div>`;log.appendChild(div);});log.scrollTop=log.scrollHeight;}
function persistTranscript(){localStorage.setItem('crimsonDunes.agentTranscript',JSON.stringify(state.transcript));}
function exportTranscript(){downloadJson(state.transcript,`crimson-dunes-agent-transcript-${new Date().toISOString().slice(0,10)}.json`);}function downloadJson(data,name){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);}
function esc(v){return String(v??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));}
init().catch(err=>{console.error(err);document.body.innerHTML=`<pre>Failed to initialise Crimson Dunes app shell: ${esc(err.message)}</pre>`;});
