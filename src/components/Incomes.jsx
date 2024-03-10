import React, { useEffect, useState } from 'react';
import { H1 } from './ui/H1';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { UpsertModal } from './UpsertModal';
import { Transactions } from './ui/Transactions';
import { DeleteModal } from './DeleteModal';

export const Incomes = () => {
    
    const [showAll, setShowAll] = useState(true);
    const [rating, setRating] = useState(0);
    const [isOpen, setIsOpen] = useState({
        // upsert is upsert or edit
        upsert: false,
        delete: false,
        item: null,
        action: ''
    });


    const [incomes, setIncomes] = useState([]);
    const [text, setText] = useState('');
    let [curMonth, setCurMonth] = useState(0);
    
    const onSubmit = (data) => {
      if(isOpen.action === "EDIT"){
        const newIncomes = incomes.map((income) => {
            if(income.id === isOpen.item.id){
                return {
                    ...income,
                    ...data,
                    rating
                }
            }
            return income
        })
        localStorage.setItem('incomes', JSON.stringify(newIncomes))
      } else {
        const newIncome = {
            id: uuidv4(),
            ...data,
            rating,
        }

        localStorage.setItem('incomes', JSON.stringify([...incomes, newIncome]))
      }
      setIsOpen(false)
      setRating(0)
    }

    const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];

   
    const deleteIncome = (id) => {
        const newIncomes = incomes.filter((income) => income.id !== id)
        localStorage.setItem('incomes', JSON.stringify(newIncomes))
        setIsOpen({...isOpen, delete: false, id: null})
    }

    const results = incomes?.filter(income => { 
        const incomeDate = new Date(income.date);
        return(
        (income.title?.toLowerCase().includes(text?.toLowerCase()) && ( showAll || incomeDate.getMonth() === curMonth))
        );
    });

    const sum = results?.reduce((acc, income) => acc + +income.amount, 0) || 0 // פלוס הופך ל int


    const editIncome = (id) => {
        const income = incomes.find((income) => income.id === id)
        setIsOpen({...isOpen, upsert: true, income})
    }


     useEffect(() => {
        if(!isOpen){
            setRating(0)
        }
      const incomes = JSON.parse(localStorage.getItem('incomes'));
      if(incomes){
        setIncomes(incomes)
      }
      else{
        setIncomes([])
      }
    }, [isOpen])
    
    return (
    <div>
        <div className='flex flex-col justify-center p-6 text-center'>
                <H1 className={'text-slate-500'}>Incomes</H1>
                <h2 className='pt-5 text-2xl text-slate-500'>Total Incomes: {sum}₪</h2>
                <input
                    className='w-10/12 p-2 m-2 mx-auto mt-8 text-gray-700 bg-gray-200 sm:w-72 rounded-xl'
                    type="text"
                    placeholder="Search Incomes..."
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
                <button className='w-8/12 p-2 mt-8 text-white border sm:w-72 lg:ml-5 bg-black/40 rounded-xl' 
                 onClick = {() => setIsOpen({...isOpen, upsert: true})}>
                    Add Income
                </button>
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
                    <h2 className='text-2xl text-slate-500'>No Incomes Found...</h2>
                </div>
            )}

            {isOpen.upsert ? (
                <UpsertModal 
                setIsOpen = {setIsOpen} 
                isOpen = {isOpen} 
                title = {isOpen.action === "EDIT" ? 'Edit Income' : 'Add Income'} 
                onSubmit = {onSubmit}
                rating = {rating}
                setRating = {setRating}
                />
            ) : null}

            {isOpen.delete ? (
                <DeleteModal
                    setIsOpen={setIsOpen}
                    isOpen={isOpen.delete}
                    title = 'Delete Income'
                    deleteItem = {() => deleteIncome(isOpen.item.id)}
                />

            ):null}
    </div>
  )
}
