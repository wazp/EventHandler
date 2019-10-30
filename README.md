# EventHandler

Quick and dirty Event Handler singleton that handles namespacing of events.

At the moment it only handles native events

## Please note
You will need to run through babel and possibly polyfill yourself, as we do not transpile this for you at all.

How to use:
```javascript
import { EventHandler } from 'EventHandler'

// works with NodeList, both with one and multiple elements
const mySingleElement = document.querySelector(`#uniqueID`)
const myMultipleElements = document.querySelectorAll(`.my-elements`)

EventHandler.addListener(mySingleElement, `click.singleElements`, clickEvent)
EventHandler.addListener(myMultipleElements, `click.multipleElements`, clickEvent)

// also works with HTMLCollections
const myId = document.getElementById(`#anotherUniqueID`)
const myClasses = document.getElementsByClassName('.my-other-elements')

EventHandler.addListener(myId, `click.myId`, clickEvent)
EventHandler.addListener(myClasses, `click.myClasses`, clickEvent)

// you can also send in a selector directly
EventHandler.addListener(`#myId .classInside`, `click.mySelector`, clickEvent)
```
