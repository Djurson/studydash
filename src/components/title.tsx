interface TitleProps {
    title: string;
    subtitle: string;
}

export default function Title({ title, subtitle }: TitleProps) {
    return (
        <>
            <div className="flex flex-col w-full gap-1 font-semibold">
                <h1 className="text-3xl text-gray-900">{title}</h1>
                <h2 className="text-base text-gray-600">{subtitle}</h2>
            </div>
        </>
    )
}