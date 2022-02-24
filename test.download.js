// const fs = require('fs/promises')
const download = require('download')
const url = 'https://registry.npmmirror.com/-/binary/node/node-v0.6.12.tar.gz'


function dl (url) {
    download(url, 'dist')
}
dl(url)