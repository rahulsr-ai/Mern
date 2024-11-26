import React from 'react'

const CreateCategory = ({ handleSubmit, setValue, value }) => {


    function checkValue(setValue) {
        setValue((prev) => {
            console.log(prev === null);
            return value
        })
    }

    checkValue(setValue)


    return (
        <div className='mt-3 p-2'>
            <h1 className='text-center'>
                CreateCategory
            </h1>

            <form onSubmit={handleSubmit} >
                <input placeholder='Create new category' type="text" value={value} onChange={(e) => setValue(e.target.value)} className='p-2 rounded 
                 border-2 border-red-500 m-2' />
                <input className='bg-green-500 px-3 py-1 rounded' type='submit' value="Confirm" />
            </form>

        </div>
    )
}

export default CreateCategory