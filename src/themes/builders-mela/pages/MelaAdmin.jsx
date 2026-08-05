import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AiOutlineLoading3Quarters,
  AiOutlineReload,
} from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import {
  RECENT_SAMPLE_LIMIT,
  adminSignIn,
  fetchVisitSummary,
} from "../../../lib/analytics";
import { isFirebaseConfigured } from "../../../lib/firebaseConfig";

// The route this page exists to watch: the link shared on LinkedIn.
const FEATURED_PATH = "/feedback/code-as-a-chat";

const TOKEN_KEY = "melaAdminToken";

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
  const [token, setToken] = useState(() => {
    try {
      return sessionStorage.getItem(TOKEN_KEY) || "";
    } catch {
      return "";
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const load = useCallback(async (idToken) => {
    setStatus("loading");
    setError("");

    try {
      setSummary(await fetchVisitSummary(idToken));
      setStatus("ready");
    } catch (loadError) {
      // An expired ID token (they last an hour) should drop back to the form
      // rather than sit on a dead error.
      const expired =
        loadError?.message?.includes("UNAUTHENTICATED") ||
        loadError?.message?.includes("invalid authentication");

      if (expired) {
        setToken("");
        try {
          sessionStorage.removeItem(TOKEN_KEY);
        } catch {
          // Nothing to clean up if storage is blocked.
        }
        setError("Session expired — sign in again.");
      } else if (loadError?.message?.includes("PERMISSION_DENIED")) {
        setError("That account is not the admin account.");
      } else {
        setError(loadError?.message || "Could not load visits.");
      }

      setStatus("idle");
    }
  }, []);

  useEffect(() => {
    if (token) {
      load(token);
    }
  }, [token, load]);

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (status === "signing") {
      return;
    }

    setStatus("signing");
    setError("");

    try {
      const idToken = await adminSignIn(email.trim(), password);

      try {
        sessionStorage.setItem(TOKEN_KEY, idToken);
      } catch {
        // A blocked sessionStorage only costs the refresh convenience.
      }

      setPassword("");
      setToken(idToken);
    } catch (signInError) {
      const reason = signInError?.message || "";
      let message = "Sign-in failed.";

      if (reason.includes("INVALID_LOGIN_CREDENTIALS") || reason.includes("INVALID_PASSWORD")) {
        message = "Wrong email or password.";
      } else if (reason.includes("TOO_MANY_ATTEMPTS")) {
        message = "Too many attempts — wait a minute and retry.";
      }

      setError(message);
      setStatus("idle");
    }
  };

  const handleSignOut = () => {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      // Already gone.
    }

    setToken("");
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

  if (!token) {
    return (
      <div className="mela-page mela-admin-page">
        <section className="mela-section mela-page-heading-section">
          <p className="mela-kicker">
            <BsShieldLock /> Admin
          </p>
          <h1>Visits</h1>
        </section>

        <form className="mela-admin-login" onSubmit={handleSignIn}>
          <label className="mela-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </label>

          <label className="mela-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error && <p className="mela-feedback-error">{error}</p>}

          <button
            type="submit"
            className="mela-action mela-action-primary"
            disabled={status === "signing"}
          >
            {status === "signing" ? (
              <AiOutlineLoading3Quarters className="mela-spin" />
            ) : (
              <BsShieldLock />
            )}
            <span>{status === "signing" ? "Checking" : "Sign in"}</span>
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
            onClick={() => load(token)}
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
            <span>Sign out</span>
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
