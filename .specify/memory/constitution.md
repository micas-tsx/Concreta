# Concreta Constitution

<!-- Sync Impact Report -->
<!-- Version: 0.0.0 → 1.0.0 -->
<!-- Changes: Initial constitution creation with 6 core principles -->
<!-- Added: All 6 principle sections + Security Requirements + Development Workflow + Governance -->
<!-- Templates requiring updates: None (all templates align with initial principles) -->

## Core Principles

### I. Code Quality (NON-NEGOTIABLE)

All code MUST meet the following standards:

- **Consistency**: Code MUST follow established style guides and formatting conventions; Use automated linting and formatting tools (e.g., ESLint, Prettier, Rustfmt, Black)
- **Readability**: Variable and function names MUST be descriptive and self-documenting; Avoid magic numbers and unexplained constants
- **Modularity**: Functions MUST be small, focused, and do one thing well; Modules MUST have clear single responsibilities
- **Documentation**: Public APIs MUST have docstrings/comments explaining purpose, parameters, and return values; Complex algorithms require inline comments explaining intent
- **No Dead Code**: Unused imports, variables, and functions MUST be removed before commits; Delete commented-out code blocks

Rationale: Code is read far more often than written; maintainability depends on quality standards applied consistently from day one.

### II. Testing Standards (NON-NEGOTIABLE)

All code changes MUST be accompanied by appropriate tests:

- **Test Coverage**: Minimum 80% code coverage for new code; Critical paths MUST have 100% coverage
- **Test Types**: Unit tests for business logic; Integration tests for service interactions; Contract tests for API boundaries; End-to-end tests for critical user flows
- **Test Quality**: Tests MUST be deterministic (no flaky tests); Each test MUST have a clear purpose and single assertion focus; Tests MUST be independent and able to run in any order
- **Test Naming**: Test names MUST describe the expected behavior, not the implementation; Use the pattern: `should_[expected behavior]_[when_condition]`
- **Test-First Consideration**: For complex features, consider writing tests before implementation (TDD-lite approach)

Rationale: Tests are the safety net that enables confident refactoring and prevents regressions.

### III. User Experience Consistency

All user-facing interfaces MUST maintain consistent experience:

- **Design System Adherence**: Follow established UI patterns and component library; Custom components MUST have documented justification
- **Responsive Design**: Layouts MUST adapt gracefully across supported screen sizes; Breakpoints MUST be consistent with design specifications
- **Interaction Patterns**: Similar actions MUST use similar interaction patterns across the application; Hover, focus, and active states MUST be visually distinct and consistent
- **Accessibility**: WCAG 2.1 AA compliance required; Keyboard navigation support mandatory; Screen reader compatibility required
- **Error Presentation**: Error messages MUST be user-friendly, actionable, and avoid technical jargon; Errors MUST be visually distinct from normal content

Rationale: Consistent UX reduces cognitive load and prevents user errors.

### IV. Performance Requirements

Performance MUST be considered from the start, not as an afterthought:

- **Metrics Targets**:
  - First Contentful Paint (FCP): < 1.8s
  - Time to Interactive (TTI): < 3.5s
  - API response time (p95): < 200ms
  - Page load time: < 3s on 3G networks
- **Optimization Principles**:
  - Lazy loading for non-critical resources
  - Image optimization (WebP/AVIF with fallbacks)
  - Code splitting for large bundles
  - Service worker caching for repeat visits
- **Monitoring**: Performance metrics MUST be tracked in production; Performance budgets MUST be enforced in CI/CD
- **Measurement**: Performance impact MUST be measured for any change affecting rendering or data fetching

Rationale: Poor performance directly impacts user satisfaction and business metrics.

### V. Mobile-First (NON-NEGOTIABLE)

All features MUST be designed and implemented mobile-first:

- **Design Priority**: Start with mobile layouts and progressively enhance for larger screens; Mobile constraints reveal essential functionality
- **Touch Targets**: Minimum 44x44px touch targets for interactive elements; Adequate spacing between clickable elements
- **Content Priority**: Content hierarchy MUST be clear on small screens; Essential content MUST be immediately visible without scrolling
- **Progressive Enhancement**: Core functionality MUST work without JavaScript; Enhanced features MUST degrade gracefully
- **Testing**: All features MUST be tested on actual mobile devices or accurate emulators; Test on minimum supported iOS (Safari) and Android (Chrome) versions

