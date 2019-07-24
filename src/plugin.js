import { GIFLoader } from './gifloader'

const matchesSelector = Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector

const defaultOptions = {
  mode: 'hover',
  overlayColor: 'rgba(255, 255, 255, 0.7)',
  iconColor: 'rgba(45, 140, 240, 0.8)',
  playIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"/></svg>',
  errorIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>',
  errorText: "Error loading image",
  errorTextColor: "rgb(150, 150, 150)",
  spinnerTrackColor: 'rgba(45, 140, 240, .3)',
  spinnerBarColor: 'rgb(45, 140, 240)',
  loadingWidth: '300px',
  loadingHeight: '200px',
}

export function install(hook, vm) {
   hook.doneEach(_ => {
    let allElements = Array.apply(null, document.querySelectorAll('.markdown-section img:not(.emoji):not([data-gifcontrol-disabled])'))
    let elms = allElements.filter(elm => elm.src.includes('.gif') && !elm.title.includes("-gifcontrol-disabled"))
    elms = elms.filter(elm => matchesSelector.call(elm, 'a img') === false)
    elms.forEach(elm => {
      var source = elm.src


      let options = Object.assign({}, defaultOptions, vm.config.gifcontrol, parseOptions(elm.title))


      var container = document.createElement('div')
      container.classList.add('gifcontrol-canvas')
      container.classList.add('gifcontrol-loading')
      container.style.fill = options.iconColor
      container.style.stroke = options.iconColor
      container.style.width = options.loadingWidth
      container.style.height = options.loadingHeight
      container.style.maxWidth = "100%"
      if(options.mode === 'click'){
        container.style.cursor = 'pointer'
      }

      var loadingDiv = document.createElement('div')
      loadingDiv.classList.add('gifcontrol-loading-element')
      loadingDiv.style.backgroundColor = options.overlayColor
      var loadingSpinner = document.createElement('div')
      loadingSpinner.classList.add('gifcontrol-loading-spinner')
      loadingSpinner.style.borderColor = options.spinnerTrackColor
      loadingSpinner.style.borderTopColor = options.spinnerBarColor
      loadingDiv.appendChild(loadingSpinner)

      var controlsDiv = document.createElement('div')
      controlsDiv.classList.add('gifcontrol-controls-element')
      controlsDiv.style.backgroundColor = options.overlayColor
      controlsDiv.innerHTML = options.playIcon

      var errorDiv = document.createElement('div')
      errorDiv.style.backgroundColor = options.overlayColor
      errorDiv.classList.add('gifcontrol-error-element')
      errorDiv.style.color = options.errorTextColor
      errorDiv.innerHTML = `${options.errorIcon} <div class="gifcontrol-errortext">${options.errorText}</div>`

      var canvas = document.createElement('canvas')
      canvas.style.maxWidth = "100%"

      container.appendChild(canvas)
      container.appendChild(controlsDiv)
      container.appendChild(loadingDiv)
      container.appendChild(errorDiv)

      elm.parentNode.replaceChild(container, elm)

      let loader = new GIFLoader()
      loader.imageLoaded = function(){ 
        container.classList.remove('gifcontrol-loading') 
        container.classList.add('gifcontrol-success')
        container.style.width = loader.animator.width
        container.style.height = 'auto'
      }
      loader.imageError = function(error){ 
        container.classList.remove('gifcontrol-loading')
        container.classList.add('gifcontrol-error') 
      }
      loader.load(source, canvas)

      container.onmouseenter = function(){
        if(loader.loaded && options.mode !== 'click'){
          container.classList.add('gifcontrol-playing')
          loader.animator.start()
        }
      }

      container.onmouseleave = function(){
        if (loader.loaded && options.mode !== 'click') {
          container.classList.remove('gifcontrol-playing')
          loader.animator.stop()
        }
      }

      container.onclick = function(){
        if (loader.loaded && options.mode === 'click') {
          if(loader.animator.running){
            container.classList.remove('gifcontrol-playing')
            loader.animator.stop()
          }else{
            container.classList.add('gifcontrol-playing')
            loader.animator.start()
          }
        }
      }
    })

    let fixElements = allElements.filter(elm => elm.title.includes("-gifcontrol-disabled;"))
    fixElements.forEach(elm => {
      elm.title = elm.title.replace(optionsMatch, '')
    })
  })
}

let optionsMatch = /-gifcontrol-.*?;/mg

function parseOptions(str){
  var options = {}
  let opts = str.match(optionsMatch)
  if(opts){
    opts.forEach(opt => {
      var parts = opt.split(/=(.+)/, 2)
      if(parts.length == 2){
        var optionName = parts[0].replace('-gifcontrol-', '')
        var optionValue = parts[1].slice(0, -1)
        options[optionName] = optionValue
        // console.log(`${optionName} = ${optionValue}`)
      }
    })
  }
  return options
}