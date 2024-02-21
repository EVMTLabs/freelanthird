import { MapPinIcon } from "@/components/Icons/MapPinIcon";

export const JobCard = () => {
  return (
    <div className="py-8 border-t">
      <div className="flex justify-between">
        <div className="flex">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
              <span>SS</span>
            </div>
          </div>
          <div className="flex flex-col max-w-xl justify-start px-4">
            <p className="text-sm font-bold">
              Saray Santiago{" "}
              <span className="font-light text-sm text-gray-500">
                | Posted 2 days ago
              </span>
            </p>
            <h3 className="text-2xl font-extrabold mt-1">Project Title</h3>
            <p className="font-medium mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              euismod bibendum laoreet. Proin gravida dolor sit amet lacus
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <button className="badge">React</button>
              <button className="badge">Node.js</button>
              <button className="badge">Express</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-extrabold text-end">$50 - 1000</p>
          <div className="flex text-sm items-center text-gray-500 text-end font-bold">
            <MapPinIcon strokeWidth={2} className="h-4 w-4" />
            <span>Remote</span>
          </div>
        </div>
      </div>
    </div>
  );
};
