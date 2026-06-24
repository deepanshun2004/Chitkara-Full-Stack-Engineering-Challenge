import { Copy } from "lucide-react";

export function JsonViewer({ response, onCopy }) {
  return (
    <section className="panel json-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">API Response</p>
          <h2>Pretty JSON</h2>
        </div>
        <button className="ghost-button" type="button" onClick={onCopy} disabled={!response}>
          <Copy size={18} />
          Copy JSON
        </button>
      </div>
      <pre>{response ? JSON.stringify(response, null, 2) : "Submit input to view the response payload."}</pre>
    </section>
  );
}
