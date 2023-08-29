export function useNumWord(value, words = ['автомобиль', 'автомобиля', 'автомобилей']){  
    value = Math.abs(value) % 100; 
    var num = value % 10;
    if(value > 10 && value < 20) return words[2]; 
    if(num > 1 && num < 5) return words[1];
    if(num == 1) return words[0]; 
    return words[2];
}

export function useLocaleString(number){
    return number.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })
}

export function useMinNum(objects, key){
    let numbers = [];
    for (const [k, v] of Object.entries(objects)) {
        numbers.push(Number(v[key])) 
    }
    return numbers.reduce((x, y) => Math.min(x, y))
}

export function useMaxNum(objects, key){
    let numbers = [];
    for (const [k, v] of Object.entries(objects)) {
        numbers.push(Number(v[key])) 
    }
    return numbers.reduce((x, y) => Math.max(x, y))
}

export function useColorCount(objects, key){
    let colors = [];
    for (const [k, v] of Object.entries(objects)) {
        if(!colors.includes(v[key])){
            colors.push(v[key]) 
        }
    }
    return colors.length
}