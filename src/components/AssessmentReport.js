'use client';

import { useState } from 'react';

/**
 * AssessmentReport
 * Print-only A4 report for the nutrition assessment, laid out on the Robust
 * letterhead from rOBUST (1).pdf.
 *
 * The header, footer and watermark are position:fixed, which browsers repeat on
 * every printed page — so a report that runs to two or three pages stays on the
 * letterhead throughout. The @page margins reserve the space they occupy.
 *
 * Hidden on screen; only rendered by the browser's print / "Save as PDF" dialog.
 */

const LETTERHEAD = {
  header: '/report/report-letterhead-header.png',
  footer: '/report/report-letterhead-footer.png',
  watermark: '/report/report-letterhead-watermark.png',
};

const FLAG_PRINT = {
  red: { label: 'Red', border: '#E53935', bg: '#FFEBEE', text: '#7f0000' },
  orange: { label: 'Orange', border: '#F57C00', bg: '#FFF3E0', text: '#6D3000' },
  yellow: { label: 'Yellow', border: '#F9A825', bg: '#FFFDE7', text: '#7d6000' },
  green: { label: 'Green', border: '#4CAF50', bg: '#E8F5E9', text: '#1B5E20' },
};

const BRAND = '#2D6A2D';

function formatDate(date) {
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
}

function Row({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="rp-row">
      <span className="rp-row-label">{label}</span>
      <span className="rp-row-value">{value}</span>
    </div>
  );
}

function AlertList({ items, flag }) {
  const tone = FLAG_PRINT[flag];
  return items.map((item, index) => (
    <div
      key={`${flag}-${index}`}
      className="rp-alert"
      style={{ background: tone.bg, borderLeft: `3px solid ${tone.border}` }}
    >
      {item.label && (
        <div className="rp-alert-title" style={{ color: tone.text }}>
          {item.label}
        </div>
      )}
      <div className="rp-alert-body" style={{ color: tone.text }}>
        {item.alert || item.msg}
      </div>
    </div>
  ));
}

