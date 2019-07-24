import { GifReader } from 'omggif'
import { Animator } from './lib/gifler-animator'

export class GIFLoader {
  constructor(){
    this.loading = false
    this.animator = null
    this.loaded = false
  }

  async load(url, canvas){
    this.loading = true
    this.imageLoading()
    try {
      let response = await this._xhr(url)
      // Used to test loader
      // await this.timeout(5000)
      // Used to test error
      // throw new Error("Debug Error Testing")
      this.animator = new Animator(new GifReader(new Uint8Array(response))) 
      this.animator.animateInCanvas(canvas)
      this.imageLoaded()
      this.loaded = true
      return this.animator
    } catch(error){
      this.imageError(error)
    }
    this.loading = false
  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  imageLoading(){
    // Override to do stuff
  }

  imageLoaded(){
    // Override to do stuff
  }

  imageError(error){
    // Override to do stuff
  }

  _xhr(url){
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.responseType = 'arraybuffer'
      xhr.onload = () => {
        if(xhr.status >= 200 && xhr.status < 300){
          resolve(xhr.response)
        }else{
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      }
      xhr.onerror = () => {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        })
      }
      xhr.send()
    })    
  }
}