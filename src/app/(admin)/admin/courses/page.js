"use client"
import { CourseTable } from "@/components/Datatable/datatablecourse";
import { CourseDialog } from "@/components/Modals/AddCourseModal";
import { Button } from "@/components/ui/button";

export default function Courses(){
    return(
        <div className="min-h-screen p-10">
            <div className="flex justify-between m-3">

        <h1 className=" text-3xl text-center font-serif font-bold"> Courses </h1>
         <CourseDialog/>
            </div>
        <CourseTable/>
        </div>
    )
}