import { redirect } from "next/navigation";
import { syncUser } from "@/actions/syncUserAction";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { fallbackUserImageUrl } from "@/lib/defaults";

export default async function AuthCallback() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect('/api/auth/login?post_login_redirect_url=/authcallback')

  const response = await syncUser({
    authId: user.id,
    //TODO: Add default fallback image for user
    imageUrl: user.picture ?? fallbackUserImageUrl,
    role: "USER",
    firstName: user.given_name,
    lastName: user.family_name,
    email: user.email,
  })

  if (response.user.id) return redirect("/home");


  return redirect('/api/auth/login?post_login_redirect_url=/shop');
}
