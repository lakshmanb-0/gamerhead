import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { BiCartAlt } from "react-icons/bi";

const Search = ({ SearchData }) => {
  const router = useRouter();

  // handle click event on image redirect to game profile image
  const handleDetails = (id: number) => {
    router.push(`/GameProfile/${id}`);
  };

  return (
    <>
      <Head>
        <title>{`${router.query.input} Search`}</title>
      </Head>
      <div className="px-10">
        <h1 className="text-3xl ">{`'${router.query.input}'`}</h1>
        <div className="h-1 my-1 rounded w-[7%] bg-gradient-to-r from-[#fe1f94] to-[#fd2adf]" />
        <section>
          {SearchData.map(
            (item) =>
              item !== "" && (
                <div
                  className="grid grid-cols-4 items-center  gap-4 bg-[#0f0f0f] my-8"
                  key={item.steam_appid}
                >
                  <div className="grid grid-cols-3 gap-4 items-center col-span-3 justify-self-start">
                    <div
                      onClick={() => handleDetails(item.steam_appid)}
                      className="cursor-pointer"
                    >
                      <Image
                        src={
                          item.header_image
                            ? item.header_image
                            : "/noImage.jpeg"
                        }
                        alt={item.name}
                        width={1920}
                        height={1080}
                      />
                    </div>
                    <div className="flex flex-col col-span-2">
                      <h1 className="text-3xl font-bold">{item.name}</h1>
                      <span className="text-[#288754]">In stock</span>
                    </div>
                  </div>

                  <div className="justify-self-center">
                    {item?.price_overview?.final ? (
                      item.price_overview.discount_percent > 0 ? (
                        <>
                          <div className="flex items-center gap-4 py-3">
                            <span className=" border-2 border-[#7360ed] py-1 px-3">
                              {"-"}
                              {item.price_overview.discount_percent}%{" "}
                            </span>
                            <span className="line-through text-[#a3a3a3] text-xl">
                              <span className="pr-1">&#8377;</span>
                              {item.price_overview.initial.toLocaleString(
                                "en-IN"
                              )}{" "}
                            </span>
                          </div>

                          <div className="text-xl bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] flex items-center gap-3 px-4 py-2 cursor-pointer">
                            <BiCartAlt className="text-2xl" />
                            <div>
                              <span className="pr-1">&#8377;</span>
                              <span>
                                {item.price_overview.final.toLocaleString(
                                  "en-IN"
                                )}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <span className="text-xl bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] flex items-center gap-2 px-4 py-2 cursor-pointer">
                          <BiCartAlt className="text-2xl" />
                          {item.price_overview.final
                            ? `₹ ${item.price_overview.final.toLocaleString(
                              "en-IN"
                            )}`
                            : "Free to Play"}
                        </span>
                      )
                    ) : (
                      <span className="text-xl bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] flex items-center gap-2 px-4 py-2 cursor-pointer">
                        {item?.release_date?.coming_soon
                          ? "Coming Soon"
                          : item.is_free
                            ? "Free to Play"
                            : "Free"}
                      </span>
                    )}
                  </div>
                </div>
              )
          )}
        </section>
      </div>
    </>
  );
};

export default Search;
export async function getServerSideProps(context) {
  const { input } = context.query;

  const response = await SearchApi.get(`${input}/`);
  let searchIds = [];
  response.data.map((item) => searchIds.push(item.appid));

  const fetchData = async (id) => {
    const response = await apiDetails.get(`?appids=${id}&cc=IND&l=english`);
    const data = await response.data[id].data;
    return data ? data : "";
  };
  const SearchData = await Promise.all(
    searchIds.map(async (id) => {
      const response = await fetchData(id);
      return response;
    })
  );
  return {
    props: {
      SearchData,
    },
  };
}
