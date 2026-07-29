const state = {
  mode: 'author',
  events: [],
  rawSource: '',
  selectedId: null,
  reviews: JSON.parse(localStorage.getItem('crimsonDunes.timelineReviews') || '{}'),
  transcript: JSON.parse(localStorage.getItem('crimsonDunes.agentTranscript') || '[]'),
  libraryManifest: null,
  selectedLibraryPath: null,
  validation: {},
  validationReport: null,
  slice1788: null,
  decisionQueue1788: null,
  playerRoute: null,
  playerLog: JSON.parse(localStorage.getItem('crimsonDunes.playerLog') || '[]'),
  devConfig: null,
  decisionSelections: JSON.parse(localStorage.getItem('crimsonDunes.decisionSelections') || '{}'),
  workspaceConfig: null,
  playerCharacter: null,
  uiRecommendations: null,
  currentRouteNodeId: localStorage.getItem('crimsonDunes.currentRouteNodeId') || null,
  structuredValidation: null,
  authorWorldbuildingIndex: null,
  activeAuthorSection: localStorage.getItem('crimsonDunes.activeAuthorSection') || 'dashboard',
  canonQueue: null,
  discoveredFacts: JSON.parse(localStorage.getItem('crimsonDunes.discoveredFacts') || '[]'),
  lastActionResult: localStorage.getItem('crimsonDunes.lastActionResult') || '',
  routeStateMachine: null,
  authorSectionDetailIndex: null,
  buildManifest: null,
  routeTestFixture: null
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
  populateCategories(); bindEvents(); await loadProjectLibrary(); await load1788Slice(); await loadV6Data(); await loadV8Data(); await loadV9Data(); await loadV10Data(); await loadV12Data(); await loadV13Data(); await loadWorkspaceConfig(); runValidation(); runStructuredValidation(); renderMode(); renderDashboard(); render1788Slice(); renderDecisionQueue(); renderPlayerPreview(); renderPlayerKnowledge(); renderDevPreview(); renderUiRecommendations(); renderAuthorDashboard(); renderCanonQueue(); renderRouteState(); renderAuthorSectionDetail(); applyWorkspaceVisibility(); applyAuthorSectionVisibility(); renderTimeline(); renderTranscript(); renderLibraryList();
}
function bindEvents(){
  document.querySelectorAll('[data-mode]').forEach(btn=>btn.addEventListener('click',()=>{state.mode=btn.dataset.mode;document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b===btn));renderMode();renderDashboard();renderPlayerPreview();renderPlayerKnowledge();renderRouteState();renderDevPreview();renderRouteTestSummary();renderUiRecommendations();applyWorkspaceVisibility();applyAuthorSectionVisibility();renderTimeline();renderContextPreview();}));
  ['layer-filter','category-filter','impact-filter','review-filter','search'].forEach(id=>$(id).addEventListener('input',renderTimeline));
  $('chat-form').addEventListener('submit',onChatSubmit); $('export-transcript').addEventListener('click',exportTranscript); $('clear-transcript').addEventListener('click',()=>{state.transcript=[];persistTranscript();renderTranscript();});
  $('save-review').addEventListener('click',saveCurrentReview); $('export-review-patch').addEventListener('click',exportReviewPatch); $('library-search').addEventListener('input', renderLibraryList); $('library-group-filter').addEventListener('input', renderLibraryList); $('import-review-patch').addEventListener('change', importReviewPatch); $('export-ready-queue').addEventListener('click', exportReadyQueue); $('export-validation-report').addEventListener('click', exportValidationReport); $('export-1788-slice').addEventListener('click', export1788Slice); $('copy-1788-flags').addEventListener('click', copy1788Flags); $('export-player-log').addEventListener('click', exportPlayerLog); $('clear-player-log').addEventListener('click', clearPlayerLog); $('export-dev-config').addEventListener('click', exportDevConfig); $('export-1788-decisions').addEventListener('click', exportDecisionPatch); $('import-1788-decisions').addEventListener('change', importDecisionPatch); $('export-source-working').addEventListener('click', exportSourceWorkingPatch); $('import-source-working').addEventListener('change', importSourceWorkingPatch); $('player-route-node-select').addEventListener('change', changeRouteNode); document.querySelectorAll('[data-author-section]').forEach(btn=>btn.addEventListener('click',()=>setAuthorSection(btn.dataset.authorSection))); if($('export-canon-queue')) $('export-canon-queue').addEventListener('click', exportCanonQueue); if($('route-prev-node')) $('route-prev-node').addEventListener('click',()=>stepRouteNode(-1)); if($('route-next-node')) $('route-next-node').addEventListener('click',()=>stepRouteNode(1)); if($('export-route-state')) $('export-route-state').addEventListener('click', exportRouteState); if($('run-route-tests')) $('run-route-tests').addEventListener('click', runRouteTests); 
}
function populateCategories(){[...new Set(state.events.map(e=>e.timelineCategory).filter(Boolean))].sort().forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;$('category-filter').appendChild(o);});}
function renderMode(){
  const c=modeConfig[state.mode];
  $('mode-title').textContent=c.title;
  $('mode-badge').textContent=c.badge;
  $('mode-description').textContent=c.description;
  $('agent-mode-note').textContent=c.agentNote;
  const summaries={
    author:'Author workspace: timeline/source review, 1788 slice, decision queue, project library, and exportable review patches.',
    player:'Player workspace: Waru route preview, local player event log, and filtered player-visible knowledge only.',
    dev:'Dev workspace: validation dashboard, feature flags, dev tasks, schemas, and project library. No canon promotion.'
  };
  $('workspace-summary').textContent=summaries[state.mode];
}
function reviewStatus(id){return state.reviews[id]?.status || 'unreviewed';}
function visibleEvents(){const layer=$('layer-filter').value, category=$('category-filter').value, impact=$('impact-filter').value, review=$('review-filter').value, q=$('search').value.trim().toLowerCase();return state.events.filter(e=>{if(layer!=='all'&&e.timelineLayer!==layer)return false;if(category!=='all'&&e.timelineCategory!==category)return false;if(impact!=='all'&&e.australianImpactScope!==impact)return false;if(review!=='all'){ const vr=state.validation[e.id]||{errors:[],warnings:[]}; if(review==='has-validation-errors'&&vr.errors.length===0)return false; else if(review==='has-review-warnings'&&vr.warnings.length===0)return false; else if(!['has-validation-errors','has-review-warnings'].includes(review)&&reviewStatus(e.id)!==review)return false; }if(!q)return true;return [e.dateText,e.title,e.summary,e.timelineLayer,e.timelineCategory,e.australianImpactScope,...(e.resultingWorldFlags||[])].filter(Boolean).join(' ').toLowerCase().includes(q);});}
function renderTimeline(){const events=visibleEvents();$('timeline-count').textContent=`${events.length} of ${state.events.length} draft events shown`;const list=$('timeline-events');list.innerHTML='';events.forEach(event=>{const li=document.createElement('li');const btn=document.createElement('button');const vr=state.validation[event.id]||{errors:[],warnings:[]}; btn.className='event-card'+(event.id===state.selectedId?' selected':'')+(vr.errors.length?' has-errors':'')+(vr.warnings.length?' has-warnings':'');btn.innerHTML=`<strong>${esc(event.dateText||'Undated')} — ${esc(event.title||event.id)}</strong><span class="meta">${esc(event.timelineLayer)} · ${esc(event.timelineCategory)} · ${esc(event.canonStatus)} · impact: ${esc(event.australianImpactScope||'n/a')} · review: ${esc(reviewStatus(event.id))}</span>`;btn.addEventListener('click',()=>{state.selectedId=event.id;renderTimeline();renderEventDetail(event);renderReviewPanel(event);renderContextPreview();});li.appendChild(btn);list.appendChild(li);});renderContextPreview();}
function renderEventDetail(event){$('event-detail-empty').hidden=true;const el=$('event-detail');el.hidden=false;const rows=[['ID',event.id],['Date',event.dateText],['Layer',event.timelineLayer],['Category',event.timelineCategory],['Canon Status',event.canonStatus],['Impact',event.australianImpactScope],['Source',event.sourcePath],['Summary',event.summary],['Australian Impact Notes',event.australianImpactNotes]];el.innerHTML=`<div class="detail-grid">${rows.map(([k,v])=>`<div class="kv"><b>${esc(k)}</b><span>${esc(String(v??''))}</span></div>`).join('')}${tagBlock('World Flags',event.resultingWorldFlags)}${tagBlock('Locations',event.affectedLocations)}${tagBlock('Factions',event.affectedFactions)}${listBlock('Notes',event.notes)}${validationBlock(event)}${listBlock('Details',event.details)}</div>`;}
function renderReviewPanel(event){const r=state.reviews[event.id]||{};$('source-excerpt').textContent=findSourceExcerpt(event);$('source-working-note').value=r.sourceWorkingNote||'';$('draft-review-note').value=r.draftReviewNote||'';$('review-status').value=r.status||'unreviewed';}
function findSourceExcerpt(event){const raw=state.rawSource;const terms=[event.dateText, String(event.startYear||''), event.title?.split(' ').slice(0,4).join(' ')].filter(Boolean);for(const term of terms){const i=raw.toLowerCase().indexOf(String(term).toLowerCase());if(i>=0){const start=Math.max(0,i-650), end=Math.min(raw.length,i+1400);return raw.slice(start,end).trim();}}return 'No direct source excerpt found by simple text search. Use source path and raw markdown for manual review.';}
function saveCurrentReview(){if(!state.selectedId)return alert('Select an event first.');state.reviews[state.selectedId]={...(state.reviews[state.selectedId]||{}),status:$('review-status').value,sourceWorkingNote:$('source-working-note').value,draftReviewNote:$('draft-review-note').value,updatedAt:new Date().toISOString()};localStorage.setItem('crimsonDunes.timelineReviews',JSON.stringify(state.reviews));renderTimeline();renderContextPreview();}
function exportReviewPatch(){const patch={exportedAt:new Date().toISOString(),status:'draft-review-patch',reviews:state.reviews};downloadJson(patch,`crimson-dunes-timeline-review-patch-${new Date().toISOString().slice(0,10)}.json`);}
function tagBlock(title,values=[]){return values?.length?`<section><h4>${esc(title)}</h4><div class="tag-list">${values.map(v=>`<span class="tag">${esc(v)}</span>`).join('')}</div></section>`:'';}
function listBlock(title,values=[]){return values?.length?`<section><h4>${esc(title)}</h4><ul>${values.map(v=>`<li>${esc(v)}</li>`).join('')}</ul></section>`:'';}
function renderContextPreview(){const selected=state.events.find(e=>e.id===state.selectedId);$('context-preview').textContent=JSON.stringify({mode:state.mode,provider:'disabled/no-op',selectedEvent:selected?{id:selected.id,dateText:selected.dateText,title:selected.title,timelineLayer:selected.timelineLayer,timelineCategory:selected.timelineCategory,canonStatus:selected.canonStatus,australianImpactScope:selected.australianImpactScope,reviewStatus:reviewStatus(selected.id),validation:state.validation[selected.id]||null}:null,selectedProjectFile:state.selectedLibraryPath,activeSlice:state.slice1788?{id:state.slice1788.id,title:state.slice1788.title,canonStatus:state.slice1788.canonStatus}:null,playerRoute:state.mode==='player'&&state.playerRoute?{id:state.playerRoute.id,pov:state.playerRoute.pov}:null,devConfig:state.mode==='dev'&&state.devConfig?{id:state.devConfig.id,realAiProvider:state.devConfig.featureFlags.realAiProvider}:null,activeAuthorSection:state.mode==='author'?state.activeAuthorSection:null,build:state.buildManifest?{version:state.buildManifest.version,name:state.buildManifest.name}:null,modeVisibilityPanels:state.workspaceConfig?.modePanels?.[state.mode]||[],decisionPatchCount:Object.keys(state.decisionSelections).length,currentRouteNodeId:state.currentRouteNodeId,routeStateMachine:state.routeStateMachine?{id:state.routeStateMachine.id,activeNode:state.currentRouteNodeId}:null,discoveredFactCount:(state.discoveredFacts||[]).length,playerCharacter:state.mode==='player'&&state.playerCharacter?{name:state.playerCharacter.name,currentLocation:state.playerCharacter.currentLocation,equipmentCount:(state.playerCharacter.equipment||[]).length}:null,visibleEventCount:visibleEvents().length,warning:state.mode==='player'?'Player Mode context must be visibility-filtered before any real AI call.':'No network AI call is made in this shell.'},null,2);}


