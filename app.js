// const http = require('http')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const download = require('download')

// 爬取nodejs 及 npm 并下载

const baseUrl = 'https://registry.npmmirror.com/-/binary/node'
let isDownloading = false

async function getRoot (url) {
    const res = await fetch(url)
    // console.log(res)
    const data = await res.json()
    // console.log(data)
    if (data.length > 0) {
        // console.log('has data')
        data.forEach(async item => {
            if (item.type === 'dir') {
                // 创建目录
                const dirPath = item.url.split('/binary/')[1]
                // 应先检查文件夹是否存在
                fs.mkdirSync(path.join(__dirname, './dist/', dirPath))
                // // 获取数据
                getRoot(item.url)
            } else {
                // 下载文件
                // 应先检查路径是否存在
                const savePathArr = item.url.split('/binary/')[1].split('/')
                savePathArr.pop()
                // console.log(savePathArr)
                const fileSavePath = savePathArr.length > 1 ? savePathArr.join('/') : savePathArr[0]
                // console.log(fileSavePath)
                // console.log(item.url)
                isDownloading = true
                console.log('start download ' + item.url)
                await download(item.url, 'dist/' + fileSavePath)
                isDownloading = false
                console.log('download OK ! next')

            }
        });
    }
}
getRoot(baseUrl)
