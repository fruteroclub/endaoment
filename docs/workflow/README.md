# Endaoment Workflow Documentation

This directory contains the complete implementation workflow for the Endaoment project, organized by epics and phases.

## 📁 Structure

```
docs/workflow/
├── entry.md                          # Main workflow entry point (START HERE)
├── README.md                         # This file
├── epic-1-scaffold-frontend.md       # Epic 1: Detailed tickets
├── epic-2-miniapp-migration.md       # Epic 2: Miniapp conversion
├── epic-3-wallet-integration.md      # Epic 3: Wallet + chain
├── epic-4-smart-contracts.md         # Epic 4: Octant V2 fork
├── epic-5-contract-integration.md    # Epic 5: Frontend-contract
└── epic-6-production-launch.md       # Epic 6: Launch + submit
```

## 🚀 Quick Start

1. **Read**: [entry.md](entry.md) for current sprint and epic overview
2. **Pick**: A ticket from the current epic (Epic 1 right now)
3. **Work**: Follow ticket acceptance criteria
4. **Update**: Mark ticket status as you progress
5. **Commit**: Use ticket ID in git commit message (e.g., "E1-T3: add student detail page")

## 📊 Current Status

- **Active Epic**: Epic 1 (Scaffold-ETH 2 Frontend)
- **Progress**: 40% (2/7 tickets complete)
- **Next**: E1-T3 (Student Detail Page)

## 🎯 Epic Overview

| Epic | Focus | Duration | Status |
|------|-------|----------|--------|
| 1 | Scaffold-ETH 2 Prototype | 4 days | 🔄 40% |
| 2 | Farcaster Miniapp | 3 days | ⏳ TODO |
| 3 | Wallet Integration | 3 days | ⏳ TODO |
| 4 | Smart Contracts | 5 days | ⏳ TODO |
| 5 | Contract Integration | 4 days | ⏳ TODO |
| 6 | Production Launch | 3 days | ⏳ TODO |

**Total Timeline**: 22 days (3 weeks)

## 📝 Ticket Format

Each ticket includes:
- **ID**: E{epic}-T{ticket} (e.g., E1-T3)
- **Status**: TODO, IN PROGRESS, BLOCKED, DONE
- **Assignee**: Team member name
- **Hours**: Estimated and actual
- **Dependencies**: Other tickets required
- **Acceptance Criteria**: Definition of done
- **Implementation Notes**: Code references and hints
- **Testing Checklist**: QA steps

## 🔄 Workflow Process

### 1. Start Ticket
- Assign yourself in the ticket file
- Move status to IN PROGRESS
- Create feature branch: `git checkout -b E1-T3-student-detail`

### 2. Implement
- Follow acceptance criteria
- Reference IMPLEMENTATION_GUIDE.md for code
- Test locally: `yarn start`
- Check for errors: `yarn next:lint`

### 3. Complete
- Mark all acceptance criteria ✅
- Log actual hours
- Create commit with ticket ID
- Update epic progress percentage

### 4. Review
- Optional: PR for team review
- Merge to main when ready
- Update entry.md status

## 🎯 Team Coordination

**Daily Standup Questions**:
1. What ticket did you complete yesterday?
2. What ticket are you working on today?
3. Any blockers?

**Weekly Review**:
- Epic completion percentage
- Velocity (tickets per day)
- Blockers to resolve
- Next epic preparation

## 📞 Support

- **Questions**: Check IMPLEMENTATION_GUIDE.md first
- **Blockers**: Document in ticket, notify team
- **Code**: Follow Scaffold-ETH 2 patterns
- **Design**: Use DaisyUI components

## 🔗 Related Docs

- [Project Requirements](../REQUIREMENTS.md)
- [Implementation Guide](../IMPLEMENTATION_GUIDE.md)
- [CLAUDE.md](../../CLAUDE.md)

---

**Last Updated**: 2025-11-07
**Maintained By**: Project team
