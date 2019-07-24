import { GIFLoader } from './gifloader'

const matchesSelector = Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector

export function install(hook) {
  hook.doneEach(_ => {
    // console.log(new Date(), gifler, window.gifler)
    let elms = Array.apply(null, document.querySelectorAll('.markdown-section img:not(.emoji):not([data-no-gifcontrol])'))
    elms = elms.filter(elm => elm.src.includes('.gif'))
    elms = elms.filter(elm => matchesSelector.call(elm, 'a img') === false)
    elms.forEach(elm => {
      var source = elm.src

      var container = document.createElement('div')
      container.classList.add('gifcontrol-canvas')
      container.classList.add('gifcontrol-loading')
      container.style.fill = 'rgba(45, 140, 240, 0.7)'

      var loadingDiv = document.createElement('div')
      loadingDiv.classList.add('gifcontrol-loading-element')
      var loadingSpinner = document.createElement('div')
      loadingSpinner.classList.add('gifcontrol-loading-spinner')
      loadingDiv.appendChild(loadingSpinner)

      var controlsDiv = document.createElement('div')
      controlsDiv.classList.add('gifcontrol-controls-element')
      //controlsDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zM40 256c0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216zm331.7-18l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM192 335.8V176.9c0-4.7 5.1-7.6 9.1-5.1l134.5 81.7c3.9 2.4 3.8 8.1-.1 10.3L201 341c-4 2.3-9-.6-9-5.2z"/></svg>'
      controlsDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"/></svg>'

      var errorDiv = document.createElement('div')
      errorDiv.classList.add('gifcontrol-error-element')

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
      }
      loader.imageError = function(error){ 
        container.classList.remove('gifcontrol-loading')
        container.classList.add('gifcontrol-error') 
      }
      loader.load(source, canvas)

      container.onmouseenter = function(){
        if(loader.loaded){
          container.classList.add('gifcontrol-playing')
          loader.animator.start()
        }
      }

      container.onmouseleave = function(){
        if (loader.loaded) {
          container.classList.remove('gifcontrol-playing')
          loader.animator.stop()
        }
      }
    })
  })
}