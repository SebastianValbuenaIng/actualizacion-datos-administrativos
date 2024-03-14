import Login from "@/components/pages/Login";

export default function LoginPage({ searchParams }: any) {
	return (
		<main>
			<Login searchParams={searchParams} />
		</main>
	);
}
