import { syncUser } from "@/actions/syncUser";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function AuthCallback() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    const response = await syncUser({
      authId: user.id,
      //TODO: Add default fallback image for user
      imageUrl: user.picture ?? "",
      role: "USER",
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
    })

    if (response.user.id) return redirect("/home");
  }

  return redirect('/api/auth/login?post_login_redirect_url=/shop');
}
