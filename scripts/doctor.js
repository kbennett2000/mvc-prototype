#!/usr/bin/env node
// System diagnostic. Run with: npm run doctor
//
// Flags:
//   --quick           Skip live network probes (static checks only).
//   --fix-env         Scaffold .env.local from .env.local.example if it
//                     doesn't exist. Will NEVER overwrite an existing file
//                     and NEVER writes a credential value.
//   --timeout <sec>   Per-probe timeout in seconds (default 5).
//   --json            Emit machine-readable results at the end. Forward-
//                     compat convenience only; no CI gating logic.
//   --help            Show usage.
//
// Exit codes: 0 = all checks pass (warnings allowed), 1 = any failure,
//             2 = bad invocation.

"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
function p(...parts) { return path.join(ROOT, ...parts); }

// ============================================================================
// CLI flags
// ============================================================================

const flags = { quick: false, fixEnv: false, timeoutMs: 5000, json: false };
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--quick") flags.quick = true;
  else if (a === "--fix-env") flags.fixEnv = true;
  else if (a === "--json") flags.json = true;
  else if (a === "--help" || a === "-h") { console.log(usage()); process.exit(0); }
  else if (a === "--timeout") {
    const raw = argv[++i];
    const n = parseFloat(raw);
    if (!Number.isFinite(n) || n <= 0) {
      console.error(`Invalid --timeout: ${raw}`);
      process.exit(2);
    }
    flags.timeoutMs = Math.round(n * 1000);
  } else {
    console.error(`Unknown flag: ${a}`);
    console.error(usage());
    process.exit(2);
  }
}

function usage() {
  return [
    "Usage: npm run doctor -- [flags]",
    "  --quick           Static checks only (skip network probes)",
    "  --fix-env         Create .env.local from template if missing (never overwrites)",
    "  --timeout <sec>   Per-probe timeout in seconds (default 5)",
    "  --json            Emit JSON results at the end",
  ].join("\n");
}

// ============================================================================
// ANSI colors (suppressed under --json)
// ============================================================================