Rationale: Mobile traffic exceeds desktop in most contexts; designing mobile-first ensures essential features are not crowded out by desktop enhancements.

### VI. Security System (NON-NEGOTIABLE)

Security MUST be built into every layer of the application:

- **Input Validation**: ALL user inputs MUST be validated and sanitized server-side; SQL injection, XSS, and CSRF MUST be prevented via parameterized queries, output encoding, and CSRF tokens
- **Authentication & Authorization**:
  - Strong password requirements (minimum 12 characters, complexity rules)
  - Multi-factor authentication support required
  - Session tokens MUST be secure, random, and time-limited
  - Role-based access control (RBAC) for all protected resources
- **Data Protection**:
  - Sensitive data MUST be encrypted at rest (AES-256)
  - TLS 1.3 required for all data in transit
  - API keys and secrets MUST never be committed to version control
  - Environment variables for configuration, never hardcoded secrets
- **Security Headers**: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy headers required
- **Dependencies**: Regular security audits for third-party dependencies; Known vulnerabilities MUST be patched within 72 hours of disclosure
- **Logging & Monitoring**: Security events MUST be logged (failed logins, privilege escalation attempts); Anomaly detection required for unusual access patterns

Rationale: Security vulnerabilities can cause catastrophic harm to users and organizations; prevention is far cheaper than remediation.

## Security Requirements

### Dependency Management

- Use lockfiles for all dependency managers (package-lock.json, Pipfile.lock, Cargo.lock)
- Automated vulnerability scanning in CI/CD pipeline
- Pin exact versions for security-critical dependencies
- Regular dependency updates with security advisories review

### Secret Management

- Secrets stored in environment variables or dedicated secret management services (e.g., AWS Secrets Manager, HashiCorp Vault)
- No secrets in code, config files, or version control
- Rotate secrets regularly and after any potential exposure
- Access to secrets logged and audited

### Data Privacy

- Data minimization: collect only necessary information
- User consent required before data collection
- Data retention policies with automatic purging
- GDPR/CCPA compliance for applicable data

## Development Workflow

### Commit Conventions

- **Conventional Commits**: Always use [Conventional Commits](https://www.conventionalcommits.org/) format
  - Format: `type(scope): description`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`
- **Short messages**: Keep commit messages concise and descriptive
  - First line: max 72 characters
  - Avoid long paragraphs - summarize what was done
  - Use imperative mood ("add feature" not "added feature")
- **Examples**:
  - `feat(dashboard): add filter bar component`
  - `fix(auth): resolve login timeout issue`
  - `docs: update README with setup instructions`

### Code Review Requirements

- All changes MUST be reviewed before merge
- Minimum one approval required for non-critical changes
- Two approvals required for security-sensitive or architectural changes
- Reviews MUST verify: code quality, test coverage, security implications, performance impact, UX consistency

### CI/CD Gates

All gates MUST pass before deployment:

- Linting and formatting checks
- Unit and integration tests with coverage threshold
- Security scanning (SAST, dependency vulnerabilities)
- Performance budget checks
- Accessibility audits (automated)

### Deployment Practices

- Staged rollouts (canary deployments for major changes)
- Rollback capability for all deployments
- Feature flags for gradual feature release
- Production monitoring immediately after deployment

## Governance

### Amendment Procedure

1. Propose changes with rationale and impact assessment
2. Community review period (minimum 7 days for minor changes, 30 days for major)
3. Consensus or majority approval from maintainers
4. Migration plan required for breaking changes
5. Document changes with version bump

### Versioning Policy

- **MAJOR** (X.0.0): Backward-incompatible changes to principles or requirements
- **MINOR** (x.Y.0): New principles added or materially expanded guidance
- **PATCH** (x.y.Z): Clarifications, wording improvements, non-semantic refinements

### Compliance Verification

- All pull requests MUST verify alignment with constitution principles
- Constitution compliance review is part of the code review process
- Significant deviations MUST be justified in writing and approved by maintainers

### Review Cadence

- Quarterly review of all principles for relevance
- Annual comprehensive constitution audit
- Ad-hoc reviews triggered by significant architectural changes

---

**Version**: 1.0.0 | **Ratified**: 2026-03-26 | **Last Amended**: 2026-03-26
