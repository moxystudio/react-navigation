# react-navigation

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][build-status-image]][build-status-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/@moxy/react-navigation
[downloads-image]:https://img.shields.io/npm/dm/@moxy/react-navigation.svg
[npm-image]:https://img.shields.io/npm/v/@moxy/react-navigation.svg
[build-status-url]:https://github.com/moxystudio/react-navigation/actions
[build-status-image]:https://img.shields.io/github/workflow/status/moxystudio/react-navigation/Node%20CI/master
[codecov-url]:https://codecov.io/gh/moxystudio/react-navigation
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/react-navigation/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/react-navigation
[david-dm-image]:https://img.shields.io/david/moxystudio/react-navigation.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/react-navigation?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/react-navigation.svg

Set of react components, hooks and providers to easily kickoff a navigation environment in web projects.

## Installation

```sh
$ npm install @moxy/react-navigation
```

This library is written in modern JavaScript and is published in both CommonJS and ES module transpiled variants. If you target older browsers please make sure to transpile accordingly.

## Motivation

Most websites have a navbar and a drawer to provide an easy access to other pages. The creation process is usually remade project after project with little to no reutilization.

By analysing a few projects, most of the logic was identical in every single one. This raised a few questions and one solution to the problem would be to have a set of react tools to simplify the process.

A concern that came from the proposed solution was that every single website has different designs for a navbar or a drawer. Although this is true, their behaviour is usually the same. So, the solution should only deal with logic and behaviours while giving total freedom of the content that is rendered.

⚠️ **Note:** If you are using this package with `[@moxy/next-layout](https://github.com/moxystudio/next-layout)`, where `Layout` components don't unmount on each page change, beware you will have to listen to router events to make sure the drawer closes even if the page change is triggered by the browser's history buttons. See [Handling router events](#handling-router-events) section to check how it can be done in Next.js projects.

## Usage

```js
import React from 'react';
import { NavigationProvider, Navbar, Drawer, useNavigation } from '@moxy/react-navigation';

const MyNavigationHelper = () => {
    const { drawer } = useNavigation();

    return (
        <>
            <span>{ `Is Drawer Open?  ${drawer.isOpen}` }</span>
            <button onClick={ drawer.open }>Open Drawer</button>
            <button onClick={ drawer.close }>Close Drawer</button>
            <button onClick={ drawer.toggle }>Toggle Drawer</button>
        </>
    );
}

const App = ({ Page, pageProps }) => (
    <NavigationProvider>
        <Navbar
            placement="top"
            behaviour="hideOnScrollDown"
            className="navbar">
            <p>This is the content of the navbar.</p>
            <MyNavigationHelper />
        </Navbar>
        <Drawer
            withOverlay
            placement="left"
            className="drawer"
            overlayClassName="overlay">
            <p>This is the content of the navbar.</p>
        </Drawer>
        <Page { ...pageProps } />
    </NavigationProvider>
);

export default App;
```

Import the styleguide base styles in the app's entry CSS file:

```css
@import "@moxy/react-navigation/dist/index.css";
```

..or in your entry JavaScript file:

```js
import '@moxy/react-navigation/dist/index.css';
```

### Router events

Taking `MyNavigationHelper` component as example:

```js
import { useRouter } from 'next/router';

const MyNavigationHelper = () => {
    const router = useRouter();

    const {
        drawer: {
            open: openDrawer,
            close: closeDrawer,
            toggle: toggleDrawer,
            isOpen: isDrawerOpen,
        }
    } = useNavigation();

    useEffect(() => {
        const handleRouteChange = () => {
            closeDrawer();
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [closeDrawer, router.events]);

    return (
        <>
            <span>{ `Is Drawer Open?  ${isDrawerOpen}` }</span>
            <button onClick={ openDrawer }>Open Drawer</button>
            <button onClick={ closeDrawer }>Close Drawer</button>
            <button onClick={ toggleDrawer }>Toggle Drawer</button>
        </>
    );
}
```

We are listening `routeChangeStart` event for the sake of this example. You can check [here](https://nextjs.org/docs/api-reference/next/router#routerevents) a complete list of the supported events for the Next.js Router.

## Styling

Each provided component accepts classNames for styling. Although there might be a need to style conditionally, some auxiliary data attributes are provided and can be styled like so:

```css
.drawer,
.drawer[data-open="false"] {
    background-color: red;
}

.drawer[data-open="true"] {
    background-color: blue;
}

.overlay,
.overlay[data-open="false"] {
    opacity: 0;
}

.overlay[data-open="true"] {
    opacity: 0.5;
}
```

## API

### NavigationProvider

A context is created to help interact with navigation elements. The `NavigationProvider` component acts as a provider to allow other consuming components to subscribe to context changes.

All consumers that are descendants of the `NavigationProvider` will re-render whenever the navigation context changes.

Any consumer component that uses the `useNavigation` hook or the `withNavigation` HOC must be descendant from this provider.

### useNavigation

Hook that returns the current state of the navigation context.

### withNavigation

HOC that provides the current state of the navigation context in the form of a prop named `navigation`.

### Navbar

`Navbar` is a component that renders a navigation bar with a few pre-available benefits. No content is rendered by default based on the uniqueness of every navbar, delegating that responsibility to the developer.

The following props are available for the `Navbar` component:

#### children

Type: `any` | Required: `false`

The content of the navbar.

#### placement

Type: `string` | Options: `top`, `right`, `bottom`, `left` | Default: `top`

The placement of the navbar in relation to the viewport.

#### behaviour

Type: `string` | Options: `hideOnScrollDown` | Required: `false`

A predefined navbar behaviour.

#### className

Type: `string` | Required: `false`

A className to apply to the component.

### Drawer

`Drawer` is a component that renders a drawer with a few pre-available benefits. No content is rendered by default based on the uniqueness of every drawer, delegating that responsibility to the developer.

The following props are available for the `Drawer` component:

#### children

Type: `any` | Required: `false`

The content of the drawer.

#### placement

Type: `string` | Options: `top`, `right`, `bottom`, `left` | Default: `left`

The placement of the drawer in relation to the viewport.

#### withOverlay

Type: `boolean` | Default: `true`

An overlay that renders together with the drawer. When clicked, closes the drawer.

#### lockBodyScroll

Type: `boolean` | Default: `true`

Disables body scroll whenever the drawer is open. It keeps the drawer scroll if needed.

#### className

Type: `string` | Required: `false`

A className to apply to the drawer.

#### overlayClassName

Type: `string` | Required: `false`

A className to apply to the overlay.

## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```

## Demo

A demo [Next.js](https://nextjs.org/) project is available in the [`/demo`](./demo) folder so you can try out this component.

First, build the `react-navigation` project with:

```sh
$ npm run build
```

To run the demo, do the following inside the demo's folder:

```sh
$ npm i
$ npm run dev
```

*Note: Everytime a change is made to the package a rebuild is required to reflect those changes on the demo.*

## FAQ

### I can't override the component's CSS, what's happening?

There is an ongoing [next.js issue](https://github.com/zeit/next.js/issues/10148) about the loading order of modules and global CSS in development mode. This has been fixed in [v9.3.6-canary.0](https://github.com/zeit/next.js/releases/tag/v9.3.6-canary.0), so you can either update `next.js` to a version higher than `v9.3.5`, or simply increase the CSS specificity when overriding component's classes, as we did in the [`demo`](./demo/pages/index.module.css), e.g. having the page or section CSS wrap the component's one.

## License

Released under the [MIT License](https://www.opensource.org/licenses/mit-license.php).
