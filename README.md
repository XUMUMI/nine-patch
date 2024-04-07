# nine-patch
A simple nine-patch image reader for javascript.

## Usage
Before using the nine-patch, you need to import the NinePatch class from the package. 
Then you must create a new instance of the NinePatch class and call the init method to load the image. 
After the image is loaded, you can call the draw method to draw the image on the element.
Init method will return a promise, you can use the then method to do something after the image is loaded.
```javascript
import { NinePatch } from '@xumumi/nine-patch'

const ninePatch = new NinePatch(url);
ninePatch.init().then(() => this.ninePatch.draw(element))
```
element: The element to draw the image on.
url: The url of the nine-patch image.

if you want to get the image base64 data, you can use the following code:
```javascript
import { NinePatch } from '@xumumi/nine-patch'

const ninePatch = new NinePatch(url);
ninePatch.init().then(() => {
  const base64 = ninePatch.toBase64();
  // do something with the base64 data
})
```

You do not need to repeatedly call the init method to draw the image on multiple elements.
```javascript
import { NinePatch } from '@xumumi/nine-patch'
const ninePatch = new NinePatch(url);
await ninePatch.init();
ninePatch.draw(element1);
ninePatch.draw(element2);
```

If element size is changed, you can call the draw method to redraw the image.
```javascript
function onResize() {
  ninePatch.draw(element);
}
```

## Install
```bash
npm i @xumumi/nine-patch
```

## Example
Clone the repository and run the following commands:
```bash
npm install
npm run dev
```
Then open the browser and visit `http://localhost:5173`.

## Reference
- [Android 9-patch image](https://developer.android.com/guide/topics/graphics/drawables#nine-patch)

## License
[MIT](https://opensource.org/licenses/MIT)
