# nine-patch
A simple nine-patch image reader for javascript.

## Usage
```javascript
import { draw9PatchImage } from 'nine-patch.js'
draw9PatchImage(element, url).then();
```
element: The element to draw the image on.
url: The url of the nine-patch image.

if you want to get the image base64 data, you can use the following code:
```javascript
import { get9PatchBase64Url } from 'nine-patch.js'
get9PatchBase64Url(srcUrl, width, height).then((base64Url) => {
    // do something with the base64 url
});
```

## Install
```bash
npm install nine-patch
```

## Example
Download the example and run the following command:
```bash
npm install
npm run dev
```
Then open the browser and visit `http://localhost:5173`.

## Reference
- [Android 9-patch image](https://developer.android.com/guide/topics/graphics/drawables#nine-patch)

## License
[MIT](https://opensource.org/licenses/MIT)
