export interface Finding {
  src: string;
  srcClass: 'api' | 'web' | 'cspm' | 'iam' | 'auth';
  rowClass: string;
  finding: string;
  risk: number;
  riskClass: 'critical' | 'high' | 'medium';
  status: 'IN PROG' | 'OPEN' | 'ACK';
  statusClass: 'in-prog' | 'open' | 'ack';
  age: string;
}

export const initialFindings: Finding[] = [
  { src: 'API', srcClass: 'api', rowClass: 'src-api', finding: "IDOR exposes other tenants' invoices", risk: 9.2, riskClass: 'critical', status: 'IN PROG', statusClass: 'in-prog', age: '1d' },
  { src: 'WEB', srcClass: 'web', rowClass: 'src-web', finding: 'Reflected XSS in /search renders raw query', risk: 8.1, riskClass: 'high', status: 'OPEN', statusClass: 'open', age: '2h' },
  { src: 'CSPM', srcClass: 'cspm', rowClass: 'src-cspm', finding: 'S3 bucket grants public read to export', risk: 7.8, riskClass: 'high', status: 'OPEN', statusClass: 'open', age: '5h' },
  { src: 'IAM', srcClass: 'iam', rowClass: 'src-iam', finding: 'Over-privileged role assumable from CI', risk: 7.1, riskClass: 'high', status: 'IN PROG', statusClass: 'in-prog', age: '2d' },
  { src: 'AUTH', srcClass: 'auth', rowClass: 'src-auth', finding: 'Session token not rotated on role change', risk: 6.4, riskClass: 'medium', status: 'ACK', statusClass: 'ack', age: '3d' },
];

export const mockNewFindings: Finding[] = [
  { src: 'API', srcClass: 'api', rowClass: 'src-api', finding: 'SQL injection in /api/v1/users endpoint', risk: 9.5, riskClass: 'critical', status: 'OPEN', statusClass: 'open', age: '1m' },
  { src: 'WEB', srcClass: 'web', rowClass: 'src-web', finding: 'CSRF token missing on payment form', risk: 7.9, riskClass: 'high', status: 'OPEN', statusClass: 'open', age: '3m' },
  { src: 'CSPM', srcClass: 'cspm', rowClass: 'src-cspm', finding: 'RDS instance publicly accessible', risk: 8.7, riskClass: 'high', status: 'IN PROG', statusClass: 'in-prog', age: '12m' },
  { src: 'IAM', srcClass: 'iam', rowClass: 'src-iam', finding: 'Service account with admin privileges', risk: 7.3, riskClass: 'high', status: 'ACK', statusClass: 'ack', age: '15m' },
  { src: 'AUTH', srcClass: 'auth', rowClass: 'src-auth', finding: 'Weak password policy on admin portal', risk: 6.8, riskClass: 'medium', status: 'OPEN', statusClass: 'open', age: '22m' },
  { src: 'API', srcClass: 'api', rowClass: 'src-api', finding: 'Unauthenticated endpoint /v2/debug reveals JVM flags', risk: 5.8, riskClass: 'medium', status: 'OPEN', statusClass: 'open', age: '40m' },
  { src: 'WEB', srcClass: 'web', rowClass: 'src-web', finding: 'Path traversal in file download handler', risk: 8.4, riskClass: 'high', status: 'IN PROG', statusClass: 'in-prog', age: '45m' },
  { src: 'CSPM', srcClass: 'cspm', rowClass: 'src-cspm', finding: 'EC2 instance security group allows 0.0.0.0/0 on port 22', risk: 7.6, riskClass: 'high', status: 'OPEN', statusClass: 'open', age: '50m' },
  { src: 'IAM', srcClass: 'iam', rowClass: 'src-iam', finding: 'KMS key policy allows wildcard decrypt permissions', risk: 6.9, riskClass: 'medium', status: 'ACK', statusClass: 'ack', age: '55m' },
  { src: 'AUTH', srcClass: 'auth', rowClass: 'src-auth', finding: 'JWT signing key uses weak HMAC secret', risk: 9.0, riskClass: 'critical', status: 'OPEN', statusClass: 'open', age: '1h' }
];

