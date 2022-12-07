import type { FunctionComponent } from "react";

type DividerProps = {
  text: string;
};

export const Divider: FunctionComponent<DividerProps> = ({ text }) => {
  return (
    <div className="flex flex-grow items-center opacity-50">
      <hr className="flex-grow rounded-full bg-white"></hr>
      <span className="p-4 text-white">{text}</span>
      <hr className="flex-grow rounded-full bg-white"></hr>
    </div>
  );
};
