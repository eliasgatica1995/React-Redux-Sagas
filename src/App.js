import { useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import './App.css';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import MainHeader from './components/MainHeader';
import NewEntryForm from './components/NewEntryForm';
import EntryLines from './components/EntryLines';
import ModalEdit from './components/ModalEdit';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEntries } from './actions/entries.actions';

function App() {

  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const entries = useSelector((state)=>state.entries);
  //selector, para ver el estado
  const {isOpen,id} = useSelector((state)=>state.modals);
  //valores para modal cuando edito
  const [entry, setEntry] = useState();
  //guarda los cambios en la entrada que modifique
  useEffect(() => {
    /*
    if (!isOpen &&entryId){
      const index=entries.findIndex(entry=>entry.id=== entryId)
      const newEntries= [...entries];
      //cuando edito son los valores que pueden cambiar
      newEntries[index].description = description;
      newEntries[index].value = value;
      newEntries[index].isExpense= isExpense;
      //cambio el estado por las mismas entradas pero con la modificacion
      //setEntries(newEntries);
      resetEntry();

    }
    //solo actúa cuando cambia isOpen
    */
    const index = entries.findIndex(entry => entry.id === id);
    setEntry(entries[index]);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen,id]);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    entries.map((entry)=>
    {
      if (entry.isExpense){
        return (totalExpense+= Number(entry.value));
      }
        return (totalIncome+=Number(entry.value));
    }
    );
    setTotal(totalIncome - totalExpense);
    setExpenseTotal(totalExpense);
    setIncomeTotal(totalIncome);
   
  }, [entries])
  


/*
  //filtro entries para todas aquellas que tienen un id distinto al parametro
  function deleteEntry(id){
    const result =entries.filter(entry =>entry.id !== id)
    //setEntries(result);
  }
  */
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllEntries())
    
  }, [dispatch])
  
  return (
   <Container>
      <MainHeader title="Budget"/>
      <DisplayBalance title="Your Balance" value={total} size="small"/>
      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal}/>
        <MainHeader title="History" type="h3"/>

          <EntryLines entries={entries}/>
          
          <MainHeader title="Add new transaction" type="h3"/>
        
          <NewEntryForm/>
          <ModalEdit isOpen={isOpen} {...entry}/>
    </Container>
  );
}

export default App;