function validateEvent(event){
  const errors=[]; const warnings=[];
  const required=['id','dateText','title','summary','timelineLayer','timelineCategory','canonStatus','sourcePath','details','resultingWorldFlags','affectedLocations','affectedCharacters','affectedFactions','notes'];
  for(const key of required){ if(!(key in event)) errors.push(`Missing required field: ${key}`); }
  const layerVals=['historicalFoundation','playable','futureReference'];
  const catVals=['muggleHistory','wizardingHistory','crimsonDunesHistory','characterHistory','schoolHistory','settlementHistory','magicalConflict','culturalContact','transportInfrastructure','other'];
  const statusVals=['source-import','source-working','draft','canon','generated','dev-test','reference','deprecated'];
  const impactVals=['direct','indirect','ambient','unknown','none-likely',undefined,null];
  if(!event.id) errors.push('id must not be empty');
  if(!event.title) errors.push('title must not be empty');
  if(!layerVals.includes(event.timelineLayer)) errors.push(`Invalid timelineLayer: ${event.timelineLayer}`);
  if(!catVals.includes(event.timelineCategory)) errors.push(`Invalid timelineCategory: ${event.timelineCategory}`);
  if(!statusVals.includes(event.canonStatus)) errors.push(`Invalid canonStatus: ${event.canonStatus}`);
  if(!impactVals.includes(event.australianImpactScope)) errors.push(`Invalid australianImpactScope: ${event.australianImpactScope}`);
  ['details','resultingWorldFlags','affectedLocations','affectedCharacters','affectedFactions','notes'].forEach(k=>{ if(!Array.isArray(event[k])) errors.push(`${k} must be an array`); });
  if(event.canonStatus==='canon') warnings.push('Canon status present in draft app shell; confirm this should not bypass Author Mode promotion.');
  if(event.timelineCategory==='other') warnings.push('timelineCategory is other; Author Mode review recommended.');
  if(event.australianImpactScope==='unknown') warnings.push('Australian impact scope is unknown; classify before canon promotion.');
  if(event.startYear && event.endYear && event.endYear < event.startYear) errors.push('endYear is earlier than startYear');
  if((event.title||'').toLowerCase().includes('tbd') || (event.dateText||'').toLowerCase().includes('tbd')) warnings.push('TBD date/title remains unresolved.');
  return {errors,warnings};
}
function runValidation(){
  state.validation={};
  for(const event of state.events) state.validation[event.id]=validateEvent(event);
  state.validationReport={
    generatedAt:new Date().toISOString(),
    eventCount:state.events.length,
    errorCount:Object.values(state.validation).reduce((n,v)=>n+v.errors.length,0),
    warningCount:Object.values(state.validation).reduce((n,v)=>n+v.warnings.length,0),
    events:state.validation
  };
}
function renderDashboard(){
  const vals=Object.values(state.validation);
  $('stat-total').textContent=state.events.length;
  $('stat-errors').textContent=vals.reduce((n,v)=>n+v.errors.length,0);
  $('stat-warnings').textContent=vals.reduce((n,v)=>n+v.warnings.length,0);
  $('stat-ready').textContent=Object.keys(state.reviews).filter(id=>state.reviews[id]?.status==='ready-for-draft-save').length;
}
function validationBlock(event){
  const vr=state.validation[event.id]||{errors:[],warnings:[]};
  if(!vr.errors.length&&!vr.warnings.length) return '<section><h4>Validation</h4><p class="small">No validation issues detected.</p></section>';
  return `<section><h4>Validation</h4>${vr.errors.length?`<b class="validation-error">Errors</b><ul class="validation-list">${vr.errors.map(e=>`<li>${esc(e)}</li>`).join('')}</ul>`:''}${vr.warnings.length?`<b class="validation-warning">Warnings</b><ul class="validation-list">${vr.warnings.map(w=>`<li>${esc(w)}</li>`).join('')}</ul>`:''}</section>`;
}
async function importReviewPatch(event){
  const file=event.target.files?.[0]; if(!file) return;
  try{
    const patch=JSON.parse(await file.text());
    if(!patch.reviews || typeof patch.reviews !== 'object') throw new Error('Patch must contain a reviews object.');
    state.reviews={...state.reviews,...patch.reviews};
    localStorage.setItem('crimsonDunes.timelineReviews',JSON.stringify(state.reviews));
    renderDashboard(); renderTimeline(); renderContextPreview();
    alert(`Imported ${Object.keys(patch.reviews).length} review records.`);
  }catch(err){ alert(`Could not import review patch: ${err.message}`); }
  event.target.value='';
}
function exportReadyQueue(){
  const ready=Object.fromEntries(Object.entries(state.reviews).filter(([,v])=>v.status==='ready-for-draft-save'));
  downloadJson({exportedAt:new Date().toISOString(),status:'ready-for-draft-save-queue',reviews:ready},`crimson-dunes-ready-draft-save-queue-${new Date().toISOString().slice(0,10)}.json`);
}
function exportValidationReport(){
  downloadJson(state.validationReport,`crimson-dunes-validation-report-${new Date().toISOString().slice(0,10)}.json`);
}


