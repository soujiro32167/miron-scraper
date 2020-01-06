const fetch = require('node-fetch')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const scraper = require('./scraper')
const { range } = require('./polyfill')

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0'

const getPage = (url) => fetch(url)
        .then(res => res.text())
        .then(text => new JSDOM(text))

const baseUri = 'https://database.globalreporting.org/organizations'

function main(){
    return Promise.all(
        range(10, 14).xs()
        .map(n => getPage(`${baseUri}/${n}`))
        .map(domPromise => domPromise
                .then(dom => scraper.company(dom.window.document, dom.window))
                .then(result => console.log(JSON.stringify(result, null, 2)))
                .catch(e => console.error(e))
            )
    )
}

main()
