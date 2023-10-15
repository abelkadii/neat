class Neat{
    constructor(generateIndividual){
        this.generation = 0
        this.generateIndividual=generateIndividual
        this.time=CONFIG.lifeSpan
        this.generatePopulation()
    }
    generatePopulation(ancestorGenomes=[]){
        let individual
        this.population=[]
        for(let i=0;i<CONFIG.populationSize;i++){
            individual = this.generateIndividual()
            individual.genome=new Genome(this.generation*1000+i, ancestorGenomes[i])
            this.population.push(individual)
        }
    }
    tick(show){
        let alive = 0
        let fitnesss = 0
        let vision, output
        world.update()
        world.show()
        for(let i=0;i<this.population.length;i++){
            if(!this.population[i].dead){
                if(this.time%CONFIG.BRAIN_SPEED==0){
                    vision = this.population[i].look()
                    output = this.population[i].genome.brain.feedForward(vision)
                    this.population[i].decide(output)
                }
                this.population[i].update()
                if(show)this.population[i].show()
                alive++
                fitnesss+=this.population[i].fitness()
                }
        }
        this.time--
        // info.change('score', CONFIG.lifeSpan-this.time)
        if(this.time==0||alive==0){
            let fitness = this.calculate_fitness()
            // console.log(fitness)
            let spliting_probability = uniformProbabilty(fitness)
            // console.log(spliting_probability)
            let genomes = this.mate(spliting_probability)
            this.generatePopulation(genomes)
            // bird = this.population[0]
            this.time=CONFIG.lifeSpan
            this.generation++
            world.reset()
        }
    }
    calculate_fitness(){
        let fitnessArray = []
        for(let i=0;i<this.population.length;i++){
            fitnessArray.push(this.population[i].fitness())
        }
        return fitnessArray
    }
    mate(spliting_probability){
        let genomes = []
        for(let i=0;i<CONFIG.populationSize;i++){
            let selected = this.population[gaussianChoice(range(CONFIG.populationSize), spliting_probability)]
            genomes.push(selected.genome)
        }
        return genomes
    }
    
}