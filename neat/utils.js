const gaussian = (a, b, d)=>{
    let r = 0
    for(let i=0;i<d;i++){r+=random(a, b)}
    return r/d
}
const sigmoid = x =>  1/(1+Math.exp(-x))
const relu = x => Math.max(0, x)
const _tanh = x => (1+Math.tanh(x*6-3))/2
const leaky = x => Math.max(0.1*x, x)
const random = (a, b) => (b-a)*Math.random()+a
const randint = (a, b) => Math.floor((b-a)*Math.random())+a
const proto = x => Math.min(Math.max(Math.min(x+.4, 1), 0)**8, sqrt(Math.max(x, 0)))
const sum = arr => {
    let s = 0;
    arr.map(i=>s+=i)
    return s
}
const mul = arr => {
    let m = 1;
    arr.map(i=>m*=i)
    return m
}
const chance = (percentage) => {
    return Math.random()<=percentage
}
const gaussianChoice = (items, probability) => {
    let rand = Math.random()
    let decision
    for(let i=0;i<items.length;i++){
        if(within(rand, 0, probability[i])){
            decision=items[i]
        }
        rand-=probability[i]
    }
    return decision
}

const uniformProbabilty = probability => {
    let sum_of_probability = sum(probability)
    return probability.map(i=>sum_of_probability!=0?i/sum_of_probability:1/probability.length)
}

const within = (x, a, b)=>{
    return x>=a && x<=b
}
const range = rg => {
    let output = []
    for(let e=0;e<rg;e++){
        output.push(e)
    }
    return output
}
const chance_switch_sign = (p) => {
    if(chance(p)){
        return -1
    }
    return 1
}
const generateRandomColor = () => [randint(0, 256), randint(0, 256), randint(0, 256), 255]
// const generateRandomColor = () => [255, 255, 255, 5]
const index_of_max = arr => {
    let max=arr[0]
    let index_of_max=0
    for(let i=0;i<arr.length;i++){
        if(arr[i]>max){
            max=arr[i]
            index_of_max=i
        }
    }
    return index_of_max
}

const dot = (...vectors)=>{
    let product = 0
    let vector_length=vectors[0].length
    for(let i=0;i<vector_length;i++){
        product+=mul(vectors.map(v=>v[i]))
    }
    return product
}

const polarize = (array, d) => {
    if (d==1)return array
    return array.map(i=>i**d)
}

const randomChoice = (array) => array[randint(0, array.length)]
const trnasformAngle = angle => -(angle-Math.PI/2)
const unTransformAngle = angle => -angle+Math.PI/2
const moduloAngle = angle => (2*Math.PI+angle)%(Math.PI*2)
const toRad = degrees => degrees*Math.PI/180
const toDeg = radians => radians*180/Math.PI
const angleOfVector = (x, y) =>Math.atan2(-y, x)
const rgbTohex = (r, g, b)=>"#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)
function array_in_arrays(a, as){
    for(let i=0;i<as.length;i++){
        if(as[i][0]==a[0]&&as[i][1]==a[1])return true
    }
    return false
}
function update_if_higher_or_null(variable, value){
    if(variable&&value>=0){
        if(variable<value&&value>=0){
            return value
        }
    }else if(value>=0){
        return value
    }
    return variable
}
function update_if_lower_or_null(variable, value){
    if(variable){
        if(variable>value&&value>=0){
            return value
        }
    }else if(value>=0){
        return value
    }
    return variable
}
const distance_points = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2))

const topOf = (array, number) => [...array].sort((a, b)=>b-a).slice(0, number)
const topIndex = (number, array) => {
    let sorted=[...array].sort((a, b)=>a-b)
    let topArray = []
    for(let i=0;i<number;i++){
        topArray.push(array.indexOf(sorted[i]))
    }
    return topArray
}
const filterArray = (array, f)=>array.map(v=>f(v)?0:v)
const keepTop = (array, value) => {
    let v = topOf(array, value)[value-1]
    return filterArray(array, (i)=>i<v)
}

const uniform = (probability, v) => {
    let sum_of_probability_positive = sum(probability.filter(i=>i>=0))
    let sum_of_probability_negative = sum(probability.filter(i=>i<0))
    return probability.map(i=>i/(i<0?sum_of_probability_negative:sum_of_probability_positive))
}