## `@mngis/mapping-ui`


### How to use

```js
import { widgets } from '@mngis/mapping-ui';

async function addWidget(){
  // wait for the esri-loader to resolve
  await widgets.ready;

  // now that it is loaded, it is safe to call functions
  widgets.addBasemapToggler();
}
```