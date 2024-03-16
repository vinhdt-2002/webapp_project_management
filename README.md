# Project management web application

## Convention

This document outlines the conventions for contributing to the TaskHub project. We need to follow these guidelines to ensure a smooth development and review process.
We adhere to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) for consistent commit messages.

## Git flow
Follow a Git branching strategy for efficient development:

- **main** branch: Stable code for deployment. Direct pushes are **not allowed**.
- Feature branches: Always checkout/base from **main** branch (format: [Branch Naming](#branch-naming)).
- Pull Requests: Submit code for review before merging into main.

### Branch Naming and Modifier

Branch names must follow the format: `feature.[modifier].trello_card_id`

| Name | Description | Example |
| ----------- | ----------- | ----------- |
| new | New feature | feature.new.foo |
| revamp | Update existing feature | feature.revamp.foo |
| bugfix | Fix bug | feature.bugfix.foo |
