import React from "react";

const page = ({
  params,
}: {
  params: {
    slug: string[];
  };
}) => {
  console.log(params);

  return <div>This is docs page</div>;
};

export default page;
