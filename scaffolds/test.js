function sendAjax() {
    var xhr = new XMLHttpRequest()
    xhr.timeout = 3000; // 可选，设置xhr请求的超时时间
    xhr.open('POST', '/register', true)
    xhr.send('username=jirengu&password=123456')

    xhr.onload = function (e) {
        if ((xhr.status === 200 ) || xhr.status === 304) {
            console.log(this.responseText)
        }
    }
//可选
    xhr.ontimeout = function (e) {
        console.log('请求超时')
    }

//可选
    xhr.onerror = function (e) {
        console.log('连接失败')
    }
//可选
    xhr.upload.onprogress = function (e) {
        //如果是上传文件，可以获取上传进度
    }
}