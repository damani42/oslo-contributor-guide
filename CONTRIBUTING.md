# Contributing to the Oslo Contributor Guide

Help readers understand Oslo and complete a focused first contribution. Feedback from beginners is especially useful: identify the step you followed, what you expected, and what was unclear or failed.

## Propose a focused improvement

Keep each change about one problem. Explain the reader's difficulty and how the proposed wording or example resolves it.

Useful contributions include:

- Correcting an instruction or broken reference.
- Improving an explanation or the order of a tutorial.
- Updating an example after a repository or contribution process changes.
- Reporting a reproducible problem encountered while following the guide.
- Documenting a common difficulty with enough context to help another beginner.

## Verify technical changes

Use current primary sources, such as a library's repository, the OpenStack Contributor Guide, OpenDev documentation, and OpenStack governance records. Place references near the instructions or claims they support.

For command examples, identify the repository, branch, Python version, and relevant tool requirements. Run the example when practical and describe the scope of verification in the change description. State any service or backend needed for functional tests.

Before committing:

```bash
git diff --check
git diff
```

Check that relative links and table-of-contents links resolve, code blocks are readable, and the Markdown renders correctly.

## Keep the guide maintainable

- Keep `guide.md` as the complete learning path; use `README.md` for the project overview and reading routes.
- Keep the project inventory aligned with the [official Oslo team list](https://governance.openstack.org/tc/reference/projects/oslo.html).
- Link to common contribution procedures and Oslo policies when they supply the authoritative detail.
- Update review dates after a technical review. Explain the scope of the review when only part of the guide was checked.
- Propose corrections to the official OpenStack documentation when they apply there as well.

## Writing style

Write in clear English for someone who knows basic Python but may be unfamiliar with OpenStack. Explain a term at its first use. Prefer small, concrete examples and describe the outcome of each important step.

Mark sample names, paths, and bug numbers clearly. Preserve a newcomer's ability to follow the guide without knowing the history of a discussion or change request.

## Attribution

Contributions use the documentation license described in [README.md](README.md). Preserve source acknowledgments and identify any externally adapted content and its license.

Review all contributed text and commands, including material prepared with AI assistance. Record material AI assistance in the commit message using an `Assisted-By` trailer so the contribution's origin remains visible.
