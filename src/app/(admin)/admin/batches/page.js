import { BatchesTable } from "@/components/batchModal/Batchtable";

export default function Batches(){
    return(
        <div className=" min-h-screen p-10">
            <div className="flex justify-between my-2">

        <h1 className=" text-3xl text-center font-serif font-bold"> batches </h1>
       
</div>
        <BatchesTable/>
        </div>
    )
}