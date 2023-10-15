class Genome{
    constructor(id, parent) {
        this.id=id
        
        if(parent){
            this.brain = new NeuralNetwork(...parent.brain.layers)
            this.brain.setWeights(parent.brain.weights)
            this.brain.setBiases(parent.brain.biases)
            this.brain.setActivationFunction(parent.brain.activationFunction)
        }else{
            this.brain = new NeuralNetwork(...CONFIG.InitialNeuralNetwork)
            this.brain.generateRandomWeights(CONFIG.nullWeight?()=>0:CONFIG.GENRATERANDOMWEIGHTS)
            this.brain.generateRandomBiases(CONFIG.nullBias?()=>0:CONFIG.GENRATERANDOMBIASES)
            this.brain.chooseActivationFunction(CONFIG.ACTIVATIONFUNCTIONS)
        }
        this.color = parent?.color||generateRandomColor()
        if(parent){
            if(chance(CONFIG.mutationRate)){
                if(chance(CONFIG.colorMutationRate))this.mutateColor()
                this.mutateWeights()
                this.mutateBiases()
            }
        }
    }
    dna(){
        return `G${Math.floor(this.id/1000)} I${this.id%1000} ${rgbTohex(...this.color)} ${this.brain.display()}`
    }
    mutateColor(){
        this.color=[(this.color[0]+randint(-20, 20))%256, (this.color[1]+randint(-20, 20))%256, (this.color[2]+randint(-20, 20))%256, 255]
        // this.color=[255, 255, 255, 5]
    }
    mutateWeights(){
        let weights = []
        let new_weight, gaussian_d
        for(let i=0;i<this.brain.weights.length;i++){
            weights.push([])
            for(let o=0;o<this.brain.weights[i].length;o++){
                weights[i].push([])
                for(let u=0;u<this.brain.weights[i][o].length;u++){
                    new_weight=this.brain.weights[i][o][u]
                    if(chance(CONFIG.weightMutationRate)){
                        if(chance(CONFIG.chanceOfWeightAssignedRandomValue)){
                            new_weight=CONFIG.GENRATERANDOMWEIGHTS()
                        }else{
                            gaussian_d=gaussianChoice(...CONFIG.chanceOfWeightPerturbed)
                            new_weight*=gaussian(.5, 1.5, gaussian_d)
                            new_weight+=gaussian(-.5, .5, gaussian_d)
                        }
                    }
                    weights[i][o].push(new_weight)
                }
            }
        }
        this.brain.weights = weights
    }
    mutateBiases(){
        let biases = []
        let new_bias, gaussian_d
        for(let i=0;i<this.brain.biases.length;i++){
            biases.push([])
            for(let o=0;o<this.brain.biases[i].length;o++){
                new_bias=this.brain.biases[i][o]
                if(chance(CONFIG.biasMutationRate)){
                    if(chance(CONFIG.chanceOfBiasAssignedRandomValue)){
                        new_bias=CONFIG.GENRATERANDOMBIASES()
                    }else{
                        gaussian_d=gaussianChoice(...CONFIG.chanceOfBiasPerturbed)
                        new_bias*=gaussian(.5, 1.5, gaussian_d)
                        new_bias+=gaussian(-.5, .5, gaussian_d)
                    }
                }
                biases[i].push(new_bias)
            }
        }
        this.brain.biases = biases
    }
}