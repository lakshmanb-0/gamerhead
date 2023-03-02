import Image from "next/image";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [dataNo, setDataNo] = useState(1);
  const [data, setData] = useState({ id: 1, name: "hello" });
  const arr = [
    {
      id: 1,
      name: "hello",
    },
    {
      id: 2,
      name: "hello",
    },
    {
      id: 3,
      name: "hello",
    },
    {
      id: 4,
      name: "hello",
    },
    {
      id: 5,
      name: "hello",
    },
    {
      id: 6,
      name: "hello",
    },
  ];
  console.log(dataNo);
  console.log(data);

  useEffect(() => {
    arr.map((item) => {
      item.id == dataNo && setData(item);
    });
  }, [dataNo]);

  return (
    <section>
      {/* game data  */}
      <div>
        {/* <Image src="hello" width={1080} height={1920} alt="hello" /> */}
        <span>{data.id}</span>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed veritatis
          minus suscipit.
        </h1>
        <p>
          Starting at <span>3900</span>
        </p>
        <div>
          <button>Buy Now</button>
          <button>Add to Wishlist</button>
        </div>
      </div>

      {/* games list  */}
      {arr.map((item) => (
        <div key={item} onClick={() => setDataNo(item)}>
          {/* <Image src="hello" width={1080} height={1920} alt="hello" /> */}
          <h1>destiny 2</h1>
        </div>
      ))}
    </section>
  );
};

export default Header;
