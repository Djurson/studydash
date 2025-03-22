import { NextRequest, NextResponse } from "next/server";
import { firestore } from "../../../firebase/server";

export enum ItemAccess {
  PUBLIC = "PUBLIC",
  USER = "USER",
  PRO = "PRO",
  ADMIN = "ADMIN",
}

export type Item = {
  id: string;
  title: string;
  access: ItemAccess;
};

const defaultItems: Item[] = [
  { id: "item-1", title: "I am a public item", access: ItemAccess.PUBLIC },
  { id: "item-2", title: "I am a public item", access: ItemAccess.PUBLIC },
  { id: "item-3", title: "I am a user item", access: ItemAccess.USER },
  { id: "item-4", title: "I am a user item", access: ItemAccess.USER },
  { id: "item-5", title: "I am a pro item", access: ItemAccess.PRO },
  { id: "item-6", title: "I am a pro item", access: ItemAccess.PRO },
  { id: "item-7", title: "I am a admin item", access: ItemAccess.ADMIN },
];

export async function GET(request: NextRequest) {
  try {
    if (!firestore) {
      return new NextResponse("Internal Error: no firestore", { status: 500 });
    }

    const response = await firestore.collection("items").get();
    const items = response.docs.map((doc) => doc.data());

    if (items.length <= 0) {
      const batch = firestore.batch();
      defaultItems.forEach((item) => {
        const itemRef = firestore?.collection("items").doc();
        if (itemRef) batch.set(itemRef, item);
      });
      batch.commit();
      return NextResponse.json(defaultItems);
    }

    return NextResponse.json(items);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
