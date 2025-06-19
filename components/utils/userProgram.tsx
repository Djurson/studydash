import MT from "@/webscraping/6CEMEN-2022.json";
import KTS from "@/webscraping/ED-KTS/6CKTS.json";
import ED from "@/webscraping/ED-KTS/6CIEN.json";
import { UserData } from "@/utils/types";

export default function userProgram(userData: UserData | undefined) {
  let mapOfPrograms = mapPrograms();

  let program = mapOfPrograms.get(userData?.program);
  const programData = program as typeof MT;
  return programData.programs[0];
}

function mapPrograms() {
  let programMap = new Map<string | undefined, object>();
  MT.programs.forEach((getName) => {
    programMap.set(getName.name, MT);
  });
  KTS.programs.forEach((getName) => {
    programMap.set(getName.name, KTS);
  });
  ED.programs.forEach((getName) => {
    programMap.set(getName.name, ED);
  });
  return programMap;
}
