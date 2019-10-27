import React from 'react';
import { shallow,wrapper, mount, render } from 'enzyme';
import Calculator from '../Calculator';

describe('Calculator Component', () => {
 
    // Testing to see if the calculator includes a calculator form.
    it('renders a total input', () => {
      expect(shallow(<Calculator/>).find('#total').length).toEqual(1)
    })

    it('renders a party size input', () => {
        expect(shallow(<Calculator/>).find('#party').length).toEqual(1)
      })

      it('renders a parcentage input', () => {
        expect(shallow(<Calculator/>).find('#percentage').length).toEqual(1)
      })

      describe('party size change', () => {
  
        it('should respond to change event and change the state of the Calculator Component', () => {
         
         const wrapper = shallow(<Calculator />);
         wrapper.find('#party').simulate('change', {target: {name: 'party', value: '5'}});
         
        expect(wrapper.state('party')).toEqual(5);
        })
       })

       describe('total input change', () => {
  
        it('should respond to change event and change the state of the Calculator Component', () => {
         
         const wrapper = shallow(<Calculator />);
         wrapper.find('#total').simulate('change', {target: {name: 'total', value: "$22"}});
         
        expect(wrapper.state('total')).toEqual(22);
        })
       })
      
  
       
})

