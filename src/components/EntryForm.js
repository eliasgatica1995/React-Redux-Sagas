import React from 'react'
import { Checkbox, Form, Segment } from 'semantic-ui-react'

function EntryForm({value,description,isExpense,setValue,setDescription,setisExpense}) {
  return (
    <>
        <Form.Group>
            <Form.Input 
            icon='tags' 
            width={12} 
            label='Description' 
            placeholder='New Shinny Thing'
            value={description}
            onChange={(event)=>setDescription(event.target.value)}
            >
            </Form.Input>
            <Form.Input 
            icon='dollar' 
            iconPosition='left'
            width={4} 
            label='Value' 
            placeholder="100.00"
            value={value}
            onChange={(event)=>setValue(event.target.value)}
            >
            </Form.Input>
        </Form.Group>
        <Segment compact>
            <Checkbox 
            toggle 
            label='is expense' 
            checked={isExpense}
            onChange={()=>setisExpense((oldState)=> !oldState)}
            />
        </Segment>
    </>
  )
}

export default EntryForm