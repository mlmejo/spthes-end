import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";

export default function AcademicLevelSelect({ value, onSelect, ...rest }) {
  const [academicLevels, setAcademicLevels] = useState([]);

  const [selected, setSelected] = useState(value ?? null);

  useEffect(() => {
    const fetchAcademicLevels = async () => {
      try {
        const response = await axios.get(route("api.academic-levels.index"));
        setAcademicLevels(
          response.data.map((a) => {
            return {
              label: a.name,
              value: a.id,
            };
          })
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchAcademicLevels();
  }, []);

  const handleChange = (option) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <Select
      {...rest}
      options={academicLevels}
      value={selected}
      onChange={handleChange}
      isClearable
      isSearchable
      placeholder="Select Academic Level"
      classNames={{
        menuButton: ({ isDisabled }) =>
          `flex mt-1 z-1 py-0.5 text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
            isDisabled
              ? "bg-gray-200"
              : "bg-white hover:border-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20"
          }`,
        menu: "relative  w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-gray-700",
        listItem: ({ isSelected }) =>
          `block transition duration-200 px-2 text-sm py-2 cursor-pointer select-none truncate rounded ${
            isSelected
              ? "text-white bg-indigo-500"
              : "text-gray-500 hover:bg-indigo-100 hover:text-indigo-500"
          }`,
      }}
    />
  );
}
