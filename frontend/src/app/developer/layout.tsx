"use client"
import withAuth from "@/hoc/WithAuth";

const Developer = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            {children}
        </>

    );
}
export default withAuth(Developer, { allowedRoles: ['Developer'] })