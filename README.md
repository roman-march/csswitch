# CSSwitch

**CSSwitch** - Small CSS library for switch-transitions.<br />

## Download

npm:
```bash
npm install csswitch --save
```
yarn:
```bash
yarn add csswitch
```

## Usage

```jsx
import CSSwitch from "csswitch";

const App = ({ state }) => {
  return (
    <CSSwitch as="ul" switchKey={state}>
      {state === 0 && <li className="item">2000</li>}
      {state === 1 && <li className="item">2001</li>}
      {state === 2 && <li className="item">2002</li>}
    </CSSwitch>
  )
}
```
```scss
.item {
  @include init {
    opacity: 0;
  }
  
  @include in {
    opacity: 1;
    transition: opacity .5s;
  }

  @include out {
    opacity: 0;
    transition: opacity .25s;
  }
}
```

<details>
<summary>I <b>recommend</b> using SASS mixins for shorter code</summary>

```scss
@mixin init {
  &[class$="init"] {
    @content;
  }
}

@mixin in {
  &[class$="enter"] {
    @content;
  }
}

@mixin out {
  &[class$="exit"] {
    @content;
  }
}
```
</details>

<p />

<details>
<summary>Classic CSS code without SASS</summary>

```css
[class$="init"].item {
  opacity: 0;
}

[class$="enter"].item {
  opacity: 1;
  transition: opacity .5s;
}

[class$="exit"].item {
  opacity: 0;
  transition: opacity .25s;
}
```
</details>
