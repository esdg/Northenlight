![Alt text](/logo.png?raw=true "Northenlight")
============
## About Northenlight 0.0.1
Stand-alone javascript driven layout positioning library for mobile (Android, iOS, etc.) and desktop in about xxk minified.

Designer friendly. No JavaScript skills needed. Just plain CSS and HTML.

## How does it work?
Northenlight use javascript to calculate the css position of absolute elements.

## Installation

Add the line bellow in your css declarations between head tag.
```
<link href="css/main.css" rel="stylesheet">
```

Add thoses line at the end of the body tag.
```
<script src="js/northtenlight.js"></script>
<script>
  northenlight.init();
</script>
```

Add Northenlight atributes to your html elements in order to archive the look needed.

The exemple bellow will horizontaly stack p elements inside, and dock at the bottom right of his container:
```
<div nl-canvas="h-stack" nl-valign="bottom" nl-halign="right">
    <p>first</p>
    <p>second</p>
    <p>third</p>
</div>
```
## Documentation
#### Alignement
```
<div nl-valign="bottom" nl-halign="left">
```
###### nl-valign
| Value   | Decription |
|---------|------------|
| top     |            |
| bottom  |            |
| middle  |            |

###### nl-halign
| Value   | Decription |
|---------|------------|
| left    |            |
| right   |            |
| center  |            |

#### Canvas
```
<div nl-canvas="h-stack">
```
###### nl-canvas
| Value   | Decription |
|---------|------------|
| h-stack |            |
| v-stack |            |


## Demo
