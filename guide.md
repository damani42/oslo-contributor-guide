# Getting Started as an Oslo Contributor

A beginner's guide to Oslo, its projects, and the OpenStack contribution workflow.

**Audience:** New contributors with basic Python knowledge and limited experience with OpenStack or Gerrit.

**Last reviewed:** 27 October 2026. The project inventory and repository examples reflect the sources checked on that date.

You can make a useful contribution to Oslo without understanding the whole of OpenStack. Start with one library, learn how to run its tests, and work on a small, clearly defined improvement.

This guide explains what Oslo does, how Launchpad and Gerrit fit together, and how to prepare your first contribution. A complete inventory of projects owned by the Oslo team appears near the end.

## Contents

- [What is Oslo?](#what-is-oslo)
- [Understand the contribution tools](#understand-the-contribution-tools)
- [Choose a manageable first contribution](#choose-a-manageable-first-contribution)
- [Set up your accounts and identity](#set-up-your-accounts-and-identity)
- [Prepare a local development environment](#prepare-a-local-development-environment)
- [Run tests before changing anything](#run-tests-before-changing-anything)
- [Use Launchpad effectively](#use-launchpad-effectively)
- [Submit your first Gerrit change](#submit-your-first-gerrit-change)
- [Respond to reviews and CI results](#respond-to-reviews-and-ci-results)
- [Write changes that work for shared libraries](#write-changes-that-work-for-shared-libraries)
- [Common beginner problems](#common-beginner-problems)
- [Find help and participate](#find-help-and-participate)
- [Complete Oslo project inventory](#complete-oslo-project-inventory)
- [A suggested first-week learning path](#a-suggested-first-week-learning-path)
- [References and maintenance](#references-and-maintenance)

## What is Oslo?

OpenStack is a collection of projects for building and operating cloud infrastructure. Its services need many of the same building blocks: configuration, logging, messaging, database access, access control, and testing utilities.

**Oslo provides reusable Python libraries for these shared needs.** Its mission emphasizes stable, consistent, documented APIs that can serve multiple projects. See the [official Oslo mission](https://governance.openstack.org/tc/reference/projects/oslo.html).

For example:

| A service needs to... | Relevant library |
| --- | --- |
| Read configuration files and command-line options | `oslo.config` |
| Produce consistent logs | `oslo.log` |
| Exchange RPC messages and notifications | `oslo.messaging` |
| Evaluate authorization rules | `oslo.policy` |
| Share common database patterns | `oslo.db` |
| Handle common string, time, and encoding operations | `oslo.utils` |

These libraries let OpenStack projects share implementations and fixes.

A small change can therefore have a wide impact. A function that looks harmless in one library may be used by several services, which makes compatibility an essential part of Oslo development.

### Package names and Python imports

The distribution name and the Python import name often differ:

```bash
python -m pip install oslo.config
```

```python
from oslo_config import cfg
```

Similarly:

```python
from oslo_log import log
from oslo_utils import strutils
```

For a first practical introduction, try the official [oslo.config quick start](https://docs.openstack.org/oslo.config/latest/configuration/quickstart.html).

## Understand the contribution tools

You will encounter several systems. Each has a different role.

| Tool or platform | Purpose |
| --- | --- |
| **Git** | Tracks source code and your local commits. |
| **OpenDev** | Hosts the repositories and development infrastructure. |
| **Gerrit** | Hosts proposed changes, discussions, reviews, and approvals. |
| **git-review** | Provides the `git review` command for submitting commits to Gerrit. |
| **Launchpad** | Tracks bugs and work items for many Oslo projects. |
| **Zuul** | Runs automated checks and controls the testing process before merge. |
| **tox** | Creates isolated environments and runs repository-defined checks locally. |
| **stestr** | Runs Python tests in projects such as `oslo.utils`. |
| **Sphinx** | Builds documentation. |
| **Reno** | Manages release-note fragments. |

The usual workflow is:

```text
Choose or report a problem
          |
          v
Create a local Git branch
          |
          v
Change code, tests, or documentation
          |
          v
Run the relevant local checks
          |
          v
Submit a commit to Gerrit
          |
          v
Respond to reviewers and CI results
          |
          v
Maintainers approve the change
          |
          v
Gate tests pass and the change merges
```

OpenStack uses Gerrit for contributions. The `oslo.utils` contribution instructions explicitly direct contributors to Gerrit and Launchpad; GitHub pull requests are not accepted there. See the [oslo.utils contribution instructions](https://github.com/openstack/oslo.utils/blob/master/CONTRIBUTING.rst).

## Choose a manageable first contribution

For a first contribution, choose a task with a clear outcome and a small affected area.

Good starting points include:

- Correcting an inaccurate documentation example.
- Adding a regression test for a confirmed bug.
- Fixing a small utility function.
- Improving an error message.
- Reproducing a bug and documenting the conditions that trigger it.
- Reviewing an existing patch and reporting what you tested.

`oslo.utils`, `oslo.config`, and `oslotest` are reasonable places to explore, depending on your Python experience and interests. Messaging, database, and distributed coordination changes may require more background or additional services.

Oslo's contributor guide recommends looking for the **`low-hanging-fruit`** tag. Before starting, check whether someone is already assigned or has proposed a fix. See the [Oslo contributor guide](https://specs.openstack.org/openstack/oslo-specs/specs/policy/contributing.html).

You can also ask the team:

> Hi! I'm new to Oslo and would like to make my first contribution. I'm comfortable with basic Python and Git. Is there a small documentation, testing, or bug-fix task you would recommend?

## Set up your accounts and identity

### Create your accounts

1. Create an [Ubuntu One account](https://login.ubuntu.com/).
2. Sign in to [OpenDev Gerrit](https://review.opendev.org/).
3. Choose your Gerrit username carefully.
4. Sign in to [Launchpad](https://launchpad.net/) to complete your bug-tracker profile.

OpenDev's Gerrit uses Ubuntu One for authentication. Your Git email must match an email registered in Gerrit. See [OpenDev account setup](https://docs.opendev.org/opendev/infra-manual/latest/gettingstarted.html#setting-up-your-gerrit-account).

Configure Git, replacing the example values:

```bash
git config --global user.name "Your Full Name"
git config --global user.email "you@example.com"
git config --global gitreview.username "your-gerrit-username"
```

### Understand the DCO sign-off

**OpenStack replaced the Contributor License Agreement with the Developer Certificate of Origin, effective 1 July 2025.** New contributions require a valid `Signed-off-by` line. Some older instructions still mention the previous CLA process. See the [official DCO transition policy](https://governance.openstack.org/tc/resolutions/20250520-replace-the-cla-with-dco-for-all-contributions.html).

Read the [Developer Certificate of Origin](https://developercertificate.org/) before signing off your work.

Use:

```bash
git commit -s
```

Git adds a line using your configured identity:

```text
Signed-off-by: Your Full Name <you@example.com>
```

This sign-off certifies your right to submit the contribution. It is separate from cryptographic commit signing.

### Configure SSH access

If you already have a suitable SSH key, you can reuse it. Otherwise, generate one:

```bash
ssh-keygen -t ed25519 -C "you@example.com"
```

Upload the **public key**, usually `~/.ssh/id_ed25519.pub`, through Gerrit's **Settings → SSH Keys**. Keep the private key on your machine.

Follow the official instructions if you use a separate key for Gerrit. See [Gerrit SSH setup](https://docs.openstack.org/contributors/common/setup-gerrit.html#set-up-ssh-keys).

## Prepare a local development environment

The following example uses `oslo.utils` on a Unix-like shell. Linux is a useful starting environment; Windows users can use WSL.

You need Git, Python, `pip`, and Python virtual-environment support. On Debian or Ubuntu, the basic packages are:

```bash
sudo apt install git python3 python3-venv
```

**Check the repository's Python requirement before continuing.** At the time of checking, `oslo.utils` development requires Python 3.11 or newer. Other repositories and stable branches may differ. See the [oslo.utils Python requirement](https://github.com/openstack/oslo.utils/blob/master/pyproject.toml).

Check your installed interpreter:

```bash
python3 --version
```

If it does not meet the requirement, install a supported interpreter first and use its executable when creating the environment below.

Create a workspace and an environment for development tools:

```bash
mkdir oslo-work
cd oslo-work

python3 -m venv .venv
source .venv/bin/activate

python -m pip install --upgrade pip
python -m pip install "tox>=4.28" git-review
```

Clone and prepare the repository:

```bash
git clone https://opendev.org/openstack/oslo.utils
cd oslo.utils

git review -s
```

`git review -s` configures the Gerrit connection and installs the commit hook that generates a `Change-Id`. Run it before creating your first commit. See [preparing a repository for Gerrit](https://docs.openstack.org/contributors/common/setup-gerrit.html#preparing-to-send-a-review).

The two `-s` options serve different purposes:

| Command | Meaning |
| --- | --- |
| `git review -s` | Set up the repository for Gerrit. |
| `git commit -s` | Add your DCO sign-off to a commit. |

When returning in a new terminal, first navigate to the `oslo-work` directory you created, then run:

```bash
source .venv/bin/activate
cd oslo.utils
```

### Explore before editing

Look for these files and directories:

| Location | What you can learn |
| --- | --- |
| `README.rst` or `README.md` | Purpose, documentation, and tracker links. |
| `CONTRIBUTING.rst` | Contribution instructions. |
| `pyproject.toml` and, where present, `setup.cfg` | Packaging, Python requirements, and tool configuration. |
| `tox.ini` | Available test environments and their commands. |
| `.stestr.conf` | Test discovery settings when stestr is used. |
| `.zuul.yaml` or `zuul.d/` | Repository CI configuration. |
| `doc/source/` | Documentation sources. |
| `releasenotes/notes/` | Reno release-note fragments. |

Many library unit tests can run without deploying OpenStack. Functional and integration checks may need a database, message broker, or another backend.

## Run tests before changing anything

First establish that your environment works.

For the checked `oslo.utils` configuration:

```bash
# List test environments
tox -l

# Run unit tests
tox -e py3

# Run style and associated checks
tox -e pep8

# Build documentation
tox -e docs
```

You can run a smaller selection while developing:

```bash
tox -e py3 -- oslo_utils.tests.test_strutils
```

Here, `tox` prepares the environment and invokes `stestr`. The argument after `--` selects matching tests.

The environment named `pep8` currently includes pre-commit checks and type checking, so its name does not describe every check it runs. **Read the actual `tox.ini` rather than assuming all Oslo repositories use identical commands.** See the [oslo.utils test configuration](https://github.com/openstack/oslo.utils/blob/master/tox.ini).

For a bug fix, aim for this sequence:

1. Reproduce the bug.
2. Add a test describing the correct behavior.
3. Confirm that the test fails with the existing implementation.
4. Apply the fix.
5. Confirm that the new test passes.
6. Run the broader relevant checks.

A useful regression test should demonstrate the reported problem and protect against its return.

## Use Launchpad effectively

For `oslo.utils`, use its [Launchpad bug tracker](https://bugs.launchpad.net/oslo.utils).

Before reporting a bug:

- Search for an existing report.
- Check the affected version or branch.
- Reduce the problem to a small reproducer.
- Compare the observed behavior with the documented behavior.

A useful report contains:

```text
Title:
Short description of the problem

Environment:
Library version or Git commit
Python version
Operating system
Relevant backend or dependency versions

Steps to reproduce:
1. ...
2. ...

Expected result:
...

Actual result:
...

Additional information:
Minimal reproducer, traceback, or relevant logs
```

If you want to work on an existing bug, read its discussion and check for an existing Gerrit change before assigning it to yourself.

**Use the tracker linked from the repository.** Tracker names do not always match repository names: for example, `stevedore` points to `python-stevedore`, while `tooz` points to `python-tooz`. See the [Stevedore README](https://github.com/openstack/stevedore/blob/master/README.rst) and [Tooz README](https://github.com/openstack/tooz/blob/master/README.rst).

## Submit your first Gerrit change

### Create a branch

For this example, start from the current development branch:

```bash
git switch master
git pull --ff-only origin master
git switch -c fix-descriptive-name
```

Make one coherent change. Include the relevant tests and documentation in the same contribution.

Before committing:

```bash
git status
git diff
git diff --check
```

Stage the intended files:

```bash
git add path/to/changed_file path/to/test_file
git diff --cached
git commit -s
```

Replace the example paths with your actual files.

### Write a helpful commit message

Explain the problem, the resulting behavior, and why the change is appropriate.

For example:

```text
Clarify timeout behavior in the configuration guide

The example does not explain how the timeout affects retries.
Document the interaction so readers can choose suitable values.
```

For a bug-related change, add the appropriate footer with the real bug number. The numbers below are examples:

| Footer | Use it when... |
| --- | --- |
| `Closes-Bug: #1234567` | The change fully fixes the bug. |
| `Partial-Bug: #1234567` | The change fixes only part of the bug. |
| `Related-Bug: #1234567` | The change is related without resolving it. |

Your sign-off comes from `git commit -s`. The Gerrit hook generates the `Change-Id`; you do not need to invent one. See [OpenStack commit-message guidance](https://docs.openstack.org/contributors/common/git.html#commit-messages).

### Upload the commit

```bash
git review
```

Open the Gerrit URL printed by the command. Check the diff, commit message, target branch, and automated results.

For practice before submitting a real Oslo change, use the official [OpenDev sandbox tutorial](https://docs.opendev.org/opendev/infra-manual/latest/sandbox.html).

### Understand changes and patch sets

A **change** is a proposal under review. A **patch set** is a revision of that proposal.

When reviewers request updates:

```bash
# Edit files and run the relevant checks

git add path/to/changed_file
git commit --amend
git review
```

**Preserve the existing `Change-Id`.** Gerrit uses it together with the repository and target branch to associate the new commit with the existing change. See [changes and patch sets](https://docs.opendev.org/opendev/infra-manual/latest/developers.html#understanding-changes-and-patch-sets).

## Respond to reviews and CI results

### Review feedback

Review is a discussion. Explain your decisions, ask when a comment is unclear, and describe how you addressed feedback.

Common labels include:

| Label | Typical meaning |
| --- | --- |
| `Code-Review +1` | A reviewer supports the change. |
| `Code-Review -1` | A reviewer requests changes. |
| `Code-Review +2` | A core reviewer approves it. |
| `Workflow +1` | An authorized reviewer approves proceeding toward merge. |

Oslo's published policy generally requires **two `+2` reviews**, with limited exceptions handled by the core team. See the [Oslo review policy](https://specs.openstack.org/openstack/oslo-specs/specs/policy/contributing.html#getting-your-patch-merged).

You can contribute reviews as a beginner. Be explicit about their scope:

> I reproduced the issue and verified that the new test fails before the fix and passes afterward. I have not reviewed the backend-specific behavior.

### CI failures

When Zuul reports a failure:

1. Open the failed job's logs.
2. Find the relevant error or traceback.
3. Determine whether the failure comes from your change, the environment, or an unrelated problem.
4. Fix your change and upload another patch set when needed.

Use `recheck` only when you have identified a reason to rerun unchanged code, such as an unrelated transient failure. Include a short explanation in the review. See [OpenDev CI troubleshooting](https://docs.opendev.org/opendev/infra-manual/latest/developers.html#automated-testing).

## Write changes that work for shared libraries

Oslo development requires attention to callers outside the repository.

When reviewing your own patch, consider:

- **Public APIs:** Does it change parameters, return values, exceptions, or defaults?
- **Configuration:** Could an existing configuration file behave differently?
- **Dependencies:** Does it require another package or a newer version?
- **State:** Does it change serialized data, persistent data, or object versions?
- **Concurrency:** Could it affect locking, timeouts, or thread safety?
- **Tests:** Do they restore configuration and other global state?

Names beginning with `_` identify private implementation details under Oslo's conventions. Use documented public interfaces when consuming another library. See the [Oslo public and private API policy](https://specs.openstack.org/openstack/oslo-specs/specs/policy/private-symbols.html).

For a significant feature or API change, discuss the design before implementing it. Oslo uses specifications for major features; the [oslo-specs repository](https://github.com/openstack/oslo-specs/blob/master/README.rst) provides templates.

### Documentation and release notes

Update documentation when you change how someone uses or configures the library.

For changes visible to deployers, consider a Reno note. Oslo's policy specifically covers configuration changes, new features, and relevant bug fixes. Internal implementation changes generally do not need deployer-facing notes. See the [Oslo release-note policy](https://specs.openstack.org/openstack/oslo-specs/specs/policy/release-note-management.html).

If a note is appropriate, install Reno in your activated tools environment and create a fragment:

```bash
python -m pip install reno
reno new describe-the-change
```

Edit the generated YAML under `releasenotes/notes/`, keep the relevant sections, and commit the fragment with the change. See [Reno usage](https://docs.openstack.org/reno/latest/user/usage.html#creating-new-release-notes).

## Common beginner problems

| Problem | What to check |
| --- | --- |
| SSH authentication fails | Gerrit username, uploaded public key, selected private key, and access to port `29418`. |
| Gerrit rejects the email identity | Compare `git config user.email` with your registered Gerrit addresses. |
| The commit lacks a `Change-Id` | Run `git review -s`, then amend the commit so the hook can add it. |
| The commit lacks a sign-off | Run `git commit --amend -s`, then upload again. |
| Updating a patch creates another change | Check whether you preserved the original `Change-Id` and target branch. |
| tox cannot find a suitable Python | Check the selected environment and repository Python requirements. |
| Dependency installation fails | Check the original installation error and the repository's constraints configuration. |
| Tests require an unavailable service | Read the functional-test instructions and identify the required backend. |

If SSH access is blocked by your network, OpenDev documents an [HTTPS alternative for git-review](https://docs.opendev.org/opendev/infra-manual/latest/developers.html#accessing-gerrit-over-https).

## Find help and participate

The Oslo team's documented communication channels are:

- **IRC:** `#openstack-oslo` on OFTC.
- **Mailing list:** `openstack-discuss`, with `[oslo]` in the subject.
- **Gerrit:** Discussions attached to the relevant change.

These channels are listed in the [Oslo contributor guide](https://specs.openstack.org/openstack/oslo-specs/specs/policy/contributing.html#communication).

When asking for help, include the command you ran, the relevant error, your Python version, and a link to the bug or review when available.

Once a change merges, ask the maintainers whether it also needs a release or a backport. Merging into the development branch and publishing a package release are separate steps.

## Complete Oslo project inventory

The official governance inventory lists **45 deliverables under the Oslo team** at the time of checking. This includes libraries, documentation tooling, templates, and supporting repositories. The categories below are for navigation. See the [official project inventory](https://governance.openstack.org/tc/reference/projects/oslo.html).

Each project name links to its source repository. Its README is a useful starting point for documentation and tracker links. Consult current repository documentation before choosing a backend or using a template.

### Libraries named oslo.*

| Project | Main purpose |
| --- | --- |
| [oslo.cache](https://opendev.org/openstack/oslo.cache) | Shared caching interfaces built around dogpile.cache. |
| [oslo.concurrency](https://opendev.org/openstack/oslo.concurrency) | Locking and external-process execution utilities. |
| [oslo.config](https://opendev.org/openstack/oslo.config) | Configuration files and command-line options. |
| [oslo.context](https://opendev.org/openstack/oslo.context) | Request-context information shared across application components. |
| [oslo.db](https://opendev.org/openstack/oslo.db) | Database connectivity and common database patterns. |
| [oslo.i18n](https://opendev.org/openstack/oslo.i18n) | Internationalization and translation utilities. |
| [oslo.limit](https://opendev.org/openstack/oslo.limit) | Quota calculation and limit enforcement support. |
| [oslo.log](https://opendev.org/openstack/oslo.log) | Standardized logging configuration, formatters, and context support. |
| [oslo.messaging](https://opendev.org/openstack/oslo.messaging) | RPC and notification messaging interfaces. |
| [oslo.metrics](https://opendev.org/openstack/oslo.metrics) | Collecting and exposing metrics from Oslo libraries. |
| [oslo.middleware](https://opendev.org/openstack/oslo.middleware) | WSGI middleware for HTTP request and response processing. |
| [oslo.policy](https://opendev.org/openstack/oslo.policy) | Role-based access-control policy evaluation. |
| [oslo.privsep](https://opendev.org/openstack/oslo.privsep) | Separating privileged operations from application code. |
| [oslo.reports](https://opendev.org/openstack/oslo.reports) | Runtime diagnostic reports, including Guru Meditation Reports. |
| [oslo.rootwrap](https://opendev.org/openstack/oslo.rootwrap) | Filtering commands that services execute with root privileges. |
| [oslo.serialization](https://opendev.org/openstack/oslo.serialization) | Serialization helpers for formats such as JSON and MessagePack. |
| [oslo.service](https://opendev.org/openstack/oslo.service) | Framework and utilities for long-running services. |
| [oslo.upgradecheck](https://opendev.org/openstack/oslo.upgradecheck) | Common building blocks for upgrade checks. |
| [oslo.utils](https://opendev.org/openstack/oslo.utils) | General utilities for strings, time, encoding, exceptions, and more. |
| [oslo.versionedobjects](https://opendev.org/openstack/oslo.versionedobjects) | Versioned objects supporting serialization and distributed-service compatibility. |
| [oslo.vmware](https://opendev.org/openstack/oslo.vmware) | Shared VMware API and operation helpers. |

### Other reusable libraries

| Project | Main purpose |
| --- | --- |
| [automaton](https://opendev.org/openstack/automaton) | State machines and transition handling. |
| [castellan](https://opendev.org/openstack/castellan) | A common key-manager interface. |
| [cursive](https://opendev.org/openstack/cursive) | OpenStack-specific digital-signature verification. |
| [debtcollector](https://opendev.org/openstack/debtcollector) | Deprecation warnings and migration patterns. |
| [etcd3gw](https://opendev.org/openstack/etcd3gw) | Python client for the etcd v3 gateway API. |
| [futurist](https://opendev.org/openstack/futurist) | Futures, executors, and asynchronous execution utilities. |
| [microversion-parse](https://opendev.org/openstack/microversion-parse) | Parsing and handling OpenStack API microversion headers. |
| [pbr](https://opendev.org/openstack/pbr) | Python packaging and build support. |
| [stevedore](https://opendev.org/openstack/stevedore) | Discovering and loading plugins through entry points. |
| [taskflow](https://opendev.org/openstack/taskflow) | Defining and executing tasks and flows. |
| [tooz](https://opendev.org/openstack/tooz) | Distributed coordination, membership, locks, and leader election. |

### Testing and diagnostics

| Project | Main purpose |
| --- | --- |
| [oslotest](https://opendev.org/openstack/oslotest) | Shared test fixtures and testing utilities. |
| [osprofiler](https://opendev.org/openstack/osprofiler) | Tracing requests across services to investigate performance. |

### Documentation and supporting repositories

| Project | Main purpose |
| --- | --- |
| [cookiecutter](https://opendev.org/openstack/cookiecutter) | Cookiecutter templates for OpenStack projects. |
| [devstack-plugin-amqp1](https://opendev.org/openstack/devstack-plugin-amqp1) | DevStack integration for AMQP 1.0 messaging setups. |
| [devstack-plugin-kafka](https://opendev.org/openstack/devstack-plugin-kafka) | Installing and configuring Kafka through DevStack. |
| [openstack-doc-tools](https://opendev.org/openstack/openstack-doc-tools) | Tools supporting OpenStack documentation. |
| [openstackdocstheme](https://opendev.org/openstack/openstackdocstheme) | Sphinx themes and extensions for OpenInfra documentation. |
| [os-api-ref](https://opendev.org/openstack/os-api-ref) | Sphinx extensions for API reference documentation. |
| [oslo-cookiecutter](https://opendev.org/openstack/oslo-cookiecutter) | Cookiecutter templates for Oslo libraries. |
| [oslo-specs](https://opendev.org/openstack/oslo-specs) | Design specifications and Oslo policies. |
| [oslo.tools](https://opendev.org/openstack/oslo.tools) | Tools for working across the Oslo community. |
| [sphinx-feature-classification](https://opendev.org/openstack/sphinx-feature-classification) | Generating driver and feature-support matrices. |
| [whereto](https://opendev.org/openstack/whereto) | Testing Apache HTTP redirect rules. |

## A suggested first-week learning path

| Stage | Practical goal |
| --- | --- |
| **Understand one library** | Read its README, try an example, and identify its public API. |
| **Prepare your environment** | Configure Gerrit, clone the repository, and run its existing tests. |
| **Choose a small task** | Find a clear bug or documentation problem and check with the team. |
| **Prepare the contribution** | Make a focused change, add appropriate tests, and inspect the diff. |
| **Submit and participate** | Upload to Gerrit, investigate CI results, and respond to feedback. |

Your first milestone is to become comfortable with the complete cycle: understanding a problem, proposing a focused change, and improving it through review.

## References and maintenance

Use these primary references when updating this guide:

- [Oslo team and deliverables](https://governance.openstack.org/tc/reference/projects/oslo.html).
- [Oslo contribution policies](https://specs.openstack.org/openstack/oslo-specs/specs/policy/contributing.html).
- [OpenStack Contributor Guide](https://docs.openstack.org/contributors/).
- [OpenDev getting started](https://docs.opendev.org/opendev/infra-manual/latest/gettingstarted.html).
- [OpenDev Developer's Guide](https://docs.opendev.org/opendev/infra-manual/latest/developers.html).
- [OpenStack DCO transition](https://governance.openstack.org/tc/resolutions/20250520-replace-the-cla-with-dco-for-all-contributions.html).
- [oslo.utils development configuration](https://github.com/openstack/oslo.utils/blob/master/pyproject.toml).
- [oslo.utils test configuration](https://github.com/openstack/oslo.utils/blob/master/tox.ini).

The `/latest/` documentation URLs and development-branch source links evolve. When revising this guide, check the project inventory, authentication workflow, contribution policies, Python requirements, and test commands, then update the review date.
