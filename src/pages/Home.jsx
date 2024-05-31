import React, { useEffect, useState } from "react";
import Spinner from "../compoents/spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchCountryDataFromApi } from "../utils/api";
import { useNavigate } from "react-router";

export default function Home() {
  const [data, setData] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchInitialData = () => {
    setLoading(true);
    fetchCountryDataFromApi(`?limit=20&offset=${offset}`).then((res) => {
      setData(res);
      setOffset((prev) => prev + 20);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchCountryDataFromApi(`?limit=20&offset=${offset}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setOffset((prev) => prev + 20);
    });
  };
  
  const getLoaction = (loaction) => {
    const {lat, lon} = loaction ;
    navigate(`/weather/${lat}/${lon}`);
  }

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    
    <div className="container">
    {loading && <Spinner initial={true} />}
    {!loading && (
      <>
        {data?.results?.length > 0 ? (
          <>
            <div className="d-flex justify-content-center mt-4">
              <h2>Click On The City To Know About The Weather</h2>
            </div>
            
                <InfiniteScroll 
                  dataLength={data.results.length || 0}
                  next={fetchNextPageData}
                  hasMore={offset <= data.total_count}
                  loader={<Spinner />}
                  >
                    <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Country</th>
                  <th scope="col">Timezone</th>
                  <th scope="col">Check Weather </th>
                </tr>
              </thead>
                  <tbody>
                  {data.results.map((item, index) => (
                    <tr key={item.geoname_id}>
                      <td scope="row">{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.cou_name_en}</td>
                      <td>{item.timezone}</td>
                      <td><button type='button' className='btn btn-primary m-1' onClick={(() => getLoaction(item.coordinates))}>Click</button></td>
                      
                    </tr>
                  ))}
              </tbody>
            </table>
                </InfiniteScroll>
          </>
        ) : (
          <span className="resultNotFound">Sorry, Results not found!</span>
        )}
      </>
    )}
  </div>
  )
}
