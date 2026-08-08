export function TableBlock({
  caption,
  headers,
  rows,
}: {
  caption?: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="measure w-[90%]">
      <table className="w-full table-fixed border-collapse text-left">
        {caption && (
          <caption className="t-meta pb-2 text-left text-[var(--text-muted)]">{caption}</caption>
        )}
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="border-b border-[var(--border-hair)] px-1 py-2 text-[0.6875rem] font-semibold uppercase leading-tight tracking-normal text-[var(--text-gold)]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-white/[0.03]">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="t-body-sm border-b border-[var(--border-hair)] px-1 py-2 text-[var(--text-secondary)] first:font-semibold first:text-[var(--text-primary)]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
