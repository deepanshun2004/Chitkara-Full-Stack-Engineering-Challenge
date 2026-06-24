import React from "react";
import { ClipboardCheck, Play, RotateCcw, Send } from "lucide-react";
import { Spinner } from "./Spinner.jsx";
import { SAMPLE_INPUT } from "../utils/inputParser.js";

export function InputPanel({
  input,
  validationMessage,
  isLoading,
  onInputChange,
  onSubmit,
  onSample,
  onRetry,
  canRetry
}) {
  return (
    <section className="panel input-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Challenge Input</p>
          <h2>Enter directed edges</h2>
        </div>
        <button className="ghost-button" type="button" onClick={onSample}>
          <ClipboardCheck size={18} />
          Sample
        </button>
      </div>

      <textarea
        value={input}
        onChange={(event) => onInputChange(event.target.value)}
        placeholder={SAMPLE_INPUT}
        rows={9}
        aria-label="Hierarchy edge input"
      />

      {validationMessage ? <p className="validation-message">{validationMessage}</p> : null}

      <div className="action-row">
        <button className="primary-button" type="button" disabled={isLoading} onClick={onSubmit}>
          {isLoading ? <Spinner /> : <Send size={18} />}
          {isLoading ? "Processing" : "Submit"}
        </button>

        {canRetry ? (
          <button className="secondary-button" type="button" disabled={isLoading} onClick={onRetry}>
            <RotateCcw size={18} />
            Retry
          </button>
        ) : null}

        <button className="secondary-button" type="button" disabled={isLoading} onClick={onSample}>
          <Play size={18} />
          Load Sample
        </button>
      </div>
    </section>
  );
}
