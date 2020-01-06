const allChildren = (root) => Array.from(root.children).flatMap(c => [c, ...allChildren(c)])

const allLeaves = (root) => allChildren(root).filter(e => e.childElementCount == 0)

const dynamicStats = (root) => root.querySelectorAll('.list-group-item').xs()
        .map(e => e.children.xs().map(n => n.textContent.replace(':', '')).filter(n => !!n))

const dynamicReports = (root) => root.querySelectorAll('#reports-all ~ .row .card').xs()
        .map(card => ({
            title: card.querySelector('h5').textContent,
            labels: card.querySelectorAll('span').xs().map(l => ({
                class: l.className,
                content: l.textContent
            })),
            text: card.querySelector('.card-text').textContent
        }))

    
const company = (root, window) => {
    window.NodeList.prototype.xs = function(){ return Array.from(this) }
    
    window.HTMLCollection.prototype.xs = function(){ return Array.from(this) }

    const name = root.querySelector('.card-title').textContent.trim()

    const stats = dynamicStats(root)

    const reports = root.querySelectorAll('#reports-all ~ .row .card').xs()
        .map(card => ({
            title: card.querySelector('h5').textContent,
            labels: {
                year: card.querySelector('.label-info').textContent,
                format: card.querySelector('.label-primary').textContent,
                extent: card.querySelector('.label-success').textContent
            },
            company: card.querySelector('.card-text').textContent.trim()
        }))

    const contactList = root.querySelectorAll('.card').xs()
    .filter(
        c => c.querySelectorAll('.card-title').xs().some(e => e.textContent.trim().toLowerCase() == 'contact')
        )[0].childNodes.xs()

    const contact = contactList.filter(x => x instanceof window.Text)
        .map(n => n.textContent.trim())
        .filter(t => !!t)
        .map(text => text.split(':').map(x => x.trim()))
        

    return {
        name,
        stats: Object.fromEntries(stats),
        reports,
        contact: Object.fromEntries(contact)
    }
}

module.exports = { company }