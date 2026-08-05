import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AiOutlineLoading3Quarters,
  AiOutlineReload,
} from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import {
  RECENT_SAMPLE_LIMIT,
  adminSignIn,
  adminSignOut,
  fetchVisitSummary,
  restoreAdminSession,
} from "../../../lib/adminVisits";
import { isFirebaseConfigured } from "../../../lib/firebaseConfig";
// Co-located so the .mela-admin-* rules ship only in dev builds.
import "../admin.css";

// The route this page exists to watch: the link shared on LinkedIn.
const FEATURED_PATH = "/feedback/code-as-a-chat";

function formatWhen(value) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Full user-agent strings are unreadable in a table; this keeps the part that
// actually tells me what someone was browsing on.
function shortUa(ua) {
  if (!ua) {
    return "—";
  }

  const os = /iPhone|iPad/.test(ua)
    ? "iOS"
    : /Android/.test(ua)
    ? "Android"
    : /Mac OS X/.test(ua)
    ? "macOS"
    : /Windows/.test(ua)
    ? "Windows"
    : /Linux/.test(ua)
    ? "Linux"
    : "";

  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\//.test(ua)
    ? "Opera"
    : /Chrome\//.test(ua)
    ? "Chrome"
    : /Firefox\//.test(ua)
    ? "Firefox"
    : /Safari\//.test(ua)
    ? "Safari"
    : "Other";

  return [browser, os].filter(Boolean).join(" · ");
}

function sourceLabel(visit) {
  if (visit.ref) {
    return visit.ref;
  }

  if (!visit.referrer) {
    return "direct";
  }

  try {
    return new URL(visit.referrer).hostname.replace(/^www\./, "");
  } catch {
    return visit.referrer;
  }
}

