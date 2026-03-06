import AdminProviders from "./providers";
import AdminNav from "./AdminNav";
import styles from "./admin.module.scss";

export const metadata = { title: "Admin — AirTwo" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminProviders>
            <div className={styles.shell}>
                <AdminNav />
                <main className={styles.content}>{children}</main>
            </div>
        </AdminProviders>
    );
}
