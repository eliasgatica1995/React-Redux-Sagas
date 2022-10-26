import React from 'react'
import { Form} from 'semantic-ui-react'
import ButtonSaveOrCancel from './ButtonSaveOrCancel'
import EntryForm from './EntryForm';

import useEntryDetails from '../hooks/useEntryDetails';

function NewEntryForm() {
  const {
    description,setDescription,value,setValue,isExpense,setisExpense,addEntry
} = useEntryDetails();
  
  return (
    <Form unstackable>

    <EntryForm 
        description={description}
        value={value}
        isExpense={isExpense}
        setValue={setValue}
        setDescription={setDescription}
        setisExpense={setisExpense}
    />

    <ButtonSaveOrCancel 
        addEntry={addEntry}
    />
  </Form>
  )
}

export default NewEntryForm