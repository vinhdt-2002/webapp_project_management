# Project management web application

## Git flow

Follow a Git branching strategy for efficient development:

## Convention

- **main** branch: Stable code for deployment. Direct pushes are **not allowed**.
- Feature branches: Always checkout/base from **main** branch (format: [Branch Naming](#branch-naming)).
- Pull Requests: Submit code for review before merging into main.

### Branch Naming and Modifier

Branch names must follow the format: `feature.[modifier].trello_card_id`

| Name   | Description             | Example            |
| ------ | ----------------------- | ------------------ |
| new    | New feature             | feature.new.foo    |
| revamp | Update existing feature | feature.revamp.foo |
| bugfix | Fix bug                 | feature.bugfix.foo |
