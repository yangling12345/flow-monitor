const beginTime = Date.now()
module.exports = (fn) => (req, resp) => {
    resp.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    let interval = setInterval(() => {
        switch (typeof fn) {
        case 'function':
            resp.write(`data:${JSON.stringify(fn(req, resp))}\n\n`)
            break
        default:
            let o = {running_time: Date.now() - beginTime}
            Object.keys(fn).map(k => {
                o[k] = fn[k](req, resp)
            })
            resp.write(`data:${JSON.stringify(o)}\n\n`)
        }
    }, 1000)
    req.connection.addListener('close', () => {
        resp.end()
        clearInterval(interval)
    }, false)
    return false
}
