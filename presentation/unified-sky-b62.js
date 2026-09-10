// Presentation only. The inherited mosaic planner and mount calculations are unchanged.
const captureSkyStyle=document.createElement('style');captureSkyStyle.textContent=`
#capture-sky-tools{position:absolute;right:18px;top:125px;z-index:36;width:242px;padding:15px;border:1px solid #324253;border-radius:12px;background:#0b1524ed;color:#bfd0e3;font:12px/1.5 system-ui;box-sizing:border-box}
#capture-sky-tools b{font-size:14px;color:#edf6ff}#capture-sky-tools .sky-frames{display:flex;gap:4px;margin:11px 0}#capture-sky-tools button{font-size:11px;padding:7px;flex:1}#capture-sky-tools input[type=search],#capture-sky-tools select{box-sizing:border-box;width:100%;margin:7px 0;background:#121f30;color:#e8f2ff;border:1px solid #395268;border-radius:5px;padding:8px;font:12px system-ui}#capture-sky-tools .sky-featured{display:flex;gap:4px;flex-wrap:wrap}#capture-sky-tools .sky-featured button{flex:auto;font-size:10px}#capture-object-note{font-size:11px;color:#a7bbd2;min-height:32px;margin:10px 0 0}#capture-sky-tools summary{cursor:pointer;margin-top:10px}#capture-sky-tools details p{font-size:10px;color:#8da7bc}#capture-sky-tools label{display:block;margin-top:8px}
body:not(.studio-instrument):not(.studio-optics) #studio-heading{right:285px}body.studio-instrument #capture-sky-tools,body.studio-optics #capture-sky-tools{display:none}
@media(max-width:1100px),(max-height:850px){#capture-sky-tools{width:198px;right:10px;top:160px;padding:10px}body:not(.studio-instrument):not(.studio-optics) #studio-heading{right:20px}#capture-sky-tools{width:240px;top:170px}#capture-sky-tools>b,#capture-sky-tools label[for=capture-search],#capture-object-note,#capture-sky-tools .sky-featured{display:none}#capture-sky-tools .sky-frames{margin:0 0 6px}#capture-sky-tools .sky-frames button{white-space:nowrap}#capture-sky-tools input[type=search],#capture-sky-tools select{margin:4px 0}#mosview{width:240px!important;height:250px!important;top:auto!important;bottom:68px!important;right:10px!important}body:has(#capture-sky-tools details[open]) #mosview{display:none!important}#studio-heading h2{font-size:20px}}@media(max-width:760px){#capture-sky-tools{width:170px;top:155px}#capture-sky-tools .sky-featured{display:none}#studio-heading h2{font-size:15px}}
`;document.head.appendChild(captureSkyStyle);
const captureSkyTools=document.createElement('aside');captureSkyTools.id='capture-sky-tools';captureSkyTools.innerHTML=`<b>One scene · near to far</b><div class="sky-frames"><button data-sky-frame="capture">Capture</button><button data-sky-frame="object">Object</button><button data-sky-frame="sphere">Full sky</button></div><label for="capture-search">Explore 49 photographed objects</label><input id="capture-search" type="search" placeholder="Search M45, Pleiades, Veil…"><select id="capture-target" aria-label="Photographed sky object"></select><div class="sky-featured"><button data-object="M31">Andromeda</button><button data-object="M45">Pleiades</button><button data-object="VEIL">Veil</button><button data-object="M42">Orion</button></div><p id="capture-object-note"></p><details><summary>Celestial sphere</summary><label><input type="checkbox" id="capture-stars" checked> Bright-star names</label><label><input type="checkbox" id="capture-grid" checked> Equator, horizon and grid</label><p>5,070 HYG stars, both hemispheres. Amber: equator. Teal: local horizon. All sky directions use one display radius, not stellar distances. Catalogue images are illustrative; the below-horizon sky remains available for teaching.</p></details>`;document.body.appendChild(captureSkyTools);
let captureGrid=true,captureLastKey='',capturePose='capture';
function captureTargetList(query=''){
 const select=document.getElementById('capture-target');select.replaceChildren(new Option('Choose a target…',''));
 const q=query.trim().toLowerCase();TGT.forEach((t,i)=>{if((t.n+' '+tgtKey(t)).toLowerCase().includes(q))select.add(new Option(t.n,String(i)));});
 const selected=MOS.tgt>=0?MOS.tgt:TGT.indexOf(currentTeachingTarget());if(selected>=0)select.value=String(selected);
}
function chooseCaptureTarget(i){
 if(!Number.isInteger(i)||!TGT[i])return;
 window.__originReplay?.stop();applyTarget(i);MOS.runName='';pointAtPanel();sky3Update();imageKey='';frameCaptureSky(capturePose);captureTargetList(document.getElementById('capture-search').value);
}
document.getElementById('capture-search').oninput=e=>captureTargetList(e.target.value);
document.getElementById('capture-target').onchange=e=>{if(e.target.value!=='')chooseCaptureTarget(+e.target.value);};
captureSkyTools.querySelectorAll('[data-object]').forEach(b=>b.onclick=()=>chooseCaptureTarget(TGT.findIndex(t=>tgtKey(t)===b.dataset.object)));
captureSkyTools.querySelectorAll('[data-sky-frame]').forEach(b=>b.onclick=()=>frameCaptureSky(b.dataset.skyFrame));
document.getElementById('capture-stars').onchange=e=>{STUDIO.skyLabels=e.target.checked;document.getElementById('sky-labels').checked=e.target.checked;};
document.getElementById('capture-grid').onchange=e=>captureGrid=e.target.checked;
function frameCaptureSky(kind='capture'){
 capturePose=kind;const L=plateLayout(),side=L.n.clone().cross(v3(0,1,0)).normalize();if(side.length()<.5)side.set(1,0,0);
 controls.enableDamping=false;controls.update();controls.enableDamping=true;camera.up.set(0,1,0);camera.fov=kind==='capture'?36:42;controls.minDistance=.08;controls.maxDistance=65;
 if(kind==='sphere'){controls.target.copy(L.P);camera.position.copy(L.P).add(v3(16,11,19));}
 else if(kind==='object'){const span=objectSpan(currentTeachingTarget()),size=Math.max(span.aw,span.ah,MOS.W,MOS.H)*L.scale;controls.target.copy(L.plateC);camera.position.copy(L.plateC).addScaledVector(L.n,-Math.max(.3,size*2.1));camera.up.copy(skyNorthAt(L.n));}
 else {controls.target.copy(L.P).addScaledVector(L.n,1.65).add(v3(0,-.4,0));camera.position.copy(L.P).addScaledVector(L.n,-5.0).addScaledVector(side,1.35).add(v3(0,1.15,0));}
 camera.updateProjectionMatrix();controls.update();captureLock();
 captureSkyTools.querySelectorAll('[data-sky-frame]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.skyFrame===kind)));
}
function updateCaptureSky(dt){
 window.__originReplay?.tick(dt);
 const on=STUDIO.mode==='observe';if(!on)return;
 const P=opticalRay().p;skyCatalog.position.copy(P);sphereHorizon.position.copy(P);skyCatalog.visible=true;skyGrid.visible=sphereHorizon.visible=captureGrid;targetMarker.visible=false;
 // Keep scene geometry and registered sky directions synchronized even during scrubbing.
 sky3D.visible=true;sky3Update();
 const far=camera.position.distanceTo(P)>12;ground.visible=!far;grid.visible=!far;
 targetLabel.visible=far;
 if(MOS.tgt<0&&MOS.runName){const o=document.getElementById('q-tgt').querySelector('option[value="-1"]');if(o)o.textContent='Preset · '+(currentTeachingTarget()?.n||'Custom field');document.getElementById('q-obs').textContent='Preset centre · RA '+S.ra.toFixed(4)+'° · Dec '+S.tdec.toFixed(4)+'°';}

 const t=currentTeachingTarget(),key=t?tgtKey(t):'';
 if(key!==captureLastKey){captureLastKey=key;targetLabel.material.map?.dispose();targetLabel.material.dispose();targetLabel.material=labelSprite(t?t.n:'Custom field','#ffbd7f',1.2).material;captureTargetList(document.getElementById('capture-search').value);}
 document.getElementById('capture-object-note').textContent=(t?t.n:'Custom field')+' · '+(S.alt<0?'Below the local horizon':S.alt.toFixed(1)+'° altitude')+' · '+(S.mode==='eq'?'Equatorial':'Alt-Az');
}
captureTargetList();
