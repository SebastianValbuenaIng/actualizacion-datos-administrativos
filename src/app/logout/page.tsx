"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function LogoutPage({
	searchParams,
}: {
	params: object;
	searchParams: { error: string };
}) {
	useEffect(() => {
		const error = searchParams.error ? searchParams.error : false;
		signOut({
			callbackUrl: error ? `/login?error=${error}` : "/login",
		});
		  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
    return<></>

}
