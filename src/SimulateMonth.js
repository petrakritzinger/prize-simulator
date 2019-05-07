import React from 'react';

class SimulateMonth extends React.Component {

    

    constructor() {
        super();
        this.state = { 
            avgPrizeMoney:0, 
            chanceThousand: 0.001, 
            chanceHundred: 0.1, 
            chanceTen: 0.25, 
            chanceOne: 0.5,
            minDigitThousand: 1,
            maxDigitThousand: 1,
            minDigitHundred: 1,
            maxDigitHundred: 1,
            minDigitTen: 1,
            maxDigitTen: 5,
            minDigitOne: 1,
            maxDigitOne: 9,
            newUsers: 1000, 
            months: 100};
        
    }

    componentDidMount() {
        this.Simulate();
    }

    arrMin = arr => Math.min(...arr);
    arrMax = arr => Math.max(...arr);
    arrSum = arr => arr.reduce((a,b) => a + b, 0);
    arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

    Simulate() {
       
        // for (let index = 0; index < 10; index++) {
        //     console.log(this.GetRandomIntFromSeed(2,Math.random()));
        // }

        let monthPrizes = [];
        let monthTotals = [];
        let monthAverages = [];
        let monthZeroes = [];
        let month0_100 = [];
        let month100_500 = [];
        let month500_1000 = [];
        let month1000Plus = [];
        let maxAmnt = 0;
        let total = 0;
        for (let month = 0; month < this.state.months; month++) {
            let prizes = [];
            let totalAmount = 0;
            let zeroes = 0;
            let m0_100 = 0;
            let m100_500 = 0;
            let m500_1000 = 0;
            let m1000Plus = 0;

            for (let user = 0; user < this.state.newUsers; user++) {
                var prize = this.GetNewRandom();
                // if (prize === 0)
                //     console.log("Sorry");
                // else
                //     console.log("You've won R" + prize + "!!!");
                prizes.push(prize);
                totalAmount += prize;
                total += prize;
                if (prize <= 0)
                    zeroes ++;
                else if (prize < 100)
                    m0_100 ++;
                else if (prize < 500)
                    m100_500 ++;
                else if (prize < 1000)
                    m500_1000 ++;
                else if (prize >= 1000)
                    m1000Plus ++;
                if (prize > maxAmnt)
                    maxAmnt = prize;
                //console.log(prize);
            }
            

            monthPrizes.push(prizes);
            monthTotals.push(totalAmount);
            monthAverages.push(totalAmount/this.state.newUsers);
            monthZeroes.push(zeroes);
            month0_100.push(m0_100);
            month100_500.push(m100_500);
            month500_1000.push(m500_1000);
            month1000Plus.push(m1000Plus);
        }
        //console.log(monthPrizes);
        //console.log(monthAverages);
        //console.log(monthTotals);
        //console.log(monthZeroes);
        this.avgZeroes = this.arrAvg(monthZeroes);
        this.avg0_100 = this.arrAvg(month0_100);
        this.avg100_500 = this.arrAvg(month100_500);
        this.avg500_1000 = this.arrAvg(month500_1000);
        this.avg1000Plus = this.arrAvg(month1000Plus);
        this.maxMonthlyTotal = this.arrMax(monthTotals);
        this.minMonthlyTotal = this.arrMin(monthTotals);
        this.maxPrize = maxAmnt;
        //let total = monthAverages.reduce((a,b) => a+b, 0);
        this.setState({avgPrizeMoney : total/this.state.months});
        //this.avgPrizeMoney = total/this.state.months;
    }

    GetHundreds(rand) {
        return this.GetRandomIntFromMinMax(this.state.minDigitHundred, this.state.maxDigitHundred, rand);
    }

    GetTens(rand) {
        return this.GetRandomIntFromMinMax(this.state.minDigitTen, this.state.maxDigitTen, rand);
    }

    GetOnes(rand) {
        return this.GetRandomIntFromMinMax(this.state.minDigitOne, this.state.maxDigitOne, rand);
    }

