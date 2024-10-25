import React from 'react'

const CreateCategory = ({ handleSubmit, setValue, value }) => {

    return (
        <div className='mt-3 p-2'>
            <h1 className='text-center'>
                CreateCategory
            </h1>

            <form onSubmit={handleSubmit} action="">
                <input placeholder='Create new category' type="text" value={value} onChange={(e) => setValue(e.target.value)} className='p-2 rounded 
                 border-2 border-red-500 m-2' />
                <input className='bg-green-500 px-3 py-1 rounded' type='submit' value="Create-Category" />
            </form>

        </div>
    )
}

export default CreateCategory