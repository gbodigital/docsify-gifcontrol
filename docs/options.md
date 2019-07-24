# Configuration Options

## Global Config

You can set options globally that will be applied across your entire Docsify site unless [overridden by an inline option](#inline-config) by setting the `gifcontrol` object in your Docsify configuration. Below is an example with the default options.

```javascript
window.$docsify = {
  gifcontrol: {
    mode: 'hover',
    loadingWidth: '300px',
    loadingHeight: '200px',
    overlayColor: 'rgba(255, 255, 255, 0.7)',
    iconColor: 'rgba(45, 140, 240, 0.8)',
    playIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"/></svg>',
    errorIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>',
    errorText: "Error loading image",
    errorTextColor: "rgb(150, 150, 150)",
    spinnerBarColor: 'rgb(45, 140, 240)',
    spinnerTrackColor: 'rgba(45, 140, 240, .3)',
  }
}
```

## Inline Config

You can set options for specific GIFs directly inline by appending them to the title component of the image markdown. For example, the markdown below will set the mode to 'click' overriding the global option of hover.

```markdown
![](charlie.gif "-gifcontrol-mode=click;")
```

#### Option Format

Every option available in the global config is available as an inline option with the format `-gifcontrol-{optionName}={value};`. Options must end in a semicolon to be properly parsed. Do not use quotes for strings in option values.

#### Excluding images

One inline option that is not available globally is `-gifcontrol-disabled`. Adding this option will disable the overlay and play/pause functionality. If this option is present all other options will be ignored.

## Options

### mode

When set to `hover`, when a user's mouse enters the element, the overlay will disappear and the GIF will start to play. When the user's mouse exists the element, the GIF will pause and the overlay will appear.

When set to `click`, the overlay will disappear and the GIF will start to play only after a user clicks on the element. The user can click again to pause playback and the overlay will reappear. Any value passed other than `click` will revert back to `hover`.

| Default | Options | Inline |
|---------|---------|--------|
| `hover` | `hover` or `click` | `-gifcontrol-mode={value}`

### loadingWidth

Width of the element while the GIF is loading or if there is an error during loading.

The overlay and all elements will be automatically sized to GIF after it loads. However, before it loads or if there is an error you can customize the size using this option along with loadingHeight.

| Default | Options | Inline |
|---------|---------|--------|
| `300px` | Valid CSS size in `px` or `%` | `-gifcontrol-loadingWidth={value}`

### loadingHeight

Height of the element while the GIF is loading or if there is an error during loading.

The overlay and all elements will be automatically sized to GIF after it loads. However, before it loads or if there is an error you can customize the size using this option along with loadingWidth.

| Default | Options | Inline |
|---------|---------|--------|
| `200px` | Valid CSS size in `px` or `%` | `-gifcontrol-loadingHeight={value}`

### overlayColor

The color of the overlay background. Any valid CSS color including hex code, RGB, RGBA, and HSL will work.

| Default | Options | Inline |
|---------|---------|--------|
| `rgba(255, 255, 255, 0.7)` | Any valid CSS color | `-gifcontrol-overlayColor={value}`

#### Example

```markdown
<!-- Dark Overlay -->
![](charlie.gif "-gifcontrol-overlayColor=rgba(0,0,0,0.7);")
```

![](charlie.gif "-gifcontrol-overlayColor=rgba(0,0,0,0.7);")

### iconColor

The color of the play and error icons. Any valid CSS color including hex code, RGB, RGBA, and HSL will work.

| Default | Options | Inline |
|---------|---------|--------|
| `rgba(45, 140, 240, 0.8)` | Any valid CSS color | `-gifcontrol-iconColor={value}`

#### Example

```markdown
<!-- Red Icons -->
![](charlie.gif "-gifcontrol-iconColor=#FF0000;")
```

![](charlie.gif "-gifcontrol-iconColor=#FF0000;")

### playIcon

The SVG icon to use for the play icon. The value should be a self contained SVG element. If using the inline option you will need to escape double-quotes or convert them to single quotes.

| Default | Options | Inline |
|---------|---------|--------|
| See [Config Example](#global-options) | A valid SVG tag | `-gifcontrol-playIcon={value}`

#### Example

```markdown
<!-- Heart Play Icon -->
![](charlie.gif "-gifcontrol-playIcon=<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z\"/></svg>;")
```

![](charlie.gif "-gifcontrol-playIcon=<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z\"/></svg>;")


### errorIcon

The SVG icon to use for the error icon. The value should be a self contained SVG element. If using the inline option you will need to escape double-quotes or convert them to single quotes.

| Default | Options | Inline |
|---------|---------|--------|
| See [Config Example](#global-options) | A valid SVG tag | `-gifcontrol-errorIcon={value}`

#### Example

```markdown
<!-- Thumbs Down Error Icon -->
![](this-file-doesnt-exist.gif "-gifcontrol-errorIcon=<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z\"/></svg>;")
```

![](this-file-doesnt-exist.gif "-gifcontrol-errorIcon=<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z\"/></svg>;")

### errorText

Text display to the user when an image fails to load or another problem happens. Cannot include semicolons.

| Default | Options | Inline |
|---------|---------|--------|
| `Error loading image` | Any string | `-gifcontrol-errorText={value}`

#### Example

```markdown
<!-- Custom error text -->
![](this-file-doesnt-exist.gif "-gifcontrol-errorText=Oh no! Something went wrong;")
```

![](this-file-doesnt-exist.gif "-gifcontrol-errorText=Oh no! Something went wrong;")


### errorTextColor

The color of the error message. Any valid CSS color including hex code, RGB, RGBA, and HSL will work.

| Default | Options | Inline |
|---------|---------|--------|
| `rgb(150, 150, 150)` | Any valid CSS color | `-gifcontrol-errorTextColor={value}`

#### Example

```markdown
<!-- Red error text -->
![](this-file-doesnt-exist.gif "-gifcontrol-errorTextColor=#ff0000;")
```

![](this-file-doesnt-exist.gif "-gifcontrol-errorTextColor=#ff0000;")


### spinnerBarColor

The color of the dark bar rotating in the loading spinner. Any valid CSS color including hex code, RGB, RGBA, and HSL will work.

| Default | Options | Inline |
|---------|---------|--------|
| `rgb(45, 140, 240)` | Any valid CSS color | `-gifcontrol-spinnerBarColor={value}`

#### Example

```markdown
<!-- Red bar color -->
![](load-forever.gif "-gifcontrol-spinnerBarColor=#ff0000;")
```

<!-- Raw HTML used here to show an example of what the spinner would look like -->
<div style="width: 300px; height: 200px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
  <div class="gifcontrol-loading-spinner" style="border-color: rgba(45, 140, 240, .3); border-top-color: #ff0000;"></div>
</div>

### spinnerTrackColor

The color of the background track in the loading spinner. Any valid CSS color including hex code, RGB, RGBA, and HSL will work.

| Default | Options | Inline |
|---------|---------|--------|
| `rgba(45, 140, 240, .3)` | Any valid CSS color | `-gifcontrol-spinnerTrackColor={value}`

#### Example

```markdown
<!-- Light red track background color -->
![](load-forever.gif "-gifcontrol-spinnerTrackColor=rgba(255,0,0,0.3);")
```

<!-- Raw HTML used here to show an example of what the spinner would look like -->
<div style="width: 300px; height: 200px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
  <div class="gifcontrol-loading-spinner" style="border-color: rgba(255,0,0,0.3); border-top-color: rgb(45, 140, 240);"></div>
</div>


## Spinner Styles

You can further customize the loading spinner by changing the styles as defined in the style sheet. See below for the default definitions:

```css
.gifcontrol-loading-spinner {
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 3px solid;
  border-radius: 50%;
  animation: page-spinner-spin 1s ease-in-out infinite;
}

@keyframes page-spinner-spin {
  to {
    transform: rotate(360deg);
  }
}
```

?> `border-color` and `border-top-color` will be overridden by the inline JavaScript CSS that is appended based on [spinnerBarColor](#spinnerBarColor) and [spinnerTrackColor](#spinnerTrackColor)