    GetNewRandom() {
        let thousands = 0;
        let hundreds = 0;
        let tens = 0;
        let ones = 0;
        let rand = Math.random();
        //console.log(rand);
        if (rand <this.state.chanceThousand) {
            //console.log("****");
            thousands = this.GetRandomIntFromMinMax(this.state.minDigitThousand, this.state.maxDigitThousand, rand);
            if (thousands >= this.state.maxDigitThousand)
                return thousands*1000;
            hundreds = this.GetHundreds(Math.random());
            tens = this.GetTens(Math.random());
            ones = this.GetOnes(Math.random());
        }
        else if (rand < this.state.chanceHundred) {
            //console.log("***");
            hundreds = this.GetHundreds(rand);
            tens = this.GetTens(Math.random());
            ones = this.GetOnes(Math.random());
        }
        else if (rand < this.state.chanceTen) {
            //console.log("**");
            tens = this.GetTens(rand);
            ones = this.GetOnes(Math.random());
        }
        else if (rand < this.state.chanceOne) {
            //console.log("*");
            ones = this.GetOnes(rand);
        }
        else
            return 0;
        
        return (thousands * 1000 + hundreds * 100 + tens * 10 + ones);






        // var thousands = rand < this.state.chanceThousand ? this.GetRandomIntFromMinMax(this.state.minDigitThousand, this.state.maxDigitThousand, rand) : 0;
        // if (thousands >= this.state.maxDigitThousand)
        //     return this.state.maxDigitThousand*1000;
        // //rand = Math.random();
        // var hundreds = rand < this.state.chanceHundred ? this.GetRandomIntFromMinMax(this.state.minDigitHundred, this.state.maxDigitHundred, rand) : 0;
        
        // //rand = Math.random();
        // var tens = rand < this.state.chanceTen ? this.GetRandomIntFromMinMax(this.state.minDigitTen, this.state.maxDigitTen, rand) : 0;
        // //rand = Math.random();
        // var ones = rand < this.state.chanceOne ? this.GetRandomIntFromMinMax(this.state.minDigitOne, this.state.maxDigitOne, rand) : 0;

        
    }

    GetRandomIntFromSeed(max, seed) {
        return Math.floor(seed * Math.floor(max));
    }

    GetRandomIntFromMinMax(min, max, seed) {
        //console.log("Get random between " + min + " and " + max);
        min = Math.ceil(min);
        max = Math.floor(max);
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        //console.log(num);
        return num;
    }

    GetRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
    
    onFormSubmit = event => {
        
        event.preventDefault(); 
        this.Simulate();
    };

