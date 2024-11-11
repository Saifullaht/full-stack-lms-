import { BatchesTable } from "@/components/batchModal/Batchtable";
import { BatchModal } from "@/components/Modals/batchModals";

export default function Batches() {
  return (
    <div className=" min-h-screen p-10">
      <div className="flex justify-between my-2">
        <h1 className=" text-3xl text-center font-serif font-bold">
          
          batches
        </h1>
        <BatchModal/>
      </div>
      <BatchesTable />
    </div>
  );
}
