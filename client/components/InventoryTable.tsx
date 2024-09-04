import React from "react";

interface InventoryTableProps {
  data: any[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ data }) => {
  var bagOnHand = 0;
  var boxOnHand = 0;
  var bagAvailable = 0;
  var boxAvailable = 0;

  for (const item of data) {
    bagOnHand += item.bagOnHand;
    boxOnHand += item.boxOnHand;
    bagAvailable += item.bagAvailable;
    boxAvailable += item.boxAvailable;
  }
  return (
    <div className="overflow-x-auto">
      <table className=" border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-200 bg-blue-100 ">
              Facility Name
            </th>
            <th className="px-4 py-2 border border-gray-200 bg-blue-100">
              Quantity on Hand
            </th>
            <th className="px-4 py-2 border border-gray-200 bg-blue-100">
              Quantity Available
            </th>
          </tr>
        </thead>
        <tbody>
          <tr key={0}>
            <td className="px-4 py-2 border border-gray-200">All Facilities</td>
            <td className="px-4 py-2 border border-gray-200">
              Unit(Bag): {bagOnHand} <br />
              Unit(Box): {boxOnHand}
            </td>
            <td className="px-4 py-2 border border-gray-200">
              Unit(Bag): {bagAvailable} <br />
              Unit(Box): {boxAvailable}
            </td>
          </tr>
          {data &&
            data.map((item, index) => (
              <tr key={index + 1}>
                <td className="px-4 py-2 border border-gray-200">
                  {item.facility} <br /> {item.zip}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  Unit(Bag): {item.bagOnHand} <br />
                  Unit(Box): {item.boxOnHand}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  Unit(Bag): {item.bagAvailable} <br />
                  Unit(Box): {item.boxAvailable}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
