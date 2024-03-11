import { HomeRedirect } from "@/components/HomeRedirect";

export default function HomePage({
    searchParams,
}: {
    searchParams: { email?: string };
}) {

    return (
        <HomeRedirect email={searchParams.email} />
    );
}
