import React from 'react'
import Image from 'next/image'
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/">
            <Image
                src="/images/logo.png"
                width={200}
                height={200}
                alt="Picture of the dolphin logo"
            />
        </Link>
    )
}

export default Logo
