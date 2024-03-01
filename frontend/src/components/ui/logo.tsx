import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return (
    <div className="">
      <Image
        src="/images/logo.png"
        width={200}
        height={200}
        alt="Picture of the dolphin logo"
      />
    </div>
  )
}

export default Logo
