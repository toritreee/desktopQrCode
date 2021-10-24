import "./jsQR.js"
class main{
    constraints = { audio: false, video: true }

    constructor(){
        this.loading = document.getElementById("loadingVideo")
        this.loading.showModal()
        this.video = document.getElementById("video")
        this.cv = document.createElement("canvas")
        this.ctx = this.cv.getContext("2d")
        this.getQrAnser = document.getElementById("getQrAnser")
    }


    media(){
        this.mediaDevice = navigator.mediaDevices.getUserMedia(this.constraints)

        this.mediaDevice.then((stream)=>{
            this.video.srcObject = stream
            video.onloadedmetadata = ()=>{
                video.play()
                this.loading.close()
                this.checkImage()
            }
        })
        .catch(this.mediaError.bind(this))
    }


    mediaError(){
        document.getElementById("videoError").showModal()
    }


    checkImage(){
        this.ctx.drawImage(this.video, 0, 0, this.cv.width, this.cv.height)
        const imageData = this.ctx.getImageData(0, 0, this.cv.width, this.cv.height)

        const code = jsQR(imageData.data, this.cv.width, this.cv.height)

        if (code) {
            this.getQr(code.data)
        } else {
            setTimeout(this.checkImage.bind(this), 200)
        }
    }
    getQr(code){
        document.getElementById("getQrAnser-data").value = code
        document.getElementById("getQrAnser-open").onclick = ()=>window.location.href = code
        document.getElementById("getQrAnser-copy").onclick = ()=>navigator.clipboard.writeText(code)
        document.getElementById("getQrAnser-close").onclick = ()=>this.getQrAnser.close()
        this.getQrAnser.showModal()
        
    }
}

window.onload = ()=>{
    new main().media()
}