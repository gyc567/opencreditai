import { redirect } from "next/navigation";

export default function SellerPage() {
  // Redirect to register page by default
  redirect("/seller/register");
}
