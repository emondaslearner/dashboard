import React, { useEffect, useState } from "react";
import Popover from "../../ui/Popover";
import Input from "../../ui/Input";

const Filter = ({
  buttonText,
  data = [],
  setSelected,
  itemsClass,
  className,
  search,
  selectedData,
}) => {
  const [selected, setSelectedData] = useState("");
  const [searchValue, setSearch] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    setSelectedData(selectedData);
  }, [selectedData]);

  // set item
  useEffect(() => {
    if (data.length) {
      setItems(data);
    }
  }, [data]);

  // search
  useEffect(() => {
    if (searchValue) {
      const filteredData = data.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase())
      );

      setItems(filteredData);
    } else {
      // If search value is empty, set filtered items to all items
      setItems(data);
    }
  }, [searchValue]);

  return (
    <Popover buttonText={buttonText}>
      <div className="pt-[10px]">
        {search === true && (
          <Input
            type="text"
            label="Search"
            value={searchValue}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Search"}
          />
        )}
        <div
          className={`max-w-[350px] flex items-center flex-wrap py-[20px] px-[10px] gap-[7px] ${className}`}
        >
          {items.length !== 0 ? (
            items.map((item, i) => (
              <div
                key={i}
                className={`px-[20px] py-[5px] border-[2px] border-primary rounded-[3px] cursor-pointer text-primary hover:text-white hover:bg-primary bg-transparent transition-all duration-200 ${itemsClass} ${
                  selected === item && "!bg-primary text-white"
                }`}
                onClick={() => {
                  setSelectedData(item);
                  setSelected(item);
                }}
              >
                {item}
              </div>
            ))
          ) : (
            <p className="text-[18px] mx-auto block">
              There is no data to display
            </p>
          )}
        </div>
      </div>
    </Popover>
  );
};

export default Filter;
