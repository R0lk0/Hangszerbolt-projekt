let hangszerek = []

const tableBody = document.getElementById("tableBody")
const typeFilter = document.getElementById("typeFilter")
const priceFilter = document.getElementById("priceFilter")
const priceLabel = document.getElementById("priceLabel")

async function loadData(){
    const res = await fetch('/api/hangszerek')
    hangszerek = await res.json()

    initFilters()
    render()
}

function initFilters(){
    const types = [...new Set(hangszerek.map(h => h.type))]

    types.forEach(t => {
        const opt = document.createElement("option")
        opt.value = t
        opt.textContent = t
        typeFilter.appendChild(opt)
    })

    updateSlider(hangszerek)
    const maxPrice = Math.max(...hangszerek.map(h => h.price))
    priceFilter.max = maxPrice
    priceFilter.value = maxPrice
}

function render(){
    const type = typeFilter.value
    const maxPrice = +priceFilter.value

    let baseData = hangszerek

    if (type !== ""){
        baseData = hangszerek.filter(h => h.type === type)
    }

    const filtered = baseData.filter(h => h.price <= maxPrice)

    tableBody.innerHTML = ""

    for (const h of filtered){
        const row = document.createElement("tr")

        row.innerHTML = `
            <td>${h.type}</td>
            <td>${h.brand}</td>
            <td>${h.price.toLocaleString()} Ft</td>
        `
        tableBody.appendChild(row)
    }

    priceLabel.textContent = maxPrice.toLocaleString()
}

function updateSlider(data){
    const minPrice = Math.min(...data.map(h => h.price))
    const maxPrice = Math.max(...data.map(h => h.price))

    priceFilter.min = minPrice
    priceFilter.max = maxPrice

    if (+priceFilter.value > maxPrice){
        priceFilter.value = maxPrice
    }

    priceLabel.textContent = priceFilter.value.toLocaleString()
}

typeFilter.addEventListener("change", ()=>{
    const type = typeFilter.value

    let baseData = hangszerek

    if (type !== ""){
        baseData = hangszerek.filter(h => h.type === type)
    }

    updateSlider(baseData)
    render()
})
priceFilter.addEventListener("input", render)

loadData()