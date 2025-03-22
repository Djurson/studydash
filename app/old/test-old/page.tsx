import AlertPopupWindow from "@/components/main/alert-popup";
import { Item, ItemAccess } from "../items/route"

export default async function Page() {
    let items: Item[] = [];

    // const response = await fetch(`${process.env.API_URL}/api/items`);

    // if (response.ok) {
    //     const itemsJSON = await response.json();
    //     if (itemsJSON && itemsJSON.length > 0)
    //         items = itemsJSON;
    // }

    return (
        <>
            {/* <div className="w-full h-screen flex flex-col items-center justify-center gap-6"> */}
            {/* {items.map((item) => {
                    return (
                        <div className="flex w-60 justify-between px-4 py-2 rounded-sm items-center bg-gray-100" key={item.id}>
                            <p>{item.title}</p>
                            <span className={`${item.access === ItemAccess.ADMIN
                                ? 'bg-orange-400'
                                : item.access === ItemAccess.PRO
                                    ? 'bg-emerald-400'
                                    : item.access === ItemAccess.USER
                                        ? 'bg-pink-600'
                                        : 'bg-gray-900'}
                                        text-white text-xs px-2 py-1 rounded-full`}
                            >
                                {item.access}
                            </span>
                        </div>
                    )
                })} */}
            <AlertPopupWindow
                title="Ingen kursinfo?"
                description="Vi kan inte hitta någon studieinformation kopplat till ditt konto? Denna tjänst baseras på att du laddar upp ett ladok resultatintyg eller
                manuellt fyller i kurser och examinationsmoment. Har du redan fyllt i din kursinformation? Vänligen välj rapportera ett fel."
                actiontext="Fyll i kursinformation"
                defaultOpen={false}
            />
            {/* </div > */}
        </>
    )
}