const fetch = require('node-fetch')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const scraper = require('./scraper')
const { range } = require('./polyfill')
const fs = require('fs')

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0'

const getPage = (url) => fetch(url)
        .then(res => {
            if (!res.ok) { throw `response: ${res.status}` }; 
            return res.text()
        })
        .then(text => new JSDOM(text))

const baseUri = 'https://database.globalreporting.org/organizations'

async function main(){
    const results = []
    for (let n of range(10, 100)){
        try {
            const dom = await getPage(`${baseUri}/${n}`)
            const result = scraper.company(dom.window.document, dom.window)
            console.log(`parsed page ${n}`)
            results.push([n, result])
        } catch(e) {
            console.error(e)
        }
    }
    
    // console.log(results)
    fs.writeFileSync('results.json', JSON.stringify(Object.fromEntries(results)))
}

main()
