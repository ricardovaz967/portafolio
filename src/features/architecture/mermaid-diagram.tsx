"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "dark",
});

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    mermaid
      .render(`diagram-${id}`, chart)
      .then((result) => {
        if (mounted) setSvg(result.svg);
      })
      .catch(() => {
        if (mounted) setSvg("");
      });

    return () => {
      mounted = false;
    };
  }, [chart, id]);

  if (!svg) {
    return (
      <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900 p-4 text-xs text-slate-300">
        {chart}
      </pre>
    );
  }

  return <div className="mermaid-svg overflow-x-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />;
}
