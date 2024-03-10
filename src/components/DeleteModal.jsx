import React, { Children } from 'react'
import { Modal } from './ui/Modal'

export const DeleteModal = ({ setIsOpen, isOpen, title, deleteItem }) => {
  return (
    <Modal setIsOpen={setIsOpen} isOpen={isOpen} title={title}>
    <div className="flex flex-col items-center justify-center w-full h-full p-5">
        <h3 className="text-xl text-zinc-600">Are you sure you want to delete this item?</h3>
        <div className="flex justify-center w-full gap-8 mt-12">
            <button className="w-40 px-4 py-2 text-white bg-red-500 rounded-lg" 
            onClick={() =>{
              deleteItem()
              setIsOpen(false)
            }
            }>
              Delete
            </button>
            <button className="w-40 px-4 py-2 text-white bg-gray-500 rounded-lg" 
            onClick={() => 
              setIsOpen({...isOpen, delete: false})
            }>
              Cancel
            </button>
        </div>
    </div>
    </Modal>
  )
}
