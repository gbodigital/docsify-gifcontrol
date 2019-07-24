import { install } from './gifcontrol.js'
import './gifcontrol.css'

if (!window.$docsify) {
  window.$docsify = {}
}

if (!window.$docsify.plugins){
  window.$docsify.plugins = {}
}

window.$docsify.plugins = [].concat(install, window.$docsify.plugins)