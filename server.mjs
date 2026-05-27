import fs from 'fs'
import express from 'express'

const app = express()
const PORT = 3000

function loadData(){
    const content = fs.readFileSync('hangszerek.txt', 'utf-8')

    return content.trim().split('\n').map(line => {
        const [type, brand, price] = line.split(',')

        return {
            type: type.trim(),
            brand: brand.trim(),
            price: +price.trim()
        }
    })
}

app.get('/api/hangszerek', (req, res) => {
    const data = loadData()
    res.json(data)
})

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Server runs on http://localhost:${PORT}`)
})