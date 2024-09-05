import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

// Updated parseData function
const parseData = (data) => {
  if (typeof data !== "string") {
    console.error("Data is not a string:", data);
    return [];
  }

  const stadionEntries = data.split("\n").filter((line) => line.trim() !== "");

  return stadionEntries
    .map((item) => {
      const match = item.match(
        /^(\d+)\.\s+(.*?)\s+-\s+Rp([\d.,]+)\s+-\s+(.*)$/
      );
      if (!match) return null;

      const [, , name, price, description] = match;

      return {
        name: name.trim(),
        price: `Rp ${price.trim()}`,
        description: description.trim(),
      };
    })
    .filter(Boolean);
};

export default function StadionList() {
  const location = useLocation();
  const { stadionData } = location.state || { stadionData: "" };

  console.log("Data received:", stadionData);

  const stadions = parseData(stadionData);
  console.log("Parsed stadions:", stadions);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4 bg-gray-100 min-h-screen">
      {hotels.length === 0 ? (
        <Typography color="blue-gray" className="text-center">
          No stadions found.
        </Typography>
      ) : (
        stadions.map((stadion, index) => (
          <Card key={index} className="w-full max-w-sm">
            <CardBody>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                {stadion.name}
              </Typography>
              {/* <Typography color="blue-gray" className="mb-2">
                {stadion.price}
              </Typography> */}
              <Typography color="blue-gray">{stadion.description}</Typography>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
}
