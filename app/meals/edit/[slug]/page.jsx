import { getData } from "@/lib/actions.ts";
import Form from "@/component/Form"
export default async function Page({ params }) {
  const { slug } = await params;
  const meal = await getData(slug);

  return (
    <div>
      <h1>{meal.name}</h1>
      <Form props={{ loading:false, image:"", errors:[], handleSubmit, onImageChange, formData:{"name": meal.name, "price": meal.price} }} />
    </div>
  );
}
