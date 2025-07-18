import React, { useState } from 'react';
import { ChefHat, Plus, X, Clock, Users, Utensils, Heart, Search, Filter } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  dietary: string[];
  isFavorite: boolean;
}

function App() {
  const [inputIngredient, setInputIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState('any');
  const [selectedDietary, setSelectedDietary] = useState('any');
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const cuisines = ['any', 'Italian', 'Mexican', 'Asian', 'Indian', 'Mediterranean', 'American', 'French'];
  const dietaryOptions = ['any', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Low-Carb', 'Dairy-Free'];

  const addIngredient = () => {
    if (inputIngredient.trim() && !ingredients.includes(inputIngredient.trim())) {
      setIngredients([...ingredients, inputIngredient.trim()]);
      setInputIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const generateRecipes = async () => {
    if (ingredients.length === 0) return;

    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newRecipes: Recipe[] = [
      {
        id: Date.now().toString(),
        title: `${ingredients[0]} Fusion Delight`,
        ingredients: [...ingredients, 'olive oil', 'salt', 'pepper', 'garlic'],
        instructions: [
          'Heat olive oil in a large pan over medium heat',
          `Add ${ingredients[0]} and cook for 5-7 minutes`,
          'Season with salt, pepper, and minced garlic',
          'Add remaining ingredients and cook for 10-12 minutes',
          'Serve hot and enjoy!'
        ],
        cookingTime: 25,
        servings: 4,
        difficulty: 'Easy',
        cuisine: selectedCuisine === 'any' ? 'Fusion' : selectedCuisine,
        dietary: selectedDietary === 'any' ? [] : [selectedDietary],
        isFavorite: false
      },
      {
        id: (Date.now() + 1).toString(),
        title: `Gourmet ${ingredients[Math.floor(Math.random() * ingredients.length)]} Bowl`,
        ingredients: [...ingredients.slice(0, 3), 'herbs', 'spices', 'broth'],
        instructions: [
          'Prepare all ingredients by washing and chopping',
          'In a large pot, combine broth with main ingredients',
          'Simmer for 15-20 minutes until tender',
          'Add herbs and spices to taste',
          'Serve in bowls with fresh garnish'
        ],
        cookingTime: 30,
        servings: 2,
        difficulty: 'Medium',
        cuisine: selectedCuisine === 'any' ? 'Contemporary' : selectedCuisine,
        dietary: selectedDietary === 'any' ? [] : [selectedDietary],
        isFavorite: false
      }
    ];

    setRecipes(prevRecipes => [...newRecipes, ...prevRecipes]);
    setIsGenerating(false);
  };

  const toggleFavorite = (recipeId: string) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === recipeId 
        ? { ...recipe, isFavorite: !recipe.isFavorite }
        : recipe
    ));
  };

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">Recipe Generator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recipe Generator Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate Your Perfect Recipe</h2>
          
          {/* Ingredient Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Ingredients
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputIngredient}
                onChange={(e) => setInputIngredient(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                placeholder="Enter an ingredient (e.g., chicken, tomatoes, pasta)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={addIngredient}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Ingredients Tags */}
          {ingredients.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected Ingredients ({ingredients.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                  >
                    {ingredient}
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="ml-2 text-orange-500 hover:text-orange-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Filters */}
          {showFilters && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuisine Type
                  </label>
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {cuisines.map(cuisine => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Preferences
                  </label>
                  <select
                    value={selectedDietary}
                    onChange={(e) => setSelectedDietary(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {dietaryOptions.map(option => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateRecipes}
            disabled={ingredients.length === 0 || isGenerating}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
              ingredients.length === 0 || isGenerating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating Recipes...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <ChefHat className="h-5 w-5" />
                <span>Generate Recipes</span>
              </div>
            )}
          </button>
        </div>

        {/* Generated Recipes */}
        {filteredRecipes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Generated Recipes ({filteredRecipes.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                        {recipe.title}
                      </h3>
                      <button
                        onClick={() => toggleFavorite(recipe.id)}
                        className={`ml-2 p-2 rounded-full transition-colors ${
                          recipe.isFavorite
                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${recipe.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{recipe.cookingTime} mins</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{recipe.servings} servings</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Utensils className="h-4 w-4" />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">Cuisine:</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                          {recipe.cuisine}
                        </span>
                      </div>
                      {recipe.dietary.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">Dietary:</span>
                          <div className="flex flex-wrap gap-1">
                            {recipe.dietary.map((diet, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                              >
                                {diet}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h4>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {ingredient}
                          </span>
                        ))}
                        {recipe.ingredients.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{recipe.ingredients.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Instructions:</h4>
                      <ol className="text-sm text-gray-600 space-y-1">
                        {recipe.instructions.slice(0, 3).map((instruction, index) => (
                          <li key={index} className="flex">
                            <span className="mr-2 text-orange-600 font-medium">{index + 1}.</span>
                            <span className="line-clamp-2">{instruction}</span>
                          </li>
                        ))}
                        {recipe.instructions.length > 3 && (
                          <li className="text-orange-600 font-medium">
                            +{recipe.instructions.length - 3} more steps
                          </li>
                        )}
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Ready to Cook Something Amazing?
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Add your available ingredients above and let our AI chef create personalized recipes just for you!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;