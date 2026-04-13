---
templateKey: blog-post
title: Write better commits with semantic commits
date: 2020-05-12T11:20:41.652Z
description: >-
  Good commits can make the difference between a well-maintained product, and a
  terrible product. Well-written commits following a standardized format will
  enable viewers of your codebase to easily understand the type of change, what
  modules it affected, and why it occurred. Below, I will outline my format for
  commits, based on the Semantic Commits style popularized by the AngularJS
  team.
featuredpost: true
featuredimage: /img/git_commit_2x.png
tags:
  - git
  - best practices
---
# Why do you want better commits?
Most people don't start thinking about their commits when they first start development (I get it, there's a lot going on and a lot to learn)

But commits become **especially** important when you're a part of a team.

When you enter a new repository, you want to be able to see how the project has developed over time. If you were to see commits like this:
```
Fix the thing
Update styles
Add the thing
```
(Note, these are actually not the worst examples—I'm sure you've seen worse)

You likely won't be able to understand what happened, without reading the code changes in a commit itself.

However, contrast those with these commits:
```
fix(blog): Imported posts formatted correctly with new styles
feat(blog): Update styles to reflect new design
feat(blog): Add blog feed to site.
```

Looks great, so how do we do it?

# How to write a semantic commit
The semantic commit contains 4 parts:
  - The type of commit
  - The Scope of the commit (optional, but often nice to have)
  - The actual content of the commit
  - An optional body, for more description. Good for larger commits.

Here's how it works:
```
<type>(<scope>): <description>
  <Optional Body>
```

So in our first example above, we might create:
```
feat(blog): Add blog feed to site
  Add the markdown plugin, generate pages, and create blog template.
```

## The type
You can use your own types, but here are the defaults: 
 - **feat**: a new feature, or change to existing feature.
 - **fix**: Fixing a bug or known issue in code.
 - **test**: Adding additional tests for existing features.
 - **chore**: Updating build tools, like webpack, gulp, ascripts, etc.
 - **docs**: Update to documentation like README

## The scope
Your scope can be as granular as you'd like and will likely change based on the complexity of the project. If you're just starting off a project, you could omit the scope, but I highly recommend you consider it, because it forces you to think very clearly about what you're changing.

## The description
You want to summarize your commit with a single line. If you can't, then you probably want to consider breaking the commit down into smaller pieces to make the work logical and self-contained.

## The (optional) body
A single line is good for summary, but sometimes you want to add additional detail so that readers can see more about *what* you changed now that they know *why* you changed it. 

# Conclusion
Writing better commits will help you write better code. Simple practices like this force you into a mindset of craftsmanship and self-documenting projects.

### Want to take it further?
Consider reading the original source [The Karma Commit Message Format](http://karma-runner.github.io/4.0/dev/git-commit-msg.html) or this newer resource [The Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/).

Once you're going with semantic commits, you might want to enforce it as a standard on your projects! For something like this, you can use [Commitizen](https://github.com/commitizen/cz-cli)(for validation) and [Husky](https://github.com/typicode/husky) (for pre-commit hooks).

I will be following up with a guide on using pre-commit hooks to do linting, testing, and more in a future article.

Til then, happy coding.

May your code be functional, readable, and well-used.