async function load1788Slice(){
  const res=await fetch('data/slices/1788-historical-foundation.draft.json');
  state.slice1788=await res.json();
}
function render1788Slice(){
  const s=state.slice1788; if(!s) return;
  $('slice-purpose').textContent=s.purpose;
  $('slice-overview').innerHTML=`<p><b>${esc(s.overview.dateRange)}</b></p><p>${esc(s.overview.premise)}</p><p><b>Current:</b> ${esc(s.overview.currentDecisionState.linked1810Outcome)}</p>`;
  $('slice-flags').innerHTML=s.worldFlagsCreatedBySlice.map(f=>`<li><b>${esc(f.id)}</b><br><span class="small">${esc(f.description)}</span></li>`).join('');
  $('slice-encounters').innerHTML=s.possible1788EncounterTemplates.map(e=>`<li><b>${esc(e.title)}</b><br><span class="small">${esc(e.focus)} · ${esc(e.status)}</span></li>`).join('');
  $('slice-json').textContent=JSON.stringify(s,null,2);
}
function export1788Slice(){ downloadJson(state.slice1788,`crimson-dunes-1788-slice-draft-${new Date().toISOString().slice(0,10)}.json`); }
async function copy1788Flags(){
  const text=(state.slice1788?.worldFlagsCreatedBySlice||[]).map(f=>f.id).join('\n');
  try{ await navigator.clipboard.writeText(text); alert('1788 world flags copied to clipboard.'); }
  catch{ downloadJson({worldFlags:(state.slice1788?.worldFlagsCreatedBySlice||[])},`crimson-dunes-1788-world-flags-${new Date().toISOString().slice(0,10)}.json`); }
}



