import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams()
  const [loading, setLoading] = React.useState(false)
  const [cocktail, setCocktail] = React.useState(null)

  const getCocktail = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${id}`)
      const data = await response.json()
      console.log(data)
      setCocktail(data.drinks[0])
    } catch (error) {
      setLoading(false)
      console.log(error)
      setCocktail({})
    }

    setLoading(false)

  }
  
  React.useEffect(() => {
    getCocktail()
  }, [id])

  if (loading) {
    return <Loading />
  }
  
  if (!cocktail) {
    return (
      <>
      <h3>Details unavailable at this time for {id}</h3>
      <Link to='/' className='btn btn-primary'>
      Back Home
    </Link>
      </>
    )  
  }

  const {strDrink, strInstructions, strDrinkThumb, strAlcoholic, strGlass} = cocktail
  return (
    <>
    <section className='cocktail-section section'>
    <Link to='/' className='btn btn-primary'>
      Back Home
    </Link>
      <div className='img-container'>
        <img src={strDrinkThumb} alt={strDrink} />
      </div>
      <div className='cocktail-footer'>
        <h3>{strDrink}</h3>
        <h4>{strGlass}, {strAlcoholic}</h4>
        <div className='drink-data'>
          <h5>Ingredients</h5>
          <ul className='drink-data'>
          {Object.entries(cocktail).map(([key, value]) => {
            if (key.match(/strIngredient/)) {
              return <li>{value}</li>
            }
          })}
          </ul>
        </div>
        <div className='drink-info'>
          <h5>Instructions</h5>
          <p>{strInstructions}</p>
        </div>
      </div>
    </section>
    </>
  )
}

export default SingleCocktail
