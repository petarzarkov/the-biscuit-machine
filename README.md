# Petar Zarkov's Biscuit Machine

## Showcasing

<p align="left">
  <a href="https://vitejs.dev/" target="blank"><img title="ViteJS" alt="ViteJS" width="26" src="https://vitejs.dev/logo.svg" /></a>
  <a href="https://chakra-ui.com/" target="blank"><img title="ChakraUI" alt="ChakraUI" width="26" src="https://chakra-ui.com/favicon.png" /></a>
  <a href="https://reactjs.org/" target="blank"><img title="React" alt="React" width="26" src="https://reactnative.dev/img/pwa/manifest-icon-512.png" /></a>
  <a href="https://www.javascript.com/" target="blank"><img title="JavaScript" alt="JavaScript" width="26" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" /></a>
  <a href="https://www.typescriptlang.org/" target="blank"><img title="Typescript" alt="TypeScript" width="26px" src="https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae" /></a>
</p>

## Responsiveness
- supports large, mid, small screens, including mobile

## Requirements
Design a system to control a Biscuit Machine to the 
following specification:
- When switched on, the machine must wait for the 
oven to warm up before starting the conveyor belt.
- Biscuits must be cooked at a temperature of 220 - 
240°C (the oven will overheat if the heating element is 
on all the time).
- If the operator selects “Pause", all movement must be 
stopped immediately but the oven should be kept 
heated. 
- When “Off” is selected, the machine should be shut 
down leaving nothing on the conveyor belt.

| Device        | Inputs                 | Outputs                    |
| ------------- |:-------------:         | -----:                     |
| Switch        | None                   | On / Off / Pause           |
| Motor         | On/Off                 | One “pulse” per revolution |
| Extruder      | Pulse                  | None                       |
| Stamper       | Pulse                  | None                       |
| Oven          | Heating Element On/Off | Temperature                |


### Tech Requirements
- NodeJS >= 16.x.x

### Setup

```bash
npm install
npm start
```

### Github actions

- build on push to any branch
- push to gh-pages branch on merge to main

### Play it here

<a href="https://petarzarkov.github.io/the-biscuit-machine" target="_blank">Open</a>
