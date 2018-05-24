import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {compose, graphql} from 'react-apollo';
import ListRecipes from './quaries/ListRecipes';
import listRecipes from './quaries/ListRecipes';
import CreateRecipe from './mutations/CreateRecipe';
import uuidV4 from 'uuid/v4';

class App extends Component {
  state ={
    name: '',
    ingredient: '',
    direction: '',
    ingredients: [],
    directions: [],
  }
  onChange = (key, value) => {
    this.setState({[key]: value})
  }
  addIngredient = () => {
    if (this.state.ingredient === '') return 
    const ingredients = this.state.ingredients;
    ingredients.push(this.state.ingredient)
    this.setState({
      ingredient: ''
    })
  }
  addDirection = () => {
    if (this.state.direction === '') return 
    const directions = this.state.directions;
    directions.push(this.state.direction)
    this.setState({
      direction: ''
    })
  }
  addRecipe = () => {
    const {name, ingredients, directions } = this.state
    this.props.onAdd(
      {
        name,
        ingredients,
        directions,
        id: uuidV4()
      }
    )
    this.setState({
        name: '',
        ingredient: '',
        direction: '',
    })
  }
  render() {
    console.log('props: ', this.props)
    return (
      <div className="App" style={styles.container} >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Recipes:</h1>
       
          {this.props.recipes.map((recipe, index)=> (
            <div key={index}>
            <p className="App-intro">{recipe.name}</p>
            </div>
          ))}

          <input
            value={this.state.name}
            placeholder='Recipe Name'
            style={styles.input}
            onChange={evt => this.onChange('name', evt.target.value)}
          />
         
          
          <input
            value={this.state.ingredient}
            placeholder='Ingridient Name'
            style={styles.input}
            onChange={evt => this.onChange('ingredient', evt.target.value)}
          />
          <button onClick={this.addIngredient} style={styles.button}> Add Ingridient </button>

          <input
            value={this.state.direction}
            placeholder='Direction Name'
            style={styles.input}
            onChange={evt => this.onChange('direction', evt.target.value)}
          />
          <button onClick={this.addDirection} style={styles.button}> Add Direction </button>
          <button onClick={this.addRecipe} style={styles.button}> Add Recipe </button>
      </div>
    );
  }
}

const styles = {
  input: {
    border: 'none',
    fontSize: 22,
    height: 50,
    width: 300,
    borderBottom: '2px solid blue',
    margin: 10,
  },
  button: {
    height: 50,
    width: 300,
    margin: 10,

  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

export default compose(
  graphql(listRecipes, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      recipes: props.data.listRecipes ? props.data.listRecipes.items : []
    })
  }),
  graphql(CreateRecipe,{
    props: props => ({
      onAdd: recipe => {
        console.log('recipe: ', recipe)
        props.mutate({
          variables: recipe
    
        })
      }
    })

  })
)(App);
