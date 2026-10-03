export default function Logo({ variant = 'lockup', height = 36 }) {
  const style = { '--wf-logo-height': `${height}px` };

  if (variant === 'mark') {
    return (
      <img
        className="wf-logo"
        src="/brand/logo-mark.png"
        alt="WealthFlow"
        style={style}
        draggable="false"
      />
    );
  }

  return (
    <span className="wf-logo-lockup" role="img" aria-label="WealthFlow">
      <img
        className="wf-logo wf-logo-for-dark"
        src="/brand/logo-lockup.png"
        alt=""
        style={style}
        draggable="false"
      />
      <img
        className="wf-logo wf-logo-for-light"
        src="/brand/logo-lockup-light.png"
        alt=""
        style={style}
        draggable="false"
      />
    </span>
  );
}
