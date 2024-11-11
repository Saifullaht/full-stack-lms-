import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import "./style.css";

export default function Layout({ children }) {
    return (
        <div className="fade-in"> {/* Apply fade-in class here */}
            <Tabs defaultValue="dashboard" className="w-full font-serif">
                <TabsList className="w-full mt-2 gap-5 p-4">
                    <Link href={"/admin/dashboard"}>
                        <TabsTrigger className="tabbs" value="dashboard">Dashboard</TabsTrigger>
                    </Link>
                    <Link href={"/admin/courses"}>
                        <TabsTrigger className="tabbs" value="courses">Courses</TabsTrigger>
                    </Link>
                    <Link href={"/admin/batches"}>
                        <TabsTrigger className="tabbs" value="batches">Batches</TabsTrigger>
                    </Link>
                    <Link href={"/admin/trainers"}>
                        <TabsTrigger className="tabbs" value="trainers">Trainers</TabsTrigger>
                    </Link>
                    <Link href={"/admin/students"}>
                        <TabsTrigger className="tabbs" value="students">Students</TabsTrigger>
                    </Link>
                </TabsList>
                <TabsContent value="dashboard">{children}</TabsContent>
                <TabsContent value="courses">{children}</TabsContent>
                <TabsContent value="batches">{children}</TabsContent>
                <TabsContent value="trainers">{children}</TabsContent>
                <TabsContent value="students">{children}</TabsContent>
            </Tabs>
        </div>
    );
}