    render() {
        return (
            <div className="search-bar ui segment">
                <h2>Prize Simulator</h2>
                <form onSubmit={this.onFormSubmit} className="ui form">
                <div className="ui grid">
                    <div className="seven column row">
                        <div className="column"><button formAction='submit'>Calculate</button> </div>
                        <div className="column"><label>1 000</label></div>
                        <div className="column"><label>100</label></div>
                        <div className="column"><label>10</label></div>
                        <div className="column"><label>1</label></div>
                        <div className="column"><label>New users</label></div>
                        <div className="column"><label>Months</label></div>
                    </div>
                    <div className="seven column row">
                        <div className="column"><label>Chance</label></div>
                        <div className="column">
                            <input 
                                type='text' 
                                value={this.state.chanceThousand} 
                                onChange={(e) => this.setState({chanceThousand: e.target.value})}/>
                        </div>
                        <div className="column">
                            <input 
                                type='text' 
                                value={this.state.chanceHundred} 
                                onChange={(e) => this.setState({chanceHundred: e.target.value})}/>
                        </div>
                        <div className="column">
                            <input 
                                type='text' 
                                value={this.state.chanceTen} 
                                onChange={(e) => this.setState({chanceTen: e.target.value})}/>
                        </div>
                        <div className="column">
                            <input 
                                type='text' 
                                value={this.state.chanceOne} 
                                onChange={(e) => this.setState({chanceOne: e.target.value})}/>
                        </div>
                        <div className="column">
                            <input 
                                type='text' 
                                value={this.state.newUsers} 
                                onChange={(e) => this.setState({newUsers: e.target.value})}/>
                        </div>
                        <div className="column">
                            <input 
                                type='text' 
                                value={this.state.months} 
                                onChange={(e) => this.setState({months: e.target.value})}/>
                        </div>
                    </div>
                    <div className="seven column row">
                        <div className="column"><label>Min digit</label></div>
                        <div className="column">

                
                                    <input 
                                        type='text' 
                                        maxLength="1"
                                        value={this.state.minDigitThousand} 
                                        onChange={(e) => this.setState({minDigitThousand: e.target.value})}
                                    />
     
                            
                        
                            
                        </div>
                        <div className="column">
                            <input 
                                type='text' 
                                value={this.state.minDigitHundred} 
                                onChange={(e) => this.setState({minDigitHundred: e.target.value})}/>
                        </div>
                        <div className="column">
                            <input 
                                type='text' 
                                value={this.state.minDigitTen} 
                                onChange={(e) => this.setState({minDigitTen: e.target.value})}/>
                        </div>
                        <div className="column">
                            <input 
                                type='text' 
                                value={this.state.minDigitOne} 
                                onChange={(e) => this.setState({minDigitOne: e.target.value})}/>
                        </div>
                        <div className="column">
                           
                        </div>
                        <div className="column">
                           
                        </div>
                    </div>
                    <div className="seven column row">
                        <div className="column"><label>Max digit</label></div>
                        <div className="column">
                            <input 
                                type='text' 
                                value={this.state.maxDigitThousand} 
                                onChange={(e) => this.setState({maxDigitThousand: e.target.value})}/>
                        </div>
                        <div className="column">
                            <input 
                                type='text' 
                                value={this.state.maxDigitHundred} 
                                onChange={(e) => this.setState({maxDigitHundred: e.target.value})}/>
                        </div>
                        <div className="column">
                            <input 
                                type='text' 
                                value={this.state.maxDigitTen} 
                                onChange={(e) => this.setState({maxDigitTen: e.target.value})}/>
                        </div>
                        <div className="column">
                            <input 
                                type='text' 
                                value={this.state.maxDigitOne} 
                                onChange={(e) => this.setState({maxDigitOne: e.target.value})}/>
                        </div>
                        <div className="column">
                           
                        </div>
                        <div className="column">
                           
                        </div>
                    </div>

                </div>
                </form>
                <div className="ui grid">
                    <div className="seven column row">
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                    </div>
                    <div className="center black one column row">
                        <div className="column"><label>Simulated values:</label></div>
                    </div>
                    <div className=" six column row">
                        <div className="column">
                            <label>Avg total prize money per month</label>
                        </div>
                        <div className="column">
                            <label>Avg prizes per month >= 1000</label>
                        </div>
                        <div className="column">
                            <label>Avg prizes per month 500-1000</label>
                        </div>
                        <div className="column">
                            <label>Avg prizes per month 100-500</label>
                        </div>
                        <div className="column">
                            <label>Avg prizes per month 0-100</label>
                        </div>
                        <div className="column">
                            <label>Avg prizes per month 0</label>
                        </div>
                    </div>
                    <div className=" six column row">
                        <div className="column">
                            <h3>{this.state.avgPrizeMoney}</h3>
                        </div>
                        <div className="olive column">
                            <h3>{this.avg1000Plus}</h3>
                        </div>
                        <div className="column">
                        <h3>{this.avg500_1000}</h3>
                        </div>
                        <div className="olive column">
                        <h3>{this.avg100_500}</h3>
                        </div>
                        <div className="column">
                        <h3>{this.avg0_100}</h3>
                        </div>
                        <div className="olive column">
                        <h3>{this.avgZeroes}</h3>
                        </div>
                    </div>
                    <div className=" six column row">
                        <div className="column">
                            <label>Max prize money per month</label>
                        </div>
                        <div className="column">
                            <label>Min prize money per month</label>
                        </div>
                        <div className="column">
                            <label>Max prize</label>
                        </div>
                        <div className="column">
                            <label></label>
                        </div>
                        <div className="column">
                            <label></label>
                        </div>
                        <div className="column">
                            <label></label>
                        </div>
                    </div>
                    <div className=" six column row">
                        <div className="column">
                            <h3>{this.maxMonthlyTotal}</h3>
                        </div>
                        <div className="olive column">
                            <h3>{this.minMonthlyTotal}</h3>
                        </div>
                        <div className="column">
                        <h3>{this.maxPrize}</h3>
                        </div>
                        <div className="olive column">
                        
                        </div>
                        <div className="column">
                        
                        </div>
                        <div className="olive column">
                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SimulateMonth;