import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import GlobalHeader from '../components/layout/GlobalHeader.jsx';

const rows = [
  ['Income','💼',87000,'accrual'],['Spending','🛍️',-58580,'accrual'],['Loan interest','🏦',-16590,'accrual'],
  ['Investments','📈',9100,'live'],['Property','🏠',9250,'estimate'],['Vehicle','🛵',-650,'estimate'],['Gold & other','💎',700,'live'],
];
const periods = { min:['Minute','min',1/43200,2],hr:['Hour','hr',1/720,2],day:['Day','day',1/30,0],mo:['Month','mo',1,0],yr:['Year','yr',12,0] };
const monthly = rows.reduce((sum,row)=>sum+row[2],0);
const fmt=(n,d=0)=>Math.abs(n).toLocaleString('en-IN',{minimumFractionDigits:d,maximumFractionDigits:d});
const signed=(n,d=2)=>(n>=0?'+₹':'−₹')+fmt(n,d);
const polar=(a,r=150)=>({x:200+r*Math.sin(a*Math.PI/180),y:200-r*Math.cos(a*Math.PI/180)});
const arc=(a,b)=>{const p=polar(a),q=polar(b);return 'M '+p.x+' '+p.y+' A 150 150 0 0 1 '+q.x+' '+q.y;};

function Gauge({value,max,calm}) {
  const angle=Math.max(-90,Math.min(90,value/max*90));
  return <div className={'speed-gauge'+(calm?' calm':'')}><svg viewBox="0 0 400 230" role="img" aria-label="Net worth velocity gauge">
    <path d={arc(-90,0)} fill="none" stroke="var(--danger)" strokeOpacity=".28" strokeWidth="16" strokeLinecap="round"/>
    <path d={arc(0,90)} fill="none" stroke="var(--success)" strokeOpacity=".28" strokeWidth="16" strokeLinecap="round"/>
    <path d={value>=0?arc(0,Math.max(angle,1)):arc(Math.min(angle,-1),0)} fill="none" stroke={value>=0?'var(--success)':'var(--danger)'} strokeWidth="16" strokeLinecap="round"/>
    {Array.from({length:11},(_,i)=>-90+i*18).map(t=>{const p=polar(t,126),q=polar(t,t%90===0?112:118);return <line key={t} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="var(--text-muted)" strokeWidth="2"/>;})}
    <text x="40" y="222" fontSize="11" fill="var(--danger)" textAnchor="middle">LOSING</text><text x="360" y="222" fontSize="11" fill="var(--success)" textAnchor="middle">GROWING</text><text x="200" y="40" fontSize="11" fill="var(--text-muted)" textAnchor="middle">STEADY</text>
    <g className="speed-needle" style={{transform:'rotate('+angle+'deg)'}}><path d="M196 200 L200 70 L204 200 Z" fill="var(--text)"/></g><circle cx="200" cy="200" r="11" fill="var(--surface)" stroke="var(--text)" strokeWidth="3"/>
  </svg></div>;
}

function Sources({multiplier,unit,digits}) {
  const max=Math.max(...rows.map(r=>Math.abs(r[2])));
  return <section className="speed-card"><div className="speed-heading"><h2>Where it comes from</h2><span className="muted">₹ per {unit}</span></div><div className="source-list">
    {rows.map(([name,icon,amount,type])=>{const value=amount*multiplier;const label=type==='live'?'● LIVE':type==='estimate'?'◐ ESTIMATE':'◆ ACCRUAL';return <div className="source-row" key={name}><div className="source-icon">{icon}</div><div><div className="source-name"><b>{name}</b><span className={'source-badge '+type}>{label}</span></div><div className="source-track"><i style={{width:(Math.abs(amount)/max*100)+'%',background:amount>=0?'var(--success)':'var(--danger)'}}/></div></div><strong className={'source-amount '+(value>=0?'positive':'negative')}>{value>=0?'▲ +':'▼ −'}₹{fmt(value,digits)}</strong></div>;})}
  </div><div className="source-legend"><span>● LIVE market prices</span><span>◐ ESTIMATE average growth</span><span>◆ ACCRUAL spread evenly</span></div></section>;
}