const c = flags.json
  ? Object.fromEntries(["reset","bold","dim","red","green","yellow","cyan","magenta"].map(k => [k, ""]))
  : {
      reset: "\x1b[0m",
      bold: "\x1b[1m",
      dim: "\x1b[2m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      cyan: "\x1b[36m",
      magenta: "\x1b[35m",
    };

// ============================================================================
// Zero-dep .env.local loader
// ============================================================================
// Fixes the long-standing credibility bug: previously this script read
// process.env.* without ever loading .env.local, so it false-alarmed on
// "missing" vars that were actually set. Now we parse .env.local with a
// tiny built-in parser (KEY=value, optional quotes, # comments, optional
// "export " prefix) and merge into process.env WITHOUT overriding values
// the shell already set.

function parseEnvFile(content) {
  const out = {};
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const stripped = line.startsWith("export ") ? line.slice(7).trim() : line;
    const eq = stripped.indexOf("=");
    if (eq <= 0) continue;
    const key = stripped.slice(0, eq).trim();
    if (!/^[A-Z_][A-Z0-9_]*$/i.test(key)) continue;
    let val = stripped.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"') && val.length >= 2) ||
      (val.startsWith("'") && val.endsWith("'") && val.length >= 2)
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function loadEnvLocal() {
  const filePath = p(".env.local");
  if (!fs.existsSync(filePath)) return { loaded: false, count: 0 };
  const content = fs.readFileSync(filePath, "utf8");
  const parsed = parseEnvFile(content);
  let count = 0;
  for (const [k, v] of Object.entries(parsed)) {
    if (process.env[k] === undefined || process.env[k] === "") {
      process.env[k] = v;
      count++;
    }
  }
  return { loaded: true, count };
}

// ============================================================================
// Secret hygiene
// ============================================================================
// hasValue() returns a status — never the value itself. High-sensitivity
// vars print only their name + set/unset. Probe error responses are
// mapped to known shapes; raw bodies are never echoed.

const HIGH_SENSITIVITY = new Set([
  "TINA_TOKEN",
  "GOOGLE_CLIENT_SECRET",
  "ADMIN_PASSWORD",
  "CRON_SECRET",
  "DATABASE_URL",
  "POSTGRES_URL",
  "NEXTAUTH_SECRET",
  "AUTH_SECRET",
  "RESEND_API_KEY",
  "RESEND_WEBHOOK_SECRET",
]);

// Returns null OR a short reason string describing why the value looks
// like a sentinel/placeholder. The reason is grammatical when slotted in
// after the variable name (e.g. "RESEND_FROM_EMAIL is …").
function classifySentinel(name, value) {
  if (value == null) return null;
  const v = String(value).trim();
  if (!v) return null;
  if (name === "RESEND_FROM_EMAIL" && v.toLowerCase() === "onboarding@resend.dev") {
    return "is still set to Resend's sandbox sender (onboarding@resend.dev). Emails to your congregation will NOT come from this address — Resend rejects mail to non-account addresses when the sandbox sender is used. You cannot launch with this value.";
  }
  if (name === "RESEND_API_KEY" && (v === "re_..." || v === "re_xxx" || v === "re_your_api_key")) {
    return "looks like a Resend placeholder, not a real API key.";
  }
  if (/^your[_-]/i.test(v)) return "starts with 'your_' / 'your-' — looks like a template placeholder.";
  if (/^change[_-]?me/i.test(v)) return "looks like a 'change-me' placeholder.";
  if (/^placeholder/i.test(v)) return "starts with 'placeholder'.";
  if (/^example[._-]/i.test(v)) return "starts with 'example'.";
  if (/^xxx+$/i.test(v)) return "is just 'xxx…'.";
  if (/\.{3}$/.test(v)) return "ends with '…' — looks like an incomplete value.";
  return null;
}

function isSentinel(name, value) { return classifySentinel(name, value) !== null; }

function hasValue(name) {
  const v = process.env[name];
  if (v === undefined || v === "") return "empty";
  if (isSentinel(name, v)) return "sentinel";
  return "set";
}

// Domain-of-email helper — safe to print (it's the church's public domain).
function emailDomain(addr) {
  if (typeof addr !== "string") return "";
  const at = addr.lastIndexOf("@");
  return at >= 0 ? addr.slice(at + 1).toLowerCase() : "";
}

// ============================================================================
// Result accumulator
// ============================================================================

const results = []; // { group, label, status, detail, message, fix }
let currentGroup = null;

function group(name) {
  currentGroup = name;
  if (!flags.json) console.log(`\n${c.bold}${c.cyan}${name}${c.reset}`);
}

function printLine(r) {
  const icon = {
    pass: `${c.green}✅${c.reset}`,
    fail: `${c.red}❌${c.reset}`,
    warn: `${c.yellow}⚠️ ${c.reset}`,
    skip: `${c.dim}⏭  ${c.reset}`,
  }[r.status] || "  ";
  const detail = r.detail ? `${c.dim} — ${r.detail}${c.reset}` : "";
  console.log(`  ${icon} ${r.label}${detail}`);
  if (r.status === "fail" && r.message) {
    console.log(`     ${c.yellow}Problem:${c.reset} ${r.message}`);
    if (r.fix) console.log(`     ${c.green}Fix:${c.reset} ${r.fix}`);
  } else if (r.status === "warn" && r.message) {
    console.log(`     ${c.yellow}Note:${c.reset} ${r.message}`);
    if (r.fix) console.log(`     ${c.green}Suggestion:${c.reset} ${r.fix}`);
  }
}

async function check(label, fn, defaultFix) {
  let status = "pass", detail = "", message = "", fix = defaultFix || "";
  try {
    const ret = await fn();
    if (ret && typeof ret === "object" && "status" in ret) {
      status = ret.status;
      detail = ret.detail || "";
      message = ret.message || "";
      if (ret.fix) fix = ret.fix;
    } else if (typeof ret === "string") {
      detail = ret;
    }
  } catch (e) {
    if (e && e.__skip) { status = "skip"; detail = e.message; }
    else if (e && e.__warn) { status = "warn"; message = e.message; if (e.__fix) fix = e.__fix; }
    else { status = "fail"; message = e.message; }
  }
  const r = { group: currentGroup, label, status, detail, message, fix };
  results.push(r);
  if (!flags.json) printLine(r);
  return r;
}

function skipWith(msg) { const e = new Error(msg); e.__skip = true; throw e; }
function warnWith(msg, fix) { const e = new Error(msg); e.__warn = true; if (fix) e.__fix = fix; throw e; }

// ============================================================================
// Safe .env.local scaffolder — the ONLY mutation this script can make
// ============================================================================

function safeCopyEnvLocal() {
  const src = p(".env.local.example");
  const dest = p(".env.local");
  if (!fs.existsSync(src)) {
    throw new Error(".env.local.example not found — cannot scaffold .env.local.");
  }
  if (fs.existsSync(dest)) {
    throw new Error(".env.local already exists — refusing to overwrite.");
  }
  fs.copyFileSync(src, dest);
}

// ============================================================================
// vercel.json recursive suspicious-key scan
// ============================================================================
// Walks the entire parsed JSON tree. Catches "//" / "#"-prefix / "comment"
// keys at ANY depth — the real historical failure had a "//" nested
// inside crons[1], which a top-level-only scan would miss.

function isSuspiciousKey(k) {
  return (
    k === "//" ||
    k.startsWith("//") ||
    k.startsWith("#") ||
    /^comments?$/i.test(k) ||
    /^notes?$/i.test(k)
  );
}

function findSuspiciousKeys(node, prefix = "") {
  const out = [];
  if (Array.isArray(node)) {
    node.forEach((item, i) => {
      out.push(...findSuspiciousKeys(item, `${prefix}[${i}]`));
    });
  } else if (node && typeof node === "object") {
    for (const k of Object.keys(node)) {
      const here = prefix ? `${prefix}.${k}` : k;
      if (isSuspiciousKey(k)) out.push(here);
      out.push(...findSuspiciousKeys(node[k], here));
    }
  }
  return out;
}

// ============================================================================
// Probes (read-only, no side effects)
// ============================================================================

function withTimeout(promise, ms, label) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    promise.then(
      (v) => { clearTimeout(t); resolve(v); },
      (e) => { clearTimeout(t); reject(e); }
    );
  });
}

// ---- TinaCloud ----

function readTinaGraphQLVersion() {
  try {
    const s = JSON.parse(fs.readFileSync(p("tina/__generated__/_schema.json"), "utf8"));
    if (s && s.version && s.version.major && s.version.minor) {
      return `${s.version.major}.${s.version.minor}`;
    }
  } catch {}
  return "1.6"; // safe modern default
}

