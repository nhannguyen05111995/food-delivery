"use client";
import Item from "@/component/Item";
export default function Page({ props }) {
  const data = props;
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {data.map((meal) => (
        <Item meal={meal} key={meal._id} />
      ))}
    </div>
  );
}
