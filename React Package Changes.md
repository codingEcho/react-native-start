# React Package Changes

In React 0.14 for Web we started splitting up the React package into two packages `react` and `react-dom`.
Now I'd like to make this consistent in React Native. The new package structure would be...

## "react":
- Children
- Component
- PropTypes
- createElement
- cloneElement
- isValidElement
- createClass
- createFactory
- createMixin

## "react-native":

- hasReactNativeInitialized
- findNodeHandle
- render
- unmountComponentAtNode
- unmountComponentAtNodeAndRemoveContainer
- unstable_batchedUpdates
- View
- Text
- ListView
- ...

**and all the other native components.**

So for a lot of components you actually have to import both packages.
```javascript
var React = require('react');
var { View } = require('react-native');
var Foo = React.createClass({
render() { return <View />; }
});
```
However, for components that doesn't know anything about their rendering environment just need the `react` package as a dependency.
Currently a lot of these are accessible from both packages but we'd start issuing warnings if you use the wrong one.
This would be a little spammy so ideally we would have a simple codemod script that you can run on your imports to clean them up.
E.g. something that translates existing patterns like:

```javascript
var React = require('react-native');
var { View } = React;
```

into:
```javascript
var React = require('react');
var { View } = require('react-native');
```
If anyone wants to write and share that script with the community, that would be highly appreciated.
We can start promoting it right now before we deprecate it.
