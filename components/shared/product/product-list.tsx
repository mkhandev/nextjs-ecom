import { log } from "console";
import React from "react";

function ProductList({
  data,
  title,
  limit,
}: {
  data: any;
  title?: string;
  limit?: number;
}) {
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      <h2 className="mb-4 h2-bold">{title}</h2>
      {data.length > 0 ? (
        <div className="grid gap-4 grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {limitedData.map((product: any) => (
            <div>{product.name}</div>
          ))}
        </div>
      ) : (
        <div>
          <p>No product found.</p>
        </div>
      )}
    </div>
  );
}

export default ProductList;
