import fs from 'fs'
import input from './input.mjs'

let content = fs.readFileSync('hangszerek.txt', { encoding: 'UTF-8' })
const temp = content.trim().split('\n')

const hangszerek = temp.map(sor => {
    const [type, brand, price] = sor.split(',')

    return {
        type: type.trim(),
        brand: brand.trim(),
        price: +price.trim()
    }
})

console.log('--- HANGSZERLISTA ---')

for (const hangszer of hangszerek){
    console.log(
        `Típus: ${hangszer.type}, Márka: ${hangszer.brand}, Ár: ${hangszer.price.toLocaleString()} Ft`
    )
}

const tipusok = []

for (const hangszer of hangszerek){
    if (!tipusok.includes(hangszer.type)){
        tipusok.push(hangszer.type)
    }
}

console.log('\nElérhető típusok:')
for (const tipus of tipusok){
    console.log(`- ${tipus}`)
}

const keresettTipus = await input('\nHangszer típusa (Enter = nincs szűrés): ')

let maxAr = await input('Maximális ár (Enter = nincs limit): ')

if (maxAr === ''){
    maxAr = null
}
else{
    maxAr = +maxAr

    while (maxAr < 0){
        maxAr = +await input('Negatív szám nem lehet! Adj meg új értéket: ')
    }
}

console.log('\n--- SZŰRT HANGSZEREK ---')

let talalat = 0

for (const hangszer of hangszerek){

    let joTipus = true
    let joAr = true


    if (keresettTipus !== ''){
        if (hangszer.type.toLowerCase() !== keresettTipus.toLowerCase()){
            joTipus = false
        }
    }


    if (maxAr !== null){
        if (hangszer.price > maxAr){
            joAr = false
        }
    }


    if (joTipus && joAr){
        console.log(`Típus: ${hangszer.type}, Márka: ${hangszer.brand}, Ár: ${hangszer.price.toLocaleString()} Ft`)
        talalat++
    }
}

if (talalat === 0){
    console.log('Nincs ilyen hangszer.')
}