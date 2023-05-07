const item = 'asdwasdit'
const term = null
// const item = 'asdaaaaasda'
// const term = 'a'

const split = item.split(term)

const terms_inserted = []
console.log(split)
for (let i=0; i<split.length; i++) {
    // insert non term
    if (split[i] != '') {
        terms_inserted.push({text: split[i], color: 'white'})
    }
    // insert term
    if (term != '' && i!=split.length-1) {
        terms_inserted.push({text: term, color: 'red'})
    }
} 

console.log(terms_inserted)
