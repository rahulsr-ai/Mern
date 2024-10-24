import React from 'react'

const CrateCategory = ({ submitHandler, setName, name }) => {
   
    return (
        <div className='mt-3 p-2'>
            <h1 className='text-center'>
                CrateCategory
            </h1>

            <form onSubmit={submitHandler} action="">
                <input placeholder='Create new category' type="text" value={name} onChange={(e) => setName(e.target.value)} className='p-2 rounded 
                 border-2 border-red-500 m-2' />
                <input className='bg-green-500 px-3 py-1 rounded' type='submit' value="Create-Category" />
            </form>

        </div>
    )
}

export default CrateCategory