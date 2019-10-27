import React from 'react'
import { Form,  Button, Label} from 'semantic-ui-react'
import styled from 'styled-components'
import Cleave from 'cleave.js/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown, faSmile , faStar} from '@fortawesome/free-solid-svg-icons'

const CalculatorDiv = styled.div`

.blank{
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    height: 500px;
    width: 300px;
    margin: 0 auto;
}

.bad{
    border-radius: 5px;
    background-color: rgba(255, 0, 0, 0.7);
    padding: 20px;
    height: 500px;
    width: 300px;
    margin: 0 auto;

}

.good{
    border-radius: 5px;
    background-color: rgba(51, 170, 51, .7);
    padding: 20px;
    height: 500px;
    width: 300px;
    margin: 0 auto;
}

.amazing{
    border-radius: 5px;
    background-color: rgba(212, 175, 55, .7);
    padding: 20px;
    height: 500px;
    width: 300px;
    margin: 0 auto;
}
 

`

const PricesDiv = styled.div`

.hidden{
    display:none
}

.visible{
    background-color:rgba(255, 255, 255, .7);
    display: '',
    border: 4px dotted black,
    font-size:15px;
}
    
`





class Calculator extends React.Component {
    constructor(){
        super()
        this.form = React.createRef();
        this.state = {
            options: [],
            percentage: 0,
            party: 0,
            total: 0,
            tip: 0,
            final_total: 0,
            clicked: false,
            styling: 'blank'
        }
    }

    componentDidMount(){
        let arr = []
        for (let i=0; i <= 100 ; i+=5){
            arr.push({key: i, text: i, value: i})
        }
        this.setState({
            options: arr
        })
    }



    handleCalculation = (e) => {
        e.preventDefault()
        const {percentage, total} = this.state
        let value = ''
        let tip = (percentage/100) * total
        if (percentage < 15){
            value = 'bad'
        } else if (percentage >= 15 && percentage <= 25 ){
            value='good'
        } else{
            value= 'amazing'
        }
        this.setState({
            styling: value,
            clicked: true,
            tip: tip.toFixed(2),
            final_total: tip + total
        })
    }

    handleChange = (e) => {
        if (e.target.name === 'total'){
            e.target.value = e.target.value.slice(1).replace(".", "").replace(',',".")
        }
       this.setState({
           [e.target.name] : parseFloat(e.target.value)
       })
    }

    handleDropDownChange = (e, data) => {
        this.setState({
            [data.name] : parseInt(data.value)
        });
     }

 

    render(){
       
        const {party, clicked, tip, final_total, styling} = this.state
        return(
           
            <CalculatorDiv>
       
            <div className={styling}>
                <Form className='calculator-form' ref={this.form} onSubmit={this.handleCalculation}>
                <Label>Total Bill</Label>
                <Cleave
                required
                name='total'
                id='total'
                options={{numeral:true, numeralDecimalMark: ',',
                prefix:'$',
                delimiter: '.'} }
                onChange={this.handleChange}/>
                {/* <Form.Input name='total' onChange={this.handleChange}placeholder='Total Bill' type='number' required /> <br/> */}
                <Label>Tip Percentage</Label>
                <Form.Dropdown  placeholder='%'
                required
                onChange={this.handleDropDownChange}
                    compact
                    selection
                    name='percentage'
                    id ='percentage'
                    options= {this.state.options}
                /> <br/>
              <Label>Party Size
              </Label>
                <Form.Input id='party' placeholder='Enter the size of your party' onChange={this.handleChange} name='party' type='number' required /><br/>
                <Button type='submit'>Calculate Tip</Button>  
                </Form><br/>
                <PricesDiv>
                <div className={clicked ? 'visible' : 'hidden'}>
                <div>
                    Tip Amount: ${tip} <br/>
                    Tip per person: $ {(parseInt(tip)/party).toFixed(2)}
                    <br/> <br/>
                    Total Amount: $ {final_total.toFixed(2)} <br/>
                    Total Amount per person: $ {(final_total/party).toFixed(2)}  <br/> <br/>
                    {styling === 'bad' ? <p><b>Your tip is lower than the standard tip average of 15-20% </b>  <FontAwesomeIcon icon={faFrown} /></p> : (styling === 'good' ?  <p><b>Your tip is within the standard tip average </b> <FontAwesomeIcon icon={faSmile}/> </p> : <p><b>You are an all-star tipper!!! </b> <FontAwesomeIcon icon={faStar} size='sm'/></p> )}
                </div>
                </div>
                  
                </PricesDiv>
               
               
            </div>

            </CalculatorDiv>
        )
    }
}

export default Calculator