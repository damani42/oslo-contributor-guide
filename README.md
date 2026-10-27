# Oslo Contributor Guide

A practical English-language guide for new contributors to OpenStack Oslo.

**[Read the web guide](https://damani42.github.io/oslo-contributor-guide/)** · [Read the Markdown source](guide.md)

This independent community resource brings the contribution journey into one place: understanding Oslo, choosing a library, preparing a development environment, finding work, submitting a Gerrit change, and responding to review.

**Maintainer:** Daniel Bengtsson

**Last technical review:** 27 October 2026

## Who this guide is for

The guide is intended for people with basic Python knowledge who are new to Oslo, OpenStack development, or Gerrit. It introduces the tools and explains how they fit together before walking through a first contribution.

## What you will find

- An introduction to Oslo and its shared Python libraries.
- A complete inventory of the projects owned by the Oslo team at the review date.
- Explanations of Launchpad, Gerrit, git-review, Zuul, tox, and stestr.
- Development and testing examples based on `oslo.utils`.
- Guidance on the DCO, commit messages, patch sets, compatibility, and release notes.
- Troubleshooting advice and a suggested first-week learning path.

## Start here

| Your goal | Where to start |
| --- | --- |
| Understand Oslo | [What is Oslo?](guide.md#what-is-oslo) |
| Choose a first task | [Choose a manageable first contribution](guide.md#choose-a-manageable-first-contribution) |
| Prepare your machine | [Prepare a local development environment](guide.md#prepare-a-local-development-environment) |
| Submit a change | [Submit your first Gerrit change](guide.md#submit-your-first-gerrit-change) |
| Explore the projects | [Complete Oslo project inventory](guide.md#complete-oslo-project-inventory) |

## Relationship with upstream documentation

The [OpenStack Contributor Guide](https://docs.openstack.org/contributors/) covers the common contribution process. The [Oslo contributor page](https://specs.openstack.org/openstack/oslo-specs/specs/policy/contributing.html) describes the team's contribution practices. Those sources and each library's current repository documentation remain the references for project requirements and decisions.

This guide adds a continuous learning path, explanations, and practical examples. Corrections that also benefit the official documentation should be proposed upstream. The [governance inventory](https://governance.openstack.org/tc/reference/projects/oslo.html) is the source for the project list.

A focused update to the official Oslo contributor page is proposed separately in [Gerrit change 1012459](https://review.opendev.org/c/openstack/oslo-specs/+/1012459).

## Repository contents

```text
README.md          Project overview and reading paths
guide.md           Complete contributor guide
CONTRIBUTING.md    How to improve and maintain the guide
LICENSE            Creative Commons Attribution 4.0 International
NOTICE             Attribution and source acknowledgments
index.md           Web entry point, including guide.md directly
_config.yml        GitHub Pages and Jekyll configuration
_layouts/          Reading layout
assets/            Responsive styles and section navigation
```

## Web publication

GitHub Pages publishes the site from the root of `main`. Jekyll includes `guide.md` directly in the web entry point, so editing the guide updates both the repository version and the website. The layout provides responsive tables and code blocks, a section navigation on larger screens, system dark-mode support, and a print stylesheet.

## Contributing

Corrections, clearer examples, and feedback from people following the guide are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the review and maintenance approach.

## License and attribution

The documentation is provided under [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/). See [LICENSE](LICENSE) and [NOTICE](NOTICE) for the license text and attribution information.
