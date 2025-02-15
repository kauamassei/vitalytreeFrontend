import React from 'react'

type Props = {
    children: React.ReactNode;
}

const HText = ({children}: Props) => {
  return (
    <h1 className="basis3/5 font-monserrat text-3xl font-bold">
        {children}
    </h1>
  )
}

export default HText