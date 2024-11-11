import { TrainerTable } from "@/components/Datatable/TrainerTables";
import { TrainerModal } from "@/components/Modals/TrainersModal";

export default function Students(){
    return(
        <div className="min-h-screen p-10">
        <div className="flex justify-between m-3">

    <h1 className=" text-3xl text-center font-serif font-bold"> Students </h1>
        <TrainerModal/>
        </div>
<TrainerTable/>
    </div>
    )
}