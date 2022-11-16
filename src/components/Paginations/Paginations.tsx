import React, { ChangeEvent, FC, Dispatch, SetStateAction } from "react";

type Props = {
    setSize: (arg?: number | null) => void;
    setPage: (args?: number) => void;
    size?: number | null;
    page?: number;
}

const Paginations: FC<Props> = (props) => {
  const { page, size, setSize, setPage } = props;

  const changeSize = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === undefined) {
        setSize(null)
    } else {
        setSize(Number(e.target.value))
    }
  }

  const nextPage = () => {
    setPage(page! + 1)
  }

  const prevPage = () => {
    setPage(page! - 1)
  }

  return (
    <div className="flex justify-between items-center">
      <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e: ChangeEvent<HTMLSelectElement>) => changeSize(e)}
      >
        <option value={undefined}>None</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      
      <div className="flex gap-5">
        <span className="px-8 py-2 border font-bold bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded-lg" onClick={() => prevPage()}>Prev</span>
        <span className="px-8 py-2 border font-bold bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded-lg" onClick={() => nextPage()}>Next</span>
      </div>
    </div>
  );
};

export default Paginations;
