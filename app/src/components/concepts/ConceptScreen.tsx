import type { ReactNode } from "react";
import type { Concept } from "../../data/concepts";

function Panel({
  title,
  note,
  children,
  className = "",
}: {
  title: string;
  note?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel-heading">
        <h2>{title}</h2>
        {note && <span>{note}</span>}
      </header>
      {children}
    </section>
  );
}
function Badge({
  children,
  tone = "good",
}: {
  children: ReactNode;
  tone?: "good" | "warn" | "neutral";
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
function Table({
  headings,
  rows,
}: {
  headings: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {headings.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((v, j) => (
                <td key={j}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Progress({ value }: { value: number }) {
  return (
    <span className="progress-cell">
      <span className="track">
        <i style={{ width: `${value}%` }} />
      </span>
      <b>{value}%</b>
    </span>
  );
}
function Trend({
  labels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  unit = "Millions",
  primary = [24, 36, 31, 54, 65, 84],
  secondary = [18, 24, 26, 34, 45, 57],
}: {
  labels?: string[];
  unit?: string;
  primary?: number[];
  secondary?: number[];
}) {
  const points = (values: number[]) =>
    values
      .map((v, i) => `${48 + i * (580 / (values.length - 1))},${205 - v * 1.6}`)
      .join(" ");
  return (
    <svg
      className="trend"
      viewBox="0 0 660 252"
      role="img"
      aria-label={`${unit} trend across ${labels.join(", ")}`}
    >
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity=".17" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[45, 85, 125, 165, 205].map((y, i) => (
        <g key={y}>
          <line x1="48" x2="628" y1={y} y2={y} stroke="#e9edf1" />
          <text x="3" y={y + 4}>
            {100 - i * 25}
          </text>
        </g>
      ))}
      <polygon points={`48,205 ${points(primary)} 628,205`} fill="url(#area)" />
      <polyline
        points={points(secondary)}
        fill="none"
        stroke="#aab6c5"
        strokeWidth="2.5"
        strokeDasharray="5 5"
      />
      <polyline
        points={points(primary)}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {primary.map((v, i) => (
        <circle
          key={i}
          cx={48 + i * (580 / (primary.length - 1))}
          cy={205 - v * 1.6}
          r="4"
          fill="white"
          stroke="var(--accent)"
          strokeWidth="2"
        />
      ))}
      {labels.map((l, i) => (
        <text
          key={l}
          x={48 + i * (580 / (labels.length - 1))}
          y="237"
          textAnchor="middle"
        >
          {l}
        </text>
      ))}
    </svg>
  );
}
function Legend({ one, two }: { one: string; two: string }) {
  return (
    <div className="legend">
      <span>
        <i />
        {one}
      </span>
      <span>
        <i />
        {two}
      </span>
    </div>
  );
}
function Rows({ items }: { items: [string, string, string][] }) {
  return (
    <div className="detail-rows">
      {items.map(([title, sub, value]) => (
        <div key={title}>
          <span>
            <b>{title}</b>
            <small>{sub}</small>
          </span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function Construction() {
  return (
    <>
      <div className="main-grid">
        <Panel title="Cost performance" note="Cumulative · index">
          <Legend one="Earned value" two="Actual cost" />
          <Trend unit="Performance index" />
          <div className="insight">
            <span className="small-dot" /> All four projects have an approved
            cost baseline.
          </div>
        </Panel>
        <Panel title="Project milestones" note="Upcoming">
          <div className="milestones">
            {[
              [
                "04",
                "OCT",
                "Building A · Level 3 slab",
                "Structural works · 82% ready",
              ],
              [
                "08",
                "OCT",
                "Warehouse B · Roof installation",
                "Steel package · materials on site",
              ],
              [
                "12",
                "OCT",
                "Site C · Utility inspection",
                "MEP works · inspection scheduled",
              ],
            ].map(([day, mon, title, sub]) => (
              <div key={day}>
                <span className="date-tile">
                  <b>{day}</b>
                  <small>{mon}</small>
                </span>
                <span>
                  <b>{title}</b>
                  <small>{sub}</small>
                </span>
              </div>
            ))}
          </div>
          <div className="mini-summary">
            <span>Next 14 days</span>
            <strong>9 milestones</strong>
            <small>2 require procurement follow-up</small>
          </div>
        </Panel>
      </div>
      <Panel title="Active project register" note="4 projects · PHP">
        <Table
          headings={[
            "Project / reference",
            "Contract",
            "Cost to date",
            "Progress",
            "Status",
          ]}
          rows={[
            [
              <>
                <b>Building A — Office fit-out</b>
                <small>PRJ-001 · Metro Manila</small>
              </>,
              "₱18,400,000",
              "₱12,880,000",
              <Progress value={72} />,
              <Badge>On track</Badge>,
            ],
            [
              <>
                <b>Warehouse B — Expansion</b>
                <small>PRJ-002 · Central Luzon</small>
              </>,
              "₱14,200,000",
              "₱9,230,000",
              <Progress value={65} />,
              <Badge>On track</Badge>,
            ],
            [
              <>
                <b>Site C — Utility works</b>
                <small>PRJ-003 · Southern Luzon</small>
              </>,
              "₱9,600,000",
              "₱6,240,000",
              <Progress value={58} />,
              <Badge tone="warn">Review needed</Badge>,
            ],
            [
              <>
                <b>Building D — Renovation</b>
                <small>PRJ-004 · Metro Manila</small>
              </>,
              "₱6,400,000",
              "₱3,070,000",
              <Progress value={48} />,
              <Badge>On track</Badge>,
            ],
          ]}
        />
      </Panel>
      <div className="bottom-grid">
        <Panel title="Procurement queue" note="Pending approval">
          <Rows
            items={[
              [
                "PO-0084 · Structural steel",
                "Warehouse B · Supplier 03",
                "₱428,000",
              ],
              [
                "PO-0085 · Electrical conduits",
                "Site C · Supplier 07",
                "₱86,500",
              ],
            ]}
          />
        </Panel>
        <Panel title="Site activity" note="Latest updates">
          <Rows
            items={[
              [
                "Daily report submitted",
                "Building A · Site engineer · 08:42",
                "Today",
              ],
              [
                "Material delivery verified",
                "Warehouse B · 24 units received · 08:15",
                "Today",
              ],
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
function Accounting() {
  return (
    <>
      <div className="main-grid">
        <Panel title="Cash flow" note="April – September · index">
          <Legend one="Cash received" two="Cash paid" />
          <Trend
            primary={[37, 48, 44, 64, 71, 86]}
            secondary={[29, 37, 33, 45, 57, 61]}
          />
          <div className="chart-total">
            <span>September net cash movement</span>
            <strong>+₱618,500</strong>
          </div>
        </Panel>
        <Panel title="Accounts receivable aging" note="As of Sep 30">
          <div className="aging">
            {[
              ["Current", "₱840,000", 72],
              ["1–30 days", "₱246,000", 36],
              ["31–60 days", "₱118,000", 22],
              ["61+ days", "₱46,000", 12],
            ].map(([label, value, width]) => (
              <div key={label}>
                <div>
                  <span>{label}</span>
                  <b>{value}</b>
                </div>
                <span className="track">
                  <i style={{ width: `${width}%` }} />
                </span>
              </div>
            ))}
          </div>
          <div className="mini-summary">
            <span>Total receivables</span>
            <strong>₱1,250,000</strong>
            <small>12 open invoices · 4 overdue</small>
          </div>
        </Panel>
      </div>
      <Panel title="Recent journal entries" note="September 2026 · PHP">
        <Table
          headings={[
            "Entry / description",
            "Account",
            "Debit",
            "Credit",
            "Status",
          ]}
          rows={[
            [
              <>
                <b>JE-00942 · Customer payment</b>
                <small>Sep 30 · Client 014</small>
              </>,
              "Cash at bank",
              "₱184,000",
              "—",
              <Badge>Posted</Badge>,
            ],
            [
              <>
                <b>JE-00942 · Customer payment</b>
                <small>Sep 30 · Client 014</small>
              </>,
              "Accounts receivable",
              "—",
              "₱184,000",
              <Badge>Posted</Badge>,
            ],
            [
              <>
                <b>JE-00943 · Software subscription</b>
                <small>Sep 30 · Vendor 006</small>
              </>,
              "Software expense",
              "₱12,500",
              "—",
              <Badge>Posted</Badge>,
            ],
            [
              <>
                <b>JE-00943 · Software subscription</b>
                <small>Sep 30 · Vendor 006</small>
              </>,
              "Cash at bank",
              "—",
              "₱12,500",
              <Badge>Posted</Badge>,
            ],
          ]}
        />
      </Panel>
      <div className="bottom-grid">
        <Panel title="Bank reconciliation" note="September close">
          <Rows
            items={[
              [
                "Operating account · 001",
                "Statement ending Sep 30 · 84 transactions",
                "Matched",
              ],
              [
                "Payroll account · 002",
                "Statement ending Sep 30 · 32 transactions",
                "Matched",
              ],
            ]}
          />
        </Panel>
        <Panel title="Month-end checklist" note="3 of 5 complete">
          <Rows
            items={[
              ["Review accruals", "Finance team · Due Oct 03", "In progress"],
              [
                "Approve management reports",
                "Controller · Due Oct 05",
                "Pending",
              ],
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
function Prediction() {
  return (
    <>
      <div className="market-feature">
        <span className="eyebrow">ENERGY · ILLUSTRATIVE MARKET</span>
        <h2>Will renewable energy exceed 30% of the demo energy mix?</h2>
        <p>
          Fictional scenario · Resolves December 31, 2026 · No real-money
          trading
        </p>
        <div className="market-probability">
          <strong>
            64<small>%</small>
          </strong>
          <span>
            Demo probability
            <br />
            <b>+6 points this week</b>
          </span>
          <div className="outcomes">
            <span>
              YES <b>64 credits</b>
            </span>
            <span>
              NO <b>36 credits</b>
            </span>
          </div>
        </div>
      </div>
      <div className="main-grid market-grid">
        <Panel title="Probability history" note="Last 7 days">
          <Legend one="Demo probability" two="Reference scenario" />
          <Trend
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            unit="Probability (%)"
            primary={[46, 52, 48, 57, 54, 61, 64]}
            secondary={[40, 40, 40, 40, 40, 40, 40]}
          />
        </Panel>
        <Panel title="Illustrative order book" note="Simulation credits">
          <Table
            headings={["Side", "Price", "Quantity", "Total"]}
            rows={[
              [<span className="sell">Ask</span>, "67", "240", "16,080"],
              [<span className="sell">Ask</span>, "66", "180", "11,880"],
              [<span className="sell">Ask</span>, "65", "320", "20,800"],
              [<span className="buy">Bid</span>, "63", "280", "17,640"],
              [<span className="buy">Bid</span>, "62", "400", "24,800"],
            ]}
          />
        </Panel>
      </div>
      <Panel title="Discover demo markets" note="Research scenarios only">
        <Table
          headings={[
            "Scenario",
            "Category",
            "Probability",
            "Demo volume",
            "Resolution",
          ]}
          rows={[
            [
              <b>Transit ridership exceeds simulated target</b>,
              "Transport",
              <Progress value={72} />,
              "42,800 credits",
              "Dec 31, 2026",
            ],
            [
              <b>Solar capacity reaches fictional milestone</b>,
              "Energy",
              <Progress value={58} />,
              "36,200 credits",
              "Nov 30, 2026",
            ],
            [
              <b>Demo rainfall index stays below threshold</b>,
              "Weather",
              <Progress value={41} />,
              "28,640 credits",
              "Oct 31, 2026",
            ],
          ]}
        />
      </Panel>
      <div className="resolution-note">
        <span className="small-dot" />
        <p>
          <b>Resolution criteria</b> — Outcomes use a synthetic dataset with a
          fixed cutoff. This screen illustrates market structure, probability
          history and transparent settlement rules; no bets or orders can be
          placed.
        </p>
      </div>
    </>
  );
}
function Agents() {
  return (
    <>
      <div className="main-grid">
        <Panel title="Network structure" note="6 groups · 48 agents">
          <div className="network">
            <div className="network-root">
              <span className="avatar">OP</span>
              <span>
                <b>Demo operator</b>
                <small>Read-only operations workspace</small>
              </span>
              <Badge>Active</Badge>
            </div>
            <div className="branches">
              {[
                ["A", "Group 01", "18 agents", "840,000"],
                ["B", "Group 02", "16 agents", "780,000"],
                ["C", "Other groups", "14 agents", "840,000"],
              ].map(([letter, name, count, amount]) => (
                <div key={name}>
                  <span className="avatar">{letter}</span>
                  <b>{name}</b>
                  <small>{count}</small>
                  <strong>{amount}</strong>
                  <small>demo turnover</small>
                </div>
              ))}
            </div>
          </div>
          <div className="insight">
            Commission calculations shown in fictional credits only.
          </div>
        </Panel>
        <Panel title="Reconciliation health" note="Current period">
          <div className="donut">
            <div>
              <strong>96.4%</strong>
              <span>Matched batches</span>
            </div>
          </div>
          <div className="recon-key">
            <span>
              <i />
              Matched <b>270</b>
            </span>
            <span>
              <i />
              In review <b>10</b>
            </span>
          </div>
          <div className="mini-summary compact">
            <span>Review queue</span>
            <strong>10 exceptions</strong>
            <small>8 amount differences · 2 missing references</small>
          </div>
        </Panel>
      </div>
      <Panel
        title="Agent performance & commissions"
        note="September · demo credits"
      >
        <Table
          headings={[
            "Agent",
            "Network group",
            "Turnover",
            "Rate",
            "Commission",
            "Status",
          ]}
          rows={[
            [
              <>
                <b>Agent 001</b>
                <small>AG-001 · Joined Jun 12</small>
              </>,
              "Group 01",
              "420,000",
              "2.0%",
              "8,400",
              <Badge>Reconciled</Badge>,
            ],
            [
              <>
                <b>Agent 002</b>
                <small>AG-002 · Joined Jun 18</small>
              </>,
              "Group 01",
              "420,000",
              "2.0%",
              "8,400",
              <Badge>Reconciled</Badge>,
            ],
            [
              <>
                <b>Agent 003</b>
                <small>AG-003 · Joined Jul 02</small>
              </>,
              "Group 02",
              "380,000",
              "2.0%",
              "7,600",
              <Badge tone="warn">Review</Badge>,
            ],
            [
              <>
                <b>Agent 004</b>
                <small>AG-004 · Joined Jul 08</small>
              </>,
              "Group 02",
              "400,000",
              "2.0%",
              "8,000",
              <Badge>Reconciled</Badge>,
            ],
          ]}
        />
      </Panel>
      <div className="bottom-grid">
        <Panel title="Commission ledger" note="Period summary">
          <Rows
            items={[
              [
                "Accrued this period",
                "2.0% of 2,460,000 demo turnover",
                "49,200",
              ],
              [
                "Approved / awaiting review",
                "Illustrative credits · no payouts",
                "45,600 / 3,600",
              ],
            ]}
          />
        </Panel>
        <Panel title="Audit activity" note="Latest events">
          <Rows
            items={[
              [
                "Batch REC-280 flagged",
                "Amount difference · Agent 003 · 09:24",
                "Review",
              ],
              [
                "Role permission reviewed",
                "Operations reviewer · 09:12",
                "Logged",
              ],
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
function Geo() {
  return (
    <>
      <div className="main-grid">
        <Panel title="Answer visibility over time" note="Weekly · indexed">
          <Legend one="example.test" two="Comparison set" />
          <Trend
            labels={["W1", "W2", "W3", "W4", "W5", "W6"]}
            primary={[38, 44, 49, 52, 62, 68]}
            secondary={[32, 36, 33, 37, 40, 43]}
          />
          <div className="insight">
            <span className="small-dot" /> Strongest movement in the workflow
            automation topic cluster.
          </div>
        </Panel>
        <Panel title="Visibility by answer engine" note="Synthetic evaluation">
          <div className="engine-list">
            {[
              ["Model A", 78],
              ["Model B", 71],
              ["Model C", 65],
              ["Model D", 60],
            ].map(([name, score]) => (
              <div key={name}>
                <span className="engine-icon">{String(name).slice(-1)}</span>
                <div>
                  <b>{name}</b>
                  <Progress value={Number(score)} />
                </div>
              </div>
            ))}
          </div>
          <div className="mini-summary compact">
            <span>Monitoring scope</span>
            <strong>240 prompts</strong>
            <small>4 engines · 4 topic clusters · weekly runs</small>
          </div>
        </Panel>
      </div>
      <Panel title="Prompt visibility monitor" note="Latest completed run">
        <Table
          headings={[
            "Prompt / topic",
            "Mentioned",
            "Cited page",
            "Position",
            "Change",
          ]}
          rows={[
            [
              <>
                <b>How can a team automate repetitive reporting?</b>
                <small>Workflow automation · Informational</small>
              </>,
              <Badge>3 of 4 engines</Badge>,
              "/guides/report-automation",
              "2.3 avg.",
              <span className="positive">+1.2</span>,
            ],
            [
              <>
                <b>What makes an effective knowledge base?</b>
                <small>Knowledge operations · Informational</small>
              </>,
              <Badge>4 of 4 engines</Badge>,
              "/resources/knowledge-base",
              "1.8 avg.",
              <span className="positive">+0.6</span>,
            ],
            [
              <>
                <b>How do teams measure support quality?</b>
                <small>Customer operations · Commercial</small>
              </>,
              <Badge tone="warn">1 of 4 engines</Badge>,
              "/insights/support-quality",
              "5.1 avg.",
              <span className="negative">−0.4</span>,
            ],
            [
              <>
                <b>Compare approaches to document extraction</b>
                <small>Document workflows · Comparison</small>
              </>,
              <Badge>3 of 4 engines</Badge>,
              "/guides/document-extraction",
              "2.6 avg.",
              <span className="positive">+0.9</span>,
            ],
          ]}
        />
      </Panel>
      <div className="bottom-grid">
        <Panel title="Content opportunities" note="Prioritized recommendations">
          <Rows
            items={[
              [
                "Add a concise source-backed answer",
                "/insights/support-quality · 12 prompts affected",
                "High",
              ],
              [
                "Update comparison structure",
                "/guides/document-extraction · 8 prompts affected",
                "Medium",
              ],
            ]}
          />
        </Panel>
        <Panel title="Citation distribution" note="Illustrative domains">
          <Rows
            items={[
              ["example.test", "Owned content · 238 citations", "24.8%"],
              [
                "reference.example",
                "Comparison domain · 172 citations",
                "17.9%",
              ],
            ]}
          />
        </Panel>
      </div>
    </>
  );
}
function Ai() {
  return (
    <>
      <div className="main-grid workflow-grid">
        <Panel title="Document intake workflow" note="Run RUN-01842">
          <div className="workflow">
            {[
              ["01", "Intake", "Receive document", "128 KB · PDF"],
              ["02", "Extract", "Parse fields", "12 fields found"],
              ["03", "Validate", "Check schema", "All checks passed"],
              ["04", "Route", "Queue for review", "Human checkpoint"],
            ].map(([num, title, desc, meta]) => (
              <div key={num}>
                <span>{num}</span>
                <b>{title}</b>
                <small>{desc}</small>
                <em>{meta}</em>
              </div>
            ))}
          </div>
          <div className="run-summary">
            <span>
              <small>Status</small>
              <Badge>Completed</Badge>
            </span>
            <span>
              <small>Duration</small>
              <b>2.18 seconds</b>
            </span>
            <span>
              <small>Tool calls</small>
              <b>4 successful</b>
            </span>
            <span>
              <small>Environment</small>
              <b>Demo sandbox</b>
            </span>
          </div>
          <div className="insight">
            Human review remains required before downstream actions.
          </div>
        </Panel>
        <Panel title="Evaluation results" note="500 synthetic cases">
          <div className="evaluation-score">
            <strong>
              96.8<small>%</small>
            </strong>
            <Badge>484 passed</Badge>
          </div>
          <div className="eval-bars">
            {[
              ["Schema accuracy", 98],
              ["Grounded responses", 96],
              ["Policy adherence", 100],
            ].map(([name, score]) => (
              <div key={name}>
                <span>{name}</span>
                <Progress value={Number(score)} />
              </div>
            ))}
          </div>
          <small className="muted">
            Test set v0.8 · Last run today at 08:30
          </small>
        </Panel>
      </div>
      <div className="main-grid">
        <Panel title="Recent workflow runs" note="Latest 5 runs">
          <Table
            headings={["Run / workflow", "Duration", "Tokens", "Status"]}
            rows={[
              [
                <>
                  <b>RUN-01842</b>
                  <small>Document intake</small>
                </>,
                "2.18s",
                "1,420",
                <Badge>Completed</Badge>,
              ],
              [
                <>
                  <b>RUN-01841</b>
                  <small>Knowledge retrieval</small>
                </>,
                "1.86s",
                "2,180",
                <Badge>Completed</Badge>,
              ],
              [
                <>
                  <b>RUN-01840</b>
                  <small>Report drafting</small>
                </>,
                "4.32s",
                "3,840",
                <Badge tone="warn">Needs review</Badge>,
              ],
              [
                <>
                  <b>RUN-01839</b>
                  <small>Request classification</small>
                </>,
                "0.92s",
                "680",
                <Badge>Completed</Badge>,
              ],
              [
                <>
                  <b>RUN-01838</b>
                  <small>Document intake</small>
                </>,
                "2.40s",
                "1,560",
                <Badge>Completed</Badge>,
              ],
            ]}
          />
        </Panel>
        <Panel title="Execution trace" note="RUN-01842">
          <ol className="trace">
            {[
              ["input.received", "Document validated", "00:00.000"],
              ["extract.fields", "12 structured fields returned", "00:00.420"],
              ["schema.validate", "Required fields verified", "00:01.260"],
              ["review.enqueue", "Human review task created", "00:02.180"],
            ].map(([step, desc, time]) => (
              <li key={step}>
                <span>
                  <b>{step}</b>
                  <small>{desc}</small>
                </span>
                <code>{time}</code>
              </li>
            ))}
          </ol>
          <div className="trace-payload">
            <span>OUTPUT PREVIEW</span>
            <code>
              {
                '{ "document_type": "invoice",\n  "fields": 12,\n  "review_required": true }'
              }
            </code>
          </div>
        </Panel>
      </div>
      <div className="resolution-note">
        <span className="small-dot" />
        <p>
          <b>Knowledge health</b> — 1,240 demo documents indexed · 3 collections
          · Last sync 09:15 · No client data or private prompts included.
        </p>
      </div>
    </>
  );
}
const bodies: Record<Concept["slug"], () => ReactNode> = {
  "construction-erp": Construction,
  "independent-accounting": Accounting,
  "prediction-market": Prediction,
  "casino-agent-system": Agents,
  "geo-platform": Geo,
  "ai-initiatives": Ai,
};
export default function ConceptScreen({ concept }: { concept: Concept }) {
  const Body = bodies[concept.slug];
  return (
    <div className={`concept-app theme-${concept.accent}`}>
      <aside className="sidebar">
        <div className="workspace-mark">
          <span className="workspace-symbol">▧</span>
          <span>
            DEMO WORKSPACE<small>{concept.workspace}</small>
          </span>
        </div>
        <div className="workspace-switch">
          <span className="avatar">D</span>
          <span>
            <b>Sample organization</b>
            <small>Illustrative environment</small>
          </span>
        </div>
        <span className="nav-label">WORKSPACE</span>
        <div className="side-navigation">
          {concept.navigation.map((item, i) => (
            <div key={item} className={i === 0 ? "selected" : ""}>
              <span className="nav-icon">
                {["▦", "◫", "▤", "◷", "▥", "⚙"][i]}
              </span>
              {item}
              {i === 0 && <i />}
            </div>
          ))}
        </div>
        <div className="sidebar-note">
          <span className="lock-symbol">◇</span>
          <b>Confidential project</b>
          <p>
            Original concept interface. Client identity, source code and actual
            design remain private.
          </p>
        </div>
        <a className="back-link" href={`/work/#${concept.slug}`}>
          ← Back to portfolio
        </a>
        <div className="profile">
          <span className="avatar">DR</span>
          <span>
            <b>Demo reviewer</b>
            <small>Read-only preview</small>
          </span>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div>
            <span>Workspace</span>
            <i>/</i>
            <b>{concept.eyebrow}</b>
          </div>
          <span className="concept-label">
            <i />
            Concept visualization · Synthetic data
          </span>
        </header>
        <main>
          <div className="page-heading">
            <div>
              <span className="eyebrow">{concept.workspace}</span>
              <h1>{concept.eyebrow}</h1>
              <p>{concept.subtitle}</p>
            </div>
            <div className="period">
              <span>Reporting period</span>
              <b>September 2026</b>
            </div>
          </div>
          <div className="stats">
            {concept.stats.map(([title, value, note]) => (
              <div key={title}>
                <span>{title}</span>
                <strong>{value}</strong>
                <small>{note}</small>
              </div>
            ))}
          </div>
          <Body />
          <footer className="concept-footer">
            <a href={`/work/#${concept.slug}`}>← Back to portfolio</a>
            <span>{concept.title} · Portfolio concept 2026</span>
            <span>
              Original illustrative UI. No client branding or private design.
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
