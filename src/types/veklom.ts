export type EvidenceLabel =
  | 'VERIFIED_LIVE'
  | 'VERIFIED_REPO'
  | 'CONFIGURED'
  | 'LAST_KNOWN'
  | 'TARGET'
  | 'UNVERIFIED'
  | 'DEMO'
  | 'ARCHIVED';

export type IsolationClass = 'os-enforced' | 'microvm';

export type CellPhase =
  | 'REQUESTED'
  | 'IDENTITY_VERIFIED'
  | 'LEASE_VALIDATED'
  | 'CELL_ALLOCATED'
  | 'RUNTIME_MEASURED'
  | 'NETWORK_LOCKED'
  | 'EXECUTING'
  | 'CELL_OUTPUT_VALIDATED'
  | 'CELL_DESTROYED'
  | 'BROKER_PATH_READY'
  | 'MUTATION_REVALIDATED'
  | 'MUTATION_ATTEMPTED'
  | 'MUTATION_ACCEPTED'
  | 'CREDENTIALS_REVOKED'
  | 'EVIDENCE_SEALED'
  | 'TEARDOWN_ATTESTED'
  | 'COMPLETED'
  | 'FAILED_UNVERIFIED';

export type ThreatType =
  | 'prompt_injection'
  | 'sql_injection'
  | 'xss'
  | 'brute_force'
  | 'model_theft'
  | 'data_exfiltration'
  | 'unauthorized_access'
  | 'anomaly';

export type SecurityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface SecurityEvent {
  id: string;
  threatType: ThreatType;
  securityLevel: SecurityLevel;
  status: 'open' | 'investigating' | 'resolved';
  description: string;
  sourceIp: string;
  userId: string;
  createdAt: string;
  mitigationApplied?: string;
}

export interface AuthorityKey {
  id: string;
  algorithm: 'ed25519' | 'ecdsa-p256';
  epoch: number;
  publicKey: string;
  digest: string;
  status: 'active' | 'retired' | 'revoked';
  issuedAt: string;
  expiresAt: string;
  lastUsedAt?: string;
  evidenceLabel: EvidenceLabel;
}

export interface VaultSecret {
  id: string;
  name: string;
  provider: string;
  maskedValue: string;
  fullValue?: string;
  cipherSuite: 'AES-256-GCM';
  environment: 'production' | 'staging' | 'byos';
  lastRotated: string;
  isRevealed?: boolean;
}

export interface WorkflowStep {
  step: number;
  action: string;
  status: 'planned' | 'executing' | 'completed' | 'failed';
  details?: string;
}

export interface RiskItem {
  risk: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
}

export interface CostEstimate {
  compile: string;
  execution: string;
  artifactGeneration: string;
  totalEstimated: string;
}

export interface GPCPlan {
  id: string;
  intent: string;
  status: 'draft' | 'compiled' | 'approved' | 'executed';
  workspaceId: string;
  createdAt: string;
  workflowSteps: WorkflowStep[];
  modelsRequired: string[];
  toolsRequired: string[];
  deploymentPath: string;
  risks: RiskItem[];
  policyRequirements: string[];
  costEstimate: CostEstimate;
}

export interface ComplianceFramework {
  name: string;
  description: string;
  required: boolean;
  autoEnforced: boolean;
}

export interface SecurityPolicy {
  mfaRequired: boolean;
  minPasswordLength: number;
  sessionTimeoutMinutes: number;
  maxFailedLogins: number;
  ipAllowlistEnabled: boolean;
  dataEncryptionAtRest: boolean;
  dataEncryptionInTransit: boolean;
  auditLogRetentionDays: number;
  zeroTrustEnabled: boolean;
  rbacEnabled: boolean;
}

export interface IndustryVertical {
  id: 'hospital' | 'bank' | 'insurance' | 'content_creator' | 'general';
  displayName: string;
  tagline: string;
  description: string;
  color: string;
  accent: string;
  badge: string;
  security: SecurityPolicy;
  complianceFrameworks: ComplianceFramework[];
  defaultSamplePrompt: string;
  redactionRules: { name: string; pattern: RegExp; replacement: string }[];
}

export interface ModelProvider {
  id: string;
  name: string;
  provider: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
  status: 'active' | 'standby' | 'deprecated';
  latencyMs: number;
  zeroExposure: boolean;
  governanceAttached: boolean;
  maxTokens: number;
}

export interface MarketplaceTool {
  id: string;
  name: string;
  category: 'Security' | 'Governance' | 'LLM Ops' | 'Data & Privacy' | 'Audit';
  description: string;
  author: string;
  pricing: 'Free' | 'Reserve' | '$0.002/call';
  installed: boolean;
  rating: number;
  downloads: number;
}

export interface PipelineStage {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  durationMs?: number;
  logs: string[];
}

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'gpc_compile' | 'cell_execution' | 'settlement' | 'model_usage';
  amount: number; // in USD
  balanceAfter: number;
  digest: string;
  x402Settled: boolean;
  timestamp: string;
  description: string;
}

export interface AgentWorkforceMember {
  id: string;
  name: string;
  domain: 'Security' | 'Operations' | 'Governance' | 'Infrastructure' | 'Intelligence';
  role: string;
  status: 'active' | 'idle' | 'executing';
  boundPolicy: string;
  isolation: IsolationClass;
}

// ── Real-Time Telemetry & Continuum Models ─────────────────────────────────

export interface BackgroundScanner {
  id: string;
  name: string;
  category: 'Ingress Radar' | 'Memory Barrier' | 'Vault Scrubber' | 'PII/PHI Sweeper' | 'Ledger Notary';
  frequency: string;
  intervalSeconds: number;
  status: 'scanning' | 'idle' | 'warning' | 'active';
  lastScan: string;
  totalInspected: number;
  threatsNeutralized: number;
  currentRule: string;
  whatIsGoingOn: string;
  whyItMatters: string;
  pulseRate: number; // 0-100
}

export interface ContinuumPayload {
  id: string;
  timestamp: string;
  actor: string;
  verticalId: string;
  rawInput: string;
  sanitizedInput: string;
  threatDetected: boolean;
  threatDetails?: string;
  phiRedactionsCount: number;
  leaseId: string;
  authorityEpoch: number;
  microvmCellId: string;
  microvmStatus: 'ALLOCATED' | 'EXECUTING' | 'DESTROYED';
  executionLatencyMs: number;
  pglDigest: string;
  reserveCost: number;
  phase: 'COMPLETED' | 'QUARANTINED';
}
