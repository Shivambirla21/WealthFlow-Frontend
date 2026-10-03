export default function SectionPage({ title }) {
  return (
    <main className="section-main">
      <h1>{title}</h1>
      <p>This section is on its own page and ready for its screen.</p>
      <style>{`
        .section-main {
          flex: 1;
          min-width: 0;
          padding: 28px 40px 48px;
        }
        .section-main h1 {
          margin: 0 0 8px;
          font-size: 28px;
          color: var(--color-text);
        }
        .section-main p {
          margin: 0;
          color: var(--color-text-muted);
        }
      `}</style>
    </main>
  );
}