export interface GraphNode {
  id: string;
  label: string;
  x: number; // percentage
  y: number; // percentage
  type: 'api' | 'auth' | 'secret' | 's3' | 'analyst';
  desc: string;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export const graphNodes: GraphNode[] = [
  { id: 'api', label: 'API', x: 22, y: 28, type: 'api', desc: 'Public API gateway' },
  { id: 'auth', label: 'Auth', x: 18, y: 62, type: 'auth', desc: 'OAuth2 identity provider' },
  { id: 'secret', label: 'Secret', x: 48, y: 72, type: 'secret', desc: 'Vault · API keys' },
  { id: 's3', label: 'S3', x: 72, y: 52, type: 's3', desc: 'prod-exports bucket' },
  { id: 'analyst', label: 'analyst', x: 78, y: 68, type: 'analyst', desc: 'Security analyst role' },
];

export const graphEdges: GraphEdge[] = [
  { from: 'api', to: 'auth' },
  { from: 'api', to: 's3' },
  { from: 'auth', to: 'secret' },
  { from: 'secret', to: 's3' },
  { from: 's3', to: 'analyst' },
];

export interface GraphSignal {
  title: string;
  desc: string;
}

export const graphSignals: GraphSignal[] = [
  { title: 'Reachability signal', desc: 'New path reaches<br/><code>api · public gateway</code>' },
  { title: 'Auth anomaly', desc: 'Unusual login pattern<br/><code>auth · OAuth2 IdP</code>' },
  { title: 'Secret exposure', desc: 'API key rotated<br/><code>secret · vault</code>' },
  { title: 'Data drift', desc: 'New object uploaded<br/><code>s3 · prod-exports</code>' },
  { title: 'Analyst activity', desc: 'Investigation opened<br/><code>analyst · SEC-2041</code>' },
];

export interface TerminalLine {
  t: 'prompt' | 'success' | 'warn' | 'info' | 'dim';
  text: string;
}

export const terminalLines: TerminalLine[] = [
  { t: 'prompt', text: '$ drocol scan --target lagos-fintech-app.ng --profile full --region west-africa' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[init] Drocol Engine v4.2.1 · Node: lagos-01.drocol.ng' },
  { t: 'info', text: '[init] Establishing secure tunnel to scan target...' },
  { t: 'success', text: '[ok] Tunnel established · Latency: 12ms · Authenticated' },
  { t: 'success', text: '[ok] Plan: Professional · Credits remaining: 4,820' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[phase-1/5] DISCOVERY — Enumerating attack surface...' },
  { t: 'dim', text: '  ├─ DNS resolution: 104.21.45.89, 172.67.215.12' },
  { t: 'dim', text: '  ├─ Subdomain enumeration (Amass + crt.sh)...' },
  { t: 'info', text: '  │  found: api.lagos-fintech-app.ng' },
  { t: 'info', text: '  │  found: staging.lagos-fintech-app.ng' },
  { t: 'info', text: '  │  found: admin.lagos-fintech-app.ng' },
  { t: 'info', text: '  │  found: mail.lagos-fintech-app.ng' },
  { t: 'info', text: '  │  found: docs.lagos-fintech-app.ng' },
  { t: 'success', text: '  └─ 47 subdomains discovered in 18.4s' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[phase-2/5] FINGERPRINTING — Technology stack detection...' },
  { t: 'dim', text: '  ├─ Web server: nginx/1.24.0' },
  { t: 'dim', text: '  ├─ Framework: Next.js 14.1.2 (React 18.2)' },
  { t: 'dim', text: '  ├─ Backend: Node.js 20.11.0 + Express 4.18' },
  { t: 'dim', text: '  ├─ Database: PostgreSQL 15.4 (RDS ap-west-1a)' },
  { t: 'dim', text: '  ├─ Cache: Redis 7.2 cluster (3 nodes)' },
  { t: 'dim', text: '  ├─ CDN: Cloudflare (WAF enabled)' },
  { t: 'dim', text: '  └─ Auth: Custom JWT + session cookies' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[phase-3/5] PROBING — Testing web application endpoints...' },
  { t: 'dim', text: '  ├─ Mapping API routes... 312 endpoints discovered' },
  { t: 'dim', text: '  ├─ Testing authentication flows (login, signup, password reset)...' },
  { t: 'dim', text: '  ├─ Probing for IDOR patterns on object-based endpoints...' },
  { t: 'dim', text: '  ├─ Testing session management & cookie security flags...' },
  { t: 'dim', text: '  ├─ Scanning for reflected/stored XSS vectors...' },
  { t: 'dim', text: '  ├─ Testing CSRF protections on state-changing forms...' },
  { t: 'dim', text: '  ├─ Probing email handler for injection vulnerabilities...' },
  { t: 'dim', text: '  │  ├─ Testing: /api/v1/users/{id}/profile' },
  { t: 'dim', text: '  │  ├─ Testing: /api/v1/transactions/{id}' },
  { t: 'dim', text: '  │  ├─ Testing: /api/v1/statements/{id}/download' },
  { t: 'dim', text: '  │  └─ Testing: /api/v1/bvn/verify' },
  { t: 'dim', text: '  ├─ Scanning cloud storage configurations (S3, RDS)...' },
  { t: 'dim', text: '  ├─ Testing email templates for SMTP injection...' },
  { t: 'dim', text: '  │  ├─ POST /api/v1/contact → testing header injection' },
  { t: 'dim', text: '  │  ├─ POST /api/v1/newsletter/subscribe → testing template vars' },
  { t: 'dim', text: '  │  └─ POST /api/v1/password-reset → testing email body injection' },
  { t: 'dim', text: '  └─ Probing payment gateway integrations (Paystack, Flutterwave)...' },
  { t: 'dim', text: '' },
  { t: 'warn', text: '[phase-4/5] FINDINGS — Vulnerabilities confirmed:' },
  { t: 'dim', text: '' },
  { t: 'warn', text: '  [CRITICAL · CVSS 9.2] IDOR on /api/v1/customers/{id}/statements' },
  { t: 'dim', text: '    Proof: GET /api/v1/customers/1001/statements → 200 OK' },
  { t: 'dim', text: '    Auth: user 1002 (different customer) can read user 1001 data' },
  { t: 'dim', text: '    Impact: Any authenticated user can access any customer BVN, NIN,' },
  { t: 'dim', text: '            bank statements, and transaction history' },
  { t: 'dim', text: '    Affected: ~42,000 customer records exposed' },
  { t: 'dim', text: '' },
  { t: 'warn', text: '  [CRITICAL · CVSS 9.0] Email header injection in /api/v1/contact' },
  { t: 'dim', text: '    Impact: Attacker can send arbitrary emails from company domain' },
  { t: 'dim', text: '    Risk: Phishing campaigns, reputation damage, NDPR violation' },
  { t: 'dim', text: '' },
  { t: 'warn', text: '  [HIGH · CVSS 7.8] Broken access control on /admin/audit-logs' },
  { t: 'dim', text: '    Proof: Role "teller" accessed /admin/audit-logs → 200 OK' },
  { t: 'dim', text: '    Impact: Front-line staff can view all admin activity and user PII' },
  { t: 'dim', text: '' },
  { t: 'warn', text: '  [HIGH · CVSS 7.4] Paystack webhook signature not validated' },
  { t: 'dim', text: '    Proof: POST /webhooks/paystack with forged payload → 200 OK' },
  { t: 'dim', text: '    Impact: Attacker can trigger fake successful payments' },
  { t: 'dim', text: '' },
  { t: 'warn', text: '  [MEDIUM · CVSS 6.1] Reflected XSS on /search?q=<payload>' },
  { t: 'dim', text: '    Proof: /search?q=<img src=x onerror=console.log()> → executes '},
  { t: 'dim', text: '    Impact: Session hijacking, credential theft via phishing' },
  { t: 'dim', text: '' },
  { t: 'warn', text: '  [MEDIUM · CVSS 5.3] Missing rate limiting on /api/v1/login' },
  { t: 'dim', text: '    Proof: 1,247 failed attempts in 30s → no block, no CAPTCHA' },
  { t: 'dim', text: '    Impact: Credential stuffing attacks against customer accounts' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[phase-5/5] ATTACK PATHS — Building correlation graph...' },
  { t: 'dim', text: '  Path 1 (CRITICAL): IDOR → admin role escalation → S3 bucket' },
  { t: 'dim', text: '    (customer BVN/NIN data · 42K records)' },
  { t: 'dim', text: '  Path 2 (CRITICAL): Email injection → phishing → credential harvest' },
  { t: 'dim', text: '    → fund transfer API → unauthorized transactions' },
  { t: 'dim', text: '  Path 3 (HIGH): XSS → session hijack → Paystack webhook abuse' },
  { t: 'dim', text: '    → fake payment confirmations → financial fraud' },
  { t: 'dim', text: '  Path 4 (HIGH): Brute force login → account takeover → PII exfil' },
  { t: 'dim', text: '' },
  { t: 'success', text: '[remediation] Auto-generating fixes...' },
  { t: 'success', text: '  ├─ Draft PR #4281: Add ownership check to /statements endpoint' },
  { t: 'success', text: '  ├─ Draft PR #4282: Sanitize email headers in contact handler' },
  { t: 'success', text: '  ├─ Draft PR #4283: Enforce role-based access on /admin/*' },
  { t: 'success', text: '  ├─ Draft PR #4284: Validate Paystack webhook signatures' },
  { t: 'success', text: '  ├─ Created Jira: SEC-1847, SEC-1848, SEC-1849, SEC-1850' },
  { t: 'success', text: '  ├─ Posted runbook to #security-incidents (Slack)' },
  { t: 'success', text: '  └─ Generated NDPR breach impact assessment (draft)' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[done] Scan complete in 6m 42s' },
  { t: 'info', text: '  2 critical · 2 high · 2 medium · 4 attack paths · 6 draft PRs' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[restart] Reloading demo scan in 5s...' },
];

export interface ModuleData {
  number: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export const moduleData: ModuleData[] = [
  {
    number: '01 / 07',
    title: 'InjectionPrompt SOC',
    description: 'Real-time injection detection and blocking across web, API, mobile, email, and cloud. Protects against SQLi, NoSQLi, XSS, command injection, and more.',
    features: [
      'SQL injection detection and blocking',
      'NoSQL injection prevention',
      'Cross-Site Scripting (XSS) defense',
      'Command injection protection',
      'Email header injection sanitization',
      'Template injection (SSTI) sandboxing',
      'Cloud infrastructure injection monitoring'
    ],
    imageUrl: '/module-injection.svg'
  },
  {
    number: '02 / 07',
    title: 'Web & API Pen Testing',
    description: 'Continuous testing for broken access control, IDOR, XSS, session weaknesses, and business logic flaws. Find what scanners miss.',
    features: [
      'OWASP Top 10 automated scanning',
      'IDOR and broken access control testing',
      'Cross-Site Scripting (XSS) detection',
      'SQL injection and command injection',
      'Session management weaknesses',
      'Business logic flaw discovery'
    ],
    imageUrl: 'https://image.qwenlm.ai/public_source/9253bf66-aa18-4aa0-b6fe-f19fb1fbbfb0/17be7d7e9-4ded-4e81-ba75-e47dfb0c3af6.png'
  },
  {
    number: '03 / 07',
    title: 'Attack Path Analysis',
    description: 'Instead of hundreds of isolated alerts, we link vulnerabilities into complete attack paths — so you fix what actually matters.',
    features: [
      'Attack path visualization',
      'Vulnerability chaining analysis',
      'Risk-based prioritization',
      'Critical path identification',
      'Exploit likelihood scoring',
      'Remediation sequencing'
    ],
    imageUrl: 'https://image.qwenlm.ai/public_source/9253bf66-aa18-4aa0-b6fe-f19fb1fbbfb0/14c996218-ff95-4089-b30a-41d5a7a07430.png'
  },
  {
    number: '04 / 07',
    title: 'Cloud Security Posture',
    description: 'Discover assets across AWS, Azure, and GCP. Map identities, permissions, secrets, and sensitive data. Detect misconfigurations before attackers do.',
    features: [
      'Multi-cloud asset discovery and inventory',
      'Identity and permission mapping',
      'Secret and credential scanning',
      'Misconfiguration detection (CIS benchmarks)',
      'Compliance benchmarking (CBN, PCI DSS, ISO)',
      'Real-time drift detection and alerts'
    ],
    imageUrl: 'https://image.qwenlm.ai/public_source/9253bf66-aa18-4aa0-b6fe-f19fb1fbbfb0/1e068554f-c479-46e8-9679-b98618454a4c.png'
  },
  {
    number: '05 / 07',
    title: 'Auto-Remediation',
    description: 'Proof of exploitation, step-by-step guidance, draft PRs, and runbooks. We integrate with your dev workflow — not just report issues.',
    features: [
      'Auto-generated draft PRs',
      'Step-by-step remediation guides',
      'Jira & Slack integration',
      'Runbook automation',
      'Verified, never auto-applied',
      'GitHub/GitLab integration'
    ],
    imageUrl: 'https://image.qwenlm.ai/public_source/9253bf66-aa18-4aa0-b6fe-f19fb1fbbfb0/1d9d75a9b-233b-4261-95aa-08f2edcf7a7a.png'
  },
  {
    number: '06 / 07',
    title: 'Compliance & Governance',
    description: 'Automated compliance monitoring for CBN, NDPR, PCI DSS, ISO 27001, and SOC 2. Generate audit-ready reports with a single click.',
    features: [
      'CBN compliance monitoring',
      'NDPR data protection enforcement',
      'PCI DSS readiness scanning',
      'ISO 27001 gap analysis',
      'SOC 2 report generation',
      'Automated audit trail logging',
      'Regulatory change tracking'
    ],
    imageUrl: '/module-compliance.svg'
  },
  {
    number: '07 / 07',
    title: 'Developer-Ready APIs',
    description: 'RESTful APIs, SDKs for Python, Node, Go, and Java. Ship security into your product in an afternoon, not a quarter.',
    features: [
      'RESTful API endpoints',
      'Python, Node, Go, Java SDKs',
      'Webhook notifications',
      'Comprehensive documentation',
      '99.99% API uptime SLA',
      'Sandbox environment for testing'
    ],
    imageUrl: 'https://image.qwenlm.ai/public_source/9253bf66-aa18-4aa0-b6fe-f19fb1fbbfb0/1693ad022-6895-4cbc-873b-11797c4d58dc.png'
  }
];

export interface AttackStage {
  layerIndex: number;
  title: string;
  description: string;
}

export const attackStages: AttackStage[] = [
  { layerIndex: 0, title: 'RECONNAISSANCE', description: 'Attacker enumerates subdomains and discovers an exposed staging endpoint — the first foothold into your perimeter.' },
  { layerIndex: 1, title: 'EXPLOITATION', description: 'An IDOR flaw in the user endpoint allows unauthenticated access to internal records — privilege boundary broken.' },
  { layerIndex: 2, title: 'ESCALATION', description: 'The stolen service account holds admin rights across the entire cloud tenant — lateral movement is trivial.' },
  { layerIndex: 3, title: 'DETECTION', description: "Drocol's engine identifies the anomalous behavior and correlates it with known attack patterns in real-time." },
  { layerIndex: 4, title: 'CONTAINMENT', description: 'Automatic isolation of compromised assets prevents lateral movement and limits the blast radius of the attack.' },
  { layerIndex: 5, title: 'REMEDIATION', description: 'Draft PRs, runbooks, and step-by-step guidance handed to engineers — never auto-applied, always verified.' }
];

export interface Industry {
  number: string;
  title: string;
  description: string;
  features: string[];
  iconType: 'bank' | 'health' | 'telco' | 'software' | 'mssp' | 'ecommerce';
}

export const industries: Industry[] = [
  {
    number: '01',
    title: 'Financial Institutions',
    description: "Banks, fintechs, and microfinance — CBN-compliant security for Nigeria's most regulated sector.",
    features: ['CBN Compliant', 'PCI DSS', 'Real-time Monitoring'],
    iconType: 'bank'
  },
  {
    number: '02',
    title: 'Healthcare & Biotech',
    description: 'Hospitals, healthtech, and labs — NHACT and NDPR compliance to protect sensitive patient records.',
    features: ['NDPR Compliant', 'PII Safeguarding', 'Access Audits'],
    iconType: 'health'
  },
  {
    number: '03',
    title: 'Telecommunications',
    description: 'Telcos and ISPs — NCC-compliant infrastructure security at national scale.',
    features: ['NCC Compliant', 'DDoS Protection', 'Network Security'],
    iconType: 'telco'
  },
  {
    number: '04',
    title: 'Enterprise Software',
    description: 'SaaS companies shipping to enterprise — embed security into your product, not as an afterthought.',
    features: ['API Security', 'SOC 2 Ready', 'DevSecOps'],
    iconType: 'software'
  },
  {
    number: '05',
    title: 'Managed Security (MSSP)',
    description: 'White-label our platform for your clients — multi-tenant, API-first, built for partners.',
    features: ['Multi-tenant', 'White-label', 'Partner Portal'],
    iconType: 'mssp'
  },
  {
    number: '06',
    title: 'E-commerce & Logistics',
    description: 'Marketplaces, delivery networks, and payments — PCI-DSS ready out of the box.',
    features: ['PCI DSS', 'Payment Security', 'Fraud Detection'],
    iconType: 'ecommerce'
  }
];

export interface Integration {
  name: string;
  category: string;
  gradient: string;
  iconType: string;
}

export const integrations: Integration[] = [
  { name: 'AWS', category: 'Cloud', gradient: 'linear-gradient(135deg, #FF9900 0%, #FFB84D 100%)', iconType: 'aws' },
  { name: 'Azure', category: 'Cloud', gradient: 'linear-gradient(135deg, #0078D4 0%, #50A3EB 100%)', iconType: 'azure' },
  { name: 'GCP', category: 'Cloud', gradient: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)', iconType: 'gcp' },
  { name: 'Kubernetes', category: 'Orchestration', gradient: 'linear-gradient(135deg, #326CE5 0%, #5A8FF5 100%)', iconType: 'k8s' },
  { name: 'GitHub', category: 'DevOps', gradient: 'linear-gradient(135deg, #24292E 0%, #4A4F55 100%)', iconType: 'github' },
  { name: 'Okta', category: 'Identity', gradient: 'linear-gradient(135deg, #007DC1 0%, #2E9ADF 100%)', iconType: 'okta' },
  { name: 'Jira', category: 'Workflow', gradient: 'linear-gradient(135deg, #0052CC 0%, #2684FF 100%)', iconType: 'jira' },
  { name: 'Slack', category: 'Alerts', gradient: 'linear-gradient(135deg, #4A154B 0%, #611f69 100%)', iconType: 'slack' },
  { name: 'PagerDuty', category: 'Incidents', gradient: 'linear-gradient(135deg, #06AC39 0%, #27C956 100%)', iconType: 'pagerduty' },
  { name: 'Splunk', category: 'SIEM', gradient: 'linear-gradient(135deg, #EC4A17 0%, #F58220 100%)', iconType: 'splunk' },
  { name: 'Terraform', category: 'IaC', gradient: 'linear-gradient(135deg, #7B42BC 0%, #9B5FD9 100%)', iconType: 'terraform' },
  { name: 'Datadog', category: 'Observability', gradient: 'linear-gradient(135deg, #F47920 0%, #F7A838 100%)', iconType: 'datadog' }
];
