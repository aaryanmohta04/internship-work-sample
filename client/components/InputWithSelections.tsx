"use client";

interface InputProps {
  searchQuery: string;
  setSearchQuery: Function;
  setSelectedItem: Function;
  showDropdown: boolean;
  setShowDropdown: Function;
  dataOptions: any;
  setDataOptions: Function;
  rawData: any;
  handleAdd: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const InputWithSelection: React.FC<InputProps> = ({
  searchQuery,
  setSearchQuery,
  setSelectedItem,
  showDropdown,
  setShowDropdown,
  dataOptions,
  setDataOptions,
  rawData,
  handleAdd,
}) => {
  const handleSearchQuery = (e: any) => {
    if (!showDropdown) setShowDropdown(true);
    setSearchQuery(e.target.value);
    setDataOptions(
      rawData.filter((brand: any) =>
        brand.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleOptionClick = (brandName: string, brandId: number) => {
    setSearchQuery(brandName);
    setSelectedItem(String(brandId));
    setShowDropdown(false);
  };

  const handleInputBlur = (event: any) => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 250);
  };

  return (
    <div className="mb-4 relative">
      <input
        id="textInput"
        type="text"
        value={searchQuery}
        onFocus={() => setShowDropdown(true)}
        onChange={handleSearchQuery}
        onBlur={handleInputBlur}
        className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
      />
      {showDropdown && (
        <ul className="absolute z-50 mt-1 w-40 h-auto max-h-96 bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto">
          {dataOptions.map((brand: any) => (
            <li
              className="px-3 py-2 hover:bg-gray-100"
              key={brand.id}
              onClick={() => handleOptionClick(brand.name, brand.id)}
            >
              {brand.name}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleAdd}
        className="ml-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
      >
        SAVE
      </button>
    </div>
  );
};
export default InputWithSelection;
