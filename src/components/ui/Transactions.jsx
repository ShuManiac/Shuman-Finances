import { Trash2, Pencil } from 'lucide-react';
import { getIcon } from '../../lib/utils';
import { format, set } from 'date-fns';
import React from 'react'

export const Transactions = ({ items, setIsOpen, isOpen }) => {
  return (
    <>
    {items.map((expense) => (
                    <div
                        className="w-full max-w-sm p-6 m-3 text-center text-white border shadow-lg hover:-translate-y-1 hover:scale-100 shadow-red-500/10 bg-gray-500/10 border-gray rounded-2xl hover:shadow-black/40 xl:w-full lg:w-11/12 sm:m-0 sm:mb-4"
                        key={expense.id}
                    >
                        <div className='flex justify-end gap-3'>
                            <Trash2 className='w-5 h-5 text-red-500 cursor-pointer'
                            onClick={() => setIsOpen({...isOpen, delete: true, item: expense})}/>
                            <Pencil className='w-5 h-5 cursor-pointer text-sky-400' 
                            onClick={() => setIsOpen({...isOpen, upsert: true, item: expense, action: "EDIT"})}/>
                        </div>
                        <span className="text-2xl font-semibold break-words sm:text-xl ">
                            {expense.title}
                        </span>

                        <div className="flex items-center w-2/3 mt-4 sm:w-full">
                            <span className="px-2 text-xl sm:text-lg sm:px-8 sm:mx-auto">
                                ₪{(+expense.amount).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between mt-12">
                            <span className="px-2 mr-auto text-xl text-zinc-500 sm:text-lg">
                                {format(expense.date, 'dd/MM/yyyy')}
                            </span>
                            <p className='text-zinc-500'>{getIcon(expense.rating)}</p>
                        </div>
                    </div>
                ))}
    </>
  )
}