export default function SpeedometerPage() {
  const {toggleTheme}=useAuth();
  const [period,setPeriod]=useState('day'),[paused,setPaused]=useState(false),[calm,setCalm]=useState(false);
  const [netWorth,setNetWorth]=useState(84620),[sinceMidnight,setSinceMidnight]=useState(0);
  const selected=periods[period],velocity=monthly*selected[2],minute=monthly*periods.min[2];
  useEffect(()=>{if(paused)return undefined;const timer=window.setInterval(()=>{const now=new Date();const seconds=now.getHours()*3600+now.getMinutes()*60+now.getSeconds();setNetWorth(v=>v+monthly/2592000);setSinceMidnight(monthly/2592000*seconds);},1000);return ()=>window.clearInterval(timer);},[paused]);
  return <main className="speedometer-page">
    <GlobalHeader title="Wealth Speedometer" subtitle="How fast your wealth is moving, right now." showSearch={false} showAddButton={false} onThemeToggle={toggleTheme}
      additionalActions={<><span className={'speed-live-pill'+(paused?' paused':'')}><i/>{paused?'PAUSED':'LIVE'} <b>{signed(minute,2)} / min</b></span><button className="speed-action" type="button" onClick={()=>setPaused(v=>!v)}>{paused?'▶ Resume live':'❚❚ Pause live'}</button><button className={'speed-action'+(calm?' selected':'')} type="button" onClick={()=>setCalm(v=>!v)}>☾ Calm mode</button></>}/>
    <section className="speed-hero"><div className="speed-card velocity-card"><div className="speed-heading velocity-heading"><h2>Net worth velocity</h2><div className="speed-periods">{Object.entries(periods).map(([key,item])=><button type="button" key={key} className={period===key?'active':''} onClick={()=>setPeriod(key)}>{item[0]}</button>)}</div></div>
      <Gauge value={velocity} max={Math.max(1,2*Math.abs(monthly)*selected[2])} calm={calm}/><div className="speed-gauge-value"><b className={velocity>=0?'positive':'negative'}>{signed(velocity,selected[3])}</b><span>per {selected[0].toLowerCase()}</span></div>
      <div className="speed-net-worth"><span>Net worth, {paused?'paused':'live'}</span><strong>₹{fmt(netWorth,calm?0:2)}</strong><small>▲ {signed(sinceMidnight,2)} since midnight</small></div></div>
      <Sources multiplier={selected[2]} unit={selected[0].toLowerCase()} digits={selected[3]}/></section>
    <section className="speed-metrics">
      <article className="speed-card metric"><span>🔥 Burn rate</span><b className="negative">₹{fmt(75170*selected[2],selected[3])} / {selected[1]}</b><p>Your living costs and loan interest, even while you sleep.</p></article>
      <article className="speed-card metric"><span>🏦 Loan interest ticking</span><b className="negative">₹{fmt(16590*selected[2],selected[3])} / {selected[1]}</b><p>Across your home, personal, vehicle and card loans.</p><small>That's ₹{fmt(16590*periods.hr[2],2)} an hour, or ₹{fmt(16590*periods.day[2],0)} a day.</small></article>
      <article className="speed-card metric"><span>⏳ Freedom clock</span><b>{((500000-netWorth)/monthly).toFixed(1)} months</b><div className="freedom-track"><i/></div><p>to reach ₹5,00,000 net worth at your current speed (16.9% there).</p></article>
    </section>
    <p className="speed-disclaimer">Income and spending are spread evenly across the month. Live items follow market prices and estimated items use average growth rates, so the speed is an estimate, not a bank figure. Illustrative numbers only.</p>
    <style>{\`
      .speedometer-page{flex:1;min-width:0;padding:28px 40px 56px;display:flex;flex-direction:column;gap:20px;color:var(--text)}
      .speed-hero{display:grid;grid-template-columns:1.25fr 1fr;gap:20px;min-width:0}
      .speed-card{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:24px;min-width:0}
      .speed-heading{display:flex;justify-content:space-between;align-items:center;gap:12px}.speed-heading h2{font-size:16px;margin:0}.muted{font-size:12px;color:var(--text-muted)}
      .speed-periods{display:flex;gap:2px;background:var(--bg);padding:3px;border-radius:10px;flex-wrap:wrap}
      .speed-periods button{border:0;background:transparent;color:var(--text-muted);padding:6px 10px;border-radius:8px;font-family:inherit;font-size:12px;font-weight:600;cursor:pointer}
      .speed-periods button.active{background:var(--surface);color:var(--text);box-shadow:0 1px 3px #0005}
      .speed-gauge{max-width:520px;margin:6px auto 0}.speed-gauge svg{width:100%;display:block;overflow:visible}
      .speed-needle{transform-origin:200px 200px;transition:transform .7s cubic-bezier(.3,1.4,.5,1)}.speed-gauge.calm .speed-needle{transition:none}
      .speed-gauge-value{text-align:center;margin-top:-30px;position:relative}.speed-gauge-value b{display:block;font-size:34px;letter-spacing:-1px}.speed-gauge-value span{font-size:12px;color:var(--text-muted)}
      .positive{color:var(--success)}.negative{color:var(--danger)}
      .speed-net-worth{text-align:center;margin-top:16px;display:flex;flex-direction:column;gap:4px}.speed-net-worth span,.speed-net-worth small{font-size:12px;color:var(--text-muted)}.speed-net-worth strong{font-size:40px;line-height:1.1;letter-spacing:-1.5px}
      .source-list{margin-top:8px}.source-row{display:grid;grid-template-columns:34px minmax(0,1fr) 118px;gap:12px;align-items:center;padding:12px 0;border-top:1px solid var(--border)}.source-row:first-child{border-top:0}
      .source-icon{width:34px;height:34px;border-radius:10px;background:var(--primary-soft);display:grid;place-items:center}.source-name{display:flex;align-items:center;gap:7px;flex-wrap:wrap;font-size:13px}
      .source-badge{font-size:9px;font-weight:750;padding:2px 7px;border-radius:12px;white-space:nowrap}.source-badge.live{background:#10b98124;color:var(--success)}.source-badge.estimate{background:#f59e0b24;color:var(--warning)}.source-badge.accrual{background:#635bff29;color:#A5A0FF}
      .source-track{height:6px;background:var(--bg);border-radius:6px;margin-top:6px;overflow:hidden}.source-track i{display:block;height:100%;border-radius:6px}.source-amount{text-align:right;font-size:12px;white-space:nowrap}
      .source-legend{display:flex;gap:12px;font-size:10px;color:var(--text-muted);flex-wrap:wrap;margin-top:12px}
      .speed-metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.metric{padding:20px;display:flex;flex-direction:column;align-items:flex-start}.metric>span{font-size:13px;color:var(--text-muted)}.metric b{font-size:27px;letter-spacing:-1px;margin:6px 0 4px}.metric p,.metric small{font-size:12px;color:var(--text-muted);line-height:1.6}.metric small{margin-top:6px}
      .freedom-track{width:100%;height:8px;background:var(--bg);border-radius:8px;overflow:hidden;margin:10px 0 6px}.freedom-track i{display:block;width:16.9%;height:100%;background:var(--primary)}
      .speed-disclaimer{font-size:11px;color:var(--text-muted);line-height:1.6}
      .speed-live-pill{display:inline-flex;align-items:center;gap:7px;padding:8px 12px;border:1px solid var(--border);border-radius:20px;background:var(--surface);font-size:11px;font-weight:700;white-space:nowrap}.speed-live-pill i{width:7px;height:7px;border-radius:50%;background:var(--success);animation:speed-blink 1.6s infinite}.speed-live-pill.paused i{background:var(--text-muted);animation:none}.speed-live-pill b{color:var(--success)}.speed-live-pill.paused b{color:var(--text-muted)}
      @keyframes speed-blink{50%{opacity:.3}}.speed-action{padding:9px 11px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--text);font-family:inherit;font-size:12px;font-weight:600;white-space:nowrap;cursor:pointer}.speed-action:hover,.speed-action.selected{border-color:var(--primary);background:var(--primary-soft)}
      @media(max-width:1250px){.speedometer-page{padding:22px 24px 44px}.speed-hero{grid-template-columns:1fr}.speed-gauge{max-width:480px}}
      @media(max-width:1024px){.speedometer-page .header-right{flex-wrap:wrap}}@media(max-width:900px){.speed-metrics{grid-template-columns:1fr 1fr}}
      @media(max-width:768px){.speedometer-page{padding:16px;gap:16px}.speed-metrics{grid-template-columns:1fr}.speed-card{padding:18px}.velocity-heading{align-items:flex-start;flex-direction:column}.speed-periods{width:100%;justify-content:space-between}.speed-periods button{padding:6px 7px}.source-row{grid-template-columns:32px minmax(0,1fr) auto;gap:8px}.source-amount{font-size:11px}.speed-live-pill{display:none}}
    \`}</style>
  </main>;
}
