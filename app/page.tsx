import { Meal } from "./api/meals/route";
import { getCurrentUser } from "@/lib/actions";
import { redirect } from "@/node_modules/next/navigation";
import List from "@/component/List";
export default async function Page() {
  const authenticated = await getCurrentUser();
  if (!authenticated) {
    redirect("/login");
  }
  let data: Meal[] = await fetchData();
  return <List props={data} />;
}

async function fetchData() {
  const res = await fetch("http://localhost:3000/api/meals", {
    method: "GET",
  });

  const data = await res.json();
  return data;
}
