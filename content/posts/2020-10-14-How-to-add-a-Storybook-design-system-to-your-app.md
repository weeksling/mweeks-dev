---
templateKey: blog-post
title: How (& Why) to Add a StorybookJS Design System to your existing React Application in 10 Minutes
date: 2020-10-14
description: >-
  Adding StorybookJS to your application shouldn't be some month-long endeavor. Instead, you should add the basic configuration and setup now, with a few simple examples, and improve your codebase incrementally over time.
featuredpost: true
featuredimage: /img/git_commit_2x.png
tags:
  - development
  - storybook
  - react
---

# How (& Why) to Add a StorybookJS Design System to your existing React Application in 10 Minutes

## Adding StorybookJS to your application shouldn't be some month-long endeavor. Instead, you should add the basic configuration and setup now, with a few simple examples, and improve your codebase incrementally over time.

As you build any React application, you will undoubtedly get to the point where your application reuses components across multiple screens and views. In fact, if you're properly following atomic design, then you will probably get to this point almost immediately.

StorybookJS is the perfect tool for documenting and visually testing components in your codebase. 

- **It makes it easier to see what components are available** when a developer is either entering the project, or checking some new changes.
- **It makes modifying components faster**, without having to load the entire application to test simple changes.
- **Building your components in this way enables you to write cleaner components**, because it enables you to be intentional in the way you build your components' API.

Sadly, many teams hold off on adding Storybook to their application for far too long because they think that they have to move their entire application over to Storybook at once.

Not only is this untrue, but it is an anti-goal. Why?  

1. many components will be overly complicated and will not benefit from being added to Storybook immediately.
2. Developers currently working with a component will have its use-cases and context in mind, so they will know what makes sense. They should decide whether and how to add it.

> When adding any developer tooling, you should always do so incrementally.

So, in order to get started and *enable our teams as quickly as possible* we should spend a minimal amount of time setting it up, with the most simplistic examples so that you can learn and develop best practices over time.

To begin using Storybook today, add your simplest components (your "atoms") and go form there.

# How do we get started?

## First, Set-up the library

This means following the getting started guide. TL;DR use `npx sb init` to add storybook boilerplate config to your repo.

This will probably require some finagling on your end if you use a custom webpack, etc, but the general set-up should still be quite simple.

## Second, add some trivial stories for atoms

These should be the absolute simplest components. You can migrate a few if you have time, but since I was our team was in crunch mode trying to deliver on a new product, I focussed on adding just a single example.

**Some suggestions:** Typography and Buttons are effectively the easiest. No matter what you're working on, I'm sure you have some way of sharing typography styles across your application (globally, styled-components, etc) just treat this as nothing more than the easiest way to document your headings (h1–h6) and various text elements however you would actually use them in your application.

```jsx
// Typography.stories.js
import { H1, H2, H3, H4, H5, H6 } from './Typography';

export default {
	title: 'Section/Component',
  component: Component
}

export const header1 = () => <H1>Example Text</H1>
export const header2 = () => <H2>Example Text</H2>
export const header3 = () => <H3>Example Text</H3>
export const header4 = () => <H4>Example Text</H4>
export const header5 = () => <H5>Example Text</H5>
export const header6 = () => <H6>Example Text</H6>
```

**Congratulations! You now have a Storybook design system for your application.**

---

# Migrate non-trivial components as you work

Whenever you are updating the design of a component, it is good practice to add a story to Storybook for it. In 80% of cases, it takes just a few minutes to add a `*.stories.js`

```jsx
// Component.stories.js
import Component from './Component';

export default {
	title: 'Section/Component',
  component: Component
}

export const example = () => <Component />
```

If a story has any complications, like dependency on a context you haven't had to mock yet, or some other mysterious issue (they do occasionally crop up) leave it to your best judgement to making it work, versus completing your work.  If it's just some small content change on some page, then it's probably not worth the distraction.

You have two options:

## Refactor your components and export a stateless version

This is often the best approach, because these sort of outside dependencies are often done unintentionally, because they were not being built with re-use or modularity in mind. The time spent refactoring could make it easier to demonstrate hard-to-access states in components, and will effectively serve as a set of visual unit tests for your components.

## Work with what you have and make a provider for it

This could either be a mock, or even an actual instance of the dependency. This means you will be displaying the components similarly to how they are used in the application, and will likely be the easiest way to get it working 

For example, let's you are working on a React/Redux application and want to add a page component that contains nested connected components, and perhaps some React Router links. This would require you to include a Redux context and React Router context:

```jsx
// Page.stories.js
import { Provider } from 'react-redux';
import Store from '../store';

import Page from './Page';

export default {
	title: 'Section/Component',
  component: Component,
	decorators: [
		Story => (
        <MemoryRouter initialEntries={['/']}>
            <Story {...context} />
        </MemoryRouter>
    ),
		Story => (
        <Provider store={store}>
            <Story {...context} />
        </Provider>
    )
	]
}

export const example = () => <Page />
```

You'll notice that I've done this with decorators, which is a pretty clean way to handle across multiple stories, or to add multiple providers.

To display different states, you can dispatch simple events yourself:

```jsx
// Header.stories.js
import { MemoryRouter } from 'react-router';
import { Provider, useDispatch } from 'react-redux';
import Store from '../store';
import { userLoginSuccess, userLogout } from '../../store/actions';

import Header from './Header';

export default {
	title: 'Section/Component',
  component: Component,
	decorators: [
		Story => (
        <MemoryRouter initialEntries={['/']}>
            <Story {...context} />
        </MemoryRouter>
    ),
		Story => (
        <Provider store={store}>
            <Story />
        </Provider>
    )
	]
}

export const header = (args) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(userLogout())
    })

    return (
        <Header {...args} />
    )
}

header.args = { }

export const headerWithLogin = (args) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(userLoginSuccess(adaptResponseToUser(args.userResponse)))
    })

    return (
        <Header {...args} />
    )
}

headerWithLogin.args = {
    userProfile: {
			firstName: 'John',
			lastName: 'Doe'
		}
}
```

You'll notice that I had to dispatch a logout action here. This is because, in this case, my stories each share the same global instance of store. However, if we were to take this a step further and mock our store, then we could create a reset method. In this case, I didn't have the time or need for a mock, and I want to keep things simple, so I simply used my existing store.

Remember, we're trying to be pragmatic here. We just want a single pristine example of how our component is used.




# So please go out there and add Storybook to your app today. It only takes ~10 minutes, and will make your entire dev flow better over time.