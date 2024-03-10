import React, { useEffect, useState } from 'react';
import { H1 } from './ui/H1';
import { UpsertModal } from './UpsertModal';
import { v4 as uuidv4 } from 'uuid';
import { DeleteModal } from './DeleteModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Transactions } from './ui/Transactions';

export const Expenses = () => {

    const [showAll, setShowAll] = useState(true);
    const [rating, setRating] = useState(0);
    const [isOpen, setIsOpen] = useState({
        // upsert is upsert or edit
        upsert: false,
        delete: false,
        item: null,
        action: ''
    });


    const [expenses, setExpenses] = useState([]);
    const [text, setText] = useState('');
    let [curMonth, setCurMonth] = useState(0);
    
    const onSubmit = (data) => {
      if(isOpen.action === "EDIT"){
        const newExpenses = expenses.map((expense) => {
            if(expense.id === isOpen.item.id){
                return {
                    ...expense,
                    ...data,
                    rating
                }
            }
            return expense
        })
        localStorage.setItem('expenses', JSON.stringify(newExpenses))
      } else {
        const newExpense = {
            id: uuidv4(),
            ...data,
            rating,
        }

        localStorage.setItem('expenses', JSON.stringify([...expenses, newExpense]))
      }
      setIsOpen(false)
      setRating(0)
    }

    const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];

   
    const deleteExpense = (id) => {
        const newExpenses = expenses.filter((expense) => expense.id !== id)
        localStorage.setItem('expenses', JSON.stringify(newExpenses))
        setIsOpen({...isOpen, delete: false, id: null})
    }

    const results = expenses?.filter(expense => { 
        const expenseDate = new Date(expense.date);
        return(
        (expense.title?.toLowerCase().includes(text?.toLowerCase()) && ( showAll || expenseDate.getMonth() === curMonth))
        );
    });

    const sum = results?.reduce((acc, expense) => acc + +expense.amount, 0) || 0 // פלוס הופך ל int


    const editExpense = (id) => {
        const expense = expenses.find((expense) => expense.id === id)
        setIsOpen({...isOpen, upsert: true, expense})
    }


     useEffect(() => {
        if(!isOpen){
            setRating(0)
        }
      const expenses = JSON.parse(localStorage.getItem('expenses'));
      if(expenses){
        setExpenses(expenses)
      }
      else{
        setExpenses([])
      }
    }, [isOpen])

    
    return (
        <main className=''>
            <div className='flex flex-col justify-center p-6 text-center'>
                <H1 className={'text-slate-500'}>Expenses</H1>
                <h2 className='pt-5 text-2xl text-slate-500'>Total Expenses: {sum}₪</h2>
                <input
                    className='w-10/12 p-2 m-2 mx-auto mt-8 text-gray-700 bg-gray-200 sm:w-72 rounded-xl'
                    type="text"
                    placeholder="Search Expenses..."
                    onChange={({target}) => setText(target.value)}
                />
                <div className='flex justify-center p-6 text-center'>
                    <FontAwesomeIcon 
                        className='text-3xl text-white' icon = {faArrowLeft} 
                        onClick = {() => {
                            if(curMonth > 0) 
                                setCurMonth(--curMonth)
                        }}
                    />
                    <h2 
                        className='pl-3 pr-3 text-xl text-white'>{months[curMonth]}
                    </h2>
                    <FontAwesomeIcon
                        className='text-3xl text-white' icon = {faArrowRight} 
                        onClick = {() => {
                            if(curMonth < 11)
                                setCurMonth(++curMonth)
                        }}
                    />
                    <button className='flex items-center justify-center pl-7 pr-7 
                    px-4 py-0.5 text-xl text-center text-white rounded-lg ml-7
                     bg-slate-700'
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? 'Filter Months' : 'Clear Filters'}
                    </button>
                </div>
            </div>
            <div className='flex max-sm:justify-center'>
                <button className='w-8/12 p-2 mt-8 text-white border sm:w-72 lg:ml-5 bg-black/40 rounded-xl' onClick = {() => setIsOpen({...isOpen, upsert: true})}>Add Expense</button>
            </div>
            {results.length?(
                <div className="grid gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">               
                
                <Transactions 
                    items = {results}
                    setIsOpen = {setIsOpen}
                    isOpen = {isOpen}
                />
            </div>
            ): (
                <div className='flex justify-center p-6 text-center'>
                    <h2 className='text-2xl text-slate-500'>No Expenses Found...</h2>
                </div>
            )}
            
            {isOpen.upsert ? (
                <UpsertModal 
                setIsOpen = {setIsOpen} 
                isOpen = {isOpen} 
                title = {isOpen.action === "EDIT" ? 'Edit Expense' : 'Add Expense'} 
                onSubmit = {onSubmit}
                rating = {rating}
                setRating = {setRating}
                />
            ) : null}

            {isOpen.delete ? (
                <DeleteModal
                    setIsOpen={setIsOpen}
                    isOpen={isOpen.delete}
                    title = 'Delete Expense'
                    deleteItem = {() => deleteExpense(isOpen.item.id)}
                />

            ):null}

        </main>
    )
}
