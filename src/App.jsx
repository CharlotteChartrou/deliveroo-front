import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/img/logo-teal.svg";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fecthData = async () => {
      const response = await axios.get(
        "https://site--deliveroo-back--pzlwvwf45nxz.code.run/"
      );

      setData(response.data);
      console.log(response.data);
      setIsLoading(false);
    };
    fecthData();
  }, []);

  return (
    <>
      {isLoading ? (
        <span>Chargement...</span>
      ) : (
        <>
          <header>
            <img className="logo" src={logo} alt="logo" />
            <div className="container">
              <div className="bloc-titre">
                <div>
                  <h1>{data.restaurant.name}</h1>
                  <span className="title">{data.restaurant.description}</span>
                </div>
                <img src={data.restaurant.picture} />
              </div>
            </div>
          </header>
          <main>
            <div className="menu">
              {data.categories.map((cat, index) => {
                return (
                  <section className="bloc-meals" key={cat.name}>
                    <div>
                      <h2>{cat.name}</h2>
                    </div>

                    {cat.meals.map((meals, index) => {
                      return (
                        <div className="bloc" key={meals.id}>
                          <div className="meals">
                            {" "}
                            <h3>{meals.title}</h3>
                            <div className="meal-description">
                              <span>
                                {meals.description}
                                <div>{meals.price}€</div>
                              </span>
                            </div>
                          </div>
                          <img src={meals.picture} />
                        </div>
                      );
                    })}
                  </section>
                );
              })}
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default App;
