import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  ImageRun, BorderStyle, TableRow, TableCell, Table, WidthType,
  ShadingType, PageBreak, Tab, TabStopType, TabStopPosition,
} from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const logoB64 = fs.readFileSync(path.join(projectRoot, "public/logo.png"), "base64");
const faviconB64 = fs.readFileSync(path.join(projectRoot, "public/favicon.png"), "base64");
const logoBuffer = fs.readFileSync(path.join(projectRoot, "public/logo.png"));
const faviconBuffer = fs.readFileSync(path.join(projectRoot, "public/favicon.png"));

// ═══════════════════════════════════════════
// PDF GENERATION
// ═══════════════════════════════════════════

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', -apple-system, sans-serif;
    color: #1A365D;
    line-height: 1.6;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 8.5in;
    height: 11in;
    padding: 0;
    page-break-after: always;
    position: relative;
    overflow: hidden;
  }
  .page:last-child { page-break-after: auto; }

  /* Prevent orphaned headings and split blocks */
  h3, h4, .content-block, .type-specimen, .rule-item, .tone-card, .pillar-card, .color-swatch {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  h3, .section-label, .section-title {
    page-break-after: avoid;
    break-after: avoid;
  }
  .color-grid, .color-grid-primary, .logo-showcase, .rules-grid, .tone-grid, .pillar-grid, .weight-grid {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* ─── COVER ─── */
  .cover {
    background: linear-gradient(135deg, #1A365D 0%, #2C7A7B 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    position: relative;
  }
  .cover::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at 30% 70%, rgba(44,122,123,0.3) 0%, transparent 60%),
                radial-gradient(circle at 70% 30%, rgba(214,158,46,0.15) 0%, transparent 50%);
  }
  .cover-content { position: relative; z-index: 1; padding: 2in 1in; }
  .cover-logo-container {
    background: white;
    border-radius: 16px;
    padding: 20px 32px;
    display: inline-block;
    margin-bottom: 40px;
  }
  .cover-logo { width: 280px; display: block; }
  .cover-divider { width: 60px; height: 3px; background: #D69E2E; margin: 30px auto; }
  .cover h1 { font-size: 42px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 12px; }
  .cover h2 { font-size: 18px; font-weight: 400; opacity: 0.8; letter-spacing: 0.15em; text-transform: uppercase; }
  .cover-footer {
    position: absolute;
    bottom: 60px;
    left: 0; right: 0;
    text-align: center;
    font-size: 11px;
    opacity: 0.5;
    letter-spacing: 0.1em;
  }

  /* ─── INTERIOR PAGES ─── */
  .interior { padding: 0.75in 1in; }
  .interior-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #2C7A7B;
    padding-bottom: 12px;
    margin-bottom: 36px;
  }
  .interior-header img { height: 32px; }
  .interior-header span { font-size: 10px; color: #64748B; letter-spacing: 0.15em; text-transform: uppercase; }

  .section-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #2C7A7B;
    margin-bottom: 8px;
  }
  .section-title {
    font-size: 30px;
    font-weight: 800;
    color: #1A365D;
    margin-bottom: 8px;
    line-height: 1.2;
  }
  .section-subtitle {
    font-size: 13px;
    color: #64748B;
    margin-bottom: 28px;
    max-width: 480px;
    line-height: 1.7;
  }
  .divider { width: 40px; height: 3px; background: #D69E2E; margin-bottom: 28px; }

  .content-block { margin-bottom: 22px; }
  .content-block h3 {
    font-size: 15px;
    font-weight: 700;
    color: #1A365D;
    margin-bottom: 6px;
  }
  .content-block p, .content-block ul {
    font-size: 12px;
    color: #64748B;
    line-height: 1.8;
  }
  .content-block ul { padding-left: 18px; }
  .content-block li { margin-bottom: 4px; }

  /* ─── COLOR SWATCHES ─── */
  .color-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  .color-swatch {
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.06);
  }
  .swatch-block { height: 64px; width: 100%; }
  .swatch-info { padding: 8px 10px; background: white; }
  .swatch-name { font-size: 11px; font-weight: 700; color: #1A365D; margin-bottom: 1px; }
  .swatch-hex { font-size: 10px; color: #64748B; font-family: 'SF Mono', monospace; }
  .swatch-role { font-size: 9px; color: #94A3B8; margin-top: 2px; }

  .color-grid-primary {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }
  .color-grid-primary .swatch-block { height: 80px; }

  /* ─── TYPOGRAPHY ─── */
  .type-specimen {
    margin-bottom: 16px;
    padding: 16px 20px;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    background: #F8FAFC;
  }
  .type-specimen .label {
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #2C7A7B;
    margin-bottom: 6px;
  }
  .type-specimen .sample { color: #1A365D; }
  .type-specimen .meta { font-size: 10px; color: #94A3B8; margin-top: 4px; }

  .weight-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-top: 16px;
  }
  .weight-item {
    padding: 12px;
    background: #F8FAFC;
    border-radius: 8px;
    border: 1px solid #E2E8F0;
    text-align: center;
  }
  .weight-item .number { font-size: 24px; color: #1A365D; margin-bottom: 2px; }
  .weight-item .name { font-size: 9px; color: #64748B; text-transform: uppercase; letter-spacing: 0.08em; }

  /* ─── LOGO USAGE ─── */
  .logo-showcase {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 24px;
  }
  .logo-box {
    padding: 28px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
  }
  .logo-box img { max-width: 180px; }
  .logo-box-light { background: #F8FAFC; border: 1px solid #E2E8F0; }
  .logo-box-dark { background: #1A365D; }
  .logo-box-teal { background: #2C7A7B; }
  .logo-box-white { background: white; border: 1px solid #E2E8F0; }
  .logo-container-on-dark {
    background: white;
    border-radius: 10px;
    padding: 12px 20px;
    display: inline-flex;
  }
  .logo-box-label {
    font-size: 9px;
    color: #94A3B8;
    text-align: center;
    margin-top: 8px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* ─── DO/DON'T ─── */
  .rules-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }
  .rule-item {
    padding: 14px;
    border-radius: 8px;
    font-size: 11px;
    line-height: 1.6;
  }
  .rule-do { background: #F0FFF4; border-left: 3px solid #2C7A7B; color: #1A365D; }
  .rule-dont { background: #FFF5F5; border-left: 3px solid #E53E3E; color: #1A365D; }
  .rule-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 4px; }
  .rule-do .rule-label { color: #2C7A7B; }
  .rule-dont .rule-label { color: #E53E3E; }

  /* ─── VOICE & TONE ─── */
  .tone-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }
  .tone-card {
    padding: 16px;
    border-radius: 10px;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
  }
  .tone-card h4 { font-size: 13px; font-weight: 700; color: #1A365D; margin-bottom: 4px; }
  .tone-card p { font-size: 11px; color: #64748B; line-height: 1.7; }

  /* ─── TOC ─── */
  .toc-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 10px 0;
    border-bottom: 1px solid #E2E8F0;
  }
  .toc-item:last-child { border-bottom: none; }
  .toc-number { font-size: 12px; font-weight: 700; color: #2C7A7B; margin-right: 16px; min-width: 24px; }
  .toc-label { font-size: 14px; font-weight: 500; color: #1A365D; flex: 1; }
  .toc-page { font-size: 12px; color: #94A3B8; }

  /* ─── BRAND PILLARS ─── */
  .pillar-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  .pillar-card {
    padding: 16px;
    border-radius: 10px;
    border-top: 4px solid #2C7A7B;
    background: #F8FAFC;
  }
  .pillar-card h4 { font-size: 13px; font-weight: 700; color: #1A365D; margin-bottom: 4px; }
  .pillar-card p { font-size: 10px; color: #64748B; line-height: 1.7; }

  .page-number {
    position: absolute;
    bottom: 36px;
    right: 1in;
    font-size: 10px;
    color: #94A3B8;
  }

  /* Button demos */
  .btn-demo {
    display: inline-flex;
    align-items: center;
    padding: 8px 24px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    margin-right: 10px;
    margin-bottom: 8px;
  }
</style>
</head>
<body>

<!-- PAGE 1: COVER -->
<div class="page cover">
  <div class="cover-content">
    <div class="cover-logo-container">
      <img src="data:image/png;base64,${logoB64}" class="cover-logo" alt="Meridian Neuro" />
    </div>
    <div class="cover-divider"></div>
    <h1>Brand Guidelines</h1>
    <h2>Identity Standards &amp; Usage</h2>
  </div>
  <div class="cover-footer">MERIDIAN NEURO FOUNDATION &bull; 501(c)(3) NONPROFIT &bull; 2025</div>
</div>

<!-- PAGE 2: TOC -->
<div class="page interior">
  <div class="interior-header">
    <img src="data:image/png;base64,${logoB64}" alt="Meridian Neuro" />
    <span>Brand Guidelines</span>
  </div>
  <div class="section-label">Contents</div>
  <div class="section-title">Table of Contents</div>
  <div class="divider"></div>
  <div style="max-width: 420px; margin-top: 32px;">
    <div class="toc-item"><span class="toc-number">01</span><span class="toc-label">Brand Overview</span><span class="toc-page">3</span></div>
    <div class="toc-item"><span class="toc-number">02</span><span class="toc-label">Logo Usage</span><span class="toc-page">4</span></div>
    <div class="toc-item"><span class="toc-number">03</span><span class="toc-label">Color Palette</span><span class="toc-page">5</span></div>
    <div class="toc-item"><span class="toc-number">04</span><span class="toc-label">Typography</span><span class="toc-page">6</span></div>
    <div class="toc-item"><span class="toc-number">05</span><span class="toc-label">Voice &amp; Tone</span><span class="toc-page">7</span></div>
    <div class="toc-item"><span class="toc-number">06</span><span class="toc-label">Imagery &amp; Applications</span><span class="toc-page">8</span></div>
  </div>
  <div class="page-number">2</div>
</div>

<!-- PAGE 3: BRAND OVERVIEW -->
<div class="page interior">
  <div class="interior-header">
    <img src="data:image/png;base64,${logoB64}" alt="Meridian Neuro" />
    <span>01 &mdash; Brand Overview</span>
  </div>
  <div class="section-label">Brand Overview</div>
  <div class="section-title">Setting the Standard.<br>Expanding the Reach.</div>
  <div class="section-subtitle">Meridian Neuro Foundation advances evidence-based neurotherapy through rigorous research, expanded access to care, and grant funding for practitioners and communities in need.</div>
  <div class="divider"></div>

  <div class="content-block">
    <h3>Mission</h3>
    <p>To advance the scientific foundation of neurotherapy while ensuring evidence-based care reaches every community that needs it. We pursue two simultaneous goals: establishing the rigorous research infrastructure the field requires, and removing barriers to access for underserved populations worldwide.</p>
  </div>
  <div class="content-block">
    <h3>Vision</h3>
    <p>A world where neurotherapy is grounded in rigorous science, governed by clear standards, and accessible to every person who could benefit from it.</p>
  </div>

  <div class="pillar-grid">
    <div class="pillar-card">
      <h4>Research &amp; Standards</h4>
      <p>Rigorous scientific protocols, normative databases, and technical specifications that elevate neurotherapy practice worldwide.</p>
    </div>
    <div class="pillar-card">
      <h4>Global Access</h4>
      <p>Scalable, sustainable neurotherapy programs that reach underserved populations through community partnerships.</p>
    </div>
    <div class="pillar-card" style="border-top-color: #D69E2E;">
      <h4>Direct Grants</h4>
      <p>Financial assistance to individuals and organizations, removing financial barriers to neurotherapy treatment.</p>
    </div>
  </div>

  <div class="content-block">
    <h3>Brand Promise</h3>
    <p>Precision and compassion working together. Every initiative pairs scientific rigor with direct human impact.</p>
  </div>
  <div class="content-block">
    <h3>Key Phrases</h3>
    <ul>
      <li><strong>Primary tagline:</strong> "Setting the standard. Expanding the reach."</li>
      <li><strong>Brand statement:</strong> "Precision and compassion working together."</li>
      <li><strong>Mission shorthand:</strong> "Evidence-based neurotherapy for every community."</li>
    </ul>
  </div>
  <div class="page-number">3</div>
</div>

<!-- PAGE 4: LOGO USAGE -->
<div class="page interior">
  <div class="interior-header">
    <img src="data:image/png;base64,${logoB64}" alt="Meridian Neuro" />
    <span>02 &mdash; Logo Usage</span>
  </div>
  <div class="section-label">Logo</div>
  <div class="section-title">Logo Usage</div>
  <div class="section-subtitle">Our logo is the primary visual identifier. It should always be reproduced clearly and given adequate space.</div>
  <div class="divider"></div>

  <h3 style="font-size: 14px; font-weight: 700; color: #1A365D; margin-bottom: 12px;">Primary Logo &amp; Icon</h3>
  <div class="logo-showcase">
    <div>
      <div class="logo-box logo-box-light">
        <img src="data:image/png;base64,${logoB64}" alt="Logo on light" />
      </div>
      <div class="logo-box-label">On Light Backgrounds</div>
    </div>
    <div>
      <div class="logo-box logo-box-dark">
        <div class="logo-container-on-dark">
          <img src="data:image/png;base64,${logoB64}" alt="Logo on dark" style="max-width: 160px;" />
        </div>
      </div>
      <div class="logo-box-label">On Dark (White Container)</div>
    </div>
    <div>
      <div class="logo-box logo-box-teal">
        <div class="logo-container-on-dark">
          <img src="data:image/png;base64,${logoB64}" alt="Logo on teal" style="max-width: 160px;" />
        </div>
      </div>
      <div class="logo-box-label">On Brand Teal</div>
    </div>
    <div>
      <div class="logo-box logo-box-white">
        <img src="data:image/png;base64,${faviconB64}" alt="Favicon" style="max-width: 56px;" />
      </div>
      <div class="logo-box-label">Icon / Favicon</div>
    </div>
  </div>

  <div class="content-block">
    <h3>Clear Space &amp; Minimum Size</h3>
    <p>Maintain clear space equal to the height of the "M" in "Meridian" on all sides. Minimum size: <strong>120px wide</strong> (digital) or <strong>1.5 inches</strong> (print). Use the icon/favicon for sizes below this threshold.</p>
  </div>

  <div class="rules-grid">
    <div class="rule-item rule-do">
      <div class="rule-label">Do</div>
      Use on white, cloud, navy, or teal backgrounds. On dark backgrounds, place the logo in a white rounded container. Maintain proportions at all times.
    </div>
    <div class="rule-item rule-dont">
      <div class="rule-label">Don't</div>
      Stretch, rotate, or distort the logo. Place on busy backgrounds without a container. Add drop shadows, outlines, or gradients. Rearrange elements.
    </div>
    <div class="rule-item rule-do">
      <div class="rule-label">Do</div>
      Use the icon mark for social profiles, app icons, and small-format uses where the full wordmark would be illegible.
    </div>
    <div class="rule-item rule-dont">
      <div class="rule-label">Don't</div>
      Change logo colors. Use low-resolution versions. Place in unapproved colored boxes. Recreate or redraw any part of the logo.
    </div>
  </div>
  <div class="page-number">4</div>
</div>

<!-- PAGE 5: COLOR PALETTE -->
<div class="page interior">
  <div class="interior-header">
    <img src="data:image/png;base64,${logoB64}" alt="Meridian Neuro" />
    <span>03 &mdash; Color Palette</span>
  </div>
  <div class="section-label">Color Palette</div>
  <div class="section-title">Our Colors</div>
  <div class="section-subtitle">Our palette balances authority and trust (navy, teal) with warmth and action (gold). Colors are intentional, not decorative.</div>
  <div class="divider"></div>

  <h3 style="font-size: 13px; font-weight: 700; color: #1A365D; margin-bottom: 10px;">Primary Colors</h3>
  <div class="color-grid-primary">
    <div class="color-swatch">
      <div class="swatch-block" style="background: #1A365D;"></div>
      <div class="swatch-info">
        <div class="swatch-name">Navy</div>
        <div class="swatch-hex">#1A365D</div>
        <div class="swatch-role">Headlines, primary text, authority</div>
      </div>
    </div>
    <div class="color-swatch">
      <div class="swatch-block" style="background: #2C7A7B;"></div>
      <div class="swatch-info">
        <div class="swatch-name">Teal</div>
        <div class="swatch-hex">#2C7A7B</div>
        <div class="swatch-role">Primary brand, CTAs, accents</div>
      </div>
    </div>
  </div>

  <h3 style="font-size: 13px; font-weight: 700; color: #1A365D; margin-bottom: 10px;">Secondary &amp; Accent Colors</h3>
  <div class="color-grid">
    <div class="color-swatch">
      <div class="swatch-block" style="background: #D69E2E;"></div>
      <div class="swatch-info">
        <div class="swatch-name">Gold</div>
        <div class="swatch-hex">#D69E2E</div>
        <div class="swatch-role">Donate CTAs, highlights</div>
      </div>
    </div>
    <div class="color-swatch">
      <div class="swatch-block" style="background: #38B2AC;"></div>
      <div class="swatch-info">
        <div class="swatch-name">Teal Light</div>
        <div class="swatch-hex">#38B2AC</div>
        <div class="swatch-role">Hover states, links</div>
      </div>
    </div>
    <div class="color-swatch">
      <div class="swatch-block" style="background: #C57B57;"></div>
      <div class="swatch-info">
        <div class="swatch-name">Terracotta</div>
        <div class="swatch-hex">#C57B57</div>
        <div class="swatch-role">Warmth, community</div>
      </div>
    </div>
    <div class="color-swatch">
      <div class="swatch-block" style="background: #553C9A;"></div>
      <div class="swatch-info">
        <div class="swatch-name">Purple</div>
        <div class="swatch-hex">#553C9A</div>
        <div class="swatch-role">Innovation, research</div>
      </div>
    </div>
  </div>

  <h3 style="font-size: 13px; font-weight: 700; color: #1A365D; margin-bottom: 10px;">Neutrals</h3>
  <div class="color-grid">
    <div class="color-swatch">
      <div class="swatch-block" style="background: #64748B;"></div>
      <div class="swatch-info">
        <div class="swatch-name">Slate</div>
        <div class="swatch-hex">#64748B</div>
        <div class="swatch-role">Body text</div>
      </div>
    </div>
    <div class="color-swatch">
      <div class="swatch-block" style="background: #F8FAFC; border: 1px solid #E2E8F0;"></div>
      <div class="swatch-info">
        <div class="swatch-name">Cloud</div>
        <div class="swatch-hex">#F8FAFC</div>
        <div class="swatch-role">Section backgrounds</div>
      </div>
    </div>
    <div class="color-swatch">
      <div class="swatch-block" style="background: #FFFFFF; border: 1px solid #E2E8F0;"></div>
      <div class="swatch-info">
        <div class="swatch-name">White</div>
        <div class="swatch-hex">#FFFFFF</div>
        <div class="swatch-role">Primary background</div>
      </div>
    </div>
    <div class="color-swatch">
      <div class="swatch-block" style="background: #E2E8F0;"></div>
      <div class="swatch-info">
        <div class="swatch-name">Border</div>
        <div class="swatch-hex">#E2E8F0</div>
        <div class="swatch-role">Dividers, borders</div>
      </div>
    </div>
  </div>

  <div class="content-block">
    <h3>Usage Ratios</h3>
    <p><strong>60%</strong> Navy + White (foundation) &bull; <strong>25%</strong> Teal (primary accent) &bull; <strong>10%</strong> Gold (high-impact CTAs) &bull; <strong>5%</strong> Terracotta/Purple (thematic emphasis)</p>
  </div>
  <div class="page-number">5</div>
</div>

<!-- PAGE 6: TYPOGRAPHY -->
<div class="page interior">
  <div class="interior-header">
    <img src="data:image/png;base64,${logoB64}" alt="Meridian Neuro" />
    <span>04 &mdash; Typography</span>
  </div>
  <div class="section-label">Typography</div>
  <div class="section-title">Inter Typeface</div>
  <div class="section-subtitle">Inter is our sole typeface, designed for screens. It balances warmth with precision.</div>
  <div class="divider"></div>

  <div class="type-specimen">
    <div class="label">Display / H1</div>
    <div class="sample" style="font-size: 30px; font-weight: 800; line-height: 1.1;">Setting the Standard. Expanding the Reach.</div>
    <div class="meta">Inter 800 &bull; 48-72px &bull; Navy #1A365D &bull; Leading: 1.1</div>
  </div>

  <div class="type-specimen">
    <div class="label">Section Heading / H2</div>
    <div class="sample" style="font-size: 24px; font-weight: 700; line-height: 1.2;">Two missions. One purpose.</div>
    <div class="meta">Inter 700 &bull; 32-40px &bull; Navy #1A365D &bull; Leading: 1.2</div>
  </div>

  <div class="type-specimen">
    <div class="label">Subsection / H3</div>
    <div class="sample" style="font-size: 18px; font-weight: 700; line-height: 1.3;">Precision and compassion working together.</div>
    <div class="meta">Inter 700 &bull; 20-24px &bull; Navy #1A365D &bull; Leading: 1.3</div>
  </div>

  <div class="type-specimen">
    <div class="label">Body Copy</div>
    <div class="sample" style="font-size: 13px; font-weight: 400; line-height: 1.8; color: #64748B;">Meridian Neuro Foundation advances evidence-based neurotherapy through rigorous research, expanded access to care, and grant funding for practitioners and communities in need.</div>
    <div class="meta">Inter 400 &bull; 14-16px &bull; Slate #64748B &bull; Leading: 1.7-1.8</div>
  </div>

  <div class="type-specimen">
    <div class="label">Eyebrow / Label</div>
    <div class="sample" style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; color: #2C7A7B;">Research &amp; Standards</div>
    <div class="meta">Inter 600 &bull; 10-12px &bull; Uppercase &bull; Tracking: 0.2em &bull; Teal #2C7A7B</div>
  </div>

  <h3 style="font-size: 13px; font-weight: 700; color: #1A365D; margin-bottom: 10px; margin-top: 20px;">Font Weights</h3>
  <div class="weight-grid">
    <div class="weight-item">
      <div class="number" style="font-weight: 400;">Aa</div>
      <div class="name">400 Regular</div>
    </div>
    <div class="weight-item">
      <div class="number" style="font-weight: 500;">Aa</div>
      <div class="name">500 Medium</div>
    </div>
    <div class="weight-item">
      <div class="number" style="font-weight: 600;">Aa</div>
      <div class="name">600 Semi</div>
    </div>
    <div class="weight-item">
      <div class="number" style="font-weight: 700;">Aa</div>
      <div class="name">700 Bold</div>
    </div>
    <div class="weight-item">
      <div class="number" style="font-weight: 800;">Aa</div>
      <div class="name">800 Extra</div>
    </div>
  </div>
  <div class="page-number">6</div>
</div>

<!-- PAGE 7: VOICE & TONE -->
<div class="page interior">
  <div class="interior-header">
    <img src="data:image/png;base64,${logoB64}" alt="Meridian Neuro" />
    <span>05 &mdash; Voice &amp; Tone</span>
  </div>
  <div class="section-label">Voice &amp; Tone</div>
  <div class="section-title">How We Communicate</div>
  <div class="section-subtitle">Our voice balances scientific authority with genuine human warmth. We are credible, compassionate, and clear.</div>
  <div class="divider"></div>

  <div class="tone-grid">
    <div class="tone-card">
      <h4>Authoritative, Not Academic</h4>
      <p>We speak with confidence grounded in evidence. We avoid jargon and make complex neuroscience accessible.</p>
    </div>
    <div class="tone-card">
      <h4>Compassionate, Not Sentimental</h4>
      <p>We care deeply about the people we serve. We express that care through action, not emotional appeals.</p>
    </div>
    <div class="tone-card">
      <h4>Direct, Not Blunt</h4>
      <p>We value the reader's time. We lead with what matters, explain what's needed, and move forward.</p>
    </div>
    <div class="tone-card">
      <h4>Hopeful, Not Hyperbolic</h4>
      <p>We express belief through measurable goals and evidence-based optimism, not grandiose promises.</p>
    </div>
  </div>

  <h3 style="font-size: 13px; font-weight: 700; color: #1A365D; margin-bottom: 10px;">Writing Examples</h3>
  <div class="rules-grid">
    <div class="rule-item rule-do">
      <div class="rule-label">Do</div>
      "We fund research that creates normative databases, evidence-based clinical protocols, and technical specifications."
    </div>
    <div class="rule-item rule-dont">
      <div class="rule-label">Don't</div>
      "We're revolutionizing the entire field of neurotherapy and changing millions of lives with our groundbreaking research."
    </div>
    <div class="rule-item rule-do">
      <div class="rule-label">Do</div>
      "Neurotherapy has transformative potential, but the field lacks the scientific infrastructure it needs."
    </div>
    <div class="rule-item rule-dont">
      <div class="rule-label">Don't</div>
      "Millions of people are suffering because they can't access the neurotherapy care they desperately need."
    </div>
  </div>
  <div class="page-number">7</div>
</div>

<!-- PAGE 8: IMAGERY & APPLICATIONS -->
<div class="page interior">
  <div class="interior-header">
    <img src="data:image/png;base64,${logoB64}" alt="Meridian Neuro" />
    <span>06 &mdash; Imagery &amp; Applications</span>
  </div>
  <div class="section-label">Applications</div>
  <div class="section-title">Imagery &amp; Digital Standards</div>
  <div class="section-subtitle">Guidelines for photography, UI components, and consistent brand application across all touchpoints.</div>
  <div class="divider"></div>

  <div class="content-block">
    <h3>Photography Direction</h3>
    <p>Authentic, unstaged imagery with natural light and diverse representation. Prioritize genuine moments over posed shots. Apply brand-colored overlays (navy at 60-70% opacity) for hero images. Use rounded corners (16px) for inline photos.</p>
  </div>

  <div class="tone-grid">
    <div class="tone-card">
      <h4>Research &amp; Clinical</h4>
      <p>Modern clinical environments, professional settings, technology and equipment. Cool tones preferred.</p>
    </div>
    <div class="tone-card">
      <h4>Community &amp; Access</h4>
      <p>Diverse communities, genuine interactions, connection and care. Warm, natural tones.</p>
    </div>
  </div>

  <div class="content-block">
    <h3>Button Styles</h3>
    <div style="margin-top: 10px;">
      <span class="btn-demo" style="background: #D69E2E; color: white;">Donate</span>
      <span class="btn-demo" style="background: #2C7A7B; color: white;">Learn More</span>
      <span class="btn-demo" style="border: 2px solid #2C7A7B; color: #2C7A7B;">Secondary</span>
    </div>
    <p style="margin-top: 8px; font-size: 11px; color: #64748B;"><strong>Gold</strong> = donate only. <strong>Teal</strong> = primary actions. <strong>Outline</strong> = secondary. All buttons: rounded-full, min 44px height on mobile.</p>
  </div>

  <div class="content-block">
    <h3>Layout Standards</h3>
    <ul>
      <li><strong>Container:</strong> Max-width 1280px, 24px padding (mobile), 48px (desktop)</li>
      <li><strong>Section spacing:</strong> 96px vertical padding standard</li>
      <li><strong>Alternating backgrounds:</strong> White and Cloud (#F8FAFC) for rhythm</li>
      <li><strong>Dark sections:</strong> Navy for stats, Teal for CTAs</li>
      <li><strong>Cards:</strong> 16px rounded corners, cloud background, teal top-border accent</li>
    </ul>
  </div>

  <div class="content-block">
    <h3>Graphic Elements</h3>
    <p>Meridian line motifs (thin curved SVG paths, 6% opacity in teal) as subtle background decorations. Always behind content, never competing for attention.</p>
  </div>

  <div class="content-block">
    <h3>Social Media</h3>
    <p>Use the icon mark as the profile picture. Cover images use the navy-to-teal gradient with the white-container logo. Maintain brand palette in all social graphics.</p>
  </div>
  <div class="page-number">8</div>
</div>

</body>
</html>`;

async function generatePDF() {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });

  const outputPath = path.join(projectRoot, "public", "Meridian-Neuro-Brand-Guidelines.pdf");

  await page.pdf({
    path: outputPath,
    format: "Letter",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });

  await browser.close();
  console.log("PDF generated:", outputPath);
}

// ═══════════════════════════════════════════
// DOCX GENERATION
// ═══════════════════════════════════════════

const NAVY        = "1A365D";
const TEAL        = "2C7A7B";
const GOLD        = "D69E2E";
const SLATE       = "64748B";
const LIGHT_GRAY  = "94A3B8";
const TEAL_LIGHT  = "38B2AC";
const TERRACOTTA  = "C57B57";
const PURPLE      = "553C9A";
const CLOUD       = "F8FAFC";
const BORDER_CLR  = "E2E8F0";
const RED_CLR     = "E53E3E";
const GREEN_BG    = "F0FFF4";
const RED_BG      = "FFF5F5";
const WHITE       = "FFFFFF";

// ── Shared border helpers ─────────────────────────────────────────────────────

function noBorder() {
  return { style: BorderStyle.NONE, size: 0, color: WHITE };
}

function thinBorder(color = BORDER_CLR) {
  return { style: BorderStyle.SINGLE, size: 4, color };
}

function allNoBorders() {
  return { top: noBorder(), bottom: noBorder(), left: noBorder(), right: noBorder() };
}

// ── Paragraph helpers ─────────────────────────────────────────────────────────

function body(text) {
  return new Paragraph({
    children: [new TextRun({ text, color: SLATE, font: "Inter", size: 22 })],
    spacing: { after: 120 },
    line: 360,
    lineRule: "auto",
  });
}

function sectionLabel(text) {
  return new Paragraph({
    children: [new TextRun({ text: text.toUpperCase(), color: TEAL, font: "Inter", size: 18, bold: true })],
    spacing: { before: 0, after: 80 },
  });
}

function sectionTitle(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Inter", size: 52, bold: true, color: NAVY })],
    spacing: { after: 100 },
  });
}

function sectionSubtitle(text) {
  return new Paragraph({
    children: [new TextRun({ text, color: SLATE, font: "Inter", size: 22 })],
    spacing: { after: 160 },
    line: 360,
    lineRule: "auto",
  });
}

function dividerPara() {
  return new Paragraph({
    children: [new TextRun({ text: "\u2014\u2014\u2014\u2014\u2014", color: GOLD, font: "Inter", size: 24, bold: true })],
    spacing: { after: 240 },
  });
}

function subHeading(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Inter", size: 26, bold: true, color: NAVY })],
    spacing: { before: 240, after: 80 },
  });
}

function interiorPageHeader(pageLabel) {
  // Header bar: logo left, section label right — rendered as a 2-col table
  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new ImageRun({ data: logoBuffer, transformation: { width: 144, height: 62 }, type: "png" })],
                spacing: { before: 0, after: 0 },
              }),
            ],
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: { top: noBorder(), bottom: thinBorder(TEAL), left: noBorder(), right: noBorder() },
            margins: { top: 0, bottom: 60 },
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: pageLabel.toUpperCase(), color: SLATE, font: "Inter", size: 16 })],
                alignment: AlignmentType.RIGHT,
                spacing: { before: 0, after: 0 },
              }),
            ],
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: { top: noBorder(), bottom: thinBorder(TEAL), left: noBorder(), right: noBorder() },
            verticalAlign: "bottom",
            margins: { top: 0, bottom: 60 },
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { bottom: 360 },
  });
}

// ── Color swatch helpers ──────────────────────────────────────────────────────

// Full-width swatch row: large color block left, info right
function colorSwatchRow(name, hex, role, swatchWidthPct = 20, tall = false) {
  const hexClean = hex.replace("#", "");
  const swatchH = tall ? 3 : 2; // paragraphs of padding
  const swatchParas = [];
  for (let i = 0; i < swatchH; i++) swatchParas.push(new Paragraph({ children: [new TextRun({ text: " " })], spacing: { after: 0 } }));

  return new TableRow({
    children: [
      new TableCell({
        children: swatchParas,
        width: { size: swatchWidthPct, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, fill: hexClean },
        borders: allNoBorders(),
        margins: { top: 80, bottom: 80, left: 0, right: 0 },
      }),
      new TableCell({
        children: [
          new Paragraph({
            children: [new TextRun({ text: name, bold: true, color: NAVY, font: "Inter", size: 22 })],
            spacing: { before: 60, after: 20 },
          }),
          new Paragraph({
            children: [new TextRun({ text: hex, color: TEAL, font: "Courier New", size: 20 })],
            spacing: { after: 20 },
          }),
          new Paragraph({
            children: [new TextRun({ text: role, color: LIGHT_GRAY, font: "Inter", size: 18 })],
            spacing: { after: 60 },
          }),
        ],
        width: { size: 100 - swatchWidthPct, type: WidthType.PERCENTAGE },
        borders: { top: noBorder(), bottom: thinBorder(BORDER_CLR), left: noBorder(), right: noBorder() },
        margins: { left: 160, top: 0, bottom: 0, right: 120 },
        verticalAlign: "center",
      }),
    ],
  });
}

// 4-column color grid table (used for secondary & neutrals)
function colorGridTable(colors) {
  // colors = [{name, hex, role}, ...]
  // Pad to multiple of 4
  while (colors.length % 4 !== 0) colors.push(null);
  const rows = [];
  for (let i = 0; i < colors.length; i += 4) {
    const swatchRow = new TableRow({
      children: [0, 1, 2, 3].map(j => {
        const c = colors[i + j];
        return new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: " " })], spacing: { after: 0 } })],
          shading: c ? { type: ShadingType.CLEAR, fill: c.hex.replace("#", "") } : { type: ShadingType.CLEAR, fill: WHITE },
          borders: allNoBorders(),
          margins: { top: 100, bottom: 100, left: 0, right: 0 },
          width: { size: 25, type: WidthType.PERCENTAGE },
        });
      }),
    });
    const infoRow = new TableRow({
      children: [0, 1, 2, 3].map(j => {
        const c = colors[i + j];
        return new TableCell({
          children: c ? [
            new Paragraph({ children: [new TextRun({ text: c.name, bold: true, color: NAVY, font: "Inter", size: 18 })], spacing: { before: 40, after: 20 } }),
            new Paragraph({ children: [new TextRun({ text: c.hex, color: TEAL, font: "Courier New", size: 16 })], spacing: { after: 20 } }),
            new Paragraph({ children: [new TextRun({ text: c.role, color: LIGHT_GRAY, font: "Inter", size: 16 })], spacing: { after: 60 } }),
          ] : [new Paragraph({ children: [new TextRun({ text: "" })] })],
          borders: allNoBorders(),
          margins: { top: 0, bottom: 0, left: 60, right: 60 },
          width: { size: 25, type: WidthType.PERCENTAGE },
        });
      }),
    });
    rows.push(swatchRow, infoRow);
  }
  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { bottom: 200 },
  });
}

// ── Shaded card table (tone cards, pillar cards) ──────────────────────────────

function shadedCardTable(cards, columns = 2) {
  // cards = [{title, body}]
  while (cards.length % columns !== 0) cards.push(null);
  const rows = [];
  for (let i = 0; i < cards.length; i += columns) {
    rows.push(new TableRow({
      children: Array.from({ length: columns }, (_, j) => {
        const c = cards[i + j];
        return new TableCell({
          children: c ? [
            new Paragraph({
              children: [new TextRun({ text: c.title, bold: true, color: NAVY, font: "Inter", size: 22 })],
              spacing: { before: 100, after: 60 },
            }),
            new Paragraph({
              children: [new TextRun({ text: c.body, color: SLATE, font: "Inter", size: 20 })],
              spacing: { after: 100 },
              line: 340,
              lineRule: "auto",
            }),
          ] : [new Paragraph({ children: [new TextRun({ text: "" })] })],
          shading: { type: ShadingType.CLEAR, fill: CLOUD },
          borders: {
            top: thinBorder(BORDER_CLR),
            bottom: thinBorder(BORDER_CLR),
            left: thinBorder(BORDER_CLR),
            right: thinBorder(BORDER_CLR),
          },
          margins: { top: 80, bottom: 80, left: 160, right: 160 },
          width: { size: Math.floor(100 / columns), type: WidthType.PERCENTAGE },
        });
      }),
    }));
  }
  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { bottom: 200 },
  });
}

// ── Pillar cards (with teal top border accent) ────────────────────────────────

function pillarCardTable(pillars) {
  // Render as a 3-col table
  return new Table({
    rows: [
      new TableRow({
        children: pillars.map((p, idx) => new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: p.title, bold: true, color: NAVY, font: "Inter", size: 22 })],
              spacing: { before: 100, after: 60 },
            }),
            new Paragraph({
              children: [new TextRun({ text: p.body, color: SLATE, font: "Inter", size: 20 })],
              spacing: { after: 100 },
              line: 340,
              lineRule: "auto",
            }),
          ],
          shading: { type: ShadingType.CLEAR, fill: CLOUD },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 12, color: idx === 2 ? GOLD : TEAL },
            bottom: thinBorder(BORDER_CLR),
            left: thinBorder(BORDER_CLR),
            right: thinBorder(BORDER_CLR),
          },
          margins: { top: 100, bottom: 100, left: 160, right: 160 },
          width: { size: 33, type: WidthType.PERCENTAGE },
        })),
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { bottom: 200 },
  });
}

// ── Do / Don't rule table ─────────────────────────────────────────────────────

function ruleTable(rules) {
  // rules = [{do: "...", dont: "..."}]
  const rows = [];
  for (const rule of rules) {
    rows.push(new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: "DO", bold: true, color: TEAL, font: "Inter", size: 18 })],
              spacing: { before: 80, after: 60 },
            }),
            new Paragraph({
              children: [new TextRun({ text: rule.do, color: NAVY, font: "Inter", size: 20 })],
              spacing: { after: 80 },
              line: 340,
              lineRule: "auto",
            }),
          ],
          shading: { type: ShadingType.CLEAR, fill: GREEN_BG },
          borders: {
            top: noBorder(),
            bottom: noBorder(),
            right: noBorder(),
            left: { style: BorderStyle.SINGLE, size: 16, color: TEAL },
          },
          margins: { top: 60, bottom: 60, left: 160, right: 120 },
          width: { size: 50, type: WidthType.PERCENTAGE },
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: "DON'T", bold: true, color: RED_CLR, font: "Inter", size: 18 })],
              spacing: { before: 80, after: 60 },
            }),
            new Paragraph({
              children: [new TextRun({ text: rule.dont, color: NAVY, font: "Inter", size: 20 })],
              spacing: { after: 80 },
              line: 340,
              lineRule: "auto",
            }),
          ],
          shading: { type: ShadingType.CLEAR, fill: RED_BG },
          borders: {
            top: noBorder(),
            bottom: noBorder(),
            right: noBorder(),
            left: { style: BorderStyle.SINGLE, size: 16, color: RED_CLR },
          },
          margins: { top: 60, bottom: 60, left: 160, right: 120 },
          width: { size: 50, type: WidthType.PERCENTAGE },
        }),
      ],
    }));
    // spacer row
    rows.push(new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "" })] })], borders: allNoBorders(), width: { size: 50, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "" })] })], borders: allNoBorders(), width: { size: 50, type: WidthType.PERCENTAGE } }),
      ],
    }));
  }
  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { bottom: 200 },
  });
}

// ── Typography specimen table ─────────────────────────────────────────────────

function typeSpecimenTable(label, sample, meta, sampleRun) {
  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: label, color: TEAL, font: "Inter", size: 18, bold: true })],
                spacing: { before: 80, after: 60 },
              }),
              new Paragraph({
                children: [sampleRun],
                spacing: { after: 60 },
              }),
              new Paragraph({
                children: [new TextRun({ text: meta, color: LIGHT_GRAY, font: "Inter", size: 18 })],
                spacing: { after: 80 },
              }),
            ],
            shading: { type: ShadingType.CLEAR, fill: CLOUD },
            borders: {
              top: thinBorder(BORDER_CLR),
              bottom: thinBorder(BORDER_CLR),
              left: thinBorder(BORDER_CLR),
              right: thinBorder(BORDER_CLR),
            },
            margins: { top: 80, bottom: 80, left: 180, right: 180 },
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { bottom: 160 },
  });
}

// ── Logo showcase box ─────────────────────────────────────────────────────────

function logoBox(imageBuffer, bgFill, caption, isSmall = false) {
  const w = isSmall ? 60 : 200;
  const h = isSmall ? 62 : 86;
  return new TableCell({
    children: [
      new Paragraph({
        children: [new ImageRun({ data: imageBuffer, transformation: { width: w, height: h }, type: "png" })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 80 },
      }),
      new Paragraph({
        children: [new TextRun({ text: caption, color: LIGHT_GRAY, font: "Inter", size: 16 })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
      }),
    ],
    shading: { type: ShadingType.CLEAR, fill: bgFill },
    borders: {
      top: thinBorder(BORDER_CLR),
      bottom: thinBorder(BORDER_CLR),
      left: thinBorder(BORDER_CLR),
      right: thinBorder(BORDER_CLR),
    },
    margins: { top: 0, bottom: 0, left: 80, right: 80 },
    width: { size: 25, type: WidthType.PERCENTAGE },
  });
}

// ── TOC item row ──────────────────────────────────────────────────────────────

function tocRow(num, title, page) {
  return new TableRow({
    children: [
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: num, bold: true, color: TEAL, font: "Inter", size: 22 })], spacing: { before: 80, after: 80 } })],
        width: { size: 8, type: WidthType.PERCENTAGE },
        borders: { top: noBorder(), bottom: thinBorder(BORDER_CLR), left: noBorder(), right: noBorder() },
        margins: { left: 0, right: 120 },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: title, color: NAVY, font: "Inter", size: 22 })], spacing: { before: 80, after: 80 } })],
        width: { size: 80, type: WidthType.PERCENTAGE },
        borders: { top: noBorder(), bottom: thinBorder(BORDER_CLR), left: noBorder(), right: noBorder() },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: String(page), color: LIGHT_GRAY, font: "Inter", size: 22 })], alignment: AlignmentType.RIGHT, spacing: { before: 80, after: 80 } })],
        width: { size: 12, type: WidthType.PERCENTAGE },
        borders: { top: noBorder(), bottom: thinBorder(BORDER_CLR), left: noBorder(), right: noBorder() },
      }),
    ],
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN DOCX GENERATOR
// ─────────────────────────────────────────────────────────────────────────────

async function generateDOCX() {
  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: "Inter", color: NAVY } },
        heading1: { run: { font: "Inter", size: 56, bold: true, color: NAVY }, paragraph: { spacing: { before: 0, after: 120 } } },
        heading2: { run: { font: "Inter", size: 36, bold: true, color: NAVY }, paragraph: { spacing: { before: 300, after: 100 } } },
        heading3: { run: { font: "Inter", size: 28, bold: true, color: NAVY }, paragraph: { spacing: { before: 240, after: 80 } } },
      },
    },
    sections: [

      // ── PAGE 1: COVER ──────────────────────────────────────────────────────
      {
        properties: { page: { margin: { top: 0, bottom: 0, left: 0, right: 0 } } },
        children: [
          // Full-page shaded cover using a single-cell table that fills the page
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      // Top spacer
                      new Paragraph({ children: [new TextRun({ text: "" })], spacing: { before: 2000, after: 0 } }),
                      // Logo in white container cell
                      new Table({
                        rows: [new TableRow({
                          children: [new TableCell({
                            children: [
                              new Paragraph({
                                children: [new ImageRun({ data: logoBuffer, transformation: { width: 340, height: 146 }, type: "png" })],
                                alignment: AlignmentType.CENTER,
                                spacing: { before: 120, after: 120 },
                              }),
                            ],
                            shading: { type: ShadingType.CLEAR, fill: WHITE },
                            borders: allNoBorders(),
                            margins: { top: 80, bottom: 80, left: 240, right: 240 },
                            width: { size: 100, type: WidthType.PERCENTAGE },
                          })],
                        })],
                        width: { size: 60, type: WidthType.PERCENTAGE },
                        float: { horizontalAnchor: "text", verticalAnchor: "text", absoluteHorizontalPosition: 0, absoluteVerticalPosition: 0 },
                      }),
                      new Paragraph({
                        children: [new TextRun({ text: "" })],
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 300 },
                      }),
                      // Gold divider
                      new Paragraph({
                        children: [new TextRun({ text: "\u2014\u2014\u2014\u2014\u2014\u2014", color: GOLD, size: 28, bold: true })],
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 300, after: 300 },
                      }),
                      // Brand Guidelines title
                      new Paragraph({
                        children: [new TextRun({ text: "Brand Guidelines", font: "Inter", size: 88, bold: true, color: WHITE })],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 160 },
                      }),
                      // Subtitle
                      new Paragraph({
                        children: [new TextRun({ text: "IDENTITY STANDARDS & USAGE", font: "Inter", size: 24, color: "CCDDEE" })],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 800 },
                      }),
                      // Footer text
                      new Paragraph({
                        children: [new TextRun({ text: "MERIDIAN NEURO FOUNDATION  \u2022  501(c)(3) NONPROFIT  \u2022  2025", font: "Inter", size: 18, color: "7FA0C0" })],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 1200 },
                      }),
                    ],
                    shading: { type: ShadingType.CLEAR, fill: NAVY },
                    borders: allNoBorders(),
                    margins: { top: 0, bottom: 0, left: 1440, right: 1440 },
                    width: { size: 100, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
        ],
      },

      // ── PAGE 2: TABLE OF CONTENTS ──────────────────────────────────────────
      {
        properties: { page: { margin: { top: 1080, bottom: 1080, left: 1440, right: 1440 } } },
        children: [
          interiorPageHeader("Brand Guidelines"),
          new Paragraph({ children: [new TextRun({ text: "" })], spacing: { after: 80 } }),
          sectionLabel("Contents"),
          sectionTitle("Table of Contents"),
          dividerPara(),
          new Table({
            rows: [
              tocRow("01", "Brand Overview", 3),
              tocRow("02", "Logo Usage", 4),
              tocRow("03", "Color Palette", 5),
              tocRow("04", "Typography", 6),
              tocRow("05", "Voice & Tone", 7),
              tocRow("06", "Imagery & Applications", 8),
            ],
            width: { size: 70, type: WidthType.PERCENTAGE },
            margins: { top: 0 },
          }),
        ],
      },

      // ── PAGE 3: BRAND OVERVIEW ─────────────────────────────────────────────
      {
        properties: { page: { margin: { top: 1080, bottom: 1080, left: 1440, right: 1440 } } },
        children: [
          interiorPageHeader("01 — Brand Overview"),
          new Paragraph({ children: [new TextRun({ text: "" })], spacing: { after: 80 } }),
          sectionLabel("Brand Overview"),
          sectionTitle("Setting the Standard.\nExpanding the Reach."),
          sectionSubtitle("Meridian Neuro Foundation advances evidence-based neurotherapy through rigorous research, expanded access to care, and grant funding for practitioners and communities in need."),
          dividerPara(),

          subHeading("Mission"),
          body("To advance the scientific foundation of neurotherapy while ensuring evidence-based care reaches every community that needs it. We pursue two simultaneous goals: establishing the rigorous research infrastructure the field requires, and removing barriers to access for underserved populations worldwide."),

          subHeading("Vision"),
          body("A world where neurotherapy is grounded in rigorous science, governed by clear standards, and accessible to every person who could benefit from it."),

          subHeading("Brand Pillars"),
          pillarCardTable([
            { title: "Research & Standards", body: "Rigorous scientific protocols, normative databases, and technical specifications that elevate neurotherapy practice worldwide." },
            { title: "Global Access", body: "Scalable, sustainable neurotherapy programs that reach underserved populations through community partnerships." },
            { title: "Direct Grants", body: "Financial assistance to individuals and organizations, removing financial barriers to neurotherapy treatment." },
          ]),

          subHeading("Brand Promise"),
          body("Precision and compassion working together. Every initiative pairs scientific rigor with direct human impact."),

          subHeading("Key Phrases"),
          new Paragraph({
            children: [
              new TextRun({ text: "Primary tagline:  ", bold: true, color: NAVY, font: "Inter", size: 22 }),
              new TextRun({ text: "\u201CSetting the standard. Expanding the reach.\u201D", color: SLATE, font: "Inter", size: 22 }),
            ],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Brand statement:  ", bold: true, color: NAVY, font: "Inter", size: 22 }),
              new TextRun({ text: "\u201CPrecision and compassion working together.\u201D", color: SLATE, font: "Inter", size: 22 }),
            ],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Mission shorthand:  ", bold: true, color: NAVY, font: "Inter", size: 22 }),
              new TextRun({ text: "\u201CEvidence-based neurotherapy for every community.\u201D", color: SLATE, font: "Inter", size: 22 }),
            ],
            spacing: { after: 60 },
          }),
        ],
      },

      // ── PAGE 4: LOGO USAGE ─────────────────────────────────────────────────
      {
        properties: { page: { margin: { top: 1080, bottom: 1080, left: 1440, right: 1440 } } },
        children: [
          interiorPageHeader("02 — Logo Usage"),
          new Paragraph({ children: [new TextRun({ text: "" })], spacing: { after: 80 } }),
          sectionLabel("Logo"),
          sectionTitle("Logo Usage"),
          sectionSubtitle("Our logo is the primary visual identifier. It should always be reproduced clearly and given adequate space."),
          dividerPara(),

          subHeading("Primary Logo & Icon"),
          // 4-col logo showcase grid
          new Table({
            rows: [
              new TableRow({
                children: [
                  logoBox(logoBuffer, CLOUD, "On Light Backgrounds"),
                  logoBox(logoBuffer, NAVY, "On Dark (White Container)"),
                  logoBox(logoBuffer, TEAL, "On Brand Teal"),
                  logoBox(faviconBuffer, WHITE, "Icon / Favicon", true),
                ],
              }),
            ],
            width: { size: 100, type: WidthType.PERCENTAGE },
            margins: { bottom: 240 },
          }),

          subHeading("Clear Space & Minimum Size"),
          body("Maintain clear space equal to the height of the \u201CM\u201D in \u201CMeridian\u201D on all sides. Minimum size: 120px wide (digital) or 1.5 inches (print). Use the icon/favicon for sizes below this threshold."),

          subHeading("Usage Rules"),
          ruleTable([
            {
              do: "Use on white, cloud, navy, or teal backgrounds. On dark backgrounds, place the logo in a white rounded container. Maintain proportions at all times.",
              dont: "Stretch, rotate, or distort the logo. Place on busy backgrounds without a container. Add drop shadows, outlines, or gradients. Rearrange elements.",
            },
            {
              do: "Use the icon mark for social profiles, app icons, and small-format uses where the full wordmark would be illegible.",
              dont: "Change logo colors. Use low-resolution versions. Place in unapproved colored boxes. Recreate or redraw any part of the logo.",
            },
          ]),
        ],
      },

      // ── PAGE 5: COLOR PALETTE ──────────────────────────────────────────────
      {
        properties: { page: { margin: { top: 1080, bottom: 1080, left: 1440, right: 1440 } } },
        children: [
          interiorPageHeader("03 — Color Palette"),
          new Paragraph({ children: [new TextRun({ text: "" })], spacing: { after: 80 } }),
          sectionLabel("Color Palette"),
          sectionTitle("Our Colors"),
          sectionSubtitle("Our palette balances authority and trust (navy, teal) with warmth and action (gold). Colors are intentional, not decorative."),
          dividerPara(),

          subHeading("Primary Colors"),
          // 2-col primary swatches — taller blocks
          new Table({
            rows: [
              colorSwatchRow("Navy", "#1A365D", "Headlines, primary text, authority", 30, true),
              colorSwatchRow("Teal", "#2C7A7B", "Primary brand, CTAs, accents", 30, true),
            ],
            width: { size: 100, type: WidthType.PERCENTAGE },
            margins: { bottom: 240 },
          }),

          subHeading("Secondary & Accent Colors"),
          colorGridTable([
            { name: "Gold",        hex: "#D69E2E", role: "Donate CTAs, highlights" },
            { name: "Teal Light",  hex: "#38B2AC", role: "Hover states, links" },
            { name: "Terracotta",  hex: "#C57B57", role: "Warmth, community" },
            { name: "Purple",      hex: "#553C9A", role: "Innovation, research" },
          ]),

          subHeading("Neutrals"),
          colorGridTable([
            { name: "Slate",  hex: "#64748B", role: "Body text" },
            { name: "Cloud",  hex: "#F8FAFC", role: "Section backgrounds" },
            { name: "White",  hex: "#FFFFFF", role: "Primary background" },
            { name: "Border", hex: "#E2E8F0", role: "Dividers, borders" },
          ]),

          subHeading("Usage Ratios"),
          body("60% Navy + White (foundation)  \u2022  25% Teal (primary accent)  \u2022  10% Gold (high-impact CTAs)  \u2022  5% Terracotta/Purple (thematic emphasis)"),
        ],
      },

      // ── PAGE 6: TYPOGRAPHY ─────────────────────────────────────────────────
      {
        properties: { page: { margin: { top: 1080, bottom: 1080, left: 1440, right: 1440 } } },
        children: [
          interiorPageHeader("04 — Typography"),
          new Paragraph({ children: [new TextRun({ text: "" })], spacing: { after: 80 } }),
          sectionLabel("Typography"),
          sectionTitle("Inter Typeface"),
          sectionSubtitle("Inter is our sole typeface, designed for screens. It balances warmth with precision."),
          dividerPara(),

          typeSpecimenTable(
            "DISPLAY / H1",
            "Setting the Standard. Expanding the Reach.",
            "Inter 800  \u2022  48\u201372px  \u2022  Navy #1A365D  \u2022  Leading: 1.1",
            new TextRun({ text: "Setting the Standard. Expanding the Reach.", font: "Inter", size: 52, bold: true, color: NAVY }),
          ),
          typeSpecimenTable(
            "SECTION HEADING / H2",
            "Two missions. One purpose.",
            "Inter 700  \u2022  32\u201340px  \u2022  Navy #1A365D  \u2022  Leading: 1.2",
            new TextRun({ text: "Two missions. One purpose.", font: "Inter", size: 40, bold: true, color: NAVY }),
          ),
          typeSpecimenTable(
            "SUBSECTION / H3",
            "Precision and compassion working together.",
            "Inter 700  \u2022  20\u201324px  \u2022  Navy #1A365D  \u2022  Leading: 1.3",
            new TextRun({ text: "Precision and compassion working together.", font: "Inter", size: 28, bold: true, color: NAVY }),
          ),
          typeSpecimenTable(
            "BODY COPY",
            "Meridian Neuro Foundation advances evidence-based neurotherapy through rigorous research, expanded access to care, and grant funding for practitioners and communities in need.",
            "Inter 400  \u2022  14\u201316px  \u2022  Slate #64748B  \u2022  Leading: 1.7\u20131.8",
            new TextRun({ text: "Meridian Neuro Foundation advances evidence-based neurotherapy through rigorous research, expanded access to care, and grant funding for practitioners and communities in need.", font: "Inter", size: 22, color: SLATE }),
          ),
          typeSpecimenTable(
            "EYEBROW / LABEL",
            "RESEARCH & STANDARDS",
            "Inter 600  \u2022  10\u201312px  \u2022  Uppercase  \u2022  Tracking: 0.2em  \u2022  Teal #2C7A7B",
            new TextRun({ text: "RESEARCH & STANDARDS", font: "Inter", size: 20, bold: true, color: TEAL }),
          ),

          subHeading("Font Weights"),
          // Weight grid as a 5-col table
          new Table({
            rows: [
              new TableRow({
                children: [
                  { weight: 400, label: "400 Regular" },
                  { weight: 500, label: "500 Medium" },
                  { weight: 600, label: "600 Semi" },
                  { weight: 700, label: "700 Bold" },
                  { weight: 800, label: "800 Extra" },
                ].map(w => new TableCell({
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: "Aa", font: "Inter", size: 44, bold: w.weight >= 700, color: NAVY })],
                      alignment: AlignmentType.CENTER,
                      spacing: { before: 80, after: 40 },
                    }),
                    new Paragraph({
                      children: [new TextRun({ text: w.label, font: "Inter", size: 16, color: SLATE })],
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 80 },
                    }),
                  ],
                  shading: { type: ShadingType.CLEAR, fill: CLOUD },
                  borders: {
                    top: thinBorder(BORDER_CLR),
                    bottom: thinBorder(BORDER_CLR),
                    left: thinBorder(BORDER_CLR),
                    right: thinBorder(BORDER_CLR),
                  },
                  margins: { top: 0, bottom: 0, left: 80, right: 80 },
                  width: { size: 20, type: WidthType.PERCENTAGE },
                })),
              }),
            ],
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
        ],
      },

      // ── PAGE 7: VOICE & TONE ───────────────────────────────────────────────
      {
        properties: { page: { margin: { top: 1080, bottom: 1080, left: 1440, right: 1440 } } },
        children: [
          interiorPageHeader("05 — Voice & Tone"),
          new Paragraph({ children: [new TextRun({ text: "" })], spacing: { after: 80 } }),
          sectionLabel("Voice & Tone"),
          sectionTitle("How We Communicate"),
          sectionSubtitle("Our voice balances scientific authority with genuine human warmth. We are credible, compassionate, and clear."),
          dividerPara(),

          shadedCardTable([
            { title: "Authoritative, Not Academic", body: "We speak with confidence grounded in evidence. We avoid jargon and make complex neuroscience accessible." },
            { title: "Compassionate, Not Sentimental", body: "We care deeply about the people we serve. We express that care through action, not emotional appeals." },
            { title: "Direct, Not Blunt", body: "We value the reader\u2019s time. We lead with what matters, explain what\u2019s needed, and move forward." },
            { title: "Hopeful, Not Hyperbolic", body: "We express belief through measurable goals and evidence-based optimism, not grandiose promises." },
          ], 2),

          subHeading("Writing Examples"),
          ruleTable([
            {
              do: "\u201CWe fund research that creates normative databases, evidence-based clinical protocols, and technical specifications.\u201D",
              dont: "\u201CWe\u2019re revolutionizing the entire field of neurotherapy and changing millions of lives with our groundbreaking research.\u201D",
            },
            {
              do: "\u201CNeurotherapy has transformative potential, but the field lacks the scientific infrastructure it needs.\u201D",
              dont: "\u201CMillions of people are suffering because they can\u2019t access the neurotherapy care they desperately need.\u201D",
            },
          ]),
        ],
      },

      // ── PAGE 8: IMAGERY & APPLICATIONS ────────────────────────────────────
      {
        properties: { page: { margin: { top: 1080, bottom: 1080, left: 1440, right: 1440 } } },
        children: [
          interiorPageHeader("06 — Imagery & Applications"),
          new Paragraph({ children: [new TextRun({ text: "" })], spacing: { after: 80 } }),
          sectionLabel("Applications"),
          sectionTitle("Imagery & Digital Standards"),
          sectionSubtitle("Guidelines for photography, UI components, and consistent brand application across all touchpoints."),
          dividerPara(),

          subHeading("Photography Direction"),
          body("Authentic, unstaged imagery with natural light and diverse representation. Prioritize genuine moments over posed shots. Apply brand-colored overlays (navy at 60\u201370% opacity) for hero images. Use rounded corners (16px) for inline photos."),

          shadedCardTable([
            { title: "Research & Clinical", body: "Modern clinical environments, professional settings, technology and equipment. Cool tones preferred." },
            { title: "Community & Access", body: "Diverse communities, genuine interactions, connection and care. Warm, natural tones." },
          ], 2),

          subHeading("Button Styles"),
          // Button style table
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Donate", font: "Inter", size: 22, bold: true, color: WHITE })], alignment: AlignmentType.CENTER, spacing: { before: 80, after: 80 } }),
                    ],
                    shading: { type: ShadingType.CLEAR, fill: GOLD },
                    borders: allNoBorders(),
                    margins: { top: 60, bottom: 60, left: 240, right: 240 },
                    width: { size: 20, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Learn More", font: "Inter", size: 22, bold: true, color: WHITE })], alignment: AlignmentType.CENTER, spacing: { before: 80, after: 80 } }),
                    ],
                    shading: { type: ShadingType.CLEAR, fill: TEAL },
                    borders: allNoBorders(),
                    margins: { top: 60, bottom: 60, left: 240, right: 240 },
                    width: { size: 20, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Secondary", font: "Inter", size: 22, bold: true, color: TEAL })], alignment: AlignmentType.CENTER, spacing: { before: 80, after: 80 } }),
                    ],
                    shading: { type: ShadingType.CLEAR, fill: WHITE },
                    borders: {
                      top: thinBorder(TEAL),
                      bottom: thinBorder(TEAL),
                      left: thinBorder(TEAL),
                      right: thinBorder(TEAL),
                    },
                    margins: { top: 60, bottom: 60, left: 240, right: 240 },
                    width: { size: 20, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Gold = donate only  \u2022  Teal = primary actions  \u2022  Outline = secondary. All buttons: rounded-full, min 44px height on mobile.", font: "Inter", size: 18, color: SLATE })], spacing: { before: 60, after: 60 }, line: 320, lineRule: "auto" }),
                    ],
                    borders: allNoBorders(),
                    margins: { top: 60, bottom: 60, left: 200, right: 0 },
                    width: { size: 40, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
            width: { size: 100, type: WidthType.PERCENTAGE },
            margins: { bottom: 240 },
          }),

          subHeading("Layout Standards"),
          new Paragraph({
            children: [new TextRun({ text: "\u2022  Container:  ", bold: true, color: NAVY, font: "Inter", size: 22 }), new TextRun({ text: "Max-width 1280px, 24px padding (mobile), 48px (desktop)", color: SLATE, font: "Inter", size: 22 })],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "\u2022  Section spacing:  ", bold: true, color: NAVY, font: "Inter", size: 22 }), new TextRun({ text: "96px vertical padding standard", color: SLATE, font: "Inter", size: 22 })],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "\u2022  Alternating backgrounds:  ", bold: true, color: NAVY, font: "Inter", size: 22 }), new TextRun({ text: "White and Cloud (#F8FAFC) for rhythm", color: SLATE, font: "Inter", size: 22 })],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "\u2022  Dark sections:  ", bold: true, color: NAVY, font: "Inter", size: 22 }), new TextRun({ text: "Navy for stats, Teal for CTAs", color: SLATE, font: "Inter", size: 22 })],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "\u2022  Cards:  ", bold: true, color: NAVY, font: "Inter", size: 22 }), new TextRun({ text: "16px rounded corners, cloud background, teal top-border accent", color: SLATE, font: "Inter", size: 22 })],
            spacing: { after: 120 },
          }),

          subHeading("Graphic Elements"),
          body("Meridian line motifs (thin curved SVG paths, 6% opacity in teal) as subtle background decorations. Always behind content, never competing for attention."),

          subHeading("Social Media"),
          body("Use the icon mark as the profile picture. Cover images use the navy-to-teal gradient with the white-container logo. Maintain brand palette in all social graphics."),
        ],
      },

    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(projectRoot, "public", "Meridian-Neuro-Brand-Guidelines.docx");
  fs.writeFileSync(outputPath, buffer);
  console.log("DOCX generated:", outputPath);
}

// Run both
async function main() {
  try {
    await generatePDF();
  } catch (err) {
    console.warn("PDF generation skipped (Chrome/puppeteer unavailable):", err.message);
  }
  await generateDOCX();
}

main().catch(console.error);
