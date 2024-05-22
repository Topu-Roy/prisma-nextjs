import { authCallbackBodySchema, authCallbackResponseSchema } from "@/zod/authcallback/authcallback";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import { redirect } from "next/navigation";
import { TypeOf } from "zod";

export default async function AuthCallback() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    const res = await axios.post(
      "http://localhost:3000/api/authcallback",
      {
        authId: user.id,
        //TODO: Add default fallback image for user
        imageUrl: user.picture || "",
        role: "USER",
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
      } satisfies TypeOf<typeof authCallbackBodySchema>,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const validatedResponse = authCallbackResponseSchema.parse(res.data)
    console.log(validatedResponse.user)

    if (!validatedResponse.user.id) return redirect("/error");

    if (validatedResponse.user.id) return redirect("/home");
  }

  return redirect("/home");
}
