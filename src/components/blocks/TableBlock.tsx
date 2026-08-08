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
    <div className="table-scroll measure -mx-1 px-1">
      <table className="w-full border-collapse text-left">
        {caption && (
          <caption className="t-meta pb-2 text-left text-[var(--text-muted)]">{caption}</caption>
        )}
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="t-eyebrow whitespace-nowrap border-b border-[var(--border-hair)] px-3 py-2 text-[var(--text-gold)]"
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
                  className="t-body-sm whitespace-nowrap border-b border-[var(--border-hair)] px-3 py-2 text-[var(--text-secondary)] first:font-semibold first:text-[var(--text-primary)]"
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
