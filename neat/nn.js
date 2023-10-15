const MapFunction = {
    'sigmoid': sigmoid,
    'relu': relu,
    'tanh': Math.tanh,
    '_tanh': _tanh,
    'leaky': leaky,
    'proto': proto,
    'default': x=>x
}
class NeuralNetwork{
    constructor(...layers){
        this.layers=layers
        this.weights = []
        this.biases = []
        this.activationFunction='default'
    }
    setWeights(weights){
        this.weights=weights
    }
    setBiases(biases){
        this.biases=biases
    }
    setActivationFunction(f){
        this.activationFunction=f
    }
    generateRandomWeights(generate){
        let weights = []
        for(let i=0;i<this.layers.length-1;i++){
            weights.push([])
            for(let o=0;o<this.layers[i+1];o++){
                weights[i].push([])
                for(let u=0;u<this.layers[i];u++){
                    weights[i][o].push(generate())
                }
            }
        }
        this.weights = weights
    }
    generateRandomBiases(generate){
        let biases = []
        for(let i=0;i<this.layers.length-1;i++){
            biases.push([])
            for(let o=0;o<this.layers[i+1];o++){
                biases[i].push(generate())
            }
        }
        this.biases=biases
    }
    chooseActivationFunction(options){
        this.activationFunction=randomChoice(options)
    }
    feedForward(activations){
        activations = activations.map(act=>MapFunction[this.activationFunction](act))
        let next
        for(let i=0;i<this.layers.length-1;i++){
            next = []
            for(let o=0;o<this.weights[i].length;o++){
                let dot_p = dot(this.weights[i][o], activations)
                next.push(MapFunction[this.activationFunction](dot_p+this.biases[i][o]))
            }
            activations=[...next]
        }
        return activations
    }
    display(){
        return `${this.activationFunction} ${this.layers}`
    }
}