export default function AssessmentReport({ basics, bmi, results }) {
  // Captured once when the report mounts, so re-renders never shift the date.
  const [issuedAt] = useState(() => new Date());

  if (!results) return null;

  const r = results;
  const tone = FLAG_PRINT[r.classification.flag] || FLAG_PRINT.green;
  const issuedOn = formatDate(issuedAt);
  const hasAlerts =
    r.redAlerts.length > 0 || r.orangeAlerts.length > 0 || r.yellowAlerts.length > 0 || r.extraAlerts.length > 0;
  const conditions =
    basics.conditions && basics.conditions.length > 0 ? basics.conditions.join(', ') : 'None reported';

  return (
    <div id="assessment-report" className="rp" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="rp-letterhead-watermark" src={LETTERHEAD.watermark} alt="" />

      {/* A table, because thead/tfoot are the one construct every browser
          reliably repeats at the top and bottom of every printed page. */}
      <table className="rp-sheet">
        <thead>
          <tr>
            <td>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="rp-letterhead-header" src={LETTERHEAD.header} alt="" />
            </td>
          </tr>
        </thead>

        <tfoot>
          <tr>
            <td>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="rp-letterhead-footer" src={LETTERHEAD.footer} alt="" />
            </td>
          </tr>
        </tfoot>

        <tbody>
          <tr>
            <td className="rp-body">
        <div className="rp-titleblock">
          <h1 className="rp-title">Nutritional Health Assessment</h1>
          <p className="rp-subtitle">
            Clinician-designed 22-point assessment · Issued {issuedOn}
          </p>
        </div>

        {/* Patient details */}
        <section className="rp-section">
          <h2 className="rp-h2">Assessment Details</h2>
          <div className="rp-grid">
            <Row label="Name" value={basics.name} />
            <Row label="Age" value={basics.age ? `${basics.age} years` : ''} />
            <Row label="Gender" value={basics.gender} />
            <Row label="Height" value={basics.height ? `${basics.height} cm` : ''} />
            <Row label="Weight" value={basics.weight ? `${basics.weight} kg` : ''} />
            <Row label="BMI" value={bmi ? bmi.toFixed(1) : ''} />
            <Row label="Food preference" value={basics.foodPref} />
            <Row label="Lifestyle" value={basics.lifestyle} />
            <Row label="Occupation" value={basics.occupation} />
            <Row label="Community" value={basics.community} />
          </div>
          <div className="rp-row rp-row-wide">
            <span className="rp-row-label">Medical conditions</span>
            <span className="rp-row-value">{conditions}</span>
          </div>
        </section>

        {/* Score */}
        <section className="rp-section rp-avoid-break">
          <h2 className="rp-h2">Your Nutrition Score</h2>
          <div className="rp-scorebox" style={{ borderColor: tone.border, background: tone.bg }}>
            <div className="rp-score">
              {r.score}
              <span className="rp-score-max">/66</span>
            </div>
            <div className="rp-classification" style={{ color: tone.text }}>
              {r.classification.label}
            </div>
          </div>

          <div className="rp-flags">
            {['red', 'orange', 'yellow', 'green'].map((flag) => {
              const counts = {
                red: r.redCount,
                orange: r.orangeCount,
                yellow: r.yellowCount,
                green: r.greenCount,
              };
              return (
                <div key={flag} className="rp-flag" style={{ borderColor: FLAG_PRINT[flag].border }}>
                  <div className="rp-flag-n" style={{ color: FLAG_PRINT[flag].text }}>
                    {counts[flag]}
                  </div>
                  <div className="rp-flag-l">{FLAG_PRINT[flag].label} flags</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Validation notes */}
        {r.crossAlerts.length > 0 && (
          <section className="rp-section rp-avoid-break">
            <h2 className="rp-h2">Validation Notes</h2>
            {r.crossAlerts.map((alert, index) => (
              <div
                key={index}
                className="rp-alert"
                style={{ background: FLAG_PRINT.orange.bg, borderLeft: `3px solid ${FLAG_PRINT.orange.border}` }}
              >
                <div className="rp-alert-body" style={{ color: FLAG_PRINT.orange.text }}>
                  {alert}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Alerts */}
        {hasAlerts && (
          <section className="rp-section">
            <h2 className="rp-h2">Areas Needing Attention</h2>
            <AlertList items={r.redAlerts} flag="red" />
            <AlertList items={r.orangeAlerts} flag="orange" />
            <AlertList items={r.extraAlerts} flag="orange" />
            <AlertList items={r.yellowAlerts} flag="yellow" />
            {r.sleepAlert && (
              <div
                className="rp-alert"
                style={{ background: FLAG_PRINT.yellow.bg, borderLeft: `3px solid ${FLAG_PRINT.yellow.border}` }}
              >
                <div className="rp-alert-title" style={{ color: FLAG_PRINT.yellow.text }}>
                  Sleep
                </div>
                <div className="rp-alert-body" style={{ color: FLAG_PRINT.yellow.text }}>
                  {r.sleepAlert}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Positives */}
        {r.greenItems.length > 0 && (
          <section className="rp-section">
            <h2 className="rp-h2">What You Are Doing Well</h2>
            <ul className="rp-list">
              {r.greenItems.map((item, index) => (
                <li key={index}>
                  <strong>{item.label}</strong> — {item.msg}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Recommendation */}
        <section className="rp-section rp-avoid-break">
          <h2 className="rp-h2">Recommendation</h2>
          <p className="rp-para">
            {r.classification.case === 4 &&
              'Your assessment indicates poor nutritional status requiring immediate attention. We strongly recommend consulting a healthcare professional alongside a structured therapeutic diet plan.'}
            {r.classification.case === 3 &&
              'Your assessment shows moderate nutritional risk. A structured diet plan designed by a dietician is recommended to correct the flagged areas before they progress.'}
            {r.classification.case === 2 &&
              'You have a good foundation but some areas need attention. Address the flagged concerns — particularly around diet consistency, sleep, and hydration — to elevate your nutritional health further.'}
            {r.classification.case === 1 &&
              'Excellent nutritional status. Keep maintaining your healthy habits — a balanced diet, regular activity, and good sleep will sustain this over the long term.'}
          </p>
          <p className="rp-para">
            To discuss these results and get a therapeutic meal plan built around your body and any
            medical conditions, contact our dieticians at eatrobust@gmail.com or +91 95375 21511.
          </p>
        </section>

        <p className="rp-disclaimer">
          This report is generated from self-reported answers and is intended for nutritional
          guidance only. It is not a medical diagnosis and does not replace consultation with a
          qualified healthcare professional.
        </p>
            </td>
          </tr>
        </tbody>
      </table>

      <style jsx global>{`
        /* Hidden on screen — this layout exists only for print. */
        #assessment-report {
          display: none;
        }

        @media print {
          /* No page margin: the repeating thead/tfoot supply the letterhead band
             themselves, and the content cell adds its own side padding. */
          @page {
            size: A4;
            margin: 0;
          }

          /* Everything except the report is removed from the printed page. */
          .assessment-screen {
            display: none !important;
          }

          html,
          body {
            background: #fff !important;
          }

          #assessment-report {
            display: block;
            background: #fff;
            font-family: 'IBM Plex Sans Condensed', 'DM Sans', 'Segoe UI', sans-serif;
            color: #1a1a1a;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .rp-sheet {
            width: 100%;
            border-collapse: collapse;
          }

          .rp-sheet thead td,
          .rp-sheet tfoot td {
            padding: 0;
            border: 0;
          }

          /* thead repeats at the top of every page, tfoot at the bottom */
          .rp-sheet thead {
            display: table-header-group;
          }

          .rp-sheet tfoot {
            display: table-footer-group;
          }

          .rp-letterhead-header,
          .rp-letterhead-footer {
            display: block;
            width: 100%;
            height: auto;
          }

          .rp-letterhead-watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 92mm;
            height: auto;
            opacity: 0.4;
            z-index: 0;
          }

          .rp-body {
            position: relative;
            z-index: 1;
            padding: 7mm 16mm 7mm 16mm;
            vertical-align: top;
          }

          .rp-titleblock {
            border-bottom: 2px solid ${BRAND};
            padding-bottom: 8px;
            margin-bottom: 14px;
          }

          .rp-title {
            font-size: 19pt;
            font-weight: 700;
            color: ${BRAND};
            margin: 0;
            letter-spacing: -0.2pt;
          }

          .rp-subtitle {
            font-size: 8.5pt;
            color: #666;
            margin: 3px 0 0;
          }

          .rp-section {
            margin-bottom: 13px;
          }

          .rp-avoid-break {
            break-inside: avoid;
          }

          .rp-h2 {
            font-size: 10.5pt;
            font-weight: 700;
            color: ${BRAND};
            text-transform: uppercase;
            letter-spacing: 0.6pt;
            margin: 0 0 7px;
            padding-bottom: 3px;
            border-bottom: 1px solid #ddd;
          }

          .rp-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0 18px;
          }

          .rp-row {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            font-size: 9pt;
            padding: 3.5px 0;
            border-bottom: 1px dotted #e0e0e0;
          }

          .rp-row-wide {
            margin-top: 4px;
          }

          .rp-row-label {
            color: #777;
          }

          .rp-row-value {
            font-weight: 600;
            text-align: right;
          }

          .rp-scorebox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            border: 1.5px solid;
            border-radius: 8px;
            padding: 11px 16px;
          }

          .rp-score {
            font-size: 27pt;
            font-weight: 800;
            line-height: 1;
            color: ${BRAND};
          }

          .rp-score-max {
            font-size: 12pt;
            font-weight: 400;
            opacity: 0.6;
          }

          .rp-classification {
            font-size: 12.5pt;
            font-weight: 700;
          }

          .rp-flags {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-top: 9px;
          }

          .rp-flag {
            border: 1px solid;
            border-radius: 6px;
            padding: 6px 4px;
            text-align: center;
          }

          .rp-flag-n {
            font-size: 14pt;
            font-weight: 800;
            line-height: 1.1;
          }

          .rp-flag-l {
            font-size: 7.5pt;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.4pt;
          }

          .rp-alert {
            border-radius: 5px;
            padding: 7px 10px;
            margin-bottom: 6px;
            break-inside: avoid;
          }

          .rp-alert-title {
            font-size: 9pt;
            font-weight: 700;
            margin-bottom: 2px;
          }

          .rp-alert-body {
            font-size: 8.5pt;
            line-height: 1.45;
          }

          .rp-list {
            margin: 0;
            padding-left: 15px;
            columns: 2;
            column-gap: 18px;
          }

          .rp-list li {
            font-size: 8.5pt;
            line-height: 1.5;
            margin-bottom: 3px;
            break-inside: avoid;
          }

          .rp-para {
            font-size: 9pt;
            line-height: 1.55;
            margin: 0 0 6px;
          }

          .rp-disclaimer {
            font-size: 7.5pt;
            color: #888;
            line-height: 1.45;
            border-top: 1px solid #ddd;
            padding-top: 7px;
            margin-top: 14px;
          }
        }
      `}</style>
    </div>
  );
}