async function probeTinaCloud() {
  const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
  const token = process.env.TINA_TOKEN;
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!clientId || isSentinel("NEXT_PUBLIC_TINA_CLIENT_ID", clientId)) {
    skipWith("NEXT_PUBLIC_TINA_CLIENT_ID not set — fix that first.");
  }
  if (!token || isSentinel("TINA_TOKEN", token)) {
    skipWith("TINA_TOKEN not set — fix that first.");
  }
  const version = readTinaGraphQLVersion();
  const url = `https://content.tinajs.io/${version}/content/${encodeURIComponent(clientId)}/github/${encodeURIComponent(branch)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), flags.timeoutMs);
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-KEY": token },
      body: JSON.stringify({ query: "{ __typename }" }),
      signal: controller.signal,
    });
  } catch (e) {
    clearTimeout(timer);
    if (e.name === "AbortError") {
      throw new Error("TinaCloud probe timed out — check your internet, or re-run with --quick.");
    }
    throw new Error("TinaCloud probe network error (could not reach content.tinajs.io).");
  }
  clearTimeout(timer);

  if (res.status === 404) {
    return {
      status: "fail",
      message: "TinaCloud project not found. Your NEXT_PUBLIC_TINA_CLIENT_ID does not match any project at app.tina.io.",
      fix: "app.tina.io → your project → Configuration → Tokens → copy Client ID. Paste it into .env.local AND Vercel → Settings → Environment Variables.",
    };
  }
  if (res.status === 401 || res.status === 403) {
    return {
      status: "fail",
      message: "TinaCloud token rejected. The TINA_TOKEN may be revoked, expired, or scoped to a different project.",
      fix: "app.tina.io → your project → Configuration → Tokens → Generate new read-only token. Update .env.local AND Vercel env vars.",
    };
  }
  if (res.status >= 500) {
    return { status: "fail", message: `TinaCloud server error (HTTP ${res.status}). Try again later or re-run with --quick.` };
  }

  let bodyText = "";
  try { bodyText = await res.text(); } catch {}
  let parsed = null;
  try { parsed = JSON.parse(bodyText); } catch {}
  const errString = parsed && parsed.errors
    ? parsed.errors.map((e) => (e && e.message) || "").join(" | ").toLowerCase()
    : (bodyText || "").toLowerCase();

  if (errString.includes("not indexed") || errString.includes("not on tinacloud") || errString.includes("not yet indexed") || errString.includes("indexing")) {
    return {
      status: "fail",
      message: `Branch '${branch}' isn't indexed on TinaCloud yet.`,
      fix: "app.tina.io → your project → Configuration → Branches → click 'Refresh Branches'. Wait 30s-few minutes. Make sure tina/tina-lock.json is committed and pushed.",
    };
  }
  if (parsed && parsed.errors && parsed.errors.length > 0) {
    return { status: "fail", message: "TinaCloud responded with errors. Check app.tina.io for project status." };
  }
  if (res.status >= 200 && res.status < 300) {
    return `connected (branch ${branch}, schema v${version})`;
  }
  return { status: "fail", message: `TinaCloud returned HTTP ${res.status}.` };
}

// ---- Resend ----
// Cached so the API-key check and sender-domain check share one request.

let _resendResult = null;
async function fetchResendDomains() {
  if (_resendResult) return _resendResult;
  const key = process.env.RESEND_API_KEY;
  if (!key || isSentinel("RESEND_API_KEY", key)) {
    _resendResult = { kind: "skip", reason: "RESEND_API_KEY not set — fix that first." };
    return _resendResult;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), flags.timeoutMs);
  try {
    const res = await fetch("https://api.resend.com/domains", {
      method: "GET",
      headers: { Authorization: `Bearer ${key}` },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (res.status === 401) {
      _resendResult = { kind: "unauthorized" };
      return _resendResult;
    }
    if (res.status >= 500) {
      _resendResult = { kind: "server-error", code: res.status };
      return _resendResult;
    }
    if (res.status < 200 || res.status >= 300) {
      _resendResult = { kind: "http-error", code: res.status };
      return _resendResult;
    }
    let body;
    try { body = await res.json(); } catch { body = {}; }
    const list = (body && Array.isArray(body.data)) ? body.data : [];
    // Each entry: { id, name, status: 'verified' | 'pending' | 'not_started' | 'failed' | ..., ... }
    const domains = list.map((d) => ({
      name: (d && typeof d.name === "string") ? d.name.toLowerCase() : "",
      status: (d && typeof d.status === "string") ? d.status.toLowerCase() : "",
    })).filter((d) => d.name);
    _resendResult = { kind: "ok", domains };
    return _resendResult;
  } catch (e) {
    clearTimeout(timer);
    if (e.name === "AbortError") {
      _resendResult = { kind: "timeout" };
    } else {
      _resendResult = { kind: "network-error" };
    }
    return _resendResult;
  }
}

async function probeResendApiKey() {
  const r = await fetchResendDomains();
  if (r.kind === "skip") skipWith(r.reason);
  if (r.kind === "unauthorized") {
    return {
      status: "fail",
      message: "Resend API key rejected (HTTP 401). The RESEND_API_KEY is invalid or revoked.",
      fix: "resend.com → API Keys → Create API Key. Update .env.local AND Vercel → Settings → Environment Variables.",
    };
  }
  if (r.kind === "timeout") {
    return { status: "fail", message: "Resend probe timed out. Check your internet, or re-run with --quick." };
  }
  if (r.kind === "network-error") {
    return { status: "fail", message: "Could not reach api.resend.com." };
  }
  if (r.kind === "server-error") {
    return { status: "fail", message: `Resend server error (HTTP ${r.code}). Try again later.` };
  }
  if (r.kind === "http-error") {
    return { status: "fail", message: `Resend returned HTTP ${r.code}.` };
  }
  return `key valid (${r.domains.length} domain${r.domains.length === 1 ? "" : "s"} on account)`;
}

async function probeResendSender() {
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!fromEmail) skipWith("RESEND_FROM_EMAIL not set — see static check above.");
  if (isSentinel("RESEND_FROM_EMAIL", fromEmail)) {
    skipWith("RESEND_FROM_EMAIL is a placeholder/sandbox value — see static check above.");
  }
  const r = await fetchResendDomains();
  if (r.kind === "skip") skipWith(r.reason);
  if (r.kind !== "ok") skipWith("Resend API key check failed — can't verify domain.");
  const domain = emailDomain(fromEmail);
  if (!domain) {
    return { status: "fail", message: `RESEND_FROM_EMAIL doesn't look like a valid email address.` };
  }
  const match = r.domains.find((d) => d.name === domain);
  if (!match) {
    return {
      status: "fail",
      message: `Your sender domain '${domain}' isn't registered in this Resend account. Emails will be rejected by Resend before they ever go out.`,
      fix: `resend.com → Domains → Add Domain → add '${domain}' → publish the DNS records they show → wait for status to flip to 'verified'.`,
    };
  }
  if (match.status !== "verified") {
    return {
      status: "fail",
      message: `Your sender domain '${domain}' is registered in Resend but its status is '${match.status}', not 'verified'. Emails will be rejected.`,
      fix: `resend.com → Domains → ${domain} → publish (or republish) the SPF/DKIM/DMARC DNS records they show. Then click 'Verify DNS Records'. Status must read 'verified' before launch.`,
    };
  }
  return `'${domain}' verified in Resend`;
}

