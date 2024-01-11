import React from 'react'

// using the React.forwardRef concept here...
const TextInput = React.forwardRef(({type, placeholder, customStyles, label, register, name, error, onChange}, ref) => {
  return (
    <div className='flex flex-col mt-2'>
        <p className='text-gray-600 text-sm mb-1'>{label}</p>
        <input 
            type={type}
            onChange={onChange}
            placeholder={placeholder} 
            name={name}
            ref={ref}
            className={`rounded border border-gray-400 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-500 text-base px-4 py-2 text-black ${customStyles}`}
            {...register}
            aria-invalid = {error ? 'true' : 'false'}
        />
        {
            error && (
                <span className='text-xs text-red-500 mt-0.5'>{error}</span>
            )
        }
    </div>
  )
})

export default TextInput