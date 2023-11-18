// components 
import ProgressBar from "@/components/ProgressBar/ProgressBar";
// firebase 
import {db, auth, app} from "@/firebaseConfig";
import { collection, query, where, getDocs, onSnapshot  } from "firebase/firestore";
// next auth 
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";
import Link from "next/link";
import MainCard from "@/components/cards/MainCard";

export default async  function Home() {
  const session = await getServerSession(authOptions);
  if(!session?.user) redirect("/login");
  console.log("session .user .uid", session.user.uid)
  const allItems =[]
  const querySnapshot = await getDocs(query(collection(db, "items"), where('userId', "==" ,session?.user?.uid)));
  querySnapshot.forEach((doc) => {
    allItems.push({id:doc.id, ...doc.data()})
  });
  function getAllSpentMoney(spent) {
    let total = 0;
    spent.forEach(s => total += +s.value)
    return total
  }
  return (
    <main>
      <div className="container mx-auto py-12">
        <Link 
          href='/card/add'
          className="border-2 border-sky-700 text-sky-700 hover:bg-sky-700 hover:text-slate-50 transition-all rounded-md py-2 px-4"
        >
          Add Card
        </Link>
        <div className='flex gap-2 justify-center items-center py-4 flex-wrap'>
            { allItems?.length ?
              allItems.map(item => {
                return (
                  <MainCard
                    key={item.id} 
                    id={item.id}
                    name={item.name} 
                    percentage={`${ getAllSpentMoney(item.spent) / item.total  * 100}%`} 
                  />
                )
              }) : <p>No Cards Added</p>
            }
        </div>
      </div>
    </main>
  )
}
