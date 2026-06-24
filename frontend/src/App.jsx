import React from "react";
import { useEffect, useState } from "react";
import { Network } from "lucide-react";
import { submitEdges } from "./api/bfhlApi.js";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import { HierarchyCards } from "./components/HierarchyCards.jsx";
import { InputPanel } from "./components/InputPanel.jsx";
import { IssueSections } from "./components/IssueSections.jsx";
import { JsonViewer } from "./components/JsonViewer.jsx";
import { SkeletonLoader } from "./components/SkeletonLoader.jsx";
import { SummaryCards } from "./components/SummaryCards.jsx";
import { ThemeToggle } from "./components/ThemeToggle.jsx";
import { Toast } from "./components/Toast.jsx";
import { useTheme } from "./hooks/useTheme.js";
import { parseInput, SAMPLE_INPUT } from "./utils/inputParser.js";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [input, setInput] = useState(SAMPLE_INPUT);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function showToast(type, message) {
    setToast({ type, message });
  }

  async function handleSubmit() {
    const edges = parseInput(input);

    if (edges.length === 0) {
      setValidationMessage("Enter at least one edge before submitting.");
      showToast("error", "Input cannot be empty.");
      return;
    }

    setValidationMessage("");
    setError("");
    setIsLoading(true);

    try {
      const payload = await submitEdges(edges);
      setResponse(payload);
      showToast("success", "Hierarchy generated successfully.");
    } catch (requestError) {
      setError(requestError.message);
      showToast("error", requestError.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSampleInput() {
    setInput(SAMPLE_INPUT);
    setValidationMessage("");
    showToast("success", "Sample input loaded.");
  }

  async function handleCopyJson() {
    if (!response) {
      return;
    }

    await navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    showToast("success", "JSON copied to clipboard.");
  }

  return (
    <ErrorBoundary>
      <main className="app-shell">
        <Toast toast={toast} />

        <section className="hero-section">
          <nav className="top-nav" aria-label="Application toolbar">
            <div className="brand-mark">
              <Network size={22} />
              <span>BFHL Hierarchy Builder</span>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </nav>

          <div className="hero-content">
            <p className="eyebrow">Chitkara Full Stack Engineering Challenge</p>
            <h1>Production-ready graph hierarchy visualizer</h1>
            <p>
              Validate edge input, detect duplicates and cycles, build connected tree groups, and inspect the exact
              challenge API response in one polished dashboard.
            </p>
          </div>
        </section>

        <section className="dashboard-grid">
          <InputPanel
            input={input}
            validationMessage={validationMessage}
            isLoading={isLoading}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            onSample={handleSampleInput}
            onRetry={handleSubmit}
            canRetry={Boolean(error)}
          />

          <div className="dashboard-main">
            {error ? (
              <div className="alert-box" role="alert">
                <strong>Request failed</strong>
                <span>{error}</span>
              </div>
            ) : null}

            <SummaryCards response={response} />
            {isLoading ? <SkeletonLoader /> : <HierarchyCards hierarchies={response?.hierarchies || []} />}
            <IssueSections invalidEntries={response?.invalid_entries || []} duplicateEdges={response?.duplicate_edges || []} />
            <JsonViewer response={response} onCopy={handleCopyJson} />
          </div>
        </section>
      </main>
    </ErrorBoundary>
  );
}

export default App;
