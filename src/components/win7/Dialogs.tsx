/** Reusable Windows-style modal dialogs (info / warn / error / success). */
import { Icon } from "./icons";
import { useOS } from "./os";

export function DialogLayer() {
  const { dialogs, closeDialog } = useOS();
  if (dialogs.length === 0) return null;
  const dlg = dialogs[dialogs.length - 1];
  if (!dlg) return null;

  return (
    <div className="w7-dialog-layer">
      <div className="w7-dialog" role="alertdialog" aria-modal="true" aria-label={dlg.title}>
        <div className="w7-title">
          <Icon kind={dlg.kind} size={16} className="w7-title-icon" />
          <div className="w7-title-text">{dlg.title}</div>
          <div className="w7-caption">
            <button
              type="button"
              className="w7-cap w7-cap-close"
              aria-label="Close dialog"
              onClick={() => closeDialog(dlg.id)}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
                <path d="M1.5 1.5l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="1.8" fill="none" />
              </svg>
            </button>
          </div>
        </div>
        <div className="w7-dialog-body">
          <div className="w7-dialog-msg">
            <Icon kind={dlg.kind} size={40} />
            <div>
              {dlg.heading && <h3>{dlg.heading}</h3>}
              <p>{dlg.message}</p>
            </div>
          </div>
          <div className="w7-dialog-actions">
            {dlg.buttons.map((b, i) => (
              <button
                key={`${b.label}-${i}`}
                type="button"
                className={`w7-btn ${b.primary ? "w7-btn-default" : ""}`}
                autoFocus={b.primary}
                onClick={() => {
                  b.action?.();
                  closeDialog(dlg.id);
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
