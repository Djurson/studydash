import data from '../../../data/data_processed.json'

export default async function Page() {

    // for (const [key, value] of Object.entries(data)) {
    //     console.log(`${key}: ${value}`);
    // }

    const terminArr = Object.entries(data);
    console.log(terminArr[terminArr.length - 1])
    console.log(typeof (terminArr[0]))

    return (
        <>
            <div aria-hidden="true" className="rollbacks-visual_connectingLine__5DJji">
                <svg data-size="small" fill="none" height="88" viewBox="0 0 129 88" width="129">
                    <path d="M3.99999 4.00001L3.99999 28.4324C3.99999 35.0598 9.37258 40.4324 16 40.4324L116 40.4324C122.627 40.4324 128 45.805 128 52.4324L128 88" stroke="url(#paint0_linear_6_107)" strokeWidth="2"></path>
                    <path d="M3.99999 4.00001L3.99999 28.4324C3.99999 35.0598 9.37258 40.4324 16 40.4324L116 40.4324C122.627 40.4324 128 45.805 128 52.4324L128 88" stroke="url(#paint1_linear_6_107)" strokeWidth="2"></path><g clipPath="url(#clip0_6_107)"><path clipRule="evenodd" d="M4 0.5L8 7.5H0L4 0.5Z" fill="#45DEC4" fillRule="evenodd"></path></g>
                    <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_6_107" x1="98" x2="34" y1="40.4324" y2="40.4324">
                            <stop stopColor="#E5484D"></stop><stop offset="0.5" stopColor="#FFC634"></stop><stop offset="1" stopColor="#45DEC4"></stop>
                        </linearGradient>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_6_107" x1="98" x2="98" y1="88" y2="-2.37837">
                            <stop stopColor="var(--ds-background-200)"></stop>
                            <stop offset="0.322368" stopColor="var(--ds-background-200)" stopOpacity="0"></stop>
                        </linearGradient><clipPath id="clip0_6_107">
                            <rect fill="white" height="8" width="8"></rect>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div className='w-full'>
                {terminArr.map((termin, index) => {
                    return (
                        <>
                            <p>{termin}</p>
                        </>
                    )
                })}
            </div>
        </>
    )
}