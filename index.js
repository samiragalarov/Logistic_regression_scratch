const { parse } = require("csv-parse")
const fs = require("fs")
const math = require("mathjs")



class Logistic_Reggresion {
    constructor(learning_rate = 0.001, n_iters = 10) {
        this.learning_rate = learning_rate
        this.n_iters = n_iters
        this.weights = []
        this.bias = 0
    }
    fit(X, Y) {
        // console.log(X)
        const dimensions = [X.length, X[0].length];
        let n_samples = dimensions[0]
        let n_features = dimensions[1]


        //fill first weights
        for (let i = 0; i < n_features; i++) {

            this.weights.push(0)

        }

   
        for (let i = 0; i < this.n_iters; i++) {

            // find linear_model value
            let linear_model = []

            for (let i = 0; i < X.length; i++) {
                let linear_model_E = 0
                for (let k = 0; k < X[i]; k++) {
                    linear_model_E += (X[i][k] * this.weights[k]) + this.bias
                }

                linear_model.push(linear_model_E)

            }

            //find y_predicted
            let y_predicted = []
            for (let i = 0; i < linear_model.length; i++) {
                let y_predicted_Single = this.sigmoid(linear_model[i])
                y_predicted.push(y_predicted_Single)
            }


      
            /////burasinda kimi duzdu
            ///find derivative of cost function respect to w   ///araayy?
         
            let dw_Ar = []
            for (let i = 0; i < Y.length; i++) {
                    let dw_E =  (y_predicted[i] - Y[i])
                    dw_Ar.push(dw_E)
            }

            let dw = math.multiply(math.transpose(X), dw_Ar )
       


            for (let i = 0; i < dw.length; i++) {
                dw[i] = (1/n_samples) * dw[i]
                
            }
         

            


            ///find derivative of cost function respect to b
            let db = 0;
            for (let i = 0; i < Y.length; i++) {
                let db_E = (y_predicted[i] - Y[i])
                db += db_E
            }
 
            db = (1 / n_samples) * db

            ////adjust weights and bias
            for (let i = 0; i < dw.length; i++) {
                this.weights[i] = this.weights[i] - (this.learning_rate * dw[i])
                
            }
            for (let i = 0; i < dw.length; i++) {
                this.weights[i] = this.weights[i] - (this.learning_rate * dw[i])
                
            }
            
            this.bias = this.bias - (this.learning_rate * db)

        }

        
        return [this.weights, this.bias]
    }

    predict(Val) {
        let output = 0
        // find linear_model value
        let linear_model = []
        let sum_predict = 0
        for (let i = 0; i < Val.length; i++) {
        
           sum_predict +=  Val[i]*this.weights[i] + this.bias
            
        }
      
        output = this.sigmoid(sum_predict)
        console.log(output)
        if(output > 0.5){
            return 1
        }else{
            return 0
        }



       

    }
    sigmoid(z) {
        const k = 2;
        return 1 / (1 + Math.exp(-z / k));
    }

}


const result1 = []

const result2 = []
fs.createReadStream(__dirname + '/train_X.csv')
    .pipe(
        parse({
            delimiter: ','
        })
    )
    .on('data', function (data) {
        result1.push(data)

    })
    .on('end', function () {
        hey()
    })


function hey() {
    fs.createReadStream(__dirname + '/train_Y.csv')
        .pipe(
            parse({
                delimiter: ','
            })
        )
        .on('data', function (data) {
            result2.push(data)

        })
        .on('end', function () {
            result1.shift()
            result2.shift()

            for (let i = 0; i < result1.length; i++) {
                result1[i].shift()

            }
            for (let i = 0; i < result2.length; i++) {
                result2[i].shift()

            }

            const cavab = new Logistic_Reggresion()
            let ad = cavab.fit(result1,result2)
            
            // for (let i = 0; i < 10; i++) {
            //     let pr =cavab.predict(result1[i])
            //     console.log(pr,result2[i])
                
                
            // }
             let pr =cavab.predict([3,0,22.0,1,0,7.25,1])
            console.log(pr)
     

        })

}