// ---- Postgres ----

async function probePostgres() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
  if (!url || isSentinel("DATABASE_URL", url) || isSentinel("POSTGRES_URL", url)) {
    skipWith("DATABASE_URL not set — fix that first.");
  }
  let pg;
  try {
    pg = require(path.join(ROOT, "node_modules", "@vercel/postgres"));
  } catch {
    return { status: "fail", message: "@vercel/postgres not installed.", fix: "Run: npm install" };
  }
  const pool = pg.createPool({ connectionString: url });
  try {
    await withTimeout(
      (async () => {
        const r = await pool.query("SELECT 1 AS one");
        if (!r || !r.rows || r.rows.length === 0) throw new Error("empty result");
      })(),
      flags.timeoutMs,
      "Postgres probe"
    );
    return "SELECT 1 succeeded";
  } catch (e) {
    const msg = (e && e.message ? String(e.message) : "").replace(url, "[connection-string-redacted]");
    if (/timed out/i.test(msg)) {
      return { status: "fail", message: "Postgres probe timed out — host unreachable or wrong port in DATABASE_URL." };
    }
    if (/password authentication failed|SCRAM|authentication/i.test(msg)) {
      return {
        status: "fail",
        message: "Postgres rejected the credentials in DATABASE_URL.",
        fix: "Vercel → Storage → your DB → .env.local tab → copy the connection string. Paste into .env.local. Same for Vercel env vars if production.",
      };
    }
    if (/ENOTFOUND|getaddrinfo|EAI_AGAIN/i.test(msg)) {
      return { status: "fail", message: "Cannot resolve the Postgres host in DATABASE_URL (DNS failure)." };
    }
    if (/ECONNREFUSED|connect/i.test(msg)) {
      return { status: "fail", message: "Cannot connect to the Postgres host in DATABASE_URL (connection refused)." };
    }
    return { status: "fail", message: `Postgres probe failed: ${msg}` };
  } finally {
    try { if (pool && typeof pool.end === "function") await pool.end(); } catch {}
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  // 0. Load .env.local BEFORE any env-dependent check.
  const envInfo = loadEnvLocal();

  // 0a. --fix-env handling (the only permitted mutation).
  let scaffoldedEnv = false;
  if (flags.fixEnv) {
    if (fs.existsSync(p(".env.local"))) {
      if (!flags.json) console.log(`${c.dim}--fix-env: .env.local already exists; not overwriting.${c.reset}`);
    } else {
      try {
        safeCopyEnvLocal();
        scaffoldedEnv = true;
        if (!flags.json) console.log(`${c.green}--fix-env: created .env.local from .env.local.example.${c.reset}`);
        // Reload env after scaffolding so subsequent checks see the new file
        // (it'll be all placeholder values, but they'll exist).
        loadEnvLocal();
      } catch (e) {
        if (!flags.json) console.log(`${c.red}--fix-env failed:${c.reset} ${e.message}`);
      }
    }
  }

  if (!flags.json) {
    console.log(`
${c.bold}${c.cyan}Church Site — System Check${c.reset}
${c.dim}Looking for common setup problems...${c.reset}`);
    if (envInfo.loaded) {
      console.log(`${c.dim}Loaded ${envInfo.count} var${envInfo.count === 1 ? "" : "s"} from .env.local.${c.reset}`);
    } else {
      console.log(`${c.dim}No .env.local found. (Use --fix-env to scaffold one from the template.)${c.reset}`);
    }
    if (flags.quick) console.log(`${c.dim}--quick: skipping live network probes.${c.reset}`);
  }

  // Helper to read site.json once for the conditional checks.
  function readSite() {
    const sp = p("content", "site.json");
    if (!fs.existsSync(sp)) return null;
    try { return JSON.parse(fs.readFileSync(sp, "utf8")); } catch { return null; }
  }

  // ==========================================================================
  // PHASE 1: STATIC CHECKS (always run)
  // ==========================================================================

  // ---- Environment & tooling ----
  group("Environment & tooling");

  await check(
    "Node.js 18 or newer",
    () => {
      const major = parseInt(process.versions.node.split(".")[0], 10);
      if (major < 18) throw new Error(`Found Node.js ${process.versions.node}, need 18 or newer.`);
      return `v${process.versions.node}`;
    },
    "Install the latest Node.js from https://nodejs.org/ — pick the 'LTS' version on the homepage."
  );

  await check(
    "Dependencies installed",
    () => {
      if (!fs.existsSync(p("node_modules"))) throw new Error("node_modules folder is missing.");
      return "node_modules present";
    },
    "Run: npm install — or simpler: npm run setup"
  );

  await check(
    "Content parser (gray-matter)",
    () => {
      if (!fs.existsSync(p("node_modules", "gray-matter"))) {
        throw new Error("gray-matter package missing from node_modules.");
      }
      return "installed";
    },
    "Run: npm install"
  );

  await check(
    ".env.local present",
    () => {
      if (!fs.existsSync(p(".env.local"))) {
        const hasExample = fs.existsSync(p(".env.local.example"));
        throw new Error(
          hasExample
            ? "No .env.local file. Required for local dev and local production builds."
            : "No .env.local file AND no .env.local.example to scaffold from."
        );
      }
      return scaffoldedEnv ? "created from template (now fill in real values)" : "present";
    },
    "Run: npm run doctor -- --fix-env  (creates .env.local from .env.local.example, never overwrites). Then open .env.local and fill in real values."
  );

  // ---- Project files ----
  group("Project files");

  await check(
    "Site settings file (content/site.json)",
    () => {
      if (!fs.existsSync(p("content", "site.json"))) throw new Error("content/site.json is missing.");
      JSON.parse(fs.readFileSync(p("content", "site.json"), "utf8"));
      return "valid JSON";
    },
    "Run: npm run setup"
  );

  await check(
    "Church name and address are filled in",
    () => {
      const site = JSON.parse(fs.readFileSync(p("content", "site.json"), "utf8"));
      const missing = [];
      if (!site.church?.name) missing.push("name");
      if (!site.church?.address?.street) missing.push("street");
      if (!site.church?.address?.city) missing.push("city");
      if (!site.church?.phone) missing.push("phone");
      if (!site.church?.email) missing.push("email");
      if (missing.length) throw new Error(`Missing: ${missing.join(", ")}`);
      return site.church.name;
    },
    "Run: npm run setup — and fill in the church information."
  );

  await check(
    "Stylesheet (app/globals.css)",
    () => {
      if (!fs.existsSync(p("app", "globals.css"))) throw new Error("app/globals.css missing.");
      return "present";
    },
    "Reinstall the template — this file is required."
  );

  await check(
    "CMS schema (tina/config.ts)",
    () => {
      if (!fs.existsSync(p("tina", "config.ts"))) throw new Error("tina/config.ts is missing.");
      return "present";
    },
    "Reinstall the template — tina/config.ts is required for the CMS to work."
  );

  await check(
    "vercel.json is valid and has no comment keys",
    () => {
      const vp = p("vercel.json");
      if (!fs.existsSync(vp)) return "no vercel.json (optional)";
      let parsed;
      try {
        parsed = JSON.parse(fs.readFileSync(vp, "utf8"));
      } catch (e) {
        throw new Error(`vercel.json is not valid JSON: ${e.message}`);
      }
      const suspicious = findSuspiciousKeys(parsed);
      if (suspicious.length) {
        throw new Error(
          `vercel.json contains unsupported key(s) at: ${suspicious.join(", ")}. Vercel's schema validator rejects comment-style keys ('//' or '#') even when nested inside crons, headers, etc.`
        );
      }
      return "no suspicious keys";
    },
    "Open vercel.json and remove the offending key(s). Documentation about cron schedules or other rationale belongs in NOTES.txt, never inside vercel.json."
  );

  await check(
    "npm scripts (setup, start, build, deploy, doctor)",
    () => {
      const pkg = JSON.parse(fs.readFileSync(p("package.json"), "utf8"));
      const required = ["setup", "start", "build", "deploy", "doctor"];
      const missing = required.filter((s) => !pkg.scripts?.[s]);
      if (missing.length) throw new Error(`Missing scripts: ${missing.join(", ")}`);
      return "all present";
    },
    "Reinstall the template — package.json should have these scripts."
  );

  // ---- Environment variables (static) ----
  group("Environment variables (static)");

  const site = readSite() || {};
  const devotionalsOn = site?.features?.devotionals === true;
  const digestOn = site?.features?.digest === true;
  const authProvider = site?.adminAuth?.provider === "google" ? "google" : "basic";

  // Required for any deploy
  await checkEnvSet("RESEND_API_KEY", "Email — Resend API key", {
    fix: "resend.com → API Keys → Create API Key. Put it in .env.local (and Vercel → Settings → Environment Variables).",
    formatHint: (v) => (v.startsWith("re_") && v.length >= 20) ? null : "doesn't look like a Resend key (real keys start with 're_' and are ~30+ characters).",
  });

  await checkEnvSet("RESEND_FROM_EMAIL", "Email — sender address (RESEND_FROM_EMAIL)", {
    fix: "resend.com → Domains → Add Domain → publish the SPF/DKIM/DMARC DNS records they show → wait for status 'verified'. Then set RESEND_FROM_EMAIL=devotionals@yourchurch.org (or similar) in .env.local AND Vercel → Settings → Environment Variables.",
    formatHint: (v) => /.+@.+\..+/.test(v) ? null : "doesn't look like an email address.",
  });

  await checkEnvSet("CHURCH_EMAIL", "Email — where form submissions go (CHURCH_EMAIL)", {
    fix: "Set CHURCH_EMAIL to the church staff inbox that should receive contact/prayer/visit form submissions.",
    formatHint: (v) => /.+@.+\..+/.test(v) ? null : "doesn't look like an email address.",
  });

  await checkEnvSet("NEXT_PUBLIC_TINA_CLIENT_ID", "TinaCloud — Client ID (NEXT_PUBLIC_TINA_CLIENT_ID)", {
    fix: "app.tina.io → your project → Configuration → Tokens → copy Client ID. Paste it into .env.local AND Vercel → Settings → Environment Variables.",
  });

  await checkEnvSet("TINA_TOKEN", "TinaCloud — Read-only token (TINA_TOKEN)", {
    fix: "app.tina.io → your project → Configuration → Tokens → Generate read-only token. Paste it into .env.local AND Vercel env vars.",
  });

  // Conditional: devotionals or digest → need DB + cron secret
  if (devotionalsOn || digestOn) {
    const which = [devotionalsOn ? "devotionals" : null, digestOn ? "digest" : null].filter(Boolean).join(" + ");
    await check(
      `Database connection string (DATABASE_URL) — required for ${which}`,
      () => {
        const dbu = process.env.DATABASE_URL;
        const pgu = process.env.POSTGRES_URL;
        if (!dbu && !pgu) throw new Error("Neither DATABASE_URL nor POSTGRES_URL is set.");
        if (dbu && isSentinel("DATABASE_URL", dbu)) throw new Error("DATABASE_URL looks like a placeholder.");
        if (!dbu && pgu && isSentinel("POSTGRES_URL", pgu)) throw new Error("POSTGRES_URL looks like a placeholder.");
        // Both set with different values?
        if (dbu && pgu && dbu !== pgu) {
          warnWith(
            "Both DATABASE_URL and POSTGRES_URL are set with different values. Code reads DATABASE_URL first, so that one wins — but mixed tooling can pick the other. Remove one.",
            "Delete POSTGRES_URL from .env.local (the code reads DATABASE_URL as canonical)."
          );
        }
        return dbu ? "DATABASE_URL set" : "POSTGRES_URL set (fallback)";
      },
      "Vercel → Storage → your database → .env.local tab → copy DATABASE_URL into .env.local. Same for Vercel env vars in production."
    );

    await check(
      "Cron authorization secret (CRON_SECRET)",
      () => {
        const s = process.env.CRON_SECRET;
        if (!s) throw new Error("CRON_SECRET not set. /api/cron/* will be unprotected or reject Vercel's scheduled calls.");
        if (isSentinel("CRON_SECRET", s)) throw new Error("CRON_SECRET looks like a placeholder.");
        if (s.length < 16) throw new Error(`CRON_SECRET is only ${s.length} characters. Use at least 16 random characters.`);
        return "set";
      },
      "Generate one with:  openssl rand -hex 32  — then put the same value in .env.local AND in Vercel → Settings → Environment Variables."
    );
  } else {
    await check("Database connection string", () => skipWith("devotionals and digest are both disabled — skipping."));
    await check("Cron authorization secret", () => skipWith("devotionals and digest are both disabled — skipping."));
  }

  // Admin auth
  await check(
    "Admin authentication configured",
    () => {
      if (authProvider === "basic") {
        const pw = process.env.ADMIN_PASSWORD ?? "";
        if (!pw) {
          throw new Error(
            "Site Settings → Admin Authentication is 'basic' but ADMIN_PASSWORD is not set. The custom admin pages will return 503 until it is."
          );
        }
        if (isSentinel("ADMIN_PASSWORD", pw)) throw new Error("ADMIN_PASSWORD looks like a placeholder.");
        if (pw.length < 12) throw new Error(`ADMIN_PASSWORD is only ${pw.length} characters. Use at least 12 — preferably a random string.`);
        return "basic (ADMIN_PASSWORD set)";
      }
      // Google provider
      const missing = [];
      if (hasValue("GOOGLE_CLIENT_ID") !== "set") missing.push("GOOGLE_CLIENT_ID");
      if (hasValue("GOOGLE_CLIENT_SECRET") !== "set") missing.push("GOOGLE_CLIENT_SECRET");
      const hasSecret = hasValue("NEXTAUTH_SECRET") === "set" || hasValue("AUTH_SECRET") === "set";
      if (!hasSecret) missing.push("NEXTAUTH_SECRET (or AUTH_SECRET)");
      const hasUrl =
        hasValue("NEXTAUTH_URL") === "set" ||
        hasValue("AUTH_URL") === "set" ||
        !!process.env.VERCEL_URL;
      if (!hasUrl) missing.push("NEXTAUTH_URL");
      if (missing.length) {
        throw new Error(
          `Site Settings → Admin Authentication is 'google' but these env vars are missing: ${missing.join(", ")}. See docs/for-tech-volunteers/admin-access-google-oauth.md.`
        );
      }
      // Format checks
      const cid = process.env.GOOGLE_CLIENT_ID || "";
      if (!/\.apps\.googleusercontent\.com$/.test(cid)) {
        throw new Error("GOOGLE_CLIENT_ID doesn't end with '.apps.googleusercontent.com' — that's the format Google issues.");
      }

      // Allowlist
      const accessPath = p("content", "admin-access.json");
      const fromEnv = (process.env.ADMIN_ALLOWLIST ?? "").split(",").map((s) => s.trim()).filter(Boolean);
      let fromCms = [];
      if (fs.existsSync(accessPath)) {
        try {
          const access = JSON.parse(fs.readFileSync(accessPath, "utf8"));
          fromCms = (access.admins ?? [])
            .map((a) => (typeof a?.email === "string" ? a.email.trim() : ""))
            .filter(Boolean);
        } catch {}
      }
      if (fromCms.length === 0 && fromEnv.length === 0) {
        throw new Error(
          "Admin allowlist is empty. Add at least one email to content/admin-access.json (Admin Access in the CMS) OR set ADMIN_ALLOWLIST=you@example.com. Without an entry, nobody can access /admin/devotionals or /admin/digest even after signing in."
        );
      }
      const count = fromCms.length + fromEnv.length;
      return `google (${count} email${count === 1 ? "" : "s"} on allowlist)`;
    },
    "If using 'basic': set ADMIN_PASSWORD in .env.local (and Vercel). If using 'google': follow docs/for-tech-volunteers/admin-access-google-oauth.md."
  );

  // Auth secret split-brain (only matters in google mode, but harmless to check always)
  await check(
    "Auth secret naming (NEXTAUTH_SECRET vs AUTH_SECRET)",
    () => {
      const a = process.env.AUTH_SECRET;
      const n = process.env.NEXTAUTH_SECRET;
      if (!a && !n) return skipWith("no auth secret set (only relevant in 'google' admin auth mode)");
      if (a && n && a !== n) {
        warnWith(
          "Both AUTH_SECRET and NEXTAUTH_SECRET are set, with different values. Auth.js v5 prefers AUTH_SECRET; NEXTAUTH_SECRET is the v4 fallback. Pick one and remove the other.",
          "Delete whichever you're not using from .env.local AND Vercel env vars."
        );
      }
      return a && n ? "both set (same value)" : a ? "AUTH_SECRET set" : "NEXTAUTH_SECRET set";
    }
  );

  // ---- Content ----
  group("Content");

  await check(
    "Sermons folder has at least one sermon",
    () => {
      const files = fs.existsSync(p("content", "sermons"))
        ? fs.readdirSync(p("content", "sermons")).filter((f) => f.endsWith(".md"))
        : [];
      if (files.length === 0) throw new Error("content/sermons/ is empty.");
      return `${files.length} sermon${files.length === 1 ? "" : "s"}`;
    },
    "Add at least one sermon via the CMS (Sermons → New Sermon) or place a .md file in content/sermons/."
  );

  await check(
    "Staff folder has at least one person",
    () => {
      const files = fs.existsSync(p("content", "staff"))
        ? fs.readdirSync(p("content", "staff")).filter((f) => f.endsWith(".md"))
        : [];
      if (files.length === 0) throw new Error("content/staff/ is empty.");
      return `${files.length} staff member${files.length === 1 ? "" : "s"}`;
    },
    "Add at least one staff entry via the CMS (Staff → New Staff Member)."
  );

  // ---- Email (settings) ----
  group("Email settings");

  function checkEmailLogo(label, settingsRelativePath, featureFlag) {
    return check(
      label,
      () => {
        const sitePath = p("content", "site.json");
        if (!fs.existsSync(sitePath)) return skipWith("site.json not found");
        const s = JSON.parse(fs.readFileSync(sitePath, "utf8"));
        if (s?.features?.[featureFlag] !== true) return skipWith(`features.${featureFlag} disabled`);

        const settingsPath = p(...settingsRelativePath);
        if (!fs.existsSync(settingsPath)) return skipWith("settings file not found");
        const settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
        const logoUrl = (settings.logoUrl ?? "").trim();
        if (!logoUrl) return "no logo set — falls back to church name text";

        if (/^https?:\/\//i.test(logoUrl)) {
          if (/localhost|127\.0\.0\.1/i.test(logoUrl)) {
            throw new Error(`logoUrl points at localhost (${logoUrl}). Real emails can't load this.`);
          }
          return "absolute URL";
        }
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
        if (!siteUrl) {
          throw new Error(
            `logoUrl is a site-relative path (${logoUrl}) but NEXT_PUBLIC_SITE_URL is not set. Emails will render as broken images.`
          );
        }
        if (/localhost|127\.0\.0\.1/i.test(siteUrl)) {
          throw new Error(
            `logoUrl resolves to ${siteUrl}${logoUrl.startsWith("/") ? "" : "/"}${logoUrl}, which points at localhost.`
          );
        }
        return `relative path → resolves via ${siteUrl}`;
      },
      `Open ${settingsRelativePath.join("/")} and set logoUrl to a full https:// URL, OR leave blank to fall back to the church name as text, OR set NEXT_PUBLIC_SITE_URL in your env so the uploaded path can be rewritten at send time.`
    );
  }

  await checkEmailLogo("Digest email logo loads in inboxes", ["content", "digest-settings.json"], "digest");
  await checkEmailLogo("Devotional email logo loads in inboxes", ["content", "devotional-email-settings.json"], "devotionals");

  // ---- Database (static) ----
  group("Database");

  await check(
    "Migration files present (if devotionals enabled)",
    () => {
      if (!devotionalsOn && !digestOn) return skipWith("devotionals and digest disabled");
      const migrationsDir = p("drizzle", "migrations");
      if (!fs.existsSync(migrationsDir)) throw new Error("drizzle/migrations/ directory is missing.");
      const sqlFiles = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql"));
      if (sqlFiles.length === 0) throw new Error("drizzle/migrations/ exists but contains no .sql files.");
      return `${sqlFiles.length} migration file${sqlFiles.length === 1 ? "" : "s"}`;
    },
    "Run: npm run db:generate (creates migration files from schema), then npm run db:migrate (applies them)."
  );

  // ---- Branch & repo ----
  group("Branch & repo");

  await check(
    "Current git branch matches TinaCloud branch",
    () => {
      let here = "";
      try {
        const headPath = p(".git", "HEAD");
        if (fs.existsSync(headPath)) {
          const head = fs.readFileSync(headPath, "utf8").trim();
          const m = head.match(/^ref: refs\/heads\/(.+)$/);
          if (m) here = m[1];
        }
      } catch {}
      if (!here) return skipWith("not a git checkout (or detached HEAD)");
      const tinaBranch = process.env.GITHUB_BRANCH || "main";
      if (here !== tinaBranch) {
        warnWith(
          `Local branch is '${here}' but tina/config.ts reads from '${tinaBranch}' (set by GITHUB_BRANCH or the default 'main'). Edits saved in the CMS will commit to '${tinaBranch}', not '${here}'.`,
          `Either checkout '${tinaBranch}' for content editing, or set GITHUB_BRANCH='${here}' if you intend to work on a different branch.`
        );
      }
      return `on '${here}'`;
    }
  );

  // ==========================================================================
  // PHASE 2: PROBES (default ON; --quick to skip)
  // ==========================================================================

  if (!flags.quick) {
    group("Live service probes");

    await check(
      "TinaCloud project reachable (and branch indexed)",
      probeTinaCloud,
      "Open app.tina.io and check that your project exists, your token is current, and the branch is listed under Configuration → Branches with a recent index time."
    );

    await check("Resend API key accepted", probeResendApiKey);
    await check("Resend sender domain is verified", probeResendSender);

    if (devotionalsOn || digestOn) {
      await check(
        "Postgres reachable (SELECT 1)",
        probePostgres,
        "Vercel → Storage → your database → .env.local tab → copy DATABASE_URL. Paste it into .env.local (and Vercel env vars for production)."
      );
    } else {
      await check("Postgres reachable", () => skipWith("devotionals and digest disabled"));
    }
  }

  // ==========================================================================
  // SUMMARY
  // ==========================================================================

  const fail = results.filter((r) => r.status === "fail");
  const warns = results.filter((r) => r.status === "warn");
  const pass = results.filter((r) => r.status === "pass");
  const skipped = results.filter((r) => r.status === "skip");

  if (flags.json) {
    process.stdout.write(JSON.stringify({
      ok: fail.length === 0,
      counts: { pass: pass.length, fail: fail.length, warn: warns.length, skip: skipped.length },
      checks: results,
    }, null, 2));
    process.stdout.write("\n");
  } else {
    console.log("");
    if (fail.length === 0 && warns.length === 0) {
      console.log(`${c.green}${c.bold}All ${pass.length} checks passed — safe to deploy.${c.reset}\n`);
    } else if (fail.length === 0) {
      console.log(`${c.green}${c.bold}${pass.length} check${pass.length === 1 ? "" : "s"} passed${c.reset}, ${c.yellow}${warns.length} warning${warns.length === 1 ? "" : "s"}${c.reset}. Deploy OK; review the warnings above.\n`);
    } else {
      console.log(`${c.red}${c.bold}${fail.length} check${fail.length === 1 ? "" : "s"} failed${c.reset} — fix these before deploying:`);
      fail.forEach((f, i) => {
        console.log(`  ${c.bold}${i + 1}. ${f.label}${c.reset}`);
        console.log(`     ${c.yellow}Problem:${c.reset} ${f.message}`);
        if (f.fix) console.log(`     ${c.green}Fix:${c.reset} ${f.fix}`);
      });
      console.log("");
      console.log(`${c.dim}After fixing, run ${c.bold}npm run doctor${c.reset}${c.dim} again to recheck.${c.reset}\n`);
    }
  }

  process.exit(fail.length === 0 ? 0 : 1);
}

// ============================================================================
// Helper: env var presence check with sentinel + format hint
// ============================================================================

async function checkEnvSet(varName, label, opts) {
  await check(label, () => {
    const status = hasValue(varName);
    if (status === "empty") throw new Error(`${varName} is not set.`);
    if (status === "sentinel") {
      const reason = classifySentinel(varName, process.env[varName]) || "holds a placeholder value.";
      throw new Error(`${varName} ${reason}`);
    }
    const v = process.env[varName];
    if (opts && typeof opts.formatHint === "function") {
      const hint = opts.formatHint(v);
      if (hint) throw new Error(`${varName} ${hint}`);
    }
    if (HIGH_SENSITIVITY.has(varName)) return "set";
    if (varName === "RESEND_FROM_EMAIL") return `set (domain: ${emailDomain(v)})`;
    if (varName === "CHURCH_EMAIL") return `set (domain: ${emailDomain(v)})`;
    if (varName === "RESEND_API_KEY") return "set"; // high-sensitivity-ish
    return "set";
  }, opts && opts.fix);
}

main().catch((e) => {
  console.error(`\n${c.red}Doctor crashed:${c.reset} ${e.stack || e.message}`);
  process.exit(1);
});