async function loadWorkspaceConfig(){
  const res=await fetch('data/workspace-config.v7.json');
  state.workspaceConfig=await res.json();
}
function setPanelVisibility(id, isVisible){
  const el=$(id);
  if(!el) return;
  el.classList.toggle('workspace-hidden', !isVisible);
  el.hidden = !isVisible;
}
function applyWorkspaceVisibility(){
  const visible=new Set(state.workspaceConfig?.modePanels?.[state.mode] || []);
  const panelIds=[
    'author-nav-panel','author-dashboard-panel','author-section-detail-panel','canon-queue-panel',
    'validation-dashboard','patch-actions','timeline-controls','timeline-split',
    'slice-1788-panel','decision-queue-panel','author-review-panel','project-library-panel',
    'player-preview-panel','player-knowledge-panel','player-route-state-panel',
    'dev-preview-panel','dev-route-test-panel','ui-recommendations-panel'
  ];
  for(const id of panelIds) setPanelVisibility(id, visible.has(id));
  if($('player-mode-diagnostic') && state.mode==='player'){
    $('player-mode-diagnostic').textContent = `V11 visibility OK: ${Array.from(visible).join(', ')}`;
  }
}
function renderDecisionQueue(){
  const q=state.decisionQueue1788; if(!q) return;
  const list=$('decision-queue-list'); if(!list) return;
  list.innerHTML=q.items.map(item=>{
    const sel=state.decisionSelections[item.id] || {status:item.status || 'open', selectedOption:'', note:''};
    return `<article class="decision-card" data-decision-id="${esc(item.id)}"><h5>${esc(item.question)}</h5><div class="decision-grid"><label>Selected option<select data-decision-option="${esc(item.id)}"><option value="">Unselected</option>${item.options.map(o=>`<option value="${esc(o)}" ${sel.selectedOption===o?'selected':''}>${esc(o)}</option>`).join('')}</select></label><label>Status<select data-decision-status="${esc(item.id)}"><option value="open" ${sel.status==='open'?'selected':''}>Open</option><option value="tentative" ${sel.status==='tentative'?'selected':''}>Tentative</option><option value="decided-draft" ${sel.status==='decided-draft'?'selected':''}>Decided Draft</option><option value="needs-more-source" ${sel.status==='needs-more-source'?'selected':''}>Needs More Source</option></select></label><label>Note<textarea data-decision-note="${esc(item.id)}" rows="3" placeholder="Decision note…">${esc(sel.note||'')}</textarea></label></div></article>`;
  }).join('');
  list.querySelectorAll('select, textarea').forEach(el=>el.addEventListener('input', saveDecisionSelections));
}
function saveDecisionSelections(){
  const next={...state.decisionSelections};
  document.querySelectorAll('[data-decision-id]').forEach(card=>{
    const id=card.dataset.decisionId;
    next[id]={
      selectedOption:card.querySelector(`[data-decision-option="${CSS.escape(id)}"]`)?.value || '',
      status:card.querySelector(`[data-decision-status="${CSS.escape(id)}"]`)?.value || 'open',
      note:card.querySelector(`[data-decision-note="${CSS.escape(id)}"]`)?.value || '',
      updatedAt:new Date().toISOString()
    };
  });
  state.decisionSelections=next;
  localStorage.setItem('crimsonDunes.decisionSelections',JSON.stringify(next));
  renderContextPreview();
}
function exportDecisionPatch(){
  downloadJson({exportedAt:new Date().toISOString(),status:'1788-decision-patch',sliceId:state.decisionQueue1788?.sliceId,decisions:state.decisionSelections},`crimson-dunes-1788-decision-patch-${new Date().toISOString().slice(0,10)}.json`);
}
function renderPlayerKnowledge(){
  if(!$('player-visible-facts') || !state.playerRoute) return;
  const c=state.playerCharacter;
  const node=state.playerRoute.nodes.find(n=>n.id===state.currentRouteNodeId);
  const facts=[
    `POV is locked to ${state.playerRoute.pov}.`,
    `Current route is ${state.playerRoute.title}.`,
    `Current location: ${c?.currentLocation || 'route location unknown'}.`,
    `Current node: ${node?.title || state.currentRouteNodeId || 'not selected'}.`,
    'Player Mode must not show source-import, source-working, hidden draft review, dev-test, or author-only notes.',
    'Available information is limited to route nodes, player log, equipment, status flags, and approved player-visible facts.',
    '1810 context: Crimson Dunes exists locally but ICW recognition is not player-facing unless revealed in play.'
  ];
  const known=(c?.visibleKnowledge||[]).map(k=>`<li>${esc(k)}</li>`).join('');
  const discovered=(state.discoveredFacts||[]).map(k=>`<li>${esc(k)}</li>`).join('') || '<li class="small">No discovered facts logged yet.</li>';
  $('player-visible-facts').innerHTML=`<h4>Current scene</h4><ul>${facts.map(f=>`<li>${esc(f)}</li>`).join('')}</ul><h4>Known facts</h4><ul>${known}</ul><h4>Discovered facts</h4><ul>${discovered}</ul>`;
}
async function loadV8Data(){
  const [charRes, uiRes] = await Promise.all([
    fetch('data/player/waru-character-preview.draft.json'),
    fetch('data/ui-recommendations.v8.json')
  ]);
  state.playerCharacter = await charRes.json();
  state.uiRecommendations = await uiRes.json();
  if(!state.currentRouteNodeId) state.currentRouteNodeId = state.playerCharacter.currentRouteNodeId || state.playerRoute?.nodes?.[0]?.id || '';
}
function renderUiRecommendations(){
  if(!$('ui-recommendations-content') || !state.uiRecommendations) return;
  const rec=state.uiRecommendations;
  const block=(title,items)=>`<h4>${esc(title)}</h4><ul class="mode-note-list">${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
  $('ui-recommendations-content').innerHTML = block('Author Mode',rec.authorMode.recommendations)+block('Player Mode',rec.playerMode.recommendations)+block('Dev Mode',rec.devMode.recommendations);
}
function runStructuredValidation(){
  const check=(name,obj,required)=>({name,missing:required.filter(k=>!(k in obj)),status:required.every(k=>k in obj)?'ok':'missing-fields'});
  state.structuredValidation={
    generatedAt:new Date().toISOString(),
    checks:[
      check('1788 slice',state.slice1788||{},['id','title','canonStatus','worldFlagsCreatedBySlice','possible1788EncounterTemplates','openQuestions']),
      check('player route',state.playerRoute||{},['id','title','canonStatus','pov','nodes','availableActions']),
      check('player character',state.playerCharacter||{},['id','name','currentLocation','equipment','visibleKnowledge']),
      check('decision queue',state.decisionQueue1788||{},['id','canonStatus','sliceId','items']),
      check('dev config',state.devConfig||{},['id','canonStatus','featureFlags','devTasks'])
    ]
  };
}
async function loadV6Data(){
  const [routeRes, devRes, queueRes] = await Promise.all([
    fetch('data/player/opening-route-waru.draft.json'),
    fetch('data/dev/dev-mode-config.draft.json'),
    fetch('data/decision-queues/1788-decision-queue.draft.json')
  ]);
  state.playerRoute = await routeRes.json();
  state.devConfig = await devRes.json();
  state.decisionQueue1788 = await queueRes.json();
}
function renderPlayerPreview(){
  const r=state.playerRoute; if(!r) return;
  if(!state.currentRouteNodeId) state.currentRouteNodeId=r.nodes[0]?.id || '';
  $('player-route-summary').textContent = `${r.title} — ${r.summary}`;
  const currentNode=r.nodes.find(n=>n.id===state.currentRouteNodeId)||r.nodes[0];
  if($('player-current-scene')) $('player-current-scene').textContent=currentNode?.sceneText || currentNode?.purpose || '';
  if($('player-scene-badge')) $('player-scene-badge').textContent=currentNode?.title || 'route node';
  if($('player-current-objective')) $('player-current-objective').textContent=`Objective: ${r.currentObjective || state.playerCharacter?.currentObjective || ''}`;
  renderPlayerCharacter();
  $('player-route-node-select').innerHTML = r.nodes.map(n=>`<option value="${esc(n.id)}" ${state.currentRouteNodeId===n.id?'selected':''}>${esc(n.title)}</option>`).join('');
  $('player-route-nodes').innerHTML = r.nodes.map(n=>`<li class="${state.currentRouteNodeId===n.id?'current-node':''}"><b>${esc(n.title)}</b><br><span class="small">${esc(n.purpose)}</span></li>`).join('');
  $('player-actions').innerHTML = r.availableActions.map(a=>`<button data-player-action="${esc(a)}">${esc(a.replaceAll('_',' '))}</button>`).join('');
  document.querySelectorAll('[data-player-action]').forEach(btn=>btn.addEventListener('click',()=>addPlayerAction(btn.dataset.playerAction)));
  renderPlayerLog();
  if($('player-action-result')) $('player-action-result').textContent = state.lastActionResult || 'No player action selected yet.';
}

function renderPlayerCharacter(){
  const c=state.playerCharacter; if(!c || !$('player-character-card')) return;
  const node=state.playerRoute?.nodes?.find(n=>n.id===state.currentRouteNodeId);
  $('player-character-card').innerHTML=`
    <div class="character-field"><b>Name</b><span>${esc(c.name)}</span></div>
    <div class="character-field"><b>Location</b><span>${esc(c.currentLocation)}</span></div>
    <div class="character-field"><b>Route Node</b><span>${esc(node?.title || c.currentRouteNodeId)}</span></div>
    <div class="character-field"><b>Equipment</b><span>${esc((c.equipment||[]).join(', '))}</span></div>
    <div class="character-field"><b>Status</b><span>${esc(c.healthStatus || '')} · ${esc(c.focusStatus || '')}</span></div><div class="character-field"><b>Objective</b><span>${esc(c.currentObjective || '')}</span></div><div class="character-field"><b>Factions</b><span>${esc((c.knownFactions||[]).join('; '))}</span></div>`;
}
function changeRouteNode(event){
  state.currentRouteNodeId=event.target.value;
  localStorage.setItem('crimsonDunes.currentRouteNodeId',state.currentRouteNodeId);
  addPlayerAction(`move_to_${state.currentRouteNodeId}`);
  renderPlayerPreview(); renderPlayerKnowledge(); renderContextPreview();
}

function stepRouteNode(direction){
  const nodes=state.playerRoute?.nodes || [];
  if(!nodes.length) return;
  const currentIndex=Math.max(0,nodes.findIndex(n=>n.id===state.currentRouteNodeId));
  const nextIndex=Math.min(nodes.length-1,Math.max(0,currentIndex+direction));
  state.currentRouteNodeId=nodes[nextIndex].id;
  localStorage.setItem('crimsonDunes.currentRouteNodeId',state.currentRouteNodeId);
  state.lastActionResult=`Moved to route node: ${nodes[nextIndex].title}`;
  localStorage.setItem('crimsonDunes.lastActionResult',state.lastActionResult);
  state.playerLog.push({at:new Date().toISOString(),routeId:state.playerRoute.id,pov:state.playerRoute.pov,currentRouteNodeId:state.currentRouteNodeId,routeStateMachine:state.routeStateMachine?{id:state.routeStateMachine.id,activeNode:state.currentRouteNodeId}:null,discoveredFactCount:(state.discoveredFacts||[]).length,action:`move_to_${state.currentRouteNodeId}`,visibility:'player-preview'});
  localStorage.setItem('crimsonDunes.playerLog',JSON.stringify(state.playerLog));
  renderPlayerPreview(); renderPlayerKnowledge(); renderContextPreview();
}
function addPlayerAction(action){
  const outcome=state.playerRoute?.actionOutcomes?.[action];
  if(outcome){
    state.lastActionResult=outcome.result;
    localStorage.setItem('crimsonDunes.lastActionResult',state.lastActionResult);
    if(outcome.discoveredFact && !state.discoveredFacts.includes(outcome.discoveredFact)){
      state.discoveredFacts.push(outcome.discoveredFact);
      localStorage.setItem('crimsonDunes.discoveredFacts',JSON.stringify(state.discoveredFacts));
    }
  } else {
    state.lastActionResult=`Action recorded: ${action.replaceAll('_',' ')}`;
    localStorage.setItem('crimsonDunes.lastActionResult',state.lastActionResult);
  }
  state.playerLog.push({at:new Date().toISOString(),routeId:state.playerRoute.id,pov:state.playerRoute.pov,currentRouteNodeId:state.currentRouteNodeId,routeStateMachine:state.routeStateMachine?{id:state.routeStateMachine.id,activeNode:state.currentRouteNodeId}:null,discoveredFactCount:(state.discoveredFacts||[]).length,action,visibility:'player-preview'});
  localStorage.setItem('crimsonDunes.playerLog',JSON.stringify(state.playerLog));
  renderPlayerLog(); renderPlayerPreview(); renderPlayerKnowledge(); renderContextPreview();
}
function renderPlayerLog(){
  $('player-event-log').innerHTML = state.playerLog.slice(-10).map(e=>`<li><b>${esc(e.action.replaceAll('_',' '))}</b><br><span class="small">${esc(e.at)} · ${esc(e.pov)}</span></li>`).join('') || '<li class="small">No player actions logged yet.</li>';
}
function exportPlayerLog(){ downloadJson({exportedAt:new Date().toISOString(),log:state.playerLog},`crimson-dunes-player-log-${new Date().toISOString().slice(0,10)}.json`); }
function clearPlayerLog(){ state.playerLog=[]; localStorage.setItem('crimsonDunes.playerLog','[]'); renderPlayerLog(); renderContextPreview(); }
function renderDevPreview(){
  const cfg=state.devConfig; if(!cfg) return;
  $('dev-feature-flags').innerHTML = Object.entries(cfg.featureFlags).map(([k,v])=>`<div class="feature-row"><code>${esc(k)}</code><span>${v?'enabled':'disabled'}</span></div>`).join('');
  $('dev-task-list').innerHTML = cfg.devTasks.map(t=>`<li><b>${esc(t.title)}</b><br><span class="small">${esc(t.id)} · ${esc(t.status)}</span></li>`).join('');
  $('dev-validation-summary').textContent = JSON.stringify({timeline: state.validationReport ? {eventCount:state.validationReport.eventCount,errorCount:state.validationReport.errorCount,warningCount:state.validationReport.warningCount} : {}, structured: state.structuredValidation}, null, 2);
  if($('dev-schema-cards') && state.structuredValidation){ $('dev-schema-cards').innerHTML=state.structuredValidation.checks.map((c,i)=>`<article class="schema-card ${esc(c.status)}" data-schema-index="${i}"><b>${esc(c.name)}</b><br><span class="small">${esc(c.status)}${c.missing.length?': missing '+esc(c.missing.join(', ')):''}</span></article>`).join(''); document.querySelectorAll('[data-schema-index]').forEach(card=>card.addEventListener('click',()=>{const c=state.structuredValidation.checks[Number(card.dataset.schemaIndex)]; if($('dev-schema-detail')) $('dev-schema-detail').textContent=JSON.stringify(c,null,2);})); }
}
function exportDevConfig(){ downloadJson({exportedAt:new Date().toISOString(),devConfig:state.devConfig,validationSummary:state.validationReport,structuredValidation:state.structuredValidation},`crimson-dunes-dev-config-${new Date().toISOString().slice(0,10)}.json`); }

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


async function importDecisionPatch(event){
  const file=event.target.files?.[0]; if(!file) return;
  try{
    const patch=JSON.parse(await file.text());
    const incoming=patch.decisions || patch.decisionSelections;
    if(!incoming || typeof incoming!=='object') throw new Error('Decision patch must contain decisions.');
    state.decisionSelections={...state.decisionSelections,...incoming};
    localStorage.setItem('crimsonDunes.decisionSelections',JSON.stringify(state.decisionSelections));
    renderDecisionQueue(); renderContextPreview();
    alert(`Imported ${Object.keys(incoming).length} decision records.`);
  }catch(err){ alert(`Could not import decision patch: ${err.message}`); }
  event.target.value='';
}
function exportSourceWorkingPatch(){
  const sourceWorking={};
  for(const [id,review] of Object.entries(state.reviews)){
    if(review.sourceWorkingNote) sourceWorking[id]={sourceWorkingNote:review.sourceWorkingNote,updatedAt:review.updatedAt};
  }
  downloadJson({exportedAt:new Date().toISOString(),status:'source-working-patch',sourceWorking},`crimson-dunes-source-working-patch-${new Date().toISOString().slice(0,10)}.json`);
}
async function importSourceWorkingPatch(event){
  const file=event.target.files?.[0]; if(!file) return;
  try{
    const patch=JSON.parse(await file.text());
    const incoming=patch.sourceWorking || patch.reviews;
    if(!incoming || typeof incoming!=='object') throw new Error('Source-working patch must contain sourceWorking or reviews.');
    for(const [id,value] of Object.entries(incoming)){
      state.reviews[id]={...(state.reviews[id]||{}),sourceWorkingNote:value.sourceWorkingNote||value.note||'',updatedAt:new Date().toISOString()};
    }
    localStorage.setItem('crimsonDunes.timelineReviews',JSON.stringify(state.reviews));
    renderTimeline(); renderContextPreview();
    alert(`Imported ${Object.keys(incoming).length} source-working records.`);
  }catch(err){ alert(`Could not import source-working patch: ${err.message}`); }
  event.target.value='';
}

function onChatSubmit(e){e.preventDefault();const input=$('chat-input'),text=input.value.trim();if(!text)return;state.transcript.push({at:new Date().toISOString(),mode:state.mode,role:'user-note',text,provider:'disabled/no-op'});state.transcript.push({at:new Date().toISOString(),mode:state.mode,role:'agent-placeholder',text:'Provider disabled. This note has been recorded locally only. Future implementation should route this through the mode-aware Agent Orchestrator.',provider:'disabled/no-op'});input.value='';persistTranscript();renderTranscript();}
function renderTranscript(){const log=$('chat-log');log.innerHTML='';state.transcript.slice(-30).forEach(msg=>{const div=document.createElement('div');div.className='chat-msg';div.innerHTML=`<div class="role">${esc(msg.mode)} · ${esc(msg.role)} · ${esc(msg.provider)}</div><div>${esc(msg.text)}</div>`;log.appendChild(div);});log.scrollTop=log.scrollHeight;}
function persistTranscript(){localStorage.setItem('crimsonDunes.agentTranscript',JSON.stringify(state.transcript));}
function exportTranscript(){downloadJson(state.transcript,`crimson-dunes-agent-transcript-${new Date().toISOString().slice(0,10)}.json`);}function downloadJson(data,name){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);}
function esc(v){return String(v??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));}
init().catch(err=>{console.error(err);document.body.innerHTML=`<pre>Failed to initialise Crimson Dunes app shell: ${esc(err.message)}</pre>`;});

async function loadV10Data(){
  try{
    const res=await fetch('data/author/canon-promotion-queue.v10.json');
    state.canonQueue=await res.json();
  }catch(err){
    state.canonQueue={id:'canon-promotion-queue-fallback',canonStatus:'draft',queueItems:[],loadError:err.message};
  }
}
function renderCanonQueue(){
  if(!$('canon-queue-list')) return;
  const q=state.canonQueue || {queueItems:[]};
  const items=q.queueItems || [];
  $('canon-queue-list').innerHTML=items.length?items.map(item=>`<article class="world-card"><h4>${esc(item.title||item.id)}</h4><p>${esc(item.nextAction||'No next action recorded.')}</p><p class="card-meta">${esc(item.status||'draft')} · ${esc(item.source||'no source')}</p></article>`).join(''):'<p class="small">No canon queue items loaded.</p>';
}
function exportCanonQueue(){
  downloadJson({exportedAt:new Date().toISOString(),canonQueue:state.canonQueue||{}},`crimson-dunes-canon-queue-${new Date().toISOString().slice(0,10)}.json`);
}
async function loadV13Data(){
  const [manifestRes, routeTestRes] = await Promise.all([
    fetch('data/build-manifest.json'),
    fetch('data/player/route-test-fixture.v13.json')
  ]);
  state.buildManifest = await manifestRes.json();
  state.routeTestFixture = await routeTestRes.json();
}
function renderRouteTestSummary(){
  if(!$('route-test-output') || !state.routeTestFixture) return;
  $('route-test-output').textContent=`Loaded ${state.routeTestFixture.tests.length} route tests. Click Run route tests.`;
}
function runRouteTests(){
  if(!$('route-test-output')) return;
  const sm=state.routeStateMachine;
  const fixture=state.routeTestFixture;
  if(!sm || !fixture){ $('route-test-output').textContent='Route state machine or fixture not loaded.'; return; }
  const results=fixture.tests.map(t=>{
    let pass=true; const notes=[];
    if(t.nodeId){
      const tr=sm.nodeTransitions[t.nodeId] || {};
      if('expectNext' in t && tr.next!==t.expectNext){ pass=false; notes.push(`expected next ${t.expectNext}, got ${tr.next}`); }
      if('expectPrevious' in t && tr.previous!==t.expectPrevious){ pass=false; notes.push(`expected previous ${t.expectPrevious}, got ${tr.previous}`); }
    }
    if(t.action){
      const effects=sm.actionStateEffects[t.action] || [];
      if(!effects.includes(t.expectEffect)){ pass=false; notes.push(`expected effect ${t.expectEffect}, got ${effects.join(', ')}`); }
    }
    return {id:t.id,pass,notes};
  });
  const summary={generatedAt:new Date().toISOString(),passed:results.filter(r=>r.pass).length,failed:results.filter(r=>!r.pass).length,results};
  $('route-test-output').textContent=JSON.stringify(summary,null,2);
}

async function loadV12Data(){
  const [routeStateRes, detailRes] = await Promise.all([
    fetch('data/player/route-state-machine.v12.json'),
    fetch('data/author-section-detail-index.v12.json')
  ]);
  state.routeStateMachine = await routeStateRes.json();
  state.authorSectionDetailIndex = await detailRes.json();
}
function renderRouteState(){
  if(!$('player-route-state-content') || !state.routeStateMachine || !state.playerRoute) return;
  const nodeId=state.currentRouteNodeId || state.routeStateMachine.startNodeId;
  const transition=state.routeStateMachine.nodeTransitions[nodeId] || {};
  $('player-route-state-content').innerHTML=`<div class="route-state-grid"><article class="route-state-card"><b>Active node</b><p>${esc(nodeId)}</p></article><article class="route-state-card"><b>Previous</b><p>${esc(transition.previous || 'none')}</p></article><article class="route-state-card"><b>Next</b><p>${esc(transition.next || 'none')}</p></article></div><h4>Objectives</h4><ul>${state.routeStateMachine.objectives.map(o=>`<li>${esc(o)}</li>`).join('')}</ul>`;
}
function exportRouteState(){
  downloadJson({exportedAt:new Date().toISOString(),activeNode:state.currentRouteNodeId,discoveredFacts:state.discoveredFacts,playerLog:state.playerLog,routeStateMachine:state.routeStateMachine},`crimson-dunes-route-state-${new Date().toISOString().slice(0,10)}.json`);
}
function renderAuthorSectionDetail(){
  if(!$('author-section-detail-content') || !state.authorSectionDetailIndex) return;
  const key=state.activeAuthorSection;
  const items=state.authorSectionDetailIndex.sections[key] || [];
  $('author-section-detail-title').textContent=`Author Section Detail: ${key.replaceAll('-',' ')}`;
  $('author-section-detail-content').innerHTML=items.length?`<ul class="author-detail-list">${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`:'<p class="small">No detail written for this section yet.</p>';
}


