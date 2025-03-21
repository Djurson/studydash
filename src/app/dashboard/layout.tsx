import AuthProviderServer from "@/components/firebase/AuthProviderServer";
import { PageTemplate } from "@/components/PageTemplate";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProviderServer>
            <PageTemplate defaultPage={true}>
                {children}
            </PageTemplate>
        </AuthProviderServer>
    );
}
