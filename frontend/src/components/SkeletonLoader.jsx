export function SkeletonLoader() {
  return (
    <div className="skeleton-grid" aria-label="Loading response">
      <div className="skeleton-card" />
      <div className="skeleton-card" />
      <div className="skeleton-wide" />
    </div>
  );
}
