import React from 'react'

const CustomButton = ({title, customBtnStyle, iconRight, type, onClick}) => {
  return (
    <button type={type || 'button'}
        className={`inline-flex items-center ${customBtnStyle}`}
        onClick={onClick}
        > {title}
         {iconRight ? <div className='ml-2'>{iconRight}</div>: ''}
    </button>
  )
}

export default CustomButton