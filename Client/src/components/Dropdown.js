import { Fragment, useEffect, useState } from "react";

export default function Dropdown({ placeholder, data, settingFunction }) {
  const [selected, setSelected] = useState(data[0]);
  // const [query, setQuery] = useState("");

  useEffect(() => {
    settingFunction(selected);
    console.log(selected);
  }, [selected, settingFunction]);

  // const filteredData =
  //   query === ""
  //     ? data
  //     : data.filter((person) =>
  //         person.name
  //           .toLowerCase()
  //           .replace(/\s+/g, "")
  //           .includes(query.toLowerCase().replace(/\s+/g, ""))
  //       );

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelected(JSON.parse(e.target.value));
  };

  return (
    <>
      {/* <div className="w-full ">
      <Combobox value={selected} onChange={setSelected}>
        <div className=" mt-1 ">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              placeholder={placeholder}
              displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className
                ="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full z-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredData.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div> */}
      <div className="flex justify-center">
        <div className="mb-3 w-96">
          <select
            className="form-select w-full rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm  border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            aria-label="Default select example"
            onChange={handleChange}
          >
            {data.map((person) => (
              <>
                <option
                  value={JSON.stringify(person)}
                  key={person.id}
                  className={`cursor-default select-none py-2 pl-10 pr-4 `}
                >
                  {person.name}
                </option>
              </>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
