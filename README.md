![Alt text](/logo.png?raw=true "Northenlight")
<br />
<br />
<br />
<br />
<br />
## About Northenlight 0.0.1
Stand-alone javascript driven layout positioning library for mobile (Android, iOS, etc.) and desktop in about 6k minified.

Designer friendly. No JavaScript skills needed. Just plain CSS and HTML.

## How does it work?
Northenlight use javascript to calculate the css position of absolute elements.

## Installation

Add the line bellow in your css declarations between head tag.
```html
<link href="css/main.css" rel="stylesheet">
```

Add thoses line at the end of the body tag.
```html
<script src="js/northtenlight.js"></script>
<script>
  northenlight.init();
</script>
```

Add Northenlight atributes to your html elements in order to archive the look needed.

The exemple bellow will horizontaly stack p elements inside, and dock the div at the bottom right of his container:
```html
<div nl-canvas="h-stack" nl-valign="bottom" nl-halign="right">
    <p>first</p>
    <p>second</p>
    <p>third</p>
</div>
```

Set every size, margin, padding and styles in the tradidtional css way. Northenlight will use thoses information to fit everything together.


## Documentation
#### Alignement
```html
<div nl-valign="bottom" nl-halign="left">
```
###### nl-valign
Vertical alignement relatif to his parent.

| Value   | Decription                                                                  |
|---------|-----------------------------------------------------------------------------|
| top     | The top of the element is aligned with the top of the parent element.       |
| bottom  | The bottom of the element is aligned with the bottom of the parent element. |
| middle  | The element is placed in the middle of the parent element.                  |

###### nl-halign
Horizontal alignement relatif to his parent.

| Value   | Decription                                                                 |
|---------|----------------------------------------------------------------------------|
| left    |  The left of the element is aligned with the left of the parent element.   |
| right   |  The right of the element is aligned with the right of the parent element. |
| center  |  The element is placed in the center of the parent element.                |

#### Canvas
```html
<div nl-canvas="h-stack">
```
###### nl-canvas
| Value   | Decription                                       |
|---------|--------------------------------------------------|
| h-stack | childs elements should be horizontally stacked. |
| v-stack | childs elements should be vertically stacked.   |


## Live demo
