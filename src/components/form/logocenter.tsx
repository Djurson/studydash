import { Azeret_Mono } from 'next/font/google'
import MainIcon from '../mainicon'

const azeret_mono = Azeret_Mono({ subsets: ['latin'] })

export default function LogoCenter() {
    return (
        <>
            <div className="flex w-full justify-center items-center gap-4 py-4">
                <MainIcon className='w-7 h-7' />
                <p className={`${azeret_mono.className} font-medium text-3xl`}>Portalen</p>
            </div>
        </>
    )
}