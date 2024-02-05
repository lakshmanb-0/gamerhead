import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full h-[90vh] grid place-items-center [&>div>div>div:nth-child(4)]:hidden' >
            {children}
        </div>
    )
}

export default layout