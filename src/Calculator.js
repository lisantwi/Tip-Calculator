import React from 'react'
import { Form, Dropdown , Button} from 'semantic-ui-react'
import styled from 'styled-components'

const CalculatorDiv = styled.div`
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    height: 400px;
    width: 300px;
    margin: 0 auto;
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
            final_total: 0
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



    handleCalculation = () => {
        const {percentage, total} = this.state
        let tip = (percentage/100) * total
        this.setState({
            tip: tip,
            final_total: tip + total
        })
    }

    handleChange = (e) => {
       this.setState({
           [e.target.name] : parseInt(e.target.value)
       })
    }

    handleDropDownChange = (e, data) => {
        debugger
        this.setState({
            [data.name] : data.value
        });
     }
  

    render(){
        return(
            <CalculatorDiv>
            <div>
                <Form ref={this.form} onSubmit={this.handleCalculation}>
                <Form.Input name='total' onChange={this.handleChange}placeholder='Total Bill' type='number' required /> <br/>
                <Dropdown placeholder='Tip Percentage'
                onChange={this.handleDropDownChange}
                    compact
                    selection
                    name='percentage'
                    options= {this.state.options}
                /> <br/><br/>

                <Form.Input placeholder='Party Size' onChange={this.handleChange} name='party' type='number' required /><br/>
                <Button type='submit'>Calculate Tip</Button>
                </Form><br/>
                <p>
                    Tip: ${this.state.tip} <br/>
                    Total: ${this.state.final_total} 
                </p>
            </div>
            </CalculatorDiv>
        )
    }
}

export default Calculator