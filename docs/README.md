# docsify-gifcontrol

!> This module is in early development. It is not recommended to use this in a production system

A docsify plugin that adds play controls to GIFs

## Example

![](charlie.gif)

## Quick Start

> Check out the [docs](https://github.com/gbodigital/docsify-gifcontrol/tree/master/docs) folder for a full example

Add the CSS file to the top of your Docsify index.html
```html
<link rel="stylesheet" href="//unpkg.com/docsify-gifcontrol/dist/docsify-gifcontrol.css">
```

Add the JavaScript file below your Docsify script tag
```html
<script src="//unpkg.com/docsify-gifcontrol/dist/docsify-gifcontrol.js"></script>
```

Add a GIF in your markdown
```markdown
![](docs/charlie.gif)
```

## Attributions

- This plugin uses a modified version of [gifler](https://github.com/themadcreator/gifler) written by Bill Dwyer under [Apache 2.0 License](https://opensource.org/licenses/Apache-2.0) to render GIFs to an HTML canvas element
- This plugin uses [omggif](https://github.com/deanm/omggif) written by Dean McNamee under [MIT License](https://opensource.org/licenses/MIT) to load GIF file data 
- This plugin uses the play-circle SVG [FontAwesome Free Icon](https://fontawesome.com) which is licensed under the [Creative Commons 4.0 BY License](https://creativecommons.org/licenses/by/4.0/)

## License

> The original code in this plugin is under the MIT License. Please see licenses for dependent libraries and artwork in the Attributions section.

MIT License

Copyright (c) 2019 GBO Digital, LLP

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

