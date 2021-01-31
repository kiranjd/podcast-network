// Constants `screens` (from extension.js) and `reducer` (from index.js)
// are exported via named export
// It is important to use those exact names

// export everything from extension.js
export * from "./extension";

import reducer from "./reducer";

export { reducer };

// list of exports supported by shoutem can be found here: https://shoutem.github.io/docs/extensions/reference/extension-exports