function MelaAdmin() {
  const [account, setAccount] = useState(null);
  const [summary, setSummary] = useState(null);
  // "restoring" until the persisted session has been checked, so the sign-in
  // screen never flashes for an already-signed-in user.
  const [status, setStatus] = useState("restoring");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      setSummary(await fetchVisitSummary());
      setStatus("ready");
    } catch (loadError) {
      const reason = loadError?.message || "";

      if (reason.includes("NOT_SIGNED_IN") || reason.includes("UNAUTHENTICATED")) {
        setAccount(null);
        setError("Session ended — sign in again.");
      } else if (reason.includes("PERMISSION_DENIED")) {
        setError("That account is not the admin account.");
      } else {
        setError(reason || "Could not load visits.");
      }

      setStatus("idle");
    }
  }, []);

  // Restore a previous session on mount. The SDK keeps the session in
  // localStorage and refreshes the token itself, so signing in is a one-time
  // step rather than something to repeat each visit.
  useEffect(() => {
    let cancelled = false;

    restoreAdminSession()
      .then((restored) => {
        if (cancelled) {
          return;
        }

        if (restored) {
          setAccount(restored);
          load();
        } else {
          setStatus("idle");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("idle");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [load]);

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (status === "signing") {
      return;
    }

    setStatus("signing");
    setError("");

    try {
      setAccount(await adminSignIn());
      load();
    } catch (signInError) {
      const reason = signInError?.code || signInError?.message || "";
      let message = "Sign-in failed.";

      if (reason.includes("popup-closed-by-user") || reason.includes("cancelled-popup")) {
        message = "Sign-in cancelled.";
      } else if (reason.includes("popup-blocked")) {
        message = "The browser blocked the popup — allow popups and retry.";
      } else if (reason.includes("operation-not-allowed")) {
        message =
          "Google sign-in is not enabled for this Firebase project yet.";
      } else if (reason.includes("unauthorized-domain")) {
        message = "This domain is not in the Firebase authorised domains list.";
      }

      setError(message);
      setStatus("idle");
    }
  };

  const handleSignOut = () => {
    // Clears the persisted session, so the next visit asks for the account
    // chooser again rather than restoring silently.
    adminSignOut().catch(() => {
      // Dropping local state below is what signs this page out either way.
    });

    setAccount(null);
    setSummary(null);
    setStatus("idle");
  };

  const featuredCount = useMemo(() => {
    if (!summary) {
      return 0;
    }

    return (
      summary.byPath.find((row) => row.path === FEATURED_PATH)?.count || 0
    );
  }, [summary]);

  if (!isFirebaseConfigured) {
    return (
      <div className="mela-page mela-admin-page">
        <section className="mela-section mela-page-heading-section">
          <p className="mela-kicker">Admin</p>
          <h1>Visits</h1>
          <p>Firebase is not configured, so there is nothing to read.</p>
        </section>
      </div>
    );
  }

  if (status === "restoring") {
    return (
      <div className="mela-page mela-admin-page">
        <section className="mela-section mela-page-heading-section">
          <p className="mela-kicker">
            <BsShieldLock /> Admin
          </p>
          <h1>Visits</h1>
          <p>
            <AiOutlineLoading3Quarters className="mela-spin" /> Restoring
            session…
          </p>
        </section>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="mela-page mela-admin-page">
        <section className="mela-section mela-page-heading-section">
          <p className="mela-kicker">
            <BsShieldLock /> Admin
          </p>
          <h1>Visits</h1>
        </section>

        <form className="mela-admin-login" onSubmit={handleSignIn}>
          <p className="mela-admin-login-note">
            Local tool — this route does not exist in the deployed site. Sign in
            with the Google account that owns the Firebase project; anything
            else is refused by the Firestore rules.
          </p>

          {error && <p className="mela-feedback-error">{error}</p>}

          <button
            type="submit"
            className="mela-action mela-action-primary"
            disabled={status === "signing"}
          >
            {status === "signing" ? (
              <AiOutlineLoading3Quarters className="mela-spin" />
            ) : (
              <FcGoogle />
            )}
            <span>
              {status === "signing" ? "Checking" : "Sign in with Google"}
            </span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mela-page mela-admin-page">
      <section className="mela-section mela-page-heading-section">
        <p className="mela-kicker">
          <BsShieldLock /> Admin
        </p>
        <h1>Visits</h1>
        <div className="mela-admin-toolbar">
          <button
            type="button"
            className="mela-action"
            onClick={() => load()}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <AiOutlineLoading3Quarters className="mela-spin" />
            ) : (
              <AiOutlineReload />
            )}
            <span>{status === "loading" ? "Loading" : "Refresh"}</span>
          </button>
          <button type="button" className="mela-action" onClick={handleSignOut}>
            <span>{account?.email ? `Sign out ${account.email}` : "Sign out"}</span>
          </button>
        </div>
      </section>

      {error && <p className="mela-feedback-error">{error}</p>}

      {summary && (
        <>
          <div className="mela-admin-stats">
            <article className="mela-admin-stat mela-admin-stat-featured">
              <span className="mela-admin-stat-label">
                {FEATURED_PATH}
              </span>
              <strong>{featuredCount}</strong>
              <span className="mela-admin-stat-note">the LinkedIn link</span>
            </article>
            <article className="mela-admin-stat">
              <span className="mela-admin-stat-label">Total visits</span>
              <strong>{summary.total}</strong>
              <span className="mela-admin-stat-note">all paths, all time</span>
            </article>
            <article className="mela-admin-stat">
              <span className="mela-admin-stat-label">Distinct paths</span>
              <strong>{summary.byPath.length}</strong>
              <span className="mela-admin-stat-note">
                in the last {summary.sampled}
              </span>
            </article>
          </div>

          <section className="mela-admin-block">
            <h2>Visits per path</h2>
            <p className="mela-admin-hint">
              Counted from the most recent {RECENT_SAMPLE_LIMIT} visits. The
              total above is the true all-time count.
            </p>
            <div className="mela-admin-table-wrap">
              <table className="mela-admin-table">
                <thead>
                  <tr>
                    <th>Path</th>
                    <th>Visits</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.byPath.map((row) => (
                    <tr
                      key={row.path}
                      className={
                        row.path === FEATURED_PATH ? "mela-admin-row-featured" : ""
                      }
                    >
                      <td>{row.path}</td>
                      <td>{row.count}</td>
                    </tr>
                  ))}
                  {summary.byPath.length === 0 && (
                    <tr>
                      <td colSpan={2}>No visits recorded yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mela-admin-block">
            <h2>Recent visits</h2>
            <div className="mela-admin-table-wrap">
              <table className="mela-admin-table">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Path</th>
                    <th>Source</th>
                    <th>Device</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.visits.slice(0, 100).map((visit) => (
                    <tr
                      key={visit.id}
                      className={
                        visit.path === FEATURED_PATH
                          ? "mela-admin-row-featured"
                          : ""
                      }
                    >
                      <td>{formatWhen(visit.createdAt)}</td>
                      <td>{visit.path}</td>
                      <td title={visit.referrer}>{sourceLabel(visit)}</td>
                      <td title={visit.ua}>{shortUa(visit.ua)}</td>
                    </tr>
                  ))}
                  {summary.visits.length === 0 && (
                    <tr>
                      <td colSpan={4}>No visits recorded yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default MelaAdmin;
