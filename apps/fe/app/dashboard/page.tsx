"use client"
import Dashboard from "@/components/DashBoard";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    return <div>
        <Dashboard onLogout={() => {
            localStorage.removeItem('token')
            router.push("/");
        }}/>
    </div>
}