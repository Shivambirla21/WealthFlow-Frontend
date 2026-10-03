import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Logo from '../components/Logo.jsx';

export default function LandingPage() {
  const { signInWithGoogle } = useAuth();
  return (
    <div className="landing-page">
      {/* Header */}
      <header>
        <div className="w">
          <div className="logo"><Logo height={36} /></div>
          <nav className="links">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#security">Security</a>
          </nav>
          <div className="acts">
            <Link className="btn" to="/login">Log in</Link>
            <Link className="btn p" to="/signup">Get started</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="w">
        <div className="hero">
          <div>
            <span className="tag">✦ Personal finance, simplified</span>
            <h1>Your money. <em>One clear picture.</em></h1>
            <p className="lead">Track spending, understand your wealth, and build a better financial future — all in one calm, intelligent place.</p>
            <div className="cta">
              <Link className="btn p lg" to="/signup">Create free account</Link>
              <button type="button" className="btn lg" onClick={signInWithGoogle}>Continue with Google</button>
            </div>
            <div className="note">Free to start · No card needed · Bank-grade security</div>
          </div>
          <div className="mock">
            <div className="mr">
              <div className="mc"><div className="l">Net Worth</div><div className="n">₹84,620</div><span className="up">↑ +8.4%</span></div>
              <div className="mc"><div className="l">Income</div><div className="n">₹8,450</div><span className="up">↑ +6.2%</span></div>
              <div className="mc"><div className="l">Expenses</div><div className="n">₹5,210</div><span className="dn">↓ −3.8%</span></div>
            </div>
            <div className="mc">
              <div className="l" style={{ display: 'flex', justifyContent: 'space-between' }}>Net worth <span>1Y</span></div>
              <svg width="100%" height="170" viewBox="0 0 520 170">
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--color-primary)" stopOpacity=".3"/>
                    <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <g stroke="var(--color-border)"><path d="M0 30H520M0 80H520M0 130H520"/></g>
                <path d="M0 140C70 135 120 120 190 108S300 84 360 66 460 30 520 16V170H0Z" fill="url(#g)"/>
                <path d="M0 140C70 135 120 120 190 108S300 84 360 66 460 30 520 16" fill="none" stroke="var(--color-primary)" strokeWidth="3"/>
                <path d="M0 100C120 90 260 62 520 8" fill="none" stroke="var(--color-success)" strokeWidth="1.5" strokeDasharray="4 4"/>
                <circle cx="360" cy="66" r="6" fill="#fff" stroke="var(--color-primary)" strokeWidth="3"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="trust">
          Trusted by thousands tracking their wealth across India
          <div className="trust-slider">
            <div className="trust-track">
              <div className="trust-logo"><span className="logo-hdfc">HDFC</span></div>
              <div className="trust-logo"><span className="logo-icici">ICICI</span></div>
              <div className="trust-logo"><span className="logo-sbi">SBI</span></div>
              <div className="trust-logo"><span className="logo-axis">Axis</span></div>
              <div className="trust-logo"><span className="logo-zerodha">Zerodha</span></div>
              <div className="trust-logo"><span className="logo-hdfc">HDFC</span></div>
              <div className="trust-logo"><span className="logo-icici">ICICI</span></div>
              <div className="trust-logo"><span className="logo-sbi">SBI</span></div>
              <div className="trust-logo"><span className="logo-axis">Axis</span></div>
              <div className="trust-logo"><span className="logo-zerodha">Zerodha</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features">
        <div className="w">
          <div className="hd">
            <h2>Everything you own. Everything you owe.</h2>
            <p>One place to understand where your money is, where it's going, and where you're heading.</p>
          </div>
          <div className="grid">
            <div className="f"><i>📈</i><h3>Net worth tracking</h3><p>Assets and liabilities in one live picture of your wealth.</p></div>
            <div className="f"><i>🧾</i><h3>Smart transactions</h3><p>Auto-categorized spending, searchable in seconds with ⌘K.</p></div>
            <div className="f"><i>🎯</i><h3>Budgets that adapt</h3><p>See progress by category and catch overspending early.</p></div>
            <div className="f"><i>🏁</i><h3>Goals</h3><p>Emergency fund, laptop, vacation — track every milestone.</p></div>
            <div className="f"><i>💹</i><h3>Investments</h3><p>Stocks, mutual funds, SIPs and gold with clear returns.</p></div>
            <div className="f"><i>✦</i><h3>Useful insights</h3><p>Plain-language, actionable observations — no gimmicks.</p></div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase">
        <div className="w">
          <div className="stats">
            <div><b>₹2.4Cr</b><span>wealth tracked daily</span></div>
            <div><b>50K+</b><span>active users</span></div>
            <div><b>1.2M</b><span>transactions organized</span></div>
            <div><b>4.8★</b><span>average rating</span></div>
          </div>

          <div className="sh">
            <div>
              <span className="tag">Net worth</span>
              <h3>Watch your wealth grow, month after month.</h3>
              <p>Assets and liabilities combine into one live number, with a clear history behind it.</p>
              <ul><li>Cash, investments, property and more</li><li>Loans and cards tracked alongside</li><li>1M to All-time views</li></ul>
            </div>
            <div className="vis">
              <div className="l">Net worth</div>
              <div className="n" style={{ fontSize: '32px' }}>₹84,620 <span className="up">↑ +8.4%</span></div>
              <svg width="100%" height="190" viewBox="0 0 480 190">
                <defs>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--color-primary)" stopOpacity=".3"/>
                    <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <g stroke="var(--color-border)"><path d="M0 40H480M0 90H480M0 140H480"/></g>
                <path d="M0 160C60 155 110 140 170 128S270 100 330 80 430 40 480 22V190H0Z" fill="url(#g2)"/>
                <path d="M0 160C60 155 110 140 170 128S270 100 330 80 430 40 480 22" fill="none" stroke="var(--color-primary)" strokeWidth="3"/>
                <path d="M0 120C150 105 300 70 480 14" fill="none" stroke="var(--color-success)" strokeDasharray="4 4"/>
                <path d="M0 178C160 174 320 166 480 158" fill="none" stroke="var(--color-danger)" strokeDasharray="4 4"/>
              </svg>
            </div>
          </div>

          <div className="sh rev">
            <div>
              <span className="tag">Spending</span>
              <h3>Finally see where your money goes.</h3>
              <p>Every rupee is categorized automatically, so surprises show up before month-end.</p>
              <ul><li>Category breakdown with change vs last month</li><li>Budgets with clear progress</li><li>Recurring bills and subscriptions in one list</li></ul>
            </div>
            <div className="vis">
              <div style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
                <svg width="150" height="150" viewBox="0 0 42 42" style={{ flex: 'none' }}>
                  <g fill="none" strokeWidth="5" transform="rotate(-90 21 21)">
                    <circle cx="21" cy="21" r="15.9" stroke="var(--color-primary)" strokeDasharray="28 72"/>
                    <circle cx="21" cy="21" r="15.9" stroke="var(--color-secondary)" strokeDasharray="20 80" strokeDashoffset="-28"/>
                    <circle cx="21" cy="21" r="15.9" stroke="var(--color-warning)" strokeDasharray="14 86" strokeDashoffset="-48"/>
                    <circle cx="21" cy="21" r="15.9" stroke="var(--color-danger)" strokeDasharray="12 88" strokeDashoffset="-62"/>
                    <circle cx="21" cy="21" r="15.9" stroke="var(--color-text-muted)" strokeDasharray="26 74" strokeDashoffset="-74"/>
                  </g>
                  <text x="21" y="20" textAnchor="middle" fontSize="3" fill="var(--color-text-muted)">Spent</text>
                  <text x="21" y="25" textAnchor="middle" fontSize="5" fontWeight="700" fill="var(--color-text)">₹52,100</text>
                </svg>
                <div style={{ flex: 1 }}>
                  <div className="row2"><span>Housing</span><b>₹14,600</b></div>
                  <div className="bar2"><i style={{ width: '80%', background: 'var(--color-primary)' }}></i></div>
                  <div className="row2"><span>Food</span><b>₹10,400</b></div>
                  <div className="bar2"><i style={{ width: '62%', background: 'var(--color-secondary)' }}></i></div>
                  <div className="row2"><span>Transport</span><b>₹7,300</b></div>
                  <div className="bar2" style={{ margin: '6px 0 0' }}><i style={{ width: '45%', background: 'var(--color-warning)' }}></i></div>
                </div>
              </div>
            </div>
          </div>

          <div className="sh">
            <div>
              <span className="tag">Goals & investments</span>
              <h3>Plan ahead. Invest with confidence.</h3>
              <p>Set goals, track SIPs and mutual funds, and see projected completion dates.</p>
              <ul><li>Goal progress with monthly contributions</li><li>Portfolio value and total returns</li><li>Asset allocation at a glance</li></ul>
            </div>
            <div className="vis">
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <svg width="120" height="120" viewBox="0 0 42 42" style={{ flex: 'none' }}>
                  <g fill="none" strokeWidth="4" transform="rotate(-90 21 21)">
                    <circle cx="21" cy="21" r="15.9" stroke="var(--color-border)"/>
                    <circle cx="21" cy="21" r="15.9" stroke="var(--color-secondary)" strokeLinecap="round" strokeDasharray="72.5 27.5"/>
                  </g>
                  <text x="21" y="23" textAnchor="middle" fontSize="7" fontWeight="700" fill="var(--color-text)">72%</text>
                </svg>
                <div>
                  <div className="l">Emergency Fund</div>
                  <div className="n">₹1,45,000</div>
                  <div className="l">of ₹2,00,000 · Jun 2027</div>
                </div>
              </div>
              <svg width="100%" height="90" viewBox="0 0 480 90" style={{ marginTop: '18px' }}>
                <g fill="var(--color-primary)">
                  <rect x="10" y="60" width="34" height="30" rx="5" opacity=".5"/>
                  <rect x="62" y="50" width="34" height="40" rx="5" opacity=".6"/>
                  <rect x="114" y="52" width="34" height="38" rx="5" opacity=".6"/>
                  <rect x="166" y="38" width="34" height="52" rx="5" opacity=".7"/>
                  <rect x="218" y="30" width="34" height="60" rx="5" opacity=".8"/>
                  <rect x="270" y="24" width="34" height="66" rx="5" opacity=".9"/>
                  <rect x="322" y="14" width="34" height="76" rx="5"/>
                </g>
                <text x="380" y="30" fontSize="13" fill="var(--color-success)" fontWeight="700">↑ +16.7%</text>
                <text x="380" y="48" fontSize="11" fill="var(--color-text-muted)">portfolio return</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how">
        <div className="w">
          <div className="hd"><h2>Clarity in three steps</h2></div>
          <div className="st">
            <div><b>01</b><h3>Add your accounts</h3><p>Banks, cards, loans, investments and property.</p></div>
            <div><b>02</b><h3>See the full picture</h3><p>Net worth, cash flow and spending, instantly.</p></div>
            <div><b>03</b><h3>Improve every month</h3><p>Act on insights and watch your wealth grow.</p></div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing">
        <div className="w">
          <div className="hd"><h2>Simple pricing</h2><p>Start free. Upgrade when you want more.</p></div>
          <div className="grid price">
            <div className="pc"><b>Free</b><div className="n">₹0</div><div className="l">forever</div><ul><li>Up to 3 accounts</li><li>Budgets & goals</li><li>Basic insights</li></ul><Link className="btn" style={{ width: '100%', textAlign: 'center' }} to="/signup">Get started</Link></div>
            <div className="pc hot"><b>Plus</b><div className="n">₹199</div><div className="l">per month</div><ul><li>Unlimited accounts</li><li>Net worth & investments</li><li>Reports & exports</li><li>Advanced insights</li></ul><Link className="btn p" style={{ width: '100%', textAlign: 'center' }} to="/signup">Start free trial</Link></div>
            <div className="pc"><b>Family</b><div className="n">₹399</div><div className="l">per month</div><ul><li>Everything in Plus</li><li>Up to 5 members</li><li>Shared goals</li></ul><Link className="btn" style={{ width: '100%', textAlign: 'center' }} to="/signup">Get started</Link></div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="w">
        <div className="fin">
          <h2>Know where you stand. Starting today.</h2>
          <p>Join WealthFlow and see your whole financial life in one clear picture.</p>
          <Link className="btn p lg" to="/signup">Create free account</Link>
          <Link className="btn lg" to="/login">Log in</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="ft" id="security">
        <div className="w">
          <div className="fg">
            <div>
              <div className="logo"><Logo height={36} /></div>
              <p style={{ marginTop: '14px', maxWidth: '280px' }}>Your money. One clear picture. Track spending, understand your wealth, and build a better financial future.</p>
              <div className="nl"><div>Enter your email</div><a className="btn p">Subscribe</a></div>
              <div className="soc"><i>X</i><i>in</i><i>IG</i><i>YT</i></div>
            </div>
            <div><h4>Product</h4><span>Overview</span><span>Net worth</span><span>Budgets</span><span>Goals</span><span>Investments</span></div>
            <div><h4>Resources</h4><span>Blog</span><span>Guides</span><span>Help center</span><span>Changelog</span><span>Roadmap</span></div>
            <div><h4>Company</h4><span>About</span><span>Careers</span><span>Press</span><span>Contact</span><span>Pricing</span></div>
            <div><h4>Legal</h4><span>Privacy</span><span>Terms</span><span>Security</span><span>Cookies</span><span>Data & export</span></div>
          </div>
          <div className="fb">
            <span>© 2026 WealthFlow. Made with care in India 🇮🇳</span>
            <span>🔒 256-bit encryption · Your data is never sold</span>
            <span>English · ₹ INR</span>
          </div>
          <p className="disc">WealthFlow provides financial tracking and insights for informational purposes only and does not offer investment, tax or legal advice. Investments are subject to market risk. Sample figures shown are illustrative.</p>
        </div>
      </footer>

      <style>{`
        :root {
          box-sizing: border-box;
          padding-top: env(safe-area-inset-top, 0px);
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: env(safe-area-inset-top, 0px);
        }

        * {
          box-sizing: border-box;
          margin: 0;
        }

        body {
          background: var(--bg);
          color: var(--t);
          font: 16px/1.5 Inter, Manrope, system-ui, sans-serif;
          font-variant-numeric: tabular-nums;
        }

        .w {
          max-width: 1180px;
          margin: auto;
          padding: 0 28px;
        }

        header {
          position: sticky;
          top: 0;
          z-index: 5;
          background: rgba(15, 17, 23, .88);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--b);
        }

        header .w {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }

        .logo {
          font-size: 19px;
        }

        .links {
          display: flex;
          gap: 30px;
          color: var(--t2);
          font-weight: 500;
          font-size: 15px;
        }

        .links a {
          color: inherit;
          text-decoration: none;
        }

        .links a:hover {
          color: var(--t);
        }

        .acts {
          display: flex;
          gap: 10px;
        }

        .btn {
          padding: 10px 18px;
          border-radius: 10px;
          border: 1px solid var(--b);
          font-weight: 600;
          font-size: 15px;
          background: transparent;
          color: var(--t);
          display: inline-block;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .btn:hover {
          background: var(--s);
        }

        .btn.p {
          background: var(--p);
          border-color: var(--p);
          color: #fff;
        }

        .btn.p:hover {
          background: var(--color-primary-hover);
        }

        .btn.lg {
          padding: 14px 24px;
          font-size: 16px;
          border-radius: 12px;
        }

        .hero {
          padding: 84px 0 40px;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 56px;
          align-items: center;
        }

        .tag {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          background: var(--pl);
          color: var(--color-primary-bright);
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        h1 {
          font-size: 58px;
          line-height: 1.05;
          letter-spacing: -2px;
          margin-bottom: 20px;
        }

        h1 em {
          font-style: normal;
          color: var(--color-primary-muted);
        }

        .lead {
          color: var(--t2);
          font-size: 18px;
          max-width: 480px;
          margin-bottom: 30px;
        }

        .cta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .note {
          color: var(--t2);
          font-size: 13px;
          margin-top: 16px;
        }

        .mock {
          background: var(--s);
          border: 1px solid var(--b);
          border-radius: 20px;
          padding: 22px;
          box-shadow: 0 30px 80px rgba(99, 91, 255, .14);
        }

        .mr {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }

        .mc {
          background: var(--bg);
          border: 1px solid var(--b);
          border-radius: 14px;
          padding: 14px;
        }

        .l {
          color: var(--t2);
          font-size: 12px;
          font-weight: 500;
        }

        .n {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.6px;
        }

        .up {
          color: var(--g);
          font-size: 12px;
          font-weight: 600;
        }

        .dn {
          color: var(--r);
          font-size: 12px;
          font-weight: 600;
        }

        .trust {
          padding: 30px 0 70px;
          text-align: center;
          color: var(--t2);
          font-size: 14px;
        }

        .trust-slider {
          overflow: hidden;
          margin-top: 14px;
          position: relative;
        }

        .trust-slider::before,
        .trust-slider::after {
          content: '';
          position: absolute;
          top: 0;
          width: 100px;
          height: 100%;
          z-index: 2;
        }

        .trust-slider::before {
          left: 0;
          background: linear-gradient(to right, var(--bg), transparent);
        }

        .trust-slider::after {
          right: 0;
          background: linear-gradient(to left, var(--bg), transparent);
        }

        .trust-track {
          display: flex;
          gap: 60px;
          animation: scroll 20s linear infinite;
          width: max-content;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .trust-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 120px;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        .trust-logo span {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .trust-logo:hover {
          opacity: 1;
        }

        .logo-hdfc {
          color: #003DA5;
        }

        .logo-icici {
          color: #FF6600;
        }

        .logo-sbi {
          color: #1C4B82;
        }

        .logo-axis {
          color: #8B3A9B;
        }

        .logo-zerodha {
          color: #2962FF;
        }

        section {
          padding: 70px 0;
        }

        .hd {
          text-align: center;
          max-width: 620px;
          margin: 0 auto 46px;
        }

        .hd h2 {
          font-size: 40px;
          letter-spacing: -1.2px;
          line-height: 1.1;
          margin-bottom: 12px;
        }

        .hd p {
          color: var(--t2);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .f {
          background: var(--s);
          border: 1px solid var(--b);
          border-radius: 16px;
          padding: 26px;
        }

        .f i {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: var(--pl);
          display: grid;
          place-items: center;
          font-style: normal;
          font-size: 19px;
          margin-bottom: 16px;
        }

        .f h3 {
          font-size: 18px;
          margin-bottom: 6px;
        }

        .f p {
          color: var(--t2);
          font-size: 15px;
        }

        .st {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .st div {
          padding: 26px;
          border-top: 2px solid var(--p);
          background: var(--s);
          border-radius: 0 0 16px 16px;
        }

        .st b {
          color: var(--color-primary-muted);
          font-size: 13px;
        }

        .st h3 {
          margin: 8px 0 6px;
        }

        .st p {
          color: var(--t2);
          font-size: 15px;
        }

        .price {
          align-items: stretch;
        }

        .pc {
          background: var(--s);
          border: 1px solid var(--b);
          border-radius: 18px;
          padding: 30px;
        }

        .pc.hot {
          border-color: var(--p);
          box-shadow: 0 0 0 1px var(--p), 0 20px 50px rgba(99, 91, 255, .18);
        }

        .pc .n {
          font-size: 38px;
          margin: 10px 0 4px;
        }

        .pc ul {
          list-style: none;
          padding: 0;
          margin: 20px 0 24px;
          color: var(--t2);
          font-size: 15px;
          display: grid;
          gap: 10px;
        }

        .pc li:before {
          content: "✓ ";
          color: var(--g);
          font-weight: 700;
        }

        .fin {
          margin: 40px 0 80px;
          background: linear-gradient(135deg, var(--color-primary-deep), var(--color-surface));
          border: 1px solid var(--b);
          border-radius: 24px;
          padding: 64px 28px;
          text-align: center;
        }

        .fin h2 {
          font-size: 40px;
          letter-spacing: -1.2px;
          margin-bottom: 12px;
        }

        .fin p {
          color: var(--t2);
          margin-bottom: 26px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          padding: 10px 0 30px;
          text-align: center;
        }

        .stats b {
          display: block;
          font-size: 38px;
          letter-spacing: -1px;
          color: var(--color-primary-bright);
        }

        .stats span {
          color: var(--t2);
          font-size: 14px;
        }

        .sh {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          padding: 46px 0;
        }

        .sh.rev > .vis {
          order: -1;
        }

        .sh h3 {
          font-size: 32px;
          letter-spacing: -1px;
          line-height: 1.15;
          margin: 14px 0;
        }

        .sh p {
          color: var(--t2);
          margin-bottom: 18px;
        }

        .sh ul {
          list-style: none;
          padding: 0;
          display: grid;
          gap: 10px;
          color: var(--t2);
          font-size: 15px;
        }

        .sh li:before {
          content: "✓ ";
          color: var(--g);
          font-weight: 700;
        }

        .vis {
          background: var(--s);
          border: 1px solid var(--b);
          border-radius: 22px;
          padding: 24px;
          box-shadow: 0 30px 70px rgba(99, 91, 255, .12);
        }

        .bar2 {
          height: 8px;
          background: var(--bg);
          border-radius: 8px;
          overflow: hidden;
          margin: 6px 0 14px;
        }

        .bar2 i {
          display: block;
          height: 100%;
          border-radius: 8px;
        }

        .row2 {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }

        .nl {
          display: flex;
          gap: 10px;
          margin-top: 14px;
        }

        .nl div {
          flex: 1;
          padding: 11px 14px;
          border: 1px solid var(--b);
          border-radius: 10px;
          background: var(--bg);
          color: var(--t2);
          font-size: 14px;
        }

        .ft {
          background: var(--s);
          border-top: 1px solid var(--b);
          padding: 64px 0 28px;
          color: var(--t2);
          font-size: 14px;
        }

        .fg {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr;
          gap: 36px;
        }

        .fg h4 {
          color: var(--t);
          font-size: 14px;
          margin-bottom: 14px;
        }

        .fg div > span {
          display: block;
          margin: 0 0 10px;
          cursor: pointer;
          transition: color 0.15s ease;
        }

        .fg div > span:hover {
          color: var(--t);
        }

        .soc {
          display: flex;
          gap: 10px;
          margin-top: 16px;
        }

        .soc i {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid var(--b);
          display: grid;
          place-items: center;
          font-style: normal;
          font-size: 13px;
          color: var(--t);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .soc i:hover {
          background: var(--p);
          border-color: var(--p);
          color: #fff;
        }

        .fb {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          border-top: 1px solid var(--b);
          margin-top: 44px;
          padding-top: 24px;
          font-size: 13px;
        }

        .disc {
          margin-top: 20px;
          font-size: 12px;
          line-height: 1.6;
          color: var(--color-text-faint);
        }

        @media (max-width: 900px) {
          .hero, .grid, .st {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 40px;
          }

          .links {
            display: none;
          }

          .hd h2, .fin h2 {
            font-size: 30px;
          }

          .sh, .fg, .stats {
            grid-template-columns: 1fr;
          }

          .sh.rev > .vis {
            order: 0;
          }

          .sh h3 {
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
